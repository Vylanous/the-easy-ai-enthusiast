# GitHub Pages setup

Website: https://vylanous.github.io/the-easy-ai-enthusiast/

Repository: https://github.com/Vylanous/the-easy-ai-enthusiast

## Only production host

GitHub Pages hosts the complete static website. No Runable deployment, Render service, Turso database, OAuth application, or Resend account is required. No private backend is deployed. Existing unrelated services and DNS are untouched.

1. In repository Settings → Pages, choose **GitHub Actions** as the source.
2. Push to `main`, or manually run the existing Pages deployment workflow in Actions.
3. The workflow installs dependencies, validates the committed public content snapshot, type-checks, and builds `packages/web/dist`.
4. GitHub Actions uploads the static artifact and deploys it using Pages permissions.
5. Verify the workflow's build and deploy jobs succeed before considering a change live.

The frontend no longer reads `WORKSPACE_URL` or `VITE_WORKSPACE_URL`. Any legacy workflow value is ignored. The existing nonsecret analytics ID is used only for tracking, not hosting.

## Static-site constraints

Public search/filtering, resource details, copy/download, and responsive navigation work without an account. Private sign-in, workspace saving, persistent private tasks, server-side email, and automated owner publishing are not available. Workspace links remain on the Pages site and explain these limitations.

Edit `packages/web/public/content/library.json` and commit to publish resources. Do not include drafts, credentials, or private data in the public snapshot.

## Local verification

```sh
bun install --frozen-lockfile
bun tooling/validate-library.ts
bun run build:web
```

Every Vite build, including the default production build, uses the repository base path. Routes use hashes in both development and production. The Vite development server does not mount backend APIs. Remaining monorepo backend scaffolding is not deployed by the Pages workflow.
