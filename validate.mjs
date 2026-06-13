#!/usr/bin/env node
/**
 * Structural validator for federation project bundles (v1).
 * Validates every JSON file in ./examples.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const examplesDir = resolve(__dirname, 'examples')

const REQUIRED_PROJECT = ['federationSchemaVersion', 'projectId', 'title', 'nodeId', 'jurisdiction']
const REQUIRED_BUNDLE = ['@context', 'federationSchemaVersion', 'project']

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function validateProject(project, label) {
  for (const key of REQUIRED_PROJECT) {
    assert(project[key] != null && project[key] !== '', `${label}: project.${key} required`)
  }
  assert(project.jurisdiction?.country === 'AU', `${label}: jurisdiction.country must be AU`)
}

function validateBotanicalAsset(asset, label, index) {
  assert(asset.assetId, `${label}: botanicalAssets[${index}].assetId required`)
  assert(asset.scientificName, `${label}: botanicalAssets[${index}].scientificName required`)
}

function validateCulturalContext(ctx, label) {
  if (!ctx) return
  assert(['open', 'restricted', 'not-for-publication'].includes(ctx.sensitivityClass), `${label}: invalid sensitivityClass`)
  if (ctx.sensitivityClass === 'restricted') {
    assert(ctx.redactionNotice || ctx.restrictedPayloadRef, `${label}: restricted cultural context needs pointer or notice`)
  }
}

function validateBundle(bundle, filename) {
  const label = filename
  for (const key of REQUIRED_BUNDLE) {
    assert(bundle[key] != null, `${label}: missing ${key}`)
  }
  assert(bundle.federationSchemaVersion === '1.0.0', `${label}: federationSchemaVersion must be 1.0.0`)
  validateProject(bundle.project, label)
  if (Array.isArray(bundle.botanicalAssets)) {
    bundle.botanicalAssets.forEach((a, i) => validateBotanicalAsset(a, label, i))
  }
  validateCulturalContext(bundle.culturalContext, label)
}

const files = readdirSync(examplesDir).filter((f) => f.endsWith('.json'))
let ok = 0

for (const file of files) {
  const bundle = JSON.parse(readFileSync(resolve(examplesDir, file), 'utf8'))
  validateBundle(bundle, file)
  ok += 1
  console.log(`[validate] OK ${file}`)
}

console.log(`[validate] ${ok} example bundle(s) passed`)
