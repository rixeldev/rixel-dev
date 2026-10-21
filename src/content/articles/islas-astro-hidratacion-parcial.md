---
author: Rikelvi Capellán
category: Web development
cover: /articles/covers/islas-astro-hidratacion-parcial.png
description: "Una guía práctica de las islas de Astro: cuándo una página necesita JavaScript, cuándo no, y cómo mantener pequeñas las partes interactivas de un sitio de contenido para que se sienta instantáneo."
lang: es
pageTitle: islas-astro-hidratacion-parcial
tags:
    - astro
    - javascript
    - performance
    - desarrollo web
    - architecture
timestamp: 14/Oct/2026
title: "Islas de Astro: la guía práctica de la hidratación parcial"
translationKey: astro-islands-partial-hydration
---

El JavaScript más rápido es el que nunca envías. La arquitectura de islas de Astro es una idea simple con muchas consecuencias: la página es HTML por defecto, y el JavaScript se activa componente por componente.

Este post es sobre la parte que nadie documenta bien — decidir qué debería ser una isla desde el principio.

## El valor por defecto es estático

Si un componente renderiza lo mismo para todas las visitas, no debería ser una isla. Artículos, portafolios, documentación, páginas de marketing: todo HTML estático, todo con cero JavaScript.

El momento en que agregas `client:load` a algo, lo pagas tres veces:

- el bundle de JavaScript hay que descargarlo, parsearlo y ejecutarlo;
- el contenido se desplaza cuando la isla hidrata y el layout se asienta;
- todo eso pasa a ser candidato a errores de latencia de interacción.

## Las cuatro directivas de hidratación

| Directiva | Cuándo se ejecuta | Úsala para |
| --- | --- | --- |
| `client:load` | Inmediatamente | Widgets que deben ser interactivos en el primer pintado |
| `client:idle` | Cuando el navegador está libre | Todo lo que está bajo el pliegue, todo lo no urgente |
| `client:visible` | Cuando entra en el viewport | Componentes pesados muy abajo en la página |
| `client:media` | Cuando coincide una media query | Funciones solo de móvil o solo de escritorio |

El error que más veo es usar `client:load` por costumbre. Casi todas esas islas solo necesitan ser interactivas cuando el usuario llega hasta ellas, lo cual es `client:visible` o `client:idle`.

## Un ejemplo real

En este sitio, el índice de artículos tiene un buscador y filtros por etiqueta. Eso es una isla, y tiene que ser interactiva de inmediato, así que `client:load` es lo correcto.

Todo lo demás — cada tarjeta de artículo, cada etiqueta renderizada en el servidor, todo el cuerpo del artículo — es HTML estático. Los botones de filtro que ya están en el DOM funcionan sin hidratar; la isla solo adjunta el comportamiento.

Las páginas de las apps son un mejor caso de contención. La tira de capturas es un scroller horizontal. `overflow-x: auto` y `scroll-snap` en CSS ya lo hacen perfectamente. Agregar JavaScript para moverlo sería un error.

## Las islas necesitan límites

Una isla es un componente con una frontera de props serializables. Eso significa:

- las props deben ser serializables — nada de funciones, instancias de clases ni clientes de base de datos;
- los hijos de la isla son HTML renderizado en el servidor que hidrata a un árbol de React;
- el CSS debe estar aislado para que la isla no filtre estilos hacia la página, ni al revés.

La frontera de serialización es la que muerde. Si necesitas pasarle un callback a una isla, ya la diseñaste mal. La isla debe recibir datos, no comportamiento.

## Medir si funcionó

No adivines. Revisa el JavaScript transferido por página:

```bash
npx lighthouse https://rixel.dev/articles/ --view
```

Quieres que el total de JS se mantenga pequeño en las páginas de contenido. Si agregar un widget interactivo cuesta 120 kB de framework, es un mal negocio para un filtro.

## Una regla práctica

Pregunta: *¿la próxima acción del usuario requiere JavaScript?*

- Si sí, y está sobre el pliegue, hazlo una isla con `client:load`.
- Si sí, y está bajo el pliegue, usa `client:visible`.
- Si no, envía HTML y CSS y listo.

Esa sola pregunta elimina la mayoría de las islas que la gente agrega "por si acaso", y hace que las páginas que quedan sean rápidas por defecto.
