"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { getRecommendations, formatEuro } from "@/lib/recommendation";
import { questionnaireData } from "@/data/enhancedQuestionnaireData";

const SEC_ICONS = { "Site Profile":"🏗️", "Connectivity Requirements":"📡", "Reliability & SLA":"🛡️", "Network Architecture":"🌐", "Physical & Deployment":"⚙️", "Budget":"💰" };

let _counter = 0;
function makeId() { return `fts_${Date.now()}_${++_counter}`; }
function makeSite(name) { return { id: makeId(), name: name || `Site ${_counter}`, answers: {}, location: null }; }

export default function FastTesterPage() {
  const [sites, setSites] = useState(() => { _counter = 1; return [makeSite("Site 1")]; });
  const [activeIdx, setActiveIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [expandedResultSite, setExpandedResultSite] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [editingName, setEditingName] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [leftPct, setLeftPct] = useState(58);
  const isDragging = useRef(false);
  const rootRef = useRef(null);
  const debounceRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);
  const leafletLoaded = useRef(false);

  const activeSite = sites[activeIdx] || sites[0];
  const answers = activeSite?.answers || {};

  // Build sections
  const sections = {};
  questionnaireData.forEach(q => {
    if (!sections[q.section]) sections[q.section] = [];
    sections[q.section].push(q);
  });

  /* ════════════════════════════════════════
     DRAG RESIZER
     ════════════════════════════════════════ */
  const handleDragStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging.current || !rootRef.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = rootRef.current.getBoundingClientRect();
      const pct = Math.min(82, Math.max(22, ((clientX - rect.left) / rect.width) * 100));
      setLeftPct(pct);
    };
    const handleUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  /* ════════════════════════════════════════
     RECOMMENDATIONS
     ════════════════════════════════════════ */
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
      } catch (err) { console.error("Rec error:", err); }
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

  /* ════════════════════════════════════════
     SITE MANAGEMENT
     ════════════════════════════════════════ */
  const addSite = () => {
    _counter++;
    const s = makeSite(`Site ${sites.length + 1}`);
    setSites(p => [...p, s]);
    setActiveIdx(sites.length);
  };

  const copySite = (idx) => {
    _counter++;
    const src = sites[idx];
    const copy = {
      id: makeId(),
      name: `${src.name} (Copy)`,
      answers: { ...src.answers },
      location: src.location ? { ...src.location } : null,
    };
    const newSites = [...sites, copy];
    setSites(newSites);
    setActiveIdx(newSites.length - 1);
    fetchRecommendation(newSites);
  };

  const deleteSite = (idx) => {
    if (sites.length <= 1) return;
    const newSites = sites.filter((_, i) => i !== idx);
    setSites(newSites);
    if (activeIdx >= newSites.length) setActiveIdx(newSites.length - 1);
    else if (activeIdx === idx) setActiveIdx(0);
    fetchRecommendation(newSites);
  };

  const renameSite = (idx, name) => {
    setSites(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], name: name.trim() || next[idx].name };
      return next;
    });
    setEditingName(null);
  };

  const clearAll = () => {
    _counter = 1;
    setSites([makeSite("Site 1")]);
    setActiveIdx(0);
    setResult(null);
    setLastUpdate(null);
  };

  /* ════════════════════════════════════════
     MAP (Leaflet CDN)
     ════════════════════════════════════════ */
  useEffect(() => {
    if (!showMap) return;
    const timer = setTimeout(() => {
      if (typeof window === "undefined" || !document.getElementById("ftmap")) return;
      if (!document.getElementById("leaflet-css-ft")) {
        const link = document.createElement("link");
        link.id = "leaflet-css-ft"; link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (!window.L) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => buildMap();
        document.body.appendChild(script);
      } else {
        buildMap();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [showMap]);

  const buildMap = () => {
    if (!window.L) return;
    // Remove old map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markerInstanceRef.current = null;
    }
    const L = window.L;
    leafletLoaded.current = true;
    const loc = activeSite?.location;
    const center = loc?.lat ? [loc.lat, loc.lng] : [50.1, 8.7];
    const zoom = loc?.lat ? 13 : 5;
    const map = L.map("ftmap").setView(center, zoom);
    mapInstanceRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
    if (loc?.lat) {
      markerInstanceRef.current = L.marker([loc.lat, loc.lng], { draggable: true }).addTo(map);
      markerInstanceRef.current.on("dragend", e => reverseGeocode(e.target.getLatLng().lat, e.target.getLatLng().lng));
    }
    map.on("click", e => {
      if (markerInstanceRef.current) markerInstanceRef.current.setLatLng(e.latlng);
      else {
        markerInstanceRef.current = L.marker(e.latlng, { draggable: true }).addTo(map);
        markerInstanceRef.current.on("dragend", ev => reverseGeocode(ev.target.getLatLng().lat, ev.target.getLatLng().lng));
      }
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await res.json();
      const a = data.address || {};
      const location = {
        lat, lng,
        address: data.display_name?.split(",").slice(0, 3).join(",").trim() || "",
        city: a.city || a.town || a.village || "",
        state: a.state || "",
        country: a.country || "",
        postalCode: a.postcode || "",
      };
      setSites(prev => {
        const next = [...prev];
        next[activeIdx] = { ...next[activeIdx], location };
        return next;
      });
    } catch (e) { console.error("Geocode err:", e); }
  };

  // Rebuild map when switching sites
  useEffect(() => {
    if (showMap && leafletLoaded.current) {
      setTimeout(buildMap, 100);
    }
  }, [activeIdx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const answeredCount = Object.keys(answers).filter(k => answers[k] != null).length;
  const totalQuestions = questionnaireData.length;

  /* ════════════════════════════════════════
     QUESTION RENDERER
     ════════════════════════════════════════ */
  const renderQuestion = (q) => {
    const val = answers[q.id];

    if (q.type === "single") {
      return (
        <div className="option-grid">
          {(q.options || []).map(opt => {
            const optVal = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            const isSelected = val?.value === optVal || val === optVal || val?.label === optLabel;
            return (
              <button key={optVal}
                className={`option-chip ${isSelected ? "option-chip--selected" : ""}`}
                onClick={() => setAnswer(q.id, opt)}>
                {isSelected && <span className="option-chip__check">✓</span>}
                {optLabel}
              </button>
            );
          })}
        </div>
      );
    }

    if (q.type === "boolean") {
      return (
        <div className="option-grid">
          {(q.options || ["Yes", "No"]).map(opt => (
            <button key={opt}
              className={`option-chip ${val === opt ? "option-chip--selected" : ""}`}
              onClick={() => setAnswer(q.id, opt)}>
              {val === opt && <span className="option-chip__check">✓</span>}
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (q.type === "single-with-checkbox") {
      return (
        <div>
          <div className="option-grid">
            {(q.options || []).map(opt => {
              const isSelected = val?.option?.value === opt.value;
              return (
                <button key={opt.value}
                  className={`option-chip ${isSelected ? "option-chip--selected" : ""}`}
                  onClick={() => setAnswer(q.id, { option: opt, highTheftRisk: val?.highTheftRisk || false })}>
                  {isSelected && <span className="option-chip__check">✓</span>}
                  {opt.label}
                </button>
              );
            })}
          </div>
          {q.additionalCheckbox && (
            <label className="checkbox-row">
              <input type="checkbox" checked={val?.highTheftRisk || false}
                onChange={e => setAnswer(q.id, { ...val, highTheftRisk: e.target.checked })} />
              <span>{q.additionalCheckbox}</span>
            </label>
          )}
        </div>
      );
    }

    if (q.type === "multiple") {
      const arr = Array.isArray(val) ? val : [];
      return (
        <div className="option-grid">
          {(q.options || []).map(opt => {
            const isSelected = arr.some(a => a.value === opt.value);
            return (
              <button key={opt.value}
                className={`option-chip ${isSelected ? "option-chip--selected" : ""}`}
                onClick={() => setAnswer(q.id, isSelected ? arr.filter(a => a.value !== opt.value) : [...arr, opt])}>
                {isSelected && <span className="option-chip__check">✓</span>}
                {opt.label}
              </button>
            );
          })}
        </div>
      );
    }

    if (q.type === "dual-single" || q.type === "dual-single2") {
      const current = (val && typeof val === "object") ? val : {};
      return (
        <div className="dual-wrap">
          {(q.subQuestions || []).map(sq => {
            const key = sq.label.toLowerCase();
            return (
              <div key={key} className="dual-group">
                <div className="dual-group__label">{sq.label}</div>
                <div className="option-grid">
                  {(sq.options || []).map(opt => {
                    const isSelected = current[key]?.value === opt.value;
                    return (
                      <button key={opt.value}
                        className={`option-chip option-chip--small ${isSelected ? "option-chip--selected" : ""}`}
                        onClick={() => setAnswer(q.id, { ...current, [key]: opt })}>
                        {isSelected && <span className="option-chip__check">✓</span>}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (q.type === "scale") {
      const current = (val && typeof val === "object") ? val : {};
      return (
        <div className="scale-wrap">
          {(q.options || []).map(opt => (
            <div key={opt.value} className="scale-row">
              <span className="scale-row__label">{opt.label}</span>
              <div className="scale-row__buttons">
                {(q.scaleRange || [1, 2, 3, 4, 5]).map(n => (
                  <button key={n}
                    className={`scale-btn ${current[opt.value] === n ? "option-chip--selected" : ""}`}
                    onClick={() => setAnswer(q.id, { ...current, [opt.value]: n })}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  /* ════════════════════════════════════════
     RESULTS PANEL RENDERER
     ════════════════════════════════════════ */
  const renderResults = () => {
    if (!result || !result.sitePackages?.length) {
      return (
        <div className="result-empty">
          <div className="result-empty__icon">⚡</div>
          <p>Answer questions to see<br />live recommendations</p>
          <span>At least 2 answers needed</span>
        </div>
      );
    }

    const { sitePackages, pocTotals, allTotals, totalSites } = result;

    return (
      <div className="result-content">
        {sitePackages.map((sp, idx) => {
          const pkg = sp.package;
          const isExpanded = expandedResultSite === idx;
          if (!pkg) return null;

          return (
            <div key={sp.site_id || idx} className="result-site">
              {/* Site header — clickable */}
              <div className="result-site__header" onClick={() => setExpandedResultSite(isExpanded ? null : idx)}>
                <div className="result-site__left">
                  <span className="result-site__badge">Site {sp.site_number}</span>
                  <span className="result-site__name">{sp.site_name}</span>
                </div>
                <span className="result-site__service">{pkg.servicesLabel || "—"}</span>
                <span className="result-site__arrow">{isExpanded ? "▼" : "▶"}</span>
              </div>

              {/* Expanded body */}
              {isExpanded && (
                <div className="result-site__body">
                  {/* Component table */}
                  <table className="result-table">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Hardware</th>
                        <th>Airtime</th>
                        <th className="result-table--right">Setup</th>
                        <th className="result-table--right">Monthly</th>
                        <th className="result-table--right">Managed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pkg.components || []).map((c, ci) => (
                        <tr key={ci}>
                          <td>
                            <span className="result-dot" style={{ background: c.color || "#3D72FC" }} />
                            {c.type}
                          </td>
                          <td>{c.hardware || "—"}</td>
                          <td>{c.airtime || "—"}</td>
                          <td className="result-table--right result-table--mono">{formatEuro(c.network_setup_fee)}</td>
                          <td className="result-table--right result-table--mono">{formatEuro(c.network_monthly_fee)}</td>
                          <td className="result-table--right result-table--mono">{formatEuro(c.managed_service_monthly)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="result-table__foot">
                        <td colSpan={3}><strong>Site Total</strong></td>
                        <td className="result-table--right result-table--mono"><strong>{formatEuro(pkg.totals?.network_setup_fee)}</strong></td>
                        <td className="result-table--right result-table--mono"><strong>{formatEuro(pkg.totals?.network_monthly_fee)}</strong></td>
                        <td className="result-table--right result-table--mono"><strong>{formatEuro(pkg.totals?.managed_service_monthly)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          );
        })}

        {/* ═══ Deployment Summary ═══ */}
        {allTotals && (
          <div className="deploy-summary">
            <h3 className="deploy-summary__title">Deployment Summary</h3>

            <div className="deploy-card">
              <div className="deploy-card__header">PoC · {Math.min(2, totalSites)} site{Math.min(2, totalSites) !== 1 ? "s" : ""}</div>
              <div className="deploy-card__row"><span>Setup Fee</span><strong>{formatEuro(pocTotals?.network_setup_fee)}</strong></div>
              <div className="deploy-card__row"><span>Monthly Fee</span><strong>{formatEuro(pocTotals?.network_monthly_fee)}</strong></div>
              <div className="deploy-card__row"><span>Managed Svc</span><strong>{formatEuro(pocTotals?.managed_service_monthly)}</strong></div>
            </div>

            <div className="deploy-card deploy-card--highlight">
              <div className="deploy-card__header">
                All {totalSites} Site{totalSites !== 1 ? "s" : ""}
                {allTotals.setup_discount_pct > 0 && ` · ${(allTotals.setup_discount_pct * 100).toFixed(0)}% discount`}
              </div>
              <div className="deploy-card__row"><span>Setup Fee</span><strong>{formatEuro(allTotals.network_setup_fee)}</strong></div>
              <div className="deploy-card__row"><span>Monthly Fee</span><strong>{formatEuro(allTotals.network_monthly_fee)}</strong></div>
              <div className="deploy-card__row"><span>Managed Svc</span><strong>{formatEuro(allTotals.managed_service_monthly)}</strong></div>
              <div className="deploy-card__row deploy-card__row--contract">
                <span>Contract Value ({allTotals.contract_months}mo)</span>
                <strong>{formatEuro(allTotals.contract_value)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ════════════════════════════════════════
     RENDER
     ════════════════════════════════════════ */
  return (
    <div className="fast-tester" ref={rootRef}>
      {/* ═══ LEFT PANEL ═══ */}
      <div className="fast-tester__left" style={{ width: panelOpen ? `${leftPct}%` : "100%" }}>
        {/* Header */}
        <div className="ft-header">
          <div className="ft-header__row">
            <h1 className="ft-header__title">⚡ Fast Tester</h1>
            <button className="ft-header__reset" onClick={clearAll}>✕ Reset</button>
          </div>
          <p className="ft-header__sub">Quick demo — pick locations, answer questions, see live results</p>
        </div>

        {/* Site tabs */}
        <div className="site-tabs">
          {sites.map((s, i) => (
            <div key={s.id} className={`site-tab ${i === activeIdx ? "site-tab--active" : ""}`} onClick={() => setActiveIdx(i)}>
              {editingName === i ? (
                <div className="site-tab__edit" onClick={e => e.stopPropagation()}>
                  <input className="site-tab__input" value={nameInput}
                    onChange={e => setNameInput(e.target.value)} autoFocus
                    onKeyDown={e => { if (e.key === "Enter") renameSite(i, nameInput); if (e.key === "Escape") setEditingName(null); }} />
                  <button className="site-tab__save" onClick={() => renameSite(i, nameInput)}>✓</button>
                </div>
              ) : (
                <span className="site-tab__name">{s.name}</span>
              )}
              <div className="site-tab__actions" onClick={e => e.stopPropagation()}>
                <button title="Rename" onClick={() => { setEditingName(i); setNameInput(s.name); }}>✏️</button>
                <button title="Copy site with all answers" onClick={() => copySite(i)}>📋</button>
                {sites.length > 1 && <button title="Delete site" onClick={() => deleteSite(i)}>✕</button>}
              </div>
            </div>
          ))}
          <button className="site-tab site-tab--add" onClick={addSite}>+ Add Site</button>
        </div>

        {/* Location */}
        <div className="location-box">
          <div className="location-box__bar">
            <span className="location-box__icon">📍</span>
            {activeSite.location ? (
              <span className="location-box__text">{[activeSite.location.city, activeSite.location.country].filter(Boolean).join(", ") || activeSite.location.address}</span>
            ) : (
              <span className="location-box__empty">Click map to set location</span>
            )}
            <button className="location-box__toggle" onClick={() => setShowMap(!showMap)}>
              {showMap ? "Hide Map ▲" : "Show Map ▼"}
            </button>
          </div>
          {showMap && (
            <div id="ftmap" style={{ height: 220, borderRadius: 10, marginTop: 12, border: "1px solid rgba(255,255,255,0.08)" }} />
          )}
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${Math.round(answeredCount / totalQuestions * 100)}%` }} />
          <span className="progress-bar__text">{answeredCount}/{totalQuestions}</span>
        </div>

        {/* Questions by section */}
        <div className="questions-list">
          {Object.entries(sections).map(([sectionName, questions]) => (
            <div key={sectionName} className="question-section">
              <h3 className="question-section__title">{SEC_ICONS[sectionName] || "📝"} {sectionName}</h3>
              {questions.map(q => {
                const hasAnswer = answers[q.id] != null;
                return (
                  <div key={q.id} className={`question-card ${hasAnswer ? "question-card--answered" : ""}`}>
                    <div className="question-card__header">
                      <span className="question-card__number">Q{q.id}</span>
                      <span className="question-card__text">{q.question}</span>
                      {hasAnswer && <span className="question-card__done">✓</span>}
                    </div>
                    <div className="question-card__body">
                      {renderQuestion(q)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ DRAG HANDLE ═══ */}
      {panelOpen && (
        <div className="drag-handle" onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
          <div className="drag-handle__grip" />
        </div>
      )}

      {/* ═══ RIGHT PANEL ═══ */}
      <div className={`fast-tester__right ${panelOpen ? "fast-tester__right--open" : "fast-tester__right--closed"}`}
        style={panelOpen ? { width: `${100 - leftPct}%` } : {}}>
        <button className="panel-toggle" onClick={() => setPanelOpen(!panelOpen)}>
          {panelOpen ? "▶" : "◀"}
          {!panelOpen && <span className="panel-toggle__label">Results</span>}
        </button>

        {panelOpen && (
          <div className="result-panel">
            <div className="result-panel__header">
              <h2>📦 Recommendation</h2>
              {loading && <span className="result-panel__loading">Updating…</span>}
              {lastUpdate && !loading && <span className="result-panel__time">{lastUpdate}</span>}
            </div>
            {renderResults()}
          </div>
        )}
      </div>

      <style jsx>{`
        /* ═══════════════════════════
           LAYOUT
           ═══════════════════════════ */
        .fast-tester { display:flex; min-height:100vh; background:#070c14; position:relative; }
        .fast-tester__left { overflow-y:auto; max-height:100vh; padding:28px 26px 80px; flex-shrink:0; }
        .fast-tester__right { position:sticky; top:0; height:100vh; overflow-y:auto; background:rgba(6,8,18,0.98); border-left:1px solid rgba(255,255,255,0.06); z-index:10; flex-shrink:0; }
        .fast-tester__right--open { min-width:360px; }
        .fast-tester__right--closed { width:38px !important; min-width:38px; }

        /* ═══ DRAG HANDLE ═══ */
        .drag-handle { width:10px; cursor:col-resize; display:flex; align-items:center; justify-content:center; flex-shrink:0; z-index:20; transition:background .2s; }
        .drag-handle:hover, .drag-handle:active { background:rgba(61,114,252,0.08); }
        .drag-handle__grip { width:4px; height:52px; border-radius:2px; background:rgba(255,255,255,0.1); transition:background .2s; }
        .drag-handle:hover .drag-handle__grip, .drag-handle:active .drag-handle__grip { background:rgba(61,114,252,0.5); }

        /* ═══ PANEL TOGGLE ═══ */
        .panel-toggle { position:absolute; left:-1px; top:50%; transform:translateY(-50%); padding:14px 6px; background:rgba(61,114,252,0.1); border:1px solid rgba(61,114,252,0.25); border-right:none; border-radius:8px 0 0 8px; color:#5CB0E9; font-size:12px; cursor:pointer; z-index:11; display:flex; flex-direction:column; align-items:center; gap:4px; }
        .panel-toggle:hover { background:rgba(61,114,252,0.2); }
        .panel-toggle__label { writing-mode:vertical-rl; font-size:11px; font-weight:700; letter-spacing:1px; }

        /* ═══ RESULT PANEL CONTAINER ═══ */
        .result-panel { padding:24px 22px; }
        .result-panel__header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
        .result-panel__header h2 { font-size:18px; font-weight:700; color:#fff; margin:0; }
        .result-panel__loading { font-size:12px; color:#FFC107; font-weight:600; animation:loadpulse 1s infinite; }
        @keyframes loadpulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .result-panel__time { font-size:11px; color:rgba(255,255,255,0.2); }

        /* ═══ HEADER ═══ */
        .ft-header { margin-bottom:20px; }
        .ft-header__row { display:flex; align-items:center; justify-content:space-between; }
        .ft-header__title { font-size:28px; font-weight:800; margin:0; background:linear-gradient(135deg,#FFC107,#FF9800); -webkit-text-fill-color:transparent; background-clip:text; }
        .ft-header__sub { font-size:13px; color:rgba(255,255,255,0.4); margin:6px 0 0; }
        .ft-header__reset { padding:7px 16px; background:rgba(250,86,116,0.08); border:1px solid rgba(250,86,116,0.2); border-radius:8px; color:#FA5674; font-size:12px; font-weight:600; cursor:pointer; }
        .ft-header__reset:hover { background:rgba(250,86,116,0.15); }

        /* ═══ SITE TABS ═══ */
        .site-tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px; }
        .site-tab { display:flex; align-items:center; gap:8px; padding:8px 14px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:10px; font-size:13px; color:rgba(255,255,255,0.55); cursor:pointer; transition:all .2s; }
        .site-tab:hover { border-color:rgba(255,255,255,0.14); }
        .site-tab--active { background:rgba(61,114,252,0.1); border-color:rgba(61,114,252,0.4); color:#5CB0E9; font-weight:600; }
        .site-tab--add { border-style:dashed; color:rgba(92,176,233,0.6); }
        .site-tab--add:hover { background:rgba(92,176,233,0.06); border-color:rgba(92,176,233,0.35); }
        .site-tab__name { cursor:pointer; }
        .site-tab__actions { display:flex; gap:4px; }
        .site-tab__actions button { background:none; border:none; cursor:pointer; font-size:12px; padding:2px 5px; border-radius:4px; opacity:.5; transition:opacity .15s; }
        .site-tab__actions button:hover { opacity:1; background:rgba(255,255,255,0.08); }
        .site-tab__edit { display:flex; gap:4px; align-items:center; }
        .site-tab__input { padding:4px 8px; background:rgba(255,255,255,0.07); border:1px solid rgba(61,114,252,0.4); border-radius:6px; color:#fff; font-size:13px; outline:none; width:120px; }
        .site-tab__save { padding:3px 8px; background:rgba(61,114,252,0.2); border:none; border-radius:4px; color:#5CB0E9; cursor:pointer; font-size:12px; }

        /* ═══ LOCATION ═══ */
        .location-box { margin-bottom:16px; padding:14px 18px; background:rgba(255,255,255,0.018); border:1px solid rgba(255,255,255,0.05); border-radius:12px; }
        .location-box__bar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .location-box__icon { font-size:14px; }
        .location-box__text { font-size:13px; color:#5CB0E9; flex:1; }
        .location-box__empty { font-size:12px; color:rgba(255,255,255,0.25); font-style:italic; flex:1; }
        .location-box__toggle { padding:6px 14px; background:rgba(61,114,252,0.1); border:1px solid rgba(61,114,252,0.25); border-radius:7px; color:#5CB0E9; font-size:11px; font-weight:600; cursor:pointer; }
        .location-box__toggle:hover { background:rgba(61,114,252,0.18); }

        /* ═══ PROGRESS ═══ */
        .progress-bar { position:relative; height:5px; background:rgba(255,255,255,0.04); border-radius:3px; margin-bottom:20px; overflow:hidden; }
        .progress-bar__fill { height:100%; background:linear-gradient(90deg,#3D72FC,#5CB0E9); border-radius:3px; transition:width .4s; }
        .progress-bar__text { position:absolute; right:0; top:-17px; font-size:11px; color:rgba(255,255,255,0.25); font-weight:600; }

        /* ═══ QUESTION SECTIONS ═══ */
        .questions-list { display:flex; flex-direction:column; gap:28px; }
        .question-section__title { font-size:13px; font-weight:700; color:rgba(92,176,233,0.75); text-transform:uppercase; letter-spacing:.8px; margin:0 0 12px; padding-bottom:8px; border-bottom:1px solid rgba(92,176,233,0.08); }
        .question-card { padding:14px 16px; background:rgba(255,255,255,0.012); border:1px solid rgba(255,255,255,0.04); border-radius:12px; margin-bottom:8px; transition:all .2s; }
        .question-card:hover { border-color:rgba(255,255,255,0.08); }
        .question-card--answered { border-left:3px solid rgba(92,176,233,0.5); background:rgba(92,176,233,0.012); }
        .question-card__header { display:flex; align-items:flex-start; gap:10px; margin-bottom:10px; }
        .question-card__number { flex-shrink:0; padding:3px 8px; background:rgba(61,114,252,0.1); border-radius:6px; font-size:10px; font-weight:700; color:#5CB0E9; }
        .question-card__text { font-size:13px; color:rgba(255,255,255,0.75); line-height:1.4; flex:1; }
        .question-card__done { color:#22c55e; font-weight:700; font-size:14px; flex-shrink:0; }
        .question-card__body { padding-top:2px; }

        /* ═══ OPTION CHIPS ═══ */
        .option-grid { display:flex; flex-wrap:wrap; gap:6px; }
        .option-chip {
          position:relative; padding:7px 14px;
          background:rgba(255,255,255,0.025);
          border:1.5px solid rgba(255,255,255,0.08);
          border-radius:8px; color:rgba(255,255,255,0.6);
          font-size:12px; cursor:pointer; transition:all .18s;
          white-space:nowrap; display:inline-flex; align-items:center; gap:5px;
        }
        .option-chip:hover { background:rgba(61,114,252,0.08); border-color:rgba(61,114,252,0.3); color:rgba(255,255,255,0.9); }
        .option-chip--selected {
          background:rgba(61,114,252,0.2) !important;
          border-color:#3D72FC !important;
          color:#fff !important;
          font-weight:600;
          box-shadow:0 0 0 1px rgba(61,114,252,0.15), 0 2px 8px rgba(61,114,252,0.12);
        }
        .option-chip__check { font-size:11px; color:#5CB0E9; font-weight:700; }
        .option-chip--small { padding:5px 10px; font-size:11px; }

        .checkbox-row { display:flex; align-items:center; gap:8px; margin-top:8px; font-size:12px; color:rgba(255,255,255,0.5); cursor:pointer; }
        .checkbox-row input { width:14px; height:14px; accent-color:#3D72FC; }

        .dual-wrap { display:flex; flex-direction:column; gap:10px; }
        .dual-group { display:flex; flex-direction:column; gap:6px; }
        .dual-group__label { font-size:10px; font-weight:700; color:rgba(92,176,233,0.65); text-transform:uppercase; letter-spacing:.5px; }

        .scale-wrap { display:flex; flex-direction:column; gap:8px; }
        .scale-row { display:flex; align-items:center; gap:10px; }
        .scale-row__label { font-size:12px; color:rgba(255,255,255,0.55); flex:1; min-width:100px; }
        .scale-row__buttons { display:flex; gap:4px; }
        .scale-btn {
          width:32px; height:32px; border-radius:7px;
          background:rgba(255,255,255,0.025); border:1.5px solid rgba(255,255,255,0.07);
          color:rgba(255,255,255,0.5); font-size:12px; cursor:pointer;
          display:flex; align-items:center; justify-content:center; transition:all .15s;
        }

        /* ═══════════════════════════
           RESULTS PANEL STYLES
           ═══════════════════════════ */
        .result-empty { text-align:center; padding:80px 20px; }
        .result-empty__icon { font-size:48px; margin-bottom:16px; }
        .result-empty p { font-size:15px; color:rgba(255,255,255,0.4); margin:0 0 8px; line-height:1.6; }
        .result-empty span { font-size:11px; color:rgba(255,255,255,0.18); }

        .result-content { display:flex; flex-direction:column; gap:18px; }

        /* ═══ Site result card ═══ */
        .result-site {
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:14px; overflow:hidden;
        }
        .result-site:hover { border-color:rgba(61,114,252,0.25); }

        .result-site__header {
          display:flex; align-items:center; gap:12px;
          padding:16px 20px; cursor:pointer; transition:background .15s;
        }
        .result-site__header:hover { background:rgba(255,255,255,0.015); }
        .result-site__left { display:flex; align-items:center; gap:10px; flex:1; min-width:0; }
        .result-site__badge {
          padding:4px 12px; background:linear-gradient(135deg,#3D72FC,#5CB0E9);
          border-radius:12px; font-size:11px; font-weight:700; color:#fff; flex-shrink:0;
        }
        .result-site__name { font-size:16px; font-weight:700; color:#fff; }
        .result-site__service { font-size:12px; color:rgba(255,255,255,0.45); white-space:nowrap; flex-shrink:0; }
        .result-site__arrow { font-size:12px; color:rgba(255,255,255,0.3); flex-shrink:0; }

        .result-site__body { padding:4px 16px 20px; }

        /* ═══ Component TABLE ═══ */
        .result-table { width:100%; border-collapse:collapse; margin-top:4px; }
        .result-table thead { background:rgba(255,255,255,0.03); }
        .result-table th {
          padding:10px 14px; text-align:left;
          font-size:10px; font-weight:700; color:rgba(255,255,255,0.4);
          text-transform:uppercase; letter-spacing:.5px;
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .result-table td {
          padding:12px 14px; font-size:13px; color:rgba(255,255,255,0.8);
          border-bottom:1px solid rgba(255,255,255,0.04);
        }
        .result-table tbody tr:last-child td { border-bottom:none; }
        .result-table--right { text-align:right !important; }
        .result-table--mono { font-variant-numeric:tabular-nums; }
        .result-dot {
          display:inline-block; width:8px; height:8px;
          border-radius:50%; margin-right:8px; vertical-align:middle;
        }
        .result-table__foot { background:rgba(61,114,252,0.06); }
        .result-table__foot td {
          border-top:2px solid rgba(61,114,252,0.3) !important;
          border-bottom:none !important; color:#fff;
          padding:14px;
        }

        /* ═══ Deployment Summary ═══ */
        .deploy-summary { margin-top:6px; }
        .deploy-summary__title {
          font-size:16px; font-weight:700; color:#fff;
          margin:0 0 14px; padding-bottom:10px;
          border-bottom:1px solid rgba(255,255,255,0.06);
        }

        .deploy-card {
          padding:18px 20px; margin-bottom:12px;
          background:rgba(255,255,255,0.018);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:12px;
        }
        .deploy-card--highlight {
          background:rgba(61,114,252,0.04);
          border-color:rgba(61,114,252,0.22);
        }
        .deploy-card__header {
          font-size:14px; font-weight:700; color:rgba(255,255,255,0.8);
          margin-bottom:14px;
        }
        .deploy-card__row {
          display:flex; justify-content:space-between; align-items:center;
          padding:7px 0;
        }
        .deploy-card__row span { font-size:13px; color:rgba(255,255,255,0.45); }
        .deploy-card__row strong { font-size:14px; color:#fff; font-variant-numeric:tabular-nums; }
        .deploy-card__row--contract {
          margin-top:10px; padding-top:12px;
          border-top:1px solid rgba(255,255,255,0.08);
        }
        .deploy-card__row--contract strong { color:#5CB0E9; font-size:18px; }

        /* ═══ RESPONSIVE ═══ */
        @media(max-width:900px) {
          .fast-tester { flex-direction:column; }
          .fast-tester__left { max-height:none !important; width:100% !important; padding:20px 16px 60px; }
          .drag-handle { display:none; }
          .fast-tester__right { position:fixed; right:0; top:0; height:100vh; box-shadow:-6px 0 24px rgba(0,0,0,0.6); }
          .fast-tester__right--closed { width:36px !important; min-width:36px; }
          .fast-tester__right--open { width:min(420px,90vw) !important; min-width:0 !important; }
        }
      `}</style>
    </div>
  );
}