# {{NAME}}'s Life OS — Router

This folder is {{NAME}}'s personal operating system. The folder *is* the app: each
numbered folder is a "room." When I (Claude) work in a room, I read that room's
`_context.md` FIRST and behave the way it tells me to.

> **Setup: not started** _(becomes `in progress` / `complete` — managed by `/setup`)_
> **First run:** if setup isn't complete and this file still contains `{{NAME}}`, then on
> the user's first message offer onboarding once: "Want to set up your Life OS? `/setup`
> walks you through it in stages — about 30–45 minutes, pause any time." If they say
> "set up my Life OS" (or similar), run the `/setup` flow.

There are two layers:

1. **The Brain — `north-star/`**
   Who {{NAME}} is and where they're going: missions (M#), problems (P#), goals (G#),
   challenges (C#), current status. This is the source of truth for *direction*.
   Before giving any advice on decisions, money, or relationships, read the relevant
   north-star files and frame the answer against *their* missions and goals — never
   generic advice.

2. **The Floor Plan — the rooms**
   How {{NAME}} *operates* day to day.

## Rooms

| Room | Use it for |
|---|---|
| `00-inbox/` | Capture anything fast. Unsorted. Gets routed to a room later. |
| `01-identity/` | Who am I / where am I going. The doorway to `north-star/`. |
| `02-relationships/` | Partner, family, friends — showing up for the people who matter. |
| `03-work/` | Job, business, or main income work — projects, clients, follow-ups. |
| `04-money/` | Budget, debt, savings, income tracking. |
| `05-operating-rhythm/` | Daily plan + weekly review. Keeps the OS alive. |
| `06-health/` | Food, sleep, movement, energy. |
| `07-learning/` | Skills being built on purpose. |
| `08-legacy/` | The long game — what all of this is ultimately for. |
| `99-reference/` | How-tos, links, resources. Low-churn. |

**Cross-cutting file:** `01-identity/phases.md` — the multi-year roadmap. Know which
phase is current (`north-star/STATUS.md`) and keep today's work aimed at *this* phase.

## How {{NAME}} uses this

They talk to me in plain language ("what should I focus on today", "add a client",
"log a payment"). I maintain the files. They own them — plain markdown, no lock-in.

## Routing rules for me (Claude)

1. **Route.** Identify which room the request belongs to. Read that room's `_context.md`.
2. **Ground.** For direction, decisions, money, or relationships, also read the relevant
   `north-star/` file(s) so the answer fits their real situation.
3. **Capture, don't derail.** A new idea that isn't the current focus
   (`north-star/STATUS.md`) gets captured — dated, in `00-inbox/inbox.md` or
   `north-star/IDEAS.md` — instead of silently becoming today's work.
4. **Trace it up the chain.** Every task should ladder up to a goal (G#) and a problem
   (P#). If it doesn't, say so plainly — it may be busywork.
5. **Write it down.** When something real happens (a payment, a decision, a job, a win),
   record it in the right room's log. Dated entries (`YYYY-MM-DD`), newest at the bottom.
6. **Close the loop.** After meaningful changes, offer to log it in
   `05-operating-rhythm/` or update `north-star/STATUS.md`.
7. **Stay in the floor plan.** Don't invent new top-level folders. New files go inside a
   room. A new room is copied from `_templates/room/` and added to the table above.
8. **Connectors are optional.** If a calendar (or other) connector is available, use it to
   read context — e.g. today's events for the daily plan. The markdown files stay the
   source of truth, and I ask before creating or changing anything in an outside app.
9. **Keep `_context.md` current.** When a room's key facts or current focus change,
   update that room's `_context.md` so the next session starts with the truth.

## Board of Advisors

A panel of simulated advisors lives in `01-identity/board-of-advisors.md`, briefed on
`01-identity/profile.md`.
- `/board-setup` — questionnaire + choose board members (first time, or to change the board).
- `/ask-the-board <decision>` — each advisor's take, agreements/disagreements, a synthesis,
  and one next action.
When the user is weighing a real decision in any room, offer `/ask-the-board` once.

## The Brain index (use it before Grep/Glob)

`brain/brain.js` is a zero-dependency local index over every room + `north-star/`.
To find where something lives:

- `node brain/brain.js query "..." [-n N] [--json]` — ranked files, zero file reads
- `node brain/brain.js index` — rebuild after adding/renaming files
- `node brain/brain.js stats` — index overview

Query first, then Read only the top hit(s).

## Setup

The full onboarding lives in `ONBOARDING.md` and runs via `/setup` (resumable; progress in
`SETUP-PROGRESS.md`). 8 stages: You → Floor plan → North star → Phases & focus →
Room by room → Operating rhythm → Board of Advisors → Launch.
Redo pieces later with `/setup stage N`, `/setup room <folder>`, or `/board-setup`.

_Last updated: {{DATE}}_
