"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface HubLocationItem {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coords: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  features: string[];
}

interface LeafletMapProps {
  hubs: HubLocationItem[];
  selectedHub: HubLocationItem;
  onSelectHub: (hub: HubLocationItem) => void;
}

export default function LeafletMap({
  hubs,
  selectedHub,
  onSelectHub,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet Map centered over Central Philippines
    const map = L.map(mapContainerRef.current, {
      center: [13.4, 122.2],
      zoom: 6.4,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Custom Dark Zoom Controls at top-right
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map);

    // CartoDB Dark Matter dark mode tile layer (free, fast, no API key needed)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Add Attribution at bottom-right
    L.control
      .attribution({
        position: "bottomright",
        prefix: false,
      })
      .addAttribution(
        '&copy; <a href="https://carto.com/" target="_blank" rel="noreferrer">CARTO</a> | DriveX Telemetry'
      )
      .addTo(map);

    // Create markers for each hub
    hubs.forEach((hub) => {
      const isSelected = hub.id === selectedHub.id;

      const customIcon = L.divIcon({
        className: "custom-leaflet-pin-wrapper",
        html: `
          <div class="custom-leaflet-pin ${isSelected ? "selected" : ""}" id="marker-${hub.id}">
            <div class="pin-pulse"></div>
            <div class="pin-ring"></div>
            <div class="pin-dot"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);

      // Glassmorphic popup content
      const popupHtml = `
        <div class="leaflet-dark-popup">
          <div class="popup-badge">${hub.category}</div>
          <h3>${hub.name}</h3>
          <p class="popup-addr">${hub.address}</p>
          <div class="popup-meta">
            <span>🕒 ${hub.hours}</span>
            <span>📞 ${hub.phone}</span>
          </div>
          <div class="popup-actions">
            <a href="${hub.googleMapsUrl}" target="_blank" rel="noreferrer" class="popup-nav-btn">
              Open Google Maps ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "dark-glass-popup-wrapper",
        closeButton: true,
        maxWidth: 290,
      });

      marker.on("click", () => {
        onSelectHub(hub);
      });

      markersRef.current[hub.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Whenever selectedHub changes, update active marker styling and flyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Update active marker styling
    hubs.forEach((hub) => {
      const markerElem = document.getElementById(`marker-${hub.id}`);
      if (markerElem) {
        if (hub.id === selectedHub.id) {
          markerElem.classList.add("selected");
        } else {
          markerElem.classList.remove("selected");
        }
      }
    });

    // Smoothly flyTo the selected hub with smooth cinematic speed
    map.flyTo([selectedHub.lat, selectedHub.lng], 14, {
      duration: 1.4,
      easeLinearity: 0.25,
    });

    // Open popup after flyTo completes
    setTimeout(() => {
      const activeMarker = markersRef.current[selectedHub.id];
      if (activeMarker) {
        activeMarker.openPopup();
      }
    }, 850);
  }, [selectedHub]);

  return (
    <div className="leaflet-map-wrapper">
      <div ref={mapContainerRef} className="leaflet-map-element" />

      {/* Map Overlay HUD Toolbar */}
      <div className="leaflet-hud-overlay">
        <div className="leaflet-hud-pill">
          <span className="hud-radar-dot" />
          <span>RADAR TELEMETRY // CARTO DARK MATTER // 5 HUBS</span>
        </div>
        <button
          type="button"
          className="leaflet-reset-view-btn"
          onClick={() => {
            const map = mapInstanceRef.current;
            if (map) {
              map.flyTo([13.4, 122.2], 6.4, { duration: 1.2 });
            }
          }}
          title="Reset Map View"
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
