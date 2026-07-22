import { useState } from 'react'

const SavingsCalculator = () => {
  const [billData, setBillData] = useState({
    monthlyConsumption: '',
    sanctionedLoad: '',
    importRate: '',
    consumerType: 'domestic'
  })

  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBillData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCalculate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const payload = {
        monthlyConsumption: parseFloat(billData.monthlyConsumption),
        sanctionedLoad: parseFloat(billData.sanctionedLoad),
        consumerType: billData.consumerType
      }

      if (billData.importRate) {
        payload.importRate = parseFloat(billData.importRate)
      }

      const API_URL = import.meta.env.VITE_API_URL || 'https://vnm-gnm-backend.onrender.com/api'
      const response = await fetch(`${API_URL}/savings/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.data)
      } else {
        setError(data.error || 'Calculation failed')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Solar Savings Calculator</h1>
          <p className="text-xl text-gray-600">Upload your electricity bill or enter consumption details to see your potential savings</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bill Details</h2>

            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Monthly Consumption */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Consumption (kWh) *
                </label>
                <input
                  type="number"
                  name="monthlyConsumption"
                  value={billData.monthlyConsumption}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000"
                  step="0.1"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">How much electricity do you use per month?</p>
              </div>

              {/* Sanctioned Load */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sanctioned Load (kW) *
                </label>
                <input
                  type="number"
                  name="sanctionedLoad"
                  value={billData.sanctionedLoad}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  step="0.1"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">Maximum allowed capacity (from your bill)</p>
              </div>

              {/* Consumer Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Consumer Type
                </label>
                <select
                  name="consumerType"
                  value={billData.consumerType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="domestic">Domestic</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>

              {/* Import Rate (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Import Rate (₹/kWh) - Optional
                </label>
                <input
                  type="number"
                  name="importRate"
                  value={billData.importRate}
                  onChange={handleInputChange}
                  placeholder="Leave blank to use default tariff"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">Default: Domestic ₹5.80/kWh</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">❌ Error</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Calculating...' : '⚡ Calculate Savings'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div>
            {results && (
              <div className="space-y-6">
                {/* Bill Comparison */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Bill Comparison</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Before Solar */}
                    <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                      <h4 className="text-lg font-bold text-red-900 mb-4">❌ Without Solar</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-red-700">Monthly Bill</p>
                          <p className="text-3xl font-bold text-red-900">
                            ₹{results.billComparison.before.monthlyBillRupees.toLocaleString()}
                          </p>
                        </div>
                        <div className="border-t-2 border-red-200 pt-3">
                          <p className="text-sm text-red-700">Per-Unit Cost</p>
                          <p className="text-2xl font-bold text-red-900">
                            ₹{results.billComparison.before.perUnitCost.toFixed(2)}/kWh
                          </p>
                        </div>
                        <div className="border-t-2 border-red-200 pt-3">
                          <p className="text-sm text-red-700">Annual Cost</p>
                          <p className="text-xl font-bold text-red-900">
                            ₹{results.billComparison.before.annualBillRupees.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* After Solar */}
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                      <h4 className="text-lg font-bold text-green-900 mb-4">✅ With Solar</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-green-700">Monthly Bill</p>
                          <p className="text-3xl font-bold text-green-900">
                            ₹{results.billComparison.after.monthlyBillRupees.toLocaleString()}
                          </p>
                        </div>
                        <div className="border-t-2 border-green-200 pt-3">
                          <p className="text-sm text-green-700">Per-Unit Cost</p>
                          <p className="text-2xl font-bold text-green-900">
                            ₹{results.billComparison.after.perUnitCost}/kWh
                          </p>
                        </div>
                        <div className="border-t-2 border-green-200 pt-3">
                          <p className="text-sm text-green-700">Annual Cost</p>
                          <p className="text-xl font-bold text-green-900">
                            ₹{results.billComparison.after.annualBillRupees.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  <div className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
                    <h4 className="text-lg font-bold mb-4">💰 Your Savings</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm opacity-90">Monthly Savings</p>
                        <p className="text-2xl font-bold">
                          ₹{results.billComparison.comparison.monthlyBillReductionRupees.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm opacity-90">Annual Savings</p>
                        <p className="text-2xl font-bold">
                          ₹{results.billComparison.comparison.annualBillReductionRupees.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm opacity-90">Per-Unit Reduction</p>
                        <p className="text-2xl font-bold">
                          ₹{results.billComparison.comparison.perUnitReductionRupees}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solar Recommendation */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🔆 Solar Recommendation</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-700">Recommended Capacity</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {results.solar.recommendedCapacityKw} kW
                      </p>
                      <p className="text-xs text-blue-600 mt-2">{results.solar.reason}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600">Annual Generation</p>
                        <p className="text-lg font-bold text-gray-900">
                          {results.generation.annualUsableKwh.toLocaleString()} kWh
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600">System Cost</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{results.investment.totalSystemCost.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI & Payback */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 ROI & Payback</h3>
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-purple-700">Payback Period</p>
                      <p className="text-3xl font-bold text-purple-900">
                        {results.investment.paybackYears} years
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600">Annual Savings</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{results.savings.totalAnnualSavingsRupees.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600">25-Year Earnings</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{results.projections.year25.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🌍 Environmental Impact</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-700">Annual CO2 Reduction</p>
                      <p className="text-2xl font-bold text-green-900">
                        {results.environmental.annualCO2ReductionTons} tons/year
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Equivalent to planting {results.environmental.equivalentTreesPlanted} trees!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!results && !loading && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Calculate?</h3>
                <p className="text-gray-600">Fill in your bill details on the left to see your potential savings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingsCalculator
