"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllSites } from "@/lib/multiSiteStorage";
import { getRecommendations, formatEuro } from "@/lib/recommendation";

export default function PdfOfferPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const offerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const allSites = getAllSites();
      if (allSites.length === 0) { setLoading(false); return; }
      setSites(allSites);
      try {
        const result = await getRecommendations(allSites);
        setData(result);
      } catch (err) {
        console.error("Recommendation error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const el = offerRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 900,
      });

      const pageW = 210;
      const pageH = 297;
      const margin = 10;
      const contentW = pageW - margin * 2;
      const contentH = pageH - margin * 2;

      const imgAspect = canvas.height / canvas.width;
      const scaledImgH = contentW * imgAspect;

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const totalPages = Math.ceil(scaledImgH / contentH);

      for (let p = 0; p < totalPages; p++) {
        if (p > 0) pdf.addPage();
        const srcY = (p * contentH / scaledImgH) * canvas.height;
        const srcH = (contentH / scaledImgH) * canvas.height;
        const isLastPage = p === totalPages - 1;
        const actualSrcH = isLastPage ? canvas.height - srcY : srcH;
        const actualDestH = isLastPage ? (actualSrcH / canvas.height) * scaledImgH : contentH;

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.ceil(actualSrcH);
        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, srcY, canvas.width, actualSrcH, 0, 0, canvas.width, actualSrcH);

        const pageImg = pageCanvas.toDataURL("image/png");
        pdf.addImage(pageImg, "PNG", margin, margin, contentW, actualDestH);
        pdf.setFontSize(8);
        pdf.setTextColor(180, 180, 180);
        pdf.text(`Page ${p + 1} of ${totalPages}`, pageW / 2, pageH - 5, { align: "center" });
        pdf.text("StarGrid GmbH — Confidential", margin, pageH - 5);
      }

      pdf.save("StarGrid-Connectivity-Offer.pdf");
      setGenerated(true);
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF generation requires html2canvas & jspdf.\nInstall via: npm install html2canvas jspdf");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return (
    <div style={centerStyle}>
      <div style={spinnerStyle} />
      <p style={{ color: "#666", marginTop: 16 }}>Preparing offer document…</p>
      <style jsx>{`@keyframes sp { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  if (!data || data.sitePackages.length === 0) return (
    <div style={centerStyle}>
      <h2 style={{ color: "#333", fontSize: 24 }}>No Site Data Found</h2>
      <p style={{ color: "#888" }}>Complete the questionnaire to generate an offer.</p>
      <button onClick={() => router.push("/questionnaire")} style={primaryBtnStyle}>Start Questionnaire →</button>
    </div>
  );

  const { sitePackages, pocTotals, allTotals, totalSites } = data;
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const refId = `SG-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <div className="pp">
      {/* Sticky toolbar */}
      <div className="pp__bar">
        <button onClick={() => router.push("/questionnaire/results")} className="pp__back">← Back to Results</button>
        <div className="pp__bar-r">
          {generating && <span className="pp__status">Generating PDF…</span>}
          {generated && <span className="pp__status pp__status--ok">PDF Downloaded</span>}
          <button onClick={handleDownload} disabled={generating} className="pp__dl">
            {generating ? "Generating…" : "📥 Download PDF"}
          </button>
          <button onClick={() => window.print()} className="pp__print">🖨 Print</button>
        </div>
      </div>

      <div className="pp__paper-wrap">
        <div ref={offerRef} className="paper">
          {/* Header */}
          <header className="hdr">
            <div className="hdr__logo">
              <div className="hdr__icon">⚡</div>
              <div>
                <div className="hdr__brand">STARGRID</div>
                <div className="hdr__tagline">Industrial Connectivity Solutions</div>
              </div>
            </div>
            <div className="hdr__meta">
              <div className="hdr__date">{today}</div>
              <div className="hdr__ref">Ref: {refId}</div>
            </div>
          </header>

          <div className="rule rule--gradient" />

          <h1 className="title">Connectivity Solution Offer</h1>
          <p className="subtitle">{totalSites} Site{totalSites !== 1 ? "s" : ""} — Customized Package Recommendation</p>

          {/* Site packages */}
          {sitePackages.map((sp, idx) => {
            const { site_name, site_number, package: pkg } = sp;
            const site = sites[idx] || {};
            const siteType = site?.answers?.[22]?.label || "Fixed Site";
            return (
              <section key={sp.site_id || idx} className="site">
                <div className="site__hdr">
                  <span className="site__badge">Site {site_number}</span>
                  <div className="site__info">
                    <span className="site__name">{site?.name || site_name}</span>
                    <span className="site__type">{siteType} — {pkg.servicesLabel}</span>
                    {site?.location?.address && <span className="site__loc">{site.location.address}</span>}
                  </div>
                </div>

                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Product / Hardware</th>
                      <th>Airtime Plan</th>
                      <th className="ra">Setup Fee</th>
                      <th className="ra">Monthly Fee</th>
                      <th className="ra">Managed Svc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.components.map((c, ci) => (
                      <tr key={ci}>
                        <td><span className="dot" style={{ background: c.color }} />{c.type}</td>
                        <td>{c.hardware}</td>
                        <td>{c.airtime}</td>
                        <td className="ra mono">{formatEuro(c.network_setup_fee)}</td>
                        <td className="ra mono">{formatEuro(c.network_monthly_fee)}</td>
                        <td className="ra mono">{formatEuro(c.managed_service_monthly)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="tfoot-row">
                      <td colSpan={3}><strong>Site {site_number} Subtotal</strong></td>
                      <td className="ra mono"><strong>{formatEuro(pkg.totals.network_setup_fee)}</strong></td>
                      <td className="ra mono"><strong>{formatEuro(pkg.totals.network_monthly_fee)}</strong></td>
                      <td className="ra mono"><strong>{formatEuro(pkg.totals.managed_service_monthly)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </section>
            );
          })}

          {/* Deployment Summary */}
          <div className="rule" />
          <h2 className="sec-title">Deployment Summary</h2>

          <div className="sum-grid">
            <div className="sum-box">
              <div className="sum-box__hdr">
                <h3>PoC Deployment</h3>
                <span className="sum-box__sub">{Math.min(2, totalSites)} site{Math.min(2, totalSites) !== 1 ? "s" : ""} — Fixed PoC pricing</span>
              </div>
              <table className="sum-tbl">
                <tbody>
                  <tr><td>Network Setup Fee</td><td className="ra mono"><strong>{formatEuro(pocTotals.network_setup_fee)}</strong></td><td className="ra strike">{formatEuro(pocTotals.list_setup)}</td></tr>
                  <tr><td>Monthly Connectivity</td><td className="ra mono"><strong>{formatEuro(pocTotals.network_monthly_fee)}</strong></td><td className="ra strike">{formatEuro(pocTotals.list_monthly)}</td></tr>
                  <tr><td>Monthly Managed Service</td><td className="ra mono"><strong>{formatEuro(pocTotals.managed_service_monthly)}</strong></td><td className="ra strike">{formatEuro(pocTotals.list_managed)}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="sum-box sum-box--hl">
              <div className="sum-box__hdr">
                <h3>Full Rollout</h3>
                <span className="sum-box__sub">
                  {totalSites} site{totalSites !== 1 ? "s" : ""}
                  {allTotals.setup_discount_pct > 0 ? ` — ${(allTotals.setup_discount_pct * 100).toFixed(0)}% bulk discount` : " — Standard pricing"}
                </span>
              </div>
              <table className="sum-tbl">
                <tbody>
                  <tr><td>Network Setup Fee</td><td className="ra mono"><strong>{formatEuro(allTotals.discounted_setup)}</strong></td><td className="ra strike">{formatEuro(allTotals.network_setup_fee)}</td></tr>
                  <tr><td>Monthly Connectivity</td><td className="ra mono"><strong>{formatEuro(allTotals.network_monthly_fee)}</strong></td><td></td></tr>
                  <tr><td>Monthly Managed Service</td><td className="ra mono"><strong>{formatEuro(allTotals.managed_service_monthly)}</strong></td><td></td></tr>
                  <tr className="cv-row">
                    <td><strong>Total Contract Value</strong><br/><span className="cv-sub">{allTotals.contract_months} months</span></td>
                    <td className="ra mono cv-val"><strong>{formatEuro(allTotals.contract_value)}</strong></td>
                    <td className="ra strike">{formatEuro(allTotals.list_contract_value)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms */}
          <div className="terms">
            <h4>Terms & Conditions</h4>
            <ul>
              <li>All prices are in EUR and exclude applicable VAT/taxes.</li>
              <li>This offer is valid for 30 days from the date of issue.</li>
              <li>Setup fees are one-time charges payable upon contract signing.</li>
              <li>Monthly fees are billed in advance on the 1st of each month.</li>
              <li>Managed service includes 24/7 monitoring, firmware updates, and SLA-based support.</li>
              <li>Contract duration as stated above; early termination fees may apply.</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="rule rule--gradient" />
          <footer className="ftr">
            <div className="ftr__left">
              <strong>StarGrid GmbH</strong>
              <span>Industrial Connectivity Solutions</span>
              <span>info@stargrid.io · www.stargrid.io</span>
            </div>
            <div className="ftr__right">
              <span>Prepared for you on {today}</span>
              <span>Reference: {refId}</span>
              <span>Confidential — For intended recipient only</span>
            </div>
          </footer>
        </div>
      </div>

      <style jsx>{`
        .pp { min-height:100vh; background:#e8ecf1; }
        .pp__bar { position:sticky; top:0; z-index:100; display:flex; justify-content:space-between; align-items:center; padding:12px 24px; background:#fff; border-bottom:1px solid #ddd; box-shadow:0 1px 4px rgba(0,0,0,0.06); }
        .pp__bar-r { display:flex; align-items:center; gap:12px; }
        .pp__back { padding:9px 18px; background:#f5f5f5; border:1px solid #ddd; border-radius:8px; color:#444; font-size:14px; font-weight:500; cursor:pointer; }
        .pp__back:hover { background:#eee; }
        .pp__dl { padding:11px 26px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; }
        .pp__dl:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 4px 14px rgba(61,114,252,0.3); }
        .pp__dl:disabled { opacity:0.55; cursor:wait; }
        .pp__print { padding:9px 18px; background:#f5f5f5; border:1px solid #ddd; border-radius:8px; color:#444; font-size:14px; cursor:pointer; }
        .pp__print:hover { background:#eee; }
        .pp__status { font-size:13px; color:#999; }
        .pp__status--ok { color:#22c55e; font-weight:600; }

        .pp__paper-wrap { display:flex; justify-content:center; padding:36px 16px 72px; }
        .paper { width:860px; max-width:100%; background:#ffffff; border-radius:3px; box-shadow:0 1px 3px rgba(0,0,0,0.08),0 8px 40px rgba(0,0,0,0.06); padding:52px 60px; font-family:'Segoe UI',-apple-system,Arial,Helvetica,sans-serif; color:#1e1e2e; font-size:13.5px; line-height:1.55; }

        .hdr { display:flex; justify-content:space-between; align-items:center; }
        .hdr__logo { display:flex; align-items:center; gap:14px; }
        .hdr__icon { width:46px; height:46px; border-radius:11px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); display:flex; align-items:center; justify-content:center; font-size:22px; color:#fff; }
        .hdr__brand { font-size:24px; font-weight:800; letter-spacing:1.5px; color:#12132a; }
        .hdr__tagline { font-size:11px; color:#999; letter-spacing:0.4px; margin-top:1px; }
        .hdr__meta { text-align:right; }
        .hdr__date { font-size:14px; font-weight:600; color:#333; }
        .hdr__ref { font-size:11px; color:#bbb; margin-top:3px; }

        .rule { height:1px; background:#e0e0e0; margin:22px 0; }
        .rule--gradient { height:3px; background:linear-gradient(90deg,#3D72FC,#5CB0E9,#6669D8); border-radius:2px; }

        .title { font-size:28px; font-weight:700; color:#12132a; margin:24px 0 6px; }
        .subtitle { font-size:15px; color:#777; margin:0 0 32px; }

        .site { margin-bottom:30px; border:1px solid #e4e6ec; border-radius:12px; overflow:hidden; page-break-inside:avoid; }
        .site__hdr { display:flex; align-items:center; gap:16px; padding:18px 22px; background:#f7f8fc; border-bottom:1px solid #e4e6ec; }
        .site__badge { display:inline-flex; padding:5px 16px; border-radius:20px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; font-size:12px; font-weight:700; white-space:nowrap; }
        .site__info { display:flex; flex-direction:column; gap:2px; }
        .site__name { font-size:17px; font-weight:700; color:#12132a; }
        .site__type { font-size:12px; color:#777; }
        .site__loc { font-size:11px; color:#aaa; }

        .tbl { width:100%; border-collapse:collapse; }
        .tbl th { padding:11px 16px; text-align:left; font-size:10px; font-weight:700; color:#999; text-transform:uppercase; letter-spacing:0.7px; background:#fafbfd; border-bottom:2px solid #eef0f4; }
        .tbl td { padding:13px 16px; border-bottom:1px solid #f0f1f5; color:#333; font-size:13px; }
        .tfoot-row { background:#eef2ff !important; }
        .tfoot-row td { border-top:2px solid #3D72FC; border-bottom:none; padding:14px 16px; }
        .ra { text-align:right; }
        .mono { font-variant-numeric:tabular-nums; }
        .dot { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:8px; vertical-align:middle; }

        .sec-title { font-size:22px; font-weight:700; color:#12132a; margin:0 0 20px; padding-bottom:10px; border-bottom:2px solid #e4e6ec; }
        .sum-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:32px; }
        .sum-box { border:1px solid #e4e6ec; border-radius:12px; padding:22px 24px; }
        .sum-box--hl { border:2px solid #3D72FC; background:#f8f9ff; }
        .sum-box__hdr { margin-bottom:16px; }
        .sum-box__hdr h3 { font-size:18px; font-weight:700; color:#12132a; margin:0 0 4px; }
        .sum-box__sub { font-size:12px; color:#999; }
        .sum-tbl { width:100%; border-collapse:collapse; }
        .sum-tbl td { padding:8px 0; border-bottom:1px solid #f0f0f0; font-size:13px; color:#444; }
        .sum-tbl tr:last-child td { border-bottom:none; }
        .strike { color:#ccc; text-decoration:line-through; font-size:12px; }
        .cv-row td { border-top:2px solid #3D72FC !important; border-bottom:none; padding-top:14px; }
        .cv-val { font-size:20px !important; color:#3D72FC; }
        .cv-sub { font-size:11px; color:#aaa; font-weight:normal; }

        .terms { background:#fafbfd; border:1px solid #eef0f4; border-radius:10px; padding:18px 22px; margin-bottom:28px; }
        .terms h4 { font-size:13px; font-weight:700; color:#555; margin:0 0 10px; text-transform:uppercase; letter-spacing:0.5px; }
        .terms ul { margin:0; padding:0 0 0 18px; }
        .terms li { font-size:11.5px; color:#777; line-height:1.7; }

        .ftr { display:flex; justify-content:space-between; padding-top:6px; font-size:11px; color:#bbb; }
        .ftr__left { display:flex; flex-direction:column; gap:2px; }
        .ftr__left strong { color:#555; font-size:13px; }
        .ftr__right { text-align:right; display:flex; flex-direction:column; gap:2px; max-width:260px; }

        @media(max-width:920px) {
          .paper { padding:32px 24px; }
          .sum-grid { grid-template-columns:1fr; }
          .hdr { flex-direction:column; align-items:flex-start; gap:12px; }
          .hdr__meta { text-align:left; }
          .ftr { flex-direction:column; gap:12px; }
          .ftr__right { text-align:left; }
          .pp__bar { flex-direction:column; gap:10px; align-items:stretch; }
          .pp__bar-r { justify-content:center; flex-wrap:wrap; }
        }

        @media print {
          .pp__bar { display:none !important; }
          .pp { background:#fff !important; }
          .pp__paper-wrap { padding:0 !important; }
          .paper { box-shadow:none !important; border:none !important; width:100% !important; max-width:100% !important; padding:20px !important; }
        }
      `}</style>
    </div>
  );
}

const centerStyle = { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8ecf1", gap:12 };
const spinnerStyle = { width:40, height:40, border:"4px solid #ddd", borderTopColor:"#3D72FC", borderRadius:"50%", animation:"sp .8s linear infinite" };
const primaryBtnStyle = { padding:"14px 28px", background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:600, cursor:"pointer", marginTop:8 };