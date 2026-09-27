---
author: Rikelvi Capellán
category: Ingeniería
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=720&fit=crop&q=80
description: Cómo uso asistentes de IA para programar sin sacrificar la calidad del código, la arquitectura ni mi propio entendimiento de los sistemas que construyo.
lang: es
pageTitle: desarrollo-asistido-por-ia
tags:
    - ia
    - herramientas
    - productividad
    - ingeniería
    - flujo de trabajo
timestamp: 20/Sep/2026
title: "Desarrollo asistido por IA: avanzar rápido sin perder oficio"
translationKey: ai-assisted-development
---

Los asistentes de IA pasaron de ser una curiosidad a formar parte de mi flujo de trabajo diario. Bien usados, eliminan las partes aburridas del software y dejan más espacio para lo que de verdad requiere a una persona: entender el problema, tomar decisiones y hacerse responsable del resultado. Mal usados, generan código que parece correcto, que nadie entiende y que sale carísimo de mantener.

Así intento mantenerme del lado correcto de esa línea.

## En qué son realmente buenos

- **Código repetitivo con forma predecible.** Crear una ruta, un esquema o un componente que sigue un patrón existente.
- **Refactors aburridos.** Renombrar, extraer una función auxiliar o mover lógica sin cambiar el comportamiento.
- **Primeras versiones de tests.** Rara vez escriben el test que *deberías* escribir, pero esbozan los casos obvios muy rápido.
- **Explicar código desconocido.** Preguntar "¿qué garantiza realmente esta función?" es un gran uso de un modelo.
- **Depurar en voz alta.** Describir un bug a un modelo suele revelar la causa real antes de que responda.

## Dónde fallan consistentemente

- **Arquitectura.** Un modelo añade con gusto una dependencia o una abstracción donde bastaba una función simple. Optimiza para el siguiente token, no para los próximos dos años.
- **Código sensible en seguridad.** Autenticación, sesiones y todo lo que toque secretos necesitan revisión humana línea por línea.
- **Bugs sutiles de estado.** Las condiciones de carrera y los *closures* obsoletos son justo donde el código generado se ve limpio y se comporta mal.
- **Todo lo sensible a versiones.** Las APIs cambian. Una respuesta segura puede estar un año desactualizada.

## Un flujo que mantiene la calidad alta

1. **Diseña primero, pide después.** Si no puedo describir la interfaz y el flujo de datos, ningún prompt me salva. Esbozo la forma antes de generar nada.
2. **Diffs pequeños.** Una funcionalidad o un refactor a la vez. Los diffs grandes esconden errores.
3. **Ejecuta siempre el build.** En este sitio, `pnpm build` corre `astro check` y una compilación completa. Si no pasa, el cambio no está listo.
4. **Lee cada línea que conserves.** Si no puedo explicar una línea en revisión, no se fusiona.
5. **Escribe los tests que importan.** Deja que el modelo arme el andamiaje; tú decides las aserciones que codifican la intención.

## Barreras que me protegen

- TypeScript en modo estricto atrapa los errores de "parece correcto" típicos de los modelos.
- Módulos pequeños y con una sola responsabilidad hacen que el código generado sea fácil de reemplazar.
- Nombrar según la intención (`resolvePhotoPublicUrl`, no `helper`) obliga a que un cambio generado respete esa intención.
- Un historial de git limpio permite revertir una mala sugerencia en segundos.

## El intercambio honesto

La IA me hace más rápido en las partes mecánicas del trabajo y más lento para confiar en las que son juicio puro. El oficio no desapareció: se movió. El valor de un desarrollador está cada vez más en elegir el problema correcto, acotar la solución y verificar que de verdad funcione.

Trata al asistente como a un ingeniero junior muy rápido que lo ha leído todo y no recuerda nada de tu proyecto. Revísalo en consecuencia.
