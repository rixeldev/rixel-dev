---
author: Rikelvi Capellán
category: Product
cover: /articles/covers/publicar-una-app-en-google-play.png
description: "Lo que aprendí publicando dos apps Android independientes en Google Play: versionado, pistas de lanzamiento, recursos de la ficha de la tienda y las partes del proceso que nadie te advierte."
lang: es
pageTitle: publicar-una-app-en-google-play
tags:
    - android
    - google play
    - release
    - product
    - react native
timestamp: 9/Oct/2026
title: "Publicar una app Android en Google Play: lo que aprendí publicando dos"
translationKey: building-a-google-play-app
---

Stop Trivia y Setuno son dos apps distintas con audiencias distintas, y recorrieron caminos muy diferentes para llegar a Google Play. Algunas lecciones fueron sobre la app. La mayoría fueron sobre el proceso alrededor de ella.

## El número de versión es marketing

El número de versión es lo primero que lee un usuario en la ficha de la tienda. `4.3.0` le dice a alguien que la app está viva y se mantiene. `1.0.0` le dice que espere bordes irregulares.

Publica pronto con `1.0.0`, pero no te quedes ahí. Cada lanzamiento que solo sube el parche es una oportunidad desperdiciada de recordar que la app existe. Una versión menor debería significar algo nuevo; una mayor, algo que cambie la forma de usar la app.

## Las pistas de lanzamiento son la estrategia de publicación

Los canales de Google Play son más que una red de seguridad:

- **Pruebas internas** — rápidas, hasta 100 testers, perfectas para un build que necesita un smoke test.
- **Pruebas cerradas** — una pista con usuarios reales que te da un despliegue por porcentaje.
- **Pruebas abiertas** — pública, con porcentajes escalonados para un lanzamiento cuidadoso.

El patrón práctico: publica en interno, luego a una pista cerrada, y luego despliega a producción por etapas vigilando las sesiones sin fallos. Si un build se hunde, detienes el despliegue en lugar de retirarlo.

## La ficha de la tienda es una superficie de diseño

El gráfico de funciones y las capturas no son decoración. Son la primera impresión, y deciden la tasa de instalación.

Unas reglas que sigo:

- **Muestra el producto trabajando**, no un logo sobre un gradiente. Una captura de la interfaz real vende mejor que cualquier key art.
- **Localízalas.** Stop Trivia se publica en inglés, español, francés y portugués, y las capturas en español no son una traducción de las inglesas — se rehicieron con la interfaz en español.
- **Empieza por el recurso más ancho.** Un feature graphic de 1024x500 te da un banner en la tienda; un set de capturas 16:9 es lo que llena la galería.
- **Mantén la promesa honesta.** Si la ficha dice "funciona sin conexión", la app tiene que funcionar sin conexión en el primer arranque, sin pedir cuenta.

## Los metadatos de la tienda son una landing page

La descripción de la ficha la indexa Google. Vale la pena escribirla como una landing page, con las palabras reales que la gente busca, no relleno de marketing.

En la descripción de Setuno, la frase que trajo más instalaciones orgánicas fue "acordes sobre la letra" — simple, específica y exactamente lo que hace la app. El tagline que más me gustaba.convertía peor.

## Las partes de las que nadie te avisa

- **Formularios de datos seguros.** Google pregunta qué recoges y a dónde va. Responde con precisión o la app se queda en "requiere atención" para siempre.
- **Clasificación por contenido.** Pregunta por violencia, lenguaje y mecánicas parecidas al juego de azar. Responde temprano; no puedes publicar sin eso.
- **Icono y splash.** Tienen que sobrevivir a un tamaño pequeño e irreconocible. Prueba el icono a 48px.
- **La URL de la política de privacidad.** Tiene que ser una página real que mencione la app por nombre. Una política genérica del sitio es rechazada.

## Dos apps, dos manuales

Stop Trivia es un juego: necesita arte, actualizaciones frecuentes, un sistema de clasificación y moderación. Sus lanzamientos son pequeños y constantes, así que el tren de versiones importa más que cualquier lanzamiento individual.

Setuno es una herramienta de productividad para bandas: necesita confianza, una historia de privacidad clara y un onboarding de baja fuga. Sus lanzamientos son más raros, y la ficha de la tienda hace más del trabajo de venta.

Trátalas como productos distintos con definiciones distintas de éxito, aunque compartan base de código y desarrollador.
