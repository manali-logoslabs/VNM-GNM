import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateSavings } from '../../utils/calculator'
import { STATE_DATA, CONSUMER_TYPES } from '../../data/states'
import { formatINR } from '../../utils/calculator'

export default function CalculatorSection() {
  const [state, setState] = useState('karnataka')
  const [consumerType, setConsumerType] = useState('residential')
  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [solarCapacity, setSolarCapacity] = useState(10)
  const [calculated, setCalculated] = useState(false)

  const results = useMemo(() => {
    const monthlyConsumption = monthlyBill / 6
    return calculateSavings({
      monthlyBill,
      monthlyConsumption,
      solarCapacity,
      surplusTariff: 0.75,
      participantCount: 1,
      formulation: 'vnm'
    })
  }, [monthlyBill, solarCapacity])

  const chartData = results ? [
    { year: 'Y1', savings: results.projections.year1 },
    { year: 'Y5', savings: Math.round(results.projections.year5) },
    { year: 'Y10', savings: Math.round(results.projections.year10) },
    { year: 'Y25', savings: Math.round(results.projections.year25) },
  ] : []

  return (
    <section id="calculator" className="section-py bg-blue-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Your Savings Potential
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get an instant estimate of how much you can save with VNM/GNM
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Inputs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold mb-6">Tell Us About You</h3>

            <div className="space-y-6">
              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Your State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {Object.keys(STATE_DATA).map((s) => (
                    <option key={s} value={s}>
                      {STATE_DATA[s].name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consumer Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Consumer Type
                </label>
                <select
                  value={consumerType}
                  onChange={(e) => setConsumerType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {CONSUMER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Bill */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Monthly Electricity Bill
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="500"
                    max="500000"
                    step="500"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">{formatINR(monthlyBill)}</p>
              </div>

              {/* Solar Capacity */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Solar Capacity (kW)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={solarCapacity}
                    onChange={(e) => setSolarCapacity(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={solarCapacity}
                    onChange={(e) => setSolarCapacity(parseInt(e.target.value) || 0)}
                    className="w-16 px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                </div>
              </div>

              <button
                onClick={() => setCalculated(true)}
                className="btn-primary w-full justify-center"
              >
                <Zap className="w-5 h-5" />
                Calculate
              </button>
            </div>
          </div>

          {/* Results */}
          {results && calculated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
            >
              <h3 className="text-2xl font-bold mb-6">Your Results</h3>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
                  <p className="text-xs text-slate-600 mb-1">Monthly Savings</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatINR(results.monthlySavings)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-green-50 rounded-lg p-4 border border-accent-200">
                  <p className="text-xs text-slate-600 mb-1">Annual Savings</p>
                  <p className="text-2xl font-bold text-accent-600">
                    {formatINR(results.annualSavings)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
                  <p className="text-xs text-slate-600 mb-1">Payback Period</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {results.paybackPeriod.toFixed(1)} yrs
                  </p>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-green-50 rounded-lg p-4 border border-accent-200">
                  <p className="text-xs text-slate-600 mb-1">Carbon Reduction</p>
                  <p className="text-2xl font-bold text-accent-600">
                    {results.carbonReductionTons} tons/yr
                  </p>
                </div>
              </div>

              {/* 25-Year Projection Chart */}
              {chartData.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-900 mb-3">25-Year Projection</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => formatINR(value)}
                      />
                      <Area
                        type="monotone"
                        dataKey="savings"
                        stroke="#2563eb"
                        fill="#dbeafe"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Electricity Offset */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-900 mb-2">Electricity Offset</p>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(results.electricityOffsetPercentage, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {results.electricityOffsetPercentage}% of your electricity covered
                </p>
              </div>

              <Link to="/calculator" className="btn-primary w-full justify-center">
                Get Exact Quote
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        {!calculated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-slate-600 mb-4">
              Need more details? Our experts can provide a personalized assessment.
            </p>
            <a href="#contact" className="btn-outline">
              Talk to an Expert
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
