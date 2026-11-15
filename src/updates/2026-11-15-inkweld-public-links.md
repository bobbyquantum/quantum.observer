---
title: Inkweld 1.0.0-beta.5 to beta.7, and public links
slug: 2026-11-15-inkweld-public-links
date: 2026-11-15
tag: Inkweld
summary: You can share a project with a public link now, and people can read it without an account. Also, if you self-host, please upgrade.
---

I didn’t get round to posting about beta.5 or beta.6, so this one covers three: [beta.5](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.5), [beta.6](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.6) and [beta.7](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.7).

If you run your own server, please upgrade. beta.5 fixed seven security issues in sync, sign-in and accounts, six of them rated high ([#1723](https://github.com/bobbyquantum/inkweld/pull/1723)). I’ve posted [advisories](https://github.com/bobbyquantum/inkweld/security/advisories) for all of them, if you want the details.

The fun bit is public links. [pixo2000](https://github.com/pixo2000)’s second pull request went in, and it adds a live, read-only public view of a project ([#1735](https://github.com/bobbyquantum/inkweld/pull/1735)). Thank you again! Switch on **Public access** in the project’s settings, copy the link, and anyone can read it without signing up. They get all of it, worldbuilding, canvases, timelines and so on, but can’t change anything, and it keeps up as you write.

Since beta.7, comments and the activity feed stay hidden from a public link unless you turn them on ([#1750](https://github.com/bobbyquantum/inkweld/pull/1750)).

The [release notes](https://github.com/bobbyquantum/inkweld/releases) have everything else. You can try it at [inkweld.app](https://inkweld.app), or run it yourself with Docker (`ghcr.io/bobbyquantum/inkweld:beta`). If something breaks, please [open an issue](https://github.com/bobbyquantum/inkweld/issues).
