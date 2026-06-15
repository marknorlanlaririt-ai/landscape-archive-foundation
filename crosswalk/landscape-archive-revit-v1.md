# Landscape Archive ↔ Open landscape data standard crosswalk (Revit v1)

This document maps **The Landscape Archive** Revit `sourceData` sections to the **Australian Landscape Architecture Federation** open metadata modules (v1).

The open standard is **tool-agnostic and open**. Landscape Archive is a **commercial implementation** that can read/write standard-conformant bundles and sell premium assets (Revit families, Library subscriptions, shop packs) on top.

## Module mapping

| Federation module | Landscape Archive `sourceData` section | Notes |
|-------------------|----------------------------------------|-------|
| `project` | Package manifest + project overlay | LA adds `implementationProductRef`, entitlements, chain-of-title |
| `botanical-asset` | `taxonomy` + `traits` + `product` | `taxonID` ↔ Darwin Core; `growthForm` ↔ archetype |
| `site-context` | `environment` | Federation uses **bands**; LA may store richer run-01 joins privately |
| `sustainability` | *(new federation field)* | LA can attach in package manifest extensions |
| `cultural-context` | *(governance-gated)* | LA must respect `sensitivityClass`; no restricted fields in public API |

## Field crosswalk (botanical)

| Federation field | Revit / LA field |
|------------------|------------------|
| `taxonID` | `sourceData.taxonomy.taxonID` |
| `scientificName` | `sourceData.taxonomy.scientificName` |
| `acceptedScientificName` | `sourceData.taxonomy.acceptedScientificName` |
| `vernacularName` | `sourceData.taxonomy.vernacularName` |
| `family` | `sourceData.taxonomy.family` |
| `genus` | `sourceData.taxonomy.genus` |
| `nativeStatus` | `sourceData.taxonomy.nativeStatus` |
| `growthForm` | `sourceData.traits.growthForms` / `LA_RevitArchetype` |
| `fireResponse` | `sourceData.traits.fireResponse` |
| `matureHeight_m` | `sourceData.traits.plantHeight_m` |
| `implementationProductRef` | `assetKey`, shop SKU, or family package id |

## Commercial fields (LA-only, not federation-required)

These remain **Landscape Archive product metadata** and do not need to be in open federation files:

- Stripe SKU / shop checkout ids
- Entitlement tier and seat labels
- Signed download URLs
- Procedural-tree generation parameters
- Full Austraits trait matrices
- Chain-of-title legal disclosures

A federation bundle may **optionally** include `implementationProductRef` pointing at a commercial SKU so practices can reconcile open metadata with purchased deliverables.

## Export flow (recommended)

1. Practice exports **federation bundle** (open JSON) for collaboration and badge validation.
2. Practice purchases **LA Revit family** or **shop pack** when they need BIM-ready geometry.
3. LA connector embeds `sourceData` in Revit; exporter can emit federation bundle subset for federation registry upload.

## Import flow

1. Federation validator checks bundle against `schema/bundle/v1.schema.json`.
2. LA Library ingests `botanicalAssets[].taxonID` for species lookup.
3. If `implementationProductRef` present and customer entitled, LA offers family download / place-in-model.
