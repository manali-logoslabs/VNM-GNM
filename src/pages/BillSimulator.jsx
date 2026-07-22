import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle2, Zap } from 'lucide-react'
import { parseBill, validateExtractedData } from '../utils/billParserV3'

/**
 * BILL SIMULATOR - Phase 1: Bill Upload + OCR
 *
 * Flow:
 * 1. User uploads BESCOM bill (PDF/JPG)
 * 2. OCR extracts data
 * 3. User reviews and corrects extracted data
 * 4. System calculates new bill with solar
 * 5. Shows comparison with transparency
 */

export default function BillSimulator() {
  const [step, setStep] = useState(1) // 1=Upload, 2=Review, 3=Config, 4=Results
  const [uploadedFile, setUploadedFile] = useState(null)
  const [extractedData, setExtractedData] = useState(null)
  const [ocrStatus, setOcrStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [daytimeConsumption, setDaytimeConsumption] = useState(40)
  const [results, setResults] = useState(null)

  // Handle file upload with real OCR
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadedFile(file)
    setLoading(true)
    setError(null)
    setOcrStatus('Starting OCR extraction...')

    try {
      // Run OCR on the bill image
      const extractedData = await parseBill(file, (progress) => {
        const percent = Math.round(progress.progress * 100)
        setOcrStatus(`OCR Processing: ${percent}%`)
      })

      // Validate extracted data
      const validation = validateExtractedData(extractedData)

      setExtractedData(extractedData)
      setOcrStatus('OCR Complete ✓')
      setStep(2)
    } catch (err) {
      const errorMsg = err?.message || 'Unknown error occurred'
      setError(`OCR Error: ${errorMsg}. Please review the bill and enter data manually below.`)

      // Show manual entry form with extracted data if available
      // For now, allow user to proceed to manual entry
      setStep(2)
      setExtractedData({
        serviceNumber: 'Manual Entry',
        tariffCategory: 'Domestic',
        monthlyConsumptionKwh: null,
        sanctionedLoadKw: null,
        fixedChargeRupees: 0,
        energyChargeRupees: 0,
        facChargeRupees: 0,
        electricityDutyRupees: 0,
        taxesRupees: 0,
        subsidyRupees: 0,
        totalBillRupees: 0,
        ocrConfidence: 0,
        ocrText: ''
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle data correction
  const handleDataUpdate = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      [field]: value === '' ? null : value
    }))
  }

  // Check for missing required fields
  const getMissingFields = () => {
    const required = {
      monthlyConsumptionKwh: 'Monthly Consumption',
      sanctionedLoadKw: 'Sanctioned Load',
      energyChargeRupees: 'Energy Charge'
    }
    const missing = []
    for (const [field, label] of Object.entries(required)) {
      if (!extractedData[field] || extractedData[field] <= 0) {
        missing.push(label)
      }
    }
    return missing
  }

  // Proceed to configuration
  const handleProceedToConfig = () => {
    const missing = getMissingFields()
    if (missing.length > 0) {
      setError(`❌ Missing required fields: ${missing.join(', ')}. Please enter them manually before proceeding.`)
      return
    }
    setStep(3)
  }

  // Calculate with solar
  const handleCalculate = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        monthlyConsumption: extractedData.monthlyConsumptionKwh,
        sanctionedLoad: extractedData.sanctionedLoadKw,
        consumerType: extractedData.tariffCategory.toLowerCase(),
        fixedCharges: extractedData.fixedChargeRupees || 0,
        energyCharge: extractedData.energyChargeRupees,
        facPercentage: extractedData.energyChargeRupees > 0
          ? Math.round((extractedData.facChargeRupees / extractedData.energyChargeRupees) * 100)
          : 0,
        dutyPercentage: extractedData.energyChargeRupees > 0
          ? Math.round((extractedData.electricityDutyRupees / extractedData.energyChargeRupees) * 100)
          : 0,
        taxPercentage: extractedData.energyChargeRupees > 0
          ? Math.round((extractedData.taxesRupees / extractedData.energyChargeRupees) * 100)
          : 0,
        subsidyAmount: extractedData.subsidyRupees || 0,
        daytimeConsumptionPercent: daytimeConsumption
      }

      const API_URL = import.meta.env.VITE_API_URL || 'https://vnm-gnm-backend.onrender.com/api'
      const response = await fetch(`${API_URL}/bill-simulator/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.data)
        setStep(4)
      } else {
        setError(`❌ ${data.error || 'Calculation failed'}`)
      }
    } catch (err) {
      setError(`Connection error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Savings Calculator</h1>
          </div>
          <p className="text-lg text-slate-300">Upload your BESCOM electricity bill. We'll show you exactly how much solar can save.</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8 max-w-2xl mx-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                i <= step
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {i < step ? '✓' : i}
              </div>
              <span className="text-xs text-slate-400 text-center">
                {i === 1 ? 'Upload' : i === 2 ? 'Review' : i === 3 ? 'Config' : 'Results'}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: Upload */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-dashed border-blue-300">
              <label className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center py-12">
                  <Upload className="w-16 h-16 text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Bill</h2>
                  <p className="text-gray-600 text-center mb-4">
                    Click to upload or drag and drop<br />
                    <span className="text-sm text-gray-500">PNG, JPG, PDF (max 10MB)</span>
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="hidden"
                  />
                </div>
              </label>

              {loading && (
                <div className="mt-4 text-center">
                  <div className="inline-block">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                  <p className="text-gray-600 mt-2">{ocrStatus}</p>
                </div>
              )}

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {uploadedFile && !loading && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 text-sm font-medium">File ready to process</p>
                </div>
              )}

              {/* Divider */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Manual Entry Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setExtractedData({
                      serviceNumber: '',
                      tariffCategory: 'Domestic',
                      monthlyConsumptionKwh: null,
                      sanctionedLoadKw: null,
                      fixedChargeRupees: 0,
                      energyChargeRupees: 0,
                      facChargeRupees: 0,
                      electricityDutyRupees: 0,
                      taxesRupees: 0,
                      subsidyRupees: 0,
                      totalBillRupees: 0,
                      ocrConfidence: 0,
                      ocrText: ''
                    })
                    setStep(2)
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Enter Details Manually
                </button>
                <p className="text-gray-500 text-sm mt-3">Don't have your bill? No problem.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Review */}
        {step === 2 && extractedData && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {extractedData.ocrConfidence > 0 ? 'Review Extracted Data' : 'Enter Bill Details'}
              </h2>

              {extractedData.ocrConfidence > 0 ? (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm">
                    <strong>OCR Extraction Complete</strong> - Confidence: {Math.round(extractedData.ocrConfidence)}%
                  </p>
                  <p className="text-blue-800 text-xs mt-1">
                    Please review the extracted data below. Edit any fields that appear incorrect.
                  </p>
                </div>
              ) : (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm">
                    <strong>Manual Entry</strong> - Please fill in your bill details
                  </p>
                  <p className="text-blue-800 text-xs mt-1">
                    Enter all the details from your electricity bill to calculate your savings.
                  </p>
                </div>
              )}

              {getMissingFields().length > 0 && (
                <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Required Fields Missing</p>
                    <p className="text-red-800 text-sm mb-2">Please fill in these fields before proceeding:</p>
                    <ul className="text-red-800 text-sm space-y-1">
                      {getMissingFields().map(field => (
                        <li key={field}>• {field}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {extractedData.ocrConfidence < 0.75 && getMissingFields().length === 0 && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900">⚠️ Low OCR Confidence</p>
                    <p className="text-yellow-800 text-sm">Please carefully review the data before proceeding</p>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Consumer Info */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Consumer Info</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">Service Number</label>
                      <input
                        type="text"
                        value={extractedData.serviceNumber}
                        onChange={e => handleDataUpdate('serviceNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">Tariff Category</label>
                      <select
                        value={extractedData.tariffCategory}
                        onChange={e => handleDataUpdate('tariffCategory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      >
                        <option>Domestic</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                        <option>Agricultural</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Load & Consumption */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Load & Consumption</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">
                        Sanctioned Load (kW) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={extractedData.sanctionedLoadKw || ''}
                        onChange={e => handleDataUpdate('sanctionedLoadKw', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="Required"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">
                        Monthly Consumption (kWh) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={extractedData.monthlyConsumptionKwh || ''}
                        onChange={e => handleDataUpdate('monthlyConsumptionKwh', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="Required"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Bill Charges */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Bill Components</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">Fixed Charge (₹)</label>
                      <input
                        type="number"
                        value={extractedData.fixedChargeRupees}
                        onChange={e => handleDataUpdate('fixedChargeRupees', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">
                        Energy Charge (₹) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={extractedData.energyChargeRupees || ''}
                        onChange={e => handleDataUpdate('energyChargeRupees', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="Required"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Other Charges */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Other Charges</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">FAC (₹)</label>
                      <input
                        type="number"
                        value={extractedData.facChargeRupees}
                        onChange={e => handleDataUpdate('facChargeRupees', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">Duty & Taxes (₹)</label>
                      <input
                        type="number"
                        value={(extractedData.electricityDutyRupees || 0) + (extractedData.taxesRupees || 0)}
                        onChange={e => {
                          const total = e.target.value ? parseFloat(e.target.value) : 0
                          handleDataUpdate('electricityDutyRupees', total * 0.48)
                          handleDataUpdate('taxesRupees', total * 0.52)
                        }}
                        step="0.01"
                        placeholder="Enter combined duty + tax amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleProceedToConfig}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Continue to Configuration →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Configuration */}
        {step === 3 && extractedData && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">One More Question</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-blue-900 mb-4">🕐 When Do You Use Electricity?</h3>
                <p className="text-blue-800 mb-6">
                  Solar generates during the day (9 AM - 6 PM).
                  What % of your consumption happens during these hours?
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700">Daytime Consumption (9 AM - 6 PM)</label>
                      <span className="text-2xl font-bold text-blue-600">{daytimeConsumption}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={daytimeConsumption}
                      onChange={e => setDaytimeConsumption(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>Night-heavy use (10%)</span>
                      <span>Balanced (50%)</span>
                      <span>Day-heavy use (90%)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Not sure?</strong> Use these profiles:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• <strong>Residential (night AC):</strong> 30-40%</li>
                    <li>• <strong>Office (day working):</strong> 60-70%</li>
                    <li>• <strong>Factory (day shift):</strong> 80-90%</li>
                    <li>• <strong>24/7 operation:</strong> 50%</li>
                  </ul>
                </div>
              </div>

              {/* Assumption Transparency */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-amber-900 mb-3">⚠️ Assumptions & Limitations</h3>
                <ul className="text-sm text-amber-900 space-y-2">
                  <li>✓ Bill data extracted from your uploaded bill</li>
                  <li>✓ Solar generation based on KERC peak sun hours (4.56 kWh/kW/day)</li>
                  <li>✓ Tariff rates from official KERC Tariff Order 2025-26</li>
                  <li>⚠️ Daytime consumption % is YOUR ESTIMATE - actual varies by season</li>
                  <li>⚠️ Does not account for battery storage or EV charging</li>
                  <li>⚠️ Assumes single-tier tariff (not ToD slabs)</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Calculating...' : 'Calculate Savings →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Results */}
        {step === 4 && results && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">Your Solar Savings</h2>
              </div>

              {/* Bill Comparison */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Before */}
                <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-6">Current Bill (No Solar)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-red-700">Monthly Consumption</p>
                      <p className="text-3xl font-bold text-red-900">{results.before.monthlyConsumptionKwh} kWh</p>
                    </div>
                    <div className="border-t-2 border-red-200 pt-3">
                      <p className="text-sm text-red-700">Monthly Bill</p>
                      <p className="text-3xl font-bold text-red-900">₹{results.before.monthlyBillRupees.toLocaleString()}</p>
                    </div>
                    <div className="border-t-2 border-red-200 pt-3">
                      <p className="text-sm text-red-700">Per-Unit Cost</p>
                      <p className="text-2xl font-bold text-red-900">₹{results.before.perUnitCostRupees.toFixed(2)}/kWh</p>
                    </div>
                    <div className="border-t-2 border-red-200 pt-3">
                      <p className="text-sm text-red-700">Annual Cost</p>
                      <p className="text-xl font-bold text-red-900">₹{results.before.annualBillRupees.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-6">New Bill (With {results.solar.recommendedCapacityKw} kW Solar)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-green-700">Grid Consumption</p>
                      <p className="text-3xl font-bold text-green-900">{results.after.gridConsumptionKwh} kWh</p>
                      <p className="text-xs text-green-600 mt-1">({results.after.solarConsumptionKwh} kWh from solar)</p>
                    </div>
                    <div className="border-t-2 border-green-200 pt-3">
                      <p className="text-sm text-green-700">Monthly Bill</p>
                      <p className="text-3xl font-bold text-green-900">₹{results.after.monthlyBillRupees.toLocaleString()}</p>
                    </div>
                    <div className="border-t-2 border-green-200 pt-3">
                      <p className="text-sm text-green-700">Effective Per-Unit Cost</p>
                      <p className="text-2xl font-bold text-green-900">₹{results.after.effectivePerUnitRupees.toFixed(2)}/kWh</p>
                    </div>
                    <div className="border-t-2 border-green-200 pt-3">
                      <p className="text-sm text-green-700">Annual Cost</p>
                      <p className="text-xl font-bold text-green-900">₹{results.after.annualBillRupees.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white mb-8">
                <h3 className="text-xl font-bold mb-6">Your Annual Savings</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-blue-100 mb-2">Monthly Savings</p>
                    <p className="text-3xl font-bold">₹{results.savings.monthlySavingsRupees.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-100 mb-2">Annual Savings</p>
                    <p className="text-3xl font-bold">₹{results.savings.annualSavingsRupees.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-100 mb-2">Bill Reduction</p>
                    <p className="text-3xl font-bold">{results.savings.percentReductionPercent}%</p>
                  </div>
                </div>
              </div>

              {/* Solar Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Solar Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Recommended Capacity</p>
                      <p className="font-bold text-gray-900">{results.solar.recommendedCapacityKw} kW</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Annual Generation</p>
                      <p className="font-bold text-gray-900">{results.solar.annualGenerationKwh.toLocaleString()} kWh</p>
                    </div>
                    <div>
                      <p className="text-gray-600">System Cost (est.)</p>
                      <p className="font-bold text-gray-900">₹{results.solar.systemCostRupees.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payback Period</p>
                      <p className="font-bold text-gray-900">{results.solar.paybackYears} years</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Key Assumptions</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>✓ Daytime consumption: <strong>{daytimeConsumption}%</strong></p>
                    <p>✓ Night consumption: <strong>{100 - daytimeConsumption}%</strong></p>
                    <p>✓ Peak sun hours: <strong>4.56 kWh/kW/day</strong> (KERC)</p>
                    <p>✓ System efficiency: <strong>85%</strong></p>
                    <p>✓ Tariff: <strong>Official KERC rates</strong></p>
                  </div>
                </div>
              </div>

              {/* Transparency Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
                <h3 className="font-bold text-amber-900 mb-3">⚠️ Important: Transparency Notice</h3>
                <ul className="text-sm text-amber-900 space-y-2">
                  <li><strong>✓ Verified Data:</strong> Bill components extracted from your uploaded bill using OCR</li>
                  <li><strong>✓ Official Rates:</strong> Tariffs from KERC Tariff Order 2025-26</li>
                  <li><strong>✓ Generation Estimate:</strong> Based on KERC peak sun hours for Karnataka</li>
                  <li><strong>⚠️ User Estimate:</strong> Daytime consumption % is {daytimeConsumption}% - based on your input</li>
                  <li><strong>⚠️ Seasonal Variation:</strong> Actual solar generation varies ±20% by season</li>
                  <li><strong>⚠️ Consumption Variation:</strong> Your actual daytime consumption may differ from {daytimeConsumption}%</li>
                  <li><strong>⚠️ Not Included:</strong> Battery storage, EV charging, inverter replacement costs (year 10-12)</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Start Over
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Download PDF Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
