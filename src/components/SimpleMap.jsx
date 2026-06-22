import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/india-topojson/feature/combined_data.json'

const COVERAGE_STATES = {
  'Rajasthan': '#f97316',      // Orange
  'Maharashtra': '#2563eb',     // Blue
  'Karnataka': '#16a34a',       // Green
  'Chhattisgarh': '#dc2626',    // Red
  'Meghalaya': '#a855f7'        // Purple
}

export default function SimpleMap({ onStateSelect, selectedState }) {
  const [geoData, setGeoData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(data => {
        setGeoData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading map:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="w-full h-96 flex items-center justify-center bg-slate-50 rounded-lg">Loading map...</div>
  }

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden border border-slate-200">
      <ComposableMap projection="geoMercator" projectionConfig={{ center: [78, 20], scale: 1000 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name || geo.properties.st_nm || ''
              const isCovered = Object.keys(COVERAGE_STATES).includes(stateName)
              const isSelected = selectedState === stateName.toLowerCase().replace(/\s+/g, '-')
              const color = COVERAGE_STATES[stateName] || '#e2e8f0'

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (isCovered) {
                      onStateSelect?.(stateName.toLowerCase().replace(/\s+/g, '-'))
                    }
                  }}
                  style={{
                    default: {
                      fill: color,
                      stroke: isSelected ? '#000' : '#94a3b8',
                      strokeWidth: isSelected ? 2 : 0.75,
                      outline: 'none',
                      cursor: isCovered ? 'pointer' : 'default',
                      opacity: isCovered ? 1 : 0.6,
                      transition: 'all 0.3s ease'
                    },
                    hover: {
                      fill: isCovered ? color : '#e2e8f0',
                      stroke: '#0f172a',
                      strokeWidth: 1.5,
                      outline: 'none',
                      opacity: 1,
                      cursor: isCovered ? 'pointer' : 'default',
                      filter: isCovered ? 'brightness(1.1)' : 'none'
                    },
                    pressed: {
                      fill: color,
                      stroke: '#000',
                      strokeWidth: 2,
                      outline: 'none',
                      opacity: 1
                    }
                  }}
                  className={isCovered ? 'covered-state' : 'uncovered-state'}
                >
                  {stateName && isCovered && (
                    <text
                      x={geo.properties.centroid?.[0] || 0}
                      y={geo.properties.centroid?.[1] || 0}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight="bold"
                      fill="white"
                      pointerEvents="none"
                      className="drop-shadow"
                    >
                      {stateName.substring(0, 3).toUpperCase()}
                    </text>
                  )}
                </Geography>
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Legend */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <p className="text-sm font-semibold text-slate-900 mb-3">Coverage States</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(COVERAGE_STATES).map(([state, color]) => (
            <button
              key={state}
              onClick={() => onStateSelect?.(state.toLowerCase().replace(/\s+/g, '-'))}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                selectedState === state.toLowerCase().replace(/\s+/g, '-')
                  ? 'ring-2 ring-offset-2 ring-slate-400 bg-white'
                  : 'hover:bg-white'
              }`}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-medium text-slate-700">{state}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
