# Quick Start Guide - Backend + Frontend Integration

Get the calculator running in under 5 minutes.

---

## Terminal 1: Start Backend

```bash
cd backend
npm install  # (only first time)
npm run dev
```

Expected:
```
🚀 Backend running on http://localhost:5000
```

---

## Terminal 2: Start Frontend

```bash
# In root directory
npm run dev
```

Expected:
```
➜  Local: http://localhost:5173/
```

---

## Open Calculator

Go to: **http://localhost:5173/#/calculator**

---

## Test It

**Fill in:**
- State: **Karnataka**
- Consumer Type: **Residential**
- Monthly Bill: **₹6,000**
- Monthly Consumption: **1,000 kWh**
- Solar Capacity: **5 kW**

**Expected Results:**
```
Monthly Savings: ₹2,667
Annual Savings: ₹32,001
Payback Period: 6 years
```

---

## What You Now Have

✅ **Working Calculator**
- Uses state-specific policies
- Calculates accurate savings
- Shows 25-year projections

✅ **Bill Upload (OCR)**
- Upload bill image
- Auto-extracts state, bill amount, consumption
- Auto-fills form

✅ **Full Backend API**
- Calculate savings
- Check eligibility
- Extract bills
- Compare states
- Batch calculations

✅ **Complete Documentation**
- API reference: `backend/README.md`
- Testing guide: `INTEGRATION_TESTING.md`
- Integration details: `backend/FRONTEND_INTEGRATION.md`

---

## Next Steps

1. ✅ Run `npm run dev` in root (frontend)
2. ✅ Run `npm run dev` in backend/ (backend)
3. ✅ Go to http://localhost:5173/#/calculator
4. ✅ Test with default values
5. ⏭️ Try different states
6. ⏭️ Test bill upload

---

**Your calculator is live! 🚀**
