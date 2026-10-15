# quantum.observer

The source for [quantum.observer](https://quantum.observer), where I put the things I make and updates on them.

It's an [Analog](https://analogjs.org) site: Angular components, file-based routes, and every page prerendered to static HTML at build time. It's served by Cloudflare Workers static assets. The display face is [Vesica](https://fonts.quantum.observer/vesica/), loaded from fonts.quantum.observer.

## Writing an update

Add a Markdown file to `src/updates/`:

```md
---
title: Getting ready for 1.0.0-beta.1
slug: 2026-10-15-inkweld-getting-ready-for-beta
date: 2026-10-15
tag: Inkweld
summary: One or two sentences for the list on the home page.
---

The update itself, in Markdown. HTML works too.
```

The file name and the slug should match. The update shows up on the home page, at `/updates`, at `/updates/<slug>`, in the sitemap and in `/rss.xml`.

Updates live in `src/updates` rather than `src/content` because Analog turns every Markdown file under `src/content` into a route of its own, which would bypass the update page.

## The things on the home page

`src/app/data/things.ts` holds the featured project and the other things, with their descriptions and statuses. Commit counts, merged pull requests and latest releases come from GitHub: `scripts/fetch-github.mjs` writes them to `src/app/data/github.json` before each build. If GitHub can't be reached, the saved file is used.

## Building

You need Node.js 22.22 or later.

```sh
npm install
npm run dev            # dev server
npm run build          # fetch GitHub numbers, build, write rss.xml and 404.html
npm run build:offline  # the same without fetching
npm run deploy         # wrangler deploy
```

Set `GITHUB_TOKEN` when building to get a higher GitHub API rate limit.

The GitHub Action in `.github/workflows/deploy.yml` builds on every push to `main` and once a day, so the commit counts stay current. It deploys when the repository has `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.

## A note on component inputs

Components that take inputs use `@Input()` rather than signal `input()`. Analog's server build currently compiles components just in time, and the just-in-time compiler doesn't see signal inputs, so they arrive empty when pages are prerendered. Signals are used everywhere else.

## Licence

The code is MIT licensed. The writing in `src/updates` is mine; please ask before reusing it.
