---
author: Rikelvi Capellán
category: Development
cover: https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1280&h=720&fit=crop&q=80
description: Pragmatic Astro and Supabase patterns for small products, from keeping secrets server-only to structuring data access and storage.
lang: en
pageTitle: supabase-astro-patterns
tags:
    - astro
    - supabase
    - postgres
    - architecture
    - web
timestamp: 24/Aug/2026
title: "Astro + Supabase: pragmatic patterns for small products"
translationKey: supabase-astro
---

Astro and Supabase are a remarkably productive pair for small products: Astro handles rendering and routing, Supabase gives you Postgres, auth, and storage behind a friendly API. The trap is treating Supabase as a drop-in replacement for a backend and letting it leak everywhere. A few patterns keep the codebase clean and safe.

## Keep the client on the server

If your Astro app needs privileged access, create the Supabase client on the server and never ship the service role key to the browser. A module singleton is enough:

```ts
let client: SupabaseClient | null = null

export function getSupabaseService() {
	if (!client) {
		client = createClient(
			import.meta.env.SUPABASE_URL,
			import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
			{ auth: { persistSession: false, autoRefreshToken: false } }
		)
	}
	return client
}
```

The service role bypasses row-level security, so it belongs only in server code: API routes, server endpoints, and services called from them.

## Put data access behind a service layer

Do not scatter `.from("table")` calls across pages. Wrap them in a `services/` module with functions named after intent: `findGalleryByPin`, `listGalleryPhotos`, `saveGallerySelections`. Pages and API routes then read like the domain, not like SQL.

This also gives you one place to add caching, validation, or a query change without hunting through the codebase.

## Be deliberate about what leaves the server

Return only the fields the client needs. When a row contains something sensitive — a PIN hash, an internal flag — strip it before you send it:

```ts
const { pin_hash, ...safe } = gallery
return safe
```

Assume anything you return from an API route is public.

## Storage URLs are cheap and stateless

Supabase Storage public URLs are deterministic: given a bucket and a path, you can build the URL. That means you can store only the `storage_path` in the database and resolve `public_url` at read time, which keeps rows small and lets you move buckets later.

## Gate content with a server check, not obscurity

For PIN-protected galleries, the flow is: the client posts the PIN, the server hashes it and looks up the gallery, and only then returns the photos. The database never stores the raw PIN — only an HMAC-SHA256 hash. Never rely on an unguessable URL alone.

## Handle errors where you can act on them

Catch at the boundary (the API route), log the real error server-side, and return a short, generic message to the client. Users do not need stack traces; you do.

## Migrations

There is no migration runner in a small Astro project, and that is fine. Keep schema changes in SQL, apply them to your Supabase project, and keep the schema documented in the repo. The important part is that the schema is versioned somewhere, even if it is not enforced by tooling.

## The takeaway

Supabase is powerful precisely because it collapses a lot of backend into one service. Keep that power on the server, hide it behind a service layer, and return only what the client needs. The result is a small product that stays easy to reason about as it grows.
