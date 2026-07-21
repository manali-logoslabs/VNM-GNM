# Frontend-Backend Integration Testing Guide

Complete steps to test the fully integrated calculator with backend API.

---

## Prerequisites

✅ Backend installed: `backend/` folder with `npm install` done
✅ Frontend set up: React + Vite
✅ Both have the required dependencies

---

## Step 1: Start Backend

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Backend running on http://localhost:5000
📊 Calculator API: POST http://localhost:5000/api/calculate
📸 Bill Parser API: POST http://localhost:5000/api/bills/extract
🌍 States API: GET http://localhost:5000/api/states
```

---

## Step 2: Start Frontend

In a new terminal:

```bash
cd . (root directory)
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

## Step 3: Open Calculator Page

Visit: `http://localhost:5173/#/calculator`

You should see:
- ✅ State dropdown (Karnataka, Maharashtra, Rajasthan, Meghalaya, Chhattisgarh)
- ✅ Consumer Type dropdown
- ✅ Input sliders (Bill, Consumption, Capacity, Participants)
- ✅ Bill upload section

---

## Test Scenarios

### Test 1: Basic Calculation (Karnataka)

**Input:**
- State: **Karnataka**
- Consumer Type: **Residential (Apartment/House)**
- Monthly Bill: **₹6,000**
- Monthly Consumption: **1,000 kWh**
- Solar Capacity: **5 kW**
- Formulation: **Virtual Net Metering**
- Participants: **1**

**Expected Results:**
```
Monthly Savings: ~₹2,667
Annual Savings: ~₹32,001
Payback Period: ~6 years
Offset %: ~59%
System Cost: ₹175,000
```

**What's Happening:**
1. Frontend sends calculation to backend
2. Backend loads Karnataka policy
3. Tariff ₹5.80/kWh (retail), ₹2.31/kWh (export)
4. Calculates with 4.56 kWh/m²/day
5. Returns formatted results

---

### Test 2: State Comparison

**Input:**
- Same parameters as Test 1, but change State

**States to try:**
1. **Chhattisgarh** - Domestic ₹4.10 (slab 0-100 units)
2. **Rajasthan** - Domestic ₹6.00 (average)
3. **Maharashtra** - Domestic ₹5.65

**Verify:**
- ✅ Each state shows different savings
- ✅ Results update without page reload
- ✅ No errors in browser console

---

### Test 3: Bill Upload (OCR)

**Steps:**
1. Click "Click to upload bill photo"
2. Select a bill image file (JPG, PNG)
3. Wait 2-3 seconds for OCR processing

**Expected:**
- ✅ Preview image shows
- ✅ "Bill Analyzed Successfully!" message
- ✅ Form auto-fills with extracted data:
  - State (detected)
  - Consumer Type (detected)
  - Monthly Bill (extracted amount)
  - Consumption (extracted kWh)

**If OCR fails:**
- Error message appears
- Can manually enter data
- Fallback works

---

### Test 4: Loading State

**Verify:**
- When you move any slider, a loading message appears
- "Calculating savings..." displays briefly
- Results update after calculation completes
- No flickering or jumpy UI

---

### Test 5: Error Handling

**Test error scenarios:**

**Scenario A: Backend offline**
1. Stop backend: `Ctrl+C` in backend terminal
2. Try to calculate
3. Expected: Error message "Backend is running" or network error
4. Restart backend: `npm run dev`
5. Calculate again - should work

**Scenario B: Invalid inputs**
1. Set bill to 0
2. Expected: Error message or validation
3. Set consumption to 0
4. Expected: Error message

**Scenario C: Invalid state**
Manual test via curl:
```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"monthlyBill":6000,"monthlyConsumption":1000,"solarCapacity":5,"state":"invalidstate","consumerType":"residential"}'
```

Expected response:
```json
{
  "success": false,
  "error": "State \"invalidstate\" not found in policy database"
}
```

---

## Detailed Verification Checklist

### ✅ API Connection
- [ ] Backend health check: `curl http://localhost:5000/api/health`
- [ ] States endpoint: `curl http://localhost:5000/api/states`
- [ ] Single state: `curl http://localhost:5000/api/states/karnataka`

### ✅ Frontend Integration
- [ ] `.env.local` exists with `VITE_API_URL=http://localhost:5000/api`
- [ ] `src/utils/apiClient.js` exists and exports functions
- [ ] No CORS errors in browser console
- [ ] Network tab shows POST requests to `/api/calculate`

### ✅ Calculation
- [ ] Results appear within 1-2 seconds of input change
- [ ] Savings values are reasonable (between ₹0-₹100,000/year)
- [ ] Payback period is between 3-15 years
- [ ] Offset % is between 10-100%

### ✅ Bill Upload
- [ ] Upload button visible and clickable
- [ ] File selector opens
- [ ] OCR processing indicator shows
- [ ] Results display or fallback message appears

### ✅ UI/UX
- [ ] Loading indicator appears during calculation
- [ ] Error messages are clear and helpful
- [ ] No console errors (check DevTools)
- [ ] Mobile responsive (test on phone)

---

## Browser DevTools Debugging

### Network Tab
1. Open DevTools: `F12`
2. Go to **Network** tab
3. Make a calculation
4. Look for:
   - `POST /api/calculate` request
   - Status: **200**
   - Response: JSON with `success: true`
   - No 404 or 500 errors

### Console Tab
1. Go to **Console** tab
2. Make a calculation
3. Verify: **No red errors**
4. Expected: Possible info/debug logs

### Application Tab
1. Go to **Application** → **Local Storage**
2. Check if `.env.local` values are accessible
3. VITE_API_URL should be set

---

## Performance Testing

### Measure calculation time
```javascript
// In browser console
console.time('calculate')
// Move a slider or change input
// Time will appear in console
```

Expected: < 500ms from input to result display

### Measure bill extraction time
Expected: 1-3 seconds (OCR processing)

---

## Common Issues & Solutions

### Issue: "Cannot GET /api/calculate"
**Cause:** Backend not running
**Solution:** Start backend with `npm run dev`

### Issue: CORS error in console
**Cause:** API URL mismatch
**Solution:** 
1. Check `.env.local`: `VITE_API_URL=http://localhost:5000/api`
2. Check backend CORS in `server.js`
3. Restart both

### Issue: Bill upload hangs
**Cause:** Tesseract.js downloading models (~60MB first run)
**Solution:**
1. Wait 30-60 seconds
2. Check internet connection
3. Use manual entry as fallback

### Issue: Results not updating
**Cause:** Debouncing waiting for input change to stop
**Solution:** Wait 500ms after moving last slider

### Issue: Wrong calculations
**Cause:** Backend using different tariff
**Solution:**
1. Verify state in response: `curl http://localhost:5000/api/states/karnataka`
2. Check tariffs match `backend/models/statePolicy.js`
3. Clear browser cache: `Ctrl+Shift+Delete`

---

## Test Data Sets

### For Karnataka (Complete Data)
```json
{
  "monthlyBill": 6000,
  "monthlyConsumption": 1000,
  "solarCapacity": 5,
  "state": "karnataka",
  "consumerType": "residential"
}
```
Expected: Annual savings ~₹32,000

### For Chhattisgarh (Slab Tariff)
```json
{
  "monthlyBill": 4000,
  "monthlyConsumption": 1000,
  "solarCapacity": 5,
  "state": "chhattisgarh",
  "consumerType": "domestic"
}
```
Expected: Different calculation due to slab structure

### For Commercial Consumer
```json
{
  "monthlyBill": 10000,
  "monthlyConsumption": 2000,
  "solarCapacity": 10,
  "state": "maharashtra",
  "consumerType": "commercial"
}
```
Expected: Higher tariff, higher savings

---

## Success Criteria

✅ **You have successfully integrated frontend + backend when:**

1. Calculator loads without errors
2. Changing state/inputs updates results within 1 second
3. Results are state-specific (different for each state)
4. Bill upload triggers OCR extraction
5. No CORS or network errors
6. All inputs validate correctly
7. Loading and error states display properly
8. Mobile responsive design works

---

## Next Steps After Testing

1. ✅ Test locally (this guide)
2. ⏭️ Fix any issues found
3. ⏭️ Add database for lead storage (optional)
4. ⏭️ Deploy backend to cloud (Heroku/AWS/DigitalOcean)
5. ⏭️ Update `.env.local` with production API URL
6. ⏭️ Deploy frontend to GitHub Pages
7. ⏭️ Test on production

---

## Get Help

**Backend issue?** Check `backend/README.md`
**Frontend issue?** Check `backend/FRONTEND_INTEGRATION.md`
**API endpoint?** Use Postman or curl to test directly

---

**Testing complete? Your calculator is ready! 🚀**
