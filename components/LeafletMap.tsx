"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface HubLocation {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coords?: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  features: string[];
}

export type HubLocationItem = HubLocation;

interface LeafletMapProps {
  hubs: HubLocation[];
  selectedHub: HubLocation;
  onSelectHub: (hub: HubLocation) => void;
}

export default function LeafletMap({
  hubs,
  selectedHub,
  onSelectHub,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Map
    if (!mapRef.current) {
      const map = L.map(containerRef.current, {
        center: [selectedHub.lat, selectedHub.lng],
        zoom: 13,
        minZoom: 5,
        maxZoom: 19,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // OpenStreetMap Standard Street Map (Free, vibrant street colors, roads, parks, blue ocean, NO dark void on zoom out)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
        subdomains: ["a", "b", "c"],
        maxZoom: 19,
        minZoom: 5,
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add Markers
    hubs.forEach((hub) => {
      const isSelected = hub.id === selectedHub.id;

      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div class="map-marker-container ${isSelected ? "active" : ""}" id="marker-${hub.id}">
            <div class="marker-pulse"></div>
            <div class="marker-core"></div>
            <div class="marker-label">${hub.name.split(" ")[0]}</div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon })
        .addTo(map)
        .on("click", () => {
          onSelectHub(hub);
        });

      // Custom rich popup
      const popupContent = `
        <div class="leaflet-popup-card">
          <div class="leaflet-popup-badge">${hub.category}</div>
          <div class="leaflet-popup-title">${hub.name}</div>
          <div class="leaflet-popup-address">📍 ${hub.address}</div>
          <div class="leaflet-popup-meta">
            <span>🕒 ${hub.hours}</span>
            <span>📞 ${hub.phone}</span>
          </div>
          <a href="${hub.googleMapsUrl}" target="_blank" rel="noreferrer" class="leaflet-popup-link">
            Directions on Google Maps ↗
          </a>
        </div>
      `;
      marker.bindPopup(popupContent, {
        className: "drivex-custom-popup",
        closeButton: true,
        maxWidth: 280,
      });

      markersRef.current[hub.id] = marker;
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map view & active marker styling when selected hub changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedHub) return;

    // Fly smoothly to selected hub
    map.flyTo([selectedHub.lat, selectedHub.lng], 14, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    // Update active class on markers in DOM
    hubs.forEach((hub) => {
      const elem = document.getElementById(`marker-${hub.id}`);
      if (elem) {
        if (hub.id === selectedHub.id) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
      }
    });

    // Open popup after flyTo completes
    const activeMarker = markersRef.current[selectedHub.id];
    if (activeMarker) {
      setTimeout(() => {
        activeMarker.openPopup();
      }, 700);
    }
  }, [selectedHub]);

  return (
    <div className="leaflet-map-wrapper">
      <div ref={containerRef} className="leaflet-map-element" />
    </div>
  );
}

