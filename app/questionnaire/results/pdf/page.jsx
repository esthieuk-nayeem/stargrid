"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllSites } from "@/lib/multiSiteStorage";
import { getRecommendations, formatEuro } from "@/lib/recommendation";
import Image from "next/image";

/* ── helpers ──────────────────────────────────────────────────────────────── */
function getLabel(ans) {
  if (!ans) return "—";
  if (typeof ans === "string") return ans;
  if (ans.label) return ans.label;
  if (ans.display_answer) return String(ans.display_answer);
  return "—";
}

/* ── tiny style constants ─────────────────────────────────────────────────── */
const BLUE   = "#3D72FC";
const GRAD   = "linear-gradient(90deg,#3D72FC,#5CB0E9,#6669D8)";
const FONT   = "'Segoe UI',-apple-system,Arial,Helvetica,sans-serif";

const thBase  = { padding:"7px 10px", textAlign:"left", fontSize:9.5, fontWeight:700, color:"#999", textTransform:"uppercase", letterSpacing:"0.6px", background:"#fafbfd", borderBottom:"2px solid #eef0f4" };
const thR     = { ...thBase, textAlign:"right" };
const tdBase  = { padding:"8px 10px", borderBottom:"1px solid #f0f1f5", color:"#333", fontSize:11.5, verticalAlign:"middle" };
const tdR     = { ...tdBase, textAlign:"right", fontVariantNumeric:"tabular-nums" };
const tdEven  = { ...tdBase, background:"#fafbfd" };
const tdEvenR = { ...tdEven, textAlign:"right", fontVariantNumeric:"tabular-nums" };
const dotS    = { display:"inline-block", width:8, height:8, borderRadius:"50%", marginRight:6, verticalAlign:"middle" };
const badgeS  = { display:"inline-block", padding:"2px 9px", borderRadius:14, background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", fontSize:9.5, fontWeight:700 };

const secTitleStyle = {
  fontSize:13, fontWeight:700, color:"#12132a",
  margin:"0 0 7px", paddingBottom:4,
  borderBottom:`2px solid ${BLUE}`,
};
const gradBar = { height:3, background:GRAD, borderRadius:2, margin:"10px 0" };

/* ── reusable sub-components (all inline styles — no CSS classes) ─────────── */

function GradBar({ mt = 10, mb = 10 }) {
  return <div style={{ height:3, background:GRAD, borderRadius:2, marginTop:mt, marginBottom:mb }} />;
}

function PageHeader({ today, refId, withTc }) {
  return (
    <div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <tbody><tr>
          {/* logo + date */}
          <td style={{ verticalAlign:"top", width:"38%", paddingRight:16 }}>
            <table style={{ borderCollapse:"collapse" }}><tbody><tr>
              <td style={{ paddingRight:10, verticalAlign:"middle" }}>
                <Image src="/assets/images/icon/icon.png" alt="StarGrid" width={30} height={30} />
              </td>
              <td style={{ verticalAlign:"middle" }}>
                <div style={{ fontSize:18, fontWeight:800, letterSpacing:"1.5px", color:"#12132a" }}>STARGRID</div>
                <div style={{ fontSize:9.5, color:"#999", letterSpacing:"0.4px" }}>Industrial Connectivity Solutions</div>
              </td>
            </tr></tbody></table>
            <div style={{ marginTop:5 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"#333" }}>{today}</div>
              <div style={{ fontSize:10, color:"#bbb", marginTop:1 }}>Ref: {refId}</div>
            </div>
          </td>

          {/* T&C box — only on page 1 */}
          {withTc && (
            <td style={{ verticalAlign:"top", width:"62%" }}>
              <div style={{ border:"1px solid #d1e0fe", borderLeft:"3px solid #3D72FC", background:"#f0f5ff", borderRadius:"0 7px 7px 0", padding:"7px 11px" }}>
                <div style={{ fontSize:9.5, fontWeight:700, color:"#1e3a8a", marginBottom:4, lineHeight:1.4 }}>
                  Terms &amp; Conditions — This proposal is governed by the StarGrid Standard Agreement. Key terms:
                </div>
                <ul style={{ margin:0, padding:"0 0 0 13px", listStyle:"disc" }}>
                  {[
                    "All prices are in EUR and exclude applicable VAT/taxes.",
                    `This offer is valid for 30 days from the date of issue.`,
                    "Setup fees are one-time charges payable upon contract signing.",
                    "Monthly fees are billed in advance on the 1st of each month.",
                    "All commercial data are valid upon personal approval by StarGrid.",
                  ].map((t,i)=>(
                    <li key={i} style={{ fontSize:9.5, color:"#374151", lineHeight:1.5 }}>{t}</li>
                  ))}
                </ul>
              </div>
            </td>
          )}
        </tr></tbody>
      </table>
      <GradBar mt={10} mb={0} />
    </div>
  );
}

function PageFooter({ today, refId, tier }) {
  return (
    <div>
      <GradBar mt={14} mb={6} />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <tbody><tr>
          <td style={{ verticalAlign:"top", fontSize:10, color:"#bbb" }}>
            <div style={{ fontWeight:700, color:"#555", fontSize:11 }}>StarGrid Europe BV</div>
            <div>Zeestraat 70, 2318 AG The Hague, Netherlands</div>
            <div>al@cellsat.one · www.stargrid.one</div>
          </td>
          <td style={{ verticalAlign:"top", textAlign:"right", fontSize:10, color:"#bbb" }}>
            <div>Prepared {today}</div>
            <div>Reference: {refId}</div>
            {tier && <div style={{ fontWeight:700, color:BLUE }}>{tier}</div>}
            <div>Confidential — For intended recipient only</div>
          </td>
        </tr></tbody>
      </table>
    </div>
  );
}

function BomTable({ rows, emptyMsg }) {
  if (!rows.length) return <p style={{ fontStyle:"italic", fontSize:11, color:"#777", margin:"4px 0" }}>{emptyMsg}</p>;
  return (
    <table style={{ width:"100%", borderCollapse:"collapse" }}>
      <thead><tr>
        {["Site","Component","Hardware","Airtime Plan","Setup (€)","Monthly (€)"].map((h,i)=>(
          <th key={i} style={i>=4 ? thR : thBase}>{h}</th>
        ))}
      </tr></thead>
      <tbody>
        {rows.map((c,i)=>(
          <tr key={i}>
            <td style={tdBase}><span style={badgeS}>Site {c.siteNum}</span></td>
            <td style={tdBase}><span style={{...dotS, background:c.color}}/>{c.type}</td>
            <td style={tdBase}>{c.hardware||"—"}</td>
            <td style={tdBase}>{c.airtime||"—"}</td>
            <td style={tdR}>{formatEuro(c.network_setup_fee)}</td>
            <td style={tdR}>{formatEuro(c.network_monthly_fee)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ── PDF builder — renders TWO separate hidden divs, one per logical page ─── */
/*    This guarantees page-1 is always exactly one PDF page                    */
async function buildPdf(page1El, annexEl) {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF }   = await import("jspdf");

  const SCALE = 2;
  const PW = 210, PH = 297, M = 10;
  const CW = PW - M*2, CH = PH - M*2;

  const pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
  let pageNum = 0;

  async function appendElement(el) {
    const canvas = await html2canvas(el, {
      backgroundColor:"#ffffff",
      scale: SCALE,
      useCORS: true,
      logging: false,
      windowWidth: el.offsetWidth,
      width: el.offsetWidth,
    });

    const imgAspect  = canvas.height / canvas.width;
    const scaledH    = CW * imgAspect;
    const totalPages = Math.ceil(scaledH / CH);

    for (let p = 0; p < totalPages; p++) {
      if (pageNum > 0) pdf.addPage();
      pageNum++;

      const srcY       = (p * CH / scaledH) * canvas.height;
      const sliceH     = (CH / scaledH) * canvas.height;
      const isLast     = p === totalPages - 1;
      const actualSrcH  = isLast ? canvas.height - srcY : sliceH;
      const actualDestH = isLast ? (actualSrcH / canvas.height) * scaledH : CH;

      const pc = document.createElement("canvas");
      pc.width  = canvas.width;
      pc.height = Math.ceil(actualSrcH);
      const ctx = pc.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pc.width, pc.height);
      ctx.drawImage(canvas, 0, srcY, canvas.width, actualSrcH, 0, 0, canvas.width, actualSrcH);

      pdf.addImage(pc.toDataURL("image/jpeg", 0.85), "JPEG", M, M, CW, actualDestH);
      pdf.setFontSize(8);
      pdf.setTextColor(180,180,180);
      pdf.text("StarGrid — Confidential", M, PH-5);
    }
  }

  await appendElement(page1El);
  await appendElement(annexEl);

  return pdf;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                             */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function PdfOfferPage() {
  const router = useRouter();
  const [data, setData]             = useState(null);
  const [sites, setSites]           = useState([]);
  const [contact, setContact]       = useState({});
  const [isOperator, setIsOperator] = useState(false);
  const [msServiceTier, setMsServiceTier] = useState("care");
  const [loading, setLoading]       = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated]   = useState(false);
  const [sending, setSending]       = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  /* Two separate refs — one for page 1, one for annex */
  const page1Ref = useRef(null);
  const annexRef = useRef(null);

  useEffect(() => {
    const storedContact  = JSON.parse(localStorage.getItem("questionnaire_contact") || "{}");
    const storedOperator = JSON.parse(localStorage.getItem("isNetworkOperator") || "false");
    const storedTier     = localStorage.getItem("msServiceTier") || "care";
    setContact(storedContact);
    setIsOperator(storedOperator);
    setMsServiceTier(storedTier);

    (async () => {
      const allSites = getAllSites();
      if (!allSites.length) { setLoading(false); return; }
      setSites(allSites);
      try { setData(await getRecommendations(allSites)); }
      catch(e) { console.error(e); }
      finally   { setLoading(false); }
    })();
  }, []);

  /* Derived values — computed only when data is ready */
  const derived = (() => {
    if (!data) return null;
    const { sitePackages, allTotals, totalSites } = data;

    const pocSetupFee = isOperator ? 11500 : 2900;
    const pocLabel    = isOperator ? "Network Operator PoC" : "Enterprise PoC";

// Managed service tier table
const MS_TIERS = [
  { max: 10,   assist: 0.08, care: 0.20 },
  { max: 50,   assist: 0.07, care: 0.16 },
  { max: 100,  assist: 0.06, care: 0.14 },
  { max: 500,  assist: 0.05, care: 0.12 },
  { max: 1000, assist: 0.04, care: 0.10 },
];

const msRate = (() => {
  const row =
    MS_TIERS.find(t => totalSites <= t.max) ||
    MS_TIERS[MS_TIERS.length - 1];

  return row[msServiceTier] ?? row.care;
})();
    const compMsSvc = c => /router|stargrid\s*box/i.test(c.type)
      ? c.network_setup_fee * msRate : c.managed_service_monthly;

    const EH_SETUP   = 1149;
    const EH_MONTHLY = 33;
    const ehMs       = EH_SETUP * msRate;


        // Core hardcoded component (single core node for all sites)
    const CORE_SETUP = 0;
    const CORE_MONTHLY = isOperator ? 490 : 33;
    const coreManagedSvc = CORE_MONTHLY * 0.20;

    const totalBillMs  = sitePackages.reduce((s,sp)=>s+sp.package.components.filter(c=>/router|stargrid\s*box/i.test(c.type)).reduce((a,c)=>a+c.network_setup_fee*msRate,0),0);
    const rSvc1        = sitePackages.reduce((s,sp)=>s+sp.package.components.filter(c=>/router|stargrid\s*box/i.test(c.type)).reduce((a,c)=>a+c.network_setup_fee*msRate,0),0);
    const rSvc2        = sitePackages.reduce((s,sp)=>s+sp.package.components.filter(c=>/router|stargrid\s*box/i.test(c.type)).reduce((a,c)=>a+c.network_monthly_fee,0),0);
    const rSvc3        = sitePackages.reduce((s,sp)=>s+sp.package.components.filter(c=>/router|stargrid\s*box/i.test(c.type)).reduce((a,c)=>a+c.managed_service_monthly,0),0);

    const adjSetup    = allTotals.network_setup_fee + EH_SETUP;
    const adjMonthly  = allTotals.network_monthly_fee + EH_MONTHLY;
    const adjMs       = totalBillMs + ehMs;
    const adjContract = adjSetup + (adjMonthly + adjMs) * allTotals.contract_months;

    let cellularCount=0, satelliteCount=0, fixedCount=0;
    sitePackages.forEach((sp,idx)=>{
      const ans=(sites[idx]||{}).answers||{};
      [ans[11],ans[12]].forEach(conn=>{
        const v=(getLabel(conn)||"").toLowerCase();
        if(v.includes("cellu")||v.includes("lte")||v.includes("4g")||v.includes("5g")) cellularCount++;
        else if(v.includes("sat")||v.includes("leo")||v.includes("geo")) satelliteCount++;
        else if(v!=="—"&&!v.includes("none")) fixedCount++;
      });
    });

    const serviceTypes=[...new Set(sitePackages.map(sp=>sp.package.servicesLabel).filter(Boolean))].join(" / ")||"—";

    const bom={cellular:[],satellite:[],boxes:[],managed:[]};
    sitePackages.forEach(sp=>{
      sp.package.components.forEach(c=>{
        const t=(c.type||"").toLowerCase(), h=(c.hardware||"").toLowerCase();
        const entry={...c,siteNum:sp.site_number};
        if(t.includes("cellu")||t.includes("lte")||t.includes("4g")||t.includes("5g")||h.includes("lte")||h.includes("cellular")) bom.cellular.push(entry);
        else if(t.includes("sat")||t.includes("leo")||t.includes("geo")||t.includes("starlink")||t.includes("iridium")||t.includes("skylo")||t.includes("viasat")||t.includes("oneweb")||h.includes("satell")) bom.satellite.push(entry);
        else bom.boxes.push(entry);
      });
      if(sp.package.totals.managed_service_monthly>0)
        bom.managed.push({siteNum:sp.site_number,label:sp.package.servicesLabel||"Managed Service",fee:sp.package.totals.managed_service_monthly});
    });

    return { sitePackages, allTotals, totalSites, pocSetupFee, pocLabel, msRate, compMsSvc,
             EH_SETUP, EH_MONTHLY, ehMs, rSvc1, rSvc2, rSvc3, CORE_SETUP, CORE_MONTHLY, coreManagedSvc,
             adjSetup, adjMonthly, adjMs, adjContract,
             cellularCount, satelliteCount, fixedCount, serviceTypes, bom };
  })();

  const today = new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});
  const refId = `SG-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  /* ── PDF actions ── */
  const getPdf = async () => {
    const p1 = page1Ref.current, ax = annexRef.current;
    if (!p1 || !ax) return null;
    return buildPdf(p1, ax);
  };

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const pdf = await getPdf();
      if (pdf) { pdf.save("StarGrid-Connectivity-Offer.pdf"); setGenerated(true); }
    } catch(e) {
      console.error(e);
      alert("PDF generation requires html2canvas & jspdf.\nnpm install html2canvas jspdf");
    } finally { setGenerating(false); }
  };

  const handleSendEmail = async () => {
    setSending(true); setSendStatus(null);
    try {
      const pdf = await getPdf();
      if (!pdf) { setSendStatus("err"); return; }
      const pdfBase64 = pdf.output("datauristring").split(",")[1];

      const contractValue = derived?.allTotals
        ? new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR",maximumFractionDigits:0})
            .format(derived.allTotals.contract_value)
        : null;

      const res = await fetch("/api/send-proposal",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          pdfBase64, companyName:contact.companyName||"",
          contactName:contact.fullName||"", contactEmail:contact.email||"",
          refId, date:today,
          totalSites: derived?.totalSites,
          contractValue,
        }),
      });
      const result = await res.json();
      setSendStatus(result.success ? "ok" : "err");
      if (!result.success) console.error(result.error);
    } catch(e) { console.error(e); setSendStatus("err"); }
    finally { setSending(false); }
  };

  /* ── Loading / empty states ── */
  if (loading) return (
    <div style={centerStyle}>
      <div style={spinnerStyle}/>
      <p style={{color:"#666",marginTop:16}}>Preparing offer document…</p>
      <style jsx>{`@keyframes sp{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
  if (!data||!derived||data.sitePackages.length===0) return (
    <div style={centerStyle}>
      <h2 style={{color:"#333",fontSize:24}}>No Site Data Found</h2>
      <p style={{color:"#888"}}>Complete the questionnaire to generate an offer.</p>
      <button onClick={()=>router.push("/questionnaire")} style={primaryBtnStyle}>Start Questionnaire →</button>
    </div>
  );

  const {
    sitePackages, allTotals, totalSites,
    pocSetupFee, pocLabel, compMsSvc,
    EH_SETUP, EH_MONTHLY, ehMs, CORE_SETUP, CORE_MONTHLY, coreManagedSvc,
    rSvc1, rSvc2, rSvc3,
    adjSetup, adjMonthly, adjMs, adjContract,
    cellularCount, satelliteCount, fixedCount, serviceTypes, bom,
  } = derived;

  /* ── paper styles shared by both sections ── */
  const paperStyle = {
    width: 820,
    background:"#ffffff",
    fontFamily: FONT,
    color:"#1e1e2e",
    fontSize:12,
    lineHeight:1.45,
    boxSizing:"border-box",
    padding:"32px 48px",
  };

  /* ── Overview table row helper ── */
  const ORow = ({label, val, valColor="#333", i}) => (
    <tr>
      <td style={{...(i%2?tdEven:tdBase), fontWeight:600, color:"#444"}}>{label}</td>
      <td style={{...(i%2?tdEvenR:tdR), fontWeight:700, color:valColor, textTransform:"capitalize"}}>{val}</td>
    </tr>
  );

  return (
    <div style={{minHeight:"100vh",background:"#e8ecf1"}}>

      {/* ── Toolbar ── */}
      <div style={{position:"sticky",top:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 24px",background:"#fff",borderBottom:"1px solid #ddd",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}} className="no-print">
        <button onClick={()=>router.push("/questionnaire/results")} style={{padding:"9px 18px",background:"#f5f5f5",border:"1px solid #ddd",borderRadius:8,color:"#444",fontSize:14,fontWeight:500,cursor:"pointer"}}>
          ← Back to Results
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {generating&&<span style={{fontSize:13,color:"#999"}}>Generating PDF…</span>}
          {sending&&<span style={{fontSize:13,color:"#999"}}>Sending email…</span>}
          {generated&&<span style={{fontSize:13,color:"#22c55e",fontWeight:600}}>✓ PDF Downloaded</span>}
          {sendStatus==="ok"&&<span style={{fontSize:13,color:"#22c55e",fontWeight:600}}>✓ Email Sent</span>}
          {sendStatus==="err"&&<span style={{fontSize:13,color:"#ef4444",fontWeight:600}}>✗ Send Failed</span>}
          <button onClick={handleSendEmail} disabled={sending||generating}
            style={{padding:"11px 22px",background:"linear-gradient(135deg,#12b981,#059669)",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",opacity:(sending||generating)?0.55:1}}>
            {sending?"Sending…":"✉ Send via Email"}
          </button>
          <button onClick={handleDownload} disabled={generating}
            style={{padding:"11px 26px",background:"linear-gradient(135deg,#3D72FC,#5CB0E9)",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",opacity:generating?0.55:1}}>
            {generating?"Generating…":"↓ Download PDF"}
          </button>
          <button onClick={()=>window.print()}
            style={{padding:"9px 18px",background:"#f5f5f5",border:"1px solid #ddd",borderRadius:8,color:"#444",fontSize:14,cursor:"pointer"}}>
            Print
          </button>
        </div>
      </div>

      {/* ── Visual wrapper (screen preview) ── */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"36px 16px 72px",gap:32}}>

        {/* ════════════════════════════════════════════════════════════════
            SECTION A — PAGE 1  (ref: page1Ref)
            Everything before the annex, captured as exactly 1 PDF page
        ════════════════════════════════════════════════════════════════ */}
        <div ref={page1Ref} style={{...paperStyle, boxShadow:"0 1px 3px rgba(0,0,0,0.08),0 8px 40px rgba(0,0,0,0.06)", borderRadius:3}}>

          <PageHeader today={today} refId={refId} withTc />

          <h1 style={{fontSize:20,fontWeight:700,color:"#12132a",margin:"10px 0 2px"}}>Connectivity Plan &amp; Proposal</h1>
          <p style={{fontSize:11.5,color:"#777",margin:"0 0 2px"}}>
            {totalSites} Site{totalSites!==1?"s":""} — Personalised Plan{contact.companyName?` for ${contact.companyName}`:""}
          </p>

          {/* 1. Introduction */}
          <div style={{marginTop:10}}>
            <div style={secTitleStyle}>1. Introduction</div>
            <p style={{fontSize:11,color:"#555",lineHeight:1.5,margin:0}}>
              StarGrid delivers fully managed hybrid connectivity solutions combining cellular (4G/5G),
              satellite (LEO/GEO), and fixed-line networks into a single intelligent platform. Our edge
              devices automatically select the optimal available network, guaranteeing zero-touch,
              always-on connectivity for industrial, offshore, and remote operations worldwide.
            </p>
          </div>

          {/* 2 + 3 — side by side via TABLE */}
          <table style={{width:"100%",borderCollapse:"collapse",marginTop:10}}>
            <tbody><tr>
              {/* Client Use Case */}
              <td style={{verticalAlign:"top",width:"46%",paddingRight:14}}>
                {contact.additionalNotes ? (
                  <div>
                    <div style={secTitleStyle}>2. Client Use Case</div>
                    {contact.fullName&&(
                      <div style={{fontSize:10.5,color:"#888",marginBottom:5,lineHeight:1.5}}>
                        <strong>{contact.fullName}</strong>
                        {contact.jobTitle&&<span> · {contact.jobTitle}</span>}
                        {contact.email&&<><br/><span>{contact.email}</span></>}
                        {contact.phone&&<span> · {contact.phone}</span>}
                      </div>
                    )}
                    <div style={{position:"relative",padding:"9px 12px 9px 34px",background:"#f8f9ff",border:"1px solid #dce4fd",borderLeft:"4px solid #3D72FC",borderRadius:"0 9px 9px 0"}}>
                      <span style={{position:"absolute",left:9,top:5,fontSize:22,color:"#c7d4fd",fontFamily:"Georgia,serif",lineHeight:1}}>"</span>
                      <p style={{margin:0,fontSize:11,color:"#444",lineHeight:1.55,fontStyle:"italic"}}>{contact.additionalNotes}</p>
                    </div>
                  </div>
                ) : <div style={{height:4}}/>}
              </td>

              {/* StarGrid Solution */}
              <td style={{verticalAlign:"top",width:"54%"}}>
                <div style={secTitleStyle}>{contact.additionalNotes?"3.":"2."} StarGrid Solution</div>
                <table style={{width:"100%",borderCollapse:"collapse",border:"1px solid #e4e6ec",borderRadius:8,overflow:"hidden"}}>
                  <tbody>
                    {[
                      ["Sites Configured",    totalSites,         "#333"],
                      ["Central Enterprise Hub","1 × Large",      "#2ECC71"],
                      ["Cellular Connections", cellularCount||"—","#333"],
                      ["Satellite Connections",satelliteCount||"—","#333"],
                      ...(fixedCount>0?[["Fixed / Other",fixedCount,"#333"]]:[]),
                      ["Managed Service",      serviceTypes,      BLUE],
                      ["Service Tier",         msServiceTier,     BLUE],
                    ].map(([label,val,col],i)=>(
                      <ORow key={i} label={label} val={val} valColor={col} i={i}/>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr></tbody>
          </table>

          {/* Offering — PoC + Full Deployment side by side via TABLE */}
          <div style={{marginTop:10}}>
            <div style={secTitleStyle}>{contact.additionalNotes?"4.":"3."} Offering</div>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <tbody><tr>

                {/* PoC */}
                <td style={{verticalAlign:"top",width:"34%",paddingRight:12}}>
                  <div style={{border:"2px solid #3D72FC",borderRadius:10,padding:"10px 12px",background:"#f8f9ff",height:"100%",boxSizing:"border-box"}}>
                    <div style={{display:"inline-block",padding:"2px 9px",marginBottom:7,background:"linear-gradient(135deg,#3D72FC,#5CB0E9)",color:"#fff",borderRadius:18,fontSize:9.5,fontWeight:700}}>
                      {pocLabel}
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:"#12132a",margin:"0 0 3px"}}>Proof of Concept</div>
                    <p style={{fontSize:11,color:"#777",margin:"0 0 7px"}}>
                      Validate on {Math.min(2,totalSites)} site{Math.min(2,totalSites)!==1?"s":""} before full rollout.
                    </p>
                    <table style={{width:"100%",borderCollapse:"collapse",border:"1px solid #e4e6ec",borderRadius:7,overflow:"hidden"}}>
                      <thead><tr>
                        <th style={{...thBase,fontSize:9,padding:"5px 8px"}}>Fee Item</th>
                        <th style={{...thR,  fontSize:9,padding:"5px 8px"}}>Amount</th>
                      </tr></thead>
                      <tbody>
                        {[["Network Setup",pocSetupFee],["Monthly Connectivity",0],["Monthly Managed Svc",0]].map(([l,v],i)=>(
                          <tr key={i}>
                            <td style={{...(i%2?tdEven:tdBase),fontSize:11,padding:"5px 8px"}}>{l}</td>
                            <td style={{...(i%2?tdEvenR:tdR),fontWeight:700,fontSize:11,padding:"5px 8px"}}>{formatEuro(v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p style={{marginTop:7,fontSize:10,color:"#777",fontStyle:"italic"}}>
                      {isOperator?"Network Operator pricing applies.":"Enterprise pricing. Includes hardware, installation, 30-day SLA."}
                    </p>
                  </div>
                </td>

                {/* Full Deployment */}
                <td style={{verticalAlign:"top",width:"66%"}}>
                  <div style={{border:"2px solid #22c55e",borderRadius:10,padding:"10px 12px",background:"#f6fff9",boxSizing:"border-box"}}>
                    <div style={{display:"inline-block",padding:"2px 9px",marginBottom:7,background:"linear-gradient(135deg,#16a34a,#22c55e)",color:"#fff",borderRadius:18,fontSize:9.5,fontWeight:700}}>
                      Full Deployment
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:"#12132a",margin:"0 0 3px"}}>All {totalSites} Site{totalSites!==1?"s":""}</div>
                    <p style={{fontSize:11,color:"#777",margin:"0 0 7px"}}>Complete rollout with full managed service coverage.</p>
                    <table style={{width:"100%",borderCollapse:"collapse",border:"1px solid #e4e6ec",borderRadius:7,overflow:"hidden"}}>
                      <thead><tr>
                        <th style={{...thBase,fontSize:9,padding:"5px 8px",width:"37%"}}>Fee Items</th>
                        <th style={{...thR,  fontSize:9,padding:"5px 8px",width:"31.5%"}}>StarGrid &amp; Connectivity</th>
                        <th style={{...thR,  fontSize:9,padding:"5px 8px",width:"31.5%"}}>StarGrid Only</th>
                      </tr></thead>
                      <tbody>
                        {[
                          ["Total Network Setup",           adjSetup,   rSvc1, true],
                          ["Total Monthly Connectivity",    adjMonthly, rSvc2, false],
                          ["Total Monthly Managed Service", adjMs,      rSvc3, true],
                        ].map(([label,v1,v2,even],i)=>(
                          <tr key={i}>
                            <td style={{...(even?tdEven:tdBase),fontSize:11,padding:"5px 8px"}}>{label}</td>
                            <td style={{...(even?tdEvenR:tdR),fontWeight:700,fontSize:11,padding:"5px 8px"}}>{formatEuro(v1)}</td>
                            <td style={{...(even?tdEvenR:tdR),fontWeight:700,fontSize:11,padding:"5px 8px"}}>{formatEuro(v2)}</td>
                          </tr>
                        ))}
                        {/* Contract value row */}
                        <tr>
                          <td style={{...tdBase,fontSize:11,padding:"5px 8px",borderTop:"2px solid #3D72FC",borderBottom:"none"}}>
                            <strong>Total Contract Value</strong>
                            <small style={{fontSize:9.5,color:"#aaa",fontWeight:"normal",marginLeft:3}}>/ {allTotals.contract_months} mo</small>
                          </td>
                          <td style={{...tdR,fontSize:12.5,color:BLUE,fontWeight:800,padding:"5px 8px",borderTop:"2px solid #3D72FC",borderBottom:"none"}}>{formatEuro(adjContract)}</td>
                          <td style={{...tdR,fontSize:12.5,color:BLUE,fontWeight:800,padding:"5px 8px",borderTop:"2px solid #3D72FC",borderBottom:"none"}}>{formatEuro(rSvc1+rSvc2+rSvc3)}</td>
                        </tr>
                      </tbody>
                    </table>
                    {allTotals.setup_discount_pct>0&&(
                      <p style={{fontSize:10,color:"#888",marginTop:5,fontStyle:"italic"}}>* {(allTotals.setup_discount_pct*100).toFixed(0)}% bulk discount applied.</p>
                    )}
                  </div>
                </td>

              </tr></tbody>
            </table>
          </div>

          <PageFooter today={today} refId={refId} />
        </div>


        {/* ════════════════════════════════════════════════════════════════
            SECTION B — ANNEX  (ref: annexRef)
            Captured separately → appended after page 1 in PDF
        ════════════════════════════════════════════════════════════════ */}
        <div ref={annexRef} style={{...paperStyle, boxShadow:"0 1px 3px rgba(0,0,0,0.08),0 8px 40px rgba(0,0,0,0.06)", borderRadius:3}}>

          <PageHeader today={today} refId={refId} withTc={false} />

          <h1 style={{fontSize:20,fontWeight:700,color:"#12132a",margin:"10px 0 2px"}}>Annex: Connectivity Plan &amp; Proposal</h1>
          <p style={{fontSize:11.5,color:"#777",margin:"0 0 4px"}}>Technical &amp; Financial Breakdown — {totalSites} Site{totalSites!==1?"s":""}</p>

          {/* Annex 1 */}
          <div style={{marginTop:14}}>
            <div style={secTitleStyle}>1. Connectivity Solution Offer</div>
            <p style={{fontSize:11,color:"#777",margin:"0 0 10px"}}>Full overview of financial details per site — setup costs, monthly network fees, and StarGrid Managed Service fee.</p>

            {/* Enterprise Hub */}
            <div style={{marginBottom:18,border:"1px solid #a7f3c0",borderRadius:10,overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:"#f0fdf5",borderBottom:"1px solid #a7f3c0"}}>
                <span style={{display:"inline-block",padding:"3px 10px",borderRadius:14,background:"linear-gradient(135deg,#2ECC71,#1aad5e)",color:"#fff",fontSize:10.5,fontWeight:700,whiteSpace:"nowrap"}}>Central Hub</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#12132a"}}>Enterprise Hub</div>
                  <div style={{fontSize:10.5,color:"#777"}}>Central connectivity node — all {totalSites} site{totalSites!==1?"s":""} connected</div>
                </div>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>
                  {["Component","Hardware","Airtime Plan","Setup Fee","Monthly Fee","Managed Svc"].map((h,i)=>(
                    <th key={i} style={i>=3?thR:thBase}>{h}</th>
                  ))}
                </tr></thead>
                <tbody><tr>
                  <td style={tdBase}><span style={{...dotS,background:"#2ECC71"}}/>Enterprise Hub</td>
                  <td style={tdBase}>Large</td><td style={tdBase}>—</td>
                  <td style={tdR}>{formatEuro(EH_SETUP)}</td>
                  <td style={tdR}>{formatEuro(EH_MONTHLY)}</td>
                  <td style={tdR}>{formatEuro(ehMs)}</td>
                </tr></tbody>
                <tfoot><tr style={{background:"#f0fdf5"}}>
                  <td colSpan={3} style={{...tdBase,borderTop:"2px solid #2ECC71",borderBottom:"none"}}><strong>Enterprise Hub Total</strong></td>
                  {[EH_SETUP,EH_MONTHLY,ehMs].map((v,i)=>(
                    <td key={i} style={{...tdR,borderTop:"2px solid #2ECC71",borderBottom:"none"}}><strong>{formatEuro(v)}</strong></td>
                  ))}
                </tr></tfoot>
              </table>
            </div>




                        {/* Core Hub */}
            <div style={{marginBottom:18,border:"1px solid #a7f3c0",borderRadius:10,overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:"#f0fdf5",borderBottom:"1px solid #a7f3c0"}}>
                <span style={{display:"inline-block",padding:"3px 10px",borderRadius:14,background:"linear-gradient(135deg,#2ECC71,#1aad5e)",color:"#fff",fontSize:10.5,fontWeight:700,whiteSpace:"nowrap"}}>Core Hub</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#12132a"}}>Core</div>
                  <div style={{fontSize:10.5,color:"#777"}}>Central connectivity node — all {totalSites} site{totalSites!==1?"s":""} connected</div>
                </div>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>
                  {["Component","Hardware","Airtime Plan","Setup Fee","Monthly Fee","Managed Svc"].map((h,i)=>(
                    <th key={i} style={i>=3?thR:thBase}>{h}</th>
                  ))}
                </tr></thead>
                <tbody><tr>
                  <td style={tdBase}><span style={{...dotS,background:"#2ECC71"}}/>Core</td>
                  <td style={tdBase}>Large</td><td style={tdBase}>—</td>
                  <td style={tdR}>{formatEuro(CORE_SETUP)}</td>
                  <td style={tdR}>{formatEuro(CORE_MONTHLY)}</td>
                  <td style={tdR}>{formatEuro(coreManagedSvc)}</td>
                </tr></tbody>
                <tfoot><tr style={{background:"#f0fdf5"}}>
                  <td colSpan={3} style={{...tdBase,borderTop:"2px solid #2ECC71",borderBottom:"none"}}><strong>Core Hub Total</strong></td>
                  {[CORE_SETUP,CORE_MONTHLY,coreManagedSvc].map((v,i)=>(
                    <td key={i} style={{...tdR,borderTop:"2px solid #2ECC71",borderBottom:"none"}}><strong>{formatEuro(v)}</strong></td>
                  ))}
                </tr></tfoot>
              </table>
            </div>

            {/* Per-site */}
            {sitePackages.map((sp,idx)=>{
              const {site_number,package:pkg}=sp;
              const site     = sites[idx]||{};
              const siteType = site?.answers?.[22]?.label||"Fixed Site";
              const siteName = site?.name||sp.site_name;
              const siteMsSvc= pkg.components.reduce((s,c)=>s+compMsSvc(c),0);
              return (
                <div key={sp.site_id||idx} style={{marginBottom:16,border:"1px solid #e4e6ec",borderRadius:10,overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:"#f7f8fc",borderBottom:"1px solid #e4e6ec"}}>
                    <span style={{display:"inline-block",padding:"3px 10px",borderRadius:14,background:"linear-gradient(135deg,#3D72FC,#5CB0E9)",color:"#fff",fontSize:10.5,fontWeight:700,whiteSpace:"nowrap"}}>Site {site_number}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"#12132a"}}>{siteName}</div>
                      <div style={{fontSize:10.5,color:"#777"}}>{siteType} — {pkg.servicesLabel}</div>
                      {site?.location?.address&&<div style={{fontSize:10,color:"#aaa"}}>{site.location.address}</div>}
                    </div>
                  </div>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead><tr>
                      {["Component","Hardware","Airtime Plan","Setup Fee","Monthly Fee","Managed Svc"].map((h,i)=>(
                        <th key={i} style={i>=3?thR:thBase}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {pkg.components.map((c,ci)=>(
                        <tr key={ci}>
                          <td style={tdBase}><span style={{...dotS,background:c.color}}/>{c.type}</td>
                          <td style={tdBase}>{c.hardware}</td>
                          <td style={tdBase}>{c.airtime}</td>
                          <td style={tdR}>{formatEuro(c.network_setup_fee)}</td>
                          <td style={tdR}>{formatEuro(c.network_monthly_fee)}</td>
                          <td style={tdR}>{formatEuro(compMsSvc(c))}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot><tr style={{background:"#eef2ff"}}>
                      <td colSpan={3} style={{...tdBase,borderTop:"2px solid #3D72FC",borderBottom:"none"}}><strong>Site {site_number} Subtotal</strong></td>
                      {[pkg.totals.network_setup_fee,pkg.totals.network_monthly_fee,siteMsSvc].map((v,i)=>(
                        <td key={i} style={{...tdR,borderTop:"2px solid #3D72FC",borderBottom:"none"}}><strong>{formatEuro(v)}</strong></td>
                      ))}
                    </tr></tfoot>
                  </table>
                </div>
              );
            })}

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 18px",background:"linear-gradient(135deg,#eef2ff,#e8edff)",border:"2px solid #3D72FC",borderRadius:10,marginTop:6}}>
              <span style={{fontSize:12.5,fontWeight:700,color:"#12132a"}}>Total Contract Value ({allTotals.contract_months} months)</span>
              <span style={{fontSize:17,color:BLUE,fontWeight:800,fontVariantNumeric:"tabular-nums"}}>{formatEuro(adjContract)}</span>
            </div>
          </div>

          {/* Annex 2 — BOM */}
          <div style={{marginTop:18}}>
            <div style={secTitleStyle}>2. Bill of Materials</div>
            <p style={{fontSize:11,color:"#777",margin:"0 0 10px"}}>Full list of components purchased across all sites.</p>
            {[
              {color:"#3D72FC",label:"Cellular Components",       rows:bom.cellular,  empty:"No cellular components in this configuration."},
              {color:"#5CB0E9",label:"Satellite Components",      rows:bom.satellite, empty:"No satellite components in this configuration."},
              ...(bom.boxes.length>0?[{color:"#6669D8",label:"StarGrid Boxes & Other Components",rows:bom.boxes,empty:""}]:[]),
            ].map(({color,label,rows,empty},gi)=>(
              <div key={gi} style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:9,fontSize:12,fontWeight:700,color:"#12132a",marginBottom:7,paddingBottom:4,borderBottom:"1px solid #e4e6ec"}}>
                  <span style={{display:"inline-block",width:9,height:9,borderRadius:"50%",background:color,flexShrink:0}}/>
                  {label}
                </div>
                <BomTable rows={rows} emptyMsg={empty}/>
              </div>
            ))}
            {bom.managed.length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:9,fontSize:12,fontWeight:700,color:"#12132a",marginBottom:7,paddingBottom:4,borderBottom:"1px solid #e4e6ec"}}>
                  <span style={{display:"inline-block",width:9,height:9,borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>
                  Managed Services
                </div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr>
                    <th style={thBase}>Site</th><th style={thBase}>Service Tier</th><th style={thR}>Monthly Fee</th>
                  </tr></thead>
                  <tbody>
                    {bom.managed.map((m,i)=>(
                      <tr key={i}>
                        <td style={tdBase}><span style={badgeS}>Site {m.siteNum}</span></td>
                        <td style={tdBase}>{m.label}</td>
                        <td style={tdR}>{formatEuro(m.fee)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Annex 3 — T&C */}
          <div style={{marginTop:18}}>
            <div style={secTitleStyle}>3. Terms &amp; Conditions</div>
            <p style={{fontSize:11,color:"#777",margin:"0 0 7px"}}>
              This proposal is governed by the <strong>StarGrid Standard Agreement</strong> (available at{" "}
              <span style={{color:BLUE}}>www.stargrid.one/legal</span>). Key terms:
            </p>
            <div style={{background:"#fafbfd",border:"1px solid #eef0f4",borderRadius:9,padding:"11px 16px"}}>
              <ul style={{margin:"0 0 9px",padding:"0 0 0 15px"}}>
                {[
                  "All prices are in EUR and exclude applicable VAT/taxes.",
                  "This offer is valid for 30 days from the date of issue.",
                  "Setup fees are one-time charges payable upon contract signing.",
                  "Monthly fees are billed in advance on the 1st of each month.",
                  "Managed service includes 24/7 monitoring, firmware updates, and SLA-based support.",
                  "Contract duration as stated above; early termination fees may apply per the StarGrid Standard Agreement.",
                  "Hardware remains StarGrid property until full setup fee is received.",
                  "SLA credits apply as defined in the StarGrid Standard Agreement, Section 4.",
                  "All commercial data are valid upon personal approval by StarGrid.",
                ].map((t,i)=><li key={i} style={{fontSize:11,color:"#666",lineHeight:1.7}}>{t}</li>)}
              </ul>
              <div style={{padding:"9px 13px",background:"#fff8f0",border:"1px solid #fde8c8",borderLeft:"3px solid #f59e0b",borderRadius:"0 7px 7px 0",fontSize:10.5,color:"#78350f",lineHeight:1.6}}>
                <strong>Data &amp; Privacy Disclaimer —</strong> We process personal data in accordance with the General Data
                Protection Regulation (GDPR). All data is collected and used solely for legitimate purposes, kept secure,
                and retained only as long as necessary. While we take appropriate measures to ensure data accuracy and
                protection, we cannot guarantee absolute security. Individuals have the right to access, rectify, or erase
                their personal data, as well as other rights as provided under GDPR.
              </div>
            </div>
          </div>

          <PageFooter today={today} refId={refId} tier={isOperator?"Network Operator":"Enterprise"} />
        </div>

      </div>{/* end paper-wrap */}

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; margin: 0 !important; }
        }
      `}</style>
    </div>
  );
}

/* ── static styles ─────────────────────────────────────────────────────────── */
const centerStyle     = { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8ecf1", gap:12 };
const spinnerStyle    = { width:40, height:40, border:"4px solid #ddd", borderTopColor:"#3D72FC", borderRadius:"50%", animation:"sp .8s linear infinite" };
const primaryBtnStyle = { padding:"14px 28px", background:"linear-gradient(135deg,#3D72FC,#5CB0E9)", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:600, cursor:"pointer", marginTop:8 };