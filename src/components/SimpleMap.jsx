import { useState } from 'react'
import { motion } from 'framer-motion'

const COVERAGE_STATES = {
  'rajasthan': { name: 'Rajasthan', color: '#f97316' },
  'maharashtra': { name: 'Maharashtra', color: '#2563eb' },
  'karnataka': { name: 'Karnataka', color: '#16a34a' },
  'chhattisgarh': { name: 'Chhattisgarh', color: '#dc2626' },
  'meghalaya': { name: 'Meghalaya', color: '#a855f7' }
}

export default function SimpleMap({ onStateSelect, selectedState }) {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden border border-slate-200">
      {/* SVG Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full bg-blue-100"
        style={{ height: '500px' }}
      >
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <rect width="800" height="600" fill="#dbeafe" />

          {/* Rajasthan - Orange */}
          <motion.g
            onClick={() => onStateSelect?.('rajasthan')}
            className="cursor-pointer"
            whileHover={{ opacity: 0.9 }}
          >
            <path
              d="M 150,100 L 200,80 L 220,120 L 210,180 L 170,200 L 130,160 Z"
              fill={COVERAGE_STATES.rajasthan.color}
              stroke="#000"
              strokeWidth={selectedState === 'rajasthan' ? 2 : 0.5}
            />
            <text x="175" y="140" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Rajasthan
            </text>
          </motion.g>

          {/* Maharashtra - Blue */}
          <motion.g
            onClick={() => onStateSelect?.('maharashtra')}
            className="cursor-pointer"
            whileHover={{ opacity: 0.9 }}
          >
            <path
              d="M 220,220 L 280,200 L 300,240 L 290,320 L 240,340 L 200,280 Z"
              fill={COVERAGE_STATES.maharashtra.color}
              stroke="#000"
              strokeWidth={selectedState === 'maharashtra' ? 2 : 0.5}
            />
            <text x="260" y="270" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Maharashtra
            </text>
          </motion.g>

          {/* Karnataka - Green */}
          <motion.g
            onClick={() => onStateSelect?.('karnataka')}
            className="cursor-pointer"
            whileHover={{ opacity: 0.9 }}
          >
            <path
              d="M 240,340 L 300,320 L 330,380 L 320,450 L 260,460 L 230,400 Z"
              fill={COVERAGE_STATES.karnataka.color}
              stroke="#000"
              strokeWidth={selectedState === 'karnataka' ? 2 : 0.5}
            />
            <text x="280" y="400" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Karnataka
            </text>
          </motion.g>

          {/* Chhattisgarh - Red */}
          <motion.g
            onClick={() => onStateSelect?.('chhattisgarh')}
            className="cursor-pointer"
            whileHover={{ opacity: 0.9 }}
          >
            <path
              d="M 350,200 L 420,190 L 450,240 L 440,340 L 380,360 L 340,280 Z"
              fill={COVERAGE_STATES.chhattisgarh.color}
              stroke="#000"
              strokeWidth={selectedState === 'chhattisgarh' ? 2 : 0.5}
            />
            <text x="400" y="280" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Chhattisgarh
            </text>
          </motion.g>

          {/* Meghalaya - Purple */}
          <motion.g
            onClick={() => onStateSelect?.('meghalaya')}
            className="cursor-pointer"
            whileHover={{ opacity: 0.9 }}
          >
            <path
              d="M 500,80 L 560,90 L 580,140 L 540,160 L 480,130 Z"
              fill={COVERAGE_STATES.meghalaya.color}
              stroke="#000"
              strokeWidth={selectedState === 'meghalaya' ? 2 : 0.5}
            />
            <text x="530" y="120" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Meghalaya
            </text>
          </motion.g>

          {/* Other states (beige) - simplified outlines */}
          <path d="M 50,50 L 150,30 L 140,100 L 80,120 Z" fill="#fef3c7" stroke="#d1d5db" strokeWidth="0.5" />
          <path d="M 400,400 L 500,380 L 520,450 L 450,480 Z" fill="#fef3c7" stroke="#d1d5db" strokeWidth="0.5" />
          <path d="M 100,300 L 200,280 L 220,360 L 140,380 Z" fill="#fef3c7" stroke="#d1d5db" strokeWidth="0.5" />
          <path d="M 600,200 L 680,180 L 700,280 L 620,300 Z" fill="#fef3c7" stroke="#d1d5db" strokeWidth="0.5" />

          {/* Labels */}
          <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e293b">
            India Map - Coverage States
          </text>
        </svg>
      </motion.div>

      {/* Legend */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <p className="text-sm font-semibold text-slate-900 mb-3">Coverage States</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(COVERAGE_STATES).map(([key, state]) => (
            <motion.button
              key={key}
              onClick={() => onStateSelect?.(key)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                selectedState === key
                  ? 'ring-2 ring-offset-2 ring-slate-400 bg-white'
                  : 'hover:bg-white'
              }`}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: state.color }} />
              <span className="text-xs font-medium text-slate-700">{state.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
