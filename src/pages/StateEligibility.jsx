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
          <svg viewBox="0 0 800 900" className="w-full max-w-4xl mx-auto" style={{ height: 'auto' }}>
            {/* India Outline */}
            <path d="M 400 80 L 450 100 L 480 110 L 500 130 L 520 120 L 540 140 L 560 130 L 580 150 L 590 170 L 600 160 L 610 180 L 620 170 L 630 190 L 640 180 L 650 200 L 660 190 L 670 210 L 680 200 L 690 220 L 700 210 L 710 230 L 720 220 L 730 240 L 720 260 L 710 250 L 700 270 L 690 260 L 680 280 L 670 270 L 660 290 L 650 280 L 640 300 L 630 290 L 620 310 L 610 300 L 600 320 L 590 310 L 580 330 L 570 320 L 560 340 L 550 330 L 540 350 L 530 340 L 520 360 L 510 350 L 500 370 L 490 360 L 480 380 L 470 370 L 460 390 L 450 380 L 440 400 L 430 390 L 420 410 L 410 400 L 400 420 L 390 410 L 380 430 L 370 420 L 360 440 L 350 430 L 340 450 L 330 440 L 320 460 L 310 450 L 300 470 L 290 460 L 280 480 L 270 470 L 260 490 L 250 480 L 240 500 L 230 490 L 220 510 L 210 500 L 200 520 L 190 510 L 180 530 L 170 520 L 160 540 L 150 530 L 140 550 L 130 540 L 120 560 L 110 550 L 100 570 L 90 560 L 80 580 L 70 570 L 60 590 L 50 580 L 40 600 L 30 590 L 20 610 L 30 630 L 40 640 L 50 650 L 60 660 L 70 670 L 80 680 L 90 690 L 100 700 L 110 710 L 120 720 L 130 730 L 140 740 L 150 750 L 160 760 L 170 770 L 180 780 L 190 790 L 200 800 L 210 810 L 220 820 L 230 830 L 240 840 L 250 850 L 260 860 L 270 870 L 280 880 L 290 870 L 300 860 L 310 850 L 320 840 L 330 830 L 340 820 L 350 810 L 360 800 L 370 790 L 380 780 L 390 770 L 400 760 L 410 770 L 420 780 L 430 790 L 440 800 L 450 810 L 460 820 L 470 830 L 480 840 L 490 850 L 500 860 L 510 870 L 520 880 L 530 870 L 540 860 L 550 850 L 560 840 L 570 830 L 580 820 L 590 810 L 600 800 L 610 790 L 620 780 L 630 770 L 640 760 L 650 750 L 660 740 L 670 730 L 680 720 L 690 710 L 700 700 L 710 690 L 720 680 L 730 670 L 740 660 L 750 650 L 760 640 L 770 630 L 780 620 L 790 610 L 800 600 L 800 580 L 790 570 L 780 560 L 770 550 L 760 540 L 750 530 L 740 520 L 730 510 L 720 500 L 710 490 L 700 480 L 690 470 L 680 460 L 670 450 L 660 440 L 650 430 L 640 420 L 630 410 L 620 400 L 610 390 L 600 380 L 590 370 L 580 360 L 570 350 L 560 340 L 550 330 L 540 320 L 530 310 L 520 300 L 510 290 L 500 280 L 490 270 L 480 260 L 470 250 L 460 240 L 450 230 L 440 220 L 430 210 L 420 200 L 410 190 L 400 180 L 390 170 L 380 160 L 370 150 L 360 140 L 350 130 L 340 120 L 330 110 L 320 100 L 310 90 Z" fill="#e8eef8" stroke="#cbd5e1" strokeWidth="2"/>

            {/* Rajasthan (RJ) - Northwestern */}
            <g
              onClick={() => setSelectedState('rajasthan')}
              className={`cursor-pointer transition-all ${selectedState === 'rajasthan' ? 'fill-primary-600' : 'fill-primary-300'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2 }}
            >
              <path d="M 150 150 L 220 140 L 240 180 L 260 200 L 250 250 L 200 270 L 160 240 L 140 200 Z" />
              <text x="200" y="210" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">RJ</text>
            </g>

            {/* Maharashtra (MH) - Western */}
            <g
              onClick={() => setSelectedState('maharashtra')}
              className={`cursor-pointer transition-all ${selectedState === 'maharashtra' ? 'fill-primary-600' : 'fill-primary-300'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2 }}
            >
              <path d="M 200 270 L 250 250 L 280 300 L 290 380 L 260 420 L 220 400 L 200 350 Z" />
              <text x="245" y="340" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">MH</text>
            </g>

            {/* Karnataka (KA) - Southwestern */}
            <g
              onClick={() => setSelectedState('karnataka')}
              className={`cursor-pointer transition-all ${selectedState === 'karnataka' ? 'fill-primary-600' : 'fill-primary-300'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2 }}
            >
              <path d="M 220 400 L 260 420 L 290 480 L 280 560 L 240 580 L 200 540 L 190 480 Z" />
              <text x="245" y="490" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">KA</text>
            </g>

            {/* Chhattisgarh (CG) - Central */}
            <g
              onClick={() => setSelectedState('chhattisgarh')}
              className={`cursor-pointer transition-all ${selectedState === 'chhattisgarh' ? 'fill-primary-600' : 'fill-primary-300'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2 }}
            >
              <path d="M 320 300 L 380 280 L 420 320 L 410 400 L 350 420 L 310 380 Z" />
              <text x="365" y="360" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">CG</text>
            </g>

            {/* Meghalaya (ML) - Northeastern */}
            <g
              onClick={() => setSelectedState('meghalaya')}
              className={`cursor-pointer transition-all ${selectedState === 'meghalaya' ? 'fill-primary-600' : 'fill-primary-300'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2 }}
            >
              <path d="M 600 250 L 650 240 L 680 280 L 660 320 L 620 310 Z" />
              <text x="650" y="285" textAnchor="middle" className="text-lg font-bold fill-white pointer-events-none">ML</text>
            </g>

            {/* Legend */}
            <text x="50" y="850" className="text-lg font-semibold fill-slate-900">Click on a state to see details</text>
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
