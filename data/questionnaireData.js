export const questionnaireData = [
  {
    id: 1,
    section: "Project & Site Basics",
    question: "What is the primary use case for this industrial site?",
    type: "single",
    options: [
      "Mining Operation",
      "Remote Oil/Gas Well",
      "Smart Farm/Irrigation",
      "Construction Site",
      "Offshore Platform",
      "Utility Substation",
      "Factory/Plant",
      "Emergency Response Unit",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 2,
    section: "Project & Site Basics",
    question: "What is the exact location of the site?",
    type: "location",
    fields: [
      { name: "country", label: "Country", type: "text" },
      { name: "zip", label: "ZIP Code", type: "text" },
      { name: "city", label: "City", type: "text" }
    ],
    multiSite: true
  },
  {
    id: 3,
    section: "Project & Site Basics",
    question: "How would you describe the physical and security environment of your site?",
    type: "single-with-checkbox",
    options: [
      "Urban location, fenced",
      "Industrial yard, fenced",
      "Extremely remote/unmanned",
      "Harsh environment (dust, salt, vibration)",
      "Offshore"
    ],
    additionalCheckbox: "High-theft-risk area"
  },
  {
    id: 4,
    section: "Connectivity Requirements",
    question: "What is the primary purpose of the connection for your site?",
    type: "single",
    options: [
      "SCADA/Telemetry data",
      "CCTV/Video surveillance backhaul",
      "VoIP communications",
      "Remote desktop/IT access",
      "Bulk data transfer (plans, logs)",
      "Real-time control and monitoring",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 5,
    section: "Connectivity Requirements",
    question: "What is the estimated average monthly data volume for your site?",
    type: "single",
    options: [
      "<1 GB",
      "1-10 GB",
      "10-100 GB",
      "100 GB - 1 TB",
      ">1 TB"
    ]
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
          "<10 kbps",
          "10 kbps - 100 kbps",
          "100 kbps - 1 mbps",
          "1 mbps - 100 mbps",
          "100 mbps - 1 gbps",
          ">1 gbps"
        ]
      },
      {
        label: "Uplink",
        options: [
          "<10 kbps",
          "10 kbps - 100 kbps",
          "100 kbps - 1 mbps",
          "1 mbps - 100 mbps",
          "100 mbps - 1 gbps",
          ">1 gbps"
        ]
      }
    ]
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
          "<10 kbps",
          "10 kbps - 100 kbps",
          "100 kbps - 1 mbps",
          "1 mbps - 100 mbps",
          "100 mbps - 1 gbps",
          ">1 gbps"
        ]
      },
      {
        label: "Uplink",
        options: [
          "<10 kbps",
          "10 kbps - 100 kbps",
          "100 kbps - 1 mbps",
          "1 mbps - 100 mbps",
          "100 mbps - 1 gbps",
          ">1 gbps"
        ]
      }
    ]
  },
  {
    id: 8,
    section: "Connectivity Requirements",
    question: "Choose the required downtime class for your connectivity operations?",
    type: "single",
    options: [
      {
        value: "best-effort",
        label: "Best effort",
        description: "Maximum 36.5 hours per month"
      },
      {
        value: "business-managed",
        label: "Business managed",
        description: "Maximum 43.8 minutes per month"
      },
      {
        value: "business-critical",
        label: "Business critical",
        description: "Maximum 4.5 minutes per month"
      },
      {
        value: "mission-critical",
        label: "Mission/Life-Safety critical",
        description: "Maximum 26.3 seconds per month"
      }
    ]
  },
  {
    id: 9,
    section: "Connectivity Requirements",
    question: "Choose the required connection recovery time for your connectivity operations?",
    type: "single",
    options: [
      {
        value: "best-effort",
        label: "Best effort",
        description: "Maximum 2 minutes"
      },
      {
        value: "business-managed",
        label: "Business managed",
        description: "Maximum 10 seconds"
      },
      {
        value: "business-critical",
        label: "Business critical",
        description: "Maximum 1 second"
      },
      {
        value: "mission-critical",
        label: "Mission/Life-Safety critical",
        description: "Maximum 100 milliseconds"
      }
    ]
  },
  {
    id: 10,
    section: "Connectivity Requirements",
    question: "What is the maximum acceptable latency (delay) for your applications?",
    type: "single",
    options: [
      {
        value: ">500ms",
        label: ">500ms is fine",
        description: "Suitable for email"
      },
      {
        value: "<200ms",
        label: "<200ms needed",
        description: "For basic remote control"
      },
      {
        value: "<50ms",
        label: "<50ms essential",
        description: "For real-time control, VoIP"
      }
    ]
  },
  {
    id: 11,
    section: "Connectivity Requirements",
    question: "Do your applications need constant latency?",
    type: "boolean",
    options: ["Yes", "No"]
  },
  {
    id: 12,
    section: "Technical & Architectural Preferences",
    question: "What is the preferred PRIMARY connectivity type on your site?",
    type: "single",
    options: [
      "Cellular (4G/LTE/5G)",
      "Satellite (GEO, MEO, LEO like Starlink)",
      "Fiber",
      "Fixed Wireless",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 13,
    section: "Technical & Architectural Preferences",
    question: "Do you require a backup or failover connection for load balancing on your site?",
    type: "multiple",
    options: [
      "No",
      "Yes, cellular",
      "Yes, satellite",
      "Yes, Fiber",
      "Yes, Fixed Wireless"
    ]
  },
  {
    id: 14,
    section: "Technical & Architectural Preferences",
    question: "How many individual devices or networks need to be connected at the site?",
    type: "single",
    options: [
      "Single machine",
      "Local network with <10 devices (cameras, sensors, computers)",
      "Local network with >10 devices (cameras, sensors, computers)",
      "Multiple segregated networks (OT/IT)",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 15,
    section: "Technical & Architectural Preferences",
    question: "Do you need any specialized industrial protocols or capabilities at the site?",
    type: "multiple",
    options: [
      "Modbus",
      "PROFINET",
      "IPsec",
      "SD-WAN",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 16,
    section: "Site Infrastructure & Power",
    question: "What is the primary power source available at the site?",
    type: "single",
    options: [
      "Stable grid power",
      "Unreliable grid power",
      "Generator only",
      "Solar/wind hybrid",
      "No power - system must generate its own",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 17,
    section: "Site Infrastructure & Power",
    question: "If power is unreliable or absent, what is the required system uptime (autonomy) during outages?",
    type: "single",
    options: [
      "8 hours",
      "24 hours",
      "7 days"
    ],
    conditional: true,
    showWhen: (answers) => {
      const q16 = answers[16];
      return q16 && (q16.includes("Unreliable") || q16.includes("Generator") || q16.includes("Solar") || q16.includes("No power"));
    }
  },
  {
    id: 18,
    section: "Site Infrastructure & Power",
    question: "What is the Housing (shelter, cabinet, rack) for equipment at your site?",
    type: "single",
    options: [
      "Climate-controlled IT room",
      "Outdoor IP-rated cabinet",
      "No infrastructure - needs a full outdoor kit",
      { value: "other", label: "Other", hasInput: true }
    ]
  },
  {
    id: 19,
    section: "Cost & Operational Drivers",
    question: "What is your Ready for Service timeline for this deployment?",
    type: "single",
    options: [
      "<1 month",
      "1-3 months",
      "3-6 months",
      "6-12 months",
      ">12 months"
    ]
  },
  {
    id: 20,
    section: "Cost & Operational Drivers",
    question: "What is the expected lifetime of this deployment?",
    type: "single",
    options: [
      "1-6 months",
      "6-12 months",
      "12-36 months",
      "36-60 months",
      ">60 months"
    ]
  },
  {
    id: 21,
    section: "Cost & Operational Drivers",
    question: "How important are the following constraints/drivers for this deployment?",
    type: "scale",
    options: [
      "Total Cost of Ownership (TCO)",
      "Upfront Cost (Capex)",
      "Operational Costs (Opex)",
      "Deployment Speed",
      "Maximum Reliability",
      { value: "other", label: "Other", hasInput: true }
    ],
    scaleLabels: ["Low", "Medium Low", "Medium", "Medium High", "High"],
    scaleRange: [1, 2, 3, 4, 5]
  }
];

export const getSectionQuestions = (section) => {
  return questionnaireData.filter(q => q.section === section);
};

export const getAllSections = () => {
  return [...new Set(questionnaireData.map(q => q.section))];
};
