# Run-01 environmentContext → TLA-185 crosswalk

Maps **Landscape Archive commercial** Run-01 joins to **Foundation open** TLA-185 bundle fields.

| Layer | Owner | Licence |
|-------|-------|---------|
| Run-01 sidecars (`species-environment-context.json`, library `environmentContext`) | The Landscape Archive Pty Ltd | EULA / dataset terms |
| TLA-185 field dictionary | Landscape Archive Foundation | CC BY-NC-ND 4.0 |

This document is a **crosswalk** only. It does not grant access to Archive datasets.

---

## Primary mapping

| Run-01 / library path | TLA-185 jsonPath | Transform |
|-----------------------|------------------|-----------|
| `climate.measurements.annualRainfall` | `sourceData.environment.annualRainfall` | direct (TLA-169) |
| `climate.measurements.meanMaxTemp` | `sourceData.environment.meanMaxTemp` | direct |
| `climate.measurements.meanMinTemp` | `sourceData.environment.meanMinTemp` | direct |
| `climate.measurements.meanVapourPressure` | `sourceData.environment.meanVapourPressure` | direct |
| `climate.measurements.annualEvapPan` | `sourceData.environment.annualEvapPan` | alias `annualEvaporationPan` |
| `climate.measurements.aridityIndex` | `sourceData.environment.aridityIndex` | direct |
| `climate.window` | `sourceData.environment.climateWindow` | formatted label |
| `environment.products.landcover.classLabel` | `sourceData.environment.landcoverClassBand` | string band |
| `climate.projections.scenario` | `climateScreening.projection.scenario` | direct |
| `climate.projections.horizon` | `climateScreening.projection.horizon` | direct |
| `climate.projections.baselinePeriod` | `climateScreening.projection.baselinePeriod` | direct |
| `climate.projections.rainfallDelta2050Pct` | `climateScreening.projection.rainfallDeltaPct` | direct |
| `climate.projections.maxTempDelta2050C` | `climateScreening.projection.maxTempDeltaC` | direct |
| `climate.projections.heatwaveDaysDelta2050` | `climateScreening.projection.heatwaveDaysDelta` | direct |
| `climate.projections.source` | `climateScreening.projection.source` | direct |
| `siteRisk.bushfire.bushfireProneLand` | `siteRisk.bushfireProneLand` | direct |
| `siteRisk.bushfire.balScreeningBand` | `siteRisk.balScreeningBand` | direct |
| `siteRisk.bushfire.matchedZones[]` | `siteRisk.matchedOverlayRefs[]` | rename |

---

## Band derivations (siteContext)

Historical bands (TLA-169, unchanged):

| SILO measurement | `siteContext.climateBand` field | Rule |
|------------------|----------------------------------|------|
| `annualRainfall` (mm) | `rainfallMmBand` | `<250`, `250-450`, `450-700`, `700-1000`, `1000-1500`, `1500+` |
| `meanMaxTemp` (°C) | `temperatureBand` | `<18`, `18-22`, `22-26`, `26-30`, `30+` |

**TLA-185 additions** (from projection screening):

| Input | Output field | Rule |
|-------|--------------|------|
| `rainfallDeltaPct` | `rainfall2050TrendBand` | see RFC band table |
| `maxTempDeltaC`, `heatwaveDaysDelta` | `heatStress2050Band` | see RFC band table |

Reference implementation: `scripts/foundation/tla185-band-mapping.mjs`.

---

## Alternate baselines (Archive-only detail)

WorldClim and SoilGrids alternates remain in Run-01 under:

- `climate.alternate.worldclim`
- `soil.alternate.soilgrids`

These are **not** separate TLA-185 fields in v1.0.0. Exporters MAY note presence in `provenance.environmentSource` or `siteContext.climateBand.source` text.

Future TLA-186 may add explicit alternate-context fields if Council requests interchange of cross-check metadata.

---

## API surfaces (commercial)

| API | Uses same shapes |
|-----|------------------|
| `GET /api/site-environment` | point-level `buildSiteRiskContext()` |
| `GET /api/compliance/climate-evidence` | species + `environmentContext` merge |
| Admin pipeline matrix | coverage flags `climateProjectionsRun01`, `siteBushfireRun01` |

Open bundle export SHOULD call `mapEnvironmentContextToTla185(environmentContext)` before writing JSON.

---

## Disclaimers (not fields)

When `climateScreening` or `siteRisk` modules are present, bundle exporters MUST include module-level disclaimer text in bundle metadata or adjacent `sustainability.evidence[]` entry:

- Projections: *Regional climate projection screening only. Verify against official CCIA products for statutory disclosure.*
- Site risk: *Site-risk screening only. Bushfire flags are planning-overlay proxies, not BAL certificates.*

Constants: `TLA185_PROJECTION_DISCLAIMER`, `TLA185_SITE_RISK_DISCLAIMER` in `tla185-band-mapping.mjs`.

---

## TLA-169 backward compatibility

| TLA-185 module | Required for TLA-169 badge v1 |
|----------------|----------------------------------|
| All TLA-169 fields | yes |
| `climateScreening` | no |
| `siteRisk` | no |
| `climateBand.rainfall2050TrendBand` | no |
| `climateBand.heatStress2050Band` | no |

TLA-169 exporters ignore Run-01 projection and site-risk blocks unless upgrading to TLA-185.
