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

// ── Module-level shared components ────────────────────────────────────────
function DocHeader({ today, refId }) {
  return (
    <div className="doc-header-wrap">
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
    </div>
  );
}

function DocFooter({ today, refId, right }) {
  return (
    <div className="doc-footer-wrap">
      <div className="rule rule--gradient" style={{ marginTop: 28 }} />
      <footer className="ftr">
        <div className="ftr__left">
          <strong>StarGrid Europe BV</strong>
          <span>Zeestraat 70, 2318 AG The Hague, Netherlands</span>
          <span>al@cellsat.one · www.stargrid.one</span>
        </div>
        <div className="ftr__right">
          <span>Prepared {today}</span>
          <span>Reference: {refId}</span>
          {right && <span className="footer-tier">{right}</span>}
          <span>Confidential — For intended recipient only</span>
        </div>
      </footer>
    </div>
  );
}

function BomTable({ rows, emptyMsg }) {
  if (!rows.length) return <p className="sec__text sec__text--sm" style={{ fontStyle: "italic" }}>{emptyMsg}</p>;
  return (
    <table className="tbl bom-tbl">
      <thead>
        <tr>
          <th>Site</th><th>Component</th><th>Hardware</th><th>Airtime Plan</th>
          <th className="ra">Setup (€)</th><th className="ra">Monthly (€)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c, i) => (
          <tr key={i}>
            <td><span className="badge badge--sm">Site {c.siteNum}</span></td>
            <td><span className="dot" style={{ background: c.color }} />{c.type}</td>
            <td>{c.hardware || "—"}</td>
            <td>{c.airtime  || "—"}</td>
            <td className="ra mono">{formatEuro(c.network_setup_fee)}</td>
            <td className="ra mono">{formatEuro(c.network_monthly_fee)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PdfOfferPage() {
  const router = useRouter();
  const [data, setData]           = useState(null);
  const [sites, setSites]         = useState([]);
  const [contact, setContact]     = useState({});
  const [isOperator, setIsOperator] = useState(false);
  const [msServiceTier, setMsServiceTier] = useState("care");
  const [loading, setLoading]     = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated]   = useState(false);
  const [sending, setSending]       = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // null | 'ok' | 'err'
  const offerRef = useRef(null);

  useEffect(() => {
    // Read localStorage values client-side
    const storedContact  = JSON.parse(localStorage.getItem("questionnaire_contact") || "{}");
    const storedOperator = JSON.parse(localStorage.getItem("isNetworkOperator") || "false");
    const storedTier     = localStorage.getItem("msServiceTier") || "care";
    setContact(storedContact);
    setIsOperator(storedOperator);
    setMsServiceTier(storedTier);

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

  // ── Send via email ─────────────────────────────────────────────────────
  const handleSendEmail = async () => {
    setSending(true);
    setSendStatus(null);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF }   = await import("jspdf");
      const el = offerRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        backgroundColor: "#ffffff",
        scale: 1.5,
        useCORS: true,
        logging: false,
        windowWidth: 860,
      });

      const pageW = 210, pageH = 297, margin = 10;
      const contentW  = pageW - margin * 2;
      const contentH  = pageH - margin * 2;
      const imgAspect  = canvas.height / canvas.width;
      const scaledImgH = contentW * imgAspect;

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const totalPagesCount = Math.ceil(scaledImgH / contentH);

      for (let p = 0; p < totalPagesCount; p++) {
        if (p > 0) pdf.addPage();
        const srcY       = (p * contentH / scaledImgH) * canvas.height;
        const srcH       = (contentH / scaledImgH) * canvas.height;
        const isLast     = p === totalPagesCount - 1;
        const actualSrcH  = isLast ? canvas.height - srcY : srcH;
        const actualDestH = isLast ? (actualSrcH / canvas.height) * scaledImgH : contentH;

        const pc = document.createElement("canvas");
        pc.width  = canvas.width;
        pc.height = Math.ceil(actualSrcH);
        const ctx = pc.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pc.width, pc.height);
        ctx.drawImage(canvas, 0, srcY, canvas.width, actualSrcH, 0, 0, canvas.width, actualSrcH);

        const pageImg = pc.toDataURL("image/jpeg", 0.78);
        pdf.addImage(pageImg, "JPEG", margin, margin, contentW, actualDestH);
        pdf.setFontSize(8);
        pdf.setTextColor(180, 180, 180);
        pdf.text(`Page ${p + 1} of ${totalPagesCount}`, pageW / 2, pageH - 5, { align: "center" });
        pdf.text("StarGrid — Confidential", margin, pageH - 5);
      }

      // Convert to base64 for email attachment
      const pdfBase64 = pdf.output("datauristring").split(",")[1];

      const contractValue = data?.allTotals
        ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
            .format(data.allTotals.contract_value)
        : null;

      const res = await fetch("/api/send-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfBase64,
          companyName:   contact.companyName   || "",
          contactName:   contact.fullName      || "",
          contactEmail:  contact.email         || "",
          refId,
          date:          today,
          totalSites,
          contractValue,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSendStatus("ok");
      } else {
        console.error("Email error:", result.error);
        setSendStatus("err");
      }
    } catch (err) {
      console.error("Send email error:", err);
      setSendStatus("err");
    } finally {
      setSending(false);
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
  const pocSetupFee = isOperator ? 11500 : 2900;
  const pocLabel    = isOperator ? "Network Operator PoC" : "Enterprise PoC";

  // Managed service tier
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
  const compMsSvc = (c) => /router|stargrid\s*box/i.test(c.type) ? c.network_setup_fee * msRate : c.managed_service_monthly;

  // Enterprise Hub
  const EH_SETUP = 1149;
  const EH_MONTHLY = 33;
  const ehManagedSvc = EH_SETUP * msRate;

  // Adjusted totals (sites + EH)
  const totalBillableMsSvc = sitePackages.reduce((sum, sp) => {
    return sum + sp.package.components.filter(c => /router|stargrid\s*box/i.test(c.type))
      .reduce((s, c) => s + c.network_setup_fee * msRate, 0);
  }, 0);
  const pocBillableMsSvc = sitePackages.slice(0, Math.min(2, totalSites)).reduce((sum, sp) => {
    return sum + sp.package.components.filter(c => /router|stargrid\s*box/i.test(c.type))
      .reduce((s, c) => s + c.network_setup_fee * msRate, 0);
  }, 0);
  const adjAllSetup      = allTotals.network_setup_fee + EH_SETUP;
  const adjAllMonthly    = allTotals.network_monthly_fee + EH_MONTHLY;
  const adjAllManagedSvc = totalBillableMsSvc + ehManagedSvc;
  const adjContractValue = adjAllSetup + (adjAllMonthly + adjAllManagedSvc) * allTotals.contract_months;
  const adjPocSetup      = pocSetupFee ;
  const adjPocMonthly    = 0;
  const adjPocManagedSvc = 0;

  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const refId = `SG-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  // ── Aggregate metrics for Section 3 summary ────────────────────────────
  let cellularCount = 0, satelliteCount = 0, fixedCount = 0;
  sitePackages.forEach((sp, idx) => {
    const site = sites[idx] || {};
    const ans  = site.answers || {};
    [ans[11], ans[12]].forEach(conn => {
      const v = (getLabel(conn) || "").toLowerCase();
      if (v.includes("cellu") || v.includes("lte") || v.includes("4g") || v.includes("5g")) cellularCount++;
      else if (v.includes("sat") || v.includes("leo") || v.includes("geo")) satelliteCount++;
      else if (v !== "—" && !v.includes("none")) fixedCount++;
    });
  });
  const serviceTypes = [...new Set(sitePackages.map(sp => sp.package.servicesLabel).filter(Boolean))].join(" / ") || "—";

  // ── Bill of Materials — categorise all components ──────────────────────
  const bom = { cellular: [], satellite: [], boxes: [], managed: [] };
  sitePackages.forEach((sp) => {
    sp.package.components.forEach(c => {
      const t = (c.type || "").toLowerCase();
      const h = (c.hardware || "").toLowerCase();
      const entry = { ...c, siteName: sp.site_name, siteNum: sp.site_number };
      if (t.includes("cellu") || t.includes("lte") || t.includes("4g") || t.includes("5g") || h.includes("lte") || h.includes("cellular")) {
        bom.cellular.push(entry);
      } else if (t.includes("sat") || t.includes("leo") || t.includes("geo") || t.includes("starlink") || t.includes("iridium") || t.includes("skylo") || t.includes("viasat") || t.includes("oneweb") || h.includes("satell")) {
        bom.satellite.push(entry);
      } else {
        bom.boxes.push(entry);
      }
    });
    if (sp.package.totals.managed_service_monthly > 0) {
      bom.managed.push({
        siteNum:  sp.site_number,
        siteName: sp.site_name,
        label:    sp.package.servicesLabel || "Managed Service",
        fee:      sp.package.totals.managed_service_monthly,
      });
    }
  });

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="pp">
      {/* Sticky toolbar */}
      <div className="pp__bar">
        <button onClick={() => router.push("/questionnaire/results")} className="pp__back">← Back to Results</button>
        <div className="pp__bar-r">
          {generating && <span className="pp__status">Generating PDF…</span>}
          {sending    && <span className="pp__status">Sending email…</span>}
          {generated  && <span className="pp__status pp__status--ok">✓ PDF Downloaded</span>}
          {sendStatus === "ok"  && <span className="pp__status pp__status--ok">✓ Email Sent</span>}
          {sendStatus === "err" && <span className="pp__status pp__status--err">✗ Send Failed</span>}
          <button onClick={() => router.push("/questionnaire/results/pdf/editor")} className="pp__edit">✏ Edit PDF</button>
          <button onClick={handleSendEmail} disabled={sending || generating} className="pp__send">
            {sending ? "Sending…" : "✉ Send via Email"}
          </button>
          <button onClick={handleDownload} disabled={generating} className="pp__dl">
            {generating ? "Generating…" : "↓ Download PDF"}
          </button>
          <button onClick={() => window.print()} className="pp__print">Print</button>
        </div>
      </div>

      <div className="pp__paper-wrap">
        <div ref={offerRef} className="paper">

          {/* ════════════════════════════════════════════════════════════════
              PAGE 1 — Connectivity Plan & Proposal  (single A4)
          ════════════════════════════════════════════════════════════════ */}
          <DocHeader today={today} refId={refId} />

          <h1 className="doc-title">Connectivity Plan &amp; Proposal</h1>
          <p className="doc-sub">
            {totalSites} Site{totalSites !== 1 ? "s" : ""} — Personalised Plan
            {contact.companyName ? ` for ${contact.companyName}` : ""}
          </p>

          {/* ── 1. Introduction ─────────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">1. Introduction</h2>
            <p className="sec__text">
              StarGrid delivers fully managed hybrid connectivity solutions that combine cellular (4G/5G),
              satellite (LEO/GEO), and fixed-line networks into a single, intelligent platform. Our edge
              devices automatically select the optimal available network, guaranteeing zero-touch,
              always-on connectivity for industrial, offshore, and remote operations worldwide.
            </p>
            <div className="intro-pills">
              <span className="pill">99.5% Line Availability</span>
              <span className="pill">Zero-Second Failover</span>
              <span className="pill">Global LEO/GEO Backup</span>
              <span className="pill">24/7 Managed Service</span>
            </div>
          </section>

          {/* ── 2. Client Use Case ──────────────────────────────────────── */}
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

          {/* ── 3. StarGrid Solution ────────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">3. StarGrid Solution</h2>
            <p className="sec__text sec__text--sm">
              Overview of the recommended connectivity configuration based on survey inputs.
            </p>
            <table className="sum-overview">
              <tbody>
                <tr>
                  <td style={{ fontWeight:600, color:"#444" }}>Sites Configured</td>
                  <td className="ra mono" style={{ fontWeight:700 }}>{totalSites}</td>
                </tr>
                <tr className="even">
                  <td style={{ fontWeight:600, color:"#444" }}>Central Enterprise Hub</td>
                  <td className="ra" style={{ fontWeight:700, color:"#2ECC71" }}>1 × Large</td>
                </tr>
                <tr>
                  <td style={{ fontWeight:600, color:"#444" }}>Cellular Connections</td>
                  <td className="ra mono" style={{ fontWeight:700 }}>{cellularCount || "—"}</td>
                </tr>
                <tr className="even">
                  <td style={{ fontWeight:600, color:"#444" }}>Satellite Connections</td>
                  <td className="ra mono" style={{ fontWeight:700 }}>{satelliteCount || "—"}</td>
                </tr>
                {fixedCount > 0 && (
                  <tr>
                    <td style={{ fontWeight:600, color:"#444" }}>Fixed / Other Connections</td>
                    <td className="ra mono" style={{ fontWeight:700 }}>{fixedCount}</td>
                  </tr>
                )}
                <tr className="even">
                  <td style={{ fontWeight:600, color:"#444" }}>StarGrid Managed Service</td>
                  <td className="ra" style={{ fontWeight:700, color:"#3D72FC" }}>{serviceTypes}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight:600, color:"#444" }}>Managed Service Tier</td>
                  <td className="ra" style={{ fontWeight:700, color:"#3D72FC", textTransform:"capitalize" }}>{msServiceTier}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* ── 4. Offering — PoC | Full Deployment ─────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">4. Offering</h2>
            <p className="sec__text sec__text--sm">
              Two engagement paths are available: a scoped Proof of Concept and a full multi-site deployment.
            </p>
            <div className="offering-cols">

              {/* Left — PoC */}
              <div className="offering-col">
                <div className="poc-box">
                  <div className="poc-box__badge">{pocLabel}</div>
                  <p className="offering-col__label">Proof of Concept</p>
                  <p className="sec__text sec__text--sm" style={{ margin:"0 0 12px" }}>
                    Covers the first {Math.min(2, totalSites)} site{Math.min(2, totalSites) !== 1 ? "s" : ""} at
                    fixed pricing to validate performance before full rollout.
                  </p>
                  <table className="sum-overview">
                    <thead><tr><th>Line Item</th><th className="ra">Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Network Setup Fee</td><td className="ra mono"><strong>{formatEuro(adjPocSetup)}</strong></td></tr>
                      <tr className="even"><td>Monthly Connectivity</td><td className="ra mono"><strong>{formatEuro(adjPocMonthly)}</strong></td></tr>
                      <tr><td>Monthly Managed Service</td><td className="ra mono"><strong>{formatEuro(adjPocManagedSvc)}</strong></td></tr>
                    </tbody>
                  </table>
                  <p className="poc-note">
                    {isOperator
                      ? "Network Operator pricing applies. Setup fee reflects operator-tier PoC engagement."
                      : "Enterprise pricing applies. Includes hardware, installation, and 30-day SLA validation."}
                  </p>
                </div>
              </div>

              {/* Right — Full Deployment */}
              <div className="offering-col">
                <div className="deploy-box">
                  <div className="poc-box__badge deploy-badge">Full Deployment</div>
                  <p className="offering-col__label">All {totalSites} Site{totalSites !== 1 ? "s" : ""}</p>
                  <p className="sec__text sec__text--sm" style={{ margin:"0 0 12px" }}>
                    Complete rollout across all configured sites with full managed service coverage.
                  </p>
                  <table className="sum-overview">
                    <thead><tr><th>Line Item</th><th className="ra">Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Total Network Setup Fee</td><td className="ra mono"><strong>{formatEuro(adjAllSetup)}</strong></td></tr>
                      <tr className="even"><td>Total Monthly Connectivity</td><td className="ra mono"><strong>{formatEuro(adjAllMonthly)}</strong></td></tr>
                      <tr><td>Total Monthly Managed Service</td><td className="ra mono"><strong>{formatEuro(adjAllManagedSvc)}</strong></td></tr>
                      <tr className="cv-row">
                        <td><strong>Total Contract Value</strong><small className="cv-sub"> / {allTotals.contract_months} months</small></td>
                        <td className="ra mono cv-val"><strong>{formatEuro(adjContractValue)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  {allTotals.setup_discount_pct > 0 && (
                    <p className="discount-note">* {(allTotals.setup_discount_pct * 100).toFixed(0)}% bulk discount applied to setup fee.</p>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* ── 5. Terms & Conditions ───────────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">5. Terms &amp; Conditions</h2>
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
                <li>All commercial data are valid upon personal approval by StarGrid.</li>
              </ul>
              <div className="gdpr-note">
                <strong>Data &amp; Privacy Disclaimer —</strong> We process personal data in accordance with the General Data
                Protection Regulation (GDPR). All data is collected and used solely for legitimate purposes, kept secure,
                and retained only as long as necessary. While we take appropriate measures to ensure data accuracy and
                protection, we cannot guarantee absolute security. Individuals have the right to access, rectify, or erase
                their personal data, as well as other rights as provided under GDPR.
              </div>
            </div>
          </section>

          <DocFooter today={today} refId={refId} />

          {/* ════════════════════════════════════════════════════════════════
              ANNEX — Connectivity Plan & Proposal  (page 2 and on)
          ════════════════════════════════════════════════════════════════ */}
          <div className="annex-break" />
          <DocHeader today={today} refId={refId} />

          <h1 className="doc-title">Annex: Connectivity Plan &amp; Proposal</h1>
          <p className="doc-sub">Technical &amp; Financial Breakdown — {totalSites} Site{totalSites !== 1 ? "s" : ""}</p>

          {/* ── Annex 1. Connectivity Solution Offer ────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">1. Connectivity Solution Offer</h2>
            <p className="sec__text sec__text--sm">
              Full overview of financial details per site — setup costs, monthly network fees, and StarGrid Managed Service fee.
            </p>

            {/* Enterprise Hub — central node */}
            <div className="site site--hub">
              <div className="site__hdr site__hdr--hub">
                <span className="badge badge--hub">Central Hub</span>
                <div className="site__info">
                  <span className="site__name">Enterprise Hub</span>
                  <span className="site__type">Central connectivity node — all {totalSites} site{totalSites !== 1 ? "s" : ""} connected</span>
                </div>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Component</th><th>Hardware</th><th>Airtime Plan</th>
                    <th className="ra">Setup Fee</th><th className="ra">Monthly Fee</th><th className="ra">Managed Svc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="dot" style={{ background:"#2ECC71" }} />Enterprise Hub</td>
                    <td>Large</td>
                    <td>—</td>
                    <td className="ra mono">{formatEuro(EH_SETUP)}</td>
                    <td className="ra mono">{formatEuro(EH_MONTHLY)}</td>
                    <td className="ra mono">{formatEuro(ehManagedSvc)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="tfoot-row tfoot-row--hub">
                    <td colSpan={3}><strong>Enterprise Hub Total</strong></td>
                    <td className="ra mono"><strong>{formatEuro(EH_SETUP)}</strong></td>
                    <td className="ra mono"><strong>{formatEuro(EH_MONTHLY)}</strong></td>
                    <td className="ra mono"><strong>{formatEuro(ehManagedSvc)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {sitePackages.map((sp, idx) => {
              const { site_name, site_number, package: pkg } = sp;
              const site     = sites[idx] || {};
              const siteType = site?.answers?.[22]?.label || "Fixed Site";
              const siteName = site?.name || site_name;
              const siteMsSvc = pkg.components.reduce((s, c) => s + compMsSvc(c), 0);
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
                        <th>Component</th><th>Hardware</th><th>Airtime Plan</th>
                        <th className="ra">Setup Fee</th><th className="ra">Monthly Fee</th><th className="ra">Managed Svc</th>
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
                          <td className="ra mono">{formatEuro(compMsSvc(c))}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="tfoot-row">
                        <td colSpan={3}><strong>Site {site_number} Subtotal</strong></td>
                        <td className="ra mono"><strong>{formatEuro(pkg.totals.network_setup_fee)}</strong></td>
                        <td className="ra mono"><strong>{formatEuro(pkg.totals.network_monthly_fee)}</strong></td>
                        <td className="ra mono"><strong>{formatEuro(siteMsSvc)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })}

            {/* All-sites total banner */}
            <div className="total-banner">
              <span>Total Contract Value ({allTotals.contract_months} months)</span>
              <span className="total-banner__val">{formatEuro(adjContractValue)}</span>
            </div>
          </section>

          {/* ── Annex 2. Bill of Materials ──────────────────────────────── */}
          <section className="sec">
            <h2 className="sec__title">2. Bill of Materials</h2>
            <p className="sec__text sec__text--sm">Full list of components purchased across all sites.</p>

            {/* Cellular Components */}
            <div className="bom-group">
              <div className="bom-group__hdr">
                <span className="bom-dot" style={{ background:"#3D72FC" }} />
                Cellular Components
              </div>
              <BomTable rows={bom.cellular} emptyMsg="No cellular components in this configuration." />
            </div>

            {/* Satellite Components */}
            <div className="bom-group">
              <div className="bom-group__hdr">
                <span className="bom-dot" style={{ background:"#5CB0E9" }} />
                Satellite Components
              </div>
              <BomTable rows={bom.satellite} emptyMsg="No satellite components in this configuration." />
            </div>

            {/* StarGrid Boxes / Other */}
            {bom.boxes.length > 0 && (
              <div className="bom-group">
                <div className="bom-group__hdr">
                  <span className="bom-dot" style={{ background:"#6669D8" }} />
                  StarGrid Boxes &amp; Other Components
                </div>
                <BomTable rows={bom.boxes} emptyMsg="" />
              </div>
            )}

            {/* Managed Services */}
            {bom.managed.length > 0 && (
              <div className="bom-group">
                <div className="bom-group__hdr">
                  <span className="bom-dot" style={{ background:"#22c55e" }} />
                  Managed Services
                </div>
                <table className="tbl bom-tbl">
                  <thead>
                    <tr><th>Site</th><th>Service Tier</th><th className="ra">Monthly Fee</th></tr>
                  </thead>
                  <tbody>
                    {bom.managed.map((m, i) => (
                      <tr key={i}>
                        <td><span className="badge badge--sm">Site {m.siteNum}</span></td>
                        <td>{m.label}</td>
                        <td className="ra mono">{formatEuro(m.fee)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <DocFooter today={today} refId={refId} right={isOperator ? "Network Operator" : "Enterprise"} />

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
        .pp__send  { padding:11px 22px; background:linear-gradient(135deg,#12b981,#059669); color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; }
        .pp__send:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 4px 14px rgba(16,185,129,0.35); }
        .pp__send:disabled { opacity:0.55; cursor:wait; }
        .pp__status--err { color:#ef4444; font-weight:600; }
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
        .site--hub { border-color:#a7f3c0; margin-bottom:28px; }
        .site__hdr { display:flex; align-items:center; gap:16px; padding:14px 20px; background:#f7f8fc; border-bottom:1px solid #e4e6ec; }
        .site__hdr--hub { background:#f0fdf5; border-bottom-color:#a7f3c0; }
        .badge--hub { background:linear-gradient(135deg,#2ECC71,#1aad5e); }
        .tfoot-row--hub td { background:#f0fdf5; border-top-color:#2ECC71 !important; }
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
        .terms ul { margin:0 0 14px; padding:0 0 0 18px; }
        .terms li { font-size:12px; color:#666; line-height:1.8; }
        .gdpr-note {
          margin-top:0; padding:12px 16px;
          background:#fff8f0; border:1px solid #fde8c8; border-left:3px solid #f59e0b;
          border-radius:0 8px 8px 0; font-size:11.5px; color:#78350f; line-height:1.7;
        }

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

        /* ── DocHeader / DocFooter wrapper strips (removes extra margin) ── */
        .doc-header-wrap { margin:0; }
        .doc-footer-wrap { margin:0; }
        .footer-tier { font-weight:700; color:#3D72FC; }

        /* ── Annex page break ────────────────────────── */
        .annex-break {
          height:0; margin:40px 0 0;
          border-top:3px dashed #c7d4fd;
          position:relative;
        }
        .annex-break::after {
          content:"— Annex begins on next page —";
          position:absolute; top:-11px; left:50%; transform:translateX(-50%);
          background:#fff; padding:0 14px;
          font-size:10px; font-weight:600; color:#aab; letter-spacing:0.8px; text-transform:uppercase;
        }

        /* ── Offering two-column layout ──────────────── */
        .offering-cols {
          display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:16px;
        }
        .offering-col { display:flex; flex-direction:column; }
        .offering-col__label {
          font-size:13px; font-weight:700; color:#12132a; margin:0 0 8px;
        }
        .deploy-box {
          border:2px solid #22c55e; border-radius:12px;
          padding:20px 24px; background:#f6fff9; flex:1;
        }
        .deploy-badge {
          display:inline-flex; padding:4px 14px; margin-bottom:14px;
          background:linear-gradient(135deg,#16a34a,#22c55e); color:#fff;
          border-radius:20px; font-size:11px; font-weight:700;
        }

        /* ── Bill of Materials ───────────────────────── */
        .bom-group { margin-bottom:24px; }
        .bom-group__hdr {
          display:flex; align-items:center; gap:10px;
          font-size:13px; font-weight:700; color:#12132a;
          margin-bottom:10px; padding-bottom:6px;
          border-bottom:1px solid #e4e6ec;
        }
        .bom-dot {
          display:inline-block; width:10px; height:10px;
          border-radius:50%; flex-shrink:0;
        }
        .bom-tbl th { font-size:10px; }
        .bom-tbl td { font-size:11.5px; }

        /* ── Print ───────────────────────────────────── */
        @media print {
          .pp__bar { display:none !important; }
          .pp { background:#fff !important; }
          .pp__paper-wrap { padding:0 !important; }
          .paper { box-shadow:none !important; border:none !important; width:100% !important; max-width:100% !important; padding:20px !important; }
          .annex-break { border-top:1px solid #ddd; }
          .annex-break::after { display:none; }
        }
        @media(max-width:700px) {
          .offering-cols { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  );
}

const centerStyle    = { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8ecf1", gap:12 };
const spinnerStyle   = { width:40, height:40, border:"4px solid #ddd", borderTopColor:"#3D72FC", borderRadius:"50%", animation:"sp .8s linear infinite" };
const primaryBtnStyle = { padding:"14px 28px", background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:600, cursor:"pointer", marginTop:8 };
