# Onboarding — setting up the whole Life OS

Run it with **`/setup`** (or say "set up my Life OS"). Claude walks through 8 stages,
asks questions two or three at a time, and writes every file as it goes.

- **Time:** about 30–45 minutes total. Each stage is 3–8 minutes.
- **Pause any time.** Progress is saved in `SETUP-PROGRESS.md`; `/setup` resumes where you
  left off. Jump around with `/setup stage 5` or redo one room with `/setup room 04-money`.
- **"skip" is always allowed.** Skipped answers stay as `{{placeholders}}` and get listed at
  the end so you can fill them later.
- **Short answers are fine.** Claude asks one follow-up at most when an answer is too vague
  to use (e.g., a goal with no date).

---

## Stage 1 — You
**Writes:** `CLAUDE.md` (`{{NAME}}`, `{{DATE}}`), `01-identity/profile.md` (snapshot)

1. What should I call you?
2. Who's in your household? (partner, kids, parents, roommates, pets)
3. What does a normal week look like — work hours, commitments, when you have free time?
4. In a few sentences: what's your life like right now — work, money, where you live?

## Stage 2 — The floor plan (choose your rooms)
**Writes:** room folders, the Rooms table in `CLAUDE.md`

Claude shows the default rooms and asks:

5. Keep, rename, or delete each room? (e.g. `02-relationships` → `02-family`;
   delete `08-legacy` if it doesn't fit)
6. Any area of your life that needs its own room? (a side business, school, a house
   project, a hobby, caring for a parent)

`00-inbox`, `01-identity`, `05-operating-rhythm`, and `99-reference` are the backbone —
they can be renamed but not deleted. New rooms are copied from `_templates/room/` and
numbered `09-`, `10-`, …

## Stage 3 — North star
**Writes:** `north-star/MISSIONS.md`, `PROBLEMS.md`, `GOALS.md`, `CHALLENGES.md`,
`01-identity/profile.md` (3-year picture, bottleneck, derailers, strengths)

7. If the next three years go well, what's different?
8. What is your life ultimately *for*? Name 1–3 things. → **missions (M#)**
9. What problems are you solving to get there? (e.g. "we're in debt," "my job drains me,"
   "I'm never home") → **problems (P#)**
10. What concrete outcomes would prove progress, and by when? → **goals (G#)** with dates.
    Claude links each goal to a problem and a mission.
11. Which of these is holding you back most right now?
    money · focus · a skill · health/energy · relationships · confidence · time
12. What usually knocks you off track? → **challenges (C#)**, each with the signal that
    shows it's happening
13. What are you genuinely good at, or what do people come to you for?

## Stage 4 — Phases and focus
**Writes:** `01-identity/phases.md`, `north-star/STATUS.md`, `north-star/IDEAS.md`

14. Looking out 5–15 years, what are the big stages in order? Claude drafts 3–5 phases,
    each with an exit condition, from your goals. You edit.
15. Which phase are you in now?
16. If you could only move **one** thing forward in the next 90 days, what is it?
    → current focus
17. Any ideas or projects you're excited about that *aren't* the current focus?
    → parked in `IDEAS.md` with a "revisit when" condition

## Stage 5 — Room by room
**Writes:** each kept room's `_context.md` (Key facts, Current focus, linked G#) and starter
files. Only asks about rooms you kept. One room at a time; "skip room" moves on.

**Work** (`03-work`)
- What do you do for income — job, business, or both? Role, company or business name?
- What tools do you use? (calendar, CRM, invoicing, project tracker)
- If a business: what do you sell, and at what prices?
- What's the next concrete step that moves work forward?
- Anyone you owe a follow-up right now? → `follow-ups.md`

**Money** (`04-money`)
- Income sources and rough monthly income?
- Baseline monthly expenses?
- Debts — name, balance, interest rate, minimum payment? (Rough is fine; "I don't know"
  is fine — finding out becomes the first task.) → `debt-payoff.md`
- Payoff method: smallest balance first, or highest rate first?
- Savings target and date?
- _Never enter account numbers, logins, or card numbers — balances and names only._

**Relationships** (`02-relationships`)
- Who are the most important people in your life right now? For each: what matters to
  them, what helps when they're stressed, key dates. → `people.md`
- Any relationship that needs extra care this season?

**Health** (`06-health`)
- Current routine for food, sleep, movement?
- Constraints — conditions, allergies, schedule limits?
- One health habit you want to hold for the next 90 days? → `system.md`

**Learning** (`07-learning`)
- What skill are you building on purpose, and which goal does it serve?
- What's your one current source (course, book, teacher)?
- Where can you apply it to real work this month?

**Legacy** (`08-legacy`)
- What do you want to be true in 10 years? In 30?
- What do you want to pass down — values, assets, skills, stories? → `vision.md`

**Reference** (`99-reference`)
- Any how-tos or links you look up often? (Claude creates one file per topic.)

**Custom rooms** — asks the template questions: what's it for, key facts, current focus,
which goal it serves, and how Claude should behave there.

## Stage 6 — Operating rhythm
**Writes:** `05-operating-rhythm/_context.md`, `weekly-review.md`

18. Which day and time works for a 15-minute weekly review?
19. Daily plan: do you want to ask for it ("what should I do today?"), or should Claude
    write `today.md` whenever you open a session?
20. Anything the weekly review should always check that isn't there yet? Claude tailors
    the review sections to the rooms you kept.

## Stage 7 — Board of Advisors
**Writes:** `01-identity/profile.md` (rest of it), `01-identity/board-of-advisors.md`

Runs the `/board-setup` flow from `01-identity/board-onboarding.md`. Stages 1–5 already
answered most of the questionnaire, so only these remain:

21. What decision do you keep circling without making?
22. What must any advice respect? (cash runway, health, kids, schedule, things you won't
    do) — prefilled from Stage 5, confirm or add
23. How do you want to be talked to? blunt · warm · data-first · big-picture
24. Who do you already read, watch, or learn from?
25. Which 2–5 seats do you want at the table?

Claude writes the Shared briefing, recommends a board from the catalog (with at least
one counterweight to your challenges), you swap anyone, and it writes the roster.
"Skip" leaves the board for later — `/board-setup` any time.

## Stage 8 — Launch
**Writes:** `05-operating-rhythm/today.md`, `brain/index.json`

Claude:
1. Replaces remaining placeholders it has answers for; lists any it doesn't.
2. Runs `node brain/brain.js index`.
3. Writes your first `today.md` — 1–3 things tied to goals, based on the current focus.
4. Shows a one-screen summary: rooms, missions, goals, current phase and focus, board,
   review day, and what's still blank.
5. Deletes `SETUP-PROGRESS.md` and sets `Setup: complete` in `CLAUDE.md`.
6. Offers a first test: "Try `/ask-the-board` on the decision you mentioned in Stage 7."
