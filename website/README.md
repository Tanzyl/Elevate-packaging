# Elevate — Website
Monorepo scaffold for the Elevate website rebuild. Phase 1 foundation only.

## Stack


- **Frontend** (`apps/web`): Next.js 14 (App Router) + TypeScript + Tailwind + shadcn primitives + Framer Motion
- **Backend** (`apps/api`): NestJS + Prisma + JWT auth
- **DB**: PostgreSQL 16 (via Docker Compose for local dev)
- **Package manager**: pnpm workspaces

## First-time setup

```bash
# from website/
cp .env.example .env
pnpm install
pnpm db:up                           # starts Postgres in Docker
pnpm --filter @elevatepackaging/api prisma:migrate    # run initial migration
```

## Dev

```bash
pnpm dev          # runs web (:3002) and api (:4000) in parallel
```

Or individually:

```bash
pnpm web dev      # Next.js on http://localhost:3002
pnpm api dev      # NestJS on http://localhost:4000
```

> **Note on ports**: host 5432 and 3000 are already taken on this machine
> (native Postgres + a Docker port forward respectively), so the project uses
> **Postgres on :5434** and **Next.js on :3002**. If you free those ports
> later, you can put them back in `docker-compose.yml` and `apps/web/package.json`.

## Health check

After `pnpm api dev`:

```bash
curl http://localhost:4000/health
# {"status":"ok","ts":"..."}
```

## Layout

```
apps/
  web/         # public marketing site + admin panel (to be built)
  api/         # REST API + admin auth
docker-compose.yml   # local Postgres
```

## Where the content lives

All page copy, product attributes, market descriptions, and contact info are in
`../WEBSITE_CONTENT_INVENTORY.md`. The `apps/web/lib/site-config.ts` module
pulls the most-used constants (brand, palette, contact) into code — when you
change anything there, also update the inventory doc.
release :10-16-2026
