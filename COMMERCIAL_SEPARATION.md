# Commercial separation — federation vs Landscape Archive

## Short answer

**Yes, you can still sell plants, Revit families, Library subscriptions, shop packs, and certification** after launching the federation schema.

The federation does not replace your store. It standardises **how project metadata is described** when files move between independent nodes.

## Two layers

### Layer A — Federation (open, neutral domain)

- Owns: JSON Schema, JSON-LD context, field dictionary, validator, badge criteria
- Licence: Apache-2.0 (schema), CC BY 4.0 (docs)
- Revenue: none from the schema itself
- Brand: Australian Landscape Architecture Federation (working name)

### Layer B — Landscape Archive (commercial)

- Owns: Library app, Hub, Revit connector, procedural pipelines, shop, Stripe, entitlements
- Licence: EULA, subscription terms, shop terms
- Revenue: subscriptions, specimen commissions, packs, certification cohorts
- Brand: The Landscape Archive Pty Ltd

## What customers buy

| Customer need | Federation (free) | Landscape Archive (paid) |
|---------------|-------------------|---------------------------|
| Agree on plant field names | ✓ schema | implements schema |
| Validate project metadata | ✓ validator | export + validate in product |
| BIM-ready Revit family | — | ✓ shop / Library |
| 8,889-species trait library | — | ✓ Library subscription |
| Wattle pack / coastal pack | — | ✓ shop |
| Federation Approved badge | ✓ rules + validator | optional export assist |

## `implementationProductRef`

Federation botanical assets may include an optional `implementationProductRef` (e.g. `la:shop:acacia-cognata-family`). This links open metadata to a **commercial SKU** without making the federation schema proprietary.

## IP already in legal docs

The Landscape Archive group’s Software & Schema IP Schedule covers **implementation schema** (Revit parameter maps, procedural logic, internal pipelines), which is owned within the commercial group. The **federation public schema** is explicitly carved out as an open standard maintained on the federation domain/repo and is **not** part of the commercial group’s IP.

When the federation council incorporates, assign federation schema copyright to the federation entity; grant the Landscape Archive group a perpetual licence to implement and extend mappings in product code.
