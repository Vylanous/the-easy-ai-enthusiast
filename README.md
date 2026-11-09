# The Easy AI Enthusiast

An illustrated AI command center for curious people who build. Advanced prompts, practical guides, reusable agent specifications, and hands-on challenges.

## Status

- Public GitHub repository created: https://github.com/Vylanous/the-easy-ai-enthusiast
- Public dashboard implemented locally: 24 original resources, search, filters, readable detail views, copy/download buttons, and responsive navigation.
- Reference-inspired dark navy/lime/cyan artwork recreated **without lettering**. All wording is live accessible website text.
- GitHub Pages build workflow prepared locally; full source push and public deployment await secure Git/setup credentials.
- Private workspace, login, Turso CRUD, Resend account email, Render deployment, and automatic owner publishing are **pending implementation/configuration**, not active features.

The existing Vylanous.com website, Render service, and DNS are untouched.

## Architecture

One managed Bun/Vite/React/Hono/Drizzle monorepo. Public mode exports a static snapshot for GitHub Pages with `/the-easy-ai-enthusiast/` asset paths and hash routing. The secure app is planned as a new Render web service backed by your external Turso database, with your own Google OAuth client and verified email/password login.

No private API or login form is hosted on GitHub Pages. No live AI agents, automatic task runner, or client-side substitute for persistent private storage is bundled.

## Development

```sh
bun install --frozen-lockfile
bun tooling/validate-library.ts
bun run dev
bun run lint
bun run build
bunx --cwd packages/web vite build --mode public
```

The preview runs on its assigned port from `__ports.cjs`. Keep the template-managed `__*` files and analytics integration intact.

## Project map

- `packages/web/src/web/` — dashboard UI and routes.
- `packages/web/src/shared/library.ts` — public resource schema.
- `packages/web/public/content/library.json` — published seed snapshot.
- `packages/web/public/images/` and `fonts/` — text-free illustration and licensed self-hosted fonts.
- `.github/workflows/pages.yml` — static public-site build/deploy workflow.
- `tooling/validate-library.ts` — snapshot checks.
- `docs/setup.md` — launch prerequisites and provider configuration.
- `docs/content-guide.md` — editorial standards and template boundaries.

Credentials belong only in the ignored root `.env`. Never push it, private database files, tokens, or user exports.