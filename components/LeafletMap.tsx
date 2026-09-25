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
  lat: number;
  lng: number;
  googleMapsUrl: string;
  features: string[];
}

interface LeafletMapProps {
  hubs: HubLocation[];
  selectedHub: HubLocation;
  onSelectHub: (hub: HubLocation) => void;
}

export default function LeafletMap({ hubs, selectedHub, onSelectHub }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Map
    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: [14.5507, 121.0509], // Default to BGC
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Dark Matter Tile Layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add Markers
    hubs.forEach((hub) => {
      const isActive = hub.id === selectedHub.id;
      
      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div class="map-marker-container ${isActive ? "active" : ""}">
            <div class="marker-pulse"></div>
            <div class="marker-core"></div>
            <div class="marker-label">${hub.name.split(" ")[0]}</div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon })
        .addTo(mapRef.current!)
        .on("click", () => {
          onSelectHub(hub);
        });

      markersRef.current[hub.id] = marker;
    });

    // Fly to selected hub
    if (mapRef.current && selectedHub) {
      mapRef.current.flyTo([selectedHub.lat, selectedHub.lng], 14, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [hubs, selectedHub, onSelectHub]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", borderRadius: "20px", zIndex: 1 }} />;
}
