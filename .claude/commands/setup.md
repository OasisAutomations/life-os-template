---
description: Onboard onto the whole Life OS — a staged questionnaire that sets up every room, the north star, phases, rhythm, and the Board of Advisors. Resumable.
argument-hint: [empty = start/resume · "stage N" · "room <folder>" · "redo"]
---

The user is setting up (or resuming setup of) their Life OS.

**Mode:** $ARGUMENTS

## Before asking anything
1. Read `ONBOARDING.md` (the full stage-by-stage questionnaire — follow it exactly).
2. Read `SETUP-PROGRESS.md` if it exists. Mode handling:
   - empty → resume at the first stage not marked done (or Stage 1 if no progress file).
   - `stage N` → run that stage, even if done.
   - `room <folder>` → run only that room's Stage 5 block.
   - `redo` → confirm first ("this rewrites your setup answers — continue?"), then start at Stage 1.
3. If `CLAUDE.md` says `Setup: complete` and the mode is empty, say setup is done and offer
   `stage N`, `room <folder>`, or `/board-setup`. Stop.
4. If starting fresh, create `SETUP-PROGRESS.md` from the shape below, then give a
   3-line welcome: what's about to happen, ~30–45 min, pause any time.

## Running a stage
- Ask two or three questions at a time, conversationally. Wait for answers.
- Accept short answers and "skip." At most one follow-up when an answer is too vague to
  use (a goal with no date, a debt with no balance).
- Before asking, check what's already answered in `north-star/`, `profile.md`, and room
  files — don't re-ask.
- **Write files at the end of each stage**, not at the very end. Then mark the stage done
  in `SETUP-PROGRESS.md`, show a 2–4 line recap of what was written, and ask:
  "Next: Stage N — <name>. Keep going or pause here?"
- Room renames/deletes (Stage 2): confirm the final list before moving or deleting any
  folder, then update the Rooms table in `CLAUDE.md`. Never delete a folder that
  contains user-written files without asking again.
- Stage 6: check whether calendar tools are available. If they are, offer to create the weekly
  review as a recurring event (confirm the details first). If not, explain how to connect
  once and move on — never block setup on it.
- Stage 7: follow `.claude/commands/board-setup.md`, skipping questions already answered.

## Rules
- The user owns every answer. Draft, show, let them edit — especially missions, phases,
  and the board.
- Don't coach or judge answers during setup. Capture them faithfully.
- Never record passwords, account numbers, card numbers, or government IDs. If offered,
  decline and note only a name/balance.
- Stay in the floor plan: only create folders from `_templates/room/`.

## SETUP-PROGRESS.md shape
```
# Setup progress
Started: YYYY-MM-DD
- [ ] Stage 1 — You
- [ ] Stage 2 — The floor plan
- [ ] Stage 3 — North star
- [ ] Stage 4 — Phases and focus
- [ ] Stage 5 — Room by room   (rooms done: )
- [ ] Stage 6 — Operating rhythm
- [ ] Stage 7 — Board of Advisors
- [ ] Stage 8 — Launch

## Skipped (fill later)
-
```
