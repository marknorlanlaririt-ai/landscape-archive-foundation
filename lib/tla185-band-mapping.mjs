/**
 * Reference mapping: Landscape Archive Run-01 environmentContext → TLA-185 bundle fields.
 * Screening values only — not statutory climate, BAL, or EPBC advice.
 *
 * @see federation/crosswalk/tla185-run01-environment-map.md
 * @see federation/rfc/TLA-185-climate-screening-rfc.md
 */

export const TLA185_PROJECTION_DISCLAIMER =
  'Regional climate projection screening only. Verify against official CCIA products for statutory disclosure.'

export const TLA185_SITE_RISK_DISCLAIMER =
  'Site-risk screening only. Bushfire flags are planning-overlay proxies, not BAL certificates.'

export function deriveRainfall2050TrendBand(rainfallDeltaPct) {
  const delta = Number(rainfallDeltaPct)
  if (!Number.isFinite(delta)) return 'unknown'
  if (delta >= 2) return 'increasing-slight'
  if (delta >= -3) return 'stable'
  if (delta >= -8) return 'declining-slight'
  if (delta >= -12) return 'declining-moderate'
  return 'declining-severe'
}

export function deriveHeatStress2050Band({ maxTempDeltaC, heatwaveDaysDelta } = {}) {
  const temp = Number(maxTempDeltaC)
  const heatwave = Number(heatwaveDaysDelta)
  if (!Number.isFinite(temp) && !Number.isFinite(heatwave)) return 'unknown'
  if (temp >= 2.5 || heatwave >= 24) return 'high'
  if (temp >= 2.0 || heatwave >= 16) return 'elevated'
  if (temp >= 1.5 || heatwave >= 10) return 'moderate'
  return 'low'
}

export function deriveHistoricalRainfallBand(annualRainfallMm) {
  const mm = Number(annualRainfallMm)
  if (!Number.isFinite(mm)) return null
  if (mm < 250) return '<250'
  if (mm < 450) return '250-450'
  if (mm < 700) return '450-700'
  if (mm < 1000) return '700-1000'
  if (mm < 1500) return '1000-1500'
  return '1500+'
}

export function deriveHistoricalTemperatureBand(meanMaxTempC) {
  const temp = Number(meanMaxTempC)
  if (!Number.isFinite(temp)) return null
  if (temp < 18) return '<18'
  if (temp < 22) return '18-22'
  if (temp < 26) return '22-26'
  if (temp < 30) return '26-30'
  return '30+'
}

/**
 * Map a Run-01 library environmentContext block to TLA-185 top-level modules.
 * @param {object} environmentContext
 * @returns {{ climateScreening: object|null, siteRisk: object|null, alternateContext: object|null, sourceDataEnvironment: object|null, siteContextBands: object|null }}
 */
export function mapEnvironmentContextToTla185(environmentContext = {}) {
  const climate = environmentContext.climate || {}
  const measurements = climate.measurements || {}
  const projections = climate.projections || null
  const bushfire = environmentContext.siteRisk?.bushfire || null
  const soil = environmentContext.soil || {}

  const climateScreening = projections
    ? {
        projection: {
          scenario: projections.scenario || null,
          horizon: projections.horizon || null,
          baselinePeriod: projections.baselinePeriod || null,
          rainfallDeltaPct: projections.rainfallDelta2050Pct ?? projections.rainfallDeltaPct ?? null,
          maxTempDeltaC: projections.maxTempDelta2050C ?? projections.maxTempDeltaC ?? null,
          heatwaveDaysDelta: projections.heatwaveDaysDelta2050 ?? projections.heatwaveDaysDelta ?? null,
          source: projections.source || null
        }
      }
    : null

  const siteRisk = bushfire
    ? {
        bushfireProneLand: Boolean(bushfire.bushfireProneLand),
        balScreeningBand: bushfire.balScreeningBand || 'not_identified',
        matchedOverlayRefs: Array.isArray(bushfire.matchedZones) ? bushfire.matchedZones : []
      }
    : null

  const sourceDataEnvironment = {
    meanVapourPressure: measurements.meanVapourPressure ?? null,
    annualEvapPan: measurements.annualEvapPan ?? measurements.annualEvaporationPan ?? null,
    aridityIndex: measurements.aridityIndex ?? null,
    landcoverClassBand: environmentContext.environment?.products?.landcover?.classLabel || null
  }

  const hasHistoricalExtras = Object.values(sourceDataEnvironment).some((value) => value != null && value !== '')

  const rainfall2050TrendBand = projections
    ? deriveRainfall2050TrendBand(projections.rainfallDelta2050Pct ?? projections.rainfallDeltaPct)
    : 'unknown'
  const heatStress2050Band = projections
    ? deriveHeatStress2050Band({
        maxTempDeltaC: projections.maxTempDelta2050C ?? projections.maxTempDeltaC,
        heatwaveDaysDelta: projections.heatwaveDaysDelta2050 ?? projections.heatwaveDaysDelta
      })
    : 'unknown'

  const siteContextBands = {
    climateBand: {
      rainfallMmBand: deriveHistoricalRainfallBand(measurements.annualRainfall ?? measurements.annualRainfallMm),
      temperatureBand: deriveHistoricalTemperatureBand(measurements.meanMaxTemp ?? measurements.meanMaxTempC),
      source: climate.source ? `${climate.source} historical window` : 'SILO historical window',
      rainfall2050TrendBand,
      heatStress2050Band
    }
  }

  return {
    climateScreening,
    siteRisk,
    sourceDataEnvironment: hasHistoricalExtras ? sourceDataEnvironment : null,
    siteContextBands
  }
}
