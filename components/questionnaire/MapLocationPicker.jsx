"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const libraries = ["places"];

// CHANGE: Default to Europe instead of India
const defaultCenter = {
  lat: 50.8503, // Brussels, Belgium (center of Europe)
  lng: 4.3517
};

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "16px"
};

export default function MapLocationPicker({ onLocationSelect, initialLocation, onSiteNameChange }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation && initialLocation.lat ? initialLocation : null
  );
  const [siteName, setSiteName] = useState(
    initialLocation?.siteName || initialLocation?.name || ''
  );
  const [autoSiteNumber, setAutoSiteNumber] = useState(1);
  const [searchBox, setSearchBox] = useState(null);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  // Load existing location when editing
  useEffect(() => {
    if (initialLocation && initialLocation.lat && initialLocation.lng) {
      setSelectedLocation(initialLocation);
      setSiteName(initialLocation.siteName || initialLocation.name || '');
    }
  }, [initialLocation]);

  const onMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    setSelectedLocation({ lat, lng });
    
    // Reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const addressComponents = results[0].address_components;
        const locationData = {
          lat,
          lng,
          address: results[0].formatted_address,
          city: getAddressComponent(addressComponents, 'locality'),
          state: getAddressComponent(addressComponents, 'administrative_area_level_1'),
          country: getAddressComponent(addressComponents, 'country'),
          postalCode: getAddressComponent(addressComponents, 'postal_code')
        };
        setSelectedLocation(locationData);
      }
    });
  }, []);

  const getAddressComponent = (components, type) => {
    const component = components.find(c => c.types.includes(type));
    return component ? component.long_name : '';
  };

  const handleSearchBoxLoad = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        const locationData = {
          lat,
          lng,
          address: place.formatted_address,
          city: getAddressComponent(place.address_components, 'locality'),
          state: getAddressComponent(place.address_components, 'administrative_area_level_1'),
          country: getAddressComponent(place.address_components, 'country'),
          postalCode: getAddressComponent(place.address_components, 'postal_code')
        };
        
        setSelectedLocation(locationData);
        
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(15);
        }
      }
    }
  }, [searchBox]);

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      const finalLocation = {
        ...selectedLocation,
        // CHANGE: Site name is optional, use auto-numbering
        siteName: siteName.trim() || `Site ${autoSiteNumber}`,
        name: siteName.trim() || `Site ${autoSiteNumber}`
      };
      
      onLocationSelect(finalLocation);
      setAutoSiteNumber(prev => prev + 1);
    }
  };

  const handleSiteNameChange = (e) => {
    const newName = e.target.value;
    setSiteName(newName);
    if (onSiteNameChange) {
      onSiteNameChange(newName);
    }
  };

  if (loadError) {
    return (
      <div className="map-error">
        <p>Error loading Google Maps. Please check your API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="map-location-picker">
      <div className="map-location-picker__instructions">
        <h3>📍 Select Site Location</h3>
        <p>Search for a location or click on the map to pin your site</p>
      </div>

      {/* Search Box */}
      <div className="map-location-picker__search">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a location..."
          className="map-location-picker__search-input"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onPlacesChanged();
            }
          }}
        />
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation || defaultCenter}
        zoom={selectedLocation ? 15 : 5}
        onClick={onMapClick}
        onLoad={(map) => {
          mapRef.current = map;
          
          // Initialize search box with Places Autocomplete
          if (searchInputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
              searchInputRef.current,
              { types: ['geocode'] }
            );
            
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                
                const locationData = {
                  lat,
                  lng,
                  address: place.formatted_address,
                  city: getAddressComponent(place.address_components, 'locality'),
                  state: getAddressComponent(place.address_components, 'administrative_area_level_1'),
                  country: getAddressComponent(place.address_components, 'country'),
                  postalCode: getAddressComponent(place.address_components, 'postal_code')
                };
                
                setSelectedLocation(locationData);
                map.panTo({ lat, lng });
                map.setZoom(15);
              }
            });
          }
        }}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            draggable={true}
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              onMapClick({ latLng: e.latLng });
            }}
          />
        )}
      </GoogleMap>

      {/* Location Details */}
      {selectedLocation && (
        <div className="map-location-picker__details">
          <div className="map-location-picker__info">
            <h4>Selected Location</h4>
            <p><strong>Address:</strong> {selectedLocation.address || 'Unknown'}</p>
            <p><strong>City:</strong> {selectedLocation.city || 'Unknown'}</p>
            <p><strong>Country:</strong> {selectedLocation.country || 'Unknown'}</p>
            <p><strong>Coordinates:</strong> {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</p>
          </div>

          {/* CHANGE: Site name is optional */}
          <div className="map-location-picker__name">
            <label htmlFor="siteName">Site Name (Optional)</label>
            <input
              id="siteName"
              type="text"
              value={siteName}
              onChange={handleSiteNameChange}
              placeholder={`Auto: Site ${autoSiteNumber}`}
              className="map-location-picker__name-input"
            />
            <small>Leave empty to auto-number (Site 1, Site 2, etc.)</small>
          </div>

          <button
            onClick={handleConfirmLocation}
            className="map-location-picker__confirm"
          >
            ✓ Confirm Location & Continue
          </button>
        </div>
      )}

      {!selectedLocation && (
        <div className="map-location-picker__help">
          <p>👆 Click anywhere on the map or search for your location above</p>
        </div>
      )}

      <style jsx>{`
        .map-location-picker {
          width: 100%;
        }

        .map-location-picker__instructions {
          margin-bottom: 20px;
          text-align: center;
        }

        .map-location-picker__instructions h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 8px;
        }

        .map-location-picker__instructions p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
        }

        .map-location-picker__search {
          margin-bottom: 20px;
        }

        .map-location-picker__search-input {
          width: 100%;
          padding: 14px 20px;
          font-size: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--techguru-white);
          transition: all 0.3s;
        }

        .map-location-picker__search-input:focus {
          outline: none;
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .map-location-picker__search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .map-location-picker__details {
          margin-top: 24px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .map-location-picker__info h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--techguru-white);
          margin-bottom: 12px;
        }

        .map-location-picker__info p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin: 8px 0;
        }

        .map-location-picker__info strong {
          color: #5CB0E9;
          margin-right: 8px;
        }

        .map-location-picker__name {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .map-location-picker__name label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 8px;
        }

        .map-location-picker__name-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--techguru-white);
        }

        .map-location-picker__name-input:focus {
          outline: none;
          border-color: #3D72FC;
        }

        .map-location-picker__name small {
          display: block;
          margin-top: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .map-location-picker__confirm {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .map-location-picker__confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        .map-location-picker__help {
          margin-top: 20px;
          padding: 16px;
          text-align: center;
          background: rgba(92, 176, 233, 0.1);
          border: 1px solid rgba(92, 176, 233, 0.3);
          border-radius: 12px;
        }

        .map-location-picker__help p {
          font-size: 14px;
          color: #5CB0E9;
          margin: 0;
        }

        .map-loading,
        .map-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          text-align: center;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: #3D72FC;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .map-error p,
        .map-loading p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}