---
title: Inkweld 1.0.0-beta.8 and beta.9
slug: 2026-11-22-inkweld-1-0-0-beta-8-and-9
date: 2026-11-22
tag: Inkweld
summary: Security and sync fixes. If you self-host, please upgrade, especially if you run on Cloudflare Workers.
---

Two releases this week, [beta.8](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.8) and [beta.9](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.9), and both are fixes.

If you run your own server, please upgrade to beta.9. It tightens up a few things ([#1778](https://github.com/bobbyquantum/inkweld/pull/1778)):

- Open sync connections now close when an account's password is changed, or it's disabled or deleted, and every connection re-checks its session every five minutes. Before, a revoked sign-in could keep syncing on a connection that was already open.
- Rate limits now work on Cloudflare Workers. They used to be kept in memory, which on Workers meant they barely applied, so now they're shared through the database. AI generation and collaborator invites are also limited per account, and password-reset and passkey-recovery emails go out at most once a minute.
- Private project covers are protected, and apps signing in over OAuth can only send you back to an address that's allowed.

Sync got two fixes too:

- Edits no longer stop syncing after the server wakes up from being idle ([#1769](https://github.com/bobbyquantum/inkweld/pull/1769)).
- If a cloud folder has been synced by a newer version of Inkweld, an older version now pauses and asks you to update, instead of syncing and possibly deleting what the newer one wrote. Your changes stay on your device until you update ([#1777](https://github.com/bobbyquantum/inkweld/pull/1777)).

And from beta.8:

- Relationship fields set over MCP now create the relationship and its backlink ([#1763](https://github.com/bobbyquantum/inkweld/pull/1763)).
- Parents set in a character's Family section now list that character under their Children. Thanks to [suminksudhi](https://github.com/suminksudhi) for reporting it ([#1766](https://github.com/bobbyquantum/inkweld/pull/1766)).

The [release notes](https://github.com/bobbyquantum/inkweld/releases) have everything else. You can try it at [inkweld.app](https://inkweld.app), or run it yourself with Docker (`ghcr.io/bobbyquantum/inkweld:beta`). If something breaks, please [open an issue](https://github.com/bobbyquantum/inkweld/issues).
