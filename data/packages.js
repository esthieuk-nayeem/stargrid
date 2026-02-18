// data/packages.js
// Product packages derived from real stargrid_product_table data

// ═══ ROUTERS (from product IDs 40-44) ═══
export const ROUTERS = [
  {
    id: 42, name: "Stargrid Box Fix", hardware: "MAX-BR1-MINI-5G",
    category: "Stargrid Box", throughput_mbps: 300,
    network_setup_fee: 799, network_monthly_fee: 12, managed_service_monthly: 128,
    tier: "standard", environments: ["indoor", "outdoor"],
  },
  {
    id: 43, name: "Stargrid Box Mobile", hardware: "B One 5G",
    category: "Stargrid Box", throughput_mbps: 1000,
    network_setup_fee: 849, network_monthly_fee: 12, managed_service_monthly: 128,
    tier: "mobile", environments: ["mobile", "outdoor", "vehicle"],
  },
  {
    id: 41, name: "Stargrid Box Large", hardware: "Balance 310x",
    category: "Stargrid Box", throughput_mbps: 2500,
    network_setup_fee: 3149, network_monthly_fee: 18, managed_service_monthly: 189,
    tier: "enterprise", environments: ["indoor", "outdoor", "industrial"],
  },
  {
    id: 44, name: "Stargrid Box MBX Mini", hardware: "MAX-MBX-MINI-5G",
    category: "Stargrid Box", throughput_mbps: 2500,
    network_setup_fee: 7249, network_monthly_fee: 24, managed_service_monthly: 249,
    tier: "heavy", environments: ["indoor", "outdoor", "harsh", "maritime"],
  },
];

// ═══ STARLINK SATELLITE HARDWARE (IDs 24-26) ═══
export const SAT_HARDWARE = [
  { id: 25, name: "Starlink Mini",              setup_fee: 348,  throughput: 250, env: "outdoor" },
  { id: 26, name: "Starlink Enterprise Kit V4", setup_fee: 390,  throughput: 400, env: "harsh" },
  { id: 24, name: "Starlink Maritime Antenna",  setup_fee: 2160, throughput: 100, env: "maritime" },
];

// ═══ STARLINK SATELLITE DATA PLANS (IDs 1-23) ═══
export const SAT_PLANS_FIXED = [
  { id: 1,  name: "Fixed Site Priority 50GB (DE)",   data_gb: 50,   monthly: 96    },
  { id: 3,  name: "Fixed Site Priority 500GB (DE)",  data_gb: 500,  monthly: 150   },
  { id: 4,  name: "Fixed Site Priority 1TB (DE)",    data_gb: 1000, monthly: 302.4 },
  { id: 5,  name: "Fixed Site Priority 2TB (DE)",    data_gb: 2000, monthly: 542.4 },
  { id: 6,  name: "Fixed Site Priority 6TB (DE)",    data_gb: 6000, monthly: 1478.4},
];
export const SAT_PLANS_MOBILE = [
  { id: 7,  name: "Mobile Priority PAYG 1GB",   data_gb: 1,    monthly: 3     },
  { id: 8,  name: "Mobile Priority 50GB",       data_gb: 50,   monthly: 318   },
  { id: 9,  name: "Mobile Priority 100GB",      data_gb: 100,  monthly: 396   },
  { id: 10, name: "Mobile Priority 200GB",      data_gb: 200,  monthly: 552   },
  { id: 12, name: "Mobile Priority 500GB",      data_gb: 500,  monthly: 1008  },
  { id: 13, name: "Mobile Priority 1TB",        data_gb: 1000, monthly: 1560  },
];
export const SAT_PLANS_MARITIME = [
  { id: 14, name: "Maritime Priority 50GB",   data_gb: 50,   monthly: 318  },
  { id: 15, name: "Maritime Priority 100GB",  data_gb: 100,  monthly: 396  },
  { id: 17, name: "Maritime Priority 200GB",  data_gb: 200,  monthly: 552  },
  { id: 19, name: "Maritime Priority 500GB",  data_gb: 500,  monthly: 1008 },
  { id: 20, name: "Maritime Priority 1TB",    data_gb: 1000, monthly: 1560 },
];

// ═══ TELEFONICA CELLULAR (SIM + Data plans from IDs 47, 62-70) ═══
export const CELL_SIM = { id: 47, name: "Industrial SIM 4FF", setup: 2.00, shipping: 6.90, base_monthly: 0.49 };

export const CELL_PLANS = [
  { id: 62, name: "0.05 GB/mo (DE-O2)", data_gb: 0.05, monthly: 0.49  },
  { id: 63, name: "0.1 GB/mo (DE-O2)",  data_gb: 0.1,  monthly: 0.75  },
  { id: 64, name: "0.5 GB/mo (DE-O2)",  data_gb: 0.5,  monthly: 2.75  },
  { id: 65, name: "1 GB/mo (DE-O2)",    data_gb: 1,    monthly: 3.75  },
  { id: 66, name: "3 GB/mo (DE-O2)",    data_gb: 3,    monthly: 9.30  },
  { id: 67, name: "5 GB/mo (DE-O2)",    data_gb: 5,    monthly: 12.25 },
  { id: 68, name: "10 GB/mo (DE-O2)",   data_gb: 10,   monthly: 18.75 },
  { id: 69, name: "25 GB/mo (DE-O2)",   data_gb: 25,   monthly: 37.50 },
  { id: 70, name: "50 GB/mo (DE-O2)",   data_gb: 50,   monthly: 65.60 },
];

// ═══ POC PRICING (fixed) ═══
export const POC_PRICING = { network_setup_fee: 10000, network_monthly_fee: 0, managed_service_monthly: 0 };

// ─────────────────────────────────────────────
// MATCHING ALGORITHM
// ─────────────────────────────────────────────

function pickRouter(answers) {
  const useCase = answers[1]?.value || "";
  const env     = answers[2]?.option?.value || "";
  const devices = answers[13]?.value || "1";
  const siteType = answers[22]?.value || "fixed";

  if (env === "offshore" || useCase === "offshore") return ROUTERS[3]; // MBX Mini heavy
  if (devices === "segregated" || devices === "10+") return ROUTERS[2]; // Balance 310x
  if (siteType === "mobile" || useCase === "emergency") return ROUTERS[1]; // B One 5G mobile
  return ROUTERS[0]; // MAX-BR1-MINI-5G standard
}

function pickSatHardware(answers) {
  const env = answers[2]?.option?.value || "";
  if (env === "offshore") return SAT_HARDWARE[2]; // Maritime
  const dataGB = answers[4]?.score || 5;
  if (dataGB >= 100) return SAT_HARDWARE[1]; // Enterprise Kit V4
  return SAT_HARDWARE[0]; // Mini
}

function pickSatPlan(answers) {
  const dataGB = answers[4]?.score || 5;
  const env = answers[2]?.option?.value || "";
  const siteType = answers[22]?.value || "fixed";

  let pool;
  if (env === "offshore")       pool = SAT_PLANS_MARITIME;
  else if (siteType === "mobile") pool = SAT_PLANS_MOBILE;
  else                            pool = SAT_PLANS_FIXED;

  // Pick smallest plan that covers the data need
  const sorted = [...pool].sort((a, b) => a.data_gb - b.data_gb);
  return sorted.find(p => p.data_gb >= dataGB) || sorted[sorted.length - 1];
}

function pickCellPlan(answers) {
  const dataGB = answers[4]?.score || 5;
  // For cellular (often backup), target ~30% of total data volume
  const target = Math.max(0.5, Math.ceil(dataGB * 0.3));
  const sorted = [...CELL_PLANS].sort((a, b) => a.data_gb - b.data_gb);
  return sorted.find(p => p.data_gb >= target) || sorted[sorted.length - 1];
}

// ─────────────────────────────────────────────
// BUILD PACKAGE FOR ONE SITE
// ─────────────────────────────────────────────
export function buildSitePackage(site) {
  const { answers } = site;
  const router      = pickRouter(answers);
  const primaryType = answers[11]?.value || "cellular";
  const secondaryType = answers[12]?.value || "none";

  const components = [];

  // 1) Router – always present
  components.push({
    type: "Stargrid Box", name: router.name, hardware: router.hardware,
    airtime: router.throughput_mbps >= 1000
      ? `${(router.throughput_mbps/1000).toFixed(1)} Gbps`
      : `${router.throughput_mbps} Mbps`,
    network_setup_fee: router.network_setup_fee,
    network_monthly_fee: router.network_monthly_fee,
    managed_service_monthly: router.managed_service_monthly,
    color: "#3D72FC",
  });

  const addSatellite = () => {
    const hw   = pickSatHardware(answers);
    const plan = pickSatPlan(answers);
    components.push({
      type: "Satellite", name: plan.name, hardware: hw.name,
      airtime: `${plan.data_gb >= 1000 ? (plan.data_gb/1000)+'TB' : plan.data_gb+'GB'}/month`,
      network_setup_fee: hw.setup_fee,
      network_monthly_fee: plan.monthly,
      managed_service_monthly: 0,
      color: "#6669D8",
    });
  };

  const addCellular = () => {
    const plan = pickCellPlan(answers);
    components.push({
      type: "Cellular", name: `Telefonica ${plan.name}`, hardware: CELL_SIM.name,
      airtime: plan.data_gb >= 1 ? `${plan.data_gb} GB/month` : `${plan.data_gb*1000} MB/month`,
      network_setup_fee: CELL_SIM.setup + CELL_SIM.shipping,
      network_monthly_fee: CELL_SIM.base_monthly + plan.monthly,
      managed_service_monthly: 0,
      color: "#5CB0E9",
    });
  };

  // 2) Primary
  if (primaryType === "satellite") addSatellite(); else addCellular();

  // 3) Secondary
  if      (secondaryType === "satellite")      addSatellite();
  else if (secondaryType === "cellular")       addCellular();
  else if (secondaryType === "fiber")          addCellular();
  else if (secondaryType === "fixed_wireless") addCellular();
  // "none" → skip

  const totals = {
    network_setup_fee:       components.reduce((s,c) => s + c.network_setup_fee, 0),
    network_monthly_fee:     components.reduce((s,c) => s + c.network_monthly_fee, 0),
    managed_service_monthly: components.reduce((s,c) => s + c.managed_service_monthly, 0),
  };

  const serviceTypes = [...new Set(components.filter(c => c.type !== "Stargrid Box").map(c => c.type))];
  const servicesLabel = serviceTypes.length
    ? `Incl. ${serviceTypes.join(" & ")} Access Services`
    : "Router Only";

  return { router, components, totals, servicesLabel };
}

// ─────────────────────────────────────────────
// BUILD ALL PACKAGES + DEPLOYMENT SUMMARY
// ─────────────────────────────────────────────
export function buildAllPackages(sites) {
  const sitePackages = sites.map((site, i) => ({
    site, siteNumber: i + 1,
    package: buildSitePackage(site),
  }));

  // PoC = first 2 sites (fixed pricing)
  const pocCount = Math.min(2, sites.length);
  const pocTotals = {
    ...POC_PRICING,
    list_setup:   sitePackages.slice(0, pocCount).reduce((s,sp) => s + sp.package.totals.network_setup_fee, 0),
    list_monthly: sitePackages.slice(0, pocCount).reduce((s,sp) => s + sp.package.totals.network_monthly_fee, 0),
    list_managed: sitePackages.slice(0, pocCount).reduce((s,sp) => s + sp.package.totals.managed_service_monthly, 0),
  };

  // All sites
  const allSetup   = sitePackages.reduce((s,sp) => s + sp.package.totals.network_setup_fee, 0);
  const allMonthly = sitePackages.reduce((s,sp) => s + sp.package.totals.network_monthly_fee, 0);
  const allManaged = sitePackages.reduce((s,sp) => s + sp.package.totals.managed_service_monthly, 0);

  let setupDiscount = 0;
  if      (sites.length > 10) setupDiscount = 0.20;
  else if (sites.length > 5)  setupDiscount = 0.10;

  const discountedSetup = Math.round(allSetup * (1 - setupDiscount));
  const lifetime = sites[0]?.answers?.[19]?.score?.lifetime || 36;

  return {
    sitePackages,
    pocTotals,
    allTotals: {
      network_setup_fee: allSetup,
      network_monthly_fee: allMonthly,
      managed_service_monthly: allManaged,
      discounted_setup: discountedSetup,
      setup_discount_pct: setupDiscount,
      contract_months: lifetime,
      contract_value:      Math.round(discountedSetup + (allMonthly + allManaged) * lifetime),
      list_contract_value: Math.round(allSetup        + (allMonthly + allManaged) * lifetime),
    },
    totalSites: sites.length,
  };
}

export function formatEuro(val) {
  if (val == null) return "—";
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits:2, maximumFractionDigits:2 }).format(val) + " €";
}