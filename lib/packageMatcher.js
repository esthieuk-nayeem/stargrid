// lib/packageMatcher.js
// Package Building Logic: 1 Router + Primary Connection + Secondary Connection (optional)

/**
 * Available routers from StarGrid Peplink
 */
export const AVAILABLE_ROUTERS = [
  {
    id: "router_peplink_basic",
    name: "StarGrid Peplink Basic Router",
    category: "Router",
    description: "Entry-level industrial router for basic connectivity needs",
    score_requirement: 40,
    matchScore: 70
  },
  {
    id: "router_peplink_advanced",
    name: "StarGrid Peplink Advanced Router",
    category: "Router",
    description: "Mid-tier router with enhanced SD-WAN and failover capabilities",
    score_requirement: 60,
    matchScore: 80
  },
  {
    id: "router_peplink_pro",
    name: "StarGrid Peplink Pro Router",
    category: "Router",
    description: "Professional-grade router with advanced security and protocols",
    score_requirement: 75,
    matchScore: 90
  },
  {
    id: "router_peplink_enterprise",
    name: "StarGrid Peplink Enterprise Router",
    category: "Router",
    description: "Enterprise-level router with full feature set and redundancy",
    score_requirement: 85,
    matchScore: 95
  }
];

/**
 * Select the best router based on average match score
 */
function selectBestRouter(averageMatchScore) {
  // Select router based on score thresholds
  if (averageMatchScore >= 85) {
    return AVAILABLE_ROUTERS[3]; // Enterprise
  } else if (averageMatchScore >= 75) {
    return AVAILABLE_ROUTERS[2]; // Pro
  } else if (averageMatchScore >= 60) {
    return AVAILABLE_ROUTERS[1]; // Advanced
  } else {
    return AVAILABLE_ROUTERS[0]; // Basic
  }
}

/**
 * Build recommended packages for a site
 * @param {Object} siteData - Site information and answers
 * @param {Array} allMatchedProducts - All products matched for this site
 * @returns {Array} - Array of 1-2 packages
 */
export function buildSitePackages(siteData, allMatchedProducts) {
  const { answers } = siteData;
  
  // Get connectivity preferences
  const primaryConnType = answers[12]?.value || null; // Q12: Primary connection type
  const secondaryConnTypes = answers[13] || []; // Q13: Secondary/backup connections
  
  // Check if secondary connection is selected (not "No")
  const hasSecondary = Array.isArray(secondaryConnTypes) && 
    secondaryConnTypes.length > 0 &&
    secondaryConnTypes.some(type => {
      const value = typeof type === 'object' ? type.value : type;
      return value !== 'none' && value !== 'no';
    });
  
  // Calculate average match score for router selection
  const avgScore = allMatchedProducts.length > 0
    ? allMatchedProducts.reduce((sum, p) => sum + p.matchScore, 0) / allMatchedProducts.length
    : 60;
  
  // Select best router
  const selectedRouter = selectBestRouter(avgScore);
  
  // Categorize products
  const satellites = allMatchedProducts.filter(p => 
    (p.Product_Category && p.Product_Category.toLowerCase().includes('satellite')) ||
    (p.Connectivity_Technology && p.Connectivity_Technology.toLowerCase().includes('satellite'))
  );
  
  const cellulars = allMatchedProducts.filter(p => 
    (p.Product_Category && p.Product_Category.toLowerCase().includes('cellular')) ||
    (p.Connectivity_Technology && (
      p.Connectivity_Technology.toLowerCase().includes('cellular') ||
      p.Connectivity_Technology.toLowerCase().includes('4g') ||
      p.Connectivity_Technology.toLowerCase().includes('5g') ||
      p.Connectivity_Technology.toLowerCase().includes('lte')
    ))
  );
  
  const fibers = allMatchedProducts.filter(p => 
    (p.Product_Category && p.Product_Category.toLowerCase().includes('fiber')) ||
    (p.Connectivity_Technology && p.Connectivity_Technology.toLowerCase().includes('fiber'))
  );
  
  const wireless = allMatchedProducts.filter(p => 
    (p.Product_Category && p.Product_Category.toLowerCase().includes('wireless')) ||
    (p.Connectivity_Technology && (
      p.Connectivity_Technology.toLowerCase().includes('wireless') ||
      p.Connectivity_Technology.toLowerCase().includes('wifi')
    ))
  );
  
  const packages = [];
  
  // PACKAGE BUILDING LOGIC
  
  if (primaryConnType === 'satellite') {
    if (hasSecondary) {
      // Check what secondary types are selected
      const hasCellularSecondary = secondaryConnTypes.some(t => {
        const val = typeof t === 'object' ? t.value : t;
        return val === 'cellular';
      });
      
      if (hasCellularSecondary && satellites.length > 0 && cellulars.length > 0) {
        // Package 1: Best Satellite + Best Cellular
        packages.push({
          id: 1,
          name: "Premium Satellite + Cellular Package",
          router: selectedRouter,
          primary: satellites[0],
          secondary: cellulars[0],
          totalScore: Math.round((selectedRouter.matchScore + satellites[0].matchScore + cellulars[0].matchScore) / 3),
          description: "Satellite primary with cellular backup for maximum reliability"
        });
        
        // Package 2: Alternative (if available)
        if (satellites.length > 1 || cellulars.length > 1) {
          packages.push({
            id: 2,
            name: "Standard Satellite + Cellular Package",
            router: selectedRouter,
            primary: satellites[Math.min(1, satellites.length - 1)],
            secondary: cellulars[Math.min(1, cellulars.length - 1)],
            totalScore: Math.round((
              selectedRouter.matchScore + 
              satellites[Math.min(1, satellites.length - 1)].matchScore + 
              cellulars[Math.min(1, cellulars.length - 1)].matchScore
            ) / 3),
            description: "Alternative satellite and cellular combination"
          });
        }
      } else {
        // Secondary is something other than cellular (fiber, wireless, etc.)
        if (satellites.length > 0 && allMatchedProducts.length > 1) {
          packages.push({
            id: 1,
            name: "Satellite + Backup Package",
            router: selectedRouter,
            primary: satellites[0],
            secondary: allMatchedProducts.find(p => p.id !== satellites[0].id),
            totalScore: Math.round((
              selectedRouter.matchScore + 
              satellites[0].matchScore + 
              allMatchedProducts.find(p => p.id !== satellites[0].id).matchScore
            ) / 3),
            description: "Satellite with backup connection"
          });
        }
      }
    } else {
      // Satellite only (no secondary)
      if (satellites.length > 0) {
        packages.push({
          id: 1,
          name: "Satellite-Only Package",
          router: selectedRouter,
          primary: satellites[0],
          secondary: null,
          totalScore: Math.round((selectedRouter.matchScore + satellites[0].matchScore) / 2),
          description: "Single satellite connection for reliable remote connectivity"
        });
        
        // Package 2: Alternative satellite (if available)
        if (satellites.length > 1) {
          packages.push({
            id: 2,
            name: "Alternative Satellite Package",
            router: selectedRouter,
            primary: satellites[1],
            secondary: null,
            totalScore: Math.round((selectedRouter.matchScore + satellites[1].matchScore) / 2),
            description: "Alternative satellite option"
          });
        }
      }
    }
  } else if (primaryConnType === 'cellular') {
    if (hasSecondary) {
      const hasSatelliteSecondary = secondaryConnTypes.some(t => {
        const val = typeof t === 'object' ? t.value : t;
        return val === 'satellite';
      });
      
      if (hasSatelliteSecondary && cellulars.length > 0 && satellites.length > 0) {
        // Package 1: Cellular + Satellite
        packages.push({
          id: 1,
          name: "Cellular + Satellite Backup Package",
          router: selectedRouter,
          primary: cellulars[0],
          secondary: satellites[0],
          totalScore: Math.round((selectedRouter.matchScore + cellulars[0].matchScore + satellites[0].matchScore) / 3),
          description: "Cellular primary with satellite backup for comprehensive coverage"
        });
      } else if (cellulars.length > 1) {
        // Package 1: Dual Cellular
        packages.push({
          id: 1,
          name: "Dual Cellular Package",
          router: selectedRouter,
          primary: cellulars[0],
          secondary: cellulars[1],
          totalScore: Math.round((selectedRouter.matchScore + cellulars[0].matchScore + cellulars[1].matchScore) / 3),
          description: "Dual cellular connections for enhanced reliability and load balancing"
        });
      } else if (cellulars.length > 0 && allMatchedProducts.length > 1) {
        packages.push({
          id: 1,
          name: "Cellular + Backup Package",
          router: selectedRouter,
          primary: cellulars[0],
          secondary: allMatchedProducts.find(p => p.id !== cellulars[0].id),
          totalScore: Math.round((
            selectedRouter.matchScore + 
            cellulars[0].matchScore + 
            allMatchedProducts.find(p => p.id !== cellulars[0].id).matchScore
          ) / 3),
          description: "Cellular with backup connection"
        });
      }
    } else {
      // Cellular only (no secondary)
      if (cellulars.length > 0) {
        packages.push({
          id: 1,
          name: "Cellular-Only Package",
          router: selectedRouter,
          primary: cellulars[0],
          secondary: null,
          totalScore: Math.round((selectedRouter.matchScore + cellulars[0].matchScore) / 2),
          description: "Single cellular connection for cost-effective connectivity"
        });
        
        // Package 2: Alternative cellular (if available)
        if (cellulars.length > 1) {
          packages.push({
            id: 2,
            name: "Alternative Cellular Package",
            router: selectedRouter,
            primary: cellulars[1],
            secondary: null,
            totalScore: Math.round((selectedRouter.matchScore + cellulars[1].matchScore) / 2),
            description: "Alternative cellular option"
          });
        }
      }
    }
  } else if (primaryConnType === 'fiber' && fibers.length > 0) {
    if (hasSecondary && allMatchedProducts.length > 1) {
      packages.push({
        id: 1,
        name: "Fiber + Backup Package",
        router: selectedRouter,
        primary: fibers[0],
        secondary: allMatchedProducts.find(p => p.id !== fibers[0].id),
        totalScore: Math.round((
          selectedRouter.matchScore + 
          fibers[0].matchScore + 
          allMatchedProducts.find(p => p.id !== fibers[0].id).matchScore
        ) / 3),
        description: "High-speed fiber with backup connection"
      });
    } else {
      packages.push({
        id: 1,
        name: "Fiber-Only Package",
        router: selectedRouter,
        primary: fibers[0],
        secondary: null,
        totalScore: Math.round((selectedRouter.matchScore + fibers[0].matchScore) / 2),
        description: "High-speed fiber connection"
      });
    }
  } else if (primaryConnType === 'fixed_wireless' && wireless.length > 0) {
    if (hasSecondary && allMatchedProducts.length > 1) {
      packages.push({
        id: 1,
        name: "Fixed Wireless + Backup Package",
        router: selectedRouter,
        primary: wireless[0],
        secondary: allMatchedProducts.find(p => p.id !== wireless[0].id),
        totalScore: Math.round((
          selectedRouter.matchScore + 
          wireless[0].matchScore + 
          allMatchedProducts.find(p => p.id !== wireless[0].id).matchScore
        ) / 3),
        description: "Fixed wireless with backup connection"
      });
    } else {
      packages.push({
        id: 1,
        name: "Fixed Wireless Package",
        router: selectedRouter,
        primary: wireless[0],
        secondary: null,
        totalScore: Math.round((selectedRouter.matchScore + wireless[0].matchScore) / 2),
        description: "Fixed wireless connection"
      });
    }
  } else {
    // Fallback: No specific preference or preference not available
    if (allMatchedProducts.length > 0) {
      const primary = allMatchedProducts[0];
      const secondary = hasSecondary && allMatchedProducts.length > 1 ? allMatchedProducts[1] : null;
      
      packages.push({
        id: 1,
        name: "Recommended Package",
        router: selectedRouter,
        primary: primary,
        secondary: secondary,
        totalScore: secondary 
          ? Math.round((selectedRouter.matchScore + primary.matchScore + secondary.matchScore) / 3)
          : Math.round((selectedRouter.matchScore + primary.matchScore) / 2),
        description: "Best matched configuration based on your requirements"
      });
      
      // Package 2: Alternative if available
      if (allMatchedProducts.length > 2) {
        packages.push({
          id: 2,
          name: "Alternative Package",
          router: selectedRouter,
          primary: allMatchedProducts[1],
          secondary: hasSecondary ? allMatchedProducts[2] : null,
          totalScore: hasSecondary && allMatchedProducts[2]
            ? Math.round((selectedRouter.matchScore + allMatchedProducts[1].matchScore + allMatchedProducts[2].matchScore) / 3)
            : Math.round((selectedRouter.matchScore + allMatchedProducts[1].matchScore) / 2),
          description: "Alternative configuration option"
        });
      }
    } else {
      // No products matched - return router only
      packages.push({
        id: 1,
        name: "Router Only",
        router: selectedRouter,
        primary: null,
        secondary: null,
        totalScore: selectedRouter.matchScore,
        description: "No suitable connectivity products found - router only"
      });
    }
  }
  
  // Ensure we return 1-2 packages (min 1, max 2)
  if (packages.length === 0) {
    // Fallback package with router and best available product
    packages.push({
      id: 1,
      name: "Basic Package",
      router: selectedRouter,
      primary: allMatchedProducts[0] || null,
      secondary: null,
      totalScore: allMatchedProducts[0] 
        ? Math.round((selectedRouter.matchScore + allMatchedProducts[0].matchScore) / 2)
        : selectedRouter.matchScore,
      description: "Basic connectivity package"
    });
  }
  
  return packages.slice(0, 2); // Return max 2 packages
}

/**
 * Build packages for all sites
 */
export function buildAllSitePackages(sites, productMatchesBySite) {
  const allSitePackages = {};
  
  sites.forEach(site => {
    const siteProducts = productMatchesBySite[site.id] || [];
    allSitePackages[site.id] = buildSitePackages(site, siteProducts);
  });
  
  return allSitePackages;
}
