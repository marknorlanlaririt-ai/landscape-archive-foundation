# Incorporation checklist — Incorporated Association

**Goal:** establish the Australian Landscape Architecture Federation as an **incorporated association** (a state-registered non-profit — **not** a company), so it can hold `landscapefederation.org.au`, sign for infrastructure, and act as a neutral entity.

**Status:** practical checklist. **Not legal advice** — confirm details with your state/territory regulator or a lawyer.

> Why an incorporated association (not a company): it's a separate legal entity with limited liability, low cost, and a non-profit purpose, but it is **not** an ASIC company — which matches your preference to avoid forming a company. It also satisfies `.org.au` eligibility.

---

## The sequencing catch (read first)

You **cannot complete the `.org.au` domain registration until the association exists**, because the registrar requires the association's incorporation number / ABN to prove `.org.au` eligibility. Order of operations:

1. Form the association →
2. Get its ABN →
3. Register `landscapefederation.org.au` →
4. Point DNS to Cloudflare → I attach the Pages custom domain.

(Optional: register `landscapefederation.com.au` under The Landscape Archive Pty Ltd ABN now as a cheap name-hold while you incorporate.)

---

## Step 1 — Choose the home state/territory

Incorporated associations are **state-based**. Register in the state where the association is principally run (usually where the public officer lives). Regulators:

| State/Territory | Regulator |
|-----------------|-----------|
| VIC | Consumer Affairs Victoria |
| NSW | NSW Fair Trading |
| QLD | Office of Fair Trading (QLD) |
| SA | Consumer and Business Services |
| WA | Consumer Protection (DMIRS) |
| TAS | Consumer, Building and Occupational Services |
| ACT | Access Canberra |
| NT | Licensing NT |

> National note: an incorporated association is intended to operate **primarily in its home state**. If the Federation later operates substantially across states, it may need to register as a **Registrable Australian Body (RAB)** with ASIC, or convert to a **company limited by guarantee**. Fine to start in one state and revisit if it grows truly national.

## Step 2 — Line up the minimum members

Most states require a **minimum of 5–7 members** to incorporate (varies — confirm with your regulator). This ties directly to founding-member recruitment: you need a handful of people/orgs willing to be founding members. Use [FOUNDING_INVITATION.md](./FOUNDING_INVITATION.md).

## Step 3 — Pick a name and check availability

- Proposed: **Australian Landscape Architecture Federation Incorporated** (or "… Inc.")
- Check the name isn't taken on your state regulator's register (and ideally that `landscapefederation.org.au` is available — it appeared available in your GoDaddy search).

## Step 4 — Adopt a set of rules (constitution)

Two paths:
- **Easiest:** adopt your state's **model rules** (a ready-made constitution the regulator publishes). Fastest approval.
- **Custom:** lodge your own rules. Our [CHARTER.md](./CHARTER.md) can be adapted, but model rules are simpler to get approved — you can attach the Charter's governance intent (power split, council, arbitrator, cultural protocol veto) as the association's **objects/by-laws**.

Recommended: adopt **model rules** + record the Charter as the Federation's governance schedule/by-laws. Ready-to-attach text: [ASSOCIATION_RULES.md](./ASSOCIATION_RULES.md).

## Step 5 — Hold the inaugural meeting

Founding members meet and resolve to:
- incorporate the association;
- adopt the rules;
- elect a **committee** and a **public officer** (must reside in the home state);
- approve the objects (purpose) — reuse §1.2 of the Charter.

Keep minutes — the regulator may want them. Template: [INAUGURAL_MEETING_MINUTES.md](./INAUGURAL_MEETING_MINUTES.md).

## Step 6 — Lodge the application + fee

- Submit the incorporation application to the state regulator (online in most states).
- Fee is typically **~$50–$220** (varies by state).
- You'll receive an **incorporation number** (and certificate) on approval — usually days to a few weeks.

## Step 7 — Get an ABN (free)

- Apply at the Australian Business Register: https://abr.gov.au — free.
- Select the entity type "Other incorporated entity / association".

## Step 8 — Register the domain

- Complete `landscapefederation.org.au` at GoDaddy, entity type **Incorporated Association**, supplying the incorporation number / ABN.
- Subdomain target: **`schema.landscapefederation.org.au`** (matches every `$id` in the schema — no changes needed).

## Step 9 — DNS to Cloudflare + custom domain

- Cloudflare Registrar does **not** support `.au`, so keep the registration at GoDaddy and **change the nameservers to Cloudflare** (add the domain as a zone in Cloudflare first).
- Tell me when DNS is on Cloudflare and I'll attach `schema.landscapefederation.org.au` to the `la-federation-schema` Pages project and verify all schema URLs resolve.

---

## Quick cost/time summary

| Item | Cost | Time |
|------|------|------|
| Incorporated association registration | ~$50–$220 | Days–few weeks |
| ABN | Free | Same day–days |
| `.org.au` domain | ~$20–30/yr | Minutes (after entity exists) |

No company, no ASIC, no ongoing company fees.
