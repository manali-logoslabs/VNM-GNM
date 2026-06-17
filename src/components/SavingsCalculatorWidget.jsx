import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { calculateSavings, formatINR } from '../utils/calculator'
import { STATE_DATA, CONSUMER_TYPES } from '../data/states'

export default function SavingsCalculatorWidget() {
  const [state, setState] = useState('karnataka')
  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [consumerType, setConsumerType] = useState('housing_society')
  const [savings, setSavings] = useState(null)

  const states = Object.entries(STATE_DATA).map(([key, value]) => ({
    value: key,
    label: value.name
  }))

  const handleCalculate = () => {
    const result = calculateSavings({
      monthlyBill,
      monthlyConsumption: monthlyBill / 7, // Assume ₹7 per kWh average
      solarCapacity: 20, // Standard 20 kW system
      surplusTariff: 0.75,
      participantCount: 1,
      formulation: 'vnm'
    })

    setSavings(result)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="card-premium p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Quick Estimate</h3>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Select Your State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {states.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Consumer Type
              </label>
              <select
                value={consumerType}
                onChange={(e) => setConsumerType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {CONSUMER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Monthly Electricity Bill
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-slate-600">₹</span>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              <div className="mt-2 p-3 bg-primary-50 rounded-lg">
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full text-2xl font-bold text-primary-600 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="btn-primary w-full justify-center"
            >
              <ArrowRight className="w-5 h-5" />
              Calculate Savings
            </button>
          </div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-slate-900">Your Savings</h3>

            {savings ? (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-lg border-2 border-primary-200"
                >
                  <p className="text-sm text-slate-600 mb-1">Monthly Savings</p>
                  <p className="text-4xl font-bold text-primary-600">
                    {formatINR(savings.monthlySavings)}
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-slate-50 p-4 rounded-lg"
                  >
                    <p className="text-xs text-slate-600 mb-1">Annual Savings</p>
                    <p className="text-lg font-bold text-slate-900">
                      {formatINR(savings.annualSavings)}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-slate-50 p-4 rounded-lg"
                  >
                    <p className="text-xs text-slate-600 mb-1">5-Year Savings</p>
                    <p className="text-lg font-bold text-slate-900">
                      {formatINR(savings.projections.year5)}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-slate-50 p-4 rounded-lg"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Payback Period</p>
                      <p className="text-lg font-bold text-slate-900">{savings.paybackPeriod} yrs</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Offset</p>
                      <p className="text-lg font-bold text-slate-900">{savings.electricityOffsetPercentage}%</p>
                    </div>
                  </div>
                </motion.div>

                <p className="text-sm text-slate-600 italic pt-2">
                  💡 Recommended: <span className="font-semibold">{savings.recommendedModel.toUpperCase()}</span>
                </p>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <div className="bg-slate-100 h-16 rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 h-12 rounded-lg animate-pulse" />
                  <div className="bg-slate-100 h-12 rounded-lg animate-pulse" />
                </div>
                <p className="text-sm text-slate-600 text-center pt-4">
                  Adjust values and click Calculate to see your personalized savings →
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
