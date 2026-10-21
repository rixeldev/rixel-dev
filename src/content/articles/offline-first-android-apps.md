---
author: Rikelvi Capellán
category: Mobile
cover: /articles/covers/offline-first-android-apps.png
description: "What offline-first really means in a React Native app, how to model sync, and the conflict resolution rules that keep a band app usable in a basement with no signal."
lang: en
pageTitle: offline-first-android-apps
tags:
    - react native
    - offline
    - sync
    - mobile
    - architecture
timestamp: 18/Oct/2026
title: "Offline-first Android apps: syncing without a signal"
translationKey: offline-first-android-apps
featured: true
---

A band rehearses in a basement. The setlist lives on a phone. The Wi-Fi does not exist. If your app needs the network to show a song, your app is broken exactly when it matters most.

Offline-first is often sold as a feature. It is closer to a constraint: the local database is the source of truth, and the network is an optional optimization that eventually catches up.

## What "offline-first" actually requires

Adding a cache is not offline-first. Offline-first means the app is fully usable with zero network and the network only ever adds capability.

That imposes concrete requirements:

1. **Every read comes from local storage.** No component fetches directly from an API.
2. **Every write lands locally first.** The user sees the change immediately, always.
3. **Sync is a background concern.** It runs, it retries, and it never blocks the UI.
4. **Conflict resolution is defined before the first sync.** Not after users report data loss.

## The data model decides everything

In Setuno, songs are owned by the band. A song has a `version`, a `updatedAt` and an `updatedBy`. Locally each row carries a `dirty` flag and the id of the device that last touched it.

The rule is simple: **the newest write wins per field, and the server is the tiebreaker.** If two devices edit the same song offline, the one with the later `updatedAt` survives, and the other device receives the server's copy on its next sync.

This is deliberately boring. A CRDT would handle more cases, but a band app is not a collaborative document editor, and the complexity would cost more than it saves.

## The sync loop

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

The important detail is that `applyServerCopy` refuses to overwrite a row that is locally dirty. If the user changed a song on a plane and the server has a different version, the local edit wins until it can be pushed.

## The failure modes you will hit

- **A device that never syncs.** Users change their PIN or uninstall the app mid-queue. Handle "uninstalled before push" gracefully.
- **Clock skew.** Two devices with wrong clocks can produce inverted ordering. Compare `updatedAt` against the server's clock, not the device's.
- **Partial writes.** A user edits a song in the editor, then the app is killed. Persist on blur, not on save.
- **Storage limits.** Android can clear app data under pressure. Keep a small "recently opened" cache outside the database and treat the database as rebuildable from the server.

## The user-facing part

None of this should be visible. The status indicator answers exactly one question: *is my work safe yet?*

```
● Synced · just now
● Syncing 3 changes…
● Offline · saved on this device
```

When a sync fails, the app says so plainly and offers a retry. It never blocks a rehearsal to show a spinner.

## Why it is worth it

Offline-first is not a nice-to-have for apps used in places with bad signal. It is the difference between an app your users trust and an app they open once, at home, with Wi-Fi.

The architecture costs more up front. The alternative costs you the users who needed it most.
