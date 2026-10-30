---
title: Inkweld 1.0.0-beta.2 and beta.3
slug: 2026-10-30-inkweld-1-0-0-beta-2-and-3
date: 2026-10-30
tag: Inkweld
summary: Two more betas, mostly fixes. If you run your own server, please upgrade to beta.3, which stops it silently dropping document edits.
---

Two more betas since last week: [1.0.0-beta.2](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.2) and [1.0.0-beta.3](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.3). They’re mostly bug fixes, which is what the betas are for.

The important one: if you run Inkweld on your own server (Docker, Bun or the Home Assistant app), please upgrade to beta.3. Opening a project could leave the server unable to save anything for it, with only a warning in the log ([#1689](https://github.com/bobbyquantum/inkweld/pull/1689)). The device you wrote on usually hid this, because it pushes its own copy again when it reconnects, but other devices and collaborators could see old or empty documents, especially after a server restart. inkweld.app wasn’t affected.

There’s nothing to migrate. After upgrading, documents the server lost come back when a device that still has them opens them or runs Sync All.

Other fixes:

- Renaming a project now moves its documents on the server, not just its files. Before, edits that only another device had could be lost ([#1695](https://github.com/bobbyquantum/inkweld/pull/1695)).
- A new project now always starts empty, even if an old project once used the same URL ([#1695](https://github.com/bobbyquantum/inkweld/pull/1695)). If you’re self-hosting and kept an old project’s folder so you could re-attach it by creating the project again, that no longer works: the folder gets removed.
- Comments show their authors’ names and avatars instead of “Unknown”, and deleting a shared published file takes its public link down too ([#1691](https://github.com/bobbyquantum/inkweld/pull/1691)).
- Accented letters stay in project URLs and in the names of downloaded files ([#1690](https://github.com/bobbyquantum/inkweld/pull/1690), [#1691](https://github.com/bobbyquantum/inkweld/pull/1691)).
- Projects created on another device show up on the home page without a reload ([#1671](https://github.com/bobbyquantum/inkweld/pull/1671)).

There are a few new things too, despite what I said about the betas:

- When an update is ready, Inkweld now tells you which version it is and what’s in it ([#1680](https://github.com/bobbyquantum/inkweld/pull/1680)).
- Over MCP, assistants can read and edit one section of a document rather than all of it ([#1693](https://github.com/bobbyquantum/inkweld/pull/1693), [#1694](https://github.com/bobbyquantum/inkweld/pull/1694)), and can create, edit and delete worldbuilding schemas ([#1677](https://github.com/bobbyquantum/inkweld/pull/1677)).

The [release notes](https://github.com/bobbyquantum/inkweld/releases) have the full list.

You can try it at [inkweld.app](https://inkweld.app), or run it yourself with Docker (`ghcr.io/bobbyquantum/inkweld:beta`). If something breaks, please [open an issue](https://github.com/bobbyquantum/inkweld/issues).
