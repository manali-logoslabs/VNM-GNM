import { useState } from 'react'
import { motion } from 'framer-motion'
import { STATE_DATA } from '../data/states'
import { StateCard } from '../components/Cards'

export default function StateEligibility() {
  const [selectedState, setSelectedState] = useState(null)

  const states = Object.entries(STATE_DATA).map(([key, value]) => ({
    key,
    data: value
  }))

  const coverageStates = ['rajasthan', 'maharashtra', 'karnataka', 'chhattisgarh', 'meghalaya']

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">State Eligibility & Details</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore VNM and GNM availability, subsidies, and regulations across Indian states.
          </p>
        </motion.div>

        {/* India Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Our Coverage Across India</h2>

          <svg viewBox="0 0 800 1000" className="w-full max-w-3xl mx-auto" style={{ height: 'auto' }}>
            {/* India Outline */}
            <g fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <path d="M 250,80 L 320,70 L 380,75 L 450,65 L 520,70 L 580,60 L 650,80 L 720,90 L 750,120 L 770,160 L 780,200 L 785,250 L 788,300 L 790,350 L 788,400 L 785,450 L 780,500 L 775,550 L 770,600 L 760,650 L 740,700 L 710,740 L 680,770 L 650,800 L 600,820 L 550,830 L 500,835 L 450,838 L 400,840 L 350,838 L 300,835 L 250,830 L 200,825 L 150,815 L 100,800 L 70,770 L 50,730 L 40,680 L 35,630 L 32,580 L 30,530 L 28,480 L 26,430 L 25,380 L 24,330 L 25,280 L 28,230 L 35,180 L 45,140 L 60,110 L 90,90 L 130,80 L 180,75 Z"/>
            </g>

            {/* Rajasthan */}
            <g onClick={() => setSelectedState('rajasthan')} className={`cursor-pointer transition-all ${selectedState === 'rajasthan' ? 'fill-primary-600' : coverageStates.includes('rajasthan') ? 'fill-primary-400' : 'fill-slate-200'} hover:fill-primary-500`} stroke="#1e40af" strokeWidth="2">
              <path d="M 180,120 L 280,100 L 340,150 L 360,260 L 300,310 L 220,280 L 160,200 Z"/>
              <text x="270" y="210" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">RJ</text>
            </g>

            {/* Punjab & Himachal (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 200,70 L 280,60 L 310,90 L 280,120 L 200,100 Z"/>
            </g>

            {/* Haryana & Delhi (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 280,100 L 340,95 L 360,130 L 340,150 L 300,140 Z"/>
            </g>

            {/* Uttar Pradesh (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 340,95 L 420,80 L 480,120 L 460,200 L 360,260 L 340,150 Z"/>
            </g>

            {/* Bihar & Jharkhand (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 420,80 L 500,70 L 540,110 L 500,180 L 480,120 Z"/>
            </g>

            {/* West Bengal (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 500,70 L 560,65 L 580,120 L 540,160 L 500,180 Z"/>
            </g>

            {/* Meghalaya */}
            <g onClick={() => setSelectedState('meghalaya')} className={`cursor-pointer transition-all ${selectedState === 'meghalaya' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} stroke="#1e40af" strokeWidth="2">
              <path d="M 580,140 L 620,130 L 650,160 L 630,190 L 590,180 Z"/>
              <text x="615" y="160" textAnchor="middle" className="text-lg font-bold fill-white pointer-events-none">ML</text>
            </g>

            {/* Assam & NE (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 620,130 L 700,125 L 730,170 L 680,200 L 650,160 Z"/>
            </g>

            {/* Telangana (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 360,310 L 420,300 L 460,360 L 420,400 L 360,380 Z"/>
            </g>

            {/* Chhattisgarh */}
            <g onClick={() => setSelectedState('chhattisgarh')} className={`cursor-pointer transition-all ${selectedState === 'chhattisgarh' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} stroke="#1e40af" strokeWidth="2">
              <path d="M 420,300 L 500,280 L 560,320 L 540,420 L 460,440 L 400,380 Z"/>
              <text x="480" y="360" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">CG</text>
            </g>

            {/* Odisha (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 500,280 L 560,270 L 600,330 L 560,420 L 500,400 Z"/>
            </g>

            {/* Maharashtra */}
            <g onClick={() => setSelectedState('maharashtra')} className={`cursor-pointer transition-all ${selectedState === 'maharashtra' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} stroke="#1e40af" strokeWidth="2">
              <path d="M 220,280 L 300,310 L 360,380 L 380,500 L 340,560 L 260,530 L 230,400 Z"/>
              <text x="305" y="415" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">MH</text>
            </g>

            {/* Andhra Pradesh (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 420,400 L 500,380 L 560,440 L 520,540 L 440,560 L 420,460 Z"/>
            </g>

            {/* Karnataka */}
            <g onClick={() => setSelectedState('karnataka')} className={`cursor-pointer transition-all ${selectedState === 'karnataka' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} stroke="#1e40af" strokeWidth="2">
              <path d="M 260,530 L 340,560 L 380,680 L 340,760 L 280,780 L 240,700 Z"/>
              <text x="310" y="660" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">KA</text>
            </g>

            {/* Tamil Nadu (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 340,760 L 380,750 L 420,820 L 380,880 L 340,850 Z"/>
            </g>

            {/* Kerala (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 240,700 L 280,720 L 270,820 L 220,800 Z"/>
            </g>

            {/* Goa (Other) */}
            <g className="fill-slate-200 stroke-slate-300" strokeWidth="1.5">
              <path d="M 260,530 L 300,550 L 310,610 L 280,620 Z"/>
            </g>

            {/* Legend */}
            <g>
              <rect x="50" y="900" width="20" height="20" fill="#2563eb" stroke="#1e40af" strokeWidth="1"/>
              <text x="80" y="915" className="text-sm fill-slate-900 font-semibold">Our Coverage (5 States)</text>

              <rect x="350" y="900" width="20" height="20" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1"/>
              <text x="380" y="915" className="text-sm fill-slate-700 font-semibold">Other States</text>
            </g>

            <text x="400" y="960" textAnchor="middle" className="text-sm fill-slate-600 font-medium">Click on any of our 5 coverage states to see detailed information</text>
          </svg>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {states.map((state, idx) => (
            <button
              key={state.key}
              onClick={() => setSelectedState(state.key)}
              className="text-left"
            >
              <StateCard
                state={state}
                index={idx}
              />
            </button>
          ))}
        </div>

        {/* State Details */}
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8">{STATE_DATA[selectedState].name} - Detailed Information</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Key Parameters</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">VNM Available</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].vnmAvailable ? '✓ Yes' : '✗ No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">GNM Available</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].gnmAvailable ? '✓ Yes' : '✗ No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Min Capacity</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].minCapacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Subsidy Available</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].subsidy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Processing Time</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].processingTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4">Highlights</h3>
                <ul className="space-y-2 mb-6">
                  {STATE_DATA[selectedState].highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-primary-600 font-bold">✓</span> {h}
                    </li>
                  ))}
                </ul>

                {STATE_DATA[selectedState].cons.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Important Notes</h4>
                    <ul className="space-y-2">
                      {STATE_DATA[selectedState].cons.map((c, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-orange-600 font-bold">!</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Eligible Consumer Types</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">VNM Eligible:</p>
                  <ul className="space-y-1">
                    {STATE_DATA[selectedState].eligibilityVNM.map((e, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {e}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">GNM Eligible:</p>
                  <ul className="space-y-1">
                    {STATE_DATA[selectedState].eligibilityGNM.map((e, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="/contact" className="btn-primary">
                Schedule Consultation for {STATE_DATA[selectedState].name}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
