import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { checkEligibility } from '../utils/calculator'
import { STATE_DATA, CONSUMER_TYPES } from '../data/states'

export default function Eligibility() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    state: 'karnataka',
    consumerType: 'housing_society',
    isMultipleConnections: false,
    monthlyBill: 5000
  })
  const [result, setResult] = useState(null)

  const states = Object.entries(STATE_DATA).map(([key, value]) => ({
    value: key,
    label: value.name
  }))

  const handleCheck = () => {
    const eligibility = checkEligibility(formData)
    setResult(eligibility)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Eligibility Checker</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find out if your organization qualifies for VNM or GNM in just a few questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-slate-200"
          >
            <h2 className="text-2xl font-bold mb-8">Answer These Questions</h2>

            <div className="space-y-6">
              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  1. Which state are you in?
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {states.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Consumer Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  2. What is your consumer type?
                </label>
                <select
                  value={formData.consumerType}
                  onChange={(e) => setFormData({ ...formData, consumerType: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {CONSUMER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Multiple Connections */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  3. Do you have multiple electricity connections?
                </label>
                <div className="flex gap-4">
                  {[
                    { value: false, label: 'No' },
                    { value: true, label: 'Yes' }
                  ].map((option) => (
                    <button
                      key={String(option.value)}
                      onClick={() => setFormData({ ...formData, isMultipleConnections: option.value })}
                      className={`flex-1 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        formData.isMultipleConnections === option.value
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Bill */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  4. Monthly electricity bill
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">₹</span>
                  <input
                    type="number"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button
                onClick={handleCheck}
                className="btn-primary w-full justify-center mt-8"
              >
                <ArrowRight className="w-5 h-5" />
                Check Eligibility
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {result ? (
              <div className="space-y-6">
                {/* VNM Eligibility */}
                <div className={`rounded-xl p-6 border-2 ${
                  result.vnmEligible
                    ? 'bg-green-50 border-green-300'
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex gap-3 items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      result.vnmEligible ? 'bg-green-500 text-white' : 'bg-slate-300'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Virtual Net Metering (VNM)</h3>
                      <p className={`text-sm ${result.vnmEligible ? 'text-green-700' : 'text-slate-600'}`}>
                        {result.vnmEligible
                          ? 'Your organization qualifies for VNM!'
                          : 'Not eligible at this time, but check GNM options'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* GNM Eligibility */}
                <div className={`rounded-xl p-6 border-2 ${
                  result.gnmEligible
                    ? 'bg-green-50 border-green-300'
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex gap-3 items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      result.gnmEligible ? 'bg-green-500 text-white' : 'bg-slate-300'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Group Net Metering (GNM)</h3>
                      <p className={`text-sm ${result.gnmEligible ? 'text-green-700' : 'text-slate-600'}`}>
                        {result.gnmEligible
                          ? 'Your organization qualifies for GNM!'
                          : 'Not eligible at this time'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Next Steps</h3>
                  <ul className="space-y-2">
                    {result.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-slate-600">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className="btn-primary w-full justify-center">
                  <ArrowRight className="w-5 h-5" />
                  Book Free Consultation
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Answer the questions and click "Check Eligibility" to see your results.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
