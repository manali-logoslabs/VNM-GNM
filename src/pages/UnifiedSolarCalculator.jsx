import { useState, useEffect } from 'react'
import { Upload, Zap } from 'lucide-react'
import { parseBill } from '../utils/billParserV3'
import VNMGNMResultsTable from '../components/VNMGNMResultsTable'

// Get state-specific solar parameters
const STATE_SOLAR_DATA = {
  delhi: { peakSunHours: 5.3, performanceRatio: 0.80, minCapacity: 1, maxCapacity: null },
  karnataka: { peakSunHours: 4.56, performanceRatio: 0.80, minCapacity: 5, maxCapacity: null },
  rajasthan: { peakSunHours: 5.8, performanceRatio: 0.80, minCapacity: 1, maxCapacity: null },
  maharashtra: { peakSunHours: 5.5, performanceRatio: 0.80, minCapacity: 1, maxCapacity: null },
  chhattisgarh: { peakSunHours: 4.6, performanceRatio: 0.80, minCapacity: 1, maxCapacity: 500 },
  meghalaya: { peakSunHours: 4.0, performanceRatio: 0.75, minCapacity: 5, maxCapacity: 500 }
}

// Calculate recommended solar capacity
function calculateSolarRecommendation(totalConsumption, state = 'delhi') {
  const data = STATE_SOLAR_DATA[state.toLowerCase()] || STATE_SOLAR_DATA.delhi
  const annualConsumption = totalConsumption * 12
  const recommendedCapacity = (annualConsumption * 0.80) / (data.peakSunHours * 365 * data.performanceRatio)

  const minCap = data.minCapacity
  const maxCap = data.maxCapacity || 100
  const finalCapacity = Math.max(minCap, Math.min(recommendedCapacity, maxCap))

  return {
    raw: parseFloat(recommendedCapacity.toFixed(2)),
    recommended: parseFloat(finalCapacity.toFixed(1)),
    min: minCap,
    max: maxCap,
    annualConsumption,
    peakSunHours: data.peakSunHours,
    performanceRatio: data.performanceRatio
  }
}

export default function UnifiedSolarCalculator() {
  // Step flow: 1=Upload Bill, 2=Select Scheme, 3=Add Participants (if VNM/GNM), 4=Config Solar, 5=Results
  const [step, setStep] = useState(1)
  const [scheme, setScheme] = useState('vnm') // Default to VNM
  const [extractedData, setExtractedData] = useState(null)
  const [ocrStatus, setOcrStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Participants for VNM/GNM
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Primary Consumer', consumption: 300, consumerType: 'domestic', currentBill: 0, ratio: 100 }
  ])

  // Solar config
  const [solarCapacity, setSolarCapacity] = useState(5)
  const [daytimeConsumption, setDaytimeConsumption] = useState(40)
  const [generatingMeterImport, setGeneratingMeterImport] = useState(0)
  const [results, setResults] = useState(null)
  const [solarRecommendation, setSolarRecommendation] = useState(null)
  const [showProposal, setShowProposal] = useState(false)

  // Calculate solar recommendation when participants or state changes (for VNM/GNM)
  useEffect(() => {
    if ((scheme === 'vnm' || scheme === 'gnm') && participants.length > 0) {
      const totalConsumption = participants.reduce((sum, p) => sum + parseFloat(p.consumption || 0), 0)
      const state = extractedData?.state || 'delhi'
      const recommendation = calculateSolarRecommendation(totalConsumption, state)
      setSolarRecommendation(recommendation)
      // Auto-fill with recommendation
      setSolarCapacity(recommendation.recommended)
    }
  }, [participants, scheme, extractedData?.state])

  // Handle file upload with OCR
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setError(null)
    setOcrStatus('Starting OCR extraction...')

    try {
      const data = await parseBill(file, (progress) => {
        const percent = Math.round(progress.progress * 100)
        setOcrStatus(`OCR Processing: ${percent}%`)
      })

      setExtractedData(data)
      setOcrStatus('OCR Complete ✓')
      // Update primary participant with extracted bill
      setParticipants([{
        id: 1,
        name: 'Primary Consumer',
        consumption: data.monthlyConsumptionKwh || 300,
        consumerType: data.tariffCategory?.toLowerCase() || 'domestic',
        currentBill: data.totalBillRupees || 0,
        ratio: 100
      }])
      setStep(2)
    } catch (err) {
      setError(`OCR Error: ${err?.message || 'Unknown error'}. Please enter data manually.`)
      // Allow manual entry
      setExtractedData({
        monthlyConsumptionKwh: null,
        sanctionedLoadKw: null,
        totalBillRupees: 0,
        tariffCategory: 'Domestic',
        state: 'delhi'
      })
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  // Update extracted data (manual entry)
  const handleDataUpdate = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      [field]: value === '' ? null : value
    }))
  }

  // Proceed from bill to scheme selection
  const handleProceedToScheme = () => {
    if (!extractedData?.monthlyConsumptionKwh || !extractedData?.totalBillRupees) {
      setError('❌ Please enter Monthly Consumption and Total Bill')
      return
    }
    // Update primary participant with manual data
    setParticipants([{
      id: 1,
      name: 'Primary Consumer',
      consumption: extractedData.monthlyConsumptionKwh,
      consumerType: extractedData.tariffCategory?.toLowerCase() || 'domestic',
      currentBill: extractedData.totalBillRupees,
      ratio: 100
    }])
    setStep(2)
  }

  // Proceed from scheme to participants (if VNM/GNM)
  const handleSchemeSelected = () => {
    if (scheme === 'snm') {
      // Skip to solar config
      setStep(4)
    } else {
      // Go to participant input
      setStep(3)
    }
  }

  // Proceed from participants to proposal review (VNM/GNM) or directly to solar config (SNM)
  const handleProceedToSolar = () => {
    if (scheme === 'vnm' || scheme === 'gnm') {
      // Auto-calculate ratios based on consumption before showing proposal
      if (scheme === 'vnm') {
        const totalConsumption = participants.reduce((sum, p) => sum + parseFloat(p.consumption || 0), 0)
        if (totalConsumption > 0) {
          const updatedParticipants = participants.map(p => ({
            ...p,
            ratio: parseFloat(((parseFloat(p.consumption || 0) / totalConsumption) * 100).toFixed(1))
          }))
          setParticipants(updatedParticipants)
        }
      }
      // Show proposal review for VNM/GNM with auto-calculated ratios
      setShowProposal(true)
    } else {
      setStep(4)
    }
  }

  // Handle calculation
  const handleCalculate = async () => {
    setLoading(true)
    setError(null)

    try {
      const state = extractedData.state || 'delhi'
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

      if (scheme === 'snm') {
        // SNM uses Bill Simulator endpoint
        const payload = {
          state,
          monthlyConsumption: parseFloat(participants[0].consumption),
          sanctionedLoad: 10,
          consumerType: participants[0].consumerType || 'domestic',
          fixedCharges: 0,
          energyCharge: parseFloat(participants[0].currentBill || 0),
          facPercentage: 3,
          dutyPercentage: 12,
          taxPercentage: 0,
          subsidyAmount: 0,
          daytimeConsumptionPercent: parseFloat(daytimeConsumption)
        }

        const response = await fetch(`${API_URL}/bill-simulator/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const data = await response.json()
        if (data.success) {
          setResults({ ...data.data, scheme: 'snm' })
          setStep(5)
        } else {
          setError(`❌ ${data.error || 'Calculation failed'}`)
        }
      } else {
        // VNM/GNM use dedicated endpoint
        const payload = {
          scheme,
          state,
          solarCapacity: parseFloat(solarCapacity),
          daytimePercent: parseFloat(daytimeConsumption),
          generatingMeterImport: parseFloat(generatingMeterImport),
          participants: scheme === 'vnm' ? participants.map(p => ({
            ...p,
            id: String(p.id),
            consumption: parseFloat(p.consumption),
            currentBill: parseFloat(p.currentBill || 0),
            ratio: parseFloat(p.ratio || 0)
          })) : undefined,
          allocationRatios: scheme === 'vnm'
            ? Object.fromEntries(participants.map(p => [String(p.id), parseFloat(p.ratio || 0)]))
            : undefined,
          connections: scheme === 'gnm' ? participants.map(p => ({
            ...p,
            id: String(p.id),
            consumption: parseFloat(p.consumption),
            currentBill: parseFloat(p.currentBill || 0)
          })) : undefined,
          priorityList: scheme === 'gnm'
            ? participants.map(p => String(p.id))
            : undefined
        }

        const response = await fetch(`${API_URL}/vnm-gnm/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const data = await response.json()
        if (data.success) {
          setResults(data)
          setStep(5)
        } else {
          setError(`❌ ${data.error || 'Calculation failed'}`)
        }
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
            <h1 className="text-4xl font-bold text-white">Solar Net Metering Calculator</h1>
          </div>
          <p className="text-lg text-slate-300">Upload your bill and calculate savings with SNM, VNM, or GNM</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8 max-w-4xl mx-auto">
          {['Upload', 'Scheme', 'Participants', 'Solar', 'Results'].map((label, i) => {
            const stepNum = i + 1
            const show = scheme === 'snm' ? stepNum !== 3 : true
            if (!show) return null

            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                  stepNum <= step ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {stepNum < step ? '✓' : stepNum}
                </div>
                <span className="text-xs text-slate-400 text-center">{label}</span>
              </div>
            )
          })}
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* STEP 1: Upload Bill */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Step 1: Upload Your Bill</h2>

              <div className="mb-6">
                <label className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500">
                    <Upload className="w-12 h-12 text-blue-500 mb-4" />
                    <p className="text-gray-900 font-semibold mb-2">Upload Bill Image or PDF</p>
                    <p className="text-gray-500 text-sm">PNG, JPG, PDF (max 10MB)</p>
                  </div>
                  <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.jpg,.png,.jpeg" />
                </label>
              </div>

              {ocrStatus && (
                <div className="mb-6 p-3 bg-blue-50 rounded text-sm text-blue-700">{ocrStatus}</div>
              )}

              {extractedData && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Consumption (kWh)</label>
                    <input
                      type="number"
                      value={extractedData.monthlyConsumptionKwh || ''}
                      onChange={(e) => handleDataUpdate('monthlyConsumptionKwh', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Monthly Bill (₹)</label>
                    <input
                      type="number"
                      value={extractedData.totalBillRupees || ''}
                      onChange={(e) => handleDataUpdate('totalBillRupees', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <select
                      value={extractedData.state || 'delhi'}
                      onChange={(e) => handleDataUpdate('state', e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="delhi">Delhi</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="chhattisgarh">Chhattisgarh</option>
                      <option value="meghalaya">Meghalaya</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                onClick={handleProceedToScheme}
                disabled={!extractedData?.monthlyConsumptionKwh || !extractedData?.totalBillRupees || loading}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded font-bold hover:bg-blue-600 disabled:opacity-50"
              >
                Continue to Scheme Selection →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Scheme */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Step 2: Select Net Metering Scheme</h2>

              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer" style={{borderColor: scheme === 'vnm' ? '#3b82f6' : '#e5e7eb', backgroundColor: scheme === 'vnm' ? '#eff6ff' : '#fff'}}>
                  <input type="radio" checked={scheme === 'vnm'} onChange={() => setScheme('vnm')} className="mt-1" />
                  <div>
                    <p className="font-bold">Virtual Net Metering (VNM)</p>
                    <p className="text-sm text-gray-600">Multiple consumers of same owner, ratio-based allocation</p>
                  </div>
                </label>

              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded font-bold hover:bg-gray-400"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSchemeSelected}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded font-bold hover:bg-blue-600"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Add Participants (VNM/GNM only) */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Step 3: Add {scheme === 'vnm' ? 'Participants' : 'Connections'}</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-3 text-left">Name</th>
                      <th className="border p-3">Consumption (kWh)</th>
                      <th className="border p-3">Type</th>
                      <th className="border p-3">Current Bill (₹)</th>
                      <th className="border p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p, idx) => (
                      <tr key={p.id}>
                        <td className="border p-2">
                          <input
                            value={p.name}
                            onChange={(e) => setParticipants(participants.map((x, i) => i === idx ? {...x, name: e.target.value} : x))}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="number"
                            value={p.consumption}
                            onChange={(e) => setParticipants(participants.map((x, i) => i === idx ? {...x, consumption: parseFloat(e.target.value) || 0} : x))}
                            className="w-full px-2 py-1 border rounded text-sm text-center"
                          />
                        </td>
                        <td className="border p-2">
                          <select
                            value={p.consumerType}
                            onChange={(e) => setParticipants(participants.map((x, i) => i === idx ? {...x, consumerType: e.target.value} : x))}
                            className="w-full px-2 py-1 border rounded text-sm"
                          >
                            <option value="domestic">Domestic</option>
                            <option value="commercial">Commercial</option>
                            <option value="industrial">Industrial</option>
                          </select>
                        </td>
                        <td className="border p-2">
                          <input
                            type="number"
                            value={p.currentBill}
                            onChange={(e) => setParticipants(participants.map((x, i) => i === idx ? {...x, currentBill: parseFloat(e.target.value) || 0} : x))}
                            className="w-full px-2 py-1 border rounded text-sm text-center"
                          />
                        </td>
                        <td className="border p-2 text-center">
                          {participants.length > 1 && (
                            <button
                              onClick={() => setParticipants(participants.filter((_, i) => i !== idx))}
                              className="text-red-600 hover:text-red-800 text-sm font-bold"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-6 p-3 bg-blue-50 rounded text-sm">
                <p>Total Consumption: {participants.reduce((sum, p) => sum + (parseFloat(p.consumption) || 0), 0).toFixed(0)} kWh/month</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setParticipants([...participants, { id: Date.now(), name: `${scheme === 'vnm' ? 'Participant' : 'Connection'} ${participants.length + 1}`, consumption: 250, consumerType: 'domestic', currentBill: 0, ratio: 0 }])}
                  className="flex-1 bg-blue-200 text-blue-900 px-6 py-3 rounded font-bold hover:bg-blue-300"
                >
                  + Add
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded font-bold hover:bg-gray-400"
                >
                  ← Back
                </button>
                <button
                  onClick={handleProceedToSolar}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded font-bold hover:bg-blue-600"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROPOSAL REVIEW: Show auto-calculated solar & ratios for VNM/GNM */}
        {showProposal && (scheme === 'vnm' || scheme === 'gnm') && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Step 3.5: Review Proposal</h2>

              {/* Solar Recommendation */}
              {solarRecommendation && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-green-900 mb-4">☀️ Recommended Solar System</h3>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <p className="text-sm text-green-700">Minimum</p>
                      <p className="text-2xl font-bold text-green-900">{solarRecommendation.min} kW</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Recommended</p>
                      <p className="text-3xl font-bold text-green-600">{solarRecommendation.recommended} kW</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Maximum</p>
                      <p className="text-2xl font-bold text-green-900">{solarRecommendation.max} kW</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 text-sm font-mono text-gray-700 space-y-2">
                    <div><strong>Formula:</strong> (Annual Consumption × 0.80) ÷ (Peak Sun Hours × 365 × PR)</div>
                    <div className="border-t pt-2 mt-2">
                      <div>Total Annual: {solarRecommendation.annualConsumption?.toLocaleString() || 'N/A'} kWh</div>
                      <div>Peak Sun Hours: {solarRecommendation.peakSunHours} hrs/day</div>
                      <div>Performance Ratio: {solarRecommendation.performanceRatio}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Allocation Ratios */}
              {scheme === 'vnm' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-blue-900 mb-4">📊 Auto-Calculated Allocation Ratios</h3>
                  <p className="text-sm text-blue-700 mb-4">Each participant's ratio is automatically calculated as their share of total consumption:</p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-100">
                        <tr>
                          <th className="border p-3 text-left">Participant</th>
                          <th className="border p-3">Consumption (kWh)</th>
                          <th className="border p-3">Ratio %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((p) => (
                          <tr key={p.id} className="hover:bg-blue-50">
                            <td className="border p-3">{p.name}</td>
                            <td className="border p-3 text-center">{parseFloat(p.consumption || 0).toLocaleString()}</td>
                            <td className="border p-3 text-center font-bold text-green-600">{(parseFloat(p.ratio || 0)).toFixed(1)}%</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                          <td className="border p-3">Total</td>
                          <td className="border p-3 text-center">{participants.reduce((sum, p) => sum + parseFloat(p.consumption || 0), 0).toLocaleString()}</td>
                          <td className="border p-3 text-center">{participants.reduce((sum, p) => sum + parseFloat(p.ratio || 0), 0).toFixed(1)}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-blue-600 mt-3">
                    ✓ These ratios are calculated automatically. If you want to change them, go back to edit participant consumption.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setShowProposal(false)}
                  className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded font-bold hover:bg-gray-400"
                >
                  ← Back to Edit
                </button>
                <button
                  onClick={() => {
                    setShowProposal(false)
                    setStep(4)
                  }}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded font-bold hover:bg-green-600"
                >
                  Confirm & Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Configure Solar */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Step {scheme === 'snm' ? '2' : '4'}: Configure Solar System</h2>

              {/* Solar Recommendation for VNM/GNM */}
              {(scheme === 'vnm' || scheme === 'gnm') && solarRecommendation && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-blue-900 mb-4">💡 Recommended Solar Capacity</h3>

                  {/* Calculation Breakdown */}
                  <div className="bg-white rounded-lg p-4 mb-4 text-sm font-mono text-gray-700 space-y-2">
                    <div><strong>Formula:</strong> (Annual Consumption × 0.80) ÷ (Peak Sun Hours × 365 × Performance Ratio)</div>
                    <div className="border-t pt-2 mt-2">
                      <div>Annual Consumption: {solarRecommendation.annualConsumption.toLocaleString()} kWh</div>
                      <div>Peak Sun Hours: {solarRecommendation.peakSunHours} hrs/day</div>
                      <div>Performance Ratio: {solarRecommendation.performanceRatio}</div>
                      <div className="border-t pt-2 mt-2">
                        <strong>Calculated: ({solarRecommendation.annualConsumption} × 0.80) ÷ ({solarRecommendation.peakSunHours} × 365 × {solarRecommendation.performanceRatio}) = <span className="text-green-600">{solarRecommendation.raw} kW</span></strong>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-blue-700">Minimum</p>
                      <p className="text-2xl font-bold text-blue-900">{solarRecommendation.min} kW</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Recommended</p>
                      <p className="text-2xl font-bold text-green-600">{solarRecommendation.recommended} kW</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Maximum</p>
                      <p className="text-2xl font-bold text-blue-900">{solarRecommendation.max} kW</p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-3 text-center">✓ Auto-filled below. You can override if needed.</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Solar Capacity (kW)</label>
                  <input
                    type="number"
                    value={solarCapacity}
                    onChange={(e) => setSolarCapacity(parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                {scheme === 'snm' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Daytime Consumption % (40-60)</label>
                    <input
                      type="number"
                      value={daytimeConsumption}
                      onChange={(e) => setDaytimeConsumption(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border rounded"
                      min="40"
                      max="60"
                    />
                  </div>
                )}

                {scheme === 'snm' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Generating Meter Import (kWh) - Leave 0 if no local consumption</label>
                    <input
                      type="number"
                      value={generatingMeterImport}
                      onChange={(e) => setGeneratingMeterImport(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                )}

                {(scheme === 'vnm' || scheme === 'gnm') && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>VNM/GNM Note:</strong> Solar generation will be allocated based on your {scheme === 'vnm' ? 'allocation ratios' : 'priority list'}.
                      Consumption timing doesn't affect the calculation.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(scheme === 'snm' ? 1 : 3)}
                  className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded font-bold hover:bg-gray-400"
                >
                  ← Back
                </button>
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded font-bold hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? 'Calculating...' : '✓ Calculate Results'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Results */}
        {step === 5 && results && (
          <div>
            <button
              onClick={() => setStep(scheme === 'snm' ? 4 : 4)}
              className="mb-6 bg-gray-300 text-gray-900 px-6 py-2 rounded font-bold hover:bg-gray-400"
            >
              ← Back
            </button>
            <VNMGNMResultsTable results={results} />
          </div>
        )}
      </div>
    </div>
  )
}
