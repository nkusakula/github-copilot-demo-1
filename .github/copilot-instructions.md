# Copilot Instructions for OctoCAT Supply

OctoCAT Supply is a full-stack supply chain management demo app: an Express/TypeScript API and a React/TypeScript frontend, managed as an npm workspaces monorepo.

## Architecture
- `api/` — Express + TypeScript REST API, documented with Swagger/OpenAPI (`api/api-swagger.json`).
  - `src/index.ts` — app entrypoint and route registration.
  - `src/models/` — one TypeScript type/interface per domain entity (e.g. `product.ts`, `order.ts`, `supplier.ts`, `branch.ts`, `headquarters.ts`, `delivery.ts`, `orderDetail.ts`, `orderDetailDelivery.ts`).
  - `src/routes/` — one Express router per entity, mirroring the model names above.
  - `src/seedData.ts` — in-memory seed/demo data (there is no real database).
  - Entities relate as: Headquarters → Branch → Order → OrderDetail → Product, with OrderDetailDelivery/Delivery linking Suppliers to Orders.
- `frontend/` — React 18 + TypeScript + Vite + Tailwind CSS.
  - `src/api/` — Axios-based API client calls, one module per entity, matching the `api/` routes.
  - `src/components/` — shared UI (`Navigation.tsx`, `Footer.tsx`, `About.tsx`, `Welcome.tsx`, `Login.tsx`) plus `admin/` and `entity/` subfolders for entity-specific views.
  - `src/context/` — React context providers (`AuthContext.tsx`, `ThemeContext.tsx`).
  - Routing uses `react-router-dom`; data fetching uses `react-query` + `axios`.
- `infra/` — infrastructure/deployment assets.
- `docs/` — architecture docs and `docs/design/` UI mockups (PNGs) used as Copilot Vision references when implementing new features.

## Conventions
- When adding a new entity end-to-end, mirror the existing pattern: add a model in `api/src/models/`, a router in `api/src/routes/`, register it in `api/src/index.ts`, then a matching API client module in `frontend/src/api/` and UI in `frontend/src/components/entity/`.
- Keep model names and file names consistent (lowercase, singular) between `api/src/models/`, `api/src/routes/`, and `frontend/src/api/`.
- Frontend styling uses Tailwind CSS utility classes; avoid introducing other CSS-in-JS or styling libraries.
- Prefer functional React components with hooks; use existing context providers (`AuthContext`, `ThemeContext`) rather than adding new global state mechanisms.
- Reuse existing assets from `docs/design/` when implementing UI features described in that folder, instead of creating new artwork.

## Developer workflows
- Install deps and build everything: `npm install && npm run build` (root).
- Run both API and frontend in dev mode: `npm run dev` (root) or individually via `npm run dev:api` / `npm run dev:frontend`.
- Tests: `npm test` (all workspaces), or `npm run test:api` / `npm run test:frontend`. API tests use Vitest + Supertest (see `api/src/routes/branch.test.ts` for the pattern); coverage via `npm run test:coverage` in `api/`.
- Lint (frontend only): `npm run lint`.
- The frontend dev server proxies/consumes the API — start the API before relying on live data in the UI.

## Notes for AI agents
- This is a demo/teaching repo: keep changes minimal, consistent with existing patterns, and favor clarity over cleverness.
- There is no real persistence layer — all API data lives in `api/src/seedData.ts`; new entities should extend that in-memory data rather than adding a database.
- When implementing a feature from a design mockup in `docs/design/`, generate a short implementation plan first, then implement across both `api/` and `frontend/` as needed.
