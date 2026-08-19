/**
 * Delhi VNM/GNM Billing Calculator
 * Properly recalculates bills using calculateBillWithSolar (same as SNM)
 *
 * This ensures proper handling of:
 * 1. Telescopic slab-based tariffs (not flat rate)
 * 2. Fixed charges
 * 3. Electricity duty (per consumer type)
 * 4. FAC charges
 * 5. Annual settlement for Delhi
 */

import { calculateBillWithSolar } from './billingEngine.js'

/**
 * Calculate Delhi VNM Bill for a single participant
 * Uses same logic as SNM - recalculates bill using actual tariff structure
 */
export function calculateDelhiVNMBill(participant, policy) {
  const beforeBill = participant.currentBill || 0
  const consumption = participant.consumption
  const allocatedCredit = participant.allocatedCredit
  const consumerType = participant.consumerType || 'domestic'

  // For VNM: Grid consumption = Consumption - Allocated Credit (NO daytime split)
  // VNM is 1:1 net metering - solar credit directly offsets consumption regardless of time
  const gridConsumptionKwh = Math.max(0, consumption - allocatedCredit)

  // Calculate bill on ACTUAL grid consumption (not daytime-weighted)
  const afterBillData = calculateBillWithSolar(
    {
      monthlyConsumption: gridConsumptionKwh, // Use actual grid consumption
      consumerType: consumerType,
      fixedCharges: 0
    },
    {
      monthlyUsableKwh: 0 // Already accounted for above
    },
    100, // Use 100% to bypass daytime logic since no additional solar
    'delhi'
  )

  const afterBill = afterBillData.totalBill
  const billableUnits = afterBillData.gridConsumptionKwh

  const monthlySavings = beforeBill - afterBill
  const annualSavings = monthlySavings * 12

  return {
    consumerId: participant.id,
    name: participant.name,
    consumerType: consumerType,
    consumption: consumption,
    allocatedCredit: Math.round(allocatedCredit * 100) / 100,
    billableUnits: Math.round(billableUnits * 100) / 100,
    before: {
      bill: Math.round(beforeBill * 100) / 100,
      units: consumption
    },
    after: {
      bill: Math.round(afterBill * 100) / 100,
      units: Math.round(billableUnits * 100) / 100
    },
    breakdown: {
      energyCharge: afterBillData.gridEnergyCharge,
      duty: afterBillData.dutyCharge,
      fac: afterBillData.facCharge,
      fixedCharges: afterBillData.fixedCharges
    },
    surplus: {
      units: Math.round(participant.surplus * 100) / 100,
      carryForward: Math.round((participant.surplus || 0) * 100) / 100
    },
    savings: {
      monthly: Math.round(monthlySavings * 100) / 100,
      annual: Math.round(annualSavings * 100) / 100
    }
  }
}

/**
 * Calculate Delhi GNM Bill for a single connection
 * Same logic as VNM - recalculates using proper tariff structure
 */
export function calculateDelhiGNMBill(connection, policy) {
  const beforeBill = connection.currentBill || 0
  const consumption = connection.consumption
  const allocatedCredit = connection.allocatedCredit
  const consumerType = connection.consumerType || 'domestic'

  // Calculate after-solar bill using PROPER tariff recalculation
  const afterBillData = calculateBillWithSolar(
    {
      monthlyConsumption: consumption,
      consumerType: consumerType,
      fixedCharges: 0
    },
    {
      monthlyUsableKwh: allocatedCredit
    },
    40,
    'delhi'
  )

  const afterBill = afterBillData.totalBill
  const billableUnits = afterBillData.gridConsumptionKwh

  const monthlySavings = beforeBill - afterBill
  const annualSavings = monthlySavings * 12

  return {
    connectionId: connection.id,
    name: connection.name,
    priority: connection.priority,
    consumerType: consumerType,
    consumption: consumption,
    allocatedCredit: Math.round(allocatedCredit * 100) / 100,
    billableUnits: Math.round(billableUnits * 100) / 100,
    before: {
      bill: Math.round(beforeBill * 100) / 100,
      units: consumption
    },
    after: {
      bill: Math.round(afterBill * 100) / 100,
      units: Math.round(billableUnits * 100) / 100
    },
    breakdown: {
      energyCharge: afterBillData.gridEnergyCharge,
      duty: afterBillData.dutyCharge,
      fac: afterBillData.facCharge,
      fixedCharges: afterBillData.fixedCharges
    },
    surplus: {
      units: Math.round(connection.surplus * 100) / 100,
      carryForward: Math.round((connection.surplus || 0) * 100) / 100
    },
    savings: {
      monthly: Math.round(monthlySavings * 100) / 100,
      annual: Math.round(annualSavings * 100) / 100
    }
  }
}

/**
 * Calculate bills for all participants in Delhi VNM
 */
export function calculateDelhiVNMBills(allocatedParticipants, policy) {
  return allocatedParticipants.participants.map(p => calculateDelhiVNMBill(p, policy))
}

/**
 * Calculate bills for all connections in Delhi GNM
 */
export function calculateDelhiGNMBills(allocatedConnections, policy) {
  return allocatedConnections.connections.map(c => calculateDelhiGNMBill(c, policy))
}

/**
 * Calculate summary statistics for Delhi VNM
 */
export function calculateDelhiVNMSummary(allocatedParticipants, bills) {
  const totalConsumption = allocatedParticipants.participants.reduce((sum, p) => sum + p.consumption, 0)
  const totalCredit = allocatedParticipants.participants.reduce((sum, p) => sum + p.allocatedCredit, 0)
  const totalSurplus = allocatedParticipants.participants.reduce((sum, p) => sum + p.surplus, 0)
  const totalAnnualSavings = bills.reduce((sum, b) => sum + b.savings.annual, 0)

  return {
    scheme: 'vnm',
    state: 'delhi',
    participantCount: allocatedParticipants.participants.length,
    totalConsumption: Math.round(totalConsumption * 100) / 100,
    totalGeneration: Math.round(allocatedParticipants.monthlyGeneration * 100) / 100,
    totalExportPool: Math.round(allocatedParticipants.exportPool * 100) / 100,
    totalCreditAllocated: Math.round(totalCredit * 100) / 100,
    totalMonthlyBanked: Math.round(totalSurplus * 100) / 100,
    totalAnnualSavings: Math.round(totalAnnualSavings * 100) / 100,
    averageSavingsPerParticipant: Math.round((totalAnnualSavings / allocatedParticipants.participants.length) * 100) / 100,
    netMeteringType: '1:1 Energy Adjustment (kWh)',
    bankingStatus: 'Monthly carry-forward enabled',
    settlementType: 'Defers to DERC net metering framework'
  }
}

/**
 * Calculate summary statistics for Delhi GNM
 */
export function calculateDelhiGNMSummary(allocatedConnections, bills) {
  const totalConsumption = allocatedConnections.connections.reduce((sum, c) => sum + c.import, 0)
  const totalCredit = allocatedConnections.connections.reduce((sum, c) => sum + c.allocatedCredit, 0)
  const totalSurplus = allocatedConnections.connections.reduce((sum, c) => sum + c.surplus, 0)
  const totalAnnualSavings = bills.reduce((sum, b) => sum + b.savings.annual, 0)

  return {
    scheme: 'gnm',
    state: 'delhi',
    connectionCount: allocatedConnections.connections.length,
    totalConsumption: Math.round(totalConsumption * 100) / 100,
    totalGeneration: Math.round(allocatedConnections.monthlyGeneration * 100) / 100,
    totalExportPool: Math.round(allocatedConnections.exportPool * 100) / 100,
    totalCreditAllocated: Math.round(totalCredit * 100) / 100,
    totalMonthlyBanked: Math.round(totalSurplus * 100) / 100,
    remainingCarryForward: Math.round(allocatedConnections.remainingCarryForward * 100) / 100,
    totalAnnualSavings: Math.round(totalAnnualSavings * 100) / 100,
    averageSavingsPerConnection: Math.round((totalAnnualSavings / allocatedConnections.connections.length) * 100) / 100,
    allocationMethod: 'Priority-based sequential',
    priorityListUsed: allocatedConnections.priorityListUsed,
    netMeteringType: '1:1 Energy Adjustment (kWh)',
    bankingStatus: 'Monthly carry-forward enabled',
    settlementType: 'Defers to DERC net metering framework'
  }
}
