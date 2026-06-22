# Draft governance — Landscape Archive Foundation

_Status: draft for founding member consultation. Not yet incorporated._

## Purpose

Shared national advocacy, open metadata standards, and neutral stewardship of the public schema — without absorbing member practices or universities.

## Who can change what

Governance is **shared for the public standard only**. No member, partner, or contributor can use the Foundation to control another organisation's business, IP, or tooling.

| Matter | Who decides | How | Notes |
|--------|-------------|-----|-------|
| TLA-185 field dictionary (minor / new modules) | Foundation Council | RFC → working group → simple majority | Published semver on GitHub + schema portal |
| TLA-169 field dictionary (minor / 1.x) | Foundation Council | RFC → working group → simple majority | Supported base standard |
| TLA-169 / TLA-185 breaking changes (major) | Foundation Council | RFC → **two-thirds** super-majority | Charter amendment uses same bar |
| `cultural-context` fields or badge rules | Council **+** First Nations advisory seat | Protocol sign-off **before** adoption | Advisory veto cannot be overridden by majority |
| Foundation Approved badge criteria | Foundation Council | Same thresholds as schema tier | Validator rules updated in public repo |
| National advocacy statements | Foundation Council | Simple majority | Must stay within Foundation purpose (§1.2) |
| Foundation budget, brand, domain | Foundation Council | Simple majority | Not-for-profit; no profit distribution to members |
| GitHub org admin & release tags | Foundation officers (Secretary / Council) | Per charter & by-laws | Public read and PR comment; merge via officers |
| Reference validator code (`lib/`) | Foundation Council | RFC + release | Apache-2.0 where marked; canonical releases only |
| Member practice HR, fees, clients | **Each member** | Internal only | Foundation must not interfere |
| Member proprietary designs & unreleased models | **Each member** | Internal only | Contributing to schema does not transfer project IP |
| Member choice of software (LA, Revit, GIS, etc.) | **Each member** | Internal only | Foundation standard is vendor-neutral |
| The Landscape Archive products & pricing | **The Landscape Archive Pty Ltd** | Commercial board / operator | **No Foundation voting seat** for implementation partners |
| The Landscape Vault IP (Brain, assets, pipelines) | **The Landscape Vault Pty Ltd** | Holding company | Not Foundation-governed |
| Commercial implementation licence | **The Landscape Archive Pty Ltd** | Separate contract | NC standard ≠ commercial product entitlement |
| Real project bundle JSON (client data) | **Project author / member** | Local export policy | Restricted cultural detail never belongs in open GitHub repos |

**What is not a "takeover":** admitted members electing Council representatives and approving schema RFCs through the process above.

**What is not allowed:** redirecting Foundation brand, marks, or releases; publishing competing forks under the Foundation name; using Council seats to set Archive shop prices or Vault IP terms.

Full reserved powers: see [CHARTER.md](./CHARTER.md) §3. Commercial boundary: [COMMERCIAL_SEPARATION.md](./COMMERCIAL_SEPARATION.md).

## Council (proposed seats)

| Seat | Sector | Term |
|------|--------|------|
| 2 | Private practice (different states) | 2 years |
| 2 | University landscape architecture programs | 2 years |
| 1 | First Nations advisory (protocol authority) | 2 years, renewable by advisory panel |
| 1 | Environmental / research body | 2 years |
| 1 | Open data / standards liaison | 2 years |

Landscape Archive holds **no voting seat** by default; participates as **founding implementation partner**.

## What the Foundation owns

- Public metadata schema (semver releases)
- Foundation Approved badge rules
- National advocacy positions (climate-positive design, open planting data)
- Optional open asset registry policy

## What members keep

- Internal HR, finances, and project delivery
- Proprietary design IP and unreleased models
- Choice of software vendor (LA, Vectorworks, GIS stacks, etc.)

## Schema change process

1. RFC on GitHub (14-day comment period)
2. Working group recommendation
3. Council approval for minor (1.x) or major (2.0) bumps
4. Published on `schema.landscapefoundation.org.au` with CHANGELOG

## Cultural context governance

Badge criteria involving `cultural-context` require sign-off from the First Nations advisory seat before publication in validator rules.
