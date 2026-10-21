---
author: Rikelvi Capellán
category: Web development
cover: /articles/covers/astro-islands-partial-hydration.png
description: "A practical guide to Astro islands: when a page needs JavaScript, when it does not, and how to keep the interactive parts of a content site small enough to feel instant."
lang: en
pageTitle: astro-islands-partial-hydration
tags:
    - astro
    - javascript
    - performance
    - web development
    - architecture
timestamp: 14/Oct/2026
title: "Astro islands: the practical guide to partial hydration"
translationKey: astro-islands-partial-hydration
---

The fastest JavaScript is the JavaScript you never send. Astro's island architecture is a simple idea with a lot of consequences: the page is HTML by default, and JavaScript is opt-in per component.

This post is about the part nobody documents well — deciding what should be an island in the first place.

## The default should be static

If a component renders the same thing for every visitor, it should not be an island. Articles, portfolios, documentation, marketing pages: all static HTML, all zero JavaScript.

The moment you add `client:load` to something, you pay for it three times:

- the JavaScript bundle has to be downloaded, parsed and executed;
- the content shifts when the island hydrates and the layout settles;
- the whole thing becomes a candidate for interaction latency bugs.

## The four hydration directives

| Directive | When it runs | Use it for |
| --- | --- | --- |
| `client:load` | Immediately | Widgets that must be interactive on first paint |
| `client:idle` | When the browser is idle | Anything below the fold, anything non-urgent |
| `client:visible` | When it enters the viewport | Heavy components far down the page |
| `client:media` | When a media query matches | Mobile-only or desktop-only features |

The mistake I see most often is using `client:load` out of habit. Most of those islands only need to be interactive when the user actually reaches them, which is `client:visible` or `client:idle`.

## A real example

On this site, the article index has a search field and tag filters. That is one island, and it needs to be interactive immediately, so `client:load` is correct.

Everything else — every article card, every tag chip rendered server-side, the whole article body — is static HTML. The filter buttons that are already in the DOM work without hydration; the island only attaches the behavior.

The app showcase pages are a better case for restraint. The screenshot strip is a horizontal scroller. CSS `overflow-x: auto` and `scroll-snap` already do that perfectly. Adding JavaScript to move it would be pointless.

## Islands need boundaries

An island is a component with a serialized props boundary. That means:

- props must be serializable — no functions, no class instances, no database clients;
- the island's children are server-rendered HTML that hydrates into a React tree;
- CSS has to be scoped so the island does not leak styles into the page, or vice versa.

The serialization boundary is the one that bites. If you need to pass a callback into an island, you have already designed it wrong. The island should receive data, not behavior.

## Measuring whether it worked

Do not guess. Check the transferred JavaScript per page:

```bash
npx lighthouse https://rixel.dev/articles/ --view
```

You want the total JS to stay small on content pages. If adding one interactive widget costs 120 kB of framework, that is a bad trade for a filter.

## A practical rule of thumb

Ask: *does the user's next action require JavaScript?*

- If yes, and it is above the fold, make it an island with `client:load`.
- If yes, and it is below the fold, use `client:visible`.
- If no, ship HTML and CSS and be done.

That single question removes most of the islands people add "just in case", and it makes the pages that remain fast by default.
