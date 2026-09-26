# Life OS — Template

A plain-markdown personal operating system that Claude Code runs for you.

**The folder is the app.** Each numbered folder is a *room*; each room has a
`_context.md` that tells Claude how to behave there. `north-star/` holds your direction
(missions, problems, goals). `CLAUDE.md` is the router that ties it together.
Everything is plain files — yours, no lock-in.

## Setup (about 30–45 minutes, pausable)

1. Copy this folder somewhere and rename it (e.g. `my life/`).
2. Open that folder in Claude Code.
3. Run **`/setup`**. Claude walks you through 8 stages, writing your files as it goes:

   | Stage | What you decide | What gets written |
   |---|---|---|
   | 1. You | name, household, your week | `CLAUDE.md`, `profile.md` |
   | 2. Floor plan | keep / rename / add rooms | room folders, Rooms table |
   | 3. North star | missions, problems, goals, challenges | `north-star/` |
   | 4. Phases & focus | 5–15 yr roadmap, current phase, the one 90-day focus | `phases.md`, `STATUS.md`, `IDEAS.md` |
   | 5. Room by room | key facts for work, money, people, health, learning, legacy | each room's `_context.md` + starter files |
   | 6. Operating rhythm | review day/time, daily plan style | `05-operating-rhythm/` |
   | 7. Board of Advisors | tone, influences, seats → pick your advisors | `board-of-advisors.md` |
   | 8. Launch | — | search index, your first `today.md`, summary |

   Stop any time; `/setup` resumes where you left off. Redo one part with
   `/setup stage 4` or `/setup room 04-money`. Full questionnaire: `ONBOARDING.md`.

Needs Node 18+ for the search index (`brain/brain.js`); everything else is plain markdown.

## Daily use — just talk

| You say | What happens |
|---|---|
| "capture: call the dentist" | Added to `00-inbox/inbox.md` |
| "process the inbox" | Every item routed to the right room |
| "what should I focus on today?" | `05-operating-rhythm/today.md` written from your goals |
| "let's do my weekly review" | Walks `weekly-review.md`, updates `north-star/STATUS.md` |
| "log that I paid $300 on the card" | Dated entry in `04-money/` |
| `/ask-the-board should I take the new job?` | Each advisor weighs in, then one recommendation + next action |

## Structure

| Path | What it is |
|---|---|
| `CLAUDE.md` | The router — the rules Claude follows everywhere. |
| `north-star/` | The Brain: missions (M#), problems (P#), goals (G#), challenges (C#), status, parked ideas. |
| `00-inbox/` … `99-reference/` | The Floor Plan: one folder per area of life. |
| `01-identity/board-*.md`, `profile.md` | Board of Advisors: roster, questionnaire + catalog, your profile. |
| `ONBOARDING.md` | The full staged setup questionnaire (run with `/setup`). |
| `.claude/commands/` | `/setup`, `/board-setup`, `/ask-the-board`. |
| `_templates/room/` | Copy this to add a new room. |
| `brain/brain.js` | Local search index — ranks files without reading them. |

## How the pieces connect

```
CLAUDE.md (router)
   ├── reads → room/_context.md   (how to behave in this area)
   ├── reads → north-star/*       (what it's all for)
   └── writes → room logs, today.md, reviews/, STATUS.md
Every task → G# goal → P# problem → M# mission
```

## Customizing

Rooms are just folders. Rename `02-relationships` to `02-family`, delete `08-legacy`,
add `09-side-project` by copying `_templates/room/`. Then update the Rooms table in
`CLAUDE.md` and re-run `node brain/brain.js index`. Or just ask Claude to do it.

## Privacy

`north-star/` is the most personal part. If you keep this folder in git, consider
uncommenting `north-star/` in the included `.gitignore`.
