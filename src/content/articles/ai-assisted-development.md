---
author: Rikelvi Capellán
category: Engineering
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=720&fit=crop&q=80
description: How I use AI coding assistants to ship faster without sacrificing code quality, architecture, or my own understanding of the systems I build.
lang: en
pageTitle: ai-assisted-development
tags:
    - ai
    - developer tools
    - productivity
    - engineering
    - workflow
timestamp: 20/Sep/2026
title: "AI-assisted development: shipping faster without losing craft"
translationKey: ai-assisted-development
featured: true
---

AI coding assistants went from a novelty to part of my daily workflow. Used well, they remove the boring parts of software and leave more room for the parts that actually require a human: understanding the problem, making trade-offs, and owning the result. Used badly, they generate plausible-looking code that nobody understands and that will be expensive to maintain.

Here is how I try to stay on the right side of that line.

## What assistants are genuinely good at

- **Boilerplate with a predictable shape.** Setting up a route, a schema, or a component that follows an existing pattern.
- **Boring refactors.** Renaming, extracting a helper, or moving logic without changing behavior.
- **First drafts of tests.** They rarely write the test you *should* write, but they sketch the boring cases fast.
- **Explaining unfamiliar code.** Asking "what does this function actually guarantee?" is a great use of a model.
- **Rubber-duck debugging.** Describing a bug out loud to a model often surfaces the real cause before it answers.

## Where they consistently fail

- **Architecture.** A model will happily add a dependency or an abstraction where a simple function belongs. It optimizes for the next token, not for the next two years.
- **Security-sensitive code.** Auth, sessions, and anything touching secrets need a human reviewing every line.
- **Subtle state bugs.** Race conditions and stale-closure issues are exactly where generated code looks clean and behaves wrong.
- **Anything version-sensitive.** APIs change. A confident answer can be a year out of date.

## A workflow that keeps quality high

1. **Design first, prompt second.** If I cannot describe the interface and the data flow, no prompt will save me. I sketch the shape before I generate anything.
2. **Keep diffs small.** One feature or one refactor at a time. Large generated diffs hide mistakes.
3. **Always run the build.** On this site, `pnpm build` runs `astro check` and a full build. If it does not pass, the change is not done.
4. **Read every line you keep.** If I cannot explain a line in review, it does not get merged.
5. **Write the tests that matter.** Let the model scaffold; you decide the assertions that encode intent.

## Guardrails I rely on

- TypeScript in strict mode catches the sort of "it looks right" mistakes models make.
- Small, single-purpose modules make generated code easy to replace.
- Naming things for intent (`resolvePhotoPublicUrl`, not `helper`) means a generated change has to respect that intent.
- A clean git history lets me revert a bad suggestion in seconds.

## The honest trade-off

AI makes me faster at the parts of the job that are mechanical and slower to trust at the parts that are judgment calls. The craft did not disappear; it moved. The value of a developer is increasingly in choosing the right problem, constraining the solution, and verifying that it actually works.

Treat the assistant as a very fast junior engineer who has read everything and remembers nothing about your project. Review accordingly.
