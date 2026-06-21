# Commercial separation — Foundation vs Landscape Archive

## Short answer

**Yes, you can still sell plants, Revit families, Library subscriptions, shop packs, and certification** after launching the open standard.

The Foundation does not replace your store. It standardises **how project metadata is described** when files move between independent organisations.

## Two layers

### Layer A — Foundation (open, neutral domain)

- Owns: JSON Schema, JSON-LD context, field dictionary, validator, badge criteria
- Licence: CC BY-NC-ND 4.0 (public standard), Apache-2.0 (reference validator code only)
- Revenue: none from the schema itself
- Brand: Landscape Archive Foundation

### Layer B — Landscape Archive (commercial)

- Owns: Library app, Hub, Revit connector, procedural pipelines, shop, Stripe, entitlements
- Licence: EULA, subscription terms, shop terms
- Revenue: subscriptions, specimen commissions, packs, certification cohorts
- Brand: The Landscape Archive Pty Ltd

## What customers buy

| Customer need | Foundation (free) | Landscape Archive (paid) |
|---------------|---------------------|---------------------------|
| Agree on plant field names | ✓ NC reference use | commercial licence + implementation |
| Validate project metadata | ✓ validator (NC) | export + validate in product |
| BIM-ready Revit family | — | ✓ shop / Library |
| 8,889-species trait library | — | ✓ Library subscription |
| Wattle pack / coastal pack | — | ✓ shop |
| Foundation Approved badge | ✓ rules + validator | optional export assist |

## `implementationProductRef`

Botanical assets may include an optional `implementationProductRef` (e.g. `la:shop:acacia-cognata-family`). This links open metadata to a **commercial SKU** without making the open standard proprietary.

## IP already in legal docs

The Landscape Archive group's Software & Schema IP Schedule covers **implementation schema** (Revit parameter maps, procedural logic, internal pipelines), which is owned within the commercial group. The **Foundation public schema** is explicitly carved out as an open standard maintained on the independent schema portal/repo and is **not** part of the commercial group's IP.

When the governing body incorporates, assign the open standard's copyright to that entity; grant the Landscape Archive group a perpetual licence to implement and extend mappings in product code.
