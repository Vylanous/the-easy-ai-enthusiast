# The Easy AI Enthusiast

The home for advanced AI prompts, guides, agent specifications, hands-on tasks, website source, and project documentation.

## Approved architecture

- Public dashboard: GitHub Pages.
- Secure personal workspace: a new Render service, separate from the existing Vylanous.com site.
- Database: user-owned external Turso.
- Authentication: own Google OAuth app plus verified email/password.
- Account emails: Resend.
- Publishing: owner-only public edits, automatic Pages build requests using server-only GitHub credentials.

## Current status

The repository is created. A managed Bun/Vite/React/Hono/Drizzle app has been scaffolded and the public dashboard is implemented locally with 24 original resources, search, filters, detail views, copy/download actions, and text-free reference-inspired artwork.

The full source and artwork have not yet been pushed here. That push and Pages configuration require secure Git/setup credentials. No public website deployment is claimed yet.

Private workspace authentication/CRUD and Render deployment are the next stage, dependent on user-owned Turso, Google OAuth, and Resend configuration. Agent resources are templates, not live agent execution.

All website wording is live text, never baked into background illustrations. Credentials and private data must never enter this public repository.
