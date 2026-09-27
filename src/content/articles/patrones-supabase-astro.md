---
author: Rikelvi Capellán
category: Desarrollo
cover: https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1280&h=720&fit=crop&q=80
description: Patrones pragmáticos de Astro y Supabase para productos pequeños, desde mantener los secretos solo en el servidor hasta estructurar el acceso a datos y el almacenamiento.
lang: es
pageTitle: patrones-supabase-astro
tags:
    - astro
    - supabase
    - postgres
    - arquitectura
    - web
timestamp: 24/Aug/2026
title: "Astro + Supabase: patrones pragmáticos para productos pequeños"
translationKey: supabase-astro
---

Astro y Supabase forman una pareja muy productiva para productos pequeños: Astro se encarga del renderizado y las rutas, y Supabase te da Postgres, autenticación y almacenamiento tras una API amable. La trampa es tratar a Supabase como un reemplazo directo de un backend y dejar que se filtre por todas partes. Unos pocos patrones mantienen el código limpio y seguro.

## Mantén el cliente en el servidor

Si tu app de Astro necesita acceso privilegiado, crea el cliente de Supabase en el servidor y nunca envíes la clave de servicio al navegador. Un singleton en un módulo basta:

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

El rol de servicio omite las políticas de seguridad a nivel de fila, así que solo pertenece al código del servidor: rutas de API, endpoints y los servicios que estas llaman.

## Pon el acceso a datos detrás de una capa de servicios

No repartas llamadas `.from("tabla")` por las páginas. Envuélvelas en un módulo `services/` con funciones nombradas según su intención: `findGalleryByPin`, `listGalleryPhotos`, `saveGallerySelections`. Así las páginas y las rutas de API se leen como el dominio, no como SQL.

Esto te da además un único lugar para añadir caché, validación o cambiar una consulta sin recorrer todo el código.

## Decide con cuidado qué sale del servidor

Devuelve solo los campos que el cliente necesita. Cuando una fila contiene algo sensible —un hash de PIN, un flag interno—, elimínalo antes de enviarlo:

```ts
const { pin_hash, ...safe } = gallery
return safe
```

Asume que todo lo que devuelves desde una ruta de API es público.

## Las URLs de Storage son baratas y sin estado

Las URLs públicas de Supabase Storage son deterministas: con un bucket y una ruta puedes construir la URL. Eso significa que puedes guardar solo el `storage_path` en la base de datos y resolver `public_url` al leer, lo que mantiene las filas pequeñas y te permite mover buckets después.

## Protege el contenido con una verificación en el servidor, no con ocultamiento

Para galerías protegidas con PIN, el flujo es: el cliente envía el PIN, el servidor lo hashea y busca la galería, y solo entonces devuelve las fotos. La base de datos nunca guarda el PIN en claro, solo un hash HMAC-SHA256. Nunca confíes únicamente en una URL difícil de adivinar.

## Gestiona los errores donde puedas actuar

Captura en el límite (la ruta de API), registra el error real en el servidor y devuelve al cliente un mensaje corto y genérico. Los usuarios no necesitan el stack trace; tú sí.

## Migraciones

En un proyecto de Astro pequeño no hay un gestor de migraciones, y está bien. Mantén los cambios de esquema en SQL, aplícalos en tu proyecto de Supabase y deja el esquema documentado en el repositorio. Lo importante es que el esquema esté versionado en algún sitio, aunque no lo imponga una herramienta.

## La conclusión

Supabase es potente justamente porque colapsa mucho backend en un solo servicio. Mantén ese poder en el servidor, escóndelo detrás de una capa de servicios y devuelve solo lo que el cliente necesita. El resultado es un producto pequeño que sigue siendo fácil de razonar a medida que crece.
