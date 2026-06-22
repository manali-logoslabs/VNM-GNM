import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function IndiaStateMap({ selectedState, onStateSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  const coverageStates = [
    { key: 'karnataka', name: 'Karnataka', number: 1, color: '#16a34a', lat: 15.3, lng: 75.8 },
    { key: 'maharashtra', name: 'Maharashtra', number: 2, color: '#2563eb', lat: 19.3, lng: 75.7 },
    { key: 'rajasthan', name: 'Rajasthan', number: 3, color: '#f97316', lat: 27.5, lng: 73.5 },
    { key: 'meghalaya', name: 'Meghalaya', number: 4, color: '#a855f7', lat: 25.5, lng: 91.8 },
    { key: 'chhattisgarh', name: 'Chhattisgarh', number: 5, color: '#dc2626', lat: 22.0, lng: 82.5 }
  ]

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize Leaflet map
    const map = L.map(mapRef.current).setView([23, 82], 5)

    // Add clean tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 10,
      minZoom: 4
    }).addTo(map)

    mapInstanceRef.current = map

    // Add numbered markers for each state
    coverageStates.forEach((state) => {
      const isSelected = selectedState === state.key

      // Create custom marker HTML
      const markerHtml = `
        <div style="
          width: 50px;
          height: 50px;
          background-color: ${state.color};
          border: 3px solid ${state.color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transform: ${isSelected ? 'scale(1.3)' : 'scale(1)'};
          transition: transform 0.3s ease;
        ">${state.number}</div>
      `

      const marker = L.marker([state.lat, state.lng], {
        icon: L.divIcon({
          html: markerHtml,
          iconSize: [50, 50],
          className: 'custom-marker'
        })
      })
        .bindPopup(
          `<div style="padding: 10px; font-family: sans-serif; text-align: center;">
            <h3 style="margin: 0 0 4px 0; color: ${state.color}; font-size: 16px; font-weight: bold;">${state.name}</h3>
            <p style="margin: 0; color: #64748b; font-size: 12px;">Coverage State ${state.number}</p>
          </div>`,
          { maxWidth: 200 }
        )
        .addTo(map)

      marker.on('click', () => {
        onStateSelect(state.key)
      })
    })

    return () => {
      map.remove()
    }
  }, [selectedState, onStateSelect])

  return (
    <div
      ref={mapRef}
      style={{
        height: '500px',
        borderRadius: '16px',
        border: '2px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }}
    />
  )
}
