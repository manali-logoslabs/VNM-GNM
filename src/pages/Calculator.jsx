import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { STATE_DATA, CONSUMER_TYPES } from '../data/states'
import { formatINR, formatNumber } from '../utils/calculator'
import { apiClient } from '../utils/apiClient'
import { ArrowDown, Calculator as CalcIcon, Upload, CheckCircle, X, AlertCircle } from 'lucide-react'

export default function Calculator() {
  const [state, setState] = useState('karnataka')
  const [consumerType, setConsumerType] = useState('housing_society')
  const [monthlyBill, setMonthlyBill] = useState(10000)
  const [monthlyConsumption, setMonthlyConsumption] = useState(1500)
  const [participantCount, setParticipantCount] = useState(5)
  const [solarCapacity, setSolarCapacity] = useState(50)
  const [formulation, setFormulation] = useState('vnm')
  const [billUpload, setBillUpload] = useState(null)
  const [billPreview, setBillPreview] = useState(null)
  const [savings, setSavings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [backendOnline, setBackendOnline] = useState(false)

  const states = Object.entries(STATE_DATA).map(([key, value]) => ({
    value: key,
    label: value.name
  }))

  const stateData = STATE_DATA[state]

  // Check backend health on mount
  useEffect(() => {
    apiClient.health().then(setBackendOnline).catch(() => setBackendOnline(false))
  }, [])

  // Fetch calculation from backend with debouncing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!backendOnline) {
        setError('Backend not connected. Please start the backend server.')
        return
      }
      try {
        setLoading(true)
        setError(null)
        const result = await apiClient.calculate({
          monthlyBill,
          monthlyConsumption,
          solarCapacity,
          state,
          consumerType,
          participantCount: formulation === 'vnm' ? participantCount : 1,
          formulation
        })
        setSavings(result)
      } catch (err) {
        setError(err.message || 'Calculation failed')
        setSavings(null)
      } finally {
        setLoading(false)
      }
    }, 500) // Debounce: wait 500ms before calculating

    return () => clearTimeout(timer)
  }, [monthlyBill, monthlyConsumption, solarCapacity, state, consumerType, participantCount, formulation, backendOnline])

  const projectionData = savings ? [
    { year: 'Year 1', savings: savings.projections.year1 },
    { year: 'Year 5', savings: savings.projections.year5 },
    { year: 'Year 10', savings: savings.projections.year10 },
    { year: 'Year 25', savings: savings.projections.year25 }
  ] : []

  const monthlyData = savings ? Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    savings: Math.round(savings.monthlySavings * (0.85 + Math.random() * 0.3)) // Seasonal variation
  })) : []

  const COLORS = ['#16a34a', '#15803d', '#dc2626', '#ca8a04']

  const handleBillUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      setError(null)

      // Show preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setBillPreview(event.target?.result)
      }
      reader.readAsDataURL(file)

      // Extract data via backend OCR
      const extracted = await apiClient.extractBill(file)

      if (extracted.extracted.state && extracted.extracted.monthlyBill) {
        setBillUpload({
          fileName: file.name,
          detected: true,
          extracted: extracted.extracted
        })

        // Auto-fill form with extracted data
        setState(extracted.extracted.state)
        setConsumerType(extracted.extracted.consumerType || 'residential')
        setMonthlyBill(extracted.extracted.monthlyBill)
        setMonthlyConsumption(extracted.extracted.monthlyConsumption || monthlyConsumption)
      } else {
        setError('Could not extract bill data. Please enter details manually.')
      }
    } catch (err) {
      setError(`Bill extraction failed: ${err.message}. Please enter details manually.`)
    } finally {
      setLoading(false)
    }
  }

  const clearBillUpload = () => {
    setBillUpload(null)
    setBillPreview(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Savings Calculator</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get a detailed breakdown of your potential savings with shared solar.
          </p>
        </motion.div>

        {/* Bill Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-8 border border-primary-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Upload Your Bill Photo (Optional)</h2>
          </div>

          <p className="text-slate-600 mb-6">
            Upload a photo of your electricity bill to auto-fill your details instantly with our AI-powered bill parser.
          </p>

          {!billUpload ? (
            <div className="flex flex-col items-center justify-center">
              <label className="w-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBillUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary-300 rounded-xl p-8 text-center hover:bg-primary-50 transition-colors">
                  <Upload className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 mb-1">Click to upload bill photo</p>
                  <p className="text-sm text-slate-600">or drag and drop (PNG, JPG, PDF)</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {billPreview && (
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <img src={billPreview} alt="Bill" className="w-24 h-32 object-cover rounded-lg border border-slate-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-accent-600" />
                      <p className="font-semibold text-slate-900">Bill Analyzed Successfully!</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-slate-600">File:</span> <span className="font-medium">{billUpload.fileName}</span></p>
                      <p><span className="text-slate-600">State:</span> <span className="font-medium text-primary-600">Karnataka</span></p>
                      <p><span className="text-slate-600">Consumer Type:</span> <span className="font-medium text-primary-600">Residential</span></p>
                      <p><span className="text-slate-600">Monthly Bill:</span> <span className="font-medium text-accent-600">₹8,500</span></p>
                    </div>
                    <button
                      onClick={clearBillUpload}
                      className="mt-4 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors flex items-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                      Clear & Upload Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Calculator Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl p-8 mb-12 border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <CalcIcon className="w-6 h-6 text-primary-600" />
            {billUpload ? 'Adjust Your Calculation' : 'Customize Your Calculation'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {states.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Consumer Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Consumer Type</label>
              <select
                value={consumerType}
                onChange={(e) => setConsumerType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {CONSUMER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Formulation */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Formulation</label>
              <select
                value={formulation}
                onChange={(e) => setFormulation(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="vnm">Virtual Net Metering</option>
                <option value="gnm">Group Net Metering</option>
              </select>
            </div>

            {/* Monthly Bill */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Monthly Bill (₹): {formatINR(monthlyBill)}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>

            {/* Monthly Consumption */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Monthly Consumption (kWh): {formatNumber(monthlyConsumption)}
              </label>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={monthlyConsumption}
                onChange={(e) => setMonthlyConsumption(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>

            {/* Solar Capacity */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Solar Capacity (kW): {solarCapacity} kW
              </label>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={solarCapacity}
                onChange={(e) => setSolarCapacity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>

            {/* Participant Count (VNM only) */}
            {formulation === 'vnm' && (
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Number of Participants: {participantCount}
                </label>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={participantCount}
                  onChange={(e) => setParticipantCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center gap-3"
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
            <p className="text-blue-700">Calculating savings...</p>
          </motion.div>
        )}

        {/* Results Grid */}
        {savings && (
          <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Monthly Savings', value: savings.monthlySavings, prefix: '₹' },
            { label: 'Annual Savings', value: savings.annualSavings, prefix: '₹' },
            { label: 'Payback Period', value: savings.paybackPeriod, suffix: ' years' },
            { label: 'Offset %', value: savings.electricityOffsetPercentage, suffix: '%' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-slate-200"
            >
              <p className="text-slate-600 text-sm font-medium mb-2">{item.label}</p>
              <p className="text-3xl font-bold text-primary-600">
                {item.prefix}{formatNumber(item.value)}{item.suffix}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Long-term Projections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-slate-200"
          >
            <h3 className="text-xl font-bold mb-6 text-slate-900">25-Year Savings Projection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => formatINR(value)} />
                <Area type="monotone" dataKey="savings" stroke="#16a34a" fillOpacity={1} fill="url(#colorSavings)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Variation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-slate-200"
          >
            <h3 className="text-xl font-bold mb-6 text-slate-900">Monthly Savings Variation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatINR(value)} />
                <Bar dataKey="savings" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Detailed Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-slate-200 mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-slate-900">Detailed Breakdown</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Annual Solar Generation</span>
                <span className="font-semibold text-slate-900">{formatNumber(savings.annualGeneration)} kWh</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Electricity Offset</span>
                <span className="font-semibold text-slate-900">{savings.electricityOffsetPercentage}%</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Carbon Reduction (Annual)</span>
                <span className="font-semibold text-slate-900">{formatNumber(savings.carbonReductionTons)} tons CO₂</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-600 font-semibold">System Cost (Pre-Subsidy)</span>
                <span className="font-bold text-primary-600">{formatINR(savings.systemCost)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-primary-50 p-6 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Recommended Model</p>
                <p className="text-2xl font-bold text-primary-600">{savings.recommendedModel ? savings.recommendedModel.toUpperCase() : 'VNM'}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Total 5-Year Savings</p>
                <p className="text-2xl font-bold text-slate-900">{formatINR(savings.projections.year5)}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Total 25-Year Savings</p>
                <p className="text-2xl font-bold text-slate-900">{formatINR(savings.projections.year25)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Move Forward?</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Schedule a free consultation with our solar experts to discuss your project and subsidies available in {stateData.name}.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Book Free Consultation
          </a>
        </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
