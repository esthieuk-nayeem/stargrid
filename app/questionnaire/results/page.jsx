"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSites } from "@/lib/multiSiteStorage";
import { getRecommendations, formatEuro } from "@/lib/recommendation";
import CommentButton from "@/components/questionnaire/CommentButton";

export default function DynamicResultsPage() {
  const router = useRouter();
  const [expandedSite, setExpandedSite] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const sites = getAllSites();
      if (sites.length === 0) { setLoading(false); return; }

      try {
        const result = await getRecommendations(sites);
        const enriched = {
          ...result,
          sitePackages: result.sitePackages.map((sp, idx) => ({
            ...sp,
            site: sites[idx] || {},
          })),
        };
        setData(enriched);
        if (enriched.sitePackages.length > 0) setExpandedSite(0);
      } catch (err) {
        console.error("Recommendation error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const toggle = (i) => setExpandedSite(expandedSite === i ? null : i);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#070c14" }}>
      <div style={{ width:48, height:48, border:"4px solid rgba(255,255,255,0.1)", borderTopColor:"#3D72FC", borderRadius:"50%", animation:"sp .8s linear infinite" }} />
      <p style={{ color:"rgba(255,255,255,0.6)", marginTop:16 }}>Analyzing your requirements…</p>
      <style jsx>{`@keyframes sp { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#070c14", gap:16, padding:20 }}>
      <h2 style={{ color:"#FA5674", fontSize:24 }}>Recommendation Error</h2>
      <p style={{ color:"rgba(255,255,255,0.6)", textAlign:"center", maxWidth:500 }}>{error}</p>
      <button onClick={() => window.location.reload()} style={{ padding:"12px 28px", background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", border:"none", borderRadius:12, fontSize:16, fontWeight:600, cursor:"pointer" }}>Retry</button>
    </div>
  );

  if (!data || data.sitePackages.length === 0) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#070c14", gap:16 }}>
      <h2 style={{ color:"#fff", fontSize:28 }}>No Site Data Found</h2>
      <p style={{ color:"rgba(255,255,255,0.6)" }}>Please complete the questionnaire first.</p>
      <button onClick={() => router.push("/questionnaire")} style={{ padding:"16px 32px", background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", border:"none", borderRadius:12, fontSize:16, fontWeight:600, cursor:"pointer" }}>Start Questionnaire →</button>
    </div>
  );

  const { sitePackages, pocTotals, allTotals, totalSites } = data;
  const isNetworkOperator = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('isNetworkOperator') || 'false')
    : false;
  const msServiceTier = typeof window !== 'undefined'
    ? (localStorage.getItem('msServiceTier') || 'care')
    : 'care';
  const pocSetupFee = isNetworkOperator ? 11500 : 2900;

  // Managed service tier table
  const MS_TIERS = [
    { min: 1000, assist: 0.03, care: 0.10 },
    { min: 500,  assist: 0.04, care: 0.12 },
    { min: 100,  assist: 0.05, care: 0.14 },
    { min: 50,   assist: 0.06, care: 0.16 },
    { min: 10,   assist: 0.07, care: 0.20 },
    { min: 1,    assist: 0.08, care: 0.20 },
  ];
  const msRate = (() => {
    const row = MS_TIERS.find(t => totalSites >= t.min) || MS_TIERS[MS_TIERS.length - 1];
    return row[msServiceTier] ?? row.care;
  })();

  // Enterprise Hub hardcoded component (single central hub for all sites)
  const EH_SETUP = 1149;
  const EH_MONTHLY = 33;
  const ehManagedSvc = EH_SETUP * msRate;

  // Adjusted totals: include EH + router managed svc across all sites
  const totalRouterManagedSvc = sitePackages.reduce((sum, sp) => {
    const billable = sp.package.components.filter(c => /router|stargrid\s*box/i.test(c.type));
    return sum + billable.reduce((s, c) => s + c.network_setup_fee * msRate, 0);
  }, 0);


    // Adjusted totals: include EH + router managed svc across all sites
  const totalRouterManagedSvc2 = sitePackages.reduce((sum, sp) => {
    const billable = sp.package.components.filter(c => /router|stargrid\s*box/i.test(c.type));
    return sum + billable.reduce((s, c) => s + c.network_monthly_fee , 0);
  }, 0);


      // Adjusted totals: include EH + router managed svc across all sites
  const totalRouterManagedSvc3 = sitePackages.reduce((sum, sp) => {
    const billable = sp.package.components.filter(c => /router|stargrid\s*box/i.test(c.type));
    return sum + billable.reduce((s, c) => s + c.managed_service_monthly , 0);
  }, 0);


  const adjAllSetup    = allTotals.network_setup_fee + EH_SETUP;
  const adjAllMonthly  = allTotals.network_monthly_fee + EH_MONTHLY;
  const adjAllManagedSvc = totalRouterManagedSvc + ehManagedSvc;
  const adjContractValue = adjAllSetup + (adjAllMonthly + adjAllManagedSvc) * allTotals.contract_months;

  const pocSites = sitePackages.slice(0, Math.min(2, totalSites));
  const pocRouterManagedSvc = pocSites.reduce((sum, sp) => {
    const billable = sp.package.components.filter(c => /router|stargrid\s*box/i.test(c.type));
    return sum + billable.reduce((s, c) => s + c.network_setup_fee * msRate, 0);
  }, 0);
  const adjPocSetup      = pocSetupFee ;
  const adjPocMonthly    = 0 ;
  const adjPocManagedSvc = 0 ;

  return (
    <div className="rp">
      <div className="rp__blob1" /><div className="rp__blob2" />

      <div className="rp__inner">
        <div className="rp__hdr">
          <h1>Your Stargrid Connectivity Plans</h1>
          <p>{totalSites} site{totalSites !== 1 ? "s" : ""} configured</p>
        </div>

        {/* Enterprise Hub — central node */}
        <div className="sc sc--hub">
          <div className="sc__hdr" onClick={() => toggle('hub')}>
            <div className="sc__title">
              <span className="sb sb--hub">Central Hub</span>
              <h2>Enterprise Hub</h2>
              <span className="sc__sub">Central connectivity node · All {totalSites} site{totalSites !== 1 ? "s" : ""} connected</span>
            </div>
            <div className="sc__tots">
              <div className="ti"><span className="tl">Network Setup Fee</span><span className="tv">{formatEuro(EH_SETUP)}</span></div>
              <div className="ti"><span className="tl">Network Monthly Fee</span><span className="tv">{formatEuro(EH_MONTHLY)}</span></div>
              <div className="ti"><span className="tl">Managed Service Monthly</span><span className="tv">{formatEuro(ehManagedSvc)}</span></div>
            </div>
            <button className="eb">{expandedSite === 'hub' ? "▼" : "▶"}</button>
          </div>
          {expandedSite === 'hub' && (
            <div className="sc__body">
              <table className="ct">
                <thead><tr><th>Component</th><th>Hardware</th><th>Airtime Plan</th><th className="r">Network Setup Fee</th><th className="r">Network Monthly Fee</th><th className="r">Managed Service Monthly</th></tr></thead>
                <tbody>
                  <tr>
                    <td><span className="cb" style={{ background:"#2ECC71" }}>Enterprise Hub</span></td>
                    <td>Large</td>
                    <td>—</td>
                    <td className="r num">{formatEuro(EH_SETUP)}</td>
                    <td className="r num">{formatEuro(EH_MONTHLY)}</td>
                    <td className="r num">{formatEuro(ehManagedSvc)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

{/* Site cards */}
{sitePackages.map((sp, idx) => {
  const isExp = expandedSite === idx;
  const { site, site_name, site_number, package: pkg } = sp;
  const siteName = site?.name || site_name || `Site ${site_number}`;
  const siteType = site?.answers?.[22]?.label || "Site";

  // === FIX: Calculate correct Managed Service Fee for this site ===
  const siteRouterManagedSvc = pkg.components.reduce((sum, c) => {
    const isBillable = /router|stargrid\s*box/i.test(c.type);
    if (isBillable) {
      return sum + c.network_setup_fee * msRate;
    }
    return sum + (c.managed_service_monthly || 0);
  }, 0);

  return (
    <div key={sp.site_id || idx} className="sc">
      <div className="sc__hdr" onClick={() => toggle(idx)}>
        <div className="sc__title">
          <span className="sb">Site {site_number}</span>
          <h2>{siteName}</h2>
          <span className="sc__sub">{siteType} • {pkg.servicesLabel}</span>
        </div>
        <div className="sc__tots">
          <div className="ti">
            <span className="tl">Network Setup Fee</span>
            <span className="tv">{formatEuro(pkg.totals.network_setup_fee)}</span>
          </div>
          <div className="ti">
            <span className="tl">Network Monthly Fee</span>
            <span className="tv">{formatEuro(pkg.totals.network_monthly_fee)}</span>
          </div>
          <div className="ti">
            <span className="tl">Managed Service Monthly</span>
            <span className="tv">{formatEuro(siteRouterManagedSvc)}</span>   {/* ← Fixed */}
          </div>
        </div>
        <button className="eb">{isExp ? "▼" : "▶"}</button>
      </div>

      {isExp && (
        <div className="sc__body">
          <table className="ct">
            <thead>
              <tr>
                <th>Component</th>
                <th>Hardware</th>
                <th>Airtime Plan</th>
                <th className="r">Network Setup Fee</th>
                <th className="r">Network Monthly Fee</th>
                <th className="r">Managed Service Monthly</th>
              </tr>
            </thead>
            <tbody>
              {pkg.components.map((c, ci) => {
                const isBillable = /router|stargrid\s*box/i.test(c.type);
                const msSvc = isBillable 
                  ? c.network_setup_fee * msRate 
                  : c.managed_service_monthly;

                return (
                  <tr key={ci}>
                    <td><span className="cb" style={{ background: c.color }}>{c.type}</span></td>
                    <td>{c.hardware}</td>
                    <td>{c.airtime}</td>
                    <td className="r num">{formatEuro(c.network_setup_fee)}</td>
                    <td className="r num">{formatEuro(c.network_monthly_fee)}</td>
                    <td className="r num">{formatEuro(msSvc)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
})}

        {/* Deployment Summary */}
        <div className="ds">
          <h2 className="ds__t">Deployment Summary</h2>
          <div className="ds__grid">
            <div className="dc">
              <div className="dc__h"><h3>PoC Sites ({Math.min(2, totalSites)})</h3><p>{isNetworkOperator ? 'Network Operator PoC' : 'Enterprise PoC'}</p></div>
              <div className="dc__b">
                <div className="sr"><span className="sl">Network Setup</span><span className="sv">{formatEuro(adjPocSetup)}</span></div>
                <div className="sr"><span className="sl">Network Monthly</span><span className="sv">{formatEuro(adjPocMonthly)}</span></div>
                <div className="sr"><span className="sl">Managed Service Monthly</span><span className="sv">{formatEuro(adjPocManagedSvc)}</span></div>
              </div>
            </div>

<div className="dc dc--hl">
  <div className="dc__h">
    <h3>All Sites ({totalSites})</h3>
    <p>{allTotals.setup_discount_pct > 0 ? `${(allTotals.setup_discount_pct*100).toFixed(0)}% bulk discount` : "Standard pricing"}</p>
  </div>

  <div className="dc__b">
    <table className="pt">
      <thead>
        <tr>
          <th className="pt__th pt__th--left">Fee items</th>
          <th className="pt__th">Stargrid &amp; connectivity</th>
          <th className="pt__th">Stargrid only</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="pt__label">Network Setup</td>
          <td className="pt__val">{formatEuro(adjAllSetup)}</td>
          <td className="pt__val">{formatEuro(totalRouterManagedSvc)}</td>
        </tr>
        <tr>
          <td className="pt__label">Network Monthly</td>
          <td className="pt__val">{formatEuro(adjAllMonthly)}</td>
          <td className="pt__val">{formatEuro(totalRouterManagedSvc2)}</td>
        </tr>
        <tr>
          <td className="pt__label">Managed Service Monthly</td>
          <td className="pt__val">{formatEuro(adjAllManagedSvc)}</td>
          <td className="pt__val">{formatEuro(totalRouterManagedSvc3)}</td>
        </tr>
        <tr className="pt__tr--hl">
          <td className="pt__label pt__label--hl">Contract Value ({allTotals.contract_months}mo)</td>
          <td className="pt__val pt__val--big">{formatEuro(adjContractValue)}</td>
          <td className="pt__val pt__val--big">{formatEuro(36 * (totalRouterManagedSvc + totalRouterManagedSvc2 + totalRouterManagedSvc3))}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

            <div className="pdf-wrap">
              <button className="btn-pdf" onClick={() => router.push("/questionnaire/results/pdf")}>
                <span className="btn-pdf__icon">📄</span>
                <span className="btn-pdf__label">View<br/>Offer PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rp__actions">
        <button onClick={() => router.push("/")} className="btn-sec">← Back to Home</button>
        <div className="rp__actions-r">
          <button onClick={() => window.open("https://calendly.com/esthieuk/stargrid","_blank")} className="btn-meet">📅 Book a Meeting</button>
          <button onClick={() => router.push("/")} className="btn-pri">New Configuration →</button>
        </div>
      </div>

      <CommentButton />

      <style jsx>{`
        .rp { position:relative; min-height:100vh; background:#070c14; padding:52px 18px; overflow:hidden; }
        .rp__blob1 { position:absolute; width:800px; height:800px; border-radius:50%; right:-250px; top:-120px; background:radial-gradient(circle,rgba(22,14,255,0.11) 0%,transparent 70%); pointer-events:none; z-index:0; }
        .rp__blob2 { position:absolute; width:500px; height:500px; border-radius:50%; left:-150px; bottom:-140px; background:radial-gradient(circle,rgba(102,105,216,0.14) 0%,transparent 65%); pointer-events:none; z-index:0; }
        .rp__inner { position:relative; z-index:1; max-width:1200px; margin:0 auto; }
        .rp__hdr { text-align:center; margin-bottom:44px; }
        .rp__hdr h1 { font-size:34px; font-weight:700; color:#fff; margin:0 0 10px; }
        .rp__hdr p { font-size:16px; color:rgba(255,255,255,0.5); margin:0; }

        .sc { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.1); border-radius:22px; margin-bottom:20px; overflow:hidden; transition:all 0.3s; }
        .sc:hover { border-color:rgba(61,114,252,0.4); }
        .sc--hub { background:rgba(46,204,113,0.05); border-color:rgba(46,204,113,0.25); margin-bottom:32px; }
        .sc--hub:hover { border-color:rgba(46,204,113,0.5); }
        .sb--hub { background:linear-gradient(135deg,#2ECC71,#1aad5e); }
        .sc__hdr { display:flex; align-items:center; padding:28px 32px; cursor:pointer; transition:background 0.2s; gap:24px; }
        .sc__hdr:hover { background:rgba(255,255,255,0.02); }
        .sc__title { flex:1; display:flex; flex-direction:column; gap:6px; min-width:0; }
        .sb { display:inline-flex; padding:4px 14px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); border-radius:16px; font-size:13px; font-weight:700; color:#fff; align-self:flex-start; }
        .sc__title h2 { font-size:22px; font-weight:700; color:#fff; margin:0; }
        .sc__sub { font-size:14px; color:rgba(255,255,255,0.5); }
        .sc__tots { display:flex; gap:32px; flex-shrink:0; }
        .ti { display:flex; flex-direction:column; align-items:flex-end; min-width:100px; }
        .tl { font-size:12px; color:rgba(255,255,255,0.5); margin-bottom:4px; white-space:nowrap; }
        .tv { font-size:18px; font-weight:700; color:#fff; white-space:nowrap; font-variant-numeric:tabular-nums; }
        .eb { width:40px; height:40px; flex-shrink:0; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:rgba(255,255,255,0.7); font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .sc__body { animation:sd 0.3s ease; }
        @keyframes sd { from{opacity:0} to{opacity:1} }

        .ct { width:100%; border-collapse:collapse; background:rgba(255,255,255,0.02); table-layout:fixed; }
        .ct thead { background:rgba(255,255,255,0.04); }
        .ct th { padding:14px 20px; text-align:left; font-size:12px; font-weight:600; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.5px; }
        .ct th.r { text-align:right; }
        .ct td { padding:18px 20px; font-size:15px; color:rgba(255,255,255,0.85); border-bottom:1px solid rgba(255,255,255,0.06); }
        .ct td.r { text-align:right; }
        .ct td.num { font-variant-numeric:tabular-nums; }
        .ct tbody tr:last-child td { border-bottom:none; }
        .cb { display:inline-flex; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#fff; white-space:nowrap; }

        .ds { margin-top:48px; }
        .ds__t { font-size:28px; font-weight:700; color:#fff; margin:0 0 24px; }
        .ds__grid { display:grid; grid-template-columns:1fr 1fr auto; gap:20px; align-items:start; }
        .dc { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.1); padding:28px; border-radius:22px; }
        .dc--hl { background:rgba(61,114,252,0.08); border:1px solid rgba(61,114,252,0.35); }
        .dc__h h3 { font-size:22px; font-weight:700; color:#fff; margin:0 0 6px; }
        .dc__h p { font-size:13px; color:rgba(255,255,255,0.5); margin:0 0 24px; }
        .dc__b { display:flex; flex-direction:column; gap:12px; }
        .sr { display:flex; justify-content:space-between; align-items:center; padding:8px 0; }
        .sr--hl { padding-top:16px; margin-top:8px; border-top:1px solid rgba(255,255,255,0.15); }
        .sl { font-size:14px; color:rgba(255,255,255,0.7); }
        .sv { font-size:18px; font-weight:700; color:#fff; font-variant-numeric:tabular-nums; }

.pt {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.pt colgroup .col-label { width: 40%; }
.pt colgroup .col-val   { width: 30%; }

.pt__th {
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-align: right;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pt__th--left { text-align: left; }

.pt__label {
  padding: 12px 14px;
  font-size: 13px;
  color: rgba(255,255,255,0.65);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  vertical-align: middle;
}
.pt__label--hl {
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.pt__val {
  padding: 12px 14px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  text-align: right;
  font-variant-numeric: tabular-nums;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  vertical-align: middle;
  white-space: nowrap;
}

.pt__tr--hl td {
  background: rgba(61,114,252,0.08);
  border-top: 1px solid rgba(255,255,255,0.12);
  border-bottom: none;
}
.pt__tr--hl td:first-child { border-radius: 0 0 0 10px; }
.pt__tr--hl td:last-child  { border-radius: 0 0 10px 0; }

.pt__val--big {
  font-size: 20px;
  color: #5CB0E9;
}
        .sv--big { font-size:22px; color:#5CB0E9; }

        .pdf-wrap { display:flex; align-items:center; }
        .btn-pdf {
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
          padding:24px 36px; min-width:130px;
          background:linear-gradient(135deg,#FF9800,#F57C00);
          border:none; border-radius:16px; cursor:pointer; transition:all 0.25s;
        }
        .btn-pdf:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(255,152,0,0.4); }
        .btn-pdf__icon { font-size:32px; }
        .btn-pdf__label { font-size:14px; font-weight:700; color:#fff; line-height:1.3; text-align:center; }

        .rp__actions { position:relative; z-index:1; max-width:1200px; margin:48px auto 0; display:flex; justify-content:space-between; gap:24px; }
        .rp__actions-r { display:flex; gap:12px; }
        .btn-pri,.btn-sec,.btn-meet { padding:16px 32px; border:none; border-radius:12px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s; }
        .btn-pri { background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; }
        .btn-pri:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(61,114,252,0.4); }
        .btn-sec { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.8); }
        .btn-sec:hover { background:rgba(255,255,255,0.1); color:#fff; }
        .btn-meet { background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.4); color:#22c55e; }
        .btn-meet:hover { background:rgba(34,197,94,0.25); transform:translateY(-2px); }

        @media(max-width:1200px) {
          .sc__hdr { flex-direction:column; align-items:flex-start; }
          .sc__tots { flex-wrap:wrap; gap:20px; }
          .ti { align-items:flex-start; }
          .ds__grid { grid-template-columns:1fr; }
          .pdf-wrap { justify-content:center; }
        }
        @media(max-width:768px) {
          .rp { padding:30px 12px; }
          .rp__hdr h1 { font-size:26px; }
          .sc__hdr { padding:20px; }
          .ct { table-layout:auto; }
          .ct th,.ct td { padding:12px; font-size:13px; }
          .rp__actions { flex-direction:column; }
          .rp__actions-r { flex-direction:column; }
          .btn-pri,.btn-sec,.btn-meet { width:100%; text-align:center; }
        }
      `}</style>
    </div>
  );
}