// data/enhancedQuestionnaireData.js
// FIXED VERSION with all bug fixes applied
// Total Questions: 22 (includes Q22 in location selection)

export const questionnaireData = [
  {
    id: 1,
    section: "Site Location",
    question: "What is the exact location of the site?",
    type: "map-location", // FIXED: Proper type recognition
    instruction: "Search for your site location on the map, or click to pin the exact location.",
    multiSite: true,
    required: true,
    // CHANGE: Add site type question to location page
    additionalQuestion: {
      id: 22,
      question: "Is your site a fixed site or a moving site/vehicle?",
      type: "single",
      options: [
        { 
          value: "fixed", 
          label: "Fixed Site (stationary location)",
          score: { mobility: 0, routerType: "standard" }
        },
        { 
          value: "moving_vehicle", 
          label: "Moving Site/Vehicle (boat, truck, RV, etc.)",
          score: { mobility: 100, routerType: "maritime_mobile" }
        },
        { 
          value: "semi_mobile", 
          label: "Semi-Mobile (occasional relocation)",
          score: { mobility: 50, routerType: "rugged" }
        }
      ],
      required: true,
      tooltip: "Moving sites require maritime/mobile routers and LEO satellites"
    }
  },
  {
    id: 2,
    section: "Project & Site Basics",
    question: "What is the primary use case for this industrial site?",
    type: "single",
    options: [
      { label: "Mining Operation", value: "mining", score: { environment: "industrial", power: "heavy" } },
      { label: "Remote Oil/Gas Well", value: "oil_gas", score: { environment: "remote", power: "medium" } },
      { label: "Smart Farm/Irrigation", value: "farm", score: { environment: "outdoor", power: "light" } },
      { label: "Construction Site", value: "construction", score: { environment: "outdoor", power: "medium" } },
      { label: "Offshore Platform", value: "offshore", score: { environment: "maritime", power: "heavy" } },
      { label: "Utility Substation", value: "utility", score: { environment: "industrial", power: "medium" } },
      { label: "Factory/Plant", value: "factory", score: { environment: "industrial", power: "heavy" } },
      { label: "Emergency Response Unit", value: "emergency", score: { environment: "mobile", power: "light" } },
      { label: "Other", value: "other", hasInput: true, score: { environment: "general", power: "medium" } }
    ],
    mappingField: "Supported_Role",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 3,
    section: "Project & Site Basics",
    question: "How would you describe the physical and security environment of your site?",
    type: "single-with-checkbox",
    options: [
      { label: "Urban location, fenced", value: "urban_fenced", score: { security: 70, environment: "urban" } },
      { label: "Industrial yard, fenced", value: "industrial_fenced", score: { security: 80, environment: "industrial" } },
      { label: "Extremely remote/unmanned", value: "remote_unmanned", score: { security: 40, environment: "remote" } },
      { label: "Harsh environment (dust, salt, vibration)", value: "harsh", score: { security: 60, environment: "harsh" } },
      { label: "Offshore", value: "offshore", score: { security: 50, environment: "maritime" } }
    ],
    additionalCheckbox: "High-theft-risk area",
    mappingField: "Environment_Suitability",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 4,
    section: "Connectivity Requirements",
    question: "What is the primary purpose of the connection for your site?",
    type: "single",
    options: [
      { label: "SCADA/Telemetry data", value: "scada", score: { bandwidth: 20, latency: 90, reliability: 95 } },
      { label: "CCTV/Video surveillance backhaul", value: "cctv", score: { bandwidth: 85, latency: 70, reliability: 80 } },
      { label: "VoIP communications", value: "voip", score: { bandwidth: 40, latency: 95, reliability: 90 } },
      { label: "Remote desktop/IT access", value: "remote_desktop", score: { bandwidth: 60, latency: 80, reliability: 85 } },
      { label: "Bulk data transfer (plans, logs)", value: "bulk_transfer", score: { bandwidth: 95, latency: 40, reliability: 70 } },
      { label: "Real-time control and monitoring", value: "realtime_control", score: { bandwidth: 50, latency: 98, reliability: 98 } },
      { label: "Other", value: "other", hasInput: true, score: { bandwidth: 50, latency: 50, reliability: 70 } }
    ],
    perSiteAnswer: true,
    required: true
  },
  {
    id: 5,
    section: "Connectivity Requirements",
    question: "What is the estimated average monthly data volume for your site?",
    type: "single",
    options: [
      { label: "<1 GB", value: "0-1", score: 0.5, minGB: 0, maxGB: 1 },
      { label: "1-10 GB", value: "1-10", score: 5, minGB: 1, maxGB: 10 },
      { label: "10-100 GB", value: "10-100", score: 50, minGB: 10, maxGB: 100 },
      { label: "100 GB - 1 TB", value: "100-1000", score: 500, minGB: 100, maxGB: 1000 },
      { label: ">1 TB", value: "1000+", score: 2000, minGB: 1000, maxGB: 10000 }
    ],
    mappingField: "Monthly_Data_GB",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 6,
    section: "Connectivity Requirements",
    question: "What is the average bandwidth requirement for your site?",
    type: "dual-single",
    subQuestions: [
      {
        label: "Downlink (Download Speed)",
        options: [
          { label: "<10 kbps", value: "0-0.01", score: 0.005 },
          { label: "10-100 kbps", value: "0.01-0.1", score: 0.05 },
          { label: "100 kbps - 1 Mbps", value: "0.1-1", score: 0.5 },
          { label: "1-100 Mbps", value: "1-100", score: 50 },
          { label: "100 Mbps - 1 Gbps", value: "100-1000", score: 500 },
          { label: ">1 Gbps", value: "1000+", score: 2000 }
        ]
      },
      {
        label: "Uplink (Upload Speed)",
        options: [
          { label: "<10 kbps", value: "0-0.01", score: 0.005 },
          { label: "10-100 kbps", value: "0.01-0.1", score: 0.05 },
          { label: "100 kbps - 1 Mbps", value: "0.1-1", score: 0.5 },
          { label: "1-100 Mbps", value: "1-100", score: 50 },
          { label: "100 Mbps - 1 Gbps", value: "100-1000", score: 500 },
          { label: ">1 Gbps", value: "1000+", score: 2000 }
        ]
      }
    ],
    perSiteAnswer: true,
    required: true
  },
  {
    id: 7,
    section: "Connectivity Requirements",
    question: "How many devices or endpoints will connect simultaneously at this site?",
    type: "single",
    options: [
      { label: "1-5 devices", value: "1-5", score: 3 },
      { label: "6-20 devices", value: "6-20", score: 13 },
      { label: "21-50 devices", value: "21-50", score: 35 },
      { label: "51-100 devices", value: "51-100", score: 75 },
      { label: ">100 devices", value: "100+", score: 150 }
    ],
    perSiteAnswer: true,
    required: true
  },
  {
    id: 8,
    section: "Connectivity Requirements",
    question: "What level of network availability (uptime) do you require?",
    type: "single",
    options: [
      { label: "95-98% (Basic - occasional downtime acceptable)", value: "95-98", score: 96.5 },
      { label: "98-99.5% (Standard - minimal downtime)", value: "98-99.5", score: 98.75 },
      { label: "99.5-99.9% (High - very little downtime)", value: "99.5-99.9", score: 99.7 },
      { label: "99.9%+ (Critical - near-zero downtime)", value: "99.9+", score: 99.95 }
    ],
    mappingField: "Availability_SLA_Percent",
    perSiteAnswer: true,
    required: true,
    tooltip: "95% = ~18 days/year downtime, 99.9% = ~9 hours/year downtime"
  },
  {
    id: 9,
    section: "Connectivity Requirements",
    question: "If the primary connection fails, how quickly must the backup connection activate?",
    type: "single",
    options: [
      { label: "Instant (<1 second)", value: "instant", score: 0.5 },
      { label: "Very fast (1-5 seconds)", value: "very_fast", score: 3 },
      { label: "Fast (5-30 seconds)", value: "fast", score: 17.5 },
      { label: "Moderate (30 seconds - 5 minutes)", value: "moderate", score: 165 },
      { label: "Slow (>5 minutes acceptable)", value: "slow", score: 600 }
    ],
    mappingField: "Failover_Time_Seconds",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 10,
    section: "Connectivity Requirements",
    question: "What is the maximum acceptable latency (delay) for your application?",
    type: "single",
    options: [
      { label: "Ultra-low (<20ms) - Real-time control", value: "0-20", score: 10 },
      { label: "Low (<50ms) - VoIP, video calls", value: "20-50", score: 35 },
      { label: "Moderate (<150ms) - Web browsing, email", value: "50-150", score: 100 },
      { label: "High (<300ms) - File transfers, monitoring", value: "150-300", score: 225 },
      { label: "Very high (>300ms acceptable) - Data logging", value: "300+", score: 500 }
    ],
    mappingField: "Latency_Class_ms",
    perSiteAnswer: true,
    required: true,
    tooltip: "Lower latency = faster response time. Satellite typically 500-700ms, Cellular 20-50ms"
  },
  {
    id: 11,
    section: "Connectivity Requirements",
    question: "How many different geographical locations will this connection span?",
    type: "single",
    options: [
      { label: "Single location only", value: "single", score: 1 },
      { label: "2-5 locations", value: "2-5", score: 3 },
      { label: "6-20 locations", value: "6-20", score: 13 },
      { label: "21-50 locations", value: "21-50", score: 35 },
      { label: ">50 locations", value: "50+", score: 75 }
    ],
    perSiteAnswer: false, // This is global
    required: true,
    tooltip: "How many sites/locations will be part of this network deployment?"
  },
  {
    id: 12,
    section: "Technology Preferences",
    question: "What type of connectivity do you prefer as your PRIMARY connection?",
    type: "single",
    options: [
      { label: "Satellite", value: "satellite" },
      { label: "Cellular (4G/5G/LTE)", value: "cellular" },
      { label: "Fiber optic", value: "fiber" },
      { label: "Fixed wireless", value: "fixed_wireless" },
      { label: "No preference", value: "no_preference" }
    ],
    perSiteAnswer: true,
    required: true,
    important: true
  },
  {
    id: 13,
    section: "Technology Preferences",
    question: "Do you require a backup on your site?",
    type: "multiple",
    options: [
      { label: "Satellite", value: "satellite" },
      { label: "Cellular (4G/5G/LTE)", value: "cellular" },
      { label: "Fiber optic", value: "fiber" },
      { label: "Fixed wireless", value: "fixed_wireless" },
      { label: "No backup needed", value: "none" }
    ],
    perSiteAnswer: true,
    required: true,
    important: true
  },
  {
    id: 14,
    section: "Infrastructure",
    question: "Do you already have networking equipment (routers, modems) at the site?",
    type: "single",
    options: [
      { label: "Yes, fully equipped", value: "yes_full" },
      { label: "Partial equipment", value: "partial" },
      { label: "No equipment", value: "none" }
    ],
    perSiteAnswer: true,
    required: true
  },
  {
    id: 15,
    section: "Infrastructure",
    question: "Is there existing cabling/wiring infrastructure at the site?",
    type: "single",
    options: [
      { label: "Yes, ready to use", value: "yes_ready" },
      { label: "Yes, but needs upgrade", value: "yes_upgrade" },
      { label: "No", value: "none" } // FIXED: Added "No" option
    ],
    perSiteAnswer: true,
    required: true
  },
  {
    id: 16,
    section: "Infrastructure",
    question: "What is the power situation at the site?",
    type: "single",
    options: [
      { label: "Reliable grid power available", value: "grid_reliable" },
      { label: "Unreliable/intermittent power", value: "grid_unreliable" },
      { label: "No power - requires solar/generator", value: "no_power" }
    ],
    mappingField: "Power_Profile",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 17,
    section: "Infrastructure",
    question: "If power is unreliable or unavailable, what backup power do you have?",
    type: "multiple",
    options: [
      { label: "Solar panels", value: "solar" },
      { label: "Generator (diesel/gas)", value: "generator" },
      { label: "Battery backup/UPS", value: "battery" },
      { label: "Wind turbine", value: "wind" },
      { label: "None", value: "none" }
    ],
    perSiteAnswer: true,
    required: false,
    conditional: true,
    showWhen: (answers) => {
      const q16Answer = answers[16];
      if (!q16Answer) return false;
      const value = typeof q16Answer === 'object' ? q16Answer.value : q16Answer;
      return value === 'grid_unreliable' || value === 'no_power';
    }
  },
  {
    id: 18,
    section: "Infrastructure",
    question: "Will you need installation and on-site setup support?",
    type: "single",
    options: [
      { label: "Yes, full installation", value: "full" },
      { label: "Yes, partial support", value: "partial" },
      { label: "No, we'll self-install", value: "none" }
    ],
    perSiteAnswer: true,
    required: true
  },
  {
    id: 19,
    section: "Budget & Timeline",
    question: "What is your estimated budget range for this connectivity solution?",
    type: "single",
    options: [
      { label: "<€5,000", value: "0-5000" },
      { label: "€5,000 - €20,000", value: "5000-20000" },
      { label: "€20,000 - €50,000", value: "20000-50000" },
      { label: "€50,000 - €100,000", value: "50000-100000" },
      { label: ">€100,000", value: "100000+" }
    ],
    perSiteAnswer: false, // Global question
    required: true
  },
  {
    id: 20,
    section: "Budget & Timeline",
    question: "When do you need this solution operational?",
    type: "single",
    options: [
      { label: "Immediately (within 1 month)", value: "immediate" },
      { label: "1-3 months", value: "1-3months" },
      { label: "3-6 months", value: "3-6months" },
      { label: "6-12 months", value: "6-12months" },
      { label: ">12 months", value: "12months+" }
    ],
    perSiteAnswer: false, // Global question
    required: true
  },
  {
    id: 21,
    section: "Budget & Timeline",
    question: "Do you require ongoing managed services or support?",
    type: "single",
    options: [
      { label: "Yes, 24/7 managed services", value: "managed_247" },
      { label: "Yes, business hours support", value: "managed_business" },
      { label: "Basic support only", value: "basic" },
      { label: "No support needed", value: "none" },
      { label: "Other", value: "other", hasInput: true } // FIXED: Now properly handles text input
    ],
    perSiteAnswer: false, // Global question
    required: true
  },
    {
  id: 22,
  section: "Site Characteristics",
  question: "Is your site a fixed site or a moving site/vehicle?",
  type: "single",
  options: [
    { 
      value: "fixed", 
      label: "Fixed Site (stationary location)",
      score: { mobility: 0, routerType: "standard" }
    },
    { 
      value: "moving_vehicle", 
      label: "Moving Site/Vehicle (boat, truck, RV, etc.)",
      score: { mobility: 100, routerType: "maritime_mobile" }
    },
    { 
      value: "semi_mobile", 
      label: "Semi-Mobile (occasional relocation)",
      score: { mobility: 50, routerType: "rugged" }
    }
  ],
  required: true,
  perSiteAnswer: true,
  important: true,
  tooltip: "This helps us determine the best router and satellite solution for your mobility needs. Moving sites require maritime/mobile equipment.",
  mappingField: "Site_Type",
  scoringKey: "siteType"
}

];

/**
 * Extract scoring data from answers
 */
export function extractScoringData(answers) {
  const scoring = {
    requirements: {},
    preferences: {},
    constraints: {}
  };

  // Extract from Q5 - Data volume
  if (answers[5]) {
    const option = questionnaireData[4].options.find(o => o.value === (answers[5].value || answers[5]));
    if (option) {
      scoring.requirements.score = option.score;
      scoring.requirements.minGB = option.minGB;
      scoring.requirements.maxGB = option.maxGB;
    }
  }

  // Extract from Q6 - Bandwidth
  if (answers[6]) {
    const downOption = answers[6].downlink;
    const upOption = answers[6].uplink;
    if (downOption) {
      const option = questionnaireData[5].subQuestions[0].options.find(o => o.value === (downOption.value || downOption));
      scoring.requirements.downloadMbps = option?.score || 0;
    }
    if (upOption) {
      const option = questionnaireData[5].subQuestions[1].options.find(o => o.value === (upOption.value || upOption));
      scoring.requirements.uploadMbps = option?.score || 0;
    }
  }

  // Extract from Q8 - Availability
  if (answers[8]) {
    const option = questionnaireData[7].options.find(o => o.value === (answers[8].value || answers[8]));
    scoring.requirements.sla = option?.score || 99;
  }

  // Extract from Q9 - Failover
  if (answers[9]) {
    const option = questionnaireData[8].options.find(o => o.value === (answers[9].value || answers[9]));
    scoring.requirements.failover = option?.score || 10;
  }

  // Extract from Q10 - Latency
  if (answers[10]) {
    const option = questionnaireData[9].options.find(o => o.value === (answers[10].value || answers[10]));
    scoring.requirements.maxLatency = option?.score || 200;
  }

  // Extract from Q12 - Primary technology preference
  if (answers[12]) {
    scoring.preferences.primaryTech = answers[12].value || answers[12];
  }

  // Extract from Q13 - Secondary technology
  if (answers[13]) {
    scoring.preferences.secondaryTech = Array.isArray(answers[13]) 
      ? answers[13].map(t => t.value || t)
      : [answers[13].value || answers[13]];
  }

  // Extract from Q16 - Power
  if (answers[16]) {
    scoring.requirements.power = answers[16].value || answers[16];
  }

  // Extract from Q22 (if in location page) - Site type
  if (answers[22]) {
    scoring.requirements.siteType = answers[22].value || answers[22];
  }

  // Extract from Q3 - Environment
  if (answers[3]) {
    const option = answers[3].option;
    if (option) {
      scoring.requirements.environment = option.value || option;
    }
  }

  return scoring;
}

// Export for use in other components
export const TOTAL_QUESTIONS = questionnaireData.length; // 21 questions (Q22 is in location page)