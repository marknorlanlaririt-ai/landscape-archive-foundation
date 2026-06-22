# RFC: 185 — Climate screening & site-risk extension

| | |
|---|---|
| **Status** | Published (`185-v1.0.0` on GitHub; Council review ongoing) |
| **Author** | Landscape Archive Foundation working group |
| **Date** | 2026-06-19 |
| **Supersedes** | 169 v1.0.0 (additive — 169 remains valid) |
| **Target release** | 185 v1.0.0 |
| **Field count** | **185** (= 169 base + **16** new) |

---

## Summary

185 extends the open Landscape Archive metadata standard with **sixteen named fields** for:

1. **Historical SILO scalars** missing from 169 (`aridityIndex`, vapour pressure, pan evaporation, DEA land-cover band)
2. **2050 climate projection screening** (CCIA-aligned regional deltas — not statutory projections)
3. **Site bushfire overlay screening** (planning-proxy — not BAL certification)
4. **2050 disclosure bands** on existing `siteContext.climateBand` for Foundation Approved interchange

The Archive commercial pipeline (`Run-01 environmentContext`) already stores these values. 185 names them for **open bundle export**, **Revit crosswalk**, and **AASB S2 / climate disclosure crosswalks** without exposing proprietary join logic.

**169 is not deprecated.** Validators MUST accept 169 bundles indefinitely. 185 bundles add optional modules; badge rules for 169 remain unchanged.

---

## Motivation

| Gap in 169 | Run-01 / product reality |
|----------------|--------------------------|
| Environment stops at `meanMinTemp` | SILO also yields aridity, vapour pressure, pan evaporation |
| No projection fields | `environmentContext.climate.projections` (SSP2-4.5 / 2050 screening) |
| No site-risk fields | `environmentContext.siteRisk.bushfire` overlay screening |
| `siteContext.climateBand` is historical only | Compliance UI needs **2050 trend bands** for open disclosure |

Prior guidance (`federation/COMMERCIAL_SEPARATION.md`) correctly keeps raw joins in Layer B (Archive). 185 draws the **open naming line** for screening values and band derivations that third parties can interchange without LA entitlements.

---

## Scope

### In scope

- 16 new field definitions in the public dictionary
- Band derivation rules (2050 rainfall trend, heat stress)
- Run-01 → 185 mapping reference (`scripts/foundation/tla185-band-mapping.mjs`)
- Crosswalk update (`federation/crosswalk/tla185-run01-environment-map.md`)
- Optional Foundation Approved **v2 badge tier** (future) requiring 2050 bands when `climateScreening` is present

### Out of scope

- Changing any of the existing 169 field keys or jsonPaths
- Shipping species values or coordinates in the public GitHub standard repo
- Statutory BAL, EPBC, or official CCIA grid values
- Replacing `/api/site-environment` or climate-evidence APIs

---

## New fields (16)

### Extended module: `environment` (+4)

| Key | Type | Source |
|-----|------|--------|
| `meanVapourPressure` | number | SILO |
| `annualEvapPan` | number | SILO |
| `aridityIndex` | number | SILO / derived |
| `landcoverClassBand` | string | DEA land cover |

### Extended module: `site-context` (+2)

| Key | Type | Values |
|-----|------|--------|
| `climateBand.rainfall2050TrendBand` | enum | `stable`, `declining-slight`, `declining-moderate`, `declining-severe`, `increasing-slight`, `unknown` |
| `climateBand.heatStress2050Band` | enum | `low`, `moderate`, `elevated`, `high`, `unknown` |

### New module: `climate-screening` (+7)

| Key | Type | Notes |
|-----|------|-------|
| `projection.scenario` | enum | `SSP1-2.6` … `SSP5-8.5` |
| `projection.horizon` | string | e.g. `2050` |
| `projection.baselinePeriod` | string | e.g. `1995-2014` |
| `projection.rainfallDeltaPct` | number | % change vs baseline |
| `projection.maxTempDeltaC` | number | °C change vs baseline |
| `projection.heatwaveDaysDelta` | integer | days change vs baseline |
| `projection.source` | string | method / dataset id |

### New module: `site-risk` (+3)

| Key | Type | Notes |
|-----|------|-------|
| `bushfireProneLand` | boolean | overlay proxy |
| `balScreeningBand` | enum | **not** statutory BAL |
| `matchedOverlayRefs` | array | zone ids |

**Disclaimers** for projection and site-risk modules are **validator constants**, not counted fields (see Badge rules).

---

## Bundle shape (185)

```json
{
  "federationSchemaVersion": "1.1.0",
  "standardId": "185",
  "project": { "...": "..." },
  "siteContext": {
    "climateBand": {
      "rainfallMmBand": "450-700",
      "temperatureBand": "22-26",
      "rainfall2050TrendBand": "declining-moderate",
      "heatStress2050Band": "elevated",
      "source": "SILO historical window; CCIA screening v1"
    }
  },
  "climateScreening": {
    "projection": {
      "scenario": "SSP2-4.5",
      "horizon": "2050",
      "baselinePeriod": "1995-2014",
      "rainfallDeltaPct": -8,
      "maxTempDeltaC": 1.8,
      "heatwaveDaysDelta": 14,
      "source": "Climate Change in Australia screening v1"
    }
  },
  "siteRisk": {
    "bushfireProneLand": true,
    "balScreeningBand": "potential",
    "matchedOverlayRefs": ["nsw-bpl-coastal-north"]
  },
  "botanicalAssets": []
}
```

`federationSchemaVersion` bumps to **`1.1.0`** for 185 bundles. 169 bundles remain **`1.0.0`**.

---

## Band derivation rules

Implemented in `scripts/foundation/tla185-band-mapping.mjs`:

### `rainfall2050TrendBand` ← `rainfallDeltaPct`

| Delta (%) | Band |
|-----------|------|
| ≥ 2 | `increasing-slight` |
| −3 to 2 | `stable` |
| −8 to −3 | `declining-slight` |
| −12 to −8 | `declining-moderate` |
| < −12 | `declining-severe` |
| missing | `unknown` |

### `heatStress2050Band` ← `maxTempDeltaC`, `heatwaveDaysDelta`

| Condition | Band |
|-----------|------|
| temp ≥ 2.5 °C **or** heatwave ≥ 24 days | `high` |
| temp ≥ 2.0 °C **or** heatwave ≥ 16 days | `elevated` |
| temp ≥ 1.5 °C **or** heatwave ≥ 10 days | `moderate` |
| otherwise | `low` |
| missing inputs | `unknown` |

---

## Run-01 mapping

| Run-01 path | 185 path |
|-------------|--------------|
| `climate.measurements.meanVapourPressure` | `sourceData.environment.meanVapourPressure` |
| `climate.measurements.annualEvapPan` | `sourceData.environment.annualEvapPan` |
| `climate.measurements.aridityIndex` | `sourceData.environment.aridityIndex` |
| `environment.products.landcover.classLabel` | `sourceData.environment.landcoverClassBand` |
| `climate.projections.*` | `climateScreening.projection.*` |
| `siteRisk.bushfire.*` | `siteRisk.*` |
| derived bands | `siteContext.climateBand.rainfall2050TrendBand`, `heatStress2050Band` |

Full table: `federation/crosswalk/tla185-run01-environment-map.md`.

---

## Relationship to 169

| | 169 | 185 |
|---|---------|---------|
| Field count | 169 | 185 |
| Climate 2050 | bands only (manual) | named screening + derived bands |
| Validators | `validate-bundle-v1.mjs` | new `validate-bundle-v1_1.mjs` (draft) |
| Badge | Foundation Approved v1 | Foundation Approved v1 **or** v2 (optional climate module) |
| GitHub tag | `169-v1.0.0` | `185-v1.0.0` (proposed) |

Export tools SHOULD emit `standardId: "185"` when projection or site-risk modules are populated.

---

## Governance

Per `federation/GOVERNANCE.md`:

- 185 is a **new standard ID** (not a silent edit to 169)
- Council approval: **simple majority** RFC (additive extension release)
- Public licence unchanged: **CC BY-NC-ND 4.0** (dictionary), Apache-2.0 (reference mapping code)

---

## Implementation checklist (Archive)

- [x] Draft field sources — `scripts/foundation/tla185-field-sources.mjs`
- [x] Registry builder — `scripts/foundation/build-tla185-field-registry.mjs`
- [x] Band mapping reference — `scripts/foundation/tla185-band-mapping.mjs`
- [ ] JSON Schema modules for `climateScreening`, `siteRisk`
- [ ] `validate-bundle-v1_1.mjs` + optional badge v2 criteria
- [ ] LA bundle exporter: `mapEnvironmentContextToTla185()` in Revit / library export path
- [ ] Publish `tla185-fields.json` to Foundation GitHub mirror
- [ ] Update compliance catalog crosswalk rows

---

## Rejected alternatives

| Alternative | Why rejected |
|-------------|--------------|
| Silent 169 v1.1 at 182 fields | Breaks "169" brand promise; confuses Foundation Approved v1 validators |
| Field swap within 169 | Drops Revit download-form fields practitioners already map |
| Raw CCIA grids in open bundle | Violates band-only disclosure principle; licensing complexity |
| No open standard change | External vendors cannot interchange 2050 screening without LA-specific paths |

---

## References

- `functions/_lib/siteRiskCore.js` — CCIA screening + bushfire lookup
- `src/data-ingest/run-01/run-01-extract.mjs` — `buildEnvironmentRecord`
- `docs/AASB_S2_CLIMATE_EVIDENCE_API_SPEC.md`
- `federation/BADGE_CRITERIA_v1.md`
- `federation/COMMERCIAL_SEPARATION.md`
