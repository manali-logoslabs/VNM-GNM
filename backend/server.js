import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import calculateRoutes from './routes/calculate.js'
import billRoutes from './routes/bills.js'
import stateRoutes from './routes/states.js'
import savingsCalculatorRoutes from './routes/calculator.js'
import billSimulatorRoutes from './routes/billSimulator.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Routes
app.use('/api/calculate', calculateRoutes)
app.use('/api/savings', savingsCalculatorRoutes)
app.use('/api/bill-simulator', billSimulatorRoutes)
app.use('/api/bills', billRoutes)
app.use('/api/states', stateRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date().toISOString() })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
  console.log(`📊 Calculator API: POST http://localhost:${PORT}/api/calculate`)
  console.log(`📸 Bill Parser API: POST http://localhost:${PORT}/api/bills/extract`)
  console.log(`🌍 States API: GET http://localhost:${PORT}/api/states`)
})
