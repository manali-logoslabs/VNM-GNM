import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { indiaStatesGeoJSON } from '../data/indiaStatesGeoJSON'

export default function LeafletMap({ selectedState, onStateSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layersRef = useRef({})
  const labelsRef = useRef({})

  const coverageStates = ['rajasthan', 'maharashtra', 'karnataka', 'chhattisgarh', 'meghalaya']

  const stateLabels = {
    rajasthan: 'RJ',
    maharashtra: 'MH',
    karnataka: 'KA',
    chhattisgarh: 'CG',
    meghalaya: 'ML',
    punjab: 'PB',
    haryana: 'HR',
    uttar_pradesh: 'UP',
    bihar: 'BR',
    west_bengal: 'WB',
    odisha: 'OD',
    andhra_pradesh: 'AP',
    telangana: 'TG',
    tamil_nadu: 'TN',
    kerala: 'KL',
    gujarat: 'GJ',
    goa: 'GA'
  }

  const getStateCentroid = (key) => {
    const centroids = {
      rajasthan: [27.5, 74],
      maharashtra: [19.3, 75.7],
      karnataka: [15.3, 75.8],
      chhattisgarh: [22, 82.5],
      meghalaya: [25.5, 91.8],
      punjab: [31.8, 74.8],
      haryana: [29.5, 77.5],
      uttar_pradesh: [27, 80.5],
      bihar: [26, 85.5],
      west_bengal: [25.5, 88.5],
      odisha: [20.5, 86],
      andhra_pradesh: [15.7, 79.5],
      telangana: [16.5, 78.5],
      tamil_nadu: [11, 78.5],
      kerala: [10.5, 75.5],
      gujarat: [22, 72],
      goa: [15.2, 73.8]
    }
    return centroids[key] || [20, 78]
  }

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map with better settings
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true
    }).setView([23, 82], 5)

    // Add simple background - no detailed tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 10,
      minZoom: 4
    }).addTo(map)

    mapInstanceRef.current = map

    // Add GeoJSON layers
    indiaStatesGeoJSON.features.forEach((feature) => {
      const key = feature.properties.key
      const isCoverage = coverageStates.includes(key)

      const layer = L.geoJSON(feature, {
        style: {
          fillColor: selectedState === key ? '#1e40af' : isCoverage ? '#3b82f6' : '#e2e8f0',
          fillOpacity: selectedState === key ? 0.95 : isCoverage ? 0.8 : 0.35,
          color: selectedState === key ? '#0c2d78' : isCoverage ? '#1e40af' : '#cbd5e1',
          weight: selectedState === key ? 3 : isCoverage ? 2 : 0.8,
          opacity: 1,
          dashArray: ''
        },
        onEachFeature: (feature, layer) => {
          const label = stateLabels[key]

          // Create custom popup
          const popupContent = `
            <div style="padding: 8px; font-family: sans-serif;">
              <h4 style="margin: 0 0 4px 0; color: #1e40af; font-size: 14px;">${feature.properties.name}</h4>
              <p style="margin: 0; color: #64748b; font-size: 12px;">${isCoverage ? '✓ Coverage State' : 'Other State'}</p>
            </div>
          `

          layer.bindPopup(popupContent, {
            maxWidth: 200,
            className: 'custom-popup'
          })

          if (isCoverage) {
            layer.on('click', (e) => {
              L.DomEvent.stopPropagation(e)
              onStateSelect(key)
            })

            layer.on('mouseover', function() {
              this.setStyle({
                fillColor: selectedState === key ? '#1e40af' : '#2563eb',
                weight: selectedState === key ? 3 : 2.5,
                fillOpacity: 0.9
              })
              this.bringToFront()
            })

            layer.on('mouseout', function() {
              this.setStyle({
                fillColor: selectedState === key ? '#1e40af' : '#3b82f6',
                weight: selectedState === key ? 3 : 2,
                fillOpacity: selectedState === key ? 0.95 : 0.8
              })
            })
          }
        }
      }).addTo(map)

      layersRef.current[key] = layer

      // Add state labels
      const [lat, lng] = getStateCentroid(key)
      const labelClass = isCoverage ? 'state-label-coverage' : 'state-label-other'

      const label = L.marker([lat, lng], {
        icon: L.divIcon({
          html: `<div class="${labelClass}" style="
            font-weight: ${isCoverage ? '900' : '600'};
            color: ${selectedState === key ? '#fff' : isCoverage ? '#fff' : '#64748b'};
            font-size: ${isCoverage ? '14px' : '11px'};
            text-shadow: ${selectedState === key || isCoverage ? '0 1px 3px rgba(0,0,0,0.4)' : 'none'};
            pointer-events: none;
            text-align: center;
          ">${stateLabels[key]}</div>`,
          iconSize: [35, 35],
          className: 'label-icon'
        }),
        interactive: false
      }).addTo(map)

      labelsRef.current[key] = label
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
      const labelMarker = labelsRef.current[key]
      const isCoverage = coverageStates.includes(key)

      layer.setStyle({
        fillColor: selectedState === key ? '#1e40af' : isCoverage ? '#3b82f6' : '#e2e8f0',
        fillOpacity: selectedState === key ? 0.95 : isCoverage ? 0.8 : 0.35,
        color: selectedState === key ? '#0c2d78' : isCoverage ? '#1e40af' : '#cbd5e1',
        weight: selectedState === key ? 3 : isCoverage ? 2 : 0.8
      })

      // Update label color
      if (labelMarker) {
        const icon = labelMarker.getIcon()
        const newHtml = `<div style="
          font-weight: ${isCoverage ? '900' : '600'};
          color: ${selectedState === key ? '#fff' : isCoverage ? '#fff' : '#64748b'};
          font-size: ${isCoverage ? '14px' : '11px'};
          text-shadow: ${selectedState === key || isCoverage ? '0 1px 3px rgba(0,0,0,0.4)' : 'none'};
          pointer-events: none;
          text-align: center;
        ">${stateLabels[key]}</div>`

        icon.options.html = newHtml
        labelMarker.setIcon(icon)
      }
    })
  }, [selectedState])

  return (
    <div
      ref={mapRef}
      style={{
        height: '600px',
        borderRadius: '16px',
        border: '2px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }}
      className="map-container"
    />
  )
}
