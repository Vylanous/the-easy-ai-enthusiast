# Deployment setup

## Current implementation status

The public dashboard is implemented locally with 24 curated resources, search, topic/type filters, detail views, copy/download actions, responsive navigation, and text-free artwork. The GitHub repository has been created. The full source push and GitHub Pages deployment require authenticated Git/setup access.

The secure workspace is **not implemented or deployed yet**. Its route deliberately shows setup status rather than fake login or locally stored private tasks. Render/Turso/Google/Resend integration and owner publishing remain the next implementation stage. Nothing has been changed on the existing Vylanous.com website or DNS.

## 1. GitHub source push and Pages

Repository: https://github.com/Vylanous/the-easy-ai-enthusiast

Use a temporary fine-grained personal access token limited to this repository with:

- Contents: read/write — source/assets commit.
- Workflows: read/write — commit `.github/workflows/pages.yml`.
- Pages: read/write and Administration: read/write — initial Pages configuration through the REST API.
- Actions: read/write — trigger/check a workflow if necessary.

Supply the token through the secure credentials form, never in chat or a commit. It is stored locally in the ignored root `.env`. Do not embed it in a Git remote URL. After setup, revoke it. The eventual backend publication token should be a separate repository-specific credential with only Actions read/write.

Set Settings → Pages → Build and deployment → Source to **GitHub Actions**. The workflow builds public mode with the repository asset base path and hash navigation, then deploys `packages/web/dist`.

Optional repository variables:

- `WORKSPACE_URL`: the actual Render origin, once the secure app is ready. Omit it until then; public workspace links show honest setup status.
- `APPLICATION_ID`: the nonsecret app ID used by the required analytics integration.

There are no database/authentication secrets in the Pages workflow or public build. The seeded snapshot is committed, so Render is not needed for the initial public site.

## 2. Turso — needed before private workspace implementation

Create a database dedicated to this app in your Turso account, or explicitly choose an existing database intended for it. Obtain its libSQL URL and database auth token from the dashboard/CLI. Provide `DATABASE_URL` and `DATABASE_AUTH_TOKEN` through the secure form. Do not use the platform-provisioned preview database as your production account database.

The workspace will use Drizzle/libSQL. Production schema changes will be checked migrations, not destructive resets. Data must persist independently of Render's ephemeral filesystem.

## 3. Render

Create a **new** web service linked to this repository after the workspace stage is complete. Do not edit the existing Vylanous.com service. Use the assigned `onrender.com` hostname initially; no custom-domain changes are needed.

The next stage will add the tested Bun Docker configuration and Blueprint. Render must serve frontend and `/api/*` from the same origin. The template production server already honors `PORT`.

A free service may sleep and have cold starts. External Turso retains private data across redeploys. Do not buy or upgrade a service without a separate cost approval.

## 4. Your Google OAuth app

Once the actual Render origin is known:

1. Open Google Cloud Console and select/create a project for this app.
2. Configure the Google Auth Platform consent screen and requested user profile/email access. Use your real application name and the actual URLs.
3. Create an OAuth client of type **Web application**.
4. Add the actual Render origin as the authorized JavaScript origin.
5. Add `<actual Render origin>/api/auth/callback/google` as the authorized redirect URI.
6. If the app is in testing, add the intended test users and account for testing restrictions before launch.
7. Supply `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` securely.

Do not invent a callback hostname before Render assigns it. A local callback is optional for development; it is separate from production. Own OAuth was explicitly requested; no Runable broker/provider credentials will be substituted.

## 5. Resend transactional email

Create/use a Resend account, verify a sender domain you own, then supply an API key and the exact verified sender address. Verification and password resets will be the only account emails; no unsolicited welcome or marketing campaigns.

If you want to send from Vylanous.com, review Resend's required DNS records first. Show and approve new records before applying them. Do not replace existing root-domain MX records or modify the current website. A dedicated sending subdomain avoids many mail-routing conflicts.

Provide `RESEND_API_KEY` securely; the nonsecret sender address will be collected separately. New accounts must verify email before private access. Owner access additionally requires a verified session matching the privately configured owner email. No first-user promotion.

## 6. Owner → Pages publishing (next implementation stage)

The secure backend will store owner drafts/published revisions in Turso. Publishing will request a repository Pages workflow using a server-only Actions-write credential. The workflow will retrieve a schema-validated published-only snapshot and deploy it. Drafts and private content must never enter the snapshot.

Build request acceptance does not mean publication is live. The owner UI will distinguish requested/building/live/failed, validate the actual run/deployment status, and allow bounded retry. Export or build failure must preserve the last successful Pages deployment.

## Local commands

```sh
bun install --frozen-lockfile
bun tooling/validate-library.ts
bun run lint
bun run build
bun run dev
# Static GitHub Pages build:
bunx --cwd packages/web vite build --mode public
```

The managed preview uses the fixed port in `__ports.cjs`; do not edit template-managed files or port values. All static assets belong in `packages/web/public/`. All credentials live in the single ignored root `.env`.