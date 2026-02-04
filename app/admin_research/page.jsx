"use client";

import { useState } from "react";

// ══════════════════════════════════════════════════════════════════════
// ADMIN R&D INTERFACE
// All 21 questions visible, change any answer → packages update instantly
// ══════════════════════════════════════════════════════════════════════

const QUESTIONS = [
  { id:1, q:"What is the exact location of the site?", type:"text", hint:"City, Country (e.g., Oslo, Norway)" },
  { id:2, q:"What is the primary use case for this industrial site?", type:"single",
    opts:["Mining Operation","Remote Oil/Gas Well","Smart Farm/Irrigation","Construction Site","Offshore Platform","Utility Substation","Factory/Plant","Emergency Response Unit","Other"] },
  { id:3, q:"How would you describe the physical and security environment of your site?", type:"single-check",
    opts:["Urban location, fenced","Industrial yard, fenced","Extremely remote / unmanned","Harsh environment (dust, salt, vibration)","Offshore"] },
  { id:4, q:"What is the primary purpose of the connection for your site?", type:"single",
    opts:["SCADA / Telemetry data","CCTV / Video surveillance backhaul","VoIP communications","Remote desktop / IT access","Bulk data transfer (plans, logs)","Real-time control and monitoring","Other"] },
  { id:5, q:"What is the estimated average monthly data volume for your site?", type:"single",
    opts:["<1 GB","1–10 GB","10–100 GB","100 GB – 1 TB",">1 TB"] },
  { id:6, q:"What is the average bandwidth requirement for your site?", type:"dual",
    sub:["Downlink","Uplink"], opts:["<10 kbps","10 kbps – 100 kbps","100 kbps – 1 Mbps","1 – 100 Mbps","100 Mbps – 1 Gbps",">1 Gbps"] },
  { id:7, q:"What is the peak bandwidth requirement for your site?", type:"dual",
    sub:["Downlink","Uplink"], opts:["<10 kbps","10 kbps – 100 kbps","100 kbps – 1 Mbps","1 – 100 Mbps","100 Mbps – 1 Gbps",">1 Gbps"] },
  { id:8, q:"Choose the required downtime class for your connectivity operations.", type:"single-desc",
    opts:[{l:"Best effort",d:"Max 36.5 hours / month"},{l:"Business managed",d:"Max 43.8 minutes / month"},{l:"Business critical",d:"Max 4.5 minutes / month"},{l:"Mission / Life-Safety critical",d:"Max 26.3 seconds / month"}] },
  { id:9, q:"Choose the required connection recovery time for your connectivity operations.", type:"single-desc",
    opts:[{l:"Best effort",d:"Max 2 minutes"},{l:"Business managed",d:"Max 10 seconds"},{l:"Business critical",d:"Max 1 second"},{l:"Mission / Life-Safety critical",d:"Max 100 ms"}] },
  { id:10, q:"What is the maximum acceptable latency (delay) for your applications?", type:"single-desc",
    opts:[{l:">500 ms is fine",d:"Suitable for email"},{l:"<200 ms needed",d:"Basic remote control"},{l:"<50 ms essential",d:"Real-time control / VoIP"}] },
  { id:11, q:"Do your applications need constant latency?", type:"boolean" },
  { id:12, q:"What is the preferred PRIMARY connectivity type on your site?", type:"single",
    opts:["Cellular (4G/LTE/5G)","Satellite (GEO, MEO, LEO / Starlink)","Fiber","Fixed Wireless","Other"] },
  { id:13, q:"Do you require a backup or failover connection for load balancing on your site?", type:"multi",
    opts:["No backup needed","Yes – Cellular","Yes – Satellite","Yes – Fiber","Yes – Fixed Wireless"] },
  { id:14, q:"How many individual devices or networks need to be connected at the site?", type:"single",
    opts:["Single machine","Local network < 10 devices","Local network > 10 devices","Multiple segregated networks (OT/IT)","Other"] },
  { id:15, q:"Do you need any specialized industrial protocols or capabilities at the site?", type:"multi",
    opts:["Modbus","PROFINET","IPsec","SD-WAN","Other"] },
  { id:16, q:"What is the primary power source available at the site?", type:"single",
    opts:["Stable grid power","Unreliable grid power","Generator only","Solar / wind hybrid","No power – system must generate its own","Other"] },
  { id:17, q:"If power is unreliable or absent, what is the required system uptime (autonomy) during outages?", type:"single",
    opts:["8 hours","24 hours","7 days"], conditional: (a) => { const v=(a[16]||"").toLowerCase(); return v.includes("unreliable")||v.includes("generator")||v.includes("solar")||v.includes("no power"); } },
  { id:18, q:"What is the Housing (shelter, cabinet, rack) for equipment at your site?", type:"single",
    opts:["Climate-controlled IT room","Outdoor IP-rated cabinet","No infrastructure – needs a full outdoor kit","Other"] },
  { id:19, q:"What is your Ready for Service timeline for this deployment?", type:"single",
    opts:["< 1 month","1–3 months","3–6 months","6–12 months","> 12 months"] },
  { id:20, q:"What is the expected lifetime of this deployment?", type:"single",
    opts:["1–6 months","6–12 months","12–36 months","36–60 months","> 60 months"] },
  { id:21, q:"How important are the following constraints / drivers for this deployment?", type:"scale",
    opts:["Total Cost of Ownership (TCO)","Upfront Cost (Capex)","Operational Costs (Opex)","Deployment Speed","Maximum Reliability"] },

      { id:22, q:"Is your site a fixed site or a moving site/vehicle?", type:"single",
    opts:["Fixed","Moving"] },
];

const ROUTERS = [
  { name:"Core (Balance 1350 EC)",            env:"Indoor / Data Center", throughput:"25 Gbps", power:"Dual DC",    tag:"core" },
  { name:"Enterprise Router Large (Balance 310x)", env:"Indoor / Office",     throughput:"2.5 Gbps", power:"24V PSU",    tag:"large" },
  { name:"Enterprise Router Fix (MAX-BR1-MINI-5G)", env:"Indoor / Office",     throughput:"300 Mbps", power:"PoE/Molex", tag:"mini" },
  { name:"Enterprise Router Mobile (B One 5G)",     env:"Mobile / Vehicle",    throughput:"1 Gbps",   power:"Molex",     tag:"mobile" },
  { name:"Enterprise Router MBX Mini (MAX-MBX-MINI-5G)", env:"Indoor / Outdoor",    throughput:"2.5 Gbps", power:"DC 12-56V", tag:"mbx" },
];

const SATELLITE_PLANS = [
  { name:"Fixed Site Priority 50 GB",    gb:50,   provider:"Starlink", env:"Fixed",    latency:50, sla:99 },
  { name:"Fixed Site Priority 500 GB",   gb:500,  provider:"Starlink", env:"Fixed",    latency:50, sla:99 },
  { name:"Fixed Site Priority 1000 GB",  gb:1000, provider:"Starlink", env:"Fixed",    latency:50, sla:99 },
  { name:"Fixed Site Priority 2000 GB",  gb:2000, provider:"Starlink", env:"Fixed",    latency:50, sla:99 },
  { name:"Fixed Site Priority 6000 GB",  gb:6000, provider:"Starlink", env:"Fixed",    latency:50, sla:99 },
  { name:"Maritime Priority 50 GB",      gb:50,   provider:"Starlink", env:"Maritime", latency:50, sla:99 },
  { name:"Maritime Priority 500 GB",     gb:500,  provider:"Starlink", env:"Maritime", latency:50, sla:99 },
  { name:"Maritime Priority 1000 GB",    gb:1000, provider:"Starlink", env:"Maritime", latency:50, sla:99 },
  { name:"Maritime Priority 5000 GB",    gb:5000, provider:"Starlink", env:"Maritime", latency:50, sla:99 },
  { name:"Mobile Priority 50 GB",        gb:50,   provider:"Starlink", env:"Mobile",   latency:50, sla:99 },
  { name:"Mobile Priority 500 GB",       gb:500,  provider:"Starlink", env:"Mobile",   latency:50, sla:99 },
  { name:"Mobile Priority 1000 GB",      gb:1000, provider:"Starlink", env:"Mobile",   latency:50, sla:99 },
  { name:"GX-100 Optimum 250 GB",        gb:250,  provider:"Viasat",   env:"Global",   latency:250,sla:99 },
  { name:"Iridium Certus 1 GB",          gb:1,    provider:"Iridium",  env:"Maritime", latency:350,sla:99 },
];

const CELLULAR_PLANS = [
  { name:"Connect Pro 1 GB (DE-O2)",   gb:1,  provider:"Telefonica", latency:200 },
  { name:"Connect Pro 3 GB (DE-O2)",   gb:3,  provider:"Telefonica", latency:200 },
  { name:"Connect Pro 5 GB (DE-O2)",   gb:5,  provider:"Telefonica", latency:200 },
  { name:"Connect Pro 10 GB (DE-O2)",  gb:10, provider:"Telefonica", latency:200 },
  { name:"Connect Pro 25 GB (DE-O2)",  gb:25, provider:"Telefonica", latency:200 },
  { name:"Connect Pro 50 GB (DE-O2)",  gb:50, provider:"Telefonica", latency:200 },
  { name:"Connect Pro 1 GB Zone 1",    gb:1,  provider:"Telefonica", latency:200 },
  { name:"Connect Pro 10 GB Zone 1",   gb:10, provider:"Telefonica", latency:200 },
  { name:"Connect Pro 50 GB Zone 1",   gb:50, provider:"Telefonica", latency:200 },
];

function dataGB(answer) {
  if (!answer) return 10;
  if (answer.includes("<1"))   return 0.5;
  if (answer.includes("1–10")) return 5;
  if (answer.includes("10–100")) return 50;
  if (answer.includes("100 GB")) return 500;
  if (answer.includes(">1 TB")) return 2000;
  return 10;
}

function pickRouter(answers) {
  const env   = (answers[3] || "").toLowerCase();
  const house = (answers[18]|| "").toLowerCase();
  const dev   = (answers[14]|| "").toLowerCase();
  if (env.includes("offshore") || env.includes("harsh") || house.includes("outdoor"))
    return ROUTERS.find(r => r.tag === "mbx");
  if (env.includes("remote") || env.includes("unmanned") || house.includes("no infrastructure"))
    return ROUTERS.find(r => r.tag === "mobile");
  if (dev.includes("> 10") || dev.includes("segregated"))
    return ROUTERS.find(r => r.tag === "large");
  return ROUTERS.find(r => r.tag === "mini");
}

function scoreSat(plan, answers) {
  let s = 0;
  const need = dataGB(answers[5]);
  if (plan.gb >= need && plan.gb <= need * 3) s += 50;
  else if (plan.gb >= need)                   s += 30;
  else if (plan.gb >= need * 0.5)             s += 15;
  const env = (answers[3] || "").toLowerCase();
  if (env.includes("offshore") && plan.env === "Maritime") s += 25;
  if (env.includes("remote")   && plan.env === "Mobile")   s += 15;
  if (plan.env === "Fixed")                                s += 5;
  const latAnswer = answers[10] || "";
  if (latAnswer.includes("<50") && plan.latency <= 50)   s += 15;
  if (latAnswer.includes("<200") && plan.latency <= 200) s += 10;
  return s;
}

function scoreCel(plan, answers) {
  let s = 0;
  const need = dataGB(answers[5]);
  if (plan.gb >= need && plan.gb <= need * 3) s += 50;
  else if (plan.gb >= need)                   s += 30;
  else if (plan.gb >= need * 0.5)             s += 15;
  s += 10;
  return s;
}

function buildPackages(answers) {
  const router = pickRouter(answers);
  const primary  = (answers[12] || "").toLowerCase();
  const backups  = Array.isArray(answers[13]) ? answers[13] : (answers[13] ? [answers[13]] : []);
  const backupStr = backups.join(" ").toLowerCase();
  const needSat = primary.includes("satellite") || backupStr.includes("satellite");
  const needCel = primary.includes("cellular")  || backupStr.includes("cellular");

  let satCands = needSat
    ? SATELLITE_PLANS.map(p => ({...p, score: scoreSat(p, answers)})).sort((a,b) => b.score - a.score)
    : [];
  let celCands = needCel
    ? CELLULAR_PLANS.map(p => ({...p, score: scoreCel(p, answers)})).sort((a,b) => b.score - a.score)
    : [];

  const top = (arr) => {
    const out = [];
    const seen = new Set();
    for (const p of arr) {
      if (!seen.has(p.name)) { seen.add(p.name); out.push(p); }
      if (out.length === 2) break;
    }
    return out;
  };
  satCands = top(satCands);
  celCands = top(celCands);

  const count = Math.min(2, Math.max(needSat ? satCands.length : 0, needCel ? celCands.length : 0, 1));
  const packages = [];
  for (let i = 0; i < count; i++) {
    const pkg = { label: i === 0 ? "Package A" : "Package B", router };
    if (needSat && satCands[i]) pkg.satellite = satCands[i];
    if (needCel && celCands[i]) pkg.cellular  = celCands[i];
    if (i === 0 || pkg.satellite || pkg.cellular) packages.push(pkg);
  }
  return packages.length ? packages : [{ label:"Package A", router }];
}

// ══════════════════════════════════════════════════════════════════════
// MAIN ADMIN R&D COMPONENT
// ══════════════════════════════════════════════════════════════════════
export default function AdminResearchInterface() {
  const [answers, setAnswers] = useState({});

  const packages = buildPackages(answers);

  const setAnswer = (qId, val) => setAnswers(p => ({...p, [qId]: val}));

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0e17",color:"#fff",fontFamily:"system-ui, -apple-system, sans-serif"}}>
      <style>{`
        * { box-sizing: border-box; margin:0; padding:0; }
        body { overflow-x: hidden; }
        .scroll-y { overflow-y: auto; }
        .scroll-y::-webkit-scrollbar { width: 8px; }
        .scroll-y::-webkit-scrollbar-track { background: rgba(255,255,255,.04); }
        .scroll-y::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 4px; }
        .scroll-y::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.25); }
      `}</style>

      {/* ─── LEFT: Questions panel ───────────────────────────────── */}
      <div className="scroll-y" style={{flex:"0 0 50%",padding:"40px 28px",background:"linear-gradient(180deg, #0f1419 0%, #0a0e17 100%)",borderRight:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{maxWidth:580,margin:"0 auto"}}>
          <div style={{marginBottom:32}}>
            <h1 style={{fontSize:28,fontWeight:800,marginBottom:8,background:"linear-gradient(135deg,#3D72FC,#5CB0E9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Admin R&D Interface
            </h1>
            <p style={{fontSize:14,color:"rgba(255,255,255,.5)",lineHeight:1.5}}>
              Change any answer below → packages update instantly on the right. Perfect for testing the matching logic and exploring product recommendations.
            </p>
          </div>

          {/* Render all questions */}
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            {QUESTIONS.map(q => {
              // check conditional
              if (q.conditional && !q.conditional(answers)) return null;

              return (
                <QuestionBlock key={q.id} q={q} answer={answers[q.id]} onChange={(v)=>setAnswer(q.id,v)} />
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── RIGHT: Live packages panel ──────────────────────────── */}
      <div className="scroll-y" style={{flex:1,padding:"40px 28px",background:"#0a0e17"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div style={{position:"sticky",top:0,background:"#0a0e17",paddingBottom:24,zIndex:10,borderBottom:"1px solid rgba(255,255,255,.08)",marginBottom:28}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(61,114,252,.12)",border:"1px solid rgba(61,114,252,.3)",borderRadius:20,padding:"6px 14px",marginBottom:12}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#5CB0E9",animation:"pulse 2s infinite"}} />
              <span style={{fontSize:12,fontWeight:700,color:"#5CB0E9",textTransform:"uppercase",letterSpacing:1}}>Live Preview</span>
            </div>
            <h2 style={{fontSize:24,fontWeight:800,marginBottom:6}}>Recommended Packages</h2>
            <p style={{fontSize:13,color:"rgba(255,255,255,.45)"}}>Updates instantly as you change answers</p>
          </div>

          {/* Package cards */}
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {packages.map((pkg, i) => (
              <div key={i} style={{background:i===0?"rgba(61,114,252,.08)":"rgba(255,255,255,.03)",border:`1px solid ${i===0?"rgba(61,114,252,.35)":"rgba(255,255,255,.08)"}`,borderRadius:16,padding:"22px 20px",position:"relative"}}>
                {i===0 && <div style={{position:"absolute",top:-1,right:16,background:"linear-gradient(135deg,#3D72FC,#5CB0E9)",color:"#fff",fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:1,padding:"4px 12px",borderRadius:"0 0 10px 10px"}}>Best Match</div>}
                <h3 style={{fontSize:17,fontWeight:700,marginBottom:16,color:"#fff"}}>{pkg.label}</h3>

                {/* Router */}
                <ProductMini type="Router" color="#3D72FC" name={pkg.router.name} specs={[
                  ["Environment", pkg.router.env],
                  ["Throughput",  pkg.router.throughput],
                  ["Power",       pkg.router.power],
                ]} />

                {/* Satellite */}
                {pkg.satellite && <ProductMini type="Satellite" color="#5CB0E9" name={pkg.satellite.name} specs={[
                  ["Data",     `${pkg.satellite.gb} GB/mo`],
                  ["Provider", pkg.satellite.provider],
                  ["Type",     pkg.satellite.env],
                  ["Latency",  `${pkg.satellite.latency} ms`],
                  ["Score",    `${pkg.satellite.score} pts`],
                ]} />}

                {/* Cellular */}
                {pkg.cellular && <ProductMini type="Cellular" color="#6669D8" name={pkg.cellular.name} specs={[
                  ["Data",     `${pkg.cellular.gb} GB/mo`],
                  ["Provider", pkg.cellular.provider],
                  ["Latency",  `${pkg.cellular.latency} ms`],
                  ["Score",    `${pkg.cellular.score} pts`],
                ]} />}
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div style={{marginTop:28,padding:18,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12}}>
            <h4 style={{fontSize:13,fontWeight:700,marginBottom:8,color:"rgba(255,255,255,.7)"}}>How Matching Works</h4>
            <ul style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.8,paddingLeft:18}}>
              <li><strong>Router</strong>: Q3 (environment) + Q18 (housing) + Q14 (devices) → picks 1 of 4 Stargrid routers</li>
              <li><strong>Satellite/Cellular</strong>: Q12 (primary) + Q13 (backup) → determines which products to include</li>
              <li><strong>Scoring</strong>: Q5 (data volume) + Q10 (latency) + Q3 (environment match) → ranks products</li>
              <li><strong>Max 2 packages</strong>: Package A = best match, Package B = 2nd best alternative</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// QUESTION BLOCK — renders one question with all answer controls
// ══════════════════════════════════════════════════════════════════════
function QuestionBlock({ q, answer, onChange }) {
  return (
    <div style={{background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:"18px 18px 16px"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:14}}>
        <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#3D72FC,#5CB0E9)",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0}}>{q.id}</span>
        <h4 style={{fontSize:14,fontWeight:600,color:"rgba(255,255,255,.9)",lineHeight:1.4,flex:1}}>{q.q}</h4>
      </div>

      {q.type === "text" && (
        <input value={answer||""} onChange={e=>onChange(e.target.value)} placeholder={q.hint||"Enter value…"}
          style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.04)",color:"#fff",fontSize:14,outline:"none"}} />
      )}

      {q.type === "single" && (
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {q.opts.map(o => {
            const sel = answer === o;
            return (
              <button key={o} onClick={()=>onChange(o)}
                style={{textAlign:"left",padding:"10px 12px",borderRadius:8,border:`1px solid ${sel?"#3D72FC":"rgba(255,255,255,.1)"}`,background:sel?"rgba(61,114,252,.15)":"rgba(255,255,255,.03)",color:"#fff",fontSize:13,cursor:"pointer",transition:"all .15s"}}>
                {o}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "single-check" && (
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {q.opts.map(o => {
            const sel = answer?.option === o;
            return (
              <button key={o} onClick={()=>onChange({option:o, theft:answer?.theft||false})}
                style={{textAlign:"left",padding:"10px 12px",borderRadius:8,border:`1px solid ${sel?"#3D72FC":"rgba(255,255,255,.1)"}`,background:sel?"rgba(61,114,252,.15)":"rgba(255,255,255,.03)",color:"#fff",fontSize:13,cursor:"pointer"}}>
                {o}
              </button>
            );
          })}
          <button onClick={()=>onChange({option:answer?.option||"", theft:!answer?.theft})}
            style={{marginTop:4,textAlign:"left",padding:"9px 12px",borderRadius:8,border:`1px solid ${answer?.theft?"#FA5674":"rgba(255,255,255,.1)"}`,background:answer?.theft?"rgba(250,86,116,.12)":"rgba(255,255,255,.03)",color:"#fff",fontSize:13,cursor:"pointer"}}>
            ✓ {q.check}
          </button>
        </div>
      )}

      {q.type === "single-desc" && (
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {q.opts.map(o => {
            const sel = answer === o.l;
            return (
              <button key={o.l} onClick={()=>onChange(o.l)}
                style={{textAlign:"left",padding:"11px 12px",borderRadius:8,border:`1px solid ${sel?"#3D72FC":"rgba(255,255,255,.1)"}`,background:sel?"rgba(61,114,252,.15)":"rgba(255,255,255,.03)",color:"#fff",cursor:"pointer"}}>
                <div style={{fontSize:13,fontWeight:600}}>{o.l}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{o.d}</div>
              </button>
            );
          })}
        </div>
      )}

      {q.type === "dual" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {q.sub.map(label => {
            const v = answer || {};
            return (
              <div key={label}>
                <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {q.opts.map(o => {
                    const sel = v[label] === o;
                    return (
                      <button key={o} onClick={()=>onChange({...v,[label]:o})}
                        style={{padding:"6px 11px",borderRadius:16,border:`1px solid ${sel?"#3D72FC":"rgba(255,255,255,.1)"}`,background:sel?"rgba(61,114,252,.2)":"rgba(255,255,255,.03)",color:sel?"#fff":"rgba(255,255,255,.6)",fontSize:12,fontWeight:sel?600:400,cursor:"pointer"}}>
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {q.type === "boolean" && (
        <div style={{display:"flex",gap:8}}>
          {["Yes","No"].map(o => {
            const sel = answer === o;
            return (
              <button key={o} onClick={()=>onChange(o)}
                style={{flex:1,padding:"14px",borderRadius:10,border:`1px solid ${sel?"#3D72FC":"rgba(255,255,255,.1)"}`,background:sel?"rgba(61,114,252,.18)":"rgba(255,255,255,.03)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer"}}>
                {o}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "multi" && (
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {q.opts.map(o => {
            const sel = Array.isArray(answer) ? answer : [];
            const on = sel.includes(o);
            const toggle = () => onChange(on ? sel.filter(x=>x!==o) : [...sel,o]);
            return (
              <button key={o} onClick={toggle}
                style={{textAlign:"left",padding:"10px 12px",borderRadius:8,border:`1px solid ${on?"#3D72FC":"rgba(255,255,255,.1)"}`,background:on?"rgba(61,114,252,.15)":"rgba(255,255,255,.03)",color:"#fff",fontSize:13,cursor:"pointer"}}>
                {on && "✓ "}{o}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "scale" && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 40px 40px 40px 40px 40px",gap:4,fontSize:10,color:"rgba(255,255,255,.35)",fontWeight:600}}>
            <span/>
            <span style={{textAlign:"center"}}>1</span>
            <span style={{textAlign:"center"}}>2</span>
            <span style={{textAlign:"center"}}>3</span>
            <span style={{textAlign:"center"}}>4</span>
            <span style={{textAlign:"center"}}>5</span>
          </div>
          {q.opts.map(o => {
            const v = answer || {};
            return (
              <div key={o} style={{display:"grid",gridTemplateColumns:"1fr 40px 40px 40px 40px 40px",gap:4,alignItems:"center",background:"rgba(255,255,255,.03)",borderRadius:8,padding:"8px 10px",border:"1px solid rgba(255,255,255,.06)"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>{o}</span>
                {[1,2,3,4,5].map(n => {
                  const sel = v[o] === n;
                  return (
                    <button key={n} onClick={()=>onChange({...v,[o]:n})}
                      style={{width:32,height:32,borderRadius:"50%",border:`2px solid ${sel?"#3D72FC":"rgba(255,255,255,.12)"}`,background:sel?"#3D72FC":"rgba(255,255,255,.03)",color:sel?"#fff":"rgba(255,255,255,.4)",fontSize:12,fontWeight:700,cursor:"pointer",margin:"0 auto"}}>
                      {n}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// PRODUCT MINI CARD
// ══════════════════════════════════════════════════════════════════════
function ProductMini({ type, color, name, specs }) {
  return (
    <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"13px 14px",marginTop:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{padding:"3px 9px",borderRadius:10,fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2,background:color,color:"#fff"}}>{type}</span>
        <span style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{specs.find(s=>s[0]==="Provider")?.[1]||"Stargrid"}</span>
      </div>
      <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:8,lineHeight:1.3}}>{name}</div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {specs.filter(s=>s[0]!=="Provider").map(([k,v]) => (
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{k}</span>
            <span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.8)"}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}