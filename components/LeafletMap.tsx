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
      mapRef.current = L.map(containerRef.current, {
        center: [14.5507, 121.0509], // Default to BGC
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Esri World Dark Gray Base Tile Layer (100% Free, NO API KEY REQUIRED, NO WATERMARKS)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Esri, DeLorme, NAVTEQ",
          maxZoom: 16,
        }
      ).addTo(mapRef.current);
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

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map view when selected hub changes
  useEffect(() => {
    if (mapRef.current && selectedHub) {
      mapRef.current.flyTo([selectedHub.lat, selectedHub.lng], 14, {
        duration: 1.2,
      });
    }
  }, [selectedHub]);

  return (
    <div className="leaflet-map-wrapper">
      <div ref={containerRef} className="leaflet-map-element" />
    </div>
  );
}
