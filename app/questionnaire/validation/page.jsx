"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAllSites,
  validateSite,
  saveSiteAnswer,
  deleteSite,
  duplicateSite,
  updateSite,
  getSite,
} from "@/lib/multiSiteStorage";
import { questionnaireData } from "@/data/enhancedQuestionnaireData";

// ─── Inline Editor ────────────────────────────────────────────
function InlineEditor({ question, currentAnswer, onSave, onCancel }) {
  const [local, setLocal] = useState(currentAnswer ?? null);

  // ── single ──
  if (question.type === "single") {
    return (
      <div className="ie-wrap">
        <div className="ie-opts">
          {question.options.map(opt => (
            <button key={opt.value} className="ie-opt" onClick={() => onSave(opt)}>{opt.label}</button>
          ))}
        </div>
        <button className="ie-cancel" onClick={onCancel}>Cancel</button>
      </div>
    );
  }

  // ── boolean ──
  if (question.type === "boolean") {
    return (
      <div className="ie-wrap">
        <div className="ie-opts">
          {question.options.map(opt => (
            <button key={opt} className="ie-opt" onClick={() => onSave(opt)}>{opt}</button>
          ))}
        </div>
        <button className="ie-cancel" onClick={onCancel}>Cancel</button>
      </div>
    );
  }

  // ── single-with-checkbox ──
  if (question.type === "single-with-checkbox") {
    const [theft, setTheft] = useState(currentAnswer?.highTheftRisk || false);
    return (
      <div className="ie-wrap">
        <div className="ie-opts">
          {question.options.map(opt => (
            <button key={opt.value} className="ie-opt" onClick={() => onSave({ option: opt, highTheftRisk: theft })}>{opt.label}</button>
          ))}
        </div>
        {question.additionalCheckbox && (
          <label className="ie-checkbox-label">
            <input type="checkbox" checked={theft} onChange={e => setTheft(e.target.checked)} />
            <span>{question.additionalCheckbox}</span>
          </label>
        )}
        <button className="ie-cancel" onClick={onCancel}>Cancel</button>
      </div>
    );
  }

  // ── multiple ──
  if (question.type === "multiple") {
    const arr = Array.isArray(local) ? local : [];
    return (
      <div className="ie-wrap">
        <div className="ie-opts">
          {question.options.map(opt => {
            const selected = arr.find(a => a.value === opt.value);
            return (
              <button key={opt.value}
                className={`ie-opt ${selected ? "ie-opt--sel" : ""}`}
                onClick={() => setLocal(selected ? arr.filter(a => a.value !== opt.value) : [...arr, opt])}>
                {selected ? "✓ " : ""}{opt.label}
              </button>
            );
          })}
        </div>
        <div className="ie-actions">
          <button className="ie-cancel" onClick={onCancel}>Cancel</button>
          <button className="ie-save" onClick={() => onSave(local)}>Save</button>
        </div>
      </div>
    );
  }

  // ── FIXED: dual-single and dual-single2 ──
  // The bug was: subQuestions don't have a .key property.
  // Data is stored as { downlink: {...}, uplink: {...} }
  // We use the label lowercased as the key.
  if (question.type === "dual-single" || question.type === "dual-single2") {
    const ans = (local && typeof local === "object") ? { ...local } : {};
    return (
      <div className="ie-wrap">
        {question.subQuestions.map((sq, idx) => {
          // Derive the storage key from the label: "Downlink" -> "downlink", "Uplink" -> "uplink"
          const storageKey = sq.label.toLowerCase();
          return (
            <div key={storageKey} className="ie-dual">
              <div className="ie-dual-lbl">{sq.label}</div>
              <div className="ie-opts">
                {sq.options.map(opt => (
                  <button key={opt.value}
                    className={`ie-opt ${ans[storageKey]?.value === opt.value ? "ie-opt--sel" : ""}`}
                    onClick={() => setLocal(prev => ({ ...(prev || {}), [storageKey]: opt }))}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <div className="ie-actions">
          <button className="ie-cancel" onClick={onCancel}>Cancel</button>
          <button className="ie-save" onClick={() => onSave(local)}>Save</button>
        </div>
      </div>
    );
  }

  // ── scale ──
  if (question.type === "scale") {
    const ans = (local && typeof local === "object") ? local : {};
    return (
      <div className="ie-wrap">
        {question.options.map(opt => (
          <div key={opt.value} className="ie-scale-row">
            <span className="ie-scale-lbl">{opt.label}</span>
            <div className="ie-scale-btns">
              {question.scaleRange.map(val => (
                <button key={val}
                  className={`ie-scale-btn ${ans[opt.value] === val ? "ie-opt--sel" : ""}`}
                  onClick={() => setLocal(p => ({ ...(p || {}), [opt.value]: val }))}>
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="ie-actions">
          <button className="ie-cancel" onClick={onCancel}>Cancel</button>
          <button className="ie-save" onClick={() => onSave(local)}>Save</button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Site Name Editor ─────────────────────────────────────────
function SiteNameEditor({ site, onSave, onCancel }) {
  const [name, setName] = useState(site.name || "");
  return (
    <div className="ie-wrap" style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="ie-name-input"
        autoFocus
        placeholder="Site name"
      />
      <button className="ie-save" onClick={() => onSave(name)}>Save</button>
      <button className="ie-cancel" onClick={onCancel}>Cancel</button>
    </div>
  );
}

// ─── Answer display helper ────────────────────────────────────
function getAnswerDisplay(questionId, answer) {
  const q = questionnaireData.find(q => q.id === parseInt(questionId));
  if (!q || answer === null || answer === undefined) return "—";

  // FIXED: Handle dual-single and dual-single2 properly
  if (q.type === "dual-single" || q.type === "dual-single2") {
    // Data stored as { downlink: { label, value, score }, uplink: { label, value, score } }
    const parts = [];
    if (answer.downlink) {
      parts.push(`Down: ${answer.downlink.label || answer.downlink.value}`);
    }
    if (answer.uplink) {
      parts.push(`Up: ${answer.uplink.label || answer.uplink.value}`);
    }
    return parts.length > 0 ? parts.join("  •  ") : "—";
  }

  if (q.type === "scale" && typeof answer === "object") {
    return Object.entries(answer).map(([k, v]) => {
      const opt = q.options?.find(o => o.value === k);
      const label = opt ? opt.label : k;
      return `${label}: ${v}/5`;
    }).join(", ");
  }

  if (q.type === "single-with-checkbox") {
    const lbl = answer.option?.label || answer.label || "";
    return answer.highTheftRisk ? `${lbl} (High-theft-risk)` : lbl;
  }

  if (Array.isArray(answer)) return answer.map(a => a.label || a).join(", ");
  if (typeof answer === "object" && answer.label) return answer.label;
  if (typeof answer === "object" && answer.value) return answer.value;
  return String(answer);
}

// ─── Main Component ────────────────────────────────────────────
export default function ValidationSummary() {
  const router = useRouter();
  const [sites, setSites]               = useState([]);
  const [expandedSite, setExpandedSite] = useState(null);
  const [errors, setErrors]             = useState({});
  const [editingCell, setEditingCell]   = useState(null);
  const [editingSiteName, setEditingSiteName] = useState(null);
  const [saveFlash, setSaveFlash]       = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { load(); }, []);

  const load = () => {
    const all = getAllSites();
    setSites(all);
    const errs = {};
    all.forEach(s => {
      const v = validateSite(s.id);
      if (!v.valid) errs[s.id] = v.errors;
    });
    setErrors(errs);
  };

  const handleInlineSave = (siteId, qId, answer) => {
    saveSiteAnswer(siteId, qId, answer);
    const key = `${siteId}-${qId}`;
    setSaveFlash(key);
    setTimeout(() => setSaveFlash(null), 1600);
    setEditingCell(null);
    load();
  };

  const handleSiteNameSave = (siteId, newName) => {
    if (newName.trim()) {
      updateSite(siteId, { name: newName.trim() });
    }
    setEditingSiteName(null);
    load();
  };

  const handleDuplicate = (siteId) => {
    const ns = duplicateSite(siteId);
    load();
    if (ns) setExpandedSite(ns.id);
  };

  const handleDelete = (siteId) => {
    deleteSite(siteId);
    setConfirmDelete(null);
    if (expandedSite === siteId) setExpandedSite(null);
    load();
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) {
      alert("Please complete all required questions for all sites before submitting.");
      return;
    }
    router.push("/questionnaire/contact");
  };

  // FIXED: "Edit Location on Map" now goes to map picker mode, not question page
  const handleEditLocation = (siteId) => {
    // Pass a special param that tells the questionnaire page to show the map picker
    router.push(`/questionnaire?site=${siteId}&editLocation=true`);
  };

  const allValid = Object.keys(errors).length === 0;

  // Group questions by section for cleaner display
  const sections = {};
  questionnaireData.forEach(q => {
    if (!sections[q.section]) sections[q.section] = [];
    sections[q.section].push(q);
  });

  return (
    <div className="vs">
      <div className="vs__header">
        <h1>📋 Review Your Sites</h1>
        <p>You have finished the first Site of your Customer Case. Please add now additional sites. Instead you can also “copy” your site and edit the individual responses on the questions.</p>
      </div>

      {sites.length === 0 && (
        <div className="vs__empty">
          <p>No sites added yet. Please complete the questionnaire first.</p>
          <button onClick={() => router.push("/questionnaire")} className="btn btn--primary">Start Questionnaire</button>
        </div>
      )}

      <div className="vs__sites">
        {sites.map((site, si) => {
          const isExp = expandedSite === site.id;
          const hasErr = !!errors[site.id];
          return (
            <div key={site.id} className={`vs__card ${hasErr ? "vs__card--err" : ""}`}>

              {/* Card header */}
              <div className="vs__card-hdr" onClick={() => setExpandedSite(isExp ? null : site.id)}>
                <div className="vs__card-info">
                  {editingSiteName === site.id ? (
                    <div onClick={e => e.stopPropagation()}>
                      <SiteNameEditor
                        site={site}
                        onSave={(name) => handleSiteNameSave(site.id, name)}
                        onCancel={() => setEditingSiteName(null)}
                      />
                    </div>
                  ) : (
                    <h3>
                      <span className="site-badge">Site {si + 1}</span>
                      {site.name}
                      <button
                        className="name-edit-btn"
                        onClick={e => { e.stopPropagation(); setEditingSiteName(site.id); }}
                        title="Edit site name"
                      >✏️</button>
                    </h3>
                  )}
                  <p>📍 {site.location?.address || [site.location?.city, site.location?.country].filter(Boolean).join(", ") || "No address"}</p>
                </div>
                <div className="vs__card-right">
                  <span className={`badge ${hasErr ? "badge--err" : "badge--ok"}`}>
                    {hasErr ? `⚠️ Incomplete (${site.completionPercentage}%)` : "✓ Complete"}
                  </span>
                  <div className="vs-ctrl" onClick={e => e.stopPropagation()}>
                    <button className="vbtn vbtn--copy" onClick={() => handleDuplicate(site.id)}>⧉ Copy Site</button>
                    {sites.length > 1 && (
                      <button className="vbtn vbtn--del" onClick={() => setConfirmDelete(site.id)}>🗑 Delete</button>
                    )}
                  </div>
                  <span className="expand-icon">{isExp ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded body */}
              {isExp && (
                <div className="vs__body">
                  {/* Location */}
                  <div className="vs__section">
                    <h4>📍 Location Details</h4>
                    <div className="loc-grid">
                      {[
                        ["Address",        site.location?.address],
                        ["City",           site.location?.city],
                        ["State/Province", site.location?.state],
                        ["Country",        site.location?.country],
                        ["Postal Code",    site.location?.postalCode],
                        ["Site Type",      site.answers?.[22]?.label || site.answers?.[22]?.value],
                        ["Coordinates",    site.location?.lat != null ? `${site.location.lat.toFixed(6)}, ${site.location.lng.toFixed(6)}` : null],
                      ].filter(([, v]) => v).map(([l, v]) => (
                        <div key={l}><span className="loc-lbl">{l}:</span><span className="loc-val">{v}</span></div>
                      ))}
                    </div>
                    <button className="btn btn--edit mt12" onClick={() => handleEditLocation(site.id)}>
                      🗺️ Edit Location on Map
                    </button>
                  </div>

                  {/* Q&A grouped by section */}
                  {Object.entries(sections).map(([sectionName, questions]) => (
                    <div key={sectionName} className="vs__section">
                      <h4>📝 {sectionName}</h4>
                      <div className="ans-list">
                        {questions.map(q => {
                          const ans   = site.answers?.[q.id];
                          const fk    = `${site.id}-${q.id}`;
                          const isEd  = editingCell?.siteId === site.id && editingCell?.questionId === q.id;
                          return (
                            <div key={q.id} className={`ans-row ${saveFlash === fk ? "ans-row--flash" : ""}`}>
                              <span className="q-num">Q{q.id}</span>
                              <div className="ans-content">
                                <span className="q-text">{q.question}</span>
                                {isEd ? (
                                  <InlineEditor
                                    question={q}
                                    currentAnswer={ans}
                                    onSave={a => handleInlineSave(site.id, q.id, a)}
                                    onCancel={() => setEditingCell(null)}
                                  />
                                ) : (
                                  <div className="ans-display">
                                    <span className={`ans-val ${!ans ? "ans-val--empty" : ""}`}>
                                      {ans ? getAnswerDisplay(q.id, ans) : "Not answered"}
                                    </span>
                                    <button className="edit-btn" onClick={() => setEditingCell({ siteId: site.id, questionId: q.id })}>✏️ Edit</button>
                                    {saveFlash === fk && <span className="saved-chip">✓ Saved</span>}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Errors */}
                  {hasErr && (
                    <div className="vs__errors">
                      <h4>⚠️ Missing Information</h4>
                      <ul>{errors[site.id].map((e, i) => <li key={i}>{e}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add new site button */}
      <div className="vs__add-site">
        <button onClick={() => router.push("/questionnaire?newSite=true")} className="btn btn--add">
          + Add Another Site
        </button>
      </div>

      {sites.length > 0 && (
        <div className="vs__footer">
          <button onClick={() => router.push("/questionnaire")} className="btn btn--back">← Back to Questions</button>
          <button onClick={handleSubmit} disabled={!allValid} className="btn btn--submit">
            {allValid ? "✓ Continue to Contact Info →" : "⚠️ Complete All Sites First"}
          </button>
        </div>
      )}

      {/* Delete modal */}
      {confirmDelete && (() => {
        const t = sites.find(s => s.id === confirmDelete);
        return (
          <div className="modal-bg" onClick={() => setConfirmDelete(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Delete {t?.name}?</h3>
              <p>This will permanently remove the site and all its answers.</p>
              <div className="modal-actions">
                <button className="btn btn--back" onClick={() => setConfirmDelete(null)}>Cancel</button>
                <button className="btn btn--danger" onClick={() => handleDelete(confirmDelete)}>Delete</button>
              </div>
            </div>
          </div>
        );
      })()}

      <style jsx>{`
        .vs { max-width:1200px; margin:0 auto; padding:60px 20px; min-height:100vh; }
        .vs__header { text-align:center; margin-bottom:50px; }
        .vs__header h1 { font-size:42px; font-weight:700; margin-bottom:16px; background:linear-gradient(270deg,#5CB0E9,#3D72FC); -webkit-text-fill-color:transparent; background-clip:text; }
        .vs__header p { font-size:17px; color:rgba(255,255,255,0.7); }
        .vs__empty { text-align:center; padding:80px 20px; }
        .vs__empty p { font-size:18px; color:rgba(255,255,255,0.6); margin-bottom:24px; }
        .vs__sites { display:flex; flex-direction:column; gap:24px; margin-bottom:30px; }
        .vs__card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:20px; overflow:hidden; transition:all 0.3s; }
        .vs__card--err { border-color:rgba(250,86,116,0.3); }
        .vs__card-hdr { display:flex; justify-content:space-between; align-items:center; padding:28px 32px; cursor:pointer; transition:background 0.2s; }
        .vs__card-hdr:hover { background:rgba(255,255,255,0.05); }
        .site-badge { display:inline-block; padding:4px 12px; margin-right:10px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); border-radius:14px; font-size:12px; font-weight:700; color:white; }
        .vs__card-info h3 { font-size:22px; font-weight:700; color:var(--techguru-white,#fff); margin-bottom:8px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .vs__card-info p { font-size:15px; color:rgba(255,255,255,0.6); margin:0; }
        .name-edit-btn { background:none; border:none; cursor:pointer; font-size:14px; padding:2px 6px; border-radius:4px; transition:background 0.2s; }
        .name-edit-btn:hover { background:rgba(255,255,255,0.1); }
        .vs__card-right { display:flex; align-items:center; gap:14px; }
        .badge { padding:10px 20px; border-radius:24px; font-size:14px; font-weight:600; white-space:nowrap; }
        .badge--ok { background:rgba(92,176,233,0.2); color:#5CB0E9; border:1px solid rgba(92,176,233,0.3); }
        .badge--err { background:rgba(250,86,116,0.2); color:#FA5674; border:1px solid rgba(250,86,116,0.3); }
        .vs-ctrl { display:flex; gap:8px; }
        .vbtn { padding:8px 14px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid; transition:all 0.2s; white-space:nowrap; }
        .vbtn--copy { background:rgba(92,176,233,0.1); border-color:rgba(92,176,233,0.3); color:#5CB0E9; }
        .vbtn--copy:hover { background:rgba(92,176,233,0.2); transform:translateY(-1px); }
        .vbtn--del { background:rgba(250,86,116,0.1); border-color:rgba(250,86,116,0.3); color:#FA5674; }
        .vbtn--del:hover { background:rgba(250,86,116,0.2); transform:translateY(-1px); }
        .expand-icon { font-size:14px; color:rgba(255,255,255,0.5); }
        .vs__body { padding:0 32px 32px; display:flex; flex-direction:column; gap:32px; animation:sd 0.3s ease-out; }
        @keyframes sd { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .vs__section h4 { font-size:18px; font-weight:600; color:var(--techguru-white,#fff); margin-bottom:16px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .loc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:16px; }
        .loc-grid > div { display:flex; flex-direction:column; gap:6px; padding:14px; background:rgba(255,255,255,0.02); border-radius:10px; }
        .loc-lbl { font-size:12px; color:rgba(255,255,255,0.5); font-weight:500; text-transform:uppercase; }
        .loc-val { font-size:14px; color:var(--techguru-white,#fff); font-weight:500; }
        .mt12 { margin-top:12px; }
        .ans-list { display:flex; flex-direction:column; gap:10px; }
        .ans-row { display:flex; gap:16px; padding:14px 16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:12px; transition:all 0.2s; align-items:flex-start; }
        .ans-row:hover { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.1); }
        .ans-row--flash { border-color:rgba(92,176,233,0.45); background:rgba(92,176,233,0.06); }
        .q-num { flex-shrink:0; width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#3D72FC,#5CB0E9); border-radius:10px; font-size:12px; font-weight:700; color:white; }
        .ans-content { flex:1; display:flex; flex-direction:column; gap:8px; }
        .q-text { font-size:13px; color:rgba(255,255,255,0.7); line-height:1.4; }
        .ans-display { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .ans-val { font-size:15px; color:var(--techguru-white,#fff); font-weight:500; flex:1; }
        .ans-val--empty { color:rgba(255,255,255,0.3); font-style:italic; font-size:13px; }
        .edit-btn { flex-shrink:0; padding:5px 12px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:7px; color:rgba(255,255,255,0.65); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
        .edit-btn:hover { background:rgba(61,114,252,0.2); border-color:rgba(61,114,252,0.4); color:#5CB0E9; }
        .saved-chip { font-size:12px; color:#5CB0E9; font-weight:700; animation:fo 1.6s ease forwards; }
        @keyframes fo { 0%,70%{opacity:1} 100%{opacity:0} }
        .vs__errors { padding:20px; background:rgba(250,86,116,0.1); border:1px solid rgba(250,86,116,0.3); border-radius:14px; }
        .vs__errors h4 { font-size:16px; font-weight:600; color:#FA5674; margin-bottom:12px; border:none; padding:0; }
        .vs__errors ul { list-style:none; padding:0; margin:0; }
        .vs__errors li { font-size:14px; color:#FA5674; padding:8px 0 8px 24px; position:relative; }
        .vs__errors li::before { content:"⚠️"; position:absolute; left:0; }
        .vs__add-site { text-align:center; margin-bottom:30px; }
        .vs__footer { display:flex; justify-content:space-between; gap:24px; padding-top:32px; border-top:2px solid rgba(255,255,255,0.1); }
        .btn { padding:14px 28px; border-radius:12px; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.3s; border:none; }
        .btn--primary { background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:white; }
        .btn--primary:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(61,114,252,0.3); }
        .btn--edit { background:rgba(61,114,252,0.15); border:1px solid rgba(61,114,252,0.4); color:#5CB0E9; }
        .btn--edit:hover { background:rgba(61,114,252,0.25); transform:translateY(-2px); }
        .btn--add { background:rgba(92,176,233,0.15); border:1px solid rgba(92,176,233,0.4); color:#5CB0E9; padding:16px 36px; font-size:16px; }
        .btn--add:hover { background:rgba(92,176,233,0.25); transform:translateY(-2px); }
        .btn--back { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); color:var(--techguru-white,#fff); }
        .btn--back:hover { background:rgba(255,255,255,0.1); }
        .btn--submit { background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:white; }
        .btn--submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 30px rgba(61,114,252,0.4); }
        .btn--submit:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .btn--danger { background:rgba(250,86,116,0.2); border:1px solid rgba(250,86,116,0.4); color:#FA5674; }
        :global(.ie-wrap) { background:rgba(0,0,0,0.35); border:1px solid rgba(61,114,252,0.35); border-radius:12px; padding:14px; }
        :global(.ie-opts) { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
        :global(.ie-opt) { padding:7px 14px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; color:rgba(255,255,255,0.85); font-size:13px; cursor:pointer; transition:all 0.15s; }
        :global(.ie-opt:hover) { background:rgba(61,114,252,0.25); border-color:#3D72FC; color:white; }
        :global(.ie-opt--sel) { background:rgba(61,114,252,0.3) !important; border-color:#3D72FC !important; color:white !important; }
        :global(.ie-dual) { margin-bottom:12px; }
        :global(.ie-dual-lbl) { font-size:11px; font-weight:700; color:#5CB0E9; text-transform:uppercase; margin-bottom:8px; }
        :global(.ie-scale-row) { display:flex; align-items:center; gap:12px; margin-bottom:10px; flex-wrap:wrap; }
        :global(.ie-scale-lbl) { font-size:13px; color:rgba(255,255,255,0.75); flex:1; min-width:120px; }
        :global(.ie-scale-btns) { display:flex; gap:6px; }
        :global(.ie-scale-btn) { width:36px; height:36px; border-radius:8px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.7); font-size:13px; cursor:pointer; transition:all 0.15s; }
        :global(.ie-actions) { display:flex; gap:8px; justify-content:flex-end; margin-top:12px; }
        :global(.ie-save) { padding:8px 18px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); border:none; border-radius:8px; color:white; font-size:13px; font-weight:600; cursor:pointer; }
        :global(.ie-cancel) { padding:8px 18px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; color:rgba(255,255,255,0.6); font-size:13px; cursor:pointer; }
        :global(.ie-name-input) { padding:8px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(61,114,252,0.4); border-radius:8px; color:white; font-size:16px; font-weight:600; outline:none; min-width:200px; }
        :global(.ie-checkbox-label) { display:flex; align-items:center; gap:8px; margin:8px 0; font-size:13px; color:rgba(255,255,255,0.75); cursor:pointer; }
        :global(.ie-checkbox-label input) { width:16px; height:16px; }
        .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .modal-box { background:#1a1f35; border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:36px; max-width:420px; width:90%; }
        .modal-box h3 { font-size:22px; font-weight:700; color:white; margin-bottom:12px; }
        .modal-box p { font-size:15px; color:rgba(255,255,255,0.65); margin-bottom:28px; line-height:1.5; }
        .modal-actions { display:flex; gap:12px; justify-content:flex-end; }
        @media (max-width:768px) {
          .vs { padding:40px 16px; }
          .vs__header h1 { font-size:32px; }
          .vs__card-hdr { flex-direction:column; align-items:flex-start; gap:16px; padding:20px; }
          .vs__card-right { width:100%; flex-wrap:wrap; }
          .vs__body { padding:0 20px 20px; }
          .loc-grid { grid-template-columns:1fr; }
          .vs__footer { flex-direction:column; }
          .btn { width:100%; text-align:center; }
        }
      `}</style>
    </div>
  );
}