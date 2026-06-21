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

## Foundation vs Archive responsibilities

Three entities, three jobs. **Do not move the whole certification programme to the Foundation.** Split *rules* (Foundation) from *products* (Archive/Vault).

### The Landscape Vault Pty Ltd (IP holding)

| Stays at Vault | Never Foundation |
|----------------|------------------|
| TLA Brain automation and implementation code | — |
| Procedural pipelines, 3D asset source files, Studio+ catalogue | — |
| Populated species/trait databases and derived datasets | — |
| Software & Schema IP Schedule (implementation mappings) | — |

### Landscape Archive Foundation (public standard steward)

| Foundation owns | Notes |
|-----------------|-------|
| TLA-169 field dictionary and JSON Schema (semver) | CC BY-NC-ND 4.0 |
| JSON-LD context and reference validator | Apache-2.0 where marked |
| **Foundation Approved** badge **criteria** + open validator | Free, vendor-neutral interchange floor |
| Governance of `cultural-context` sensitivity classes | First Nations advisory sign-off on rule changes |
| Public regulatory **crosswalks** (field → disclosure concept) | Mapping docs only — no proprietary joins |
| Citation & lineage **requirements** for open bundles (policy) | Not the datasets themselves |
| National advocacy positions (open metadata, climate-ready fields) | Not product marketing |
| Future: open audit **checklist** for disclosure metadata | Rules PDF/markdown — not an app |
| Future: assessor **accreditation policy** (who may attest) | Foundation defines bar; Archive may be one issuer |

| Does **not** move to Foundation | Why |
|--------------------------------|-----|
| Pilot / tier **certification programme** (training, cohorts, exams) | Paid vendor credential — Archive revenue & liability |
| Species library, Run-01, site-risk joins, Austraits values | Licensed / proprietary data |
| Stripe, entitlements, shop, enterprise data licence | Commercial operator |
| Export assist that validates against Archive catalogue | Uses paid datasets |
| Premium QA (BIM quality, species truth vs canonical record) | Product differentiation above open floor |

### The Landscape Archive Pty Ltd (commercial operator)

| Archive owns | Relationship to Foundation |
|--------------|---------------------------|
| Library, Hub, Revit connector, Studio+, shop | Implements TLA-169; does not own the dictionary |
| **Landscape Archive Certified** practitioner programme (`/pilot-certification`) | **Vendor credential** — not “Foundation certification” |
| Credential verify API, cohort checkout, tier assessments | Separate from Foundation Approved badge |
| Commercial implementation licence (NC → paid) | Contact Archive, not Foundation |
| Export + validate **in product** (optional assist) | Helps users pass Foundation Approved; not required |

### Certification: three layers (do not merge)

| Layer | Name | Owner | Cost |
|-------|------|-------|------|
| **1** | **Foundation Approved** | Foundation | Free — machine-checkable metadata bundle (structure + minimum disclosure) |
| **2** | **Archive Certified** (practitioner credential) | Archive | Paid — training on Archive tools & workflows; vendor-specific |
| **3** | Institutional attestation (future) | Foundation policy; multiple issuers | TBD — Foundation may publish fingerprint spec and accredit assessors; Archive is one implementation partner |

Using **Foundation Approved** does **not** require a Landscape Archive subscription. Passing **Archive Certified** does **not** imply government accreditation or statutory sign-off.

### Naming in public copy

- Say **Foundation Approved** for open metadata / interchange compliance.
- Say **Landscape Archive Certified** (or “Archive practitioner credential”) for the paid training programme.
- Avoid two different programmes both branded as “Foundation certification.”

## What customers buy

| Customer need | Foundation (free) | Landscape Archive (paid) |
|---------------|---------------------|---------------------------|
| Agree on plant field names | ✓ NC reference use | commercial licence + implementation |
| Validate project metadata | ✓ validator (NC) | export + validate in product |
| BIM-ready Revit family | — | ✓ shop / Library |
| 8,889-species trait library | — | ✓ Library subscription |
| Wattle pack / coastal pack | — | ✓ shop |
| Foundation Approved badge | ✓ rules + validator | optional export assist |
| Archive practitioner credential (tiers / cohorts) | — | ✓ certification programme |
| Practitioner training & product workflows | — | ✓ Archive Certified |

## `implementationProductRef`

Botanical assets may include an optional `implementationProductRef` (e.g. `la:shop:acacia-cognata-family`). This links open metadata to a **commercial SKU** without making the open standard proprietary.

## IP already in legal docs

The Landscape Archive group's Software & Schema IP Schedule covers **implementation schema** (Revit parameter maps, procedural logic, internal pipelines), which is owned within the commercial group. The **Foundation public schema** is explicitly carved out as an open standard maintained on the independent schema portal/repo and is **not** part of the commercial group's IP.

When the governing body incorporates, assign the open standard's copyright to that entity; grant the Landscape Archive group a perpetual licence to implement and extend mappings in product code.
