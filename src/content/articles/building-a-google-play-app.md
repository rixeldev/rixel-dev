---
author: Rikelvi Capellán
category: Product
cover: /articles/covers/building-a-google-play-app.png
description: "What I learned shipping two independent Android apps to Google Play: versioning, release tracks, store listing assets, and the parts of the process nobody warns you about."
lang: en
pageTitle: building-a-google-play-app
tags:
    - android
    - google play
    - release
    - product
    - react native
timestamp: 9/Oct/2026
title: "Shipping an Android app to Google Play: what I learned shipping two of them"
translationKey: building-a-google-play-app
---

Stop Trivia and Setuno are two different apps with two different audiences, and they went through very different paths to get on Google Play. Some lessons were about the app. Most were about the process around it.

## Version numbers are marketing

The version number is the first thing a user reads on the store listing. `4.3.0` tells someone the app is alive and maintained. `1.0.0` tells them to expect rough edges.

Ship early with `1.0.0`, but do not sit on it. Every release that only bumps the patch number is a wasted opportunity to remind people the app exists. A minor bump should mean something new; a major bump should mean something that changes how you use the app.

## Release tracks are the release strategy

Google Play's release channels are more than a safety net:

- **Internal testing** — fast, up to 100 testers, perfect for a build that needs smoke testing.
- **Closed testing** — a track with real users that gives you a percentage rollout.
- **Open testing** — public, with staged percentages for a cautious launch.

The practical pattern: ship to internal, then to a closed track, then roll out to production in stages while watching crash-free sessions. If a build tanks, you stop the rollout instead of pulling it.

## The store listing is a design surface

The feature graphic and the screenshots are not decoration. They are the first impression, and they decide the install rate.

A few rules I follow:

- **Show the product doing its job**, not a logo on a gradient. A screenshot of the actual interface sells better than any key art.
- **Localize them.** Stop Trivia ships in English, Spanish, French and Portuguese, and the Spanish screenshots are not a translation of the English ones — they were re-shot with the Spanish UI.
- **Lead with the widest asset.** A 1024x500 feature graphic gives you a banner in the store; a 16:9 screenshot set is what fills the gallery.
- **Keep the promise honest.** If the listing says "works offline", the app has to work offline on the first launch, with no account required.

## Store metadata is a landing page

The listing description is indexed by Google. It is worth writing like a landing page, with the actual words people search for, not marketing filler.

On the description for Setuno, the phrase that brought the most organic installs was "chords over the lyrics" — plain, specific, and exactly what the app does. The tagline I liked more converted worse.

## The parts nobody warns you about

- **Data safety forms.** Google asks about what you collect and where it goes. Answer it precisely or the app stays in "needs attention" forever.
- **Content rating.** It asks about violence, language, and gambling-adjacent mechanics. Answer it early; you cannot ship without it.
- **Icon and splash assets.** They need to survive a small, unrecognizable size. Test the icon at 48px.
- **The privacy policy URL.** It has to be a real page that mentions the app by name. A generic site-level policy gets rejected.

## Two apps, two playbooks

Stop Trivia is a game: it needs art, frequent updates, a ranking system and moderation. Its releases are small and constant, so the release train matters more than any single launch.

Setuno is a productivity tool for bands: it needs trust, a clear privacy story and a low-churn onboarding. Its releases are rarer, and the store listing does more of the selling.

Treat them as different products with different definitions of success, even though they share a codebase and a developer.
