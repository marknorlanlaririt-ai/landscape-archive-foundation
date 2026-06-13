# Founding Charter — Australian Landscape Architecture Federation

**Document type:** Founding Charter (Constitution)
**Version:** 0.1 — DRAFT for founding-member consultation
**Status:** NOT yet legally binding. This becomes operative only when (a) founding members execute it, and (b) the federation is incorporated (see §11). Legal review required before signing.

> Plain-language companion: [HOW_IT_WORKS.md](./HOW_IT_WORKS.md). Summary: [GOVERNANCE.md](./GOVERNANCE.md).

---

## 1. Name and purpose

1.1 The body is the **Australian Landscape Architecture Federation** ("the Federation"), a not-for-profit alliance of independent members. It starts as an **unincorporated working group** (no new company); see §11.

1.2 Purpose:
- maintain an **open, free metadata schema** for Australian landscape architecture;
- provide neutral shared infrastructure (validator, optional asset registry, "Federation Approved" badge);
- advance national advocacy (climate-positive design, open planting data, Connection to Country protocols);
- **without** absorbing or controlling the internal operations of any member.

1.3 The Federation does not sell commercial products. Members and implementation partners (e.g. The Landscape Archive) may sell products that **implement** the schema. See [COMMERCIAL_SEPARATION.md](./COMMERCIAL_SEPARATION.md).

---

## 2. Members

2.1 **Member classes:**

| Class | Who | Vote |
|-------|-----|------|
| Practice member | Private landscape architecture practices | Yes |
| Academic member | University LA programs / schools | Yes |
| Public-body member | Councils, environmental & research bodies | Yes |
| First Nations advisory member | Traditional Owner organisations / protocol authorities | Yes + protocol veto (§6.4) |
| Implementation partner | Software/BIM/GIS vendors implementing the schema | **No vote** (advisory) |

2.2 Each member remains a fully independent legal entity. Membership creates no joint liability between members.

2.3 Admission, suspension, and resignation procedures are set by by-laws approved under §5.

---

## 3. The two-tier power split (reserved powers)

This is the core of the federation: an explicit line dividing federation power from member autonomy. Anything not listed as a Federation reserved power remains with members.

### 3.1 Federation reserved powers (central body)

The Federation **may only** act on:
- the public metadata schema and its versioning;
- the JSON-LD context and reference validator;
- "Federation Approved" badge criteria;
- the optional shared open-asset registry policy;
- national advocacy positions adopted by Council;
- the Federation's own budget, brand, and infrastructure.

### 3.2 Member-reserved powers (local autonomy)

The Federation **must not** interfere in:
- a member's staffing, finances, fees, or clients;
- a member's proprietary design IP and unreleased models;
- a member's choice of software vendor or internal workflow;
- a member's project delivery decisions.

### 3.3 Default rule

Where a matter is not expressly listed in §3.1, it is a member-reserved power. Disputes over which tier applies go to arbitration (§7).

---

## 4. The Council (governing body)

4.1 The Federation is governed by a **Council** of voting representatives, not by any single member or partner.

4.2 **Composition (founding):**

| Seats | Sector | Term |
|-------|--------|------|
| 2 | Practice members (different states/territories) | 2 years |
| 2 | Academic members | 2 years |
| 1 | First Nations advisory | 2 years, renewable by the advisory panel |
| 1 | Public-body / environmental | 2 years |
| 1 | Open-data / standards liaison | 2 years |

4.3 Implementation partners (including The Landscape Archive) hold **no voting seat** by default and attend in an advisory capacity only.

4.4 The Council elects a Chair and a Secretary from among voting members. No member holds more than one voting seat.

---

## 5. Decisions and voting

5.1 **Quorum:** a majority of voting seats filled and present.

5.2 **Vote thresholds:**

| Decision type | Threshold |
|---------------|-----------|
| Ordinary business (budget, badge tweaks, advocacy statements) | Simple majority of votes cast |
| Schema **minor** release (1.x) | Simple majority |
| Schema **major** release (2.0), charter amendment, new member class | **Two-thirds (2/3)** of all voting seats |
| Anything engaging cultural-context rules | Simple/2-thirds as above **plus** §6.4 protocol sign-off |
| Dissolution | Three-quarters (3/4) of all voting seats (§10) |

5.3 Each voting member has one vote. The Chair has a casting vote only to break a tie on ordinary business.

5.4 Decisions, vote tallies, and dissents are recorded in a public minute on the schema portal.

---

## 6. Schema change process and cultural governance

6.1 Changes follow a public **RFC** process:
1. RFC opened on GitHub (minimum 14-day comment period);
2. working-group recommendation;
3. Council vote at the threshold in §5.2;
4. publication on `schema.landscapefederation.org.au` with a CHANGELOG entry and semver tag.

6.2 The schema is versioned with semver. Breaking changes require a major bump and the §5.2 super-majority.

6.3 No member or partner may publish a competing fork under the Federation name or "Federation Approved" mark.

6.4 **Connection to Country protocol veto:** any schema field, badge rule, or registry policy touching `cultural-context` requires sign-off from the First Nations advisory seat **before** adoption. This sign-off cannot be overridden by majority vote.

---

## 7. Dispute resolution (the binding arbitrator)

7.1 Because power is split, disputes are expected. The Federation maintains an **independent arbitrator** (or a small arbitration panel) who is **not** an officer or employee of any member.

7.2 **Process:**
1. Good-faith negotiation between the parties (14 days);
2. if unresolved, referral to the independent arbitrator;
3. the arbitrator interprets **this Charter** and the schema rules and issues a **binding** decision;
4. decisions are published (with confidential/cultural detail redacted).

7.3 Arbitration is the agreed forum before any court action. Governing law: the State/Territory of the Federation's registered office, Australia.

7.4 The arbitrator is appointed by Council super-majority and serves a fixed term; removal requires the same threshold.

---

## 8. Intellectual property and licensing

8.1 The public schema files are licensed **Apache-2.0**; documentation **CC BY 4.0**. On incorporation, schema copyright is assigned to the Federation entity.

8.2 The Federation grants every member and implementation partner a perpetual, royalty-free licence to implement and extend mappings to the schema in their own tools.

8.3 Members retain all IP in their own designs, datasets, and models. Contributing to the schema does not transfer member project IP.

---

## 9. Finances

9.1 The Federation is not-for-profit. Any surplus is applied to its purpose (§1.2), never distributed to members.

9.2 Funding may come from modest membership contributions, grants, and sponsorship — none of which confer extra votes or schema control.

9.3 The Federation keeps infrastructure low-cost (static schema hosting, public Git repo, lightweight validator).

---

## 10. Amendments and dissolution

10.1 This Charter is amended only by the §5.2 super-majority after a 21-day notice period to all members.

10.2 Dissolution requires a 3/4 vote of all voting seats. On dissolution, the schema and documentation remain permanently under their open licences (§8.1); any remaining assets transfer to a not-for-profit with a compatible purpose.

---

## 11. Legal status and form

> **Decision (2026-06-13):** the founders are proceeding to establish the Federation as an **incorporated association** (a state-registered non-profit — *not* a company) so it can hold `landscapefederation.org.au` and act as a neutral legal entity. Until incorporation completes, the Federation operates as the unincorporated working group described in §11.1. See [INCORPORATION_CHECKLIST.md](./INCORPORATION_CHECKLIST.md).

### 11.1 Interim form — unincorporated working group (until incorporation completes)

The Federation **starts as an unincorporated open-standards working group**. It is **not** a company and is not separately registered. This Charter operates as a **binding multi-party agreement** between the founding members. The schema, repository, validator, and portal require no legal entity to exist or be used (open licences under §8 do that).

This is the lightest option and is preferred while the Federation has no employees and no assets beyond its public repository. See [LEGAL_STRUCTURE_OPTIONS.md](./LEGAL_STRUCTURE_OPTIONS.md).

### 11.2 Handling money early (if needed)

If funds must move before incorporation (e.g. shared domain cost, a small grant), the Federation will be **auspiced by a neutral existing not-for-profit** (e.g. a professional body or university) — **not** by a commercial implementation partner — to preserve neutrality.

### 11.3 Incorporation trigger — incorporated association (still not a company)

The Federation will incorporate **as an incorporated association** (a state-registered entity, **not** an ASIC company) once any of the following occurs:
- it needs to hold assets or sign contracts in its own name;
- it wishes to employ anyone;
- it takes grants above a threshold set by Council;
- officer/member liability exposure becomes material.

A company limited by guarantee is **not** adopted unless the Federation later reaches national scale with many funded members and Council resolves to do so by the §5.2 super-majority.

### 11.4 To make this operative

1. Founding members review and **execute** this Charter (a multi-party agreement — short legal review, not a company formation).
2. **Appoint** the founding Council and the independent arbitrator.
3. **Adopt by-laws** for admissions, meetings, and the badge programme.

Until members sign, the Federation is an informal group and this document has no legal force.
