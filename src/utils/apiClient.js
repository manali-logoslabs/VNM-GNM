// API Client for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = {
  // Calculate savings
  async calculate(params) {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Check eligibility
  async checkEligibility(state, consumerType, formulation = 'vnm') {
    const response = await fetch(`${API_BASE_URL}/calculate/eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, consumerType, formulation })
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Batch calculate
  async calculateBatch(scenarios) {
    const response = await fetch(`${API_BASE_URL}/calculate/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarios })
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Get all states
  async getStates() {
    const response = await fetch(`${API_BASE_URL}/states`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Get specific state policy
  async getState(stateName) {
    const response = await fetch(`${API_BASE_URL}/states/${stateName.toLowerCase()}`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Get state tariffs
  async getStateTariffs(stateName) {
    const response = await fetch(`${API_BASE_URL}/states/${stateName.toLowerCase()}/tariffs`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Get state eligibility
  async getStateEligibility(stateName) {
    const response = await fetch(`${API_BASE_URL}/states/${stateName.toLowerCase()}/eligibility`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Extract bill data via OCR
  async extractBill(file) {
    const formData = new FormData()
    formData.append('bill', file)

    const response = await fetch(`${API_BASE_URL}/bills/extract`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Save manual bill data
  async saveBillManual(billData) {
    const response = await fetch(`${API_BASE_URL}/bills/manual`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billData)
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Health check
  async health() {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`)
      const data = await response.json()
      return data.status === 'Backend is running'
    } catch {
      return false
    }
  }
}
