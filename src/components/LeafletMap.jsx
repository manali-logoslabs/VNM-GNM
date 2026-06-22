import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { indiaStatesGeoJSON } from '../data/indiaStatesGeoJSON'

export default function LeafletMap({ selectedState, onStateSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layersRef = useRef({})

  const coverageStates = ['rajasthan', 'maharashtra', 'karnataka', 'chhattisgarh', 'meghalaya']

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([23, 82], 4)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map)

    mapInstanceRef.current = map

    // Add GeoJSON layers
    indiaStatesGeoJSON.features.forEach((feature) => {
      const key = feature.properties.key
      const isCoverage = coverageStates.includes(key)

      const layer = L.geoJSON(feature, {
        style: {
          fillColor: selectedState === key ? '#1e40af' : isCoverage ? '#60a5fa' : '#e2e8f0',
          fillOpacity: selectedState === key ? 0.9 : isCoverage ? 0.7 : 0.5,
          color: selectedState === key ? '#1e40af' : '#cbd5e1',
          weight: selectedState === key ? 3 : 1.5,
          opacity: 1
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(`<b>${feature.properties.name}</b>`)

          if (isCoverage) {
            layer.on('click', () => {
              onStateSelect(key)
            })
            layer.on('mouseover', function() {
              this.setStyle({
                fillColor: '#3b82f6',
                weight: 2.5
              })
            })
            layer.on('mouseout', function() {
              this.setStyle({
                fillColor: selectedState === key ? '#1e40af' : '#60a5fa',
                weight: selectedState === key ? 3 : 1.5
              })
            })
          }
        }
      }).addTo(map)

      layersRef.current[key] = layer
    })

    return () => {
      map.remove()
    }
  }, [])

  // Update styles when selectedState changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    Object.keys(layersRef.current).forEach((key) => {
      const layer = layersRef.current[key]
      const isCoverage = coverageStates.includes(key)

      layer.setStyle({
        fillColor: selectedState === key ? '#1e40af' : isCoverage ? '#60a5fa' : '#e2e8f0',
        fillOpacity: selectedState === key ? 0.9 : isCoverage ? 0.7 : 0.5,
        weight: selectedState === key ? 3 : 1.5
      })
    })
  }, [selectedState])

  return (
    <div
      ref={mapRef}
      style={{
        height: '500px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
    />
  )
}
