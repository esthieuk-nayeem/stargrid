"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllSites } from "@/lib/multiSiteStorage";
import { getRecommendations, formatEuro } from "@/lib/recommendation";
import Image from "next/image";

// ── Helpers ──────────────────────────────────────────────────────────────────
function getLabel(ans) {
  if (!ans) return "—";
  if (typeof ans === "string") return ans;
  if (ans.label) return ans.label;
  if (ans.display_answer) return String(ans.display_answer);
  return "—";
}

function getDualLabel(ans) {
  if (!ans) return { down: "—", up: "—" };
  return {
    down: ans.downlink?.label || ans.downlink || "—",
    up:   ans.uplink?.label  || ans.uplink  || "—",
  };
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PdfOfferPage() {
  const router = useRouter();
  const [data, setData]           = useState(null);
  const [sites, setSites]         = useState([]);
  const [contact, setContact]     = useState({});
  const [isOperator, setIsOperator] = useState(false);
  const [loading, setLoading]     = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const offerRef = useRef(null);

  useEffect(() => {
    // Read localStorage values client-side
    const storedContact  = JSON.parse(localStorage.getItem("questionnaire_contact") || "{}");
    const storedOperator = JSON.parse(localStorage.getItem("isNetworkOperator") || "false");
    setContact(storedContact);
    setIsOperator(storedOperator);

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

  // ── PDF download — JPEG + scale 1 keeps file under 1 MB ──
  const handleDownload = async () => {
    setGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF }   = await import("jspdf");
      const el = offerRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        backgroundColor: "#ffffff",
        scale: 1.5,            // was 2 — halving pixel count ~56% smaller
        useCORS: true,
        logging: false,
        windowWidth: 860,
      });

      const pageW = 210, pageH = 297, margin = 10;
      const contentW = pageW - margin * 2;
      const contentH = pageH - margin * 2;
      const imgAspect  = canvas.height / canvas.width;
      const scaledImgH = contentW * imgAspect;

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const totalPages = Math.ceil(scaledImgH / contentH);

      for (let p = 0; p < totalPages; p++) {
        if (p > 0) pdf.addPage();
        const srcY        = (p * contentH / scaledImgH) * canvas.height;
        const srcH        = (contentH / scaledImgH) * canvas.height;
        const isLast      = p === totalPages - 1;
        const actualSrcH  = isLast ? canvas.height - srcY : srcH;
        const actualDestH = isLast ? (actualSrcH / canvas.height) * scaledImgH : contentH;

        const pc = document.createElement("canvas");
        pc.width  = canvas.width;
        pc.height = Math.ceil(actualSrcH);
        const ctx = pc.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pc.width, pc.height);
        ctx.drawImage(canvas, 0, srcY, canvas.width, actualSrcH, 0, 0, canvas.width, actualSrcH);

        // JPEG at 0.78 quality — ~6× smaller than PNG at scale 2
        const pageImg = pc.toDataURL("image/jpeg", 0.78);
        pdf.addImage(pageImg, "JPEG", margin, margin, contentW, actualDestH);
        pdf.setFontSize(8);
        pdf.setTextColor(180, 180, 180);
        pdf.text(`Page ${p + 1} of ${totalPages}`, pageW / 2, pageH - 5, { align: "center" });
        pdf.text("StarGrid — Confidential", margin, pageH - 5);
      }

      pdf.save("StarGrid-Connectivity-Offer.pdf");
      setGenerated(true);
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF generation requires html2canvas & jspdf.\nnpm install html2canvas jspdf");
    } finally {
      setGenerating(false);
    }
  };

  // ── Loading / empty states ─────────────────────────────────────────────
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
  const pocSetupFee = isOperator ? 10000 : pocTotals.network_setup_fee;
  const pocLabel    = isOperator ? "Network Operator PoC" : "Enterprise PoC";

  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const refId = `SG-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="pp">
      {/* Sticky toolbar */}
      <div className="pp__bar">
        <button onClick={() => router.push("/questionnaire/results")} className="pp__back">← Back to Results</button>
        <div className="pp__bar-r">
          {generating && <span className="pp__status">Generating PDF…</span>}
          {generated  && <span className="pp__status pp__status--ok">✓ PDF Downloaded</span>}
          <button onClick={() => router.push("/questionnaire/results/pdf/editor")} className="pp__edit">✏ Edit PDF</button>
          <button onClick={handleDownload} disabled={generating} className="pp__dl">
            {generating ? "Generating…" : "↓ Download PDF"}
          </button>
          <button onClick={() => window.print()} className="pp__print">Print</button>
        </div>
      </div>

      <div className="pp__paper-wrap">
        <div ref={offerRef} className="paper">

          {/* ── HEADER ───────────────────────────────────────────────────── */}
          <header className="hdr">
            <div className="hdr__logo">
              <Image src="/assets/images/icon/icon.png" alt="StarGrid" width={38} height={38} />
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

          <h1 className="doc-title">Connectivity Solution Proposal</h1>
          <p className="doc-sub">
            {totalSites} Site{totalSites !== 1 ? "s" : ""} — Personalised Plan
            {contact.companyName ? ` for ${contact.companyName}` : ""}
          </p>

          {/* ── 1. INTRODUCTION ──────────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">1. Introduction</h2>
            <p className="sec__text">
              StarGrid delivers fully managed hybrid connectivity solutions that combine cellular (4G/5G),
              satellite (LEO/GEO), and fixed-line networks into a single, intelligent platform. Our edge
              devices automatically select the optimal available network, guaranteeing zero-touch,
              always-on connectivity for industrial, offshore, and remote operations worldwide.
            </p>
            <p className="sec__text">
              This proposal has been generated based on the site configurations and requirements
              provided through the StarGrid Connectivity Planner. It outlines the recommended
              hardware, airtime plans, and managed service packages tailored to your specific operational needs.
            </p>
            <div className="intro-pills">
              <span className="pill">99.5% Line Availability</span>
              <span className="pill">Zero-Second Failover</span>
              <span className="pill">Global LEO/GEO Backup</span>
              <span className="pill">24/7 Managed Service</span>
            </div>
          </section>

          {/* ── 2. USE CASE ──────────────────────────────────────────────── */}
          {contact.additionalNotes && (
            <section className="sec">
              <h2 className="sec__title">2. Client Use Case</h2>
              {contact.fullName && (
                <div className="contact-row">
                  <span><strong>Contact:</strong> {contact.fullName}</span>
                  {contact.jobTitle && <span> · {contact.jobTitle}</span>}
                  {contact.email   && <span> · {contact.email}</span>}
                  {contact.phone   && <span> · {contact.phone}</span>}
                </div>
              )}
              <blockquote className="use-case">
                <span className="use-case__icon">"</span>
                <p>{contact.additionalNotes}</p>
              </blockquote>
            </section>
          )}

          {/* ── 3. CONNECTIVITY PARAMETERS ───────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">3. Connectivity Parameters</h2>
            <p className="sec__text sec__text--sm">
              The following table summarises the key technical requirements captured per site during the survey.
            </p>

            {sitePackages.map((sp, idx) => {
              const site     = sites[idx] || {};
              const ans      = site.answers || {};
              const bwAvg    = getDualLabel(ans[5]);
              const bwPeak   = getDualLabel(ans[6]);
              const siteName = site.name || sp.site_name || `Site ${sp.site_number}`;

              const params = [
                { label: "Primary Purpose",        val: getLabel(ans[3]) },
                { label: "Monthly Data Volume",    val: getLabel(ans[4]) },
                { label: "Avg Bandwidth — Down",   val: bwAvg.down },
                { label: "Avg Bandwidth — Up",     val: bwAvg.up },
                { label: "Peak Bandwidth — Down",  val: bwPeak.down },
                { label: "Peak Bandwidth — Up",    val: bwPeak.up },
                { label: "Latency Requirement",    val: getLabel(ans[9]) },
                { label: "Primary Connection",     val: getLabel(ans[11]) },
                { label: "Secondary Connection",   val: getLabel(ans[12]) },
                { label: "Downtime Class",         val: getLabel(ans[7]) },
              ];

              return (
                <div key={idx} className="param-block">
                  <div className="param-block__hdr">
                    <span className="badge">Site {sp.site_number}</span>
                    <span className="param-block__name">{siteName}</span>
                  </div>
                  <table className="param-tbl">
                    <tbody>
                      {params.map((p, pi) => (
                        <tr key={pi} className={pi % 2 === 0 ? "even" : ""}>
                          <td className="param-tbl__lbl">{p.label}</td>
                          <td className="param-tbl__val">{p.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>

          {/* ── 4. CONNECTIVITY SOLUTION OFFER ───────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">4. Connectivity Solution Offer</h2>
            <p className="sec__text sec__text--sm">
              Recommended hardware, airtime plans, and managed service tiers per site based on survey inputs.
            </p>

            {sitePackages.map((sp, idx) => {
              const { site_name, site_number, package: pkg } = sp;
              const site     = sites[idx] || {};
              const siteType = site?.answers?.[22]?.label || "Fixed Site";
              const siteName = site?.name || site_name;

              return (
                <div key={sp.site_id || idx} className="site">
                  <div className="site__hdr">
                    <span className="badge">Site {site_number}</span>
                    <div className="site__info">
                      <span className="site__name">{siteName}</span>
                      <span className="site__type">{siteType} — {pkg.servicesLabel}</span>
                      {site?.location?.address && <span className="site__loc">{site.location.address}</span>}
                    </div>
                  </div>

                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Hardware</th>
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
                </div>
              );
            })}
          </section>

          {/* ── 5. DEPLOYMENT SUMMARY ────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">5. Deployment Summary</h2>
            <p className="sec__text sec__text--sm">
              Overview of total investment across all configured sites.
            </p>
            <table className="sum-overview">
              <thead>
                <tr>
                  <th>Line Item</th>
                  <th className="ra">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Total Network Setup Fee</td><td className="ra mono"><strong>{formatEuro(allTotals.network_setup_fee)}</strong></td></tr>
                <tr className="even"><td>Total Monthly Connectivity</td><td className="ra mono"><strong>{formatEuro(allTotals.network_monthly_fee)}</strong></td></tr>
                <tr><td>Total Monthly Managed Service</td><td className="ra mono"><strong>{formatEuro(allTotals.managed_service_monthly)}</strong></td></tr>
                <tr className="cv-row">
                  <td><strong>Total Contract Value</strong><small className="cv-sub"> / {allTotals.contract_months} months</small></td>
                  <td className="ra mono cv-val"><strong>{formatEuro(allTotals.contract_value)}</strong></td>
                </tr>
              </tbody>
            </table>
            {allTotals.setup_discount_pct > 0 && (
              <p className="discount-note">
                * A {(allTotals.setup_discount_pct * 100).toFixed(0)}% bulk discount has been applied to the setup fee for full rollout.
              </p>
            )}
          </section>

          {/* ── 6. POC SECTION ───────────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">6. Proof of Concept (PoC)</h2>
            <p className="sec__text sec__text--sm">
              StarGrid offers a structured PoC covering the first {Math.min(2, totalSites)} site{Math.min(2, totalSites) !== 1 ? "s" : ""}
              at fixed pricing to validate performance before full deployment.
            </p>
            <div className="poc-box">
              <div className="poc-box__badge">{pocLabel}</div>
              <table className="sum-overview">
                <thead>
                  <tr><th>Line Item</th><th className="ra">PoC Amount</th></tr>
                </thead>
                <tbody>
                  <tr><td>Network Setup Fee</td><td className="ra mono"><strong>{formatEuro(pocSetupFee)}</strong></td></tr>
                  <tr className="even"><td>Monthly Connectivity</td><td className="ra mono"><strong>{formatEuro(pocTotals.network_monthly_fee)}</strong></td></tr>
                  <tr><td>Monthly Managed Service</td><td className="ra mono"><strong>{formatEuro(pocTotals.managed_service_monthly)}</strong></td></tr>
                </tbody>
              </table>
              <p className="poc-note">
                {isOperator
                  ? "Network Operator pricing applies. Setup fee reflects operator-tier PoC engagement."
                  : "Enterprise pricing applies. PoC setup includes hardware, installation, and 30-day SLA validation."}
              </p>
            </div>
          </section>

          {/* ── 7. FULL CUSTOMER CASE ────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">7. Full Customer Case</h2>
            <p className="sec__text sec__text--sm">
              Combined summary across all {totalSites} site{totalSites !== 1 ? "s" : ""} for full deployment.
            </p>
            <div className="sum-grid">
              {sitePackages.map((sp, idx) => {
                const site     = sites[idx] || {};
                const siteName = site?.name || sp.site_name || `Site ${sp.site_number}`;
                return (
                  <div key={idx} className="sum-box">
                    <div className="sum-box__hdr">
                      <span className="badge badge--sm">Site {sp.site_number}</span>
                      <span className="sum-box__name">{siteName}</span>
                    </div>
                    <table className="sum-tbl">
                      <tbody>
                        <tr><td>Setup Fee</td><td className="ra mono">{formatEuro(sp.package.totals.network_setup_fee)}</td></tr>
                        <tr><td>Monthly Fee</td><td className="ra mono">{formatEuro(sp.package.totals.network_monthly_fee)}</td></tr>
                        <tr><td>Managed Svc</td><td className="ra mono">{formatEuro(sp.package.totals.managed_service_monthly)}</td></tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
            <div className="total-banner">
              <span>Total Contract Value ({allTotals.contract_months} months)</span>
              <span className="total-banner__val">{formatEuro(allTotals.contract_value)}</span>
            </div>
          </section>

          {/* ── 8. TERMS & CONDITIONS ────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">8. Terms &amp; Conditions</h2>
            <p className="sec__text sec__text--sm">
              This proposal is governed by the <strong>StarGrid Standard Agreement</strong> (available at{" "}
              <span className="link-ref">www.stargrid.one/legal</span>). Key terms:
            </p>
            <div className="terms">
              <ul>
                <li>All prices are in EUR and exclude applicable VAT/taxes.</li>
                <li>This offer is valid for <strong>30 days</strong> from the date of issue.</li>
                <li>Setup fees are one-time charges payable upon contract signing.</li>
                <li>Monthly fees are billed in advance on the 1st of each month.</li>
                <li>Managed service includes 24/7 monitoring, firmware updates, and SLA-based support.</li>
                <li>Contract duration as stated above; early termination fees may apply per the StarGrid Standard Agreement.</li>
                <li>Hardware remains StarGrid property until full setup fee is received.</li>
                <li>SLA credits apply as defined in the StarGrid Standard Agreement, Section 4.</li>
              </ul>
            </div>
          </section>

          {/* ── FOOTER ───────────────────────────────────────────────────── */}
          <div className="rule rule--gradient" />
          <footer className="ftr">
            <div className="ftr__left">
              <strong>StarGrid</strong>
              <span>Cellular · Satellite · Fixed</span>
              <span>al@cellsat.one · www.stargrid.one</span>
            </div>
            <div className="ftr__right">
              <span>Prepared {today}</span>
              <span>Reference: {refId}</span>
              <span>Confidential — For intended recipient only</span>
            </div>
          </footer>

        </div>
      </div>

      <style jsx>{`
        /* ── Chrome ─────────────────────────────────── */
        .pp { min-height:100vh; background:#e8ecf1; }
        .pp__bar {
          position:sticky; top:0; z-index:100;
          display:flex; justify-content:space-between; align-items:center;
          padding:12px 24px; background:#fff;
          border-bottom:1px solid #ddd; box-shadow:0 1px 4px rgba(0,0,0,0.06);
        }
        .pp__bar-r { display:flex; align-items:center; gap:12px; }
        .pp__back  { padding:9px 18px; background:#f5f5f5; border:1px solid #ddd; border-radius:8px; color:#444; font-size:14px; font-weight:500; cursor:pointer; }
        .pp__back:hover { background:#eee; }
        .pp__dl    { padding:11px 26px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; }
        .pp__dl:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 4px 14px rgba(61,114,252,0.3); }
        .pp__dl:disabled { opacity:0.55; cursor:wait; }
        .pp__edit  { padding:9px 18px; background:#f0f4ff; border:1px solid #c7d4fd; border-radius:8px; color:#3D72FC; font-size:14px; font-weight:500; cursor:pointer; }
        .pp__edit:hover { background:#e6edff; }
        .pp__print { padding:9px 18px; background:#f5f5f5; border:1px solid #ddd; border-radius:8px; color:#444; font-size:14px; cursor:pointer; }
        .pp__print:hover { background:#eee; }
        .pp__status { font-size:13px; color:#999; }
        .pp__status--ok { color:#22c55e; font-weight:600; }

        .pp__paper-wrap { display:flex; justify-content:center; padding:36px 16px 72px; }

        /* ── Paper ──────────────────────────────────── */
        .paper {
          width:860px; max-width:100%; background:#ffffff;
          border-radius:3px; box-shadow:0 1px 3px rgba(0,0,0,0.08),0 8px 40px rgba(0,0,0,0.06);
          padding:52px 60px;
          font-family:'Segoe UI',-apple-system,Arial,Helvetica,sans-serif;
          color:#1e1e2e; font-size:13px; line-height:1.55;
        }

        /* ── Header ─────────────────────────────────── */
        .hdr { display:flex; justify-content:space-between; align-items:center; }
        .hdr__logo { display:flex; align-items:center; gap:14px; }
        .hdr__brand { font-size:22px; font-weight:800; letter-spacing:1.5px; color:#12132a; }
        .hdr__tagline { font-size:11px; color:#999; letter-spacing:0.4px; margin-top:1px; }
        .hdr__meta { text-align:right; }
        .hdr__date { font-size:13px; font-weight:600; color:#333; }
        .hdr__ref  { font-size:11px; color:#bbb; margin-top:3px; }

        .rule { height:1px; background:#e0e0e0; margin:20px 0; }
        .rule--gradient { height:3px; background:linear-gradient(90deg,#3D72FC,#5CB0E9,#6669D8); border-radius:2px; }

        .doc-title { font-size:26px; font-weight:700; color:#12132a; margin:22px 0 6px; }
        .doc-sub   { font-size:14px; color:#777; margin:0 0 8px; }

        /* ── Section container ───────────────────────── */
        .sec { margin-top:32px; }
        .sec__title {
          font-size:16px; font-weight:700; color:#12132a;
          margin:0 0 12px; padding-bottom:8px;
          border-bottom:2px solid #3D72FC;
          display:flex; align-items:center; gap:8px;
        }
        .sec__text { font-size:13px; color:#555; line-height:1.7; margin:0 0 12px; }
        .sec__text--sm { font-size:12px; color:#777; }

        /* ── Intro pills ─────────────────────────────── */
        .intro-pills { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
        .pill {
          padding:4px 12px; border-radius:20px;
          background:#eef2ff; border:1px solid #c7d4fd;
          font-size:11.5px; font-weight:600; color:#3D72FC;
        }

        /* ── Contact row ─────────────────────────────── */
        .contact-row { font-size:12px; color:#888; margin-bottom:10px; }

        /* ── Use case blockquote ─────────────────────── */
        .use-case {
          position:relative; margin:12px 0 0; padding:16px 20px 16px 48px;
          background:#f8f9ff; border:1px solid #dce4fd; border-left:4px solid #3D72FC;
          border-radius:0 10px 10px 0;
        }
        .use-case__icon {
          position:absolute; left:14px; top:10px;
          font-size:32px; color:#c7d4fd; font-family:Georgia,serif; line-height:1;
        }
        .use-case p { margin:0; font-size:13px; color:#444; line-height:1.75; font-style:italic; }

        /* ── Connectivity parameter table ────────────── */
        .param-block { margin-bottom:20px; border:1px solid #e4e6ec; border-radius:10px; overflow:hidden; }
        .param-block__hdr {
          display:flex; align-items:center; gap:12px;
          padding:10px 16px; background:#f7f8fc; border-bottom:1px solid #e4e6ec;
        }
        .param-block__name { font-size:13px; font-weight:600; color:#333; }
        .param-tbl { width:100%; border-collapse:collapse; }
        .param-tbl tr.even { background:#fafbfd; }
        .param-tbl__lbl { padding:8px 16px; font-size:12px; color:#777; width:46%; }
        .param-tbl__val { padding:8px 16px; font-size:12px; font-weight:600; color:#333; }

        /* ── Site offer table ────────────────────────── */
        .site { margin-bottom:24px; border:1px solid #e4e6ec; border-radius:12px; overflow:hidden; page-break-inside:avoid; }
        .site__hdr { display:flex; align-items:center; gap:16px; padding:14px 20px; background:#f7f8fc; border-bottom:1px solid #e4e6ec; }
        .site__info { display:flex; flex-direction:column; gap:2px; }
        .site__name { font-size:15px; font-weight:700; color:#12132a; }
        .site__type { font-size:11px; color:#777; }
        .site__loc  { font-size:10px; color:#aaa; }

        .tbl { width:100%; border-collapse:collapse; }
        .tbl th { padding:10px 14px; text-align:left; font-size:10px; font-weight:700; color:#999; text-transform:uppercase; letter-spacing:0.7px; background:#fafbfd; border-bottom:2px solid #eef0f4; }
        .tbl td { padding:11px 14px; border-bottom:1px solid #f0f1f5; color:#333; font-size:12px; }
        .tfoot-row { background:#eef2ff !important; }
        .tfoot-row td { border-top:2px solid #3D72FC; border-bottom:none; padding:12px 14px; }
        .ra   { text-align:right; }
        .mono { font-variant-numeric:tabular-nums; }
        .dot  { display:inline-block; width:9px; height:9px; border-radius:50%; margin-right:7px; vertical-align:middle; }

        /* ── Deployment summary table ────────────────── */
        .sum-overview { width:100%; border-collapse:collapse; border:1px solid #e4e6ec; border-radius:10px; overflow:hidden; }
        .sum-overview th { padding:10px 16px; background:#f7f8fc; font-size:11px; font-weight:700; color:#888; text-transform:uppercase; letter-spacing:0.5px; text-align:left; border-bottom:1px solid #e4e6ec; }
        .sum-overview th.ra { text-align:right; }
        .sum-overview td { padding:10px 16px; font-size:13px; color:#444; border-bottom:1px solid #f0f0f0; }
        .sum-overview tr.even td { background:#fafbfd; }
        .sum-overview tr:last-child td { border-bottom:none; }
        .cv-row td { border-top:2px solid #3D72FC !important; }
        .cv-val { font-size:18px !important; color:#3D72FC !important; }
        .cv-sub { font-size:11px; color:#aaa; font-weight:normal; margin-left:4px; }
        .discount-note { font-size:11px; color:#888; margin-top:10px; font-style:italic; }

        /* ── PoC box ─────────────────────────────────── */
        .poc-box { border:2px solid #3D72FC; border-radius:12px; padding:20px 24px; background:#f8f9ff; }
        .poc-box__badge {
          display:inline-flex; padding:4px 14px; margin-bottom:14px;
          background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff;
          border-radius:20px; font-size:11px; font-weight:700;
        }
        .poc-note { margin-top:12px; font-size:11.5px; color:#777; font-style:italic; }

        /* ── Full customer case ──────────────────────── */
        .sum-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:14px; margin-bottom:18px; }
        .sum-box  { border:1px solid #e4e6ec; border-radius:10px; padding:16px 18px; }
        .sum-box__hdr { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .sum-box__name { font-size:12px; font-weight:600; color:#333; }
        .sum-tbl { width:100%; border-collapse:collapse; }
        .sum-tbl td { padding:5px 0; font-size:12px; color:#555; border-bottom:1px solid #f5f5f5; }
        .sum-tbl tr:last-child td { border-bottom:none; }
        .total-banner {
          display:flex; justify-content:space-between; align-items:center;
          padding:14px 20px; background:#12132a; border-radius:10px; color:#fff;
          font-size:14px; font-weight:600;
        }
        .total-banner__val { font-size:20px; color:#5CB0E9; font-weight:800; }

        /* ── Badge ───────────────────────────────────── */
        .badge {
          display:inline-flex; padding:4px 12px; border-radius:16px;
          background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff;
          font-size:11px; font-weight:700; white-space:nowrap; flex-shrink:0;
        }
        .badge--sm { padding:3px 10px; font-size:10px; }

        /* ── Link ref ─────────────────────────────────── */
        .link-ref { color:#3D72FC; font-style:normal; }

        /* ── Terms ───────────────────────────────────── */
        .terms { background:#fafbfd; border:1px solid #eef0f4; border-radius:10px; padding:16px 20px; }
        .terms ul { margin:0; padding:0 0 0 18px; }
        .terms li { font-size:12px; color:#666; line-height:1.8; }

        /* ── Footer ──────────────────────────────────── */
        .ftr { display:flex; justify-content:space-between; padding-top:8px; font-size:11px; color:#bbb; }
        .ftr__left  { display:flex; flex-direction:column; gap:2px; }
        .ftr__left strong { color:#555; font-size:12px; }
        .ftr__right { text-align:right; display:flex; flex-direction:column; gap:2px; }

        /* ── Responsive ──────────────────────────────── */
        @media(max-width:920px) {
          .paper { padding:32px 24px; }
          .sum-grid { grid-template-columns:1fr 1fr; }
          .hdr { flex-direction:column; align-items:flex-start; gap:10px; }
          .hdr__meta { text-align:left; }
          .ftr { flex-direction:column; gap:10px; }
          .ftr__right { text-align:left; }
          .pp__bar { flex-direction:column; gap:10px; align-items:stretch; }
          .pp__bar-r { justify-content:center; flex-wrap:wrap; }
        }
        @media(max-width:600px) {
          .sum-grid { grid-template-columns:1fr; }
        }

        /* ── Print ───────────────────────────────────── */
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

const centerStyle    = { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8ecf1", gap:12 };
const spinnerStyle   = { width:40, height:40, border:"4px solid #ddd", borderTopColor:"#3D72FC", borderRadius:"50%", animation:"sp .8s linear infinite" };
const primaryBtnStyle = { padding:"14px 28px", background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:600, cursor:"pointer", marginTop:8 };
