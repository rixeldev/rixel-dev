# AGENTS.md

Rixel.dev: Astro 5 portfolio/blog + PIN-gated client photo-gallery app. SSR on Vercel, React islands, Tailwind, Supabase (service role), Resend email.

## Commands

- Package manager is pinned `pnpm@9.15.0`. Install: `pnpm install`.
- Dev: `pnpm dev` → http://localhost:4321
- Build: `pnpm build` = `astro check && astro build`. `pnpm check` runs `astro check` alone. No lint or test suite.
- **Windows gotcha:** `pnpm build` type-checks, compiles, and prerenders successfully, then fails in the `@astrojs/vercel` `astro:build:done` hook with `EPERM ... symlink` unless symlink creation is permitted (Windows Developer Mode / admin). Local verification: `pnpm check` (expect 0 errors). Full build works on Linux/CI.
- `pnpm preview`; `pnpm astro ...` for Astro CLI.
- Formatting: `pnpm format` / `pnpm format:check` (Prettier, `.prettierrc.mjs`): tabs, no semicolons, double quotes, `printWidth: 100`, Astro + Tailwind + organize-imports plugins. ESLint deps exist but there is no ESLint config or script.

## Environment / secrets

- `astro.config.mjs` runs `dotenv.config()` then hardcodes each variable into `import.meta.env.*` via Vite `define`. When adding a variable you must update **all three**: `.env`, the `vite.define` block, and `src/env.d.ts`.
- Required: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`, `PIN_HASH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. `.env` is gitignored; `.env.demo` is incomplete.
- Because of `define`, server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `PIN_HASH_SECRET`, …) are inlined into the bundle. Never reference them from client/React components.

## Architecture

- `output: "server"` + Vercel adapter: everything is SSR except `src/pages/articles/[id].astro`, which sets `export const prerender = true`. Sitemap is an API route (`src/pages/sitemap.xml.ts`).
- API routes live in `src/pages/api/**`. Gallery endpoints are PIN-gated (`src/services/galleries.ts`); admin endpoints require `getAdminSession(request)` (`src/libs/adminSession.ts`, JWT in cookie `admin_session`, 12h). Admin UI is `/admin` (React `AdminDashboard`, `client:load`).
- Supabase service-role client is a module singleton (`src/libs/supabase.ts`). Tables: `galleries`, `gallery_photos`, `photo_selections`; storage bucket = `SUPABASE_STORAGE_BUCKET` (default `photos`). No migrations/seed in repo — the schema lives externally. Gallery PINs are stored as HMAC-SHA256 hashes (`src/libs/pin.ts`).
- `src/libs/getImageSizes.ts` reads photo files from `public/` (e.g. `public/portraits`) off disk at runtime with `fs` + `image-size`. Adding files while the dev server runs may need a restart/rebuild.
- Content collection `articles`: markdown in `src/content/articles`, schema in `src/content/config.ts`. The route param is the file slug, but the public URL segment comes from frontmatter `pageTitle` (see `src/libs/articlesSeo.ts`) — keep them consistent. `translationKey` links an EN/ES pair (surfaced as a language link on the article page); `featured: true` pins an article at the top of `/articles`.
- SEO: `src/components/SEO.astro` renders global Person/WebSite JSON-LD (`src/libs/structuredData.ts`) and accepts `type`, `noindex`, `publishedTime`. Article pages add `BlogPosting` + `BreadcrumbList` via `src/libs/articlesSeo.ts`. RSS is `/rss.xml` (`src/pages/rss.xml.ts`, prerendered); sitemap is `src/pages/sitemap.xml.ts`.

## i18n

- Locale is **not** in the URL. Astro i18n is configured (`en` default, no prefix) but there are no `src/pages/[locale]` or `src/pages/es` dirs; `getActiveLocale` resolves from the `lang` cookie, then `Accept-Language`. `resolveLocalizedPath` strips any locale prefix, so paths stay unprefixed.
- Add copy to both `src/locales/en.json` and `es.json`. `getI18N` merges Spanish over English, so Spanish can override English keys. Use `i18n.*`; pass `locale` into React islands.

## Conventions

- Import with the `@/*` alias → `src/*` (see `tsconfig.json` paths).
- Reuse Tailwind tokens from `tailwind.config.mjs`: `primary`, `secondary`, `accent`, `main`, `success`, `warning`, `glass`, font `ubuntu`. Avoid arbitrary color values.
- Client globals: `window.toast(...)` (butterup, `src/libs/toast.ts`, mounted via `Toast.astro`) and `window.getThemePreference()`. DOM helpers `$` / `$$` in `src/libs/dom-selector.ts`.
- Astro components are the default; React is only for interactive islands via `client:load`.
- `.agents/skills/**/SKILL.md` contains repo-pinned domain guidance (astro, react, tailwind, supabase, seo, accessibility, deploy-to-vercel). Consult the relevant skill before large changes.
