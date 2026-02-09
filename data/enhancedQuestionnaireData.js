// data/enhancedQuestionnaireData.js
// CORRECTED VERSION - Q2 removed (location picked from map)

export const questionnaireData = [
  {
    id: 1,
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
  // Q2 REMOVED - Location is picked from map
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 6,
    section: "Connectivity Requirements",
    question: "What is the peak bandwidth requirement for your site?",
    type: "dual-single2",
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 7,
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 8,
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
        score: { failover: 10, priority: 70 }
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
        description: "Maximum 100 milliseconds",
        score: { failover: 0.1, priority: 100 }
      }
    ],
    mappingField: "Failover_Time_Seconds",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 9,
    section: "Connectivity Requirements",
    question: "What is the maximum acceptable latency (delay) for your applications?",
    type: "single",
    options: [
      {
        label: ">500ms is fine",
        value: "500+",
        description: "Suitable for email",
        score: { latency: 40, maxLatency: 1000 }
      },
      {
        label: "<200ms needed",
        value: "200",
        description: "For basic remote control",
        score: { latency: 70, maxLatency: 200 }
      },
      {
        label: "<50ms essential",
        value: "50",
        description: "For real-time control, VoIP",
        score: { latency: 95, maxLatency: 50 }
      }
    ],
    mappingField: "Latency_Class_ms",
    perSiteAnswer: true,
    required: true
  },
  {
    id: 10,
    section: "Connectivity Requirements",
    question: "Do your applications need constant latency?",
    type: "boolean",
    options: ["Yes", "No"],
    score: { yes: { jitter: 95 }, no: { jitter: 60 } },
    perSiteAnswer: true,
    required: true
  },
  {
    id: 11,
    section: "Technical & Architectural Preferences",
    question: "What is the preferred PRIMARY connectivity type on your site?",
    type: "single",
    options: [
      { label: "Cellular (4G/LTE/5G)", value: "cellular", score: { tech: "cellular", weight: 100 } },
      { label: "Satellite (GEO, MEO, LEO like Starlink)", value: "satellite", score: { tech: "satellite", weight: 100 } },
      { label: "Fiber", value: "fiber", score: { tech: "fiber", weight: 100 } },
      { label: "Fixed Wireless", value: "fixed_wireless", score: { tech: "wireless", weight: 100 } },
      { label: "Other", value: "other", hasInput: true, score: { tech: "mixed", weight: 50 } }
    ],
    mappingField: "Connectivity_Technology",
    perSiteAnswer: true,
    required: true,
    important: true
  },
  {
    id: 12,
    section: "Technical & Architectural Preferences",
    question: "Do you require a secondary connection on your site?",
    type: "single",
    options: [
      { label: "No", value: "none", score: { redundancy: 0 } },
      { label: "Yes, cellular", value: "cellular", score: { redundancy: 80, backup: "cellular" } },
      { label: "Yes, satellite", value: "satellite", score: { redundancy: 90, backup: "satellite" } },
      { label: "Yes, Fiber", value: "fiber", score: { redundancy: 95, backup: "fiber" } },
      { label: "Yes, Fixed Wireless", value: "fixed_wireless", score: { redundancy: 85, backup: "wireless" } }
    ],
    perSiteAnswer: true,
    required: true,
    important: true
  },
  {
    id: 13,
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 14,
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 15,
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 16,
    section: "Site Infrastructure & Power",
    question: "If power is unreliable or absent, what is the required system uptime (autonomy) during outages?",
    type: "single",
    options: [
      { label: "8 hours", value: "8", score: { autonomy: 60 } },
      { label: "24 hours", value: "24", score: { autonomy: 80 } },
      { label: "7 days", value: "168", score: { autonomy: 100 } }
    ],
    perSiteAnswer: true,
    required: false
  },
  {
    id: 17,
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
    perSiteAnswer: true,
    required: true
  },
  {
    id: 18,
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
    perSiteAnswer: false,
    required: true
  },
  {
    id: 19,
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
    perSiteAnswer: false,
    required: true
  },
  {
    id: 20,
    section: "Cost & Operational Drivers",
    question: "How important are the following constraints/drivers for this deployment?",
    type: "scale",
    options: [
      { label: "Total Cost of Ownership (TCO)", value: "tco" },
      { label: "Upfront Cost (Capex)", value: "capex" },
      { label: "Operational Costs (Opex)", value: "opex" },
      { label: "Deployment Speed", value: "speed" },
      { label: "Maximum Reliability", value: "reliability" },
      // { label: "Other", value: "other", hasInput: true }
    ],
    scaleLabels: ["Low", "Medium Low", "Medium", "Medium High", "High"],
    scaleRange: [1, 2, 3, 4, 5],
    scoreMultiplier: 20,
    perSiteAnswer: false,
    required: true
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
  return scoring;
}

// Total: 20 questions (Q2 location removed, picked from map)
export const TOTAL_QUESTIONS = questionnaireData.length;