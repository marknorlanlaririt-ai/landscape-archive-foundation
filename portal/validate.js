/**
 * In-browser structural validator for federation project bundles (v1).
 * Mirrors scripts/federation/validate-examples.mjs. No data leaves the browser.
 */

const REQUIRED_BUNDLE = ['@context', 'federationSchemaVersion', 'project']
const REQUIRED_PROJECT = ['federationSchemaVersion', 'projectId', 'title', 'nodeId', 'jurisdiction']
const SENSITIVITY = ['open', 'restricted', 'not-for-publication']

const input = document.getElementById('fed-input')
const result = document.getElementById('fed-result')

function validateBundle(bundle) {
  const errors = []

  for (const key of REQUIRED_BUNDLE) {
    if (bundle[key] == null) errors.push(`Missing top-level "${key}"`)
  }

  if (bundle.federationSchemaVersion && bundle.federationSchemaVersion !== '1.0.0') {
    errors.push(`federationSchemaVersion must be "1.0.0" (got "${bundle.federationSchemaVersion}")`)
  }

  const project = bundle.project
  if (project && typeof project === 'object') {
    for (const key of REQUIRED_PROJECT) {
      if (project[key] == null || project[key] === '') errors.push(`project.${key} is required`)
    }
    if (project.jurisdiction && project.jurisdiction.country !== 'AU') {
      errors.push('project.jurisdiction.country must be "AU"')
    }
  } else if (bundle.project != null) {
    errors.push('project must be an object')
  }

  if (Array.isArray(bundle.botanicalAssets)) {
    bundle.botanicalAssets.forEach((asset, i) => {
      if (!asset || typeof asset !== 'object') {
        errors.push(`botanicalAssets[${i}] must be an object`)
        return
      }
      if (!asset.assetId) errors.push(`botanicalAssets[${i}].assetId is required`)
      if (!asset.scientificName) errors.push(`botanicalAssets[${i}].scientificName is required`)
    })
  }

  const cultural = bundle.culturalContext
  if (cultural && typeof cultural === 'object') {
    if (!SENSITIVITY.includes(cultural.sensitivityClass)) {
      errors.push(`culturalContext.sensitivityClass must be one of: ${SENSITIVITY.join(', ')}`)
    }
    if (cultural.sensitivityClass === 'restricted' && !cultural.redactionNotice && !cultural.restrictedPayloadRef) {
      errors.push('Restricted cultural context needs a redactionNotice or restrictedPayloadRef')
    }
  }

  return errors
}

function render(state, lines) {
  result.className = `fed-result fed-result--${state}`
  if (typeof lines === 'string') {
    result.textContent = lines
    return
  }
  result.replaceChildren(
    ...lines.map((line) => {
      const p = document.createElement('p')
      p.textContent = line
      return p
    })
  )
}

document.getElementById('fed-validate')?.addEventListener('click', () => {
  const raw = input.value.trim()
  if (!raw) {
    render('error', 'Paste a bundle JSON first.')
    return
  }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (err) {
    render('error', [`Invalid JSON: ${err.message}`])
    return
  }

  const errors = validateBundle(parsed)
  if (errors.length === 0) {
    render('ok', ['PASS — bundle is structurally valid against federation schema v1.'])
  } else {
    render('error', [`FAIL — ${errors.length} issue(s):`, ...errors.map((e) => `• ${e}`)])
  }
})

document.getElementById('fed-load-example')?.addEventListener('click', async () => {
  try {
    const res = await fetch('/examples/nsw-coastal-schoolyard.bundle.json')
    const json = await res.json()
    input.value = JSON.stringify(json, null, 2)
    render('idle', 'Example loaded. Click Validate.')
  } catch {
    render('error', 'Could not load the example bundle.')
  }
})
