# Billing Engine v3.0 - Formulas & Calculations

Complete mathematical formulas used in the upgraded VNM/GNM solar bill calculator with accurate Indian tariff modeling.

---

## Table of Contents

1. [Current Bill Calculation](#current-bill-calculation)
2. [Solar Capacity Recommendation](#solar-capacity-recommendation)
3. [Solar Generation Calculation](#solar-generation-calculation)
4. [Bill with Solar Calculation](#bill-with-solar-calculation) ⭐ CRITICAL FIX
5. [Financial Metrics](#financial-metrics)
6. [Tariff Handling](#tariff-handling)
7. [State-Specific Charges](#state-specific-charges)
8. [Examples](#examples)

---

## Current Bill Calculation

### Energy Charge from User Input

```
energyCharge = provided by user (from their electricity bill)
perUnitCost = energyCharge / monthlyConsumption
```

**Example:** ₹1,500 for 400 kWh = ₹3.75/kWh average

### Electricity Duty (State & Category Specific)

```
dutyPercentage = policy.electricityDuty[consumerType]
dutyCharge = (energyCharge × dutyPercentage) / 100
```

**Example (Karnataka Commercial):**
- Energy charge: ₹1,500
- Duty: 12%
- Duty charge: (1,500 × 12) / 100 = ₹180

**Example (Rajasthan Domestic):**
- Energy charge: ₹1,500
- Duty: 0%
- Duty charge: ₹0

### FAC (Fuel Adjustment Cost) - Flexible Type

#### Type 1: Percentage-Based
```
facCharge = (energyCharge × fac.value) / 100
```

**Example:** 3% FAC on ₹1,500 = ₹45

#### Type 2: Per-Unit Rate
```
facCharge = units × fac.value
```

**Example:** ₹0.28/kWh on 400 kWh = ₹112

### Tax (GST-Exempt)

```
taxPercentage = policy.taxPercentage (typically 0 for electricity)
taxCharge = (energyCharge × taxPercentage) / 100
```

**Result:** ₹0 (electricity is GST-exempt in India)

### Total Current Bill

```
totalBill = fixedCharges + energyCharge + facCharge + dutyCharge + taxCharge + subsidyAmount
```

**Example (Delhi Domestic, 400 kWh):**
```
Fixed charges:          ₹100
Energy charge:        ₹1,500  (from user input)
FAC (3%):              ₹45
Duty (0%):             ₹0
Tax (0%):              ₹0
Subsidy:               ₹0
────────────────────────────
Total Current Bill:   ₹1,645
```

---

## Solar Capacity Recommendation

### Industry Standard: 80% Consumption Offset

```
annualConsumption = monthlyConsumption × 12
energyToOffset = annualConsumption × 0.80

recommendedCapacity = energyToOffset / (peakSunHours × 365 × performanceRatio)
```

**Why 80%?** Industry standard balances investment cost with savings while accounting for seasonal variation and nighttime consumption.

### Incorporating Performance Ratio

```
recommendedCapacity = (annualConsumption × 0.80) / (peakSunHours × 365 × performanceRatio)
```

**Components:**
- **Peak Sun Hours (PSH):** State-specific (e.g., Delhi 5.3, Karnataka 4.56)
- **Performance Ratio (PR):** Accounts for losses:
  - Inverter efficiency: ~96%
  - Wiring losses: ~2%
  - Soiling/dust: ~1-2%
  - Temperature: ~5%
  - Combined: ~0.75-0.80 (80% efficiency)

### Apply State Regulatory Limits

```
minCapacity = policy.capacityLimits[consumerType].min
maxCapacity = policy.capacityLimits[consumerType].max (or sanctioned_load)

finalCapacity = Math.max(minCapacity, Math.min(recommendedCapacity, maxCapacity))
```

**Example (Delhi Domestic, 400 kWh):**
```
Annual consumption = 400 × 12 = 4,800 kWh
Energy to offset = 4,800 × 0.80 = 3,840 kWh
Capacity = 3,840 / (5.3 × 365 × 0.80)
         = 3,840 / 1,546.36
         = 2.48 kW
         → Rounded to 2.5 kW
         → Clamped to [1 kW min, 12 kW max]
         → Final: 2.5 kW ✓
```

---

## Solar Generation Calculation

### Annual Generation with Performance Ratio

```
annualGrossGeneration = capacity × peakSunHours × 365
annualUsableGeneration = annualGrossGeneration × performanceRatio
monthlyUsableGeneration = annualUsableGeneration / 12
```

**Why multiply by PR?** Real-world losses from inverter, wiring, soiling, temperature.

**Example (2.5 kW in Delhi):**
```
Annual Gross = 2.5 × 5.3 × 365 = 4,844 kWh
Annual Usable = 4,844 × 0.80 = 3,875 kWh
Monthly Usable = 3,875 / 12 = 323 kWh/month
```

---

## Bill with Solar Calculation

### ⭐ CRITICAL FIX: Slab Recalculation (Not Stale Average)

**OLD BUG:** Used average tariff from original consumption, applied to reduced consumption.
```
❌ importTariff = getAverageTariff(tariffData, monthlyConsumption=400)  // ₹3.75
❌ gridEnergyCharge = gridConsumptionKwh × ₹3.75  // WRONG for slabs
```

**NEW FIX:** Recalculate tariff on reduced consumption using slab structure.
```
✓ gridEnergyResult = calculateEnergyCharge(gridConsumptionKwh, tariffData)
✓ Slabs are recomputed → cheaper rates for lower consumption tiers
```

### Energy Split: Daytime vs Nighttime

```
daytimeConsumptionKwh = monthlyConsumption × (daytimeConsumptionPercent / 100)
solarConsumptionKwh = Math.min(monthlyUsableKwh, daytimeConsumptionKwh)
gridConsumptionKwh = monthlyConsumption - solarConsumptionKwh
```

**Why?** Solar only generates during daytime. Nighttime consumption comes from grid.

**Example (400 kWh, 50% daytime, 323 kWh solar):**
```
Daytime consumption = 400 × 50% = 200 kWh
Solar consumption = Min(323, 200) = 200 kWh
Grid consumption = 400 - 200 = 200 kWh
Export = 323 - 200 = 123 kWh
```

### Calculate Grid Energy Charge (Slab-Based)

For **Slab-Based Tariff** (Delhi Domestic):
```
Grid consumption: 200 kWh
Slab 1 (0-200):   200 kWh × ₹3.00/kWh = ₹600
Slab 2 (201-400): 0 kWh
Slab 3+:          0 kWh
──────────────────────────────────────
Total charge: ₹600
Effective tariff: ₹600 / 200 = ₹3.00/kWh
```

**Why this matters:**
- Without solar (400 kWh): ₹1,500 (slabs 1-2-3, effective ₹3.75/kWh)
- With solar (200 kWh): ₹600 (slabs 1 only, effective ₹3.00/kWh) ✓ Much cheaper!

### Export Credit (Net Metering)

```
exportedKwh = monthlyUsableKwh - solarConsumptionKwh
exportRate = policy.netMetering.exportRate
exportCredit = exportedKwh × exportRate
```

**Example (Delhi, export rate ₹5.80/kWh):**
```
Exported: 123 kWh
Export credit: 123 × ₹5.80 = ₹714
```

### Electricity Duty & FAC on Reduced Energy

```
dutyCharge = (gridEnergyCharge × dutyPercentage) / 100
facCharge = (gridEnergyCharge × fac.value) / 100  [if fac.type = 'percentage']
taxCharge = (gridEnergyCharge × taxPercentage) / 100
```

**Important:** Duty/FAC/Tax calculated on reduced grid energy (not original).

**Example (Delhi Domestic):**
```
Grid energy charge: ₹600
Duty (0%):  ₹0
FAC (3%):   ₹18
Tax (0%):   ₹0
```

### Total Bill with Solar

```
totalBill = fixedCharges + gridEnergyCharge + facCharge + dutyCharge + taxCharge + subsidyAmount - exportCredit
```

**Example (Delhi Domestic):**
```
Fixed charges:        ₹100
Grid energy charge:   ₹600  (RECALCULATED for 200 kWh, not stale average)
FAC (3% of ₹600):     ₹18
Duty (0%):            ₹0
Tax (0%):             ₹0
Subsidy:              ₹0
Export credit:        ₹714
────────────────────────────
Total with Solar:     ₹4 (before subsidy offset)
```

---

## Financial Metrics

### Monthly & Annual Savings

```
monthlySavings = currentBill.totalBill - newBill.totalBill
annualSavings = monthlySavings × 12
```

**Example (Delhi Domestic):**
```
Current bill:     ₹1,645
With solar bill:  ₹4
Monthly savings:  ₹1,641
Annual savings:   ₹19,692
```

### System Cost

```
systemCost = capacity × systemCostPerKw
```

**Example (2.5 kW in Delhi):**
```
2.5 kW × ₹50,000/kW = ₹125,000
```

### PM Surya Ghar Subsidy (Residential Only)

```
if consumerType ∈ ['domestic', 'residential']:
    if capacity ≤ 2 kW:
        subsidy = capacity × ₹30,000
    else if capacity ≤ 3 kW:
        subsidy = (2 × ₹30,000) + ((capacity - 2) × ₹18,000)
    else:
        subsidy = ₹78,000  [capped]
else:
    subsidy = ₹0
```

**Subsidy Tiers:**
| Capacity | First 2 kW | 3rd kW | Total |
|----------|-----------|---------|--------|
| 1 kW | ₹30,000 | - | ₹30,000 |
| 2 kW | ₹60,000 | - | ₹60,000 |
| 2.5 kW | ₹60,000 | ₹9,000 | ₹69,000 |
| 3 kW | ₹60,000 | ₹18,000 | ₹78,000 |
| 5+ kW | - | - | ₹78,000 |

**Example (Delhi Domestic, 2.5 kW):**
```
First 2 kW:   2 × ₹30,000 = ₹60,000
3rd kW (0.5): 0.5 × ₹18,000 = ₹9,000
Total subsidy: ₹69,000
```

### Payback Period (Net Investment Approach)

```
netInvestment = systemCost - applicableSubsidy
paybackYears = netInvestment / annualSavings
```

**Example (Delhi Domestic, 2.5 kW):**
```
System cost:      ₹125,000
Subsidy:          ₹69,000
Net investment:   ₹56,000

Annual savings:   ₹19,692
Payback:          ₹56,000 / ₹19,692 = 2.84 years ≈ 2.9 years
```

**Without subsidy (hypothetical):**
```
Payback:          ₹125,000 / ₹19,692 = 6.35 years
Subsidy saves:    3.5 years! 🎯
```

### Bill Reduction Percentage

```
percentReduction = (monthlySavings / currentBill.totalBill) × 100
```

**Example:**
```
(₹1,641 / ₹1,645) × 100 = 99.8% reduction
```

---

## Tariff Handling

### Type 1: Bare Number (Legacy)

```
energyCharge = units × tariffRate
```

**Example (Karnataka domestic, flat ₹5.80/kWh):**
```
400 kWh × ₹5.80 = ₹2,320
```

### Type 2: Flat Tariff

```
energyCharge = units × rate
```

**Example (Delhi commercial, flat ₹8.00/kWh):**
```
300 kWh × ₹8.00 = ₹2,400
```

### Type 3: Slab-Based (Telescopic) ⭐ MOST COMPLEX

For each slab `{ max, rate }` in order:

```
remainingUnits = consumption
totalCharge = 0

for slab in slabs:
    slabSize = min(slab.max, remainingUnits) - previousUsage
    if slabSize > 0:
        charge = slabSize × slab.rate
        totalCharge += charge
        previousUsage += slabSize
    
effectiveTariff = totalCharge / consumption
```

**Example (Delhi Domestic, 400 kWh):**

| Slab | Range | Rate | Units Used | Charge |
|------|-------|------|------------|--------|
| 1 | 0-200 | ₹3.00 | 200 | ₹600 |
| 2 | 201-400 | ₹4.50 | 200 | ₹900 |
| 3 | 401-800 | ₹6.50 | 0 | ₹0 |
| **Total** | | | **400** | **₹1,500** |
| **Effective** | | | | **₹3.75/kWh** |

**THE FIX:** When consumption reduces to 200 kWh after solar:

| Slab | Range | Rate | Units Used | Charge |
|------|-------|------|------------|--------|
| 1 | 0-200 | ₹3.00 | 200 | ₹600 |
| **Total** | | | **200** | **₹600** |
| **Effective** | | | | **₹3.00/kWh** |

**Savings from slab shift:** ₹900 (slab 2 not charged!)

---

## State-Specific Charges

### By State - Electricity Duty

| State | Domestic | Commercial | Industrial | Agricultural |
|-------|----------|-----------|-----------|--------------|
| **Karnataka** | 5% | 12% | 5% | 0% |
| **Rajasthan** | 0% | 0% | 0% | 0% |
| **Meghalaya** | 0% | 0% | 0% | 0% |
| **Chhattisgarh** | 5% | 8% | 3% | 0% |
| **Delhi** | 0% | 0% | 0% | 0% |
| **Maharashtra** | 0% | 0% | 0% | 0% |

### By State - FAC (Fuel Adjustment Cost)

| State | Type | Value |
|-------|------|-------|
| **Karnataka** | % | 3% |
| **Rajasthan** | % | 3% |
| **Meghalaya** | % | 2% |
| **Chhattisgarh** | % | 3% |
| **Delhi** | % | 3% |
| **Maharashtra** | % | 3% |

### By State - Performance Ratio

| State | PR | Why Lower? |
|-------|----|----|
| **Karnataka** | 80% | Standard efficiency |
| **Rajasthan** | 80% | Standard efficiency |
| **Meghalaya** | 75% | Higher rainfall, more soiling |
| **Chhattisgarh** | 80% | Standard efficiency |
| **Delhi** | 80% | Standard efficiency |
| **Maharashtra** | 80% | Standard efficiency |

### By State - Net Metering Settlement

| State | Settlement | Carry Forward | Export Compensation |
|-------|-----------|------|-----------|
| **Karnataka** | Monthly | ❌ No | Retail rate (75%) |
| **Rajasthan** | Monthly | ✅ Yes | Retail rate |
| **Meghalaya** | Annual | ✅ Yes | Retail rate |
| **Chhattisgarh** | Monthly | ✅ Yes | Retail rate |
| **Delhi** | Monthly | ✅ Yes | Retail rate (1:1) |
| **Maharashtra** | Monthly | ✅ Yes | Retail rate |

---

## Examples

### Example 1: Delhi Domestic (Slab Tariff with Subsidy)

**Input:**
```
State: Delhi
Consumer Type: Domestic
Monthly Consumption: 400 kWh
Sanctioned Load: 12 kW
Fixed Charges: ₹100
Energy Charge: ₹1,500
Daytime Consumption: 50%
```

**Calculations:**

1. **Current Bill:**
   ```
   Fixed:       ₹100
   Energy:      ₹1,500 (400 kWh at slab-based rate ₹3.75/kWh avg)
   FAC (3%):    ₹45
   Duty (0%):   ₹0
   Tax (0%):    ₹0
   ────────────────────
   Total:       ₹1,645
   ```

2. **Solar Recommendation:**
   ```
   Annual consumption: 4,800 kWh
   Offset target: 3,840 kWh
   Capacity = 3,840 / (5.3 × 365 × 0.80) = 2.48 → 2.5 kW
   ```

3. **Solar Generation (2.5 kW):**
   ```
   Annual gross: 2.5 × 5.3 × 365 = 4,844 kWh
   Annual usable (80% PR): 3,875 kWh
   Monthly usable: 323 kWh
   ```

4. **Bill with Solar:**
   ```
   Daytime consumption: 200 kWh
   Solar consumption: 200 kWh (all used)
   Grid consumption: 200 kWh (only slab 1!)
   Exported: 123 kWh
   
   Grid energy (slab recalculated): ₹600
   FAC (3% of ₹600): ₹18
   Duty (0%): ₹0
   Tax (0%): ₹0
   Fixed: ₹100
   Export credit (123 × ₹5.80): -₹714
   ────────────────────────────
   Total with Solar: ₹4
   ```

5. **Savings:**
   ```
   Monthly: ₹1,645 - ₹4 = ₹1,641
   Annual: ₹19,692
   Reduction: 99.8%
   ```

6. **Investment & Payback:**
   ```
   System cost: 2.5 × ₹50,000 = ₹125,000
   Subsidy (2.5 kW): ₹69,000
   Net investment: ₹56,000
   
   Payback: ₹56,000 / ₹19,692 = 2.9 years
   ```

---

### Example 2: Karnataka Commercial (Flat Tariff, No Subsidy)

**Input:**
```
State: Karnataka
Consumer Type: Commercial
Monthly Consumption: 500 kWh
Sanctioned Load: 15 kW
Fixed Charges: ₹150
Energy Charge: ₹3,500
Daytime Consumption: 60%
```

**Calculations:**

1. **Current Bill:**
   ```
   Fixed:              ₹150
   Energy (flat ₹7/kWh): ₹3,500
   FAC (3%):           ₹105
   Duty (12%):         ₹420
   Tax (0%):           ₹0
   ────────────────────────
   Total:              ₹4,175
   ```

2. **Solar Recommendation:**
   ```
   Capacity = (6000 × 0.80) / (4.56 × 365 × 0.80) = 5.73 → 5.8 kW
   ```

3. **Generation (5.8 kW):**
   ```
   Annual usable (PR 80%): 5.8 × 4.56 × 365 × 0.80 = 7,703 kWh
   Monthly usable: 642 kWh
   ```

4. **Bill with Solar:**
   ```
   Daytime consumption: 300 kWh
   Solar consumption: 300 kWh
   Grid consumption: 200 kWh (reduced!)
   Exported: 342 kWh
   
   Grid energy (flat ₹7): 200 × ₹7 = ₹1,400
   FAC (3% of ₹1,400): ₹42
   Duty (12% of ₹1,400): ₹168
   Tax (0%): ₹0
   Fixed: ₹150
   Export credit (342 × ₹2.31): -₹790
   ────────────────────────────
   Total with Solar: ₹970
   ```

5. **Savings:**
   ```
   Monthly: ₹4,175 - ₹970 = ₹3,205
   Annual: ₹38,460
   Reduction: 76.8%
   ```

6. **Investment & Payback:**
   ```
   System cost: 5.8 × ₹35,000 = ₹203,000
   Subsidy (Commercial): ₹0
   Net investment: ₹203,000
   
   Payback: ₹203,000 / ₹38,460 = 5.3 years
   ```

---

## Key Formula Summary

| Metric | Formula |
|--------|---------|
| **Current Bill** | fixed + energyCharge + FAC + duty + tax |
| **Solar Capacity** | (annual × 0.80) / (PSH × 365 × PR) |
| **Solar Generation** | capacity × PSH × 365 × PR |
| **Grid Consumption** | total - solarConsumed |
| **Grid Energy** | calculateEnergyCharge(gridConsumption, tariff) |
| **Export** | solar - solarConsumed |
| **Export Credit** | exportedKwh × exportRate |
| **Bill with Solar** | fixed + gridEnergy + FAC + duty + tax - exportCredit |
| **Monthly Savings** | currentBill - solarBill |
| **Subsidy** | 30k/kW (1-2 kW) or 60k + 18k (3 kW), max ₹78k |
| **Payback** | (systemCost - subsidy) / annualSavings |

---

## Important Notes

1. **Slab Recalculation is Critical:** Without recomputing slabs on reduced consumption, slab-tariff states (Delhi, Rajasthan, Maharashtra, Chhattisgarh) underestimate savings by 20-30%.

2. **No GST on Electricity:** Electricity consumption is not subject to GST in India. All states set `taxPercentage = 0`.

3. **Performance Ratio vs Efficiency:** PR accounts for ALL losses (inverter, wiring, soiling, temperature). Typically 0.75-0.80, not the old hardcoded 0.85.

4. **Subsidy for Residential Only:** PM Surya Ghar applies only to domestic/residential consumers. Commercial/industrial: ₹0 subsidy.

5. **Net Metering Settlement:** Export credits apply differently by state (monthly/annual, carry-forward yes/no). Current model uses state's policy.

6. **Dynamic Tariff Handling:** Same formula works for bare numbers, flat tariffs, and complex slab structures—no conditional logic needed.

---

**Version:** 3.0 - Accurate Indian Tariff Modeling  
**Last Updated:** 2026-07-30  
**Author:** Claude Code  
**Accuracy:** Based on official state regulatory body tariff orders (KERC, MERC, RERC, CSERC, DERC, MSERC)
