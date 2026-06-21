/**
 * Shared structural + Foundation Approved badge checks for open bundle v1.
 * Used by the schema portal (browser), CLI, and example test harness.
 */

export const FEDERATION_SCHEMA_VERSION = '1.0.0'

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
 * Structural validation — minimum bundle shape for v1 interchange.
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
export function validateBundleStructure(bundle) {
  const errors = []
  const warnings = []

  if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) {
    return { valid: false, errors: ['Bundle must be a JSON object'], warnings }
  }

  for (const key of REQUIRED_BUNDLE_KEYS) {
    if (bundle[key] == null) errors.push(`Missing top-level "${key}"`)
  }

  if (
    bundle.federationSchemaVersion != null
    && bundle.federationSchemaVersion !== FEDERATION_SCHEMA_VERSION
  ) {
    errors.push(
      `federationSchemaVersion must be "${FEDERATION_SCHEMA_VERSION}" (got "${bundle.federationSchemaVersion}")`
    )
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
