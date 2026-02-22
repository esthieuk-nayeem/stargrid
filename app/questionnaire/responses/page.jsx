"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { fetchAllResponses, updateResponseStatus } from "@/lib/supabase";

// Format EUR
const fmtEuro = (v) => {
  const num = typeof v === "number" ? v : parseFloat(v) || 0;
  if (num === 0) return "—";
  return new Intl.NumberFormat("de-DE", { style:"currency", currency:"EUR", minimumFractionDigits:2 }).format(num);
};

export default function AdminResponsesPage() {
  const router = useRouter();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const limit = 20;

  useEffect(() => { loadResponses(); }, [page, statusFilter]);

  const loadResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, count } = await fetchAllResponses({ page, limit, status: statusFilter });
      setResponses(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error loading responses:", err);
      setError("Failed to load responses. Check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatus(id);
    try {
      await updateResponseStatus(id, newStatus);
      loadResponses();
    } catch (err) { console.error("Error updating status:", err); }
    finally { setUpdatingStatus(null); }
  };

  const totalPages = Math.ceil(totalCount / limit);
  const isComment = (resp) => resp.answers?.type === "tool_comment";
  const getContactSummary = (ci) => ci ? [ci.full_name, ci.company_name, ci.email].filter(Boolean).join(" · ") : "—";
  const getSiteCount = (resp) => isComment(resp) ? "Comment" : (resp.answers?.total_sites || 0);
  const formatDate = (d) => d ? new Date(d).toLocaleString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "—";

  const sc = {
    pending:   { bg:"rgba(255,193,7,0.15)",  color:"#FFC107", border:"rgba(255,193,7,0.3)" },
    reviewed:  { bg:"rgba(92,176,233,0.15)", color:"#5CB0E9", border:"rgba(92,176,233,0.3)" },
    contacted: { bg:"rgba(34,197,94,0.15)",  color:"#22c55e", border:"rgba(34,197,94,0.3)" },
    closed:    { bg:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)", border:"rgba(255,255,255,0.15)" },
  };

  // ── Render recommended package for a response ──
  const renderRecommendation = (rec) => {
    if (!rec || !rec.sitePackages || rec.sitePackages.length === 0) {
      return <p style={{ color:"rgba(255,255,255,0.4)", fontStyle:"italic" }}>No recommendation generated yet.</p>;
    }

    return (
      <div className="rec-wrap">
        {rec.sitePackages.map((sp, idx) => (
          <div key={sp.site_id || idx} className="rec-site">
            <div className="rec-site__hdr">
              <span className="rec-badge">Site {sp.site_number}</span>
              <strong>{sp.site_name}</strong>
              <span className="rec-label">{sp.package?.servicesLabel || "—"}</span>
            </div>

            <table className="rec-tbl">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Product</th>
                  <th>Airtime</th>
                  <th className="r">Setup</th>
                  <th className="r">Monthly</th>
                  <th className="r">Managed</th>
                </tr>
              </thead>
              <tbody>
                {(sp.package?.components || []).map((c, ci) => (
                  <tr key={ci}>
                    <td>
                      <span className="rec-dot" style={{ background: c.color || "#3D72FC" }} />
                      {c.type}
                    </td>
                    <td>{c.hardware || c.name || "—"}</td>
                    <td>{c.airtime || "—"}</td>
                    <td className="r">{fmtEuro(c.network_setup_fee)}</td>
                    <td className="r">{fmtEuro(c.network_monthly_fee)}</td>
                    <td className="r">{fmtEuro(c.managed_service_monthly)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="rec-total">
                  <td colSpan={3}><strong>Site Total</strong></td>
                  <td className="r"><strong>{fmtEuro(sp.package?.totals?.network_setup_fee)}</strong></td>
                  <td className="r"><strong>{fmtEuro(sp.package?.totals?.network_monthly_fee)}</strong></td>
                  <td className="r"><strong>{fmtEuro(sp.package?.totals?.managed_service_monthly)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}

        {/* Summary totals */}
        {rec.allTotals && (
          <div className="rec-summary">
            <div className="rec-summary__row">
              <span>All Sites Setup</span>
              <strong>{fmtEuro(rec.allTotals.discounted_setup)}</strong>
              {rec.allTotals.setup_discount_pct > 0 && (
                <span className="rec-discount">({(rec.allTotals.setup_discount_pct * 100).toFixed(0)}% discount)</span>
              )}
            </div>
            <div className="rec-summary__row">
              <span>Monthly Total</span>
              <strong>{fmtEuro((rec.allTotals.network_monthly_fee || 0) + (rec.allTotals.managed_service_monthly || 0))}</strong>
            </div>
            <div className="rec-summary__row rec-summary__row--hl">
              <span>Contract Value ({rec.allTotals.contract_months || 36}mo)</span>
              <strong className="rec-cv">{fmtEuro(rec.allTotals.contract_value)}</strong>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admin">
      <div className="admin__header">
        <h1>📊 Response Log</h1>
        <p>{totalCount} total responses</p>
      </div>

      <div className="admin__filters">
        {["all","pending","reviewed","contacted","closed"].map(s => (
          <button key={s}
            className={`filter-btn ${(s==="all" ? statusFilter===null : statusFilter===s) ? "filter-btn--active" : ""}`}
            onClick={() => { setStatusFilter(s==="all"?null:s); setPage(1); }}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
        ))}
        <button className="filter-btn filter-btn--refresh" onClick={loadResponses}>🔄 Refresh</button>
      </div>

      {error && <div className="admin__error">{error}</div>}

      {loading ? (
        <div className="admin__loading"><div className="spinner"></div><p>Loading responses...</p></div>
      ) : responses.length === 0 ? (
        <div className="admin__empty"><p>No responses found.</p></div>
      ) : (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr><th>ID</th><th>Date</th><th>Contact</th><th>Sites</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {responses.map(resp => {
                const isExp = expandedRow === resp.id;
                const colors = sc[resp.status] || sc.pending;
                return (
                  <Fragment key={resp.id}>
                    <tr className={`admin__row ${isExp ? "admin__row--expanded" : ""}`}>
                      <td className="id-cell">#{resp.id}</td>
                      <td>{formatDate(resp.submitted_at)}</td>
                      <td className="contact-cell">{getContactSummary(resp.contact_info)}</td>
                      <td>{getSiteCount(resp)}</td>
                      <td>
                        <span className="status-badge" style={{ background:colors.bg, color:colors.color, borderColor:colors.border }}>
                          {resp.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" onClick={() => setExpandedRow(isExp ? null : resp.id)}>
                            {isExp ? "▲ Close" : "▼ Details"}
                          </button>
                          <select className="status-select" value={resp.status||"pending"}
                            onChange={e => handleStatusChange(resp.id, e.target.value)}
                            disabled={updatingStatus === resp.id}>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      </td>
                    </tr>

                    {isExp && (
                      <tr className="admin__detail-row">
                        <td colSpan={6}>
                          <div className="detail-content">
                            <div className="detail-section">
                              <h4>👤 Contact Information</h4>
                              <div className="detail-grid">
                                {resp.contact_info && Object.entries(resp.contact_info).map(([k,v]) => v && (
                                  <div key={k} className="detail-item">
                                    <span className="detail-label">{k.replace(/_/g," ")}</span>
                                    <span className="detail-value">{String(v)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {isComment(resp) && resp.comment && (
                              <div className="detail-section">
                                <h4>💬 Comment</h4>
                                <p className="comment-text">{resp.comment}</p>
                              </div>
                            )}

                            {!isComment(resp) && resp.answers?.sites && (
                              <div className="detail-section">
                                <h4>📍 Sites ({resp.answers.total_sites})</h4>
                                {resp.answers.sites.map((site, si) => (
                                  <div key={site.site_id || si} className="site-detail">
                                    <div className="site-detail__header">
                                      <strong>Site {site.site_number}: {site.site_name}</strong>
                                      <span className="site-detail__meta">
                                        {site.site_type} · {site.location?.country || "Unknown"} · {site.completion_percentage}% complete
                                      </span>
                                    </div>
                                    <div className="site-detail__answers">
                                      {Object.entries(site.answers || {}).map(([qKey, qData]) => qData?.answered && (
                                        <div key={qKey} className="qa-row">
                                          <span className="qa-q">{qKey}: {qData.question_text}</span>
                                          <span className="qa-a">
                                            {typeof qData.display_answer === "object"
                                              ? JSON.stringify(qData.display_answer)
                                              : Array.isArray(qData.display_answer)
                                                ? qData.display_answer.join(", ")
                                                : String(qData.display_answer || "—")}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* ═══ RECOMMENDED PACKAGE (replaces Scoring Data) ═══ */}
                            <div className="detail-section">
                              <h4>📦 Recommended Package</h4>
                              {renderRecommendation(resp.recommendation)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="admin__pagination">
          <button disabled={page<=1} onClick={() => setPage(p=>p-1)} className="page-btn">← Prev</button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button disabled={page>=totalPages} onClick={() => setPage(p=>p+1)} className="page-btn">Next →</button>
        </div>
      )}

      <div className="admin__footer">
        <button onClick={() => router.push("/")} className="back-btn">← Back to Home</button>
      </div>

      <style jsx>{`
        .admin { max-width:1400px; margin:0 auto; padding:60px 20px; min-height:100vh; }
        .admin__header { text-align:center; margin-bottom:40px; }
        .admin__header h1 { font-size:36px; font-weight:700; color:#fff; margin-bottom:8px; background:linear-gradient(270deg,#5CB0E9,#3D72FC); -webkit-text-fill-color:transparent; background-clip:text; }
        .admin__header p { font-size:16px; color:rgba(255,255,255,0.5); }
        .admin__filters { display:flex; gap:8px; margin-bottom:24px; flex-wrap:wrap; }
        .filter-btn { padding:8px 18px; border-radius:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.7); font-size:14px; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .filter-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }
        .filter-btn--active { background:rgba(61,114,252,0.2); border-color:rgba(61,114,252,0.5); color:#5CB0E9; }
        .filter-btn--refresh { margin-left:auto; }
        .admin__error { padding:16px; background:rgba(250,86,116,0.1); border:1px solid rgba(250,86,116,0.3); border-radius:12px; color:#FA5674; margin-bottom:20px; }
        .admin__loading { text-align:center; padding:60px; }
        .spinner { width:40px; height:40px; border:4px solid rgba(255,255,255,0.1); border-top-color:#3D72FC; border-radius:50%; animation:sp 0.8s linear infinite; margin:0 auto 12px; }
        @keyframes sp { to { transform:rotate(360deg); } }
        .admin__loading p { color:rgba(255,255,255,0.5); }
        .admin__empty { text-align:center; padding:60px; color:rgba(255,255,255,0.5); }
        .admin__table-wrap { overflow-x:auto; border-radius:16px; border:1px solid rgba(255,255,255,0.08); }
        .admin__table { width:100%; border-collapse:collapse; }
        .admin__table thead { background:rgba(255,255,255,0.04); }
        .admin__table th { padding:14px 18px; text-align:left; font-size:12px; font-weight:600; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.5px; }
        .admin__table td { padding:14px 18px; font-size:14px; color:rgba(255,255,255,0.85); border-bottom:1px solid rgba(255,255,255,0.06); }
        .admin__row { transition:background 0.2s; }
        .admin__row:hover { background:rgba(255,255,255,0.03); }
        .admin__row--expanded { background:rgba(61,114,252,0.05); }
        .id-cell { font-weight:700; color:#5CB0E9; }
        .contact-cell { max-width:300px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .status-badge { display:inline-block; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600; border:1px solid; text-transform:capitalize; }
        .action-btns { display:flex; gap:8px; align-items:center; }
        .action-btn { padding:6px 14px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; color:rgba(255,255,255,0.7); font-size:12px; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
        .action-btn:hover { background:rgba(61,114,252,0.2); border-color:#3D72FC; color:#5CB0E9; }
        .status-select { padding:6px 10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:rgba(255,255,255,0.8); font-size:12px; cursor:pointer; }
        .status-select option { background:#1a1f35; color:white; }
        .admin__detail-row td { padding:0; }
        .detail-content { padding:20px 24px 28px; background:rgba(255,255,255,0.02); display:flex; flex-direction:column; gap:24px; animation:sd 0.3s ease; }
        @keyframes sd { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .detail-section h4 { font-size:16px; font-weight:600; color:#fff; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .detail-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; }
        .detail-item { display:flex; flex-direction:column; gap:4px; padding:10px; background:rgba(255,255,255,0.03); border-radius:8px; }
        .detail-label { font-size:11px; color:rgba(255,255,255,0.5); text-transform:capitalize; font-weight:500; }
        .detail-value { font-size:14px; color:#fff; font-weight:500; }
        .comment-text { color:rgba(255,255,255,0.85); font-size:15px; line-height:1.6; padding:12px; background:rgba(255,255,255,0.03); border-radius:10px; margin:0; }
        .site-detail { padding:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; margin-bottom:12px; }
        .site-detail__header { margin-bottom:12px; }
        .site-detail__header strong { color:#fff; font-size:15px; display:block; margin-bottom:4px; }
        .site-detail__meta { font-size:12px; color:rgba(255,255,255,0.5); }
        .site-detail__answers { display:flex; flex-direction:column; gap:6px; }
        .qa-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .qa-q { font-size:12px; color:rgba(255,255,255,0.6); }
        .qa-a { font-size:13px; color:rgba(255,255,255,0.9); font-weight:500; }

        /* ═══ Recommendation styles ═══ */
        .rec-wrap { display:flex; flex-direction:column; gap:16px; }
        .rec-site { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; }
        .rec-site__hdr { display:flex; align-items:center; gap:12px; padding:14px 18px; background:rgba(61,114,252,0.06); border-bottom:1px solid rgba(255,255,255,0.06); flex-wrap:wrap; }
        .rec-badge { display:inline-flex; padding:3px 12px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); border-radius:12px; font-size:11px; font-weight:700; color:#fff; }
        .rec-site__hdr strong { color:#fff; font-size:14px; }
        .rec-label { font-size:12px; color:rgba(255,255,255,0.5); }

        .rec-tbl { width:100%; border-collapse:collapse; }
        .rec-tbl th { padding:10px 14px; text-align:left; font-size:10px; font-weight:600; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.5px; background:rgba(255,255,255,0.03); }
        .rec-tbl td { padding:10px 14px; font-size:13px; color:rgba(255,255,255,0.8); border-bottom:1px solid rgba(255,255,255,0.04); }
        .rec-tbl .r { text-align:right; font-variant-numeric:tabular-nums; }
        .rec-dot { display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:6px; vertical-align:middle; }
        .rec-total { background:rgba(61,114,252,0.08); }
        .rec-total td { border-top:2px solid rgba(61,114,252,0.4); border-bottom:none; color:#fff; }

        .rec-summary { padding:16px 18px; background:rgba(61,114,252,0.04); border:1px solid rgba(61,114,252,0.2); border-radius:12px; }
        .rec-summary__row { display:flex; justify-content:space-between; align-items:center; padding:6px 0; }
        .rec-summary__row span { font-size:13px; color:rgba(255,255,255,0.6); }
        .rec-summary__row strong { font-size:15px; color:#fff; }
        .rec-summary__row--hl { border-top:1px solid rgba(255,255,255,0.1); padding-top:12px; margin-top:6px; }
        .rec-cv { color:#5CB0E9 !important; font-size:18px !important; }
        .rec-discount { font-size:11px; color:rgba(92,176,233,0.8); margin-left:8px; }

        .admin__pagination { display:flex; justify-content:center; align-items:center; gap:16px; margin-top:28px; }
        .page-btn { padding:10px 20px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:rgba(255,255,255,0.7); font-size:14px; cursor:pointer; transition:all 0.2s; }
        .page-btn:hover:not(:disabled) { background:rgba(255,255,255,0.1); color:#fff; }
        .page-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .page-info { font-size:14px; color:rgba(255,255,255,0.6); }
        .admin__footer { margin-top:40px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.08); }
        .back-btn { padding:12px 24px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:rgba(255,255,255,0.7); font-size:14px; cursor:pointer; transition:all 0.2s; }
        .back-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }
        @media(max-width:768px) { .admin { padding:30px 12px; } .admin__header h1 { font-size:28px; } .qa-row { grid-template-columns:1fr; } .detail-grid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}