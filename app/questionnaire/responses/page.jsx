"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { fetchAllResponses, updateResponseStatus } from "@/lib/supabase";

const fmtEuro = (v) => {
  const num = typeof v === "number" ? v : parseFloat(v) || 0;
  if (num === 0) return "—";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(num);
};
const fmtEuroCSV = (v) => {
  const num = typeof v === "number" ? v : parseFloat(v) || 0;
  return num.toFixed(2);
};

const Q_LABELS = {
  "1": "Primary use case", "2": "Site environment", "3": "Purpose of connection",
  "4": "Monthly data volume", "5": "Average bandwidth", "6": "Peak bandwidth",
  "7": "SLA / Availability", "8": "Failover time", "9": "Latency tolerance",
  "10": "Network segmentation", "11": "Primary connectivity", "12": "Secondary connection",
  "13": "Number of devices", "14": "Industrial protocols", "15": "Power source",
  "16": "Battery autonomy", "17": "Housing / Enclosure", "18": "Deployment timeline",
  "19": "Contract duration", "20": "Budget priorities", "22": "Site type",
};

function extractAnswer(val) {
  if (val === null || val === undefined) return null;
  if (typeof val === "string") return val || null;
  if (Array.isArray(val)) {
    const labels = val.map(v => v?.label || String(v)).filter(Boolean);
    return labels.length > 0 ? labels.join(", ") : null;
  }
  if (typeof val === "object") {
    if (val.uplink || val.downlink) {
      const down = val.downlink?.label || val.downlink || "";
      const up = val.uplink?.label || val.uplink || "";
      if (down && up && down === up) return `↕ ${down}`;
      if (down && up) return `↓ ${down}  ·  ↑ ${up}`;
      return down || up || null;
    }
    if (val.option?.label) {
      let text = val.option.label;
      if (val.highTheftRisk) text += " (High theft risk)";
      return text;
    }
    if (val.label) return val.label;
    if (val.tco !== undefined || val.reliability !== undefined) {
      const parts = [];
      if (val.reliability) parts.push(`Reliability: ${val.reliability}/5`);
      if (val.speed) parts.push(`Speed: ${val.speed}/5`);
      if (val.capex) parts.push(`CapEx: ${val.capex}/5`);
      if (val.opex) parts.push(`OpEx: ${val.opex}/5`);
      if (val.tco) parts.push(`TCO: ${val.tco}/5`);
      return parts.join("  ·  ") || null;
    }
    if (val.minGB !== undefined || val.maxGB !== undefined) return val.label || null;
    if (val.value) return val.label || String(val.value);
    return val.label || null;
  }
  return String(val);
}

/* ═══════════════════════════════════════════════
   CSV Export
   ═══════════════════════════════════════════════ */
function exportResponseCSV(resp) {
  const rows = [];
  const esc = (s) => {
    const str = String(s ?? "").replace(/"/g, '""');
    return str.includes(",") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
  };

  rows.push(["StarGrid Response Export"]);
  rows.push(["Response ID", `#${resp.id}`]);
  rows.push(["Date", resp.created_at ? new Date(resp.created_at).toLocaleString("en-GB") : ""]);
  rows.push(["Status", resp.status || "pending"]);
  rows.push([]);

  rows.push(["CONTACT INFORMATION"]);
  if (resp.contact_info) {
    for (const [k, v] of Object.entries(resp.contact_info)) {
      if (v) rows.push([k.replace(/_/g, " "), String(v)]);
    }
  }
  rows.push([]);

  const sites = resp.answers?.sites || [];
  sites.forEach((site, si) => {
    const siteName = site.site_name || site.name || `Site ${si + 1}`;
    const loc = site.location;
    const locStr = [loc?.address, loc?.city, loc?.country].filter(Boolean).join(", ");

    rows.push([`SITE ${si + 1}: ${siteName}`]);
    if (locStr) rows.push(["Location", locStr]);
    const siteType = site.answers?.["22"]?.label || site.answers?.["22"] || "";
    if (siteType) rows.push(["Site Type", siteType]);
    rows.push([]);

    rows.push(["Question", "Answer"]);
    for (const [qNum, qLabel] of Object.entries(Q_LABELS)) {
      const rawVal = site.answers?.[qNum];
      const display = extractAnswer(rawVal);
      if (display) rows.push([`Q${qNum}: ${qLabel}`, display]);
    }
    rows.push([]);
  });

  const rec = resp.recommendation;
  if (rec?.sitePackages?.length > 0) {
    rows.push(["RECOMMENDED PACKAGE"]);
    rows.push([]);
    rec.sitePackages.forEach((sp) => {
      rows.push([`Site ${sp.site_number}: ${sp.site_name}`, sp.package?.servicesLabel || ""]);
      rows.push(["Component", "Hardware", "Airtime", "Setup Fee (EUR)", "Monthly Fee (EUR)", "Managed Svc (EUR)"]);
      (sp.package?.components || []).forEach(c => {
        rows.push([c.type, c.hardware || "", c.airtime || "", fmtEuroCSV(c.network_setup_fee), fmtEuroCSV(c.network_monthly_fee), fmtEuroCSV(c.managed_service_monthly)]);
      });
      const t = sp.package?.totals;
      if (t) rows.push(["SITE TOTAL", "", "", fmtEuroCSV(t.network_setup_fee), fmtEuroCSV(t.network_monthly_fee), fmtEuroCSV(t.managed_service_monthly)]);
      rows.push([]);
    });

    if (rec.allTotals) {
      rows.push(["DEPLOYMENT SUMMARY"]);
      rows.push(["Total Sites", rec.totalSites || sites.length]);
      rows.push(["All Sites Setup Fee", fmtEuroCSV(rec.allTotals.network_setup_fee)]);
      rows.push(["Monthly Connectivity", fmtEuroCSV(rec.allTotals.network_monthly_fee)]);
      rows.push(["Monthly Managed Service", fmtEuroCSV(rec.allTotals.managed_service_monthly)]);
      if (rec.allTotals.setup_discount_pct > 0) rows.push(["Bulk Discount", `${(rec.allTotals.setup_discount_pct * 100).toFixed(0)}%`]);
      rows.push(["Contract Duration (months)", rec.allTotals.contract_months || 36]);
      rows.push(["Total Contract Value", fmtEuroCSV(rec.allTotals.contract_value)]);
    }
  }

  const csv = rows.map(r => r.map(esc).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const contact = resp.contact_info?.company_name || resp.contact_info?.full_name || resp.id;
  a.download = `StarGrid-Response-${resp.id}-${String(contact).replace(/\s/g, "_")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

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
    try { await updateResponseStatus(id, newStatus); loadResponses(); }
    catch (err) { console.error("Error updating status:", err); }
    finally { setUpdatingStatus(null); }
  };

  const totalPages = Math.ceil(totalCount / limit);
  const isComment = (resp) => resp.answers?.type === "tool_comment";
  const getContactSummary = (ci) => ci ? [ci.full_name, ci.company_name, ci.email].filter(Boolean).join(" · ") : "—";
  const getSiteCount = (resp) => {
    if (isComment(resp)) return "Comment";
    return Array.isArray(resp.answers?.sites) ? resp.answers.sites.length : 0;
  };
  const formatDate = (d) => d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

  const sc = {
    pending:   { bg: "rgba(255,193,7,0.15)", color: "#FFC107", border: "rgba(255,193,7,0.3)" },
    reviewed:  { bg: "rgba(92,176,233,0.15)", color: "#5CB0E9", border: "rgba(92,176,233,0.3)" },
    contacted: { bg: "rgba(34,197,94,0.15)", color: "#22c55e", border: "rgba(34,197,94,0.3)" },
    closed:    { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.15)" },
  };

  /* ═══ Site Q/A ═══ */
  const renderSiteAnswers = (site, siteIdx) => {
    const answers = site.answers || {};
    const siteName = site.site_name || site.name || `Site ${siteIdx + 1}`;
    const location = site.location;
    const locParts = [location?.city, location?.state, location?.country].filter(Boolean);
    const locStr = locParts.join(", ") || "Unknown location";
    const siteType = answers["22"]?.label || answers["22"] || "—";
    const answeredCount = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== undefined && answers[k] !== "").length;

    return (
      <div key={site.site_id || siteIdx} className="sd">
        <div className="sd__hdr">
          <div className="sd__top">
            <span className="sd__badge">Site {siteIdx + 1}</span>
            <span className="sd__name">{siteName}</span>
            <span className="sd__pill">{siteType}</span>
            <span className="sd__count">{answeredCount} answers</span>
          </div>
          <div className="sd__meta">
            <span>📍 {locStr}</span>
            {location?.address && <span className="sd__addr"> — {location.address}</span>}
          </div>
        </div>

        <table className="qa">
          <thead><tr><th className="qa__qcol">Question</th><th>Answer</th></tr></thead>
          <tbody>
            {Object.entries(Q_LABELS).map(([qNum, qLabel]) => {
              const display = extractAnswer(answers[qNum]);
              if (!display) return null;
              return (
                <tr key={qNum}>
                  <td className="qa__qcol"><span className="qa__num">Q{qNum}</span>{qLabel}</td>
                  <td className="qa__ans">{display}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  /* ═══ Recommendation ═══ */
  const renderRecommendation = (rec) => {
    if (!rec || !rec.sitePackages || rec.sitePackages.length === 0) {
      return <p className="rec-empty">No recommendation generated yet.</p>;
    }
    return (
      <div className="rec">
        {rec.sitePackages.map((sp, idx) => (
          <div key={sp.site_id || idx} className="rec__site">
            <div className="rec__shdr">
              <span className="rec__badge">Site {sp.site_number}</span>
              <strong>{sp.site_name}</strong>
              <span className="rec__lbl">{sp.package?.servicesLabel || "—"}</span>
            </div>
            <table className="rec__tbl">
              <thead><tr>
                <th>Component</th><th>Hardware</th><th>Airtime</th>
                <th className="r">Setup</th><th className="r">Monthly</th><th className="r">Managed</th>
              </tr></thead>
              <tbody>
                {(sp.package?.components || []).map((c, ci) => (
                  <tr key={ci}>
                    <td><span className="rec__dot" style={{ background: c.color || "#3D72FC" }} />{c.type}</td>
                    <td>{c.hardware || "—"}</td>
                    <td>{c.airtime || "—"}</td>
                    <td className="r">{fmtEuro(c.network_setup_fee)}</td>
                    <td className="r">{fmtEuro(c.network_monthly_fee)}</td>
                    <td className="r">{fmtEuro(c.managed_service_monthly)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr className="rec__foot">
                <td colSpan={3}><strong>Site Total</strong></td>
                <td className="r"><strong>{fmtEuro(sp.package?.totals?.network_setup_fee)}</strong></td>
                <td className="r"><strong>{fmtEuro(sp.package?.totals?.network_monthly_fee)}</strong></td>
                <td className="r"><strong>{fmtEuro(sp.package?.totals?.managed_service_monthly)}</strong></td>
              </tr></tfoot>
            </table>
          </div>
        ))}

        {rec.allTotals && (
          <div className="rec__sum">
            <div className="rec__row"><span>All Sites Setup ({rec.totalSites || "—"} sites)</span><strong>{fmtEuro(rec.allTotals.network_setup_fee)}</strong></div>
            <div className="rec__row"><span>Monthly Connectivity</span><strong>{fmtEuro(rec.allTotals.network_monthly_fee)}</strong></div>
            <div className="rec__row"><span>Monthly Managed Service</span><strong>{fmtEuro(rec.allTotals.managed_service_monthly)}</strong></div>
            {rec.allTotals.setup_discount_pct > 0 && (
              <div className="rec__row"><span>Bulk Discount</span><span className="rec__disc">{(rec.allTotals.setup_discount_pct * 100).toFixed(0)}%</span></div>
            )}
            <div className="rec__row rec__row--hl"><span>Contract Value ({rec.allTotals.contract_months || 36}mo)</span><strong className="rec__cv">{fmtEuro(rec.allTotals.contract_value)}</strong></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pg">
      <div className="pg__hdr"><h1>📊 Response Log</h1><p>{totalCount} total responses</p></div>

      <div className="pg__flt">
        {["all", "pending", "reviewed", "contacted", "closed"].map(s => (
          <button key={s} className={`fb ${(s === "all" ? statusFilter === null : statusFilter === s) ? "fb--on" : ""}`}
            onClick={() => { setStatusFilter(s === "all" ? null : s); setPage(1); }}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
        ))}
        <button className="fb fb--rfr" onClick={loadResponses}>🔄 Refresh</button>
      </div>

      {error && <div className="pg__err">{error}</div>}

      {loading ? (
        <div className="pg__ld"><div className="spin" /><p>Loading responses...</p></div>
      ) : responses.length === 0 ? (
        <div className="pg__emp"><p>No responses found.</p></div>
      ) : (
        <div className="tw">
          <table className="mt">
            <thead><tr><th>ID</th><th>Date</th><th>Contact</th><th>Sites</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {responses.map(resp => {
                const isExp = expandedRow === resp.id;
                const colors = sc[resp.status] || sc.pending;
                const sites = resp.answers?.sites || [];
                return (
                  <Fragment key={resp.id}>
                    <tr className={`mr ${isExp ? "mr--exp" : ""}`}>
                      <td className="idc">#{resp.id}</td>
                      <td>{formatDate(resp.created_at)}</td>
                      <td className="cc">{getContactSummary(resp.contact_info)}</td>
                      <td>{getSiteCount(resp)}</td>
                      <td><span className="sb" style={{ background: colors.bg, color: colors.color, borderColor: colors.border }}>{resp.status || "pending"}</span></td>
                      <td>
                        <div className="ar">
                          <button className="ab" onClick={() => setExpandedRow(isExp ? null : resp.id)}>{isExp ? "▲ Close" : "▼ Details"}</button>
                          <button className="ab ab--csv" onClick={() => exportResponseCSV(resp)}>📥 Export</button>
                          <select className="ss" value={resp.status || "pending"} onChange={e => handleStatusChange(resp.id, e.target.value)} disabled={updatingStatus === resp.id}>
                            <option value="pending">Pending</option><option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option><option value="closed">Closed</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    {isExp && (
                      <tr className="dr"><td colSpan={6}>
                        <div className="dp">
                          <div className="ds"><h4>👤 Contact Information</h4>
                            <div className="dg">
                              {resp.contact_info && Object.entries(resp.contact_info).map(([k, v]) => v && (
                                <div key={k} className="dc"><span className="dc__l">{k.replace(/_/g, " ")}</span><span className="dc__v">{String(v)}</span></div>
                              ))}
                            </div>
                          </div>
                          {isComment(resp) && resp.comment && (
                            <div className="ds"><h4>💬 Comment</h4><p className="cm">{resp.comment}</p></div>
                          )}
                          {!isComment(resp) && sites.length > 0 && (
                            <div className="ds"><h4>📍 Sites ({sites.length})</h4>{sites.map((site, si) => renderSiteAnswers(site, si))}</div>
                          )}
                          <div className="ds"><h4>📦 Recommended Package</h4>{renderRecommendation(resp.recommendation)}</div>
                        </div>
                      </td></tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pg__pg">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="pb">← Prev</button>
          <span className="pi">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="pb">Next →</button>
        </div>
      )}

      <div className="pg__ft"><button onClick={() => router.push("/")} className="bk">← Back to Home</button></div>

      <style jsx>{`
        .pg{max-width:1400px;margin:0 auto;padding:60px 20px;min-height:100vh}
        .pg__hdr{text-align:center;margin-bottom:40px}
        .pg__hdr h1{font-size:36px;font-weight:700;margin-bottom:8px;background:linear-gradient(270deg,#5CB0E9,#3D72FC);-webkit-text-fill-color:transparent;background-clip:text}
        .pg__hdr p{font-size:16px;color:rgba(255,255,255,0.5)}

        .pg__flt{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap}
        .fb{padding:8px 18px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);font-size:14px;font-weight:500;cursor:pointer;transition:all .2s}
        .fb:hover{background:rgba(255,255,255,0.1);color:#fff}
        .fb--on{background:rgba(61,114,252,0.2);border-color:rgba(61,114,252,0.5);color:#5CB0E9}
        .fb--rfr{margin-left:auto}

        .pg__err{padding:16px;background:rgba(250,86,116,0.1);border:1px solid rgba(250,86,116,0.3);border-radius:12px;color:#FA5674;margin-bottom:20px}
        .pg__ld{text-align:center;padding:60px}
        .spin{width:40px;height:40px;border:4px solid rgba(255,255,255,0.1);border-top-color:#3D72FC;border-radius:50%;animation:sp .8s linear infinite;margin:0 auto 12px}
        @keyframes sp{to{transform:rotate(360deg)}}
        .pg__ld p{color:rgba(255,255,255,0.5)}
        .pg__emp{text-align:center;padding:60px;color:rgba(255,255,255,0.5)}

        /* Main table */
        .tw{overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,0.08)}
        .mt{width:100%;border-collapse:collapse}
        .mt thead{background:rgba(255,255,255,0.04)}
        .mt th{padding:14px 18px;text-align:left;font-size:12px;font-weight:600;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:.5px}
        .mt td{padding:14px 18px;font-size:14px;color:rgba(255,255,255,0.85);border-bottom:1px solid rgba(255,255,255,0.06)}
        .mr{transition:background .2s}
        .mr:hover{background:rgba(255,255,255,0.03)}
        .mr--exp{background:rgba(61,114,252,0.05)}
        .idc{font-weight:700;color:#5CB0E9}
        .cc{max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .sb{display:inline-block;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;border:1px solid;text-transform:capitalize}
        .ar{display:flex;gap:8px;align-items:center}
        .ab{padding:6px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:rgba(255,255,255,0.7);font-size:12px;cursor:pointer;transition:all .2s;white-space:nowrap}
        .ab:hover{background:rgba(61,114,252,0.2);border-color:#3D72FC;color:#5CB0E9}
        .ab--csv{background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.25)}
        .ab--csv:hover{background:rgba(34,197,94,0.2);border-color:#22c55e;color:#22c55e}
        .ss{padding:6px 10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:rgba(255,255,255,0.8);font-size:12px;cursor:pointer}
        .ss option{background:#1a1f35;color:white}

        /* Detail panel */
        .dr td{padding:0}
        .dp{padding:24px 28px 32px;background:rgba(255,255,255,0.015);display:flex;flex-direction:column;gap:28px;animation:sd .3s ease}
        @keyframes sd{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .ds h4{font-size:15px;font-weight:600;color:#fff;margin:0 0 14px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.08)}

        /* Contact cards */
        .dg{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
        .dc{display:flex;flex-direction:column;gap:5px;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px}
        .dc__l{font-size:11px;color:rgba(255,255,255,0.45);text-transform:capitalize;font-weight:600;letter-spacing:.3px}
        .dc__v{font-size:14px;color:#fff;font-weight:500;word-break:break-word}
        .cm{color:rgba(255,255,255,0.85);font-size:15px;line-height:1.6;padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;margin:0}

        /* ═══ Site detail card ═══ */
        .sd{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;margin-bottom:14px}
        .sd:last-child{margin-bottom:0}
        .sd__hdr{padding:16px 20px;background:rgba(61,114,252,0.04);border-bottom:1px solid rgba(255,255,255,0.06)}
        .sd__top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px}
        .sd__badge{display:inline-flex;padding:4px 14px;background:linear-gradient(135deg,#3D72FC,#5CB0E9);border-radius:14px;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;letter-spacing:.3px}
        .sd__name{font-size:16px;font-weight:700;color:#fff}
        .sd__pill{display:inline-flex;padding:3px 10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;font-size:11px;color:rgba(255,255,255,0.6)}
        .sd__count{font-size:11px;color:rgba(255,255,255,0.35);margin-left:auto}
        .sd__meta{font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5}
        .sd__addr{color:rgba(255,255,255,0.35)}

        /* ═══ Q/A TABLE — proper 2-column layout ═══ */
        .qa{width:100%;border-collapse:collapse}
        .qa thead{background:rgba(255,255,255,0.025)}
        .qa th{padding:10px 20px;text-align:left;font-size:10px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.6px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .qa td{padding:11px 20px;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.035);vertical-align:top}
        .qa tbody tr:last-child td{border-bottom:none}
        .qa tbody tr:nth-child(even){background:rgba(255,255,255,0.012)}
        .qa tbody tr:hover{background:rgba(61,114,252,0.03)}
        .qa__qcol{width:240px;min-width:200px;color:rgba(255,255,255,0.5);font-weight:500}
        .qa__num{display:inline-block;min-width:32px;color:rgba(92,176,233,0.7);font-weight:700;font-size:12px}
        .qa__ans{color:rgba(255,255,255,0.92);font-weight:500}

        /* ═══ Recommendation ═══ */
        .rec{display:flex;flex-direction:column;gap:16px}
        .rec-empty{color:rgba(255,255,255,0.4);font-style:italic;margin:0}
        .rec__site{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden}
        .rec__shdr{display:flex;align-items:center;gap:12px;padding:14px 18px;background:rgba(61,114,252,0.06);border-bottom:1px solid rgba(255,255,255,0.06);flex-wrap:wrap}
        .rec__badge{display:inline-flex;padding:3px 12px;background:linear-gradient(135deg,#3D72FC,#5CB0E9);border-radius:12px;font-size:11px;font-weight:700;color:#fff}
        .rec__shdr strong{color:#fff;font-size:14px}
        .rec__lbl{font-size:12px;color:rgba(255,255,255,0.5)}
        .rec__tbl{width:100%;border-collapse:collapse}
        .rec__tbl th{padding:10px 16px;text-align:left;font-size:10px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:.5px;background:rgba(255,255,255,0.03)}
        .rec__tbl th.r{text-align:right}
        .rec__tbl td{padding:12px 16px;font-size:13px;color:rgba(255,255,255,0.8);border-bottom:1px solid rgba(255,255,255,0.04)}
        .rec__tbl td.r{text-align:right;font-variant-numeric:tabular-nums}
        .rec__dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:middle}
        .rec__foot{background:rgba(61,114,252,0.08)}
        .rec__foot td{border-top:2px solid rgba(61,114,252,0.4);border-bottom:none;color:#fff}
        .rec__sum{padding:18px 20px;background:rgba(61,114,252,0.04);border:1px solid rgba(61,114,252,0.2);border-radius:12px;display:flex;flex-direction:column;gap:8px}
        .rec__row{display:flex;justify-content:space-between;align-items:center;padding:4px 0}
        .rec__row span{font-size:13px;color:rgba(255,255,255,0.6)}
        .rec__row strong{font-size:15px;color:#fff;font-variant-numeric:tabular-nums}
        .rec__row--hl{border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;margin-top:4px}
        .rec__cv{color:#5CB0E9 !important;font-size:18px !important}
        .rec__disc{font-size:12px;color:rgba(92,176,233,0.9);font-weight:600}

        /* Pagination & footer */
        .pg__pg{display:flex;justify-content:center;align-items:center;gap:16px;margin-top:28px}
        .pb{padding:10px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:rgba(255,255,255,0.7);font-size:14px;cursor:pointer;transition:all .2s}
        .pb:hover:not(:disabled){background:rgba(255,255,255,0.1);color:#fff}
        .pb:disabled{opacity:.3;cursor:not-allowed}
        .pi{font-size:14px;color:rgba(255,255,255,0.6)}
        .pg__ft{margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08)}
        .bk{padding:12px 24px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:rgba(255,255,255,0.7);font-size:14px;cursor:pointer;transition:all .2s}
        .bk:hover{background:rgba(255,255,255,0.1);color:#fff}

        @media(max-width:768px){
          .pg{padding:30px 12px}
          .pg__hdr h1{font-size:28px}
          .qa__qcol{width:auto;min-width:140px}
          .dg{grid-template-columns:1fr 1fr}
          .rec__tbl th,.rec__tbl td{padding:8px 10px;font-size:12px}
          .ar{flex-wrap:wrap}
          .sd__meta{flex-direction:column}
          .sd__count{margin-left:0}
        }
      `}</style>
    </div>
  );
}