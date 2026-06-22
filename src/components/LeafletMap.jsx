import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function LeafletMap({ selectedState, onStateSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  const coverageStates = [
    {
      key: 'rajasthan',
      name: 'Rajasthan',
      abbr: 'RJ',
      lat: 27.5,
      lng: 73.5,
      region: 'Northwest'
    },
    {
      key: 'maharashtra',
      name: 'Maharashtra',
      abbr: 'MH',
      lat: 19.3,
      lng: 75.7,
      region: 'Western'
    },
    {
      key: 'karnataka',
      name: 'Karnataka',
      abbr: 'KA',
      lat: 15.3,
      lng: 75.8,
      region: 'Southwestern'
    },
    {
      key: 'chhattisgarh',
      name: 'Chhattisgarh',
      abbr: 'CG',
      lat: 22.0,
      lng: 82.5,
      region: 'Central'
    },
    {
      key: 'meghalaya',
      name: 'Meghalaya',
      abbr: 'ML',
      lat: 25.5,
      lng: 91.8,
      region: 'Northeastern'
    }
  ]

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true
    }).setView([23, 82], 5)

    // Add clean tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 10,
      minZoom: 4
    }).addTo(map)

    mapInstanceRef.current = map

    // Add markers for each coverage state
    coverageStates.forEach((state) => {
      const isSelected = selectedState === state.key

      const marker = L.circleMarker([state.lat, state.lng], {
        radius: isSelected ? 35 : 28,
        fillColor: isSelected ? '#0c2d78' : '#2563eb',
        color: '#1e40af',
        weight: 3,
        opacity: 1,
        fillOpacity: isSelected ? 0.95 : 0.85
      })
        .bindPopup(`
          <div style="padding: 10px; font-family: sans-serif;">
            <h3 style="margin: 0 0 4px 0; color: #1e40af; font-size: 16px;">${state.name}</h3>
            <p style="margin: 0; color: #64748b; font-size: 13px;">${state.region}</p>
            <p style="margin: 4px 0 0 0; color: #1e40af; font-size: 18px; font-weight: bold;">${state.abbr}</p>
          </div>
        `)
        .addTo(map)

      // Add label above marker
      const label = L.marker([state.lat, state.lng], {
        icon: L.divIcon({
          html: `<div style="
            background: ${isSelected ? '#0c2d78' : '#2563eb'};
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 900;
            font-size: 16px;
            text-align: center;
            min-width: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          ">${state.abbr}</div>`,
          iconSize: [50, 32],
          className: 'state-label'
        }),
        interactive: false
      }).addTo(map)

      marker.on('click', () => {
        onStateSelect(state.key)
      })

      marker.on('mouseover', function() {
        this.setStyle({
          radius: 32,
          fillColor: '#1e40af'
        })
      })

      marker.on('mouseout', function() {
        this.setStyle({
          radius: isSelected ? 35 : 28,
          fillColor: isSelected ? '#0c2d78' : '#2563eb'
        })
      })

      markersRef.current[state.key] = { marker, label }
    })

    return () => {
      map.remove()
    }
  }, [])

  // Update marker styles when selectedState changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    coverageStates.forEach((state) => {
      const isSelected = selectedState === state.key
      const { marker, label } = markersRef.current[state.key]

      marker.setStyle({
        radius: isSelected ? 35 : 28,
        fillColor: isSelected ? '#0c2d78' : '#2563eb',
        fillOpacity: isSelected ? 0.95 : 0.85
      })

      // Update label
      const icon = label.getIcon()
      icon.options.html = `<div style="
        background: ${isSelected ? '#0c2d78' : '#2563eb'};
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: 900;
        font-size: 16px;
        text-align: center;
        min-width: 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      ">${state.abbr}</div>`
      label.setIcon(icon)
    })
  }, [selectedState])

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
