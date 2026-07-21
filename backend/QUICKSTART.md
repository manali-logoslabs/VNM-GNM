# Backend Quick Start Guide

Get the backend running in 5 minutes.

---

## Step 1: Install dependencies

```bash
cd backend
npm install
```

---

## Step 2: Create environment file

```bash
cp .env.example .env
```

Edit `.env` (optional, defaults work fine for local dev):
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## Step 3: Start the backend

```bash
npm run dev
```

You should see:
```
🚀 Backend running on http://localhost:5000
📊 Calculator API: POST http://localhost:5000/api/calculate
📸 Bill Parser API: POST http://localhost:5000/api/bills/extract
🌍 States API: GET http://localhost:5000/api/states
```

---

## Step 4: Test it's working

Open a new terminal and run:

```bash
# Test health check
curl http://localhost:5000/api/health

# Test calculation
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyBill": 6000,
    "monthlyConsumption": 1000,
    "solarCapacity": 5,
    "state": "karnataka",
    "consumerType": "residential"
  }'

# Test get states
curl http://localhost:5000/api/states

# Test get state policy
curl http://localhost:5000/api/states/karnataka
```

---

## Step 5: Connect frontend (optional)

Update frontend `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Then update `src/utils/calculator.js` to call backend instead:

```javascript
import { apiClient } from '../utils/apiClient'

// Use apiClient.calculate() instead of calculateSavings()
```

See `FRONTEND_INTEGRATION.md` for complete integration.

---

## API Endpoints Cheat Sheet

### Calculate
```bash
POST /api/calculate
{
  "monthlyBill": 6000,
  "monthlyConsumption": 1000,
  "solarCapacity": 5,
  "state": "karnataka",
  "consumerType": "residential",
  "participantCount": 1,
  "formulation": "vnm"
}
```

### Check Eligibility
```bash
POST /api/calculate/eligibility
{
  "state": "karnataka",
  "consumerType": "residential",
  "formulation": "vnm"
}
```

### Get States
```bash
GET /api/states
```

### Get State Policy
```bash
GET /api/states/karnataka
```

### Get State Tariffs
```bash
GET /api/states/karnataka/tariffs
```

### Get State Eligibility
```bash
GET /api/states/karnataka/eligibility
```

### Extract Bill (OCR)
```bash
POST /api/bills/extract
(multipart/form-data with 'bill' file)
```

### Save Bill Manually
```bash
POST /api/bills/manual
{
  "state": "karnataka",
  "consumerType": "residential",
  "monthlyBill": 6000,
  "monthlyConsumption": 1000
}
```

---

## Common Issues

### Port already in use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### CORS errors
Backend already has CORS enabled. If you get CORS errors:
1. Check backend is running on correct port
2. Check frontend `.env` has correct `REACT_APP_API_URL`
3. Restart both frontend and backend

### OCR not working
Tesseract.js downloads model on first use (~60MB). This happens automatically but requires internet.

If it fails:
- Check internet connection
- Check browser console for errors
- Try uploading a cleaner bill image
- Use manual entry as fallback

---

## Next Steps

1. ✅ Backend running locally
2. ⏭️ [Connect frontend](FRONTEND_INTEGRATION.md)
3. ⏭️ [Deploy to production](README.md#deployment)
4. ⏭️ Add database for lead storage
5. ⏭️ Add authentication

---

## File Structure

```
backend/
├── server.js              ← Main Express server
├── package.json
├── .env.example
├── models/
│   └── statePolicy.js     ← State policies database
├── routes/
│   ├── calculate.js       ← Calculation endpoints
│   ├── bills.js           ← Bill extraction endpoints
│   └── states.js          ← State info endpoints
├── utils/
│   └── calculator.js      ← Calculation logic
├── README.md              ← Full API documentation
├── FRONTEND_INTEGRATION.md ← How to connect frontend
└── QUICKSTART.md          ← This file
```

---

## Getting Help

- **API not responding?** Check terminal for error messages
- **Calculation wrong?** Verify inputs match expected format
- **Bill extraction failing?** Try uploading a clearer image or use manual entry
- **CORS errors?** Ensure frontend `.env` has correct API URL

---

**That's it!** Your backend is ready to power the solar calculator. 🚀
