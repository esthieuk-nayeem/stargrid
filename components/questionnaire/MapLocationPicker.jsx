"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * MapLocationPicker Component
 * Uses Google Maps API for location selection
 * Note: You'll need to add Google Maps script to your app
 */
export default function MapLocationPicker({ onLocationSelect, initialLocation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(initialLocation || {
    lat: 20.5937,
    lng: 78.9629,
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    siteName: ""
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Initialize map
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      setMapLoaded(true);
    } else {
      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWUAA7qLqoCfh4i9N0HxkkJ0WKJdkJ-l0&libraries=places`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
  }, []);


  useEffect(() => {
  // Check if location already exists (editing mode)
  if (initialLocation && initialLocation.lat && initialLocation.lng) {
    setSelectedLocation(initialLocation);
    setSiteName(initialLocation.siteName || '');
    // Map will center on existing location
  }
}, [initialLocation]);

  // Create map instance
  useEffect(() => {
    if (mapLoaded && !map) {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: location.lat, lng: location.lng },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false
      });

      const markerInstance = new window.google.maps.Marker({
        map: mapInstance,
        position: { lat: location.lat, lng: location.lng },
        draggable: true
      });

      // Handle marker drag
      markerInstance.addListener('dragend', () => {
        const pos = markerInstance.getPosition();
        handleMapClick(pos.lat(), pos.lng());
      });

      // Handle map click
      mapInstance.addListener('click', (e) => {
        handleMapClick(e.latLng.lat(), e.latLng.lng());
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    }
  }, [mapLoaded]);

  const handleMapClick = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    
    try {
      const result = await geocoder.geocode({ location: { lat, lng } });
      
      if (result.results[0]) {
        const place = result.results[0];
        const addressComponents = place.address_components || [];
        
        const locationData = {
          lat,
          lng,
          address: place.formatted_address || "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          siteName: location.siteName
        };

        addressComponents.forEach(component => {
          const types = component.types;
          if (types.includes("locality")) {
            locationData.city = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            locationData.state = component.long_name;
          }
          if (types.includes("country")) {
            locationData.country = component.long_name;
          }
          if (types.includes("postal_code")) {
            locationData.postalCode = component.long_name;
          }
        });

        setLocation(locationData);
        marker.setPosition({ lat, lng });
        map.panTo({ lat, lng });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !mapLoaded) return;

    const geocoder = new window.google.maps.Geocoder();
    
    try {
      const result = await geocoder.geocode({ address: searchQuery });
      
      if (result.results[0]) {
        const place = result.results[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        handleMapClick(lat, lng);
        setSearchQuery(place.formatted_address);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSiteNameChange = (e) => {
    const siteName = e.target.value;
    const updatedLocation = { ...location, siteName };
    setLocation(updatedLocation);
  };

  const handleConfirm = () => {
    if (location.lat && location.lng && location.siteName) {
      onLocationSelect(location);
    }
  };

  return (
    <div className="map-location-picker">
      <div className="map-location-picker__inputs">
        <div className="map-location-picker__input-group">
          <label>Site Name *</label>
          <input
            type="text"
            placeholder="e.g., Main Mining Site, Remote Oil Well #3"
            value={location.siteName}
            onChange={handleSiteNameChange}
            className="map-location-picker__input"
          />
        </div>

        <div className="map-location-picker__input-group">
          <label>Search Location</label>
          <div className="map-location-picker__search">
            <input
              type="text"
              placeholder="Search for address, city, or coordinates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="map-location-picker__input"
            />
            <button 
              type="button"
              onClick={handleSearch}
              className="map-location-picker__search-btn"
            >
              🔍 Search
            </button>
          </div>
        </div>
      </div>

      <div className="map-location-picker__map-container">
        <div id="map" className="map-location-picker__map"></div>
        {!mapLoaded && (
          <div className="map-location-picker__loading">
            Loading map...
          </div>
        )}
      </div>

      {location.address && (
        <div className="map-location-picker__details">
          <h4>📍 Selected Location</h4>
          <div className="map-location-picker__detail-grid">
            <div>
              <span className="label">Address:</span>
              <span className="value">{location.address}</span>
            </div>
            {location.city && (
              <div>
                <span className="label">City:</span>
                <span className="value">{location.city}</span>
              </div>
            )}
            {location.state && (
              <div>
                <span className="label">State/Province:</span>
                <span className="value">{location.state}</span>
              </div>
            )}
            {location.country && (
              <div>
                <span className="label">Country:</span>
                <span className="value">{location.country}</span>
              </div>
            )}
            {location.postalCode && (
              <div>
                <span className="label">Postal Code:</span>
                <span className="value">{location.postalCode}</span>
              </div>
            )}
            <div>
              <span className="label">Coordinates:</span>
              <span className="value">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="map-location-picker__actions">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!location.siteName || !location.lat || !location.lng}
          className="map-location-picker__confirm-btn"
        >
          ✓ Confirm Location & Continue
        </button>
      </div>

      <style jsx>{`
        .map-location-picker {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .map-location-picker__inputs {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .map-location-picker__input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .map-location-picker__input-group label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .map-location-picker__input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: var(--techguru-white);
          font-size: 15px;
          outline: none;
          transition: all 0.3s ease;
        }

        .map-location-picker__input:focus {
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .map-location-picker__input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .map-location-picker__search {
          display: flex;
          gap: 12px;
        }

        .map-location-picker__search-btn {
          padding: 14px 24px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .map-location-picker__search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.3);
        }

        .map-location-picker__map-container {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .map-location-picker__map {
          width: 100%;
          height: 100%;
        }

        .map-location-picker__loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 16px;
        }

        .map-location-picker__details {
          padding: 20px;
          background: rgba(61, 114, 252, 0.08);
          border: 1px solid rgba(61, 114, 252, 0.2);
          border-radius: 12px;
        }

        .map-location-picker__details h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--techguru-white);
          margin-bottom: 16px;
        }

        .map-location-picker__detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .map-location-picker__detail-grid > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .map-location-picker__detail-grid .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .map-location-picker__detail-grid .value {
          font-size: 14px;
          color: var(--techguru-white);
          font-weight: 500;
        }

        .map-location-picker__actions {
          display: flex;
          justify-content: flex-end;
        }

        .map-location-picker__confirm-btn {
          padding: 16px 32px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .map-location-picker__confirm-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(61, 114, 252, 0.4);
        }

        .map-location-picker__confirm-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .map-location-picker__search {
            flex-direction: column;
          }

          .map-location-picker__search-btn {
            width: 100%;
          }

          .map-location-picker__map-container {
            height: 300px;
          }

          .map-location-picker__detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
