---
author: Rikelvi Capellán
category: Mobile
cover: /articles/covers/aplicaciones-android-offline-first.png
description: "Qué significa realmente el enfoque offline-first en una app React Native, cómo modelar la sincronización y las reglas de resolución de conflictos que mantienen usable una app de bandas sin señal."
lang: es
pageTitle: aplicaciones-android-offline-first
tags:
    - react native
    - offline
    - sync
    - mobile
    - architecture
timestamp: 18/Oct/2026
title: "Apps Android offline-first: sincronizar sin señal"
translationKey: offline-first-android-apps
---

Una banda ensaya en un sótano. La lista de canciones vive en un teléfono. El Wi-Fi no existe. Si tu app necesita la red para mostrar una canción, tu app está rota justo cuando más importa.

El enfoque offline-first suele venderse como una característica. En realidad es una restricción: la base de datos local es la fuente de verdad, y la red es una optimización opcional que termina poniéndose al día.

## Lo que exige realmente "offline-first"

Agregar una caché no es offline-first. Offline-first significa que la app es completamente usable sin red, y que la red solo agrega capacidades.

Eso impone requisitos concretos:

1. **Toda lectura viene del almacenamiento local.** Ningún componente consulta la API directamente.
2. **Toda escritura se guarda primero localmente.** El usuario ve el cambio de inmediato, siempre.
3. **La sincronización es un asunto de fondo.** Corre, reintenta y nunca bloquea la interfaz.
4. **La resolución de conflictos se define antes de la primera sincronización.** No después de que los usuarios reporten pérdida de datos.

## El modelo de datos lo decide todo

En Setuno, las canciones pertenecen a la banda. Una canción tiene `version`, `updatedAt` y `updatedBy`. localmente cada fila lleva una marca `dirty` y el id del dispositivo que la modificó por última vez.

La regla es simple: **la escritura más reciente gana por campo, y el servidor es el desempate.** Si dos dispositivos editan la misma canción sin conexión, sobrevive la que tenga el `updatedAt` más reciente, y el otro dispositivo recibe la copia del servidor en su próxima sincronización.

Esto es deliberadamente aburrido. Un CRDT manejaría más casos, pero una app de bandas no es un editor colaborativo de documentos, y esa complejidad costaría más de lo que aporta.

## El bucle de sincronización

```ts
type SyncResult = { pushed: string[]; pulled: string[]; failed: string[] }

async function syncBand(bandId: string): Promise<SyncResult> {
	const pending = await local.dirtyRows(bandId)
	const pushed: string[] = []
	const failed: string[] = []

	for (const row of pending) {
		try {
			await remote.upsert(row)
			await local.markClean(row.id)
			pushed.push(row.id)
		} catch (error) {
			failed.push(row.id)
		}
	}

	const cursor = await local.getCursor(bandId)
	const changes = await remote.changesSince(bandId, cursor)

	for (const change of changes) {
		await local.applyServerCopy(change)
	}

	await local.setCursor(bandId, changes.cursor)
	return { pushed, pulled: changes.ids, failed }
}
```

El detalle importante es que `applyServerCopy` se niega a sobrescribir una fila que localmente está sucia. Si el usuario cambió una canción en un avión y el servidor tiene otra versión, la edición local gana hasta que pueda subirse.

## Los fallos que vas a encontrar

- **Un dispositivo que nunca sincroniza.** Los usuarios cambian su PIN o desinstalan la app a mitad de la cola. Hay que manejar con elegancia el caso "desinstalado antes de subir".
- **Desfase de reloj.** Dos dispositivos con relojes equivocados pueden producir un orden invertido. Compara `updatedAt` contra el reloj del servidor, no contra el del dispositivo.
- **Escrituras parciales.** El usuario edita una canción y la app muere. Persiste al salir del campo, no al guardar.
- **Límites de almacenamiento.** Android puede borrar los datos de la app bajo presión. Mantén una caché pequeña de "abiertos recientemente" fuera de la base de datos y trata la base como reconstruible desde el servidor.

## La parte visible para el usuario

Nada de esto debería verse. El indicador de estado responde exactamente una pregunta: *¿mi trabajo ya está a salvo?*

```
● Sincronizado · ahora mismo
● Sincronizando 3 cambios…
● Sin conexión · guardado en este dispositivo
```

Cuando una sincronización falla, la app lo dice claramente y ofrece reintentar. Nunca bloquea un ensayo para mostrar un spinner.

## Por qué vale la pena

Offline-first no es un extra para apps usadas en lugares con mala señal. Es la diferencia entre una app en la que tus usuarios confían y una que abren una sola vez, en casa, con Wi-Fi.

La arquitectura cuesta más al principio. La alternativa te cuesta a los usuarios que más la necesitaban.
