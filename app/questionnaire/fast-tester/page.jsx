"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { getRecommendations, formatEuro } from "@/lib/recommendation";
import { questionnaireData } from "@/data/enhancedQuestionnaireData";

const SEC_ICONS = {
  "Site Profile": "🏗️",
  "Connectivity Requirements": "📡",
  "Reliability & SLA": "🛡️",
  "Network Architecture": "🌐",
  "Physical & Deployment": "⚙️",
  "Budget": "💰",
};

let _counter = 0;
function makeId() { return `fts_${Date.now()}_${++_counter}`; }
function makeSite(name) { return { id: makeId(), name: name || `Site ${_counter}`, answers: {}, location: null }; }

export default function FastTesterPage() {
  const [sites, setSites] = useState(() => { _counter = 1; return [makeSite("Site 1")]; });
  const [activeIdx, setActiveIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [expandedSite, setExpandedSite] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [editingName, setEditingName] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [leftPct, setLeftPct] = useState(38); // results panel gets more space by default
  const isDragging = useRef(false);
  const rootRef = useRef(null);
  const debounceRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);
  const leafletLoaded = useRef(false);

  const activeSite = sites[activeIdx] || sites[0];
  const answers = activeSite?.answers || {};

  const sections = {};
  questionnaireData.forEach(q => {
    if (!sections[q.section]) sections[q.section] = [];
    sections[q.section].push(q);
  });

  /* ── DRAG ── */
  const handleDragStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current || !rootRef.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = rootRef.current.getBoundingClientRect();
      setLeftPct(Math.min(70, Math.max(20, ((x - rect.left) / rect.width) * 100)));
    };
    const onUp = () => { isDragging.current = false; document.body.style.cursor = ""; document.body.style.userSelect = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  /* ── RECOMMENDATIONS ── */
  const fetchRecommendation = useCallback(async (currentSites) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const hasSome = currentSites.some(s => Object.keys(s.answers).length >= 2);
      if (!hasSome) { setResult(null); return; }
      setLoading(true);
      try {
        const payload = currentSites.map(s => ({
          id: s.id, name: s.name, answers: s.answers,
          location: s.location || { city: "Test", country: "Germany" },
        }));
        const data = await getRecommendations(payload);
        setResult(data);
        setLastUpdate(new Date().toLocaleTimeString());
        setExpandedSite(0);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }, 700);
  }, []);

  const setAnswer = (qId, val) => {
    setSites(prev => {
      const next = [...prev];
      next[activeIdx] = { ...next[activeIdx], answers: { ...next[activeIdx].answers, [qId]: val } };
      fetchRecommendation(next);
      return next;
    });
  };

  /* ── SITE MANAGEMENT ── */
  const addSite = () => { _counter++; setSites(p => { const s = makeSite(`Site ${p.length + 1}`); setActiveIdx(p.length); return [...p, s]; }); };

  const copySite = (idx) => {
    _counter++;
    const src = sites[idx];
    const copy = { id: makeId(), name: `${src.name} (Copy)`, answers: { ...src.answers }, location: src.location ? { ...src.location } : null };
    setSites(p => { const n = [...p, copy]; fetchRecommendation(n); setActiveIdx(n.length - 1); return n; });
  };

  const deleteSite = (idx) => {
    if (sites.length <= 1) return;
    setSites(prev => {
      const n = prev.filter((_, i) => i !== idx);
      if (activeIdx >= n.length) setActiveIdx(n.length - 1);
      else if (activeIdx === idx) setActiveIdx(0);
      fetchRecommendation(n);
      return n;
    });
  };

  const renameSite = (idx, name) => {
    setSites(prev => { const n = [...prev]; n[idx] = { ...n[idx], name: name.trim() || n[idx].name }; return n; });
    setEditingName(null);
  };

  const clearAll = () => { _counter = 1; setSites([makeSite("Site 1")]); setActiveIdx(0); setResult(null); setLastUpdate(null); };

  /* ── MAP ── */
  useEffect(() => {
    if (!showMap) return;
    const t = setTimeout(() => {
      if (typeof window === "undefined" || !document.getElementById("ftmap")) return;
      if (!document.getElementById("leaflet-css-ft")) {
        const l = document.createElement("link"); l.id = "leaflet-css-ft"; l.rel = "stylesheet";
        l.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(l);
      }
      if (!window.L) { const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; s.onload = buildMap; document.body.appendChild(s); }
      else buildMap();
    }, 150);
    return () => clearTimeout(t);
  }, [showMap]);

  const buildMap = () => {
    if (!window.L) return;
    if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; markerInstanceRef.current = null; }
    const L = window.L; leafletLoaded.current = true;
    const loc = activeSite?.location;
    const map = L.map("ftmap").setView(loc?.lat ? [loc.lat, loc.lng] : [50.1, 8.7], loc?.lat ? 13 : 5);
    mapInstanceRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
    if (loc?.lat) { markerInstanceRef.current = L.marker([loc.lat, loc.lng], { draggable: true }).addTo(map); markerInstanceRef.current.on("dragend", e => reverseGeocode(e.target.getLatLng().lat, e.target.getLatLng().lng)); }
    map.on("click", e => {
      if (markerInstanceRef.current) markerInstanceRef.current.setLatLng(e.latlng);
      else { markerInstanceRef.current = L.marker(e.latlng, { draggable: true }).addTo(map); markerInstanceRef.current.on("dragend", ev => reverseGeocode(ev.target.getLatLng().lat, ev.target.getLatLng().lng)); }
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const d = await res.json(); const a = d.address || {};
      const location = { lat, lng, address: d.display_name?.split(",").slice(0, 3).join(",").trim() || "", city: a.city || a.town || a.village || "", state: a.state || "", country: a.country || "", postalCode: a.postcode || "" };
      setSites(prev => { const n = [...prev]; n[activeIdx] = { ...n[activeIdx], location }; return n; });
    } catch (e) { console.error(e); }
  };

  useEffect(() => { if (showMap && leafletLoaded.current) setTimeout(buildMap, 100); }, [activeIdx]);
  useEffect(() => () => { mapInstanceRef.current?.remove(); }, []);

  const answeredCount = Object.keys(answers).filter(k => answers[k] != null).length;
  const totalQ = questionnaireData.length;

  /* ── QUESTION RENDERER ── */
  const renderQ = (q) => {
    const val = answers[q.id];
    if (q.type === "single") return (
      <div className="option-grid">
        {(q.options || []).map(opt => {
          const ov = typeof opt === "string" ? opt : opt.value;
          const ol = typeof opt === "string" ? opt : opt.label;
          const sel = val?.value === ov || val === ov || val?.label === ol;
          return <button key={ov} className={`chip ${sel ? "chip--on" : ""}`} onClick={() => setAnswer(q.id, opt)}>{sel && <span>✓ </span>}{ol}</button>;
        })}
      </div>
    );
    if (q.type === "boolean") return (
      <div className="option-grid">
        {(q.options || ["Yes", "No"]).map(opt => (
          <button key={opt} className={`chip ${val === opt ? "chip--on" : ""}`} onClick={() => setAnswer(q.id, opt)}>{val === opt && <span>✓ </span>}{opt}</button>
        ))}
      </div>
    );
    if (q.type === "single-with-checkbox") return (
      <div>
        <div className="option-grid">
          {(q.options || []).map(opt => {
            const sel = val?.option?.value === opt.value;
            return <button key={opt.value} className={`chip ${sel ? "chip--on" : ""}`} onClick={() => setAnswer(q.id, { option: opt, highTheftRisk: val?.highTheftRisk || false })}>{sel && <span>✓ </span>}{opt.label}</button>;
          })}
        </div>
        {q.additionalCheckbox && <label className="chk-row"><input type="checkbox" checked={val?.highTheftRisk || false} onChange={e => setAnswer(q.id, { ...val, highTheftRisk: e.target.checked })} /><span>{q.additionalCheckbox}</span></label>}
      </div>
    );
    if (q.type === "multiple") {
      const arr = Array.isArray(val) ? val : [];
      return (
        <div className="option-grid">
          {(q.options || []).map(opt => {
            const sel = arr.some(a => a.value === opt.value);
            return <button key={opt.value} className={`chip ${sel ? "chip--on" : ""}`} onClick={() => setAnswer(q.id, sel ? arr.filter(a => a.value !== opt.value) : [...arr, opt])}>{sel && <span>✓ </span>}{opt.label}</button>;
          })}
        </div>
      );
    }
    if (q.type === "dual-single" || q.type === "dual-single2") {
      const cur = (val && typeof val === "object") ? val : {};
      return (
        <div className="dual-wrap">
          {(q.subQuestions || []).map(sq => {
            const key = sq.label.toLowerCase();
            return (
              <div key={key} className="dual-group">
                <div className="dual-lbl">{sq.label}</div>
                <div className="option-grid">
                  {(sq.options || []).map(opt => {
                    const sel = cur[key]?.value === opt.value;
                    return <button key={opt.value} className={`chip chip--sm ${sel ? "chip--on" : ""}`} onClick={() => setAnswer(q.id, { ...cur, [key]: opt })}>{sel && <span>✓ </span>}{opt.label}</button>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    if (q.type === "scale") {
      const cur = (val && typeof val === "object") ? val : {};
      return (
        <div className="scale-wrap">
          {(q.options || []).map(opt => (
            <div key={opt.value} className="scale-row">
              <span className="scale-lbl">{opt.label}</span>
              <div className="scale-btns">
                {(q.scaleRange || [1,2,3,4,5]).map(n => (
                  <button key={n} className={`scale-btn ${cur[opt.value] === n ? "chip--on" : ""}`} onClick={() => setAnswer(q.id, { ...cur, [opt.value]: n })}>{n}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  /* ── RESULTS RENDERER — matches DynamicResultsPage exactly ── */
  const renderResults = () => {
    if (!result || !result.sitePackages?.length) {
      return (
        <div className="r-empty">
          <div style={{ fontSize: 52, opacity: 0.3 }}>⚡</div>
          <p>Answer at least 2 questions<br />to see live recommendations</p>
        </div>
      );
    }

    const { sitePackages, pocTotals, allTotals, totalSites } = result;

    return (
      <>
        {/* ── Site cards ── */}
        {sitePackages.map((sp, idx) => {
          const isExp = expandedSite === idx;
          const pkg = sp.package;
          if (!pkg) return null;

          return (
            <div key={sp.site_id || idx} className="sc">
              {/* Header */}
              <div className="sc__hdr" onClick={() => setExpandedSite(isExp ? null : idx)}>
                <div className="sc__title">
                  <span className="sb">Site {sp.site_number}</span>
                  <h2>{sp.site_name}</h2>
                  <span className="sc__sub">{pkg.servicesLabel || "—"}</span>
                </div>
                <div className="sc__tots">
                  <div className="ti"><span className="tl">Setup Fee</span><span className="tv">{formatEuro(pkg.totals?.network_setup_fee)}</span></div>
                  <div className="ti"><span className="tl">Monthly Fee</span><span className="tv">{formatEuro(pkg.totals?.network_monthly_fee)}</span></div>
                  <div className="ti"><span className="tl">Managed Svc</span><span className="tv">{formatEuro(pkg.totals?.managed_service_monthly)}</span></div>
                </div>
                <button className="eb">{isExp ? "▼" : "▶"}</button>
              </div>

              {/* Expanded body */}
              {isExp && (
                <div className="sc__body">
                  <table className="ct">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Hardware</th>
                        <th>Airtime Plan</th>
                        <th className="r">Setup Fee</th>
                        <th className="r">Monthly Fee</th>
                        <th className="r">Managed Svc</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pkg.components || []).map((c, ci) => (
                        <tr key={ci}>
                          <td><span className="cb" style={{ background: c.color || "#3D72FC" }}>{c.type}</span></td>
                          <td>{c.hardware || "—"}</td>
                          <td>{c.airtime || "—"}</td>
                          <td className="r num">{formatEuro(c.network_setup_fee)}</td>
                          <td className="r num">{formatEuro(c.network_monthly_fee)}</td>
                          <td className="r num">{formatEuro(c.managed_service_monthly)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="ct-foot">
                        <td colSpan={3}><strong>Site Total</strong></td>
                        <td className="r num"><strong>{formatEuro(pkg.totals?.network_setup_fee)}</strong></td>
                        <td className="r num"><strong>{formatEuro(pkg.totals?.network_monthly_fee)}</strong></td>
                        <td className="r num"><strong>{formatEuro(pkg.totals?.managed_service_monthly)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Deployment Summary ── */}
        {allTotals && (
          <div className="ds">
            <h2 className="ds__t">Deployment Summary</h2>
            <div className="ds__grid">

              <div className="dc">
                <div className="dc__h">
                  <h3>PoC Sites ({Math.min(2, totalSites)})</h3>
                  <p>Fixed PoC pricing</p>
                </div>
                <div className="dc__b">
                  <div className="sr"><span className="sl">Network Setup Fee</span><span className="sv">{formatEuro(pocTotals?.network_setup_fee)}</span></div>
                  <div className="sr"><span className="sl">Network Monthly Fee</span><span className="sv">{formatEuro(pocTotals?.network_monthly_fee)}</span></div>
                  <div className="sr"><span className="sl">Managed Service Monthly</span><span className="sv">{formatEuro(pocTotals?.managed_service_monthly)}</span></div>
                </div>
              </div>

              <div className="dc dc--hl">
                <div className="dc__h">
                  <h3>All Sites ({totalSites})</h3>
                  <p>{allTotals.setup_discount_pct > 0 ? `${(allTotals.setup_discount_pct * 100).toFixed(0)}% bulk discount` : "Standard pricing"}</p>
                </div>
                <div className="dc__b">
                  <div className="sr"><span className="sl">Network Setup Fee</span><span className="sv">{formatEuro(allTotals.network_setup_fee)}</span></div>
                  <div className="sr"><span className="sl">Network Monthly Fee</span><span className="sv">{formatEuro(allTotals.network_monthly_fee)}</span></div>
                  <div className="sr"><span className="sl">Managed Service Monthly</span><span className="sv">{formatEuro(allTotals.managed_service_monthly)}</span></div>
                  <div className="sr sr--hl">
                    <span className="sl">Contract Value ({allTotals.contract_months}mo)</span>
                    <span className="sv sv--big">{formatEuro(allTotals.contract_value)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </>
    );
  };

  /* ── RENDER ── */
  return (
    <div className="ft" ref={rootRef}>

      {/* LEFT — questions */}
      <div className="ft__left" style={{ width: panelOpen ? `${leftPct}%` : "100%" }}>

        <div className="fth">
          <div className="fth__row">
            <h1 className="fth__title">⚡ Fast Tester</h1>
            <button className="fth__reset" onClick={clearAll}>✕ Reset</button>
          </div>
          <p className="fth__sub">Quick demo — pick locations, answer questions, see live results</p>
        </div>

        <div className="stabs">
          {sites.map((s, i) => (
            <div key={s.id} className={`stab ${i === activeIdx ? "stab--on" : ""}`} onClick={() => setActiveIdx(i)}>
              {editingName === i ? (
                <div className="stab__edit" onClick={e => e.stopPropagation()}>
                  <input className="stab__inp" value={nameInput} onChange={e => setNameInput(e.target.value)} autoFocus
                    onKeyDown={e => { if (e.key === "Enter") renameSite(i, nameInput); if (e.key === "Escape") setEditingName(null); }} />
                  <button className="stab__ok" onClick={() => renameSite(i, nameInput)}>✓</button>
                </div>
              ) : <span>{s.name}</span>}
              <div className="stab__acts" onClick={e => e.stopPropagation()}>
                <button title="Rename" onClick={() => { setEditingName(i); setNameInput(s.name); }}>✏️</button>
                <button title="Copy" onClick={() => copySite(i)}>📋</button>
                {sites.length > 1 && <button title="Delete" onClick={() => deleteSite(i)}>✕</button>}
              </div>
            </div>
          ))}
          <button className="stab stab--add" onClick={addSite}>+ Add Site</button>
        </div>

        <div className="loc-box">
          <div className="loc-box__bar">
            <span>📍</span>
            {activeSite.location
              ? <span className="loc-box__txt">{[activeSite.location.city, activeSite.location.country].filter(Boolean).join(", ") || activeSite.location.address}</span>
              : <span className="loc-box__empty">Click map to set location</span>}
            <button className="loc-box__btn" onClick={() => setShowMap(!showMap)}>{showMap ? "Hide Map ▲" : "Show Map ▼"}</button>
          </div>
          {showMap && <div id="ftmap" style={{ height: 220, borderRadius: 10, marginTop: 12, border: "1px solid rgba(255,255,255,0.08)" }} />}
        </div>

        <div className="prog">
          <div className="prog__fill" style={{ width: `${Math.round(answeredCount / totalQ * 100)}%` }} />
          <span className="prog__txt">{answeredCount}/{totalQ}</span>
        </div>

        <div className="ql">
          {Object.entries(sections).map(([sec, qs]) => (
            <div key={sec} className="qs">
              <h3 className="qs__title">{SEC_ICONS[sec] || "📝"} {sec}</h3>
              {qs.map(q => {
                const done = answers[q.id] != null;
                return (
                  <div key={q.id} className={`qc ${done ? "qc--done" : ""}`}>
                    <div className="qc__hdr">
                      <span className="qc__num">Q{q.id}</span>
                      <span className="qc__txt">{q.question}</span>
                      {done && <span className="qc__check">✓</span>}
                    </div>
                    <div className="qc__body">{renderQ(q)}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* DRAG HANDLE */}
      {panelOpen && (
        <div className="dragger" onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
          <div className="dragger__grip" />
        </div>
      )}

      {/* RIGHT — results */}
      <div className={`ft__right ${panelOpen ? "ft__right--open" : "ft__right--closed"}`}
        style={panelOpen ? { width: `${100 - leftPct}%` } : {}}>

        <button className="ptoggle" onClick={() => setPanelOpen(!panelOpen)}>
          {panelOpen ? "▶" : "◀"}
          {!panelOpen && <span className="ptoggle__lbl">Results</span>}
        </button>

        {panelOpen && (
          <div className="rp">
            {/* mirroring DynamicResultsPage .rp__hdr */}
            <div className="rp__hdr">
              <h1>Your Connectivity Plans</h1>
              {loading
                ? <p style={{ color: "#FFC107", margin: 0, fontSize: 13, animation: "lp 1s infinite" }}>Updating…</p>
                : lastUpdate
                  ? <p>{result?.totalSites || 0} site{(result?.totalSites || 0) !== 1 ? "s" : ""} configured</p>
                  : <p>Answer questions to generate results</p>
              }
            </div>

            {renderResults()}
          </div>
        )}
      </div>

      <style jsx>{`
        /* ════ LAYOUT ════ */
        .ft { display:flex; min-height:100vh; background:#070c14; position:relative; }
        .ft__left { overflow-y:auto; max-height:100vh; padding:28px 22px 80px; flex-shrink:0; }
        .ft__right {
          position:sticky; top:0; height:100vh; overflow-y:auto;
          background:#070c14;
          border-left:1px solid rgba(255,255,255,0.08);
          z-index:10; flex-shrink:0;
        }
        .ft__right--open { min-width:520px; }
        .ft__right--closed { width:38px !important; min-width:38px; }

        .dragger { width:10px; cursor:col-resize; display:flex; align-items:center; justify-content:center; flex-shrink:0; z-index:20; }
        .dragger:hover { background:rgba(61,114,252,0.06); }
        .dragger__grip { width:4px; height:52px; border-radius:2px; background:rgba(255,255,255,0.09); }
        .dragger:hover .dragger__grip { background:rgba(61,114,252,0.5); }

        .ptoggle { position:absolute; left:-1px; top:50%; transform:translateY(-50%); padding:14px 6px; background:rgba(61,114,252,0.1); border:1px solid rgba(61,114,252,0.25); border-right:none; border-radius:8px 0 0 8px; color:#5CB0E9; font-size:12px; cursor:pointer; z-index:11; display:flex; flex-direction:column; align-items:center; gap:4px; }
        .ptoggle:hover { background:rgba(61,114,252,0.2); }
        .ptoggle__lbl { writing-mode:vertical-rl; font-size:11px; font-weight:700; letter-spacing:1px; }

        /* ════ RESULT PANEL — matches DynamicResultsPage ════ */
        .rp { padding:32px 28px 60px; }
        @keyframes lp { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* .rp__hdr from DynamicResultsPage */
        .rp__hdr { text-align:left; margin-bottom:28px; }
        .rp__hdr h1 { font-size:24px; font-weight:700; color:#fff; margin:0 0 6px; }
        .rp__hdr p { font-size:14px; color:rgba(255,255,255,0.5); margin:0; }

        /* .sc — site card  (mirrors results/page.jsx) */
        .sc { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.1); border-radius:22px; margin-bottom:20px; overflow:hidden; transition:all 0.3s; }
        .sc:hover { border-color:rgba(61,114,252,0.4); }

        .sc__hdr { display:flex; align-items:center; padding:22px 24px; cursor:pointer; transition:background 0.2s; gap:16px; }
        .sc__hdr:hover { background:rgba(255,255,255,0.02); }

        .sc__title { flex:1; display:flex; flex-direction:column; gap:6px; min-width:0; }
        .sb { display:inline-flex; padding:4px 14px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); border-radius:16px; font-size:12px; font-weight:700; color:#fff; align-self:flex-start; }
        .sc__title h2 { font-size:18px; font-weight:700; color:#fff; margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .sc__sub { font-size:13px; color:rgba(255,255,255,0.5); }

        /* totals — 3 items in a row, each label above value */
        .sc__tots { display:flex; gap:20px; flex-shrink:0; }
        .ti { display:flex; flex-direction:column; align-items:flex-end; min-width:88px; }
        .tl { font-size:11px; color:rgba(255,255,255,0.5); margin-bottom:4px; white-space:nowrap; }
        .tv { font-size:15px; font-weight:700; color:#fff; white-space:nowrap; font-variant-numeric:tabular-nums; }

        .eb { width:36px; height:36px; flex-shrink:0; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:rgba(255,255,255,0.7); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
        .eb:hover { background:rgba(61,114,252,0.15); border-color:rgba(61,114,252,0.4); color:#5CB0E9; }

        /* expanded body */
        .sc__body { animation:sd 0.25s ease; overflow-x:auto; }
        @keyframes sd { from{opacity:0} to{opacity:1} }

        /* .ct — component table */
        .ct { width:100%; border-collapse:collapse; background:rgba(255,255,255,0.02); min-width:500px; }
        .ct thead { background:rgba(255,255,255,0.04); }
        .ct th { padding:12px 16px; text-align:left; font-size:11px; font-weight:600; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.07); white-space:nowrap; }
        .ct th.r { text-align:right; }
        .ct td { padding:14px 16px; font-size:13px; color:rgba(255,255,255,0.85); border-bottom:1px solid rgba(255,255,255,0.06); white-space:nowrap; }
        .ct td.r { text-align:right; }
        .ct td.num { font-variant-numeric:tabular-nums; }
        .ct tbody tr:last-child td { border-bottom:none; }
        .ct tbody tr:hover { background:rgba(255,255,255,0.02); }
        .cb { display:inline-flex; padding:4px 10px; border-radius:10px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.4px; color:#fff; white-space:nowrap; }
        .ct-foot td { padding:13px 16px; font-size:13px; font-weight:700; color:#fff; background:rgba(61,114,252,0.08); border-top:2px solid rgba(61,114,252,0.25) !important; }

        /* .ds — deployment summary (mirrors results/page.jsx) */
        .ds { margin-top:12px; padding-top:8px; }
        .ds__t { font-size:20px; font-weight:700; color:#fff; margin:0 0 20px; }
        .ds__grid { display:flex; flex-direction:column; gap:16px; }

        /* .dc — deployment card */
        .dc { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.1); padding:24px 28px; border-radius:22px; }
        .dc--hl { background:rgba(61,114,252,0.08); border:1px solid rgba(61,114,252,0.35); }

        .dc__h { margin-bottom:20px; }
        .dc__h h3 { font-size:18px; font-weight:700; color:#fff; margin:0 0 5px; }
        .dc__h p { font-size:13px; color:rgba(255,255,255,0.5); margin:0; }

        .dc__b { display:flex; flex-direction:column; gap:4px; }

        .sr { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); gap:12px; }
        .sr:last-child { border-bottom:none; }
        .sr--hl { padding-top:16px; margin-top:8px; border-top:1px solid rgba(255,255,255,0.15) !important; border-bottom:none !important; }
        .sl { font-size:13px; color:rgba(255,255,255,0.7); white-space:nowrap; }
        .sv { font-size:17px; font-weight:700; color:#fff; font-variant-numeric:tabular-nums; white-space:nowrap; }
        .sv--big { font-size:21px; color:#5CB0E9; }

        /* narrow panel: stack header when panel is squeezed */
        @media(max-width:620px) {
          .sc__hdr { flex-wrap:wrap; }
          .sc__tots { flex-wrap:wrap; gap:16px; }
          .ti { align-items:flex-start; }
        }

        /* ════ EMPTY STATE ════ */
        .r-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:80px 24px; text-align:center; }
        .r-empty p { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.7; margin:0; }

        /* ════ LEFT PANEL ════ */
        .fth { margin-bottom:20px; }
        .fth__row { display:flex; align-items:center; justify-content:space-between; }
        .fth__title { font-size:26px; font-weight:800; margin:0; background:linear-gradient(135deg,#FFC107,#FF9800); -webkit-text-fill-color:transparent; background-clip:text; }
        .fth__sub { font-size:12px; color:rgba(255,255,255,0.4); margin:6px 0 0; }
        .fth__reset { padding:7px 14px; background:rgba(250,86,116,0.08); border:1px solid rgba(250,86,116,0.2); border-radius:8px; color:#FA5674; font-size:12px; font-weight:600; cursor:pointer; }
        .fth__reset:hover { background:rgba(250,86,116,0.15); }

        .stabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
        .stab { display:flex; align-items:center; gap:8px; padding:7px 12px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:10px; font-size:12px; color:rgba(255,255,255,0.55); cursor:pointer; transition:all .2s; }
        .stab:hover { border-color:rgba(255,255,255,0.14); }
        .stab--on { background:rgba(61,114,252,0.1); border-color:rgba(61,114,252,0.4); color:#5CB0E9; font-weight:600; }
        .stab--add { border-style:dashed; color:rgba(92,176,233,0.6); }
        .stab--add:hover { background:rgba(92,176,233,0.06); }
        .stab__acts { display:flex; gap:3px; }
        .stab__acts button { background:none; border:none; cursor:pointer; font-size:11px; padding:2px 4px; border-radius:4px; opacity:.5; transition:opacity .15s; }
        .stab__acts button:hover { opacity:1; background:rgba(255,255,255,0.08); }
        .stab__edit { display:flex; gap:4px; align-items:center; }
        .stab__inp { padding:3px 8px; background:rgba(255,255,255,0.07); border:1px solid rgba(61,114,252,0.4); border-radius:6px; color:#fff; font-size:12px; outline:none; width:110px; }
        .stab__ok { padding:3px 7px; background:rgba(61,114,252,0.2); border:none; border-radius:4px; color:#5CB0E9; cursor:pointer; font-size:12px; }

        .loc-box { margin-bottom:14px; padding:12px 16px; background:rgba(255,255,255,0.018); border:1px solid rgba(255,255,255,0.05); border-radius:12px; }
        .loc-box__bar { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .loc-box__txt { font-size:12px; color:#5CB0E9; flex:1; }
        .loc-box__empty { font-size:12px; color:rgba(255,255,255,0.25); font-style:italic; flex:1; }
        .loc-box__btn { padding:5px 12px; background:rgba(61,114,252,0.1); border:1px solid rgba(61,114,252,0.25); border-radius:7px; color:#5CB0E9; font-size:11px; font-weight:600; cursor:pointer; }

        .prog { position:relative; height:4px; background:rgba(255,255,255,0.04); border-radius:3px; margin-bottom:18px; overflow:hidden; }
        .prog__fill { height:100%; background:linear-gradient(90deg,#3D72FC,#5CB0E9); border-radius:3px; transition:width .4s; }
        .prog__txt { position:absolute; right:0; top:-16px; font-size:10px; color:rgba(255,255,255,0.25); font-weight:600; }

        .ql { display:flex; flex-direction:column; gap:24px; }
        .qs__title { font-size:12px; font-weight:700; color:rgba(92,176,233,0.75); text-transform:uppercase; letter-spacing:.8px; margin:0 0 10px; padding-bottom:7px; border-bottom:1px solid rgba(92,176,233,0.08); }
        .qc { padding:12px 14px; background:rgba(255,255,255,0.012); border:1px solid rgba(255,255,255,0.04); border-radius:12px; margin-bottom:7px; }
        .qc:hover { border-color:rgba(255,255,255,0.08); }
        .qc--done { border-left:3px solid rgba(92,176,233,0.5); background:rgba(92,176,233,0.012); }
        .qc__hdr { display:flex; align-items:flex-start; gap:8px; margin-bottom:9px; }
        .qc__num { flex-shrink:0; padding:2px 7px; background:rgba(61,114,252,0.1); border-radius:5px; font-size:10px; font-weight:700; color:#5CB0E9; }
        .qc__txt { font-size:12px; color:rgba(255,255,255,0.75); line-height:1.4; flex:1; }
        .qc__check { color:#22c55e; font-weight:700; font-size:13px; flex-shrink:0; }
        .qc__body { padding-top:2px; }

        .option-grid { display:flex; flex-wrap:wrap; gap:5px; }
        .chip { padding:6px 12px; background:rgba(255,255,255,0.025); border:1.5px solid rgba(255,255,255,0.08); border-radius:8px; color:rgba(255,255,255,0.6); font-size:11px; cursor:pointer; transition:all .18s; white-space:nowrap; display:inline-flex; align-items:center; }
        .chip:hover { background:rgba(61,114,252,0.08); border-color:rgba(61,114,252,0.3); color:rgba(255,255,255,0.9); }
        .chip--on { background:rgba(61,114,252,0.2) !important; border-color:#3D72FC !important; color:#fff !important; font-weight:600; }
        .chip--sm { padding:4px 9px; font-size:10px; }

        .chk-row { display:flex; align-items:center; gap:7px; margin-top:7px; font-size:11px; color:rgba(255,255,255,0.5); cursor:pointer; }
        .chk-row input { width:13px; height:13px; accent-color:#3D72FC; }
        .dual-wrap { display:flex; flex-direction:column; gap:8px; }
        .dual-group { display:flex; flex-direction:column; gap:5px; }
        .dual-lbl { font-size:10px; font-weight:700; color:rgba(92,176,233,0.65); text-transform:uppercase; letter-spacing:.5px; }
        .scale-wrap { display:flex; flex-direction:column; gap:7px; }
        .scale-row { display:flex; align-items:center; gap:8px; }
        .scale-lbl { font-size:11px; color:rgba(255,255,255,0.55); flex:1; min-width:90px; }
        .scale-btns { display:flex; gap:3px; }
        .scale-btn { width:28px; height:28px; border-radius:6px; background:rgba(255,255,255,0.025); border:1.5px solid rgba(255,255,255,0.07); color:rgba(255,255,255,0.5); font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center; }

        /* ════ RESPONSIVE ════ */
        @media(max-width:960px) {
          .ft { flex-direction:column; }
          .ft__left { max-height:none !important; width:100% !important; padding:20px 16px 60px; }
          .dragger { display:none; }
          .ft__right { position:fixed; right:0; top:0; height:100vh; box-shadow:-6px 0 24px rgba(0,0,0,0.6); }
          .ft__right--closed { width:36px !important; min-width:36px; }
          .ft__right--open { width:min(540px,95vw) !important; min-width:0 !important; }
        }
      `}</style>
    </div>
  );
}