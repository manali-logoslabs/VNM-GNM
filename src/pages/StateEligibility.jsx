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

          {/* Map Container with Background Image */}
          <div className="relative max-w-4xl mx-auto bg-slate-100 rounded-xl overflow-hidden" style={{ aspectRatio: '1.2/1' }}>
            {/* India Map Background */}
            <svg viewBox="0 0 1200 900" className="w-full h-full absolute inset-0" style={{ backgroundImage: `linear-gradient(135deg, #f0f4f8 0%, #e0e7ff 100%)` }}>
              {/* Simplified India outline with better proportions */}
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.15"/>
                </filter>
              </defs>

              {/* India Body - Simplified but recognizable */}
              <path d="M 350,120 Q 420,100 480,110 Q 550,120 620,100 Q 680,90 750,110 Q 820,130 880,150 L 920,200 Q 950,250 960,320 Q 970,400 970,480 Q 965,560 950,640 Q 920,750 850,820 Q 750,900 600,920 Q 450,930 300,920 Q 150,910 80,820 Q 30,750 20,640 Q 10,560 5,480 Q 0,400 10,320 Q 20,250 50,200 L 90,150 Q 150,130 220,120 Q 280,110 350,120 Z" fill="#e8eef8" stroke="#cbd5e1" strokeWidth="2" filter="url(#shadow)"/>

              {/* Rajasthan - Northwestern */}
              <g onClick={() => setSelectedState('rajasthan')} className={`cursor-pointer transition-all ${selectedState === 'rajasthan' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} style={{ stroke: '#1e40af', strokeWidth: 3 }}>
                <path d="M 320,200 L 420,180 L 480,220 L 500,320 L 440,380 L 340,360 L 300,280 Z" />
                <text x="410" y="285" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white pointer-events-none" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>RJ</text>
              </g>

              {/* Maharashtra - Western */}
              <g onClick={() => setSelectedState('maharashtra')} className={`cursor-pointer transition-all ${selectedState === 'maharashtra' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} style={{ stroke: '#1e40af', strokeWidth: 3 }}>
                <path d="M 340,360 L 440,380 L 480,470 L 510,600 L 460,660 L 380,620 L 350,480 Z" />
                <text x="430" y="520" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white pointer-events-none" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>MH</text>
              </g>

              {/* Karnataka - Southwestern */}
              <g onClick={() => setSelectedState('karnataka')} className={`cursor-pointer transition-all ${selectedState === 'karnataka' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} style={{ stroke: '#1e40af', strokeWidth: 3 }}>
                <path d="M 380,620 L 460,660 L 480,760 L 450,850 L 380,870 L 340,780 L 350,680 Z" />
                <text x="410" y="755" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white pointer-events-none" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>KA</text>
              </g>

              {/* Chhattisgarh - Central */}
              <g onClick={() => setSelectedState('chhattisgarh')} className={`cursor-pointer transition-all ${selectedState === 'chhattisgarh' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} style={{ stroke: '#1e40af', strokeWidth: 3 }}>
                <path d="M 520,350 L 620,320 L 700,380 L 680,520 L 600,560 L 520,500 Z" />
                <text x="620" y="440" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white pointer-events-none" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>CG</text>
              </g>

              {/* Meghalaya - Northeastern */}
              <g onClick={() => setSelectedState('meghalaya')} className={`cursor-pointer transition-all ${selectedState === 'meghalaya' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`} style={{ stroke: '#1e40af', strokeWidth: 3 }}>
                <path d="M 800,260 L 870,240 L 920,310 L 880,380 L 810,360 Z" />
                <text x="860" y="305" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-white pointer-events-none" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>ML</text>
              </g>
            </svg>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-end justify-start p-6 pointer-events-none">
              <p className="text-sm font-semibold text-slate-600 bg-white bg-opacity-80 px-3 py-2 rounded pointer-events-auto">Click on a state to see details</p>
            </div>
          </div>
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
