# Guidelines

This monorepo uses `mise` to install root tools, you should fail if you don't have access to `mise`.
Prefix commands managed by `mise` with `mise x --`, eg. `mise x -- bun install`.
This monorepo uses `bun`.
Prefer defining dependencies versions at the root:

- For `bun` deps, set them in the root `package.json` bun catalogs. Ask review when creating a new named catalog.

Ask review before adding any new external dependency.
Do not ask for review when adding a workspace dependency from a bun catalog, eg. `"react": "workspace:react"`.
Use latest versions available when adding dependencies.

Prefer Typescript over Javascript.

# Workflow

`mise install` -> install root tools
`mise update` -> update root tools
`bun install` -> install bun deps
`bun update -r` -> update bun deps

# Map

`scripts/` -> maintainance scripts
`apps/nextjs` -> main web app
