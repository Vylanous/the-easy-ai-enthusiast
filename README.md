# The Easy AI Enthusiast

An AI learning hub with 24 original resources, search, filters, detail views, copy/download actions, and responsive navigation.

## Website

https://vylanous.github.io/the-easy-ai-enthusiast/

**GitHub Pages is the only production host.** The website is a static React/Vite build, deployed by `.github/workflows/pages.yml`. No Runable or Render deployment is used. Existing unrelated websites and DNS are not changed.

All builds use `/the-easy-ai-enthusiast/` asset paths and hash navigation so resource links survive refreshes. Any legacy `WORKSPACE_URL` workflow variable is ignored by the frontend. No database, authentication, or external server is required. The existing analytics integration is tracking, not website hosting.

Private accounts, saved workspace resources, and server-backed task progress are unavailable on this static site. Workspace links show these limitations rather than redirecting to another host. Copy/download remain available without an account.

## Development

```sh
bun install --frozen-lockfile
bun tooling/validate-library.ts
bun run dev
bun run build:web
```

The retained monorepo server/mobile/desktop scaffolding is not deployed. The Vite development server serves only the frontend, and the standard web build exports a static Pages site.

## Publishing

Commit changes to `main`. The existing GitHub Actions workflow validates content, type-checks the web app, builds the static site, and deploys `packages/web/dist` to GitHub Pages. Configure Settings → Pages → Source as **GitHub Actions**.

- `packages/web/src/web/`: frontend.
- `packages/web/public/content/library.json`: published resource snapshot.
- `packages/web/public/`: fonts, artwork, and static assets.
- `docs/setup.md`: Pages setup and verification.
- `docs/content-guide.md`: editorial standards.

Never commit credentials or private data. GitHub Pages content is public.
