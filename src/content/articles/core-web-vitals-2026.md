---
author: Rikelvi Capellán
category: Performance
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1280&h=720&fit=crop&q=80
description: A practical, up-to-date checklist for improving Core Web Vitals, from measuring the right things to the fixes that actually move LCP, INP, and CLS.
lang: en
pageTitle: core-web-vitals-2026
tags:
    - performance
    - core web vitals
    - seo
    - astro
    - web
timestamp: 12/Sep/2026
title: "Core Web Vitals in 2026: a practical performance checklist"
translationKey: web-performance
---

Core Web Vitals are still the closest thing we have to a shared definition of "this site feels fast." They influence search ranking, they influence conversion, and — most importantly — they describe what real users experience. The good news is that most sites can make large gains with a small number of targeted fixes.

## The three metrics that matter

- **LCP (Largest Contentful Paint):** how long until the main content is visible. Almost always an image or a heading.
- **INP (Interaction to Next Paint):** how responsive the page feels after a tap or click. It replaced FID and is much harder to game.
- **CLS (Cumulative Layout Shift):** how much the layout jumps while loading.

## Measure before you optimize

You cannot improve what you do not measure. In order of usefulness:

1. **Field data** (Chrome UX Report, Vercel Speed Insights, or your own RUM). This is what search engines use.
2. **Lab data** (Lighthouse, PageSpeed Insights) for reproducing issues.
3. **The Performance panel** for finding the specific long task behind a bad INP.

If field and lab disagree, trust the field. Your users' devices are slower than your laptop.

## Highest-leverage fixes

### Images

- Serve AVIF or WebP with sensible dimensions. Never ship a 3000px image into a 400px slot.
- Always set `width` and `height` (or an aspect ratio) to prevent CLS.
- Preload the hero image and lazy-load everything below the fold.
- Add `fetchpriority="high"` to the single most important image.

### JavaScript

- Ship less. Every kilobyte of JS is parsing, execution, and memory on a mid-range phone.
- Prefer HTML and CSS for things that do not need interactivity. On Astro, islands make this the default.
- Break up long tasks so input can be handled between them. `scheduler.yield()` and small `setTimeout` breaks help INP.

### Fonts and CSS

- Use `font-display: swap` and preconnect to font origins.
- Avoid layout-affecting font swaps by matching fallback metrics.
- Keep critical CSS small; let the rest load without blocking.

## A framework note

Astro is a strong default for content-heavy sites because it ships zero JavaScript by default and only hydrates the components that need it. That alone removes a common source of bad INP. Pair it with lazy-loaded images and you eliminate most LCP and CLS problems.

## A simple checklist

- [ ] Field data is collected and monitored over time.
- [ ] Hero image is optimized, sized, and prioritized.
- [ ] Every image has explicit dimensions.
- [ ] No layout shift from ads, banners, or injected content.
- [ ] JavaScript budget is small and reviewed.
- [ ] Long tasks are broken up.
- [ ] Fonts do not cause visible reflow.

Performance is not a one-time project. It is a budget you defend with every feature you ship. Start with the metric that is worst, fix the biggest contributor, and re-measure.
