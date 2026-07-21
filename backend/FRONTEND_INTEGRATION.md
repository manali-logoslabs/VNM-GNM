# Frontend Integration Guide

How to integrate the React frontend with the backend API.

## Setup

### 1. Add API client utility

Create `src/utils/apiClient.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

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

  // Get all states
  async getStates() {
    const response = await fetch(`${API_BASE_URL}/states`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Get state policy
  async getState(stateName) {
    const response = await fetch(`${API_BASE_URL}/states/${stateName}`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Get state tariffs
  async getStateTariffs(stateName) {
    const response = await fetch(`${API_BASE_URL}/states/${stateName}/tariffs`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },

  // Extract bill data
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
  }
}
```

---

### 2. Update Calculator.jsx

Replace the frontend calculation with backend API call:

```javascript
import { apiClient } from '../utils/apiClient'

export default function Calculator() {
  // ... existing state ...
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const savings = useMemo(() => {
    return null // Will be fetched from backend
  }, [])

  // Call backend API when inputs change
  useEffect(() => {
    const fetchCalculation = async () => {
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
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Debounce calculation requests (only call every 500ms)
    const timer = setTimeout(fetchCalculation, 500)
    return () => clearTimeout(timer)
  }, [monthlyBill, monthlyConsumption, solarCapacity, state, consumerType, participantCount, formulation])

  // Handle bill upload with backend OCR
  const handleBillUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      
      // Show preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setBillPreview(event.target.result)
      }
      reader.readAsDataURL(file)

      // Extract data via backend OCR
      const extracted = await apiClient.extractBill(file)
      
      // Auto-fill if extraction successful
      if (extracted.extracted.state) {
        setState(extracted.extracted.state)
        setConsumerType(extracted.extracted.consumerType || 'residential')
        
        if (extracted.extracted.monthlyBill) {
          setMonthlyBill(extracted.extracted.monthlyBill)
        }
        if (extracted.extracted.monthlyConsumption) {
          setMonthlyConsumption(extracted.extracted.monthlyConsumption)
        }

        setBillUpload({
          fileName: file.name,
          detected: true,
          extracted: extracted.extracted
        })
      }
    } catch (err) {
      setError(`Bill extraction failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (loading && !savings) {
    return <div className="text-center p-8">Calculating...</div>
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>
  }

  // ... rest of JSX ...
}
```

---

### 3. Environment variables

Create `.env` in frontend root:

```
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

### 4. Update CalculatorSection.jsx (landing page)

If you have a calculator section on landing page:

```javascript
import { apiClient } from '../utils/apiClient'

export default function CalculatorSection() {
  const [params, setParams] = useState({
    monthlyBill: 10000,
    monthlyConsumption: 1500,
    solarCapacity: 5,
    state: 'karnataka',
    consumerType: 'residential'
  })
  const [savings, setSavings] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculate = async () => {
    try {
      setLoading(true)
      const result = await apiClient.calculate(params)
      setSavings(result)
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    calculate()
  }, [params])

  return (
    <div>
      {/* Input controls */}
      {/* Results display */}
      {loading && <p>Calculating...</p>}
      {savings && <DisplayResults data={savings} />}
    </div>
  )
}
```

---

## Usage Examples

### Example 1: Simple calculation

```javascript
const result = await apiClient.calculate({
  monthlyBill: 6000,
  monthlyConsumption: 1000,
  solarCapacity: 5,
  state: 'karnataka',
  consumerType: 'residential'
})

console.log('Annual savings:', result.annualSavings)
console.log('Payback period:', result.paybackPeriod)
```

### Example 2: Check eligibility before calculation

```javascript
const eligibility = await apiClient.checkEligibility('karnataka', 'residential', 'vnm')

if (eligibility.vnmEligible) {
  // Proceed with VNM calculation
}
```

### Example 3: Bill extraction

```javascript
const fileInput = document.getElementById('billUpload')
const file = fileInput.files[0]

const extracted = await apiClient.extractBill(file)

if (extracted.extracted.state && extracted.extracted.monthlyBill) {
  // Auto-fill form with extracted data
  setFormData(extracted.extracted)
}
```

### Example 4: Batch comparison

```javascript
const scenarios = [
  {
    monthlyBill: 6000,
    monthlyConsumption: 1000,
    solarCapacity: 5,
    state: 'karnataka',
    consumerType: 'residential'
  },
  {
    monthlyBill: 6000,
    monthlyConsumption: 1000,
    solarCapacity: 5,
    state: 'maharashtra',
    consumerType: 'residential'
  }
]

const response = await fetch('http://localhost:5000/api/calculate/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ scenarios })
})

const result = await response.json()
// Compare results across states
```

---

## Error Handling

```javascript
try {
  const result = await apiClient.calculate(params)
  // Use result
} catch (error) {
  // Show error to user
  if (error.message.includes('State')) {
    showError('Invalid state selected')
  } else if (error.message.includes('Bill')) {
    showError('Invalid bill amount')
  } else {
    showError('Calculation failed. Please try again.')
  }
}
```

---

## Performance Tips

1. **Debounce calculations:** Don't call API on every keystroke
```javascript
const [debouncedParams] = useDebouncedState(params, 500)

useEffect(() => {
  fetchCalculation(debouncedParams)
}, [debouncedParams])
```

2. **Cache results:** Store calculation results to avoid duplicate requests
```javascript
const cache = new Map()

async function calculate(params) {
  const key = JSON.stringify(params)
  if (cache.has(key)) return cache.get(key)
  
  const result = await apiClient.calculate(params)
  cache.set(key, result)
  return result
}
```

3. **Lazy load states:** Fetch states only when needed
```javascript
useEffect(() => {
  if (!statesLoaded) {
    apiClient.getStates().then(setStates)
  }
}, [statesLoaded])
```

---

## Testing

### Test API locally:

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev

# Terminal 3: Test API
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyBill": 6000,
    "monthlyConsumption": 1000,
    "solarCapacity": 5,
    "state": "karnataka",
    "consumerType": "residential"
  }'
```

---

## Deployment Checklist

- [ ] Backend deployed (Heroku/AWS/DigitalOcean)
- [ ] Frontend `.env` updated with production API URL
- [ ] CORS configured on backend
- [ ] SSL/HTTPS enabled
- [ ] Database setup (if using)
- [ ] Error monitoring (Sentry/LogRocket)
- [ ] API rate limiting enabled
- [ ] Load testing done

---

## Support

For issues with integration, check:
1. Backend is running: `curl http://localhost:5000/api/health`
2. CORS is enabled in backend
3. API URL is correct in `.env`
4. Network tab in DevTools shows requests/responses
