/**
 * Shared structural + Foundation Approved badge checks for open bundle v1.
 * Used by the schema portal (browser), CLI, and example test harness.
 */

export const FEDERATION_SCHEMA_VERSION = '1.0.0'
export const FEDERATION_SCHEMA_VERSION_V1_1 = '1.1.0'
export const STANDARD_ID_169 = '169'
export const STANDARD_ID_185 = '185'

export const CLIMATE_PROJECTION_SCENARIOS = Object.freeze([
  'SSP1-2.6',
  'SSP2-4.5',
  'SSP3-7.0',
  'SSP5-8.5'
])

export const SITE_RISK_BAL_BANDS = Object.freeze([
  'not_identified',
  'potential',
  'bal-low',
  'bal-12-5',
  'bal-19',
  'bal-29',
  'bal-40',
  'bal-fz'
])

export const REQUIRED_BUNDLE_KEYS = Object.freeze([
  '@context',
  'federationSchemaVersion',
  'project'
])

export const REQUIRED_PROJECT_KEYS = Object.freeze([
  'federationSchemaVersion',
  'projectId',
  'title',
  'nodeId',
  'jurisdiction'
])

export const SENSITIVITY_CLASSES = Object.freeze([
  'open',
  'restricted',
  'not-for-publication'
])

export const AU_STATE_TERRITORIES = Object.freeze([
  'ACT',
  'NSW',
  'NT',
  'QLD',
  'SA',
  'TAS',
  'VIC',
  'WA'
])

export const NATIVE_STATUS_VALUES = Object.freeze([
  'Native',
  'Introduced',
  'Naturalised',
  'Unknown'
])

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isIsoDateTime(value) {
  if (!isNonEmptyString(value)) return false
  const parsed = Date.parse(value)
  return Number.isFinite(parsed)
}

/**
 * Detect bundle profile for validation messaging.
 * @returns {'169' | '185'}
 */
export function detectBundleStandard(bundle) {
  if (
    bundle?.federationSchemaVersion === FEDERATION_SCHEMA_VERSION_V1_1
    || bundle?.standardId === STANDARD_ID_185
  ) {
    return STANDARD_ID_185
  }
  return STANDARD_ID_169
}

function validateClimateScreening(climateScreening, errors) {
  if (climateScreening == null) return
  if (typeof climateScreening !== 'object' || Array.isArray(climateScreening)) {
    errors.push('climateScreening must be an object')
    return
  }

  const projection = climateScreening.projection
  if (!projection || typeof projection !== 'object' || Array.isArray(projection)) {
    errors.push('climateScreening.projection is required')
    return
  }

  for (const key of ['scenario', 'horizon', 'source']) {
    if (!isNonEmptyString(projection[key])) {
      errors.push(`climateScreening.projection.${key} is required`)
    }
  }

  if (
    projection.scenario != null
    && !CLIMATE_PROJECTION_SCENARIOS.includes(projection.scenario)
  ) {
    errors.push(
      `climateScreening.projection.scenario must be one of: ${CLIMATE_PROJECTION_SCENARIOS.join(', ')}`
    )
  }
}

function validateSiteRisk(siteRisk, errors) {
  if (siteRisk == null) return
  if (typeof siteRisk !== 'object' || Array.isArray(siteRisk)) {
    errors.push('siteRisk must be an object')
    return
  }

  if (siteRisk.bushfireProneLand != null && typeof siteRisk.bushfireProneLand !== 'boolean') {
    errors.push('siteRisk.bushfireProneLand must be a boolean')
  }

  if (
    siteRisk.balScreeningBand != null
    && !SITE_RISK_BAL_BANDS.includes(siteRisk.balScreeningBand)
  ) {
    errors.push(
      `siteRisk.balScreeningBand must be one of: ${SITE_RISK_BAL_BANDS.join(', ')}`
    )
  }

  if (siteRisk.matchedOverlayRefs != null && !Array.isArray(siteRisk.matchedOverlayRefs)) {
    errors.push('siteRisk.matchedOverlayRefs must be an array')
  }
}

/**
 * Structural validation — minimum bundle shape for v1 (169) interchange.
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateBundleStructureV1(bundle) {
  const errors = []
  const warnings = []

  if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) {
    return { valid: false, errors: ['Bundle must be a JSON object'], warnings }
  }

  for (const key of REQUIRED_BUNDLE_KEYS) {
    if (bundle[key] == null) errors.push(`Missing top-level "${key}"`)
  }

  if (bundle.federationSchemaVersion != null) {
    const allowedVersions = [FEDERATION_SCHEMA_VERSION, FEDERATION_SCHEMA_VERSION_V1_1]
    if (!allowedVersions.includes(bundle.federationSchemaVersion)) {
      errors.push(
        `federationSchemaVersion must be "${FEDERATION_SCHEMA_VERSION}" or "${FEDERATION_SCHEMA_VERSION_V1_1}" (got "${bundle.federationSchemaVersion}")`
      )
    }
  }

  const project = bundle.project
  if (project && typeof project === 'object') {
    for (const key of REQUIRED_PROJECT_KEYS) {
      if (project[key] == null || project[key] === '') {
        errors.push(`project.${key} is required`)
      }
    }

    const jurisdiction = project.jurisdiction
    if (jurisdiction && typeof jurisdiction === 'object') {
      if (jurisdiction.country !== 'AU') {
        errors.push('project.jurisdiction.country must be "AU"')
      }
      if (
        jurisdiction.stateOrTerritory != null
        && !AU_STATE_TERRITORIES.includes(jurisdiction.stateOrTerritory)
      ) {
        errors.push(
          `project.jurisdiction.stateOrTerritory must be one of: ${AU_STATE_TERRITORIES.join(', ')}`
        )
      }
    } else if (project.jurisdiction != null) {
      errors.push('project.jurisdiction must be an object')
    }
  } else if (bundle.project != null) {
    errors.push('project must be an object')
  }

  if (Array.isArray(bundle.botanicalAssets)) {
    bundle.botanicalAssets.forEach((asset, index) => {
      if (!asset || typeof asset !== 'object') {
        errors.push(`botanicalAssets[${index}] must be an object`)
        return
      }
      if (!isNonEmptyString(asset.assetId)) {
        errors.push(`botanicalAssets[${index}].assetId is required`)
      }
      if (!isNonEmptyString(asset.scientificName)) {
        errors.push(`botanicalAssets[${index}].scientificName is required`)
      }
      if (
        asset.nativeStatus != null
        && !NATIVE_STATUS_VALUES.includes(asset.nativeStatus)
      ) {
        errors.push(
          `botanicalAssets[${index}].nativeStatus must be one of: ${NATIVE_STATUS_VALUES.join(', ')}`
        )
      }
    })
  }

  const cultural = bundle.culturalContext
  if (cultural != null) {
    if (typeof cultural !== 'object') {
      errors.push('culturalContext must be an object')
    } else {
      if (!SENSITIVITY_CLASSES.includes(cultural.sensitivityClass)) {
        errors.push(
          `culturalContext.sensitivityClass must be one of: ${SENSITIVITY_CLASSES.join(', ')}`
        )
      }
      if (
        cultural.sensitivityClass === 'restricted'
        && !isNonEmptyString(cultural.redactionNotice)
        && !isNonEmptyString(cultural.restrictedPayloadRef)
        && !isNonEmptyString(cultural.protocolAuthorityRef)
      ) {
        errors.push(
          'Restricted cultural context needs redactionNotice, restrictedPayloadRef, or protocolAuthorityRef'
        )
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Structural validation — 185 bundle (v1.1.0) with optional climate/site-risk modules.
 */
function validateBundleStructureV1_1(bundle) {
  const result = validateBundleStructureV1(bundle)
  const errors = [...result.errors]
  const warnings = [...result.warnings]

  if (bundle.standardId != null && bundle.standardId !== STANDARD_ID_185) {
    errors.push(`standardId must be "${STANDARD_ID_185}" for 185 bundles`)
  } else if (bundle.standardId == null) {
    errors.push(`Missing top-level "standardId" (expected "${STANDARD_ID_185}")`)
  }

  if (
    bundle.federationSchemaVersion != null
    && bundle.federationSchemaVersion !== FEDERATION_SCHEMA_VERSION_V1_1
  ) {
    errors.push(
      `federationSchemaVersion must be "${FEDERATION_SCHEMA_VERSION_V1_1}" for 185 bundles (got "${bundle.federationSchemaVersion}")`
    )
  }

  if (
    bundle.project?.federationSchemaVersion != null
    && bundle.project.federationSchemaVersion !== FEDERATION_SCHEMA_VERSION_V1_1
  ) {
    errors.push(
      `project.federationSchemaVersion must be "${FEDERATION_SCHEMA_VERSION_V1_1}" for 185 bundles`
    )
  }

  validateClimateScreening(bundle.climateScreening, errors)
  validateSiteRisk(bundle.siteRisk, errors)

  if (!bundle.climateScreening && !bundle.siteRisk) {
    warnings.push('185 bundle has no climateScreening or siteRisk module (optional but recommended)')
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Structural validation — routes 169 v1.0.0 and 185 v1.1.0 bundles.
 * @returns {{ valid: boolean, errors: string[], warnings: string[], standardId: '169' | '185' }}
 */
export function validateBundleStructure(bundle) {
  const standardId = detectBundleStandard(bundle)
  const result = standardId === STANDARD_ID_185
    ? validateBundleStructureV1_1(bundle)
    : validateBundleStructureV1(bundle)

  return { ...result, standardId }
}

function siteContextHasBands(siteContext) {
  if (!siteContext || typeof siteContext !== 'object') return false
  const soil = siteContext.soilProfile
  const climate = siteContext.climateBand
  const soilOk = soil && typeof soil === 'object'
    && (isNonEmptyString(soil.order) || isNonEmptyString(soil.phBand) || isNonEmptyString(soil.clayPercentBand))
  const climateOk = climate && typeof climate === 'object'
    && (isNonEmptyString(climate.koppenClass) || isNonEmptyString(climate.rainfallMmBand))
  return Boolean(soilOk || climateOk)
}

/**
 * Foundation Approved badge criteria (v1). Requires structural pass first.
 * @returns {{
 *   structuralValid: boolean,
 *   badgeEligible: boolean,
 *   structuralErrors: string[],
 *   badgeErrors: string[],
 *   warnings: string[],
 *   criteria: Record<string, boolean>
 * }}
 */
export function evaluateFoundationApprovedBadge(bundle) {
  const structural = validateBundleStructure(bundle)
  const badgeErrors = []
  const warnings = [...structural.warnings]
  const criteria = {}

  if (!structural.valid) {
    return {
      structuralValid: false,
      badgeEligible: false,
      structuralErrors: structural.errors,
      badgeErrors,
      warnings,
      criteria
    }
  }

  const project = bundle.project

  criteria.projectIdentity = Boolean(
    isNonEmptyString(project.projectId)
    && isNonEmptyString(project.title)
    && isNonEmptyString(project.nodeId)
    && isNonEmptyString(project.nodeType)
  )
  if (!criteria.projectIdentity) {
    badgeErrors.push('Badge requires project.nodeType and complete project identity fields')
  }

  criteria.jurisdiction = Boolean(
    project.jurisdiction?.country === 'AU'
    && AU_STATE_TERRITORIES.includes(project.jurisdiction?.stateOrTerritory)
  )
  if (!criteria.jurisdiction) {
    badgeErrors.push('Badge requires project.jurisdiction.country "AU" and a valid stateOrTerritory')
  }

  criteria.updatedAt = isIsoDateTime(project.updatedAt)
  if (!criteria.updatedAt) {
    badgeErrors.push('Badge requires project.updatedAt (ISO 8601 date-time)')
  }

  const assets = Array.isArray(bundle.botanicalAssets) ? bundle.botanicalAssets : []
  criteria.botanicalAssets = assets.length >= 1
  if (!criteria.botanicalAssets) {
    badgeErrors.push('Badge requires at least one botanicalAssets entry')
  }

  assets.forEach((asset, index) => {
    const complete = Boolean(
      isNonEmptyString(asset.assetId)
      && isNonEmptyString(asset.taxonID)
      && isNonEmptyString(asset.scientificName)
      && NATIVE_STATUS_VALUES.includes(asset.nativeStatus)
      && isNonEmptyString(asset.growthForm)
    )
    if (!complete) {
      badgeErrors.push(
        `botanicalAssets[${index}] needs taxonID, scientificName, nativeStatus, and growthForm for badge eligibility`
      )
    }
  })
  criteria.botanicalAssetsComplete = badgeErrors.every(
    (message) => !message.startsWith('botanicalAssets[')
  )

  criteria.siteContext = siteContextHasBands(bundle.siteContext)
  if (!criteria.siteContext) {
    badgeErrors.push(
      'Badge requires siteContext with soilProfile bands and/or climateBand summary fields'
    )
  }

  const sustainability = bundle.sustainability
  criteria.sustainability = Boolean(
    sustainability
    && typeof sustainability === 'object'
    && typeof sustainability.nativePlantingPercent === 'number'
    && typeof sustainability.waterSensitiveDesign === 'boolean'
  )
  if (!criteria.sustainability) {
    badgeErrors.push(
      'Badge requires sustainability.nativePlantingPercent (number) and sustainability.waterSensitiveDesign (boolean)'
    )
  }

  criteria.culturalContext = Boolean(
    bundle.culturalContext
    && SENSITIVITY_CLASSES.includes(bundle.culturalContext.sensitivityClass)
  )
  if (!criteria.culturalContext) {
    badgeErrors.push('Badge requires culturalContext.sensitivityClass')
  }

  const badgeEligible = badgeErrors.length === 0

  if (project.federationApproved === true && !badgeEligible) {
    warnings.push('project.federationApproved is true but badge criteria are not met')
  }
  if (project.federationApproved === false && badgeEligible) {
    warnings.push('Bundle meets badge criteria — you may set project.federationApproved to true')
  }

  return {
    structuralValid: true,
    badgeEligible,
    structuralErrors: structural.errors,
    badgeErrors,
    warnings,
    criteria
  }
}

/**
 * @param {unknown} bundle
 * @param {{ badge?: boolean }} [options]
 */
export function validateBundle(bundle, options = {}) {
  const structural = validateBundleStructure(bundle)
  if (!options.badge) {
    return {
      mode: 'structural',
      valid: structural.valid,
      errors: structural.errors,
      warnings: structural.warnings
    }
  }

  const badge = evaluateFoundationApprovedBadge(bundle)
  return {
    mode: 'badge',
    valid: badge.badgeEligible,
    structuralValid: badge.structuralValid,
    badgeEligible: badge.badgeEligible,
    errors: [...badge.structuralErrors, ...badge.badgeErrors],
    structuralErrors: badge.structuralErrors,
    badgeErrors: badge.badgeErrors,
    warnings: badge.warnings,
    criteria: badge.criteria
  }
}
