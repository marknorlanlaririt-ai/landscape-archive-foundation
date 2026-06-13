# Objects and governance rules — for the incorporated association application

**Purpose:** the text you attach to the incorporated-association application — the association's **objects** plus a **governance schedule** that layers the federation's specific rules (council, voting, arbitrator, cultural protocol) on top of your state's **model rules**.

**Status:** drafting aid. **Not legal advice.** Have a lawyer check it against your state's *Associations Incorporation Act* and model rules before lodging.

> Recommended approach: **adopt your state's model rules** (they already satisfy the ~15–20 mandatory administrative matters the Act requires), and **attach Parts A–C and the Governance Schedule below** as the association's objects and additional rules. Where any additional rule conflicts with the Act or model rules, the Act/model rules prevail.

---

## Part A — Name

**Australian Landscape Architecture Federation Incorporated** (the "Association").

## Part B — Objects (purposes)

The objects of the Association are to:

1. develop, maintain, and publish a **free and open metadata standard** for describing Australian landscape architecture projects (plants, site context, sustainability, and Connection to Country);
2. provide neutral shared infrastructure for the standard (a reference validator, an optional open asset registry, and a "Federation Approved" conformance mark);
3. advance the profession through advocacy on open data, climate-positive design, and respectful handling of Connection to Country information;
4. promote collaboration between independent practices, universities, councils, environmental bodies, and Traditional Owner organisations **without** controlling their internal operations;
5. do all things incidental to the above objects.

## Part C — Not-for-profit and winding-up clauses (required)

1. The income and property of the Association must be applied solely to its objects. No portion may be paid or distributed to members except as bona fide reimbursement of expenses.
2. The Association is **not-for-profit** and does not operate for the financial gain of its members.
3. On winding up or cancellation, after debts are paid, any surplus assets must be transferred to another not-for-profit with similar objects (and not to members). The open licences over the metadata schema and documentation (Apache-2.0 / CC BY 4.0) survive winding up.

---

## Governance Schedule (additional rules)

These layer on the model rules. They mirror the [Charter](./CHARTER.md); cross-references in brackets.

### G1 — Membership classes [Charter §2]

| Class | Who | Vote |
|-------|-----|------|
| Practice member | Private LA practices | Yes |
| Academic member | University LA programs | Yes |
| Public-body member | Councils, environmental & research bodies | Yes |
| First Nations advisory member | Traditional Owner organisations / protocol authorities | Yes + protocol sign-off (G5) |
| Implementation partner | Software/BIM/GIS vendors | **No vote** (advisory) |

Each member is an independent entity; membership creates no joint liability.

### G2 — Committee / Council [Charter §4]

The management committee (the "Council") comprises voting representatives:
- 2 practice members (different states/territories)
- 2 academic members
- 1 First Nations advisory
- 1 public-body / environmental
- 1 open-data / standards liaison

Implementation partners (including The Landscape Archive) hold **no** committee vote. The Council elects a Chair, Secretary, and Treasurer/public officer from voting members. Terms are 2 years.

### G3 — Decisions and voting [Charter §5]

| Decision | Threshold |
|----------|-----------|
| Ordinary business | Simple majority of votes cast |
| Schema minor release (1.x) | Simple majority |
| Schema major release (2.0), rule amendment, new member class | Two-thirds of all voting seats |
| Winding up | Three-quarters of all voting seats |

Quorum is a majority of filled voting seats. The Chair holds a casting vote only on ordinary business.

### G4 — Schema change process [Charter §6]

Changes follow a public RFC (≥14-day comment) → working-group recommendation → Council vote at the G3 threshold → publication with a CHANGELOG entry and semver tag.

### G5 — Connection to Country protocol sign-off [Charter §6.4]

Any schema field, conformance-mark rule, or registry policy touching cultural context requires sign-off from the First Nations advisory member **before** adoption. This sign-off is not overridden by majority vote. *(Confirm enforceability wording with a lawyer; some states limit how member rights may be entrenched.)*

### G6 — Dispute resolution [Charter §7]

Disputes follow: good-faith negotiation (14 days) → referral to an **independent arbitrator** appointed by the Council → binding decision interpreting these rules. This supplements (does not replace) the dispute-resolution and grievance procedures required by the Act/model rules.

### G7 — Intellectual property [Charter §8]

Schema files are licensed Apache-2.0; documentation CC BY 4.0. Copyright in the schema is held by the Association. Members and implementation partners receive a perpetual, royalty-free licence to implement and extend mappings. Members retain all IP in their own designs and datasets.

---

## Part D — Public officer

The Association will appoint a **public officer** who resides in the home state/territory, as required by the Act. (Recorded in the inaugural minutes.)

## How to lodge

1. Adopt your state's **model rules**.
2. Attach Parts A–C as the name, objects, and not-for-profit/winding-up clauses.
3. Attach the **Governance Schedule** as additional rules.
4. Record adoption in the [inaugural meeting minutes](./INAUGURAL_MEETING_MINUTES.md).
5. Lodge with the state regulator (see [INCORPORATION_CHECKLIST.md](./INCORPORATION_CHECKLIST.md)).
