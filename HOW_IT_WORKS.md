# How the federation works (plain language)

## The problem

Australian landscape architecture is spread across private studios, universities, councils, and environmental groups. Everyone uses different software, filenames, and plant lists. Collaboration and national advocacy are harder than they need to be.

## The federation answer

A **federation** is an alliance — not a single company and not a government department. Members keep their independence. They agree on one thing: **a shared way to describe projects and plants in digital files**.

That shared way is the **metadata schema**: a public dictionary of field names and meanings (project location, species, soil band, fire response, Connection to Country sensitivity, carbon disclosure, etc.).

## What you actually do

1. **Export** a project metadata file (JSON bundle) from your tool or spreadsheet template.
2. **Validate** it against the federation schema (free CLI or web checker on the schema portal).
3. **Optional:** upload open assets to a federation registry (future) or attach a **Federation Approved** badge to your project submission.

You do **not** have to use Landscape Archive to use the schema.

## What Landscape Archive does

Landscape Archive is a **founding implementation partner**:

- Maps federation fields to Revit `sourceData` and the Library
- Sells **subscriptions**, **Revit families**, **shop packs**, and **certification** — commercial layers on top of open metadata
- Can export federation bundles from entitled projects so practices meet badge criteria while still buying BIM geometry from the shop

## Connection to Country

Cultural metadata uses a **sensitivity class**:

- **open** — safe summary may appear in public federation files
- **restricted** — only a pointer is public; detail stays on the node’s secure systems
- **not-for-publication** — federation index knows engagement occurred but stores no cultural content

This is governance + schema together; the federation council must approve badge rules involving cultural fields.

## Separate domain

The schema portal lives at **`schema.landscapefederation.org.au`** (recommended), deployed as its own Cloudflare Pages project — separate from `landscapearchive.com.au`, which can stay under construction or return as the commercial product site.
