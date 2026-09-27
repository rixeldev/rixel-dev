---
author: Rikelvi Capellán
category: Rendimiento
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1280&h=720&fit=crop&q=80
description: Una checklist práctica y actualizada para mejorar las Core Web Vitals, desde medir lo correcto hasta los arreglos que de verdad mueven LCP, INP y CLS.
lang: es
pageTitle: rendimiento-web-core-web-vitals
tags:
    - rendimiento
    - core web vitals
    - seo
    - astro
    - web
timestamp: 12/Sep/2026
title: "Core Web Vitals en 2026: una checklist práctica de rendimiento"
translationKey: web-performance
---

Las Core Web Vitals siguen siendo lo más parecido que tenemos a una definición compartida de "este sitio se siente rápido". Influyen en el posicionamiento, en la conversión y —lo más importante— describen lo que viven los usuarios reales. La buena noticia es que la mayoría de los sitios puede ganar mucho con unos pocos arreglos concretos.

## Las tres métricas que importan

- **LCP (Largest Contentful Paint):** cuánto tarda en verse el contenido principal. Casi siempre una imagen o un encabezado.
- **INP (Interaction to Next Paint):** qué tan responsiva se siente la página tras un toque o clic. Reemplazó a FID y es mucho más difícil de falsear.
- **CLS (Cumulative Layout Shift):** cuánto salta el diseño mientras carga.

## Mide antes de optimizar

No puedes mejorar lo que no mides. En orden de utilidad:

1. **Datos de campo** (Chrome UX Report, Vercel Speed Insights o tu propio RUM). Son los que usan los buscadores.
2. **Datos de laboratorio** (Lighthouse, PageSpeed Insights) para reproducir problemas.
3. **El panel Performance** para encontrar la tarea larga concreta detrás de un mal INP.

Si el campo y el laboratorio no coinciden, confía en el campo. Los dispositivos de tus usuarios son más lentos que tu portátil.

## Arreglos de mayor impacto

### Imágenes

- Sirve AVIF o WebP con dimensiones sensatas. Nunca envíes una imagen de 3000px a un hueco de 400px.
- Define siempre `width` y `height` (o una relación de aspecto) para evitar CLS.
- Precarga la imagen principal y carga en diferido todo lo que esté por debajo del pliegue.
- Añade `fetchpriority="high"` a la única imagen más importante.

### JavaScript

- Envía menos. Cada kilobyte de JS es parseo, ejecución y memoria en un teléfono de gama media.
- Prefiere HTML y CSS para lo que no necesita interactividad. En Astro, las islas hacen que esto sea lo normal.
- Divide las tareas largas para que la entrada se atienda entre ellas. `scheduler.yield()` y pequeñas pausas con `setTimeout` ayudan al INP.

### Fuentes y CSS

- Usa `font-display: swap` y `preconnect` a los orígenes de fuentes.
- Evita el reflujo por intercambio de fuentes ajustando las métricas de la fuente de reserva.
- Mantén el CSS crítico pequeño; deja que el resto cargue sin bloquear.

## Una nota sobre el framework

Astro es una gran opción por defecto para sitios con mucho contenido porque envía cero JavaScript de base y solo hidrata los componentes que lo necesitan. Eso solo ya elimina una causa común de mal INP. Combinado con imágenes en diferido, eliminas la mayoría de los problemas de LCP y CLS.

## Una checklist simple

- [ ] Se recogen datos de campo y se monitorean en el tiempo.
- [ ] La imagen principal está optimizada, dimensionada y priorizada.
- [ ] Cada imagen tiene dimensiones explícitas.
- [ ] No hay saltos de diseño por anuncios, banners o contenido inyectado.
- [ ] El presupuesto de JavaScript es pequeño y se revisa.
- [ ] Las tareas largas están divididas.
- [ ] Las fuentes no provocan reflujo visible.

El rendimiento no es un proyecto de una sola vez. Es un presupuesto que defiendes con cada funcionalidad que publicas. Empieza por la peor métrica, arregla el mayor contribuyente y vuelve a medir.
