// data/enhancedQuestionnaireData.js
// Reorganized with Location as Question 1

export const questionnaireData = [
  {
    id: 1,
    section: "Site Location",
    question: "What is the exact location of the site?",
    type: "map-location",
    instruction: "Search for your site location on the map, or click to pin the exact location. This will automatically capture address details.",
    multiSite: true,
    required: true
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
    perSiteAnswer: true
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
    perSiteAnswer: true
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
    perSiteAnswer: true
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
    perSiteAnswer: true
  },
  {
    id: 6,
    section: "Connectivity Requirements",
    question: "What is the average bandwidth requirement for your site?",
    type: "dual-single",
    subQuestions: [
      {
        label: "Downlink",
        options: [
          { label: "<10 kbps", value: "0-0.01", score: 0.005 },
          { label: "10 kbps - 100 kbps", value: "0.01-0.1", score: 0.05 },
          { label: "100 kbps - 1 mbps", value: "0.1-1", score: 0.5 },
          { label: "1 mbps - 100 mbps", value: "1-100", score: 50 },
          { label: "100 mbps - 1 gbps", value: "100-1000", score: 500 },
          { label: ">1 gbps", value: "1000+", score: 2000 }
        ]
      },
      {
        label: "Uplink",
        options: [
          { label: "<10 kbps", value: "0-0.01", score: 0.005 },
          { label: "10 kbps - 100 kbps", value: "0.01-0.1", score: 0.05 },
          { label: "100 kbps - 1 mbps", value: "0.1-1", score: 0.5 },
          { label: "1 mbps - 100 mbps", value: "1-100", score: 50 },
          { label: "100 mbps - 1 gbps", value: "100-1000", score: 500 },
          { label: ">1 gbps", value: "1000+", score: 2000 }
        ]
      }
    ],
    mappingFields: { downlink: "Download_Mbit_s", uplink: "Upload_Mbit_s" },
    perSiteAnswer: true
  },
  {
    id: 7,
    section: "Connectivity Requirements",
    question: "What is the peak bandwidth requirement for your site?",
    type: "dual-single",
    subQuestions: [
      {
        label: "Downlink",
        options: [
          { label: "<10 kbps", value: "0-0.01", score: 0.005 },
          { label: "10 kbps - 100 kbps", value: "0.01-0.1", score: 0.05 },
          { label: "100 kbps - 1 mbps", value: "0.1-1", score: 0.5 },
          { label: "1 mbps - 100 mbps", value: "1-100", score: 50 },
          { label: "100 mbps - 1 gbps", value: "100-1000", score: 500 },
          { label: ">1 gbps", value: "1000+", score: 2000 }
        ]
      },
      {
        label: "Uplink",
        options: [
          { label: "<10 kbps", value: "0-0.01", score: 0.005 },
          { label: "10 kbps - 100 kbps", value: "0.01-0.1", score: 0.05 },
          { label: "100 kbps - 1 mbps", value: "0.1-1", score: 0.5 },
          { label: "1 mbps - 100 mbps", value: "1-100", score: 50 },
          { label: "100 mbps - 1 gbps", value: "100-1000", score: 500 },
          { label: ">1 gbps", value: "1000+", score: 2000 }
        ]
      }
    ],
    mappingFields: { downlink: "Max_Throughput_Mbps", uplink: "Max_Throughput_Mbps" },
    perSiteAnswer: true
  },
  {
    id: 8,
    section: "Connectivity Requirements",
    question: "Choose the required downtime class for your connectivity operations?",
    type: "single",
    options: [
      {
        label: "Best effort",
        value: "best_effort",
        description: "Maximum 36.5 hours per month",
        score: { availability: 95, sla: 95 }
      },
      {
        label: "Business managed",
        value: "business_managed",
        description: "Maximum 43.8 minutes per month",
        score: { availability: 99, sla: 99 }
      },
      {
        label: "Business critical",
        value: "business_critical",
        description: "Maximum 4.5 minutes per month",
        score: { availability: 99.9, sla: 99.9 }
      },
      {
        label: "Mission/Life-Safety critical",
        value: "mission_critical",
        description: "Maximum 26.3 seconds per month",
        score: { availability: 99.99, sla: 99.99 }
      }
    ],
    mappingField: "Availability_SLA_Percent",
    perSiteAnswer: true
  },
  {
    id: 9,
    section: "Connectivity Requirements",
    question: "Choose the required connection recovery time for your connectivity operations?",
    type: "single",
    options: [
      {
        label: "Best effort",
        value: "best_effort",
        description: "Maximum 2 minutes",
        score: { failover: 120, priority: 50 }
      },
      {
        label: "Business managed",
        value: "business_managed",
        description: "Maximum 10 seconds",
        score: { failover: 10, priority: 75 }
      },
      {
        label: "Business critical",
        value: "business_critical",
        description: "Maximum 1 second",
        score: { failover: 1, priority: 90 }
      },
      {
        label: "Mission/Life-Safety critical",
        value: "mission_critical",
        description: "Instantaneous (<100ms)",
        score: { failover: 0.1, priority: 100 }
      }
    ],
    mappingField: "Failover_Time_Seconds",
    perSiteAnswer: true
  },
  {
    id: 10,
    section: "Connectivity Requirements",
    question: "Choose the latency class for your connectivity operations?",
    type: "single",
    options: [
      {
        label: "Best effort",
        value: "best_effort",
        description: "<1000ms",
        score: { latency: 1000, class: "best_effort" }
      },
      {
        label: "Standard",
        value: "standard",
        description: "<500ms",
        score: { latency: 500, class: "standard" }
      },
      {
        label: "Low latency",
        value: "low",
        description: "<100ms",
        score: { latency: 100, class: "low" }
      },
      {
        label: "Ultra-low latency",
        value: "ultra_low",
        description: "<20ms",
        score: { latency: 20, class: "ultra_low" }
      }
    ],
    mappingField: "Latency_Class_ms",
    perSiteAnswer: true
  },
  {
    id: 11,
    section: "Connectivity Requirements",
    question: "What distance should the connection span at your site?",
    type: "single",
    options: [
      { label: "Less than 100 meters (single building/machine)", value: "0-0.1", score: { range: "short" } },
      { label: "100-500 meters (small campus)", value: "0.1-0.5", score: { range: "medium" } },
      { label: "500 meters - 5 km (industrial site)", value: "0.5-5", score: { range: "long" } },
      { label: "5-50 km (remote operations)", value: "5-50", score: { range: "very_long" } },
      { label: ">50 km (distributed assets)", value: "50+", score: { range: "extreme" } }
    ],
    perSiteAnswer: true
  },
  {
    id: 12,
    section: "Technical & Architectural Preferences",
    question: "What is your primary connection type preference?",
    type: "single",
    options: [
      { label: "Satellite", value: "satellite", score: { tech: "satellite", priority: 100 } },
      { label: "Cellular (4G/5G)", value: "cellular", score: { tech: "cellular", priority: 90 } },
      { label: "Fiber", value: "fiber", score: { tech: "fiber", priority: 95 } },
      { label: "Fixed Wireless", value: "fixed_wireless", score: { tech: "wireless", priority: 85 } },
      { label: "Microwave/P2P", value: "microwave", score: { tech: "microwave", priority: 80 } },
      { label: "No preference", value: "none", score: { tech: "any", priority: 50 } }
    ],
    mappingField: "Connectivity_Technology",
    perSiteAnswer: true,
    important: true
  },
  {
    id: 13,
    section: "Technical & Architectural Preferences",
    question: "Do you require a backup or failover connection for load balancing on your site?",
    type: "multiple",
    options: [
      { label: "No", value: "none", score: { redundancy: 0 } },
      { label: "Yes, cellular", value: "cellular", score: { redundancy: 80, backup: "cellular" } },
      { label: "Yes, satellite", value: "satellite", score: { redundancy: 90, backup: "satellite" } },
      { label: "Yes, Fiber", value: "fiber", score: { redundancy: 95, backup: "fiber" } },
      { label: "Yes, Fixed Wireless", value: "fixed_wireless", score: { redundancy: 85, backup: "wireless" } }
    ],
    perSiteAnswer: true,
    important: true
  },
  {
    id: 14,
    section: "Technical & Architectural Preferences",
    question: "How many individual devices or networks need to be connected at the site?",
    type: "single",
    options: [
      { label: "Single machine", value: "1", score: { devices: 1, complexity: 20 } },
      { label: "Local network with <10 devices", value: "2-10", score: { devices: 5, complexity: 50 } },
      { label: "Local network with >10 devices", value: "10+", score: { devices: 20, complexity: 80 } },
      { label: "Multiple segregated networks (OT/IT)", value: "segregated", score: { devices: 50, complexity: 95 } },
      { label: "Other", value: "other", hasInput: true, score: { devices: 10, complexity: 60 } }
    ],
    perSiteAnswer: true
  },
  {
    id: 15,
    section: "Technical & Architectural Preferences",
    question: "Do you need any specialized industrial protocols or capabilities at the site?",
    type: "multiple",
    options: [
      { label: "Modbus", value: "modbus", score: { protocols: 70 } },
      { label: "PROFINET", value: "profinet", score: { protocols: 80 } },
      { label: "IPsec", value: "ipsec", score: { security: 90 } },
      { label: "SD-WAN", value: "sdwan", score: { intelligence: 95 } },
      { label: "Other", value: "other", hasInput: true, score: { protocols: 60 } }
    ],
    perSiteAnswer: true
  },
  {
    id: 16,
    section: "Site Infrastructure & Power",
    question: "What is the primary power source available at the site?",
    type: "single",
    options: [
      { label: "Stable grid power", value: "grid_stable", score: { power: 100, reliability: 95 } },
      { label: "Unreliable grid power", value: "grid_unreliable", score: { power: 60, reliability: 70 } },
      { label: "Generator only", value: "generator", score: { power: 70, reliability: 75 } },
      { label: "Solar/wind hybrid", value: "solar_wind", score: { power: 50, reliability: 60 } },
      { label: "No power - system must generate its own", value: "none", score: { power: 30, reliability: 50 } },
      { label: "Other", value: "other", hasInput: true, score: { power: 65, reliability: 70 } }
    ],
    mappingField: "Power_Profile",
    perSiteAnswer: true
  },
  {
    id: 17,
    section: "Site Infrastructure & Power",
    question: "If power is unreliable or absent, what is the required system uptime (autonomy) during outages?",
    type: "single",
    options: [
      { label: "8 hours", value: "8", score: { autonomy: 60 } },
      { label: "24 hours", value: "24", score: { autonomy: 80 } },
      { label: "7 days", value: "168", score: { autonomy: 100 } }
    ],
    // conditional: true,
    // showWhen: (answers) => {
    //   const q16 = answers[16];
    //   return q16 && (q16.value === "grid_unreliable" || q16.value === "generator" || q16.value === "solar_wind" || q16.value === "none");
    // },
    perSiteAnswer: true
  },
  {
    id: 18,
    section: "Site Infrastructure & Power",
    question: "What is the Housing (shelter, cabinet, rack) for equipment at your site?",
    type: "single",
    options: [
      { label: "Climate-controlled IT room", value: "it_room", score: { housing: 100, environment: "indoor" } },
      { label: "Outdoor IP-rated cabinet", value: "outdoor_cabinet", score: { housing: 80, environment: "outdoor" } },
      { label: "No infrastructure - needs a full outdoor kit", value: "outdoor_kit", score: { housing: 60, environment: "harsh" } },
      { label: "Other", value: "other", hasInput: true, score: { housing: 70, environment: "general" } }
    ],
    mappingField: "Environment_Suitability",
    perSiteAnswer: true
  },
  {
    id: 19,
    section: "Cost & Operational Drivers",
    question: "What is your Ready for Service timeline for this deployment?",
    type: "single",
    options: [
      { label: "<1 month", value: "0-1", score: { urgency: 100, deployment: 30 } },
      { label: "1-3 months", value: "1-3", score: { urgency: 80, deployment: 90 } },
      { label: "3-6 months", value: "3-6", score: { urgency: 60, deployment: 180 } },
      { label: "6-12 months", value: "6-12", score: { urgency: 40, deployment: 360 } },
      { label: ">12 months", value: "12+", score: { urgency: 20, deployment: 540 } }
    ],
    perSiteAnswer: false  // Global question
  },
  {
    id: 20,
    section: "Cost & Operational Drivers",
    question: "What is the expected lifetime of this deployment?",
    type: "single",
    options: [
      { label: "1-6 months", value: "1-6", score: { lifetime: 6, commitment: 20 } },
      { label: "6-12 months", value: "6-12", score: { lifetime: 12, commitment: 40 } },
      { label: "12-36 months", value: "12-36", score: { lifetime: 24, commitment: 70 } },
      { label: "36-60 months", value: "36-60", score: { lifetime: 48, commitment: 90 } },
      { label: ">60 months", value: "60+", score: { lifetime: 84, commitment: 100 } }
    ],
    perSiteAnswer: false  // Global question
  },
  {
    id: 21,
    section: "Cost & Operational Drivers",
    question: "How important are the following constraints/drivers for this deployment?",
    type: "scale",
    options: [
      { label: "Total Cost of Ownership (TCO)", value: "tco" },
      { label: "Upfront Cost (Capex)", value: "capex" },
      { label: "Operational Costs (Opex)", value: "opex" },
      { label: "Deployment Speed", value: "speed" },
      { label: "Maximum Reliability", value: "reliability" },
      { label: "Other", value: "other", hasInput: true }
    ],
    scaleLabels: ["Low", "Medium Low", "Medium", "Medium High", "High"],
    scaleRange: [1, 2, 3, 4, 5],
    scoreMultiplier: 20,
    perSiteAnswer: false  // Global question
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

export const getSectionQuestions = (section) => {
  return questionnaireData.filter(q => q.section === section);
};

export const getAllSections = () => {
  return [...new Set(questionnaireData.map(q => q.section))];
};

// Helper to extract scoring data from answers
export const extractScoringData = (answers) => {
  const scoring = {
    requirements: {},
    preferences: {},
    constraints: {}
  };

  Object.keys(answers).forEach(questionId => {
    const question = questionnaireData.find(q => q.id === parseInt(questionId));
    if (!question) return;

    const answer = answers[questionId];
    
    if (question.type === 'single') {
      const option = Array.isArray(question.options) 
        ? question.options.find(opt => 
            (typeof opt === 'object' ? opt.value : opt) === (typeof answer === 'object' ? answer.value : answer)
          )
        : null;
      
      if (option && option.score) {
        Object.assign(scoring.requirements, option.score);
      }
    } else if (question.type === 'dual-single') {
      if (answer && answer.downlink && answer.uplink) {
        const downlinkOpt = question.subQuestions[0].options.find(o => o.value === answer.downlink.value);
        const uplinkOpt = question.subQuestions[1].options.find(o => o.value === answer.uplink.value);
        
        if (downlinkOpt) scoring.requirements.downloadMbps = downlinkOpt.score;
        if (uplinkOpt) scoring.requirements.uploadMbps = uplinkOpt.score;
      }
    } else if (question.type === 'scale') {
      if (answer && typeof answer === 'object') {
        Object.keys(answer).forEach(key => {
          const importance = answer[key];
          scoring.preferences[key] = importance * (question.scoreMultiplier || 1);
        });
      }
    }
  });

  return scoring;
};

// Available router options (4 routers from StarGrid Peplink)
export const AVAILABLE_ROUTERS = [
  {
    id: "router_1",
    name: "StarGrid Peplink Router Basic",
    category: "router",
    description: "Entry-level industrial router",
    score_requirement: 40
  },
  {
    id: "router_2",
    name: "StarGrid Peplink Router Advanced",
    category: "router",
    description: "Mid-tier router with enhanced features",
    score_requirement: 60
  },
  {
    id: "router_3",
    name: "StarGrid Peplink Router Pro",
    category: "router",
    description: "Professional-grade router",
    score_requirement: 75
  },
  {
    id: "router_4",
    name: "StarGrid Peplink Router Enterprise",
    category: "router",
    description: "Enterprise-level router with full features",
    score_requirement: 85
  }
];
