# Foundation Approved badge criteria (v1)

The **Foundation Approved** badge means a project metadata bundle is structurally valid **and** meets the minimum disclosure bar for open interchange under the Australian Landscape Archive Foundation open landscape data standard v1.

This is **not** a quality certification of design, species selection, or cultural authority. It means the file is complete enough for another organisation to read without proprietary Landscape Archive datasets.

## What the badge is

| In scope | Out of scope |
|----------|--------------|
| JSON bundle shape and required modules | BIM geometry or Revit family quality |
| Australian jurisdiction and project identity | Species truth against a commercial catalogue |
| Botanical rows with Darwin Core taxon IDs | Raw trait matrices or occurrence coordinates |
| Site context expressed as **bands** (not raw rasters) | Landscape Archive subscription entitlements |
| Sustainability summary fields | Legal sign-off on carbon claims |
| Connection to Country **sensitivity class** | Publishing restricted cultural detail in open files |

## How to check

1. Export a bundle JSON file from your tool (see `examples/`).
2. Validate **structurally** — required top-level keys and module shapes.
3. Validate **badge eligibility** — additional criteria below.
4. Set `project.federationApproved: true` only when badge validation passes.

**Web (private):** [Validate a bundle](/validate.html) — runs in your browser; nothing is uploaded.

**CLI (local / CI):**

```bash
npm run federation:validate:bundle -- path/to/project.bundle.json
npm run federation:validate:bundle -- path/to/project.bundle.json --badge
```

## Structural requirements (must pass first)

- Top-level: `@context`, `federationSchemaVersion` (`"1.0.0"`), `project`
- `project`: `projectId`, `title`, `nodeId`, `jurisdiction` with `country: "AU"`
- If `botanicalAssets` present: each entry needs `assetId`, `scientificName`
- If `culturalContext` present: valid `sensitivityClass`; restricted rows need a public pointer (`redactionNotice`, `restrictedPayloadRef`, or `protocolAuthorityRef`)

Full rules: `lib/validate-bundle-v1.mjs` (reference implementation).

## Badge requirements (v1)

All structural rules **plus**:

### Project

- `project.nodeType` populated (practice, university, council, etc.)
- `project.jurisdiction.stateOrTerritory` one of `ACT`, `NSW`, `NT`, `QLD`, `SA`, `TAS`, `VIC`, `WA`
- `project.updatedAt` ISO 8601 date-time

### Botanical assets

- At least **one** `botanicalAssets[]` entry
- Each entry includes: `taxonID`, `scientificName`, `nativeStatus`, `growthForm`

### Site context

- `siteContext` with **banded** soil and/or climate summary (not raw SLGA/SILO rasters)
- Example: `soilProfile.phBand`, `climateBand.koppenClass`

### Sustainability

- `sustainability.nativePlantingPercent` (number)
- `sustainability.waterSensitiveDesign` (boolean)

### Cultural context

- `culturalContext.sensitivityClass` one of `open`, `restricted`, `not-for-publication`
- Restricted detail must **not** appear in the open bundle — use pointers only

## Worked examples

| Bundle | Structural | Badge | Notes |
|--------|------------|-------|-------|
| `examples/nsw-coastal-schoolyard.bundle.json` | Pass | Pass | Reference badge bundle |
| `examples/melbourne-courtyard.bundle.json` | Pass | Pass* | `federationApproved: false` in file is conservative; re-run with `--badge` |

## Relationship to Landscape Archive

The Landscape Archive Pty Ltd is a **founding implementation partner**. It may:

- Map Revit `sourceData` to these modules ([crosswalk](/crosswalk/landscape-archive-revit-v1.md))
- Offer export assist and species lookup in commercial products
- Sell BIM families and Library access separately

Using the badge **does not require** a Landscape Archive subscription.

## Governance

Badge criteria changes require Foundation council review and a semver bump to this document. Implementation version: **v1.0.0**.
