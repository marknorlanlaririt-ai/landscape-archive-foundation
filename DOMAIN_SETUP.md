# Domain and hosting setup

Recommended public schema host:

**`https://schema.landscapefederation.org.au`**

Keep **`landscapearchive.com.au`** as the commercial product site (currently under construction mode).

## 1. Register the federation domain

Register `landscapefederation.org.au` (or your chosen federation brand) with your AU registrar.

Suggested records:

| Host | Type | Target |
|------|------|--------|
| `schema` | CNAME | `<your-pages-project>.pages.dev` |
| `@` | redirect | `https://schema.landscapefederation.org.au` (optional marketing landing later) |

## 2. Cloudflare Pages project (separate from Landscape Archive)

This repo builds a static portal into `federation/dist/`:

```powershell
cd c:\Users\larir\la-frontend
npm run federation:build
npm run federation:deploy
```

Default Pages project name in script: **`la-federation-schema`** (change in `package.json` if needed).

In Cloudflare dashboard:

1. Create Pages project `la-federation-schema` (or connect on first deploy)
2. Custom domain → add `schema.landscapefederation.org.au`
3. SSL: Full (strict)

## 3. GitHub public mirror (recommended)

Create public repo e.g. `landscape-architecture-federation/schema` and sync:

- `federation/schema/`
- `federation/context/`
- `federation/examples/`
- `federation/crosswalk/`
- `federation/LICENSE-*`

Portal can link to GitHub for issues and RFCs.

## 4. What stays on Landscape Archive domains

| Host | Purpose |
|------|---------|
| `landscapearchive.com.au` | Marketing, shop, Library web, account |
| `app.landscapearchive.com.au` | Private app |
| `admin.landscapearchive.com.au` | Admin |

Schema URLs in JSON `$id` fields use `schema.landscapefederation.org.au` so validators work even when the commercial site is down.

## 5. Verify after deploy

```text
GET https://schema.landscapefederation.org.au/schema/manifest.json
GET https://schema.landscapefederation.org.au/context/federation-v1.jsonld
GET https://schema.landscapefederation.org.au/examples/nsw-coastal-schoolyard.bundle.json
```

Run locally: `npm run federation:validate`
