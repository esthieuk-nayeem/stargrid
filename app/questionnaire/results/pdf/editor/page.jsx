"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtNum(v) {
  const n = parseFloat(String(v ?? "").replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
}
function fmt(v) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(fmtNum(v));
}
function fmtOrDash(v) {
  if (v === "" || v == null) return "—";
  return fmt(v);
}

function siteTotals(site) {
  return (site.components || []).reduce(
    (acc, c) => ({
      setup:   acc.setup   + fmtNum(c.setupFee),
      monthly: acc.monthly + fmtNum(c.monthlyFee),
      managed: acc.managed + fmtNum(c.managedSvc),
    }),
    { setup: 0, monthly: 0, managed: 0 }
  );
}
function computeAllTotals(sites, months) {
  const tot = sites.reduce(
    (acc, s) => {
      const t = siteTotals(s);
      return { setup: acc.setup + t.setup, monthly: acc.monthly + t.monthly, managed: acc.managed + t.managed };
    },
    { setup: 0, monthly: 0, managed: 0 }
  );
  tot.contract = (tot.monthly + tot.managed) * fmtNum(months) + tot.setup;
  return tot;
}

const DEFAULT_PILLS = [
  "99.5% Line Availability",
  "Zero-Second Failover",
  "Global LEO/GEO Backup",
  "24/7 Managed Service",
];
const DEFAULT_TERMS = [
  "All prices are in EUR and exclude applicable VAT/taxes.",
  "This offer is valid for 30 days from the date of issue.",
  "Setup fees are one-time charges payable upon contract signing.",
  "Monthly fees are billed in advance on the 1st of each month.",
  "Managed service includes 24/7 monitoring, firmware updates, and SLA-based support.",
  "Contract duration as stated above; early termination fees may apply per the StarGrid Standard Agreement.",
  "Hardware remains StarGrid property until full setup fee is received.",
  "SLA credits apply as defined in the StarGrid Standard Agreement, Section 4.",
];

let _idSeq = 1;
const uid = () => `uid_${_idSeq++}_${Math.random().toString(36).slice(2, 6)}`;

function makeSite(num) {
  return {
    id: uid(),
    number: num,
    name: `Site ${num}`,
    type: "Fixed Site",
    tier: "Business Managed",
    location: "",
    params: {
      purpose: "", dataVolume: "",
      avgBwDown: "", avgBwUp: "",
      peakBwDown: "", peakBwUp: "",
      latency: "", primary: "", secondary: "", downtimeClass: "",
    },
    components: [
      { id: uid(), type: "Primary", hardware: "", airtime: "", color: "#3D72FC", setupFee: "", monthlyFee: "", managedSvc: "" },
    ],
  };
}
function makeComp() {
  return { id: uid(), type: "", hardware: "", airtime: "", color: "#3D72FC", setupFee: "", monthlyFee: "", managedSvc: "" };
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PdfEditorPage() {
  const router = useRouter();
  const offerRef   = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [generated,  setGenerated]  = useState(false);
  const [openSec,    setOpenSec]    = useState("header");

  const todayStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const refIdStr = `SG-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const [doc, setDoc] = useState({
    date: todayStr,
    refId: refIdStr,
    companyName: "",
    intro: {
      text1: "StarGrid delivers fully managed hybrid connectivity solutions that combine cellular (4G/5G), satellite (LEO/GEO), and fixed-line networks into a single, intelligent platform. Our edge devices automatically select the optimal available network, guaranteeing zero-touch, always-on connectivity for industrial, offshore, and remote operations worldwide.",
      text2: "This proposal has been generated based on the site configurations and requirements provided through the StarGrid Connectivity Planner. It outlines the recommended hardware, airtime plans, and managed service packages tailored to your specific operational needs.",
      pills: [...DEFAULT_PILLS],
    },
    useCase: {
      show: false,
      contactName: "", jobTitle: "", email: "", phone: "", text: "",
    },
    contractMonths: "36",
    isOperator: false,
    poc: {
      pocSites: "1",
      setupFee: "2000",
      monthlyFee: "",
      managedSvc: "",
      note: "Enterprise pricing applies. PoC setup includes hardware, installation, and 30-day SLA validation.",
    },
    terms: [...DEFAULT_TERMS],
    footer: {
      line1: "Cellular · Satellite · Fixed",
      line2: "al@cellsat.one · www.stargrid.one",
    },
    sites: [makeSite(1)],
  });

  // Pre-populate from localStorage
  useEffect(() => {
    try {
      const contact = JSON.parse(localStorage.getItem("questionnaire_contact") || "{}");
      const isOp    = JSON.parse(localStorage.getItem("isNetworkOperator") || "false");
      setDoc(prev => ({
        ...prev,
        companyName: contact.companyName || prev.companyName,
        isOperator:  isOp,
        useCase: {
          ...prev.useCase,
          show:        !!(contact.additionalNotes),
          contactName: contact.fullName   || "",
          jobTitle:    contact.jobTitle   || "",
          email:       contact.email      || "",
          phone:       contact.phone      || "",
          text:        contact.additionalNotes || "",
        },
        poc: {
          ...prev.poc,
          setupFee: isOp ? "10000" : "2000",
          note: isOp
            ? "Network Operator pricing applies. Setup fee reflects operator-tier PoC engagement."
            : "Enterprise pricing applies. PoC setup includes hardware, installation, and 30-day SLA validation.",
        },
      }));
    } catch (_) {}
  }, []);

  // ─── State helpers ───────────────────────────────────────────────────────────
  const set       = (k, v) => setDoc(p => ({ ...p, [k]: v }));
  const setIntro  = (k, v) => setDoc(p => ({ ...p, intro:   { ...p.intro,   [k]: v } }));
  const setUC     = (k, v) => setDoc(p => ({ ...p, useCase: { ...p.useCase, [k]: v } }));
  const setPoc    = (k, v) => setDoc(p => ({ ...p, poc:     { ...p.poc,     [k]: v } }));
  const setFooter = (k, v) => setDoc(p => ({ ...p, footer:  { ...p.footer,  [k]: v } }));

  const setSite = (i, k, v) => setDoc(p => {
    const s = [...p.sites]; s[i] = { ...s[i], [k]: v }; return { ...p, sites: s };
  });
  const setSiteParam = (i, k, v) => setDoc(p => {
    const s = [...p.sites]; s[i] = { ...s[i], params: { ...s[i].params, [k]: v } }; return { ...p, sites: s };
  });
  const setComp = (si, ci, k, v) => setDoc(p => {
    const s = [...p.sites];
    const comps = [...s[si].components]; comps[ci] = { ...comps[ci], [k]: v };
    s[si] = { ...s[si], components: comps }; return { ...p, sites: s };
  });

  const addSite    = ()       => setDoc(p => ({ ...p, sites: [...p.sites, makeSite(p.sites.length + 1)] }));
  const removeSite = (i)      => setDoc(p => ({ ...p, sites: p.sites.filter((_, idx) => idx !== i) }));
  const addComp    = (si)     => setDoc(p => { const s = [...p.sites]; s[si] = { ...s[si], components: [...s[si].components, makeComp()] }; return { ...p, sites: s }; });
  const removeComp = (si, ci) => setDoc(p => { const s = [...p.sites]; s[si] = { ...s[si], components: s[si].components.filter((_, i) => i !== ci) }; return { ...p, sites: s }; });

  const setPill   = (i, v) => setDoc(p => { const pills = [...p.intro.pills]; pills[i] = v; return { ...p, intro: { ...p.intro, pills } }; });
  const addPill   = ()     => setDoc(p => ({ ...p, intro: { ...p.intro, pills: [...p.intro.pills, ""] } }));
  const removePill = (i)  => setDoc(p => ({ ...p, intro: { ...p.intro, pills: p.intro.pills.filter((_, idx) => idx !== i) } }));

  const setTerm   = (i, v) => setDoc(p => { const terms = [...p.terms]; terms[i] = v; return { ...p, terms }; });
  const addTerm   = ()     => setDoc(p => ({ ...p, terms: [...p.terms, ""] }));
  const removeTerm = (i)  => setDoc(p => ({ ...p, terms: p.terms.filter((_, idx) => idx !== i) }));

  // ─── PDF Download ────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    setGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF }   = await import("jspdf");
      const el = offerRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        backgroundColor: "#ffffff", scale: 1.5, useCORS: true,
        logging: false, windowWidth: 860,
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
        const srcY = (p * contentH / scaledImgH) * canvas.height;
        const srcH = (contentH / scaledImgH) * canvas.height;
        const isLast     = p === totalPages - 1;
        const actualSrcH  = isLast ? canvas.height - srcY : srcH;
        const actualDestH = isLast ? (actualSrcH / canvas.height) * scaledImgH : contentH;

        const pc = document.createElement("canvas");
        pc.width = canvas.width; pc.height = Math.ceil(actualSrcH);
        const ctx = pc.getContext("2d");
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, pc.width, pc.height);
        ctx.drawImage(canvas, 0, srcY, canvas.width, actualSrcH, 0, 0, canvas.width, actualSrcH);

        const pageImg = pc.toDataURL("image/jpeg", 0.78);
        pdf.addImage(pageImg, "JPEG", margin, margin, contentW, actualDestH);
        pdf.setFontSize(8); pdf.setTextColor(180, 180, 180);
        pdf.text(`Page ${p + 1} of ${totalPages}`, pageW / 2, pageH - 5, { align: "center" });
        pdf.text("StarGrid — Confidential", margin, pageH - 5);
      }

      pdf.save("StarGrid-Connectivity-Offer.pdf");
      setGenerated(true);
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF generation requires html2canvas & jspdf.");
    } finally {
      setGenerating(false);
    }
  };

  // ─── Computed ────────────────────────────────────────────────────────────────
  const totals      = computeAllTotals(doc.sites, doc.contractMonths);
  const pocLabel    = doc.isOperator ? "Network Operator PoC" : "Enterprise PoC";
  const pocSiteCnt  = Math.max(1, fmtNum(doc.poc.pocSites));
  const toggle      = (s) => setOpenSec(p => p === s ? null : s);

  // ─── Reusable editor widgets ─────────────────────────────────────────────────
  const Inp = ({ label, value, onChange, type = "text", rows, placeholder }) => (
    <div style={{ marginBottom: 12 }}>
      {label && (
        <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:4 }}>
          {label}
        </label>
      )}
      {rows ? (
        <textarea
          rows={rows} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          style={{ width:"100%", padding:"8px 10px", border:"1px solid #dde1ea", borderRadius:8, fontSize:13, lineHeight:1.5, resize:"vertical", color:"#1e1e2e", background:"#fff", boxSizing:"border-box", fontFamily:"inherit" }}
        />
      ) : (
        <input
          type={type} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          style={{ width:"100%", padding:"8px 10px", border:"1px solid #dde1ea", borderRadius:8, fontSize:13, color:"#1e1e2e", background:"#fff", boxSizing:"border-box" }}
        />
      )}
    </div>
  );

  const Acc = ({ id, title, children }) => (
    <div style={{ borderBottom:"1px solid #e4e6ec" }}>
      <button
        onClick={() => toggle(id)}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
      >
        <span style={{ fontSize:13, fontWeight:700, color:"#1e1e2e" }}>{title}</span>
        <span style={{ fontSize:14, color:"#aaa", display:"inline-block", transform: openSec === id ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▾</span>
      </button>
      {openSec === id && <div style={{ padding:"4px 20px 20px" }}>{children}</div>}
    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="ep">

      {/* ── Top bar ── */}
      <div className="ep__bar">
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => router.push("/questionnaire/results/pdf")} className="ep__btn-grey">← PDF View</button>
          <button onClick={() => router.push("/questionnaire/results")} className="ep__btn-grey">Results</button>
        </div>
        <span style={{ fontSize:15, fontWeight:700, color:"#12132a" }}>PDF Editor</span>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {generating && <span style={{ fontSize:13, color:"#999" }}>Generating…</span>}
          {generated  && <span style={{ fontSize:13, color:"#22c55e", fontWeight:600 }}>✓ Downloaded</span>}
          <button onClick={() => window.print()} className="ep__btn-grey">Print</button>
          <button onClick={handleDownload} disabled={generating} className="ep__dl">
            {generating ? "Generating…" : "↓ Download PDF"}
          </button>
        </div>
      </div>

      <div className="ep__body">

        {/* ══════════ LEFT — EDITOR PANEL ══════════ */}
        <div className="ep__editor">
          <div style={{ padding:"12px 20px", background:"#f7f8fc", borderBottom:"1px solid #e4e6ec" }}>
            <p style={{ margin:0, fontSize:12, color:"#888" }}>Edit any field — the preview updates live.</p>
          </div>

          {/* Header */}
          <Acc id="header" title="Header">
            <Inp label="Company Name" value={doc.companyName} onChange={v => set("companyName", v)} placeholder="Acme Corp" />
            <Inp label="Date" value={doc.date} onChange={v => set("date", v)} placeholder="08 April 2026" />
            <Inp label="Reference ID" value={doc.refId} onChange={v => set("refId", v)} placeholder="SG-XXXXXX" />
          </Acc>

          {/* Introduction */}
          <Acc id="intro" title="1. Introduction">
            <Inp label="Paragraph 1" value={doc.intro.text1} onChange={v => setIntro("text1", v)} rows={5} />
            <Inp label="Paragraph 2" value={doc.intro.text2} onChange={v => setIntro("text2", v)} rows={4} />
            <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>Capability Pills</label>
            {doc.intro.pills.map((pl, i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
                <input value={pl} onChange={e => setPill(i, e.target.value)}
                  style={{ flex:1, padding:"7px 10px", border:"1px solid #dde1ea", borderRadius:7, fontSize:13 }} />
                <button onClick={() => removePill(i)} style={rmBtnStyle}>×</button>
              </div>
            ))}
            <button onClick={addPill} style={addLinkStyle}>+ Add pill</button>
          </Acc>

          {/* Use Case */}
          <Acc id="usecase" title="2. Client Use Case">
            <label style={{ fontSize:13, color:"#555", display:"flex", alignItems:"center", gap:8, cursor:"pointer", marginBottom:14 }}>
              <input type="checkbox" checked={doc.useCase.show} onChange={e => setUC("show", e.target.checked)} />
              Show this section in PDF
            </label>
            <Inp label="Contact Name"  value={doc.useCase.contactName} onChange={v => setUC("contactName", v)} placeholder="Jane Doe" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <Inp label="Job Title" value={doc.useCase.jobTitle} onChange={v => setUC("jobTitle", v)} placeholder="CTO" />
              <Inp label="Email"     value={doc.useCase.email}    onChange={v => setUC("email", v)}    placeholder="jane@acme.com" />
              <Inp label="Phone"     value={doc.useCase.phone}    onChange={v => setUC("phone", v)}    placeholder="+1 555 000" />
            </div>
            <Inp label="Use Case Text" value={doc.useCase.text} onChange={v => setUC("text", v)} rows={5} placeholder="Describe the client's connectivity use case…" />
          </Acc>

          {/* Sites */}
          <Acc id="sites" title="3 & 4. Sites — Parameters & Offer">
            {doc.sites.map((site, si) => (
              <div key={site.id} style={{ border:"1px solid #dde1ea", borderRadius:10, marginBottom:16, overflow:"hidden" }}>
                <div style={{ background:"#f7f8fc", padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #e4e6ec" }}>
                  <span style={{ fontSize:13, fontWeight:700, color:"#12132a" }}>Site {site.number}</span>
                  {doc.sites.length > 1 && (
                    <button onClick={() => removeSite(si)} style={{ fontSize:12, color:"#dc3545", background:"none", border:"none", cursor:"pointer" }}>Remove</button>
                  )}
                </div>
                <div style={{ padding:"14px 16px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <Inp label="Site Name" value={site.name}     onChange={v => setSite(si, "name",     v)} placeholder="Main Office" />
                    <Inp label="Location"  value={site.location} onChange={v => setSite(si, "location", v)} placeholder="Oslo, Norway" />
                    <Inp label="Site Type" value={site.type}     onChange={v => setSite(si, "type",     v)} placeholder="Fixed Site" />
                    <Inp label="Tier"      value={site.tier}     onChange={v => setSite(si, "tier",     v)} placeholder="Business Managed" />
                  </div>

                  {/* Params */}
                  <div style={{ marginTop:14, paddingTop:14, borderTop:"1px dashed #e4e6ec" }}>
                    <p style={{ margin:"0 0 10px", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.5px" }}>Connectivity Parameters</p>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      {[
                        ["purpose",      "Primary Purpose"],
                        ["dataVolume",   "Monthly Data Volume"],
                        ["avgBwDown",    "Avg BW — Down"],
                        ["avgBwUp",      "Avg BW — Up"],
                        ["peakBwDown",   "Peak BW — Down"],
                        ["peakBwUp",     "Peak BW — Up"],
                        ["latency",      "Latency"],
                        ["primary",      "Primary Connection"],
                        ["secondary",    "Secondary Connection"],
                        ["downtimeClass","Downtime Class"],
                      ].map(([k, lbl]) => (
                        <Inp key={k} label={lbl} value={site.params[k]} onChange={v => setSiteParam(si, k, v)} placeholder="—" />
                      ))}
                    </div>
                  </div>

                  {/* Components */}
                  <div style={{ marginTop:14, paddingTop:14, borderTop:"1px dashed #e4e6ec" }}>
                    <p style={{ margin:"0 0 10px", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.5px" }}>Connectivity Components</p>
                    {site.components.map((comp, ci) => (
                      <div key={comp.id} style={{ border:"1px solid #e8eaf0", borderRadius:8, padding:"12px 14px", marginBottom:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                          <span style={{ fontSize:12, fontWeight:600, color:"#555" }}>Component {ci + 1}</span>
                          {site.components.length > 1 && (
                            <button onClick={() => removeComp(si, ci)} style={{ fontSize:11, color:"#dc3545", background:"none", border:"none", cursor:"pointer" }}>Remove</button>
                          )}
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                          <Inp label="Type"         value={comp.type}     onChange={v => setComp(si, ci, "type",     v)} placeholder="Primary" />
                          <div style={{ marginBottom:12 }}>
                            <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:4 }}>Color</label>
                            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                              <input type="color" value={comp.color} onChange={e => setComp(si, ci, "color", e.target.value)}
                                style={{ width:36, height:34, border:"1px solid #dde1ea", borderRadius:6, padding:2, cursor:"pointer" }} />
                              <input value={comp.color} onChange={e => setComp(si, ci, "color", e.target.value)}
                                style={{ flex:1, padding:"7px 10px", border:"1px solid #dde1ea", borderRadius:7, fontSize:12, fontFamily:"monospace" }} />
                            </div>
                          </div>
                          <Inp label="Hardware"     value={comp.hardware} onChange={v => setComp(si, ci, "hardware", v)} placeholder="RUT956 LTE Router" />
                          <Inp label="Airtime Plan" value={comp.airtime}  onChange={v => setComp(si, ci, "airtime",  v)} placeholder="10 GB / month" />
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                          <Inp label="Setup Fee (€)"    value={comp.setupFee}   onChange={v => setComp(si, ci, "setupFee",   v)} type="number" placeholder="1500" />
                          <Inp label="Monthly Fee (€)"  value={comp.monthlyFee} onChange={v => setComp(si, ci, "monthlyFee", v)} type="number" placeholder="350" />
                          <Inp label="Managed Svc (€)"  value={comp.managedSvc} onChange={v => setComp(si, ci, "managedSvc", v)} type="number" placeholder="200" />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addComp(si)} style={addLinkStyle}>+ Add component</button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addSite} style={{ width:"100%", padding:"10px", border:"2px dashed #c7d4fd", borderRadius:10, background:"#f8f9ff", color:"#3D72FC", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              + Add Site
            </button>
          </Acc>

          {/* Deployment Summary */}
          <Acc id="summary" title="5. Deployment Summary">
            <p style={{ fontSize:12, color:"#888", margin:"0 0 12px" }}>Totals are auto-calculated from site component fees.</p>
            <Inp label="Contract Duration (months)" value={doc.contractMonths} onChange={v => set("contractMonths", v)} type="number" />
            <div style={{ background:"#f8f9ff", border:"1px solid #dce4fd", borderRadius:10, padding:"14px 16px" }}>
              {[
                ["Total Setup Fee",       fmt(totals.setup),    "#333"],
                ["Total Monthly Fee",     fmt(totals.monthly),  "#333"],
                ["Total Managed Service", fmt(totals.managed),  "#333"],
                ["Contract Value",        fmt(totals.contract), "#3D72FC"],
              ].map(([lbl, val, col]) => (
                <div key={lbl} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #eef0f4" }}>
                  <span style={{ fontSize:13, color:"#666" }}>{lbl}</span>
                  <span style={{ fontSize:13, fontWeight:700, color: col }}>{val}</span>
                </div>
              ))}
            </div>
          </Acc>

          {/* PoC */}
          <Acc id="poc" title="6. Proof of Concept (PoC)">
            <label style={{ fontSize:13, color:"#555", display:"flex", alignItems:"center", gap:8, cursor:"pointer", marginBottom:14 }}>
              <input type="checkbox" checked={doc.isOperator} onChange={e => {
                const op = e.target.checked;
                set("isOperator", op);
                if (!doc.poc.setupFee || doc.poc.setupFee === "2000" || doc.poc.setupFee === "10000") {
                  setPoc("setupFee", op ? "10000" : "2000");
                }
              }} />
              Network Operator
            </label>
            <Inp label="PoC Site Count"            value={doc.poc.pocSites}   onChange={v => setPoc("pocSites",   v)} type="number" placeholder="1" />
            <Inp label="Network Setup Fee (€)"     value={doc.poc.setupFee}   onChange={v => setPoc("setupFee",   v)} type="number" />
            <Inp label="Monthly Connectivity (€)"  value={doc.poc.monthlyFee} onChange={v => setPoc("monthlyFee", v)} type="number" />
            <Inp label="Monthly Managed Svc (€)"   value={doc.poc.managedSvc} onChange={v => setPoc("managedSvc", v)} type="number" />
            <Inp label="PoC Note"                  value={doc.poc.note}       onChange={v => setPoc("note",       v)} rows={2} />
          </Acc>

          {/* Terms */}
          <Acc id="terms" title="8. Terms & Conditions">
            {doc.terms.map((t, i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
                <input value={t} onChange={e => setTerm(i, e.target.value)}
                  style={{ flex:1, padding:"7px 10px", border:"1px solid #dde1ea", borderRadius:7, fontSize:12, color:"#333" }} />
                <button onClick={() => removeTerm(i)} style={rmBtnStyle}>×</button>
              </div>
            ))}
            <button onClick={addTerm} style={addLinkStyle}>+ Add term</button>
          </Acc>

          {/* Footer */}
          <Acc id="footer" title="Footer">
            <Inp label="Line 1" value={doc.footer.line1} onChange={v => setFooter("line1", v)} placeholder="Cellular · Satellite · Fixed" />
            <Inp label="Line 2" value={doc.footer.line2} onChange={v => setFooter("line2", v)} placeholder="email · www.stargrid.one" />
          </Acc>
        </div>

        {/* ══════════ RIGHT — LIVE PREVIEW ══════════ */}
        <div className="ep__preview">
          <div ref={offerRef} className="paper">

            {/* HEADER */}
            <header className="hdr">
              <div className="hdr__logo">
                <Image src="/assets/images/icon/icon.png" alt="StarGrid" width={38} height={38} />
                <div>
                  <div className="hdr__brand">STARGRID</div>
                  <div className="hdr__tagline">Industrial Connectivity Solutions</div>
                </div>
              </div>
              <div className="hdr__meta">
                <div className="hdr__date">{doc.date}</div>
                <div className="hdr__ref">Ref: {doc.refId}</div>
              </div>
            </header>
            <div className="rule rule--gradient" />
            <h1 className="doc-title">Connectivity Solution Proposal</h1>
            <p className="doc-sub">
              {doc.sites.length} Site{doc.sites.length !== 1 ? "s" : ""} — Personalised Plan
              {doc.companyName ? ` for ${doc.companyName}` : ""}
            </p>

            {/* 1. Introduction */}
            <section className="sec">
              <h2 className="sec__title">1. Introduction</h2>
              {doc.intro.text1 && <p className="sec__text">{doc.intro.text1}</p>}
              {doc.intro.text2 && <p className="sec__text">{doc.intro.text2}</p>}
              <div className="intro-pills">
                {doc.intro.pills.filter(Boolean).map((pl, i) => (
                  <span key={i} className="pill">{pl}</span>
                ))}
              </div>
            </section>

            {/* 2. Client Use Case */}
            {doc.useCase.show && doc.useCase.text && (
              <section className="sec">
                <h2 className="sec__title">2. Client Use Case</h2>
                {doc.useCase.contactName && (
                  <div className="contact-row">
                    <span><strong>Contact:</strong> {doc.useCase.contactName}</span>
                    {doc.useCase.jobTitle && <span> · {doc.useCase.jobTitle}</span>}
                    {doc.useCase.email    && <span> · {doc.useCase.email}</span>}
                    {doc.useCase.phone    && <span> · {doc.useCase.phone}</span>}
                  </div>
                )}
                <blockquote className="use-case">
                  <span className="use-case__icon">"</span>
                  <p>{doc.useCase.text}</p>
                </blockquote>
              </section>
            )}

            {/* 3. Connectivity Parameters */}
            <section className="sec">
              <h2 className="sec__title">3. Connectivity Parameters</h2>
              <p className="sec__text sec__text--sm">The following table summarises the key technical requirements captured per site.</p>
              {doc.sites.map((site) => {
                const p = site.params;
                const rows = [
                  { label: "Primary Purpose",       val: p.purpose       || "—" },
                  { label: "Monthly Data Volume",   val: p.dataVolume    || "—" },
                  { label: "Avg Bandwidth — Down",  val: p.avgBwDown     || "—" },
                  { label: "Avg Bandwidth — Up",    val: p.avgBwUp       || "—" },
                  { label: "Peak Bandwidth — Down", val: p.peakBwDown    || "—" },
                  { label: "Peak Bandwidth — Up",   val: p.peakBwUp      || "—" },
                  { label: "Latency Requirement",   val: p.latency       || "—" },
                  { label: "Primary Connection",    val: p.primary       || "—" },
                  { label: "Secondary Connection",  val: p.secondary     || "—" },
                  { label: "Downtime Class",        val: p.downtimeClass || "—" },
                ];
                return (
                  <div key={site.id} className="param-block">
                    <div className="param-block__hdr">
                      <span className="badge">Site {site.number}</span>
                      <span className="param-block__name">{site.name}</span>
                    </div>
                    <table className="param-tbl">
                      <tbody>
                        {rows.map((r, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? "even" : ""}>
                            <td className="param-tbl__lbl">{r.label}</td>
                            <td className="param-tbl__val">{r.val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </section>

            {/* 4. Connectivity Solution Offer */}
            <section className="sec">
              <h2 className="sec__title">4. Connectivity Solution Offer</h2>
              <p className="sec__text sec__text--sm">Recommended hardware, airtime plans, and managed service tiers per site.</p>
              {doc.sites.map((site) => {
                const tot = siteTotals(site);
                return (
                  <div key={site.id} className="site">
                    <div className="site__hdr">
                      <span className="badge">Site {site.number}</span>
                      <div className="site__info">
                        <span className="site__name">{site.name}</span>
                        <span className="site__type">{site.type} — {site.tier}</span>
                        {site.location && <span className="site__loc">{site.location}</span>}
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
                        {site.components.map((c) => (
                          <tr key={c.id}>
                            <td><span className="dot" style={{ background: c.color }} />{c.type || "—"}</td>
                            <td>{c.hardware || "—"}</td>
                            <td>{c.airtime  || "—"}</td>
                            <td className="ra mono">{fmtOrDash(c.setupFee)}</td>
                            <td className="ra mono">{fmtOrDash(c.monthlyFee)}</td>
                            <td className="ra mono">{fmtOrDash(c.managedSvc)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="tfoot-row">
                          <td colSpan={3}><strong>Site {site.number} Subtotal</strong></td>
                          <td className="ra mono"><strong>{fmt(tot.setup)}</strong></td>
                          <td className="ra mono"><strong>{fmt(tot.monthly)}</strong></td>
                          <td className="ra mono"><strong>{fmt(tot.managed)}</strong></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                );
              })}
            </section>

            {/* 5. Deployment Summary */}
            <section className="sec">
              <h2 className="sec__title">5. Deployment Summary</h2>
              <p className="sec__text sec__text--sm">Overview of total investment across all configured sites.</p>
              <table className="sum-overview">
                <thead><tr><th>Line Item</th><th className="ra">Amount</th></tr></thead>
                <tbody>
                  <tr><td>Total Network Setup Fee</td><td className="ra mono"><strong>{fmt(totals.setup)}</strong></td></tr>
                  <tr className="even"><td>Total Monthly Connectivity</td><td className="ra mono"><strong>{fmt(totals.monthly)}</strong></td></tr>
                  <tr><td>Total Monthly Managed Service</td><td className="ra mono"><strong>{fmt(totals.managed)}</strong></td></tr>
                  <tr className="cv-row">
                    <td><strong>Total Contract Value</strong><small className="cv-sub"> / {doc.contractMonths} months</small></td>
                    <td className="ra mono cv-val"><strong>{fmt(totals.contract)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 6. PoC */}
            <section className="sec">
              <h2 className="sec__title">6. Proof of Concept (PoC)</h2>
              <p className="sec__text sec__text--sm">
                StarGrid offers a structured PoC covering the first {pocSiteCnt} site{pocSiteCnt !== 1 ? "s" : ""} at fixed pricing to validate performance before full deployment.
              </p>
              <div className="poc-box">
                <div className="poc-box__badge">{pocLabel}</div>
                <table className="sum-overview">
                  <thead><tr><th>Line Item</th><th className="ra">PoC Amount</th></tr></thead>
                  <tbody>
                    <tr><td>Network Setup Fee</td><td className="ra mono"><strong>{fmtOrDash(doc.poc.setupFee)}</strong></td></tr>
                    <tr className="even"><td>Monthly Connectivity</td><td className="ra mono"><strong>{fmtOrDash(doc.poc.monthlyFee)}</strong></td></tr>
                    <tr><td>Monthly Managed Service</td><td className="ra mono"><strong>{fmtOrDash(doc.poc.managedSvc)}</strong></td></tr>
                  </tbody>
                </table>
                {doc.poc.note && <p className="poc-note">{doc.poc.note}</p>}
              </div>
            </section>

            {/* 7. Full Customer Case */}
            <section className="sec">
              <h2 className="sec__title">7. Full Customer Case</h2>
              <p className="sec__text sec__text--sm">Combined summary across all {doc.sites.length} site{doc.sites.length !== 1 ? "s" : ""} for full deployment.</p>
              <div className="sum-grid">
                {doc.sites.map((site) => {
                  const t = siteTotals(site);
                  return (
                    <div key={site.id} className="sum-box">
                      <div className="sum-box__hdr">
                        <span className="badge badge--sm">Site {site.number}</span>
                        <span className="sum-box__name">{site.name}</span>
                      </div>
                      <table className="sum-tbl">
                        <tbody>
                          <tr><td>Setup Fee</td><td className="ra mono">{fmt(t.setup)}</td></tr>
                          <tr><td>Monthly Fee</td><td className="ra mono">{fmt(t.monthly)}</td></tr>
                          <tr><td>Managed Svc</td><td className="ra mono">{fmt(t.managed)}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
              <div className="total-banner">
                <span>Total Contract Value ({doc.contractMonths} months)</span>
                <span className="total-banner__val">{fmt(totals.contract)}</span>
              </div>
            </section>

            {/* 8. Terms */}
            <section className="sec">
              <h2 className="sec__title">8. Terms &amp; Conditions</h2>
              <p className="sec__text sec__text--sm">
                This proposal is governed by the <strong>StarGrid Standard Agreement</strong> (available at{" "}
                <span className="link-ref">www.stargrid.one/legal</span>). Key terms:
              </p>
              <div className="terms">
                <ul>
                  {doc.terms.filter(Boolean).map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </section>

            {/* Footer */}
            <div className="rule rule--gradient" />
            <footer className="ftr">
              <div className="ftr__left">
                <strong>StarGrid</strong>
                <span>{doc.footer.line1}</span>
                <span>{doc.footer.line2}</span>
              </div>
              <div className="ftr__right">
                <span>Prepared {doc.date}</span>
                <span>Reference: {doc.refId}</span>
                <span>Confidential — For intended recipient only</span>
              </div>
            </footer>

          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Layout ─────────────────────────────────── */
        .ep { height:100vh; display:flex; flex-direction:column; background:#e8ecf1; font-family:'Segoe UI',-apple-system,Arial,sans-serif; overflow:hidden; }

        .ep__bar {
          flex-shrink:0; display:flex; justify-content:space-between; align-items:center;
          padding:12px 24px; background:#fff;
          border-bottom:1px solid #ddd; box-shadow:0 1px 4px rgba(0,0,0,0.06); z-index:10;
        }
        .ep__btn-grey { padding:9px 16px; background:#f5f5f5; border:1px solid #ddd; border-radius:8px; color:#444; font-size:13px; font-weight:500; cursor:pointer; }
        .ep__btn-grey:hover { background:#eee; }
        .ep__dl { padding:10px 24px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; }
        .ep__dl:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 4px 14px rgba(61,114,252,0.3); }
        .ep__dl:disabled { opacity:0.55; cursor:wait; }

        .ep__body { flex:1; display:flex; overflow:hidden; }

        /* ── Editor panel ───────────────────────────── */
        .ep__editor {
          width:400px; flex-shrink:0;
          background:#fff; border-right:1px solid #e4e6ec;
          overflow-y:auto;
        }

        /* ── Preview panel ──────────────────────────── */
        .ep__preview {
          flex:1; overflow-y:auto;
          padding:28px 32px;
          display:flex; justify-content:center;
        }

        /* ── Paper (identical to pdf/page.jsx) ──────── */
        .paper {
          width:860px; max-width:100%; background:#ffffff;
          border-radius:3px; box-shadow:0 1px 3px rgba(0,0,0,0.08),0 8px 40px rgba(0,0,0,0.06);
          padding:52px 60px;
          font-family:'Segoe UI',-apple-system,Arial,Helvetica,sans-serif;
          color:#1e1e2e; font-size:13px; line-height:1.55;
        }
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
        .sec { margin-top:32px; }
        .sec__title { font-size:16px; font-weight:700; color:#12132a; margin:0 0 12px; padding-bottom:8px; border-bottom:2px solid #3D72FC; display:flex; align-items:center; gap:8px; }
        .sec__text { font-size:13px; color:#555; line-height:1.7; margin:0 0 12px; }
        .sec__text--sm { font-size:12px; color:#777; }
        .intro-pills { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
        .pill { padding:4px 12px; border-radius:20px; background:#eef2ff; border:1px solid #c7d4fd; font-size:11.5px; font-weight:600; color:#3D72FC; }
        .contact-row { font-size:12px; color:#888; margin-bottom:10px; }
        .use-case { position:relative; margin:12px 0 0; padding:16px 20px 16px 48px; background:#f8f9ff; border:1px solid #dce4fd; border-left:4px solid #3D72FC; border-radius:0 10px 10px 0; }
        .use-case__icon { position:absolute; left:14px; top:10px; font-size:32px; color:#c7d4fd; font-family:Georgia,serif; line-height:1; }
        .use-case p { margin:0; font-size:13px; color:#444; line-height:1.75; font-style:italic; }
        .param-block { margin-bottom:20px; border:1px solid #e4e6ec; border-radius:10px; overflow:hidden; }
        .param-block__hdr { display:flex; align-items:center; gap:12px; padding:10px 16px; background:#f7f8fc; border-bottom:1px solid #e4e6ec; }
        .param-block__name { font-size:13px; font-weight:600; color:#333; }
        .param-tbl { width:100%; border-collapse:collapse; }
        .param-tbl tr.even { background:#fafbfd; }
        .param-tbl__lbl { padding:8px 16px; font-size:12px; color:#777; width:46%; }
        .param-tbl__val { padding:8px 16px; font-size:12px; font-weight:600; color:#333; }
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
        .sum-overview { width:100%; border-collapse:collapse; border:1px solid #e4e6ec; border-radius:10px; overflow:hidden; }
        .sum-overview th { padding:10px 16px; background:#f7f8fc; font-size:11px; font-weight:700; color:#888; text-transform:uppercase; letter-spacing:0.5px; text-align:left; border-bottom:1px solid #e4e6ec; }
        .sum-overview th.ra { text-align:right; }
        .sum-overview td { padding:10px 16px; font-size:13px; color:#444; border-bottom:1px solid #f0f0f0; }
        .sum-overview tr.even td { background:#fafbfd; }
        .sum-overview tr:last-child td { border-bottom:none; }
        .cv-row td { border-top:2px solid #3D72FC !important; }
        .cv-val { font-size:18px !important; color:#3D72FC !important; }
        .cv-sub { font-size:11px; color:#aaa; font-weight:normal; margin-left:4px; }
        .poc-box { border:2px solid #3D72FC; border-radius:12px; padding:20px 24px; background:#f8f9ff; }
        .poc-box__badge { display:inline-flex; padding:4px 14px; margin-bottom:14px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; border-radius:20px; font-size:11px; font-weight:700; }
        .poc-note { margin-top:12px; font-size:11.5px; color:#777; font-style:italic; }
        .sum-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:14px; margin-bottom:18px; }
        .sum-box  { border:1px solid #e4e6ec; border-radius:10px; padding:16px 18px; }
        .sum-box__hdr { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .sum-box__name { font-size:12px; font-weight:600; color:#333; }
        .sum-tbl { width:100%; border-collapse:collapse; }
        .sum-tbl td { padding:5px 0; font-size:12px; color:#555; border-bottom:1px solid #f5f5f5; }
        .sum-tbl tr:last-child td { border-bottom:none; }
        .total-banner { display:flex; justify-content:space-between; align-items:center; padding:14px 20px; background:#12132a; border-radius:10px; color:#fff; font-size:14px; font-weight:600; }
        .total-banner__val { font-size:20px; color:#5CB0E9; font-weight:800; }
        .badge { display:inline-flex; padding:4px 12px; border-radius:16px; background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; font-size:11px; font-weight:700; white-space:nowrap; flex-shrink:0; }
        .badge--sm { padding:3px 10px; font-size:10px; }
        .link-ref { color:#3D72FC; font-style:normal; }
        .terms { background:#fafbfd; border:1px solid #eef0f4; border-radius:10px; padding:16px 20px; }
        .terms ul { margin:0; padding:0 0 0 18px; }
        .terms li { font-size:12px; color:#666; line-height:1.8; }
        .ftr { display:flex; justify-content:space-between; padding-top:8px; font-size:11px; color:#bbb; }
        .ftr__left  { display:flex; flex-direction:column; gap:2px; }
        .ftr__left strong { color:#555; font-size:12px; }
        .ftr__right { text-align:right; display:flex; flex-direction:column; gap:2px; }

        @media print {
          .ep__bar    { display:none !important; }
          .ep__editor { display:none !important; }
          .ep__body   { display:block !important; height:auto !important; }
          .ep__preview { padding:0 !important; overflow:visible !important; }
          .paper { box-shadow:none !important; border:none !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Shared button styles (defined outside component to avoid re-creation) ────
const rmBtnStyle = {
  padding:"0 10px", border:"1px solid #f8d7da", borderRadius:7,
  color:"#dc3545", background:"#fff8f8", cursor:"pointer", fontSize:18, lineHeight:1,
};
const addLinkStyle = {
  fontSize:12, color:"#3D72FC", background:"none", border:"none",
  cursor:"pointer", padding:0, marginTop:4,
};
