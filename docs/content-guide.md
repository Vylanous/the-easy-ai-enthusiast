# Resource format and quality bar

The public library currently contains six original resources per type: prompts, guides, agent templates, and task challenges. Its snapshot is `packages/web/public/content/library.json`; `src/shared/library.ts` defines the Zod schema.

Every resource has a stable URL-safe ID, type, title, description, topic, tags, estimated reading/challenge minutes, body text, and practical steps. Estimates are editorial estimates, not measured execution times. Display counts come from actual content.

## Prompts

State the role, real input placeholders, workflow, output contract, constraints, and uncertainty handling. A prompt must not imply live research or tool use unless the user's own implementation authorizes it. Do not fabricate run results.

## Guides

Explain why the technique matters, prerequisites, concrete steps, an exercise, limitations, and an observable completion criterion. Separate factual claims from practical recommendations. Verify vendor/version-specific assertions before adding them.

## Agents

These are specifications, not running agents. Include role, input schema, process, output schema, permissions, handoff, stop rule, and approval boundaries. Clearly state that the website does not execute tools or automations.

## Tasks

Include a mission, prerequisites, deliverable, acceptance criteria, caveats, and actionable checklist. Public steps are an instructional outline, not saved user progress. Persistent task tracking belongs in the future secure workspace.

## Content safety

- Render resource text as text, not executable HTML.
- Never include account data, drafts, credentials, private source excerpts, or task records in the published snapshot.
- Preserve evidence provenance, acknowledge gaps, and keep human approvals for consequential actions.
- Keep IDs stable; deleting or renaming IDs affects shared resource URLs.
- Validate with `bun tooling/validate-library.ts` before building.

Owner editing/publishing is a pending backend feature. Until it exists, snapshot changes are reviewed source commits, not anonymous browser writes.