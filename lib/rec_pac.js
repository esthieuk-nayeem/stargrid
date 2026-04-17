// supabase/functions/recommend-package/index.ts
// Deploy: supabase functions deploy recommend-package
//
// UPDATED: Uses Product_Category "Hardware" / "Airtime*" for filtering
// Satellite hardware picked by Download/Upload speed + site type
// Cellular hardware picked by Power_Profile
// Airtime picked by Monthly_Data_GB with "just above" logic

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ═══════════════════════════════════════════════════════════
// UI → MATRIX QUESTION MAPPING
// ═══════════════════════════════════════════════════════════
const UI_TO_MATRIX: Record<string, string> = {
  "Q1":"Q2","Q3":"Q4","Q4":"Q5","Q5":"Q6","Q6":"Q7",
  "Q11":"Q12","Q12":"Q13","Q13":"Q14","Q14":"Q15","Q20":"Q22",
};
for (const mk of ["Q2","Q4","Q5","Q6","Q7","Q12","Q13","Q14","Q15","Q22"]) {
  if (!UI_TO_MATRIX[mk]) UI_TO_MATRIX[mk] = mk;
}

// ═══════════════════════════════════════════════════════════
// ANSWER NORMALIZATION
// ═══════════════════════════════════════════════════════════
function normalizePrimaryType(raw: string): string {
  const r = raw.toLowerCase();
  if (r.includes("satellite")) return "Satellite";
  if (r.includes("cellular") || r.includes("4g") || r.includes("5g")) return "Cellular (4G/5G)";
  if (r.includes("fiber") || r.includes("fibre")) return "Fiber";
  if (r.includes("fixed wireless") || r.includes("wireless")) return "Fixed Wireless";
  if (r.includes("microwave") || r.includes("p2p")) return "Microwave/P2P";
  return raw;
}
function normalizeSecondaryType(raw: string): string {
  const r = raw.toLowerCase();
  if (r === "no" || r === "none" || r === "") return "No";
  if (r.includes("cellular") || r.includes("4g") || r.includes("5g")) return "Yes, cellular";
  if (r.includes("satellite")) return "Yes, satellite";
  if (r.includes("fiber") || r.includes("fibre")) return "Yes, Fiber";
  if (r.includes("wireless")) return "Yes, Fixed Wireless";
  return raw;
}
function parseBandwidth(raw: string): string {
  const r = raw.toLowerCase();
  if (r.includes(">1 gbps") || r.includes("> 1 gbps")) return ">1 gbps";
  if (r.includes("100 mbps") && r.includes("1 gbps")) return "100 mbps - 1 gbps";
  if (r.includes("1 mbps") && r.includes("100 mbps")) return "1 mbps - 100 mbps";
  if (r.includes("100 kbps") && r.includes("1 mbps")) return "100 kbps - 1 mbps";
  if (r.includes("10 kbps") && r.includes("100 kbps")) return "10 kbps - 100 kbps";
  if (r.includes("<10 kbps") || r.includes("< 10")) return "<10 kbps";
  return raw;
}
function normalizeSiteType(raw: string): string {
  const r = raw.toLowerCase();
  if (r.includes("fixed") || r.includes("stationary")) return "Fixed Site (stationary location)";
  if (r.includes("moving")) return "Moving site";
  if (r.includes("portable")) return "Portable (pickup & setup in another location)";
  return raw;
}
const NORMALIZERS: Record<string, (s: string) => string> = {
  "Q12": normalizePrimaryType, "Q13": normalizeSecondaryType,
  "Q6": parseBandwidth, "Q7": parseBandwidth, "Q22": normalizeSiteType,
};

// ═══════════════════════════════════════════════════════════
// ELIGIBILITY MATRIX
// ═══════════════════════════════════════════════════════════
const MATRIX: Record<string, Record<string, number[]>> = {
  "Q2": {
    "Mining Operation":[41,42,43,44],"Remote Oil/Gas Well":[41,42,43,44],
    "Smart Farm/Irrigation":[41,42,43,44],"Construction Site":[41,42,43,44],
    "Offshore Platform":[41,42,43,44],"Utility Substation":[41,42,43,44],
    "Factory/Plant":[41,42,43,44],"Emergency Response Unit":[41,42,43,44],
    "Other":[40,41,42,43,44]
  },
  "Q4": {
    "SCADA/Telemetry data":[42,43],
    "CCTV/Video surveillance backhaul":[41,44],
    "VoIP communications":[41,42,43,44],
    "Remote desktop/IT access":[41,42,43,44],
    "Bulk data transfer (plans, logs)":[41,42,43,44],
    "Real-time control and monitoring":[41,42,43,44]
  },
  "Q5": {
    "<1 GB":[30,31,32,42,43,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,71,72,73,74,80,81,82,83,98,99,100,101,107,108,109,110,116,117,118,119,125,126,127,128,134,135,136,137,143,144,145,146,152,153,154,155,161,162,163,164,170,171,172,173,179,180,181,182,188,189,190,191],
    "1-10 GB":[1,8,14,25,33,34,35,36,37,38,39,42,43,65,66,67,68,74,75,76,77,83,84,85,86,92,93,94,95,101,102,103,104,110,111,112,113,119,120,121,122,128,129,130,131,137,138,139,140,146,147,148,149,155,156,157,158,164,165,166,167,173,174,175,176,182,183,184,185,191,192,193,194],
    "10-100 GB":[1,2,8,9,14,15,25,33,34,35,36,37,38,39,41,42,43,44,66,67,68,69,75,76,77,78,84,85,86,87,93,94,95,96,102,103,104,105,111,112,113,114,120,121,122,123,129,130,131,132,138,139,140,141,147,148,149,150,156,157,158,159,165,166,167,168,174,175,176,177,183,184,185,186,192,193,194,195],
    "100 GB - 1 TB":[3,4,9,10,11,12,13,15,16,17,18,19,20,41,44,69,70,78,79,87,88,96,97,105,106,114,115,123,124,132,133,141,142,150,151,159,160,168,169,177,178,186,187,195,196],
    ">1 TB":[5,6,10,11,12,13,19,20,21,22,23,40,41,44,70,79,88,97,106,115,124,133,142,151,160,169,178,187,196]
  },
  "Q6": {
    "<10 kbps":[30,31,32,42,43,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63],
    "10 kbps - 100 kbps":[30,31,32,42,43,62,63,64],
    "100 kbps - 1 mbps":[1,33,34,35,36,37,38,39,42,43,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91],
    "1 mbps - 100 mbps":[1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,33,34,35,36,37,38,39,41,42,43,44,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140],
    "100 mbps - 1 gbps":[3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,25,26,41,44,69,70,79,88,97,106,115,124,133,142,151,160,169,178],
    ">1 gbps":[40,41,44]
  },
  "Q7": {
    "<10 kbps":[30,31,32,42,43,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63],
    "10 kbps - 100 kbps":[30,31,32,42,43,62,63,64],
    "100 kbps - 1 mbps":[1,33,34,35,36,37,38,39,42,43,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91],
    "1 mbps - 100 mbps":[1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,33,34,35,36,37,38,39,41,42,43,44,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140],
    "100 mbps - 1 gbps":[3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,25,26,41,44,69,70,79,88,97,106,115,124,133,142,151,160,169,178],
    ">1 gbps":[40,41,44]
  },
  "Q12": {
    "Satellite":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,30,31,32,33,34,35,36,37,38,39,41,42,43,44],
    "Cellular (4G/5G)":[41,42,43,44,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196],
    "Fiber":[40,41],
    "Fixed Wireless":[41,42,43,44],
    "Microwave/P2P":[41,42,43,44]
  },
  "Q13": {
    "Yes, cellular":[41,42,43,44,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196],
    "Yes, satellite":[1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,30,31,32,33,34,35,36,37,38,39,42,43,44],
    "Yes, Fiber":[40],
    "Yes, Fixed Wireless":[41,42,43,44],
    "No":[]
  },
  "Q14": {
    "Single machine":[1,2,3,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,30,31,32,33,34,35,36,37,38,39,42,43,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163],
    "Local network with <10 devices":[1,2,3,4,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,30,31,32,33,34,35,36,37,38,39,42,43,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115],
    "Local network with >10 devices":[2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,25,26,33,34,35,36,37,38,39,41,44,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125],
    "Multiple segregated networks (OT/IT)":[2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,25,26,33,34,35,36,37,38,39,40,41,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125]
  },
  "Q15": {
    "Modbus":[42,43],"PROFINET":[42,43],
    "IPsec":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,33,34,35,36,37,38,39,40,41,42,43,44,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147],
    "SD-WAN":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,33,34,35,36,37,38,39,40,41,42,43,44,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147]
  },
  "Q22": {
    "Fixed Site (stationary location)":[40,41,42,44],
    "Moving site":[42,43,44],
    "Portable (pickup & setup in another location)":[25]
  }
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
const n = (v: any): number => {
  if (v === null || v === undefined || v === "") return 0;
  const p = parseFloat(String(v)); return isNaN(p) ? 0 : p;
};
const dn = (p: any): string => p?.View_Name || p?.Product_Name || "";
const isAirtime = (cat: string) => cat && cat.toLowerCase().includes("airtime");
const isHardware = (cat: string) => cat === "Hardware";

function translateAnswers(raw: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [uiKey, rawAns] of Object.entries(raw)) {
    if (!rawAns) continue;
    const mKey = UI_TO_MATRIX[uiKey]; if (!mKey) continue;
    const norm = NORMALIZERS[mKey];
    out[mKey] = norm ? norm(rawAns) : rawAns;
  }
  return out;
}

function getEligibleIds(questions: string[], answers: Record<string, string>): Set<number> | null {
  const sets: { q: string; ids: Set<number> }[] = [];
  for (const q of questions) {
    const ans = answers[q]; if (!ans) continue;
    const qm = MATRIX[q]; if (!qm) continue;
    let ids = qm[ans];
    if (!ids) {
      const lower = ans.toLowerCase();
      for (const [opt, optIds] of Object.entries(qm)) {
        if (opt.toLowerCase().includes(lower) || lower.includes(opt.toLowerCase())) { ids = optIds; break; }
      }
    }
    if (ids && ids.length > 0) sets.push({ q, ids: new Set(ids) });
  }
  if (sets.length === 0) return null;
  let result = new Set(sets[0].ids);
  for (let i = 1; i < sets.length; i++) result = new Set([...result].filter(x => sets[i].ids.has(x)));
  if (result.size > 0) return result;
  const priority = ["Q12","Q13","Q5","Q6","Q7","Q2","Q4","Q14","Q15","Q22"];
  const sorted = [...sets].sort((a, b) => {
    const ai = priority.indexOf(a.q); const bi = priority.indexOf(b.q);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  for (let drop = 1; drop < sorted.length; drop++) {
    const sub = sorted.slice(0, sorted.length - drop);
    let r = new Set(sub[0].ids);
    for (let i = 1; i < sub.length; i++) r = new Set([...r].filter(x => sub[i].ids.has(x)));
    if (r.size > 0) return r;
  }
  return sets[0].ids;
}

interface Product {
  id: number; Product_Name: string; View_Name?: string | null;
  Product_Category: string; Connectivity_Technology: string;
  Monthly_Data_GB: number | null; Network_Setup_Fee: number | null;
  Network_Monthly_Fee: number | null; Max_Throughput_Mbps: number | null;
  Download_Mbit_s: number | null; Upload_Mbit_s: number | null;
  Provider: string | null; Power_Profile: string | null;
  Site_Fixed: string | null; Site_Moving: string | null; Site_Portable: string | null;
  [key: string]: any;
}

// ═══════════════════════════════════════════════════════════
// BANDWIDTH PARSER — extracts Mbps from answer text
// ═══════════════════════════════════════════════════════════
function parseBandwidthMbps(ans: string): number {
  if (!ans) return 10;
  const r = ans.toLowerCase();
  if (r.includes(">1 gbps")) return 1500;
  if (r.includes("100 mbps") && r.includes("1 gbps")) return 500;
  if (r.includes("1 mbps") && r.includes("100 mbps")) return 50;
  if (r.includes("100 kbps") && r.includes("1 mbps")) return 0.5;
  if (r.includes("10 kbps") && r.includes("100 kbps")) return 0.05;
  if (r.includes("<10 kbps")) return 0.005;
  return 10;
}

// Returns a value JUST ABOVE the upper bound of the selected range.
// The airtime picker then finds the smallest plan >= this value.
// Example: "10-100 GB" → 101, so picker skips 100GB and finds the next one up (e.g. 150GB, 200GB)
// This ensures the recommended plan always EXCEEDS the customer's stated maximum need.
function parseDataGB(ans: string): number {
  if (!ans) return 11;
  if (ans.includes("<1")) return 1.5;       // just above 1GB → picks ~2-3GB plan
  if (ans.includes("1-10")) return 11;       // just above 10GB → picks ~15-25GB plan
  if (ans.includes("10-100")) return 101;    // just above 100GB → picks ~150-200GB plan
  if (ans.includes("100") && (ans.includes("1 TB") || ans.includes("1TB"))) return 1001; // just above 1TB
  if (ans.includes(">1 TB")) return 2000;
  return 11;
}

function parseSiteType(ans: string): string {
  if (!ans) return "fixed";
  const r = ans.toLowerCase();
  if (r.includes("moving")) return "moving";
  if (r.includes("portable")) return "portable";
  return "fixed";
}

// ═══════════════════════════════════════════════════════════
// ROUTER PICKER — same as before, uses matrix eligibility
// ═══════════════════════════════════════════════════════════
function pickRouter(products: Product[], eligible: Set<number> | null): Product | null {
  let pool = products.filter(p => p.Connectivity_Technology === "Router" &&
    (p.Product_Category === "Router Site" || p.Product_Category === "Router Core"));
  if (eligible) pool = pool.filter(p => eligible.has(p.id));
  if (pool.length === 0) return null;
  pool.sort((a, b) => {
    const aS = a.Product_Category === "Router Site" ? 0 : 1;
    const bS = b.Product_Category === "Router Site" ? 0 : 1;
    if (aS !== bS) return aS - bS;
    const fa = n(a.Network_Setup_Fee); const fb = n(b.Network_Setup_Fee);
    if (fa === 0 && fb > 0) return 1; if (fb === 0 && fa > 0) return -1; return fa - fb;
  });
  return pool[0];
}

// ═══════════════════════════════════════════════════════════
// SATELLITE HARDWARE PICKER — by Download/Upload speed + site type
// Only considers: Starlink High Perf (24), Mini (25), Enterprise (26), Iridium (30)
// ═══════════════════════════════════════════════════════════
function pickSatHardware(products: Product[], siteType: string, downMbps: number, upMbps: number): Product | null {
  // Filter to satellite hardware only (IDs 24-30 are the relevant ones)
  const RELEVANT_IDS = [24, 25, 26, 30];
  let pool = products.filter(p =>
    isHardware(p.Product_Category) &&
    p.Connectivity_Technology === "Satellite" &&
    RELEVANT_IDS.includes(p.id)
  );
  if (pool.length === 0) return null;

  // Filter by site type compatibility
  pool = pool.filter(p => {
    if (siteType === "moving") return String(p.Site_Moving).toUpperCase() === "TRUE";
    if (siteType === "portable") return String(p.Site_Portable).toUpperCase() === "TRUE";
    return String(p.Site_Fixed).toUpperCase() === "TRUE"; // fixed
  });
  if (pool.length === 0) {
    // Fallback: all fixed site hardware
    pool = products.filter(p => isHardware(p.Product_Category) && p.Connectivity_Technology === "Satellite" && RELEVANT_IDS.includes(p.id));
  }

  // Score by how well download/upload speed matches needed bandwidth
  // Pick the cheapest one whose speeds MEET the requirement
  const scored = pool.map(p => {
    const pDown = n(p.Download_Mbit_s);
    const pUp = n(p.Upload_Mbit_s);
    const setup = n(p.Network_Setup_Fee);
    let score = 0;

    // Can it meet the download requirement?
    if (pDown >= downMbps) score += 300;
    else if (pDown > 0) score += (pDown / Math.max(downMbps, 0.01)) * 100;

    // Can it meet the upload requirement?
    if (pUp >= upMbps) score += 200;
    else if (pUp > 0) score += (pUp / Math.max(upMbps, 0.01)) * 50;

    // Prefer cheapest that meets requirements (cost penalty)
    if (score >= 400 && setup > 0) score -= setup / 100;

    // Slight preference for non-overkill (don't pick 400Mbps for 1Mbps need)
    if (pDown > 0 && downMbps > 0) {
      const ratio = pDown / downMbps;
      if (ratio >= 1 && ratio <= 3) score += 50;  // Sweet spot
      if (ratio > 10) score -= 30;                  // Overkill
    }

    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].p;
}

// ═══════════════════════════════════════════════════════════
// SATELLITE AIRTIME PICKER — by Monthly_Data_GB with "just above" logic
// Prefers: Fixed Site plans for fixed sites, Mobile for moving
// ═══════════════════════════════════════════════════════════
function pickSatAirtime(products: Product[], eligible: Set<number> | null, dataGB: number, siteType: string): Product | null {
  let pool = products.filter(p =>
    isAirtime(p.Product_Category) &&
    p.Connectivity_Technology === "Satellite" &&
    n(p.Network_Monthly_Fee) > 0 &&
    !p.Product_Name.includes("Top Up") &&
    !p.Product_Name.includes("Overage") &&
    !p.Product_Name.includes("Fleet Edge") &&
    !p.Product_Name.includes("Paradigma")
  );
  if (eligible) pool = pool.filter(p => eligible.has(p.id));
  if (pool.length === 0) {
    // Fallback without eligibility filter
    pool = products.filter(p =>
      isAirtime(p.Product_Category) && p.Connectivity_Technology === "Satellite" &&
      n(p.Network_Monthly_Fee) > 0 && !p.Product_Name.includes("Top Up") &&
      !p.Product_Name.includes("Overage")
    );
  }
  if (pool.length === 0) return null;

  // For fixed site → prefer "Fixed Site" and "Airtime Land" plans
  // For moving → prefer "Mobile Priority" plans
  // Exclude Iridium/GX plans unless very low bandwidth needed
  const scored = pool.map(p => {
    const planData = n(p.Monthly_Data_GB);
    const monthly = n(p.Network_Monthly_Fee);
    const cat = p.Product_Category || "";
    const nm = p.Product_Name || "";
    let score = 0;

    // "Just above" logic: plan data must be >= needed, pick CLOSEST above
    if (planData >= dataGB && dataGB > 0) {
      score += 500;
      const ratio = planData / dataGB;
      // Heavily reward closeness — inverse ratio scoring
      if (ratio <= 1.5) score += 150;
      else if (ratio <= 2.5) score += 120;
      else if (ratio <= 4) score += 80;
      else if (ratio <= 8) score += 40;
      else score += 5;  // 10x+ overkill
      // Tiebreaker: within same tier, prefer smaller (closer to target)
      score -= (ratio - 1) * 5;
    } else if (planData > 0) {
      // Below needed — not ideal but still scored
      score += 50 + (planData / Math.max(dataGB, 1)) * 30;
    }

    // Site type preference (lower weight so closeness wins)
    if (siteType === "fixed" || siteType === "portable") {
      if (nm.includes("Fixed Site")) score += 50;
      if (cat === "Airtime Land ") score += 20;
      if (nm.includes("Maritime")) score -= 100;
    } else if (siteType === "moving") {
      if (nm.includes("Mobile Priority")) score += 50;
      if (nm.includes("Maritime")) score += 30;
      if (nm.includes("Fixed Site")) score -= 50;
    }

    // Prefer Starlink plans over Iridium/GX (cheaper, faster)
    if (nm.includes("Iridium") || nm.includes("GX-")) score -= 60;

    // Cost efficiency bonus
    if (planData > 0 && monthly > 0) {
      const costPerGB = monthly / planData;
      score -= costPerGB * 0.5;
    }

    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].p;
}

// ═══════════════════════════════════════════════════════════
// CELLULAR HARDWARE PICKER — by Power_Profile
// Only IDs 45-49 are relevant (Triple-SIM, Industrial)
// ═══════════════════════════════════════════════════════════
function pickCellHardware(products: Product[]): Product | null {
  const RELEVANT_IDS = [45, 46, 47, 48, 49];
  const pool = products.filter(p =>
    isHardware(p.Product_Category) &&
    p.Connectivity_Technology === "Cellular" &&
    RELEVANT_IDS.includes(p.id)
  );
  if (pool.length === 0) return null;

  // Scoring: prefer Triple-SIM (most versatile), then Industrial by power
  // Triple-SIM (45) = standard choice, LPWA (46) = low power IoT
  // Industrial 2FF(47), 3FF(48) = mid power, 4FF(49) = high power
  const scored = pool.map(p => {
    let score = 0;
    const nm = p.Product_Name || "";
    const power = (p.Power_Profile || "").toLowerCase();

    // Triple-SIM is the default best choice (multi-format)
    if (p.id === 45) score += 100; // Triple-SIM standard
    if (p.id === 46) score += 50;  // Triple-SIM LPWA (niche)
    if (p.id === 47) score += 70;  // Industrial 2FF
    if (p.id === 48) score += 70;  // Industrial 3FF
    if (p.id === 49) score += 60;  // Industrial 4FF

    // Low power profile preferred for standard deployments
    if (power.includes("low")) score += 20;

    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].p;
}

// ═══════════════════════════════════════════════════════════
// CELLULAR AIRTIME PICKER — by Monthly_Data_GB with "just above" logic
// Only picks base plans with actual monthly fees (no Zone, no Shipping, etc.)
// Prefers DE-NR network over DE-O2
// ═══════════════════════════════════════════════════════════
function pickCellAirtime(products: Product[], eligible: Set<number> | null, dataGB: number): Product | null {
  let pool = products.filter(p => {
    if (p.Connectivity_Technology !== "Cellular") return false;
    if (!isAirtime(p.Product_Category)) return false;
    const nm = p.Product_Name || "";
    const monthly = n(p.Network_Monthly_Fee);
    // Must have real pricing and Monthly_Data_GB
    if (monthly <= 0) return false;
    // Exclude zone variants, shipping, roaming, inactive, price per MB
    if (nm.includes("Zone") || nm.includes("Shipping") || nm.includes("Roaming") ||
        nm.includes("inactive") || nm.includes("Base price") || nm.includes("Price per MB")) return false;
    // Must be a data package
    if (!nm.includes("data package") && !nm.includes("GB")) return false;
    return true;
  });
  if (eligible) pool = pool.filter(p => eligible.has(p.id));
  if (pool.length === 0) {
    // Fallback without eligibility filter
    pool = products.filter(p =>
      p.Connectivity_Technology === "Cellular" && isAirtime(p.Product_Category) &&
      n(p.Network_Monthly_Fee) > 0 && !p.Product_Name.includes("Zone") &&
      (p.Product_Name.includes("data package") || p.Product_Name.includes("GB"))
    );
  }
  if (pool.length === 0) return null;

  // "Just above" logic: pick the plan with Monthly_Data_GB just above the needed amount
  // Heavily favor closest match above target
  const scored = pool.map(p => {
    const planData = n(p.Monthly_Data_GB);
    const monthly = n(p.Network_Monthly_Fee);
    const nm = p.Product_Name || "";
    let score = 0;

    if (planData >= dataGB && dataGB > 0) {
      score += 500;
      const ratio = planData / dataGB;
      if (ratio <= 1.5) score += 150;
      else if (ratio <= 2.5) score += 120;
      else if (ratio <= 4) score += 80;
      else if (ratio <= 8) score += 40;
      else score += 5;
      // Tiebreaker: within same tier, prefer smaller (closer to target)
      score -= (ratio - 1) * 5;
    } else if (planData > 0) {
      score += 50 + (planData / Math.max(dataGB, 1)) * 30;
    }

    // Prefer DE-NR (better network) over DE-O2
    if (nm.includes("DE-NR")) score += 40;
    else if (nm.includes("DE-O2")) score += 20;

    // Cost efficiency
    if (monthly > 0) score -= monthly / 20;

    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].p;
}

// ═══════════════════════════════════════════════════════════
// MAIN: Recommend for one site
// ═══════════════════════════════════════════════════════════
function recommendForSite(rawAnswers: Record<string, string>, allProducts: Product[]) {
  const answers = translateAnswers(rawAnswers);
  const primaryType = answers["Q12"] || "Satellite";
  const secondaryAnswer = answers["Q13"] || "No";
  const dataNeeded = parseDataGB(answers["Q5"] || "");
  const downMbps = parseBandwidthMbps(answers["Q6"] || "");
  const upMbps = parseBandwidthMbps(answers["Q7"] || answers["Q6"] || "");
  const siteType = parseSiteType(answers["Q22"] || "");

  const isSatPrimary = primaryType === "Satellite";
  const isCellPrimary = primaryType === "Cellular (4G/5G)";
  const hasCellSecondary = secondaryAnswer.toLowerCase().includes("cellular");
  const hasSatSecondary = secondaryAnswer.toLowerCase().includes("satellite");
  const hasNoSecondary = secondaryAnswer === "No" || secondaryAnswer === "";

  const generalQs = ["Q2", "Q4", "Q14", "Q15", "Q22"];
  const routerIds = getEligibleIds(generalQs, answers);
  const router = pickRouter(allProducts, routerIds);
  const primaryIds = getEligibleIds(["Q12", "Q5", "Q6", "Q7", ...generalQs], answers);
  const secondaryIds = hasNoSecondary ? null : getEligibleIds(["Q13", "Q5", "Q6", "Q7", ...generalQs], answers);

  // === Pick primary ===
  let primary: any = null;
  if (isSatPrimary) {
    const hw = pickSatHardware(allProducts, siteType, downMbps, upMbps);
    const airtime = pickSatAirtime(allProducts, primaryIds, dataNeeded, siteType);
    if (airtime) primary = {
      type: "Satellite", service_id: airtime.id, service_name: dn(airtime),
      hardware_id: hw?.id ?? null, hardware_name: dn(hw) || "Included",
      network_setup_fee: n(hw?.Network_Setup_Fee), network_monthly_fee: n(airtime.Network_Monthly_Fee),
      managed_service_monthly: 0, data_gb: n(airtime.Monthly_Data_GB), provider: airtime.Provider || "Starlink",
    };
  } else if (isCellPrimary) {
    const hw = pickCellHardware(allProducts);
    const airtime = pickCellAirtime(allProducts, primaryIds, dataNeeded);
    if (airtime) primary = {
      type: "Cellular", service_id: airtime.id, service_name: dn(airtime),
      hardware_id: hw?.id ?? null, hardware_name: dn(hw) || "SIM Card",
      network_setup_fee: n(hw?.Network_Setup_Fee) + 6.90, network_monthly_fee: 0.49 + n(airtime.Network_Monthly_Fee),
      managed_service_monthly: 0, data_gb: n(airtime.Monthly_Data_GB), provider: airtime.Provider || "Telefonica",
    };
  }
  // Fallback to satellite
  if (!primary) {
    const hw = pickSatHardware(allProducts, siteType, downMbps, upMbps);
    const airtime = pickSatAirtime(allProducts, null, dataNeeded, siteType);
    if (airtime) primary = {
      type: "Satellite", service_id: airtime.id, service_name: dn(airtime),
      hardware_id: hw?.id ?? null, hardware_name: dn(hw) || "Included",
      network_setup_fee: n(hw?.Network_Setup_Fee), network_monthly_fee: n(airtime.Network_Monthly_Fee),
      managed_service_monthly: 0, data_gb: n(airtime.Monthly_Data_GB), provider: airtime.Provider || "Starlink",
    };
  }

  // === Pick secondary ===
  let secondary: any = null;
  // Failover must handle the same data volume as primary (full load if primary fails)
  const failoverData = dataNeeded;
  if (hasCellSecondary) {
    const hw = pickCellHardware(allProducts);
    const airtime = pickCellAirtime(allProducts, secondaryIds, failoverData);
    if (airtime) secondary = {
      type: "Cellular", service_id: airtime.id, service_name: dn(airtime),
      hardware_id: hw?.id ?? null, hardware_name: dn(hw) || "SIM Card",
      network_setup_fee: n(hw?.Network_Setup_Fee) + 6.90, network_monthly_fee: 0.49 + n(airtime.Network_Monthly_Fee),
      managed_service_monthly: 0, data_gb: n(airtime.Monthly_Data_GB), provider: airtime.Provider || "Telefonica",
    };
  } else if (hasSatSecondary) {
    const hw = pickSatHardware(allProducts, siteType, downMbps, upMbps);
    const airtime = pickSatAirtime(allProducts, secondaryIds, failoverData, siteType);
    if (airtime) secondary = {
      type: "Satellite", service_id: airtime.id, service_name: dn(airtime),
      hardware_id: hw?.id ?? null, hardware_name: dn(hw) || "Included",
      network_setup_fee: n(hw?.Network_Setup_Fee), network_monthly_fee: n(airtime.Network_Monthly_Fee),
      managed_service_monthly: 0, data_gb: n(airtime.Monthly_Data_GB), provider: airtime.Provider || "Starlink",
    };
  }

  // === Build components ===
  const MANAGED = 128;
  const components: any[] = [];
  if (router) components.push({
    type: "Stargrid Box", color: "#3D72FC",
    hardware: dn(router), airtime: "—",
    name: dn(router), product_id: router.id,
    network_setup_fee: n(router.Network_Setup_Fee), network_monthly_fee: 0, managed_service_monthly: MANAGED,
  });
  if (primary) components.push({
    type: primary.type === "Satellite" ? "Satellite" : "Cellular",
    color: primary.type === "Satellite" ? "#6669D8" : "#22c55e",
    hardware: primary.hardware_name, airtime: primary.service_name,
    name: primary.service_name, product_id: primary.service_id,
    network_setup_fee: primary.network_setup_fee, network_monthly_fee: primary.network_monthly_fee,
    managed_service_monthly: 0, data_gb: primary.data_gb || 0, provider: primary.provider || "",
  });
  if (secondary) components.push({
    type: secondary.type === "Satellite" ? "Satellite" : "Cellular",
    color: secondary.type === "Satellite" ? "#5CB0E9" : "#FF9800",
    hardware: secondary.hardware_name, airtime: secondary.service_name,
    name: secondary.service_name, product_id: secondary.service_id,
    network_setup_fee: secondary.network_setup_fee, network_monthly_fee: secondary.network_monthly_fee,
    managed_service_monthly: 0, data_gb: secondary.data_gb || 0, provider: secondary.provider || "",
  });

  const totals = {
    network_setup_fee: components.reduce((s, c) => s + n(c.network_setup_fee), 0),
    network_monthly_fee: components.reduce((s, c) => s + n(c.network_monthly_fee), 0),
    managed_service_monthly: components.reduce((s, c) => s + n(c.managed_service_monthly), 0),
  };

  return {
    components, totals,
    servicesLabel: [primary?.type, secondary ? `+ ${secondary.type}` : null].filter(Boolean).join(" ") || "Standard",
    primary_type: primary?.type || null, secondary_type: secondary?.type || null,
    eligible_count: 0, router_id: router?.id || null,
    primary_service_id: primary?.service_id || null, secondary_service_id: secondary?.service_id || null,
    debug: { translated_answers: answers, siteType, downMbps, upMbps, dataNeeded },
  };
}

function computeTotals(sitePackages: any[], totalSites: number) {
  const allSetup = sitePackages.reduce((s: number, sp: any) => s + n(sp.package.totals.network_setup_fee), 0);
  const allMonthly = sitePackages.reduce((s: number, sp: any) => s + n(sp.package.totals.network_monthly_fee), 0);
  const allManaged = sitePackages.reduce((s: number, sp: any) => s + n(sp.package.totals.managed_service_monthly), 0);
  let disc = 0;
  if (totalSites >= 50) disc = 0.20; else if (totalSites >= 20) disc = 0.15;
  else if (totalSites >= 10) disc = 0.10; else if (totalSites >= 5) disc = 0.05;
  const months = 36;
  return {
    pocTotals: { network_setup_fee: 2000, network_monthly_fee: 0, managed_service_monthly: 0 },
    allTotals: { network_setup_fee: allSetup, network_monthly_fee: allMonthly, managed_service_monthly: allManaged, setup_discount_pct: disc, discounted_setup: allSetup * (1 - disc), contract_months: months, contract_value: allSetup * (1 - disc) + (allMonthly + allManaged) * months, list_contract_value: allSetup + (allMonthly + allManaged) * months },
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" } });
  }
  try {
    const { sites, response_id } = await req.json();
    if (!sites || !Array.isArray(sites) || sites.length === 0) {
      return new Response(JSON.stringify({ error: "Missing 'sites' array" }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: products, error } = await supabase.from("stargrid_product_table").select("*");
    if (error) throw error;

    const sitePackages = sites.map((site: any, idx: number) => ({
      site_id: site.site_id || `site-${idx + 1}`,
      site_name: site.site_name || `Site ${idx + 1}`,
      site_number: idx + 1,
      package: recommendForSite(site.answers || {}, products || []),
    }));

    const { pocTotals, allTotals } = computeTotals(sitePackages, sites.length);
    const recommendation = { sitePackages, pocTotals, allTotals, totalSites: sites.length, generated_at: new Date().toISOString() };

    if (response_id) {
      await supabase.from("questionnaire_responses").update({ recommendation }).eq("id", response_id);
    }
    return new Response(JSON.stringify(recommendation), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }
});