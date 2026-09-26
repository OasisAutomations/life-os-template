# Board Onboarding — questionnaire + advisor catalog

Used by `/board-setup`, and by Stage 7 of `/setup` (see `ONBOARDING.md`) — in that
case most of Part A is already answered and only the unanswered questions are asked. Two parts: **(A)** a 10-question questionnaire that becomes
`profile.md`, and **(B)** choosing board members from the catalog (or anyone you like).

---

## Part A — The questionnaire

Claude asks these two or three at a time, conversationally. Short answers are fine;
"skip" is fine. If `north-star/` is already filled in, Claude uses it and skips
anything already answered.

1. **Snapshot.** In a few sentences: what's your life like right now — work, money,
   household, where you live?
2. **Three years out.** If the next three years go well, what's different?
3. **The stuck decision.** What decision do you keep circling without making?
4. **Bottleneck.** Which one is holding you back most right now?
   money · focus · a skill · health/energy · relationships · confidence · time
5. **Derailers.** What usually knocks you off track? (Be honest — the board is only as
   useful as this answer.)
6. **Strengths.** What are you genuinely good at, or what do people come to you for?
7. **Constraints.** What must any advice respect? (cash runway, health, kids, schedule,
   location, things you won't do)
8. **Tone.** How do you want to be talked to?
   blunt and tactical · warm and encouraging · data-first · big-picture and philosophical
9. **Influences.** Who do you already read, watch, or learn from?
10. **Seats.** Which seats do you want at the table? Pick 2–5 from the seat list in
    Part B, or name your own.

**After the questionnaire,** Claude writes `profile.md`, including a **Shared briefing**:
3–6 non-negotiables drawn from answers 4, 5, and 7 that every advisor must hold.

---

## Part B — Choosing the board

### How Claude recommends
- One advisor per chosen seat, favoring people from answer 9 when they fit.
- Match the tone in answer 8, but include **at least one counterweight** — someone
  whose philosophy pushes against the user's derailer (answer 5). A board that only
  agrees with you isn't a board.
- Name each pick's blind spot and which other seat covers it.
- Present the recommended board, with one line on why each person fits, then let the
  user swap anyone. The user has the final say on every seat.

### The catalog (starting points — any public figure, author, or historical thinker works)

| Seat | Advisors to consider | Their lens |
|---|---|---|
| **Customers & offers** | Alex Hormozi · Seth Godin · Daymond John | Get customers, build the offer, finish one business |
| **Personal finance** | Ramit Sethi · Morgan Housel · Dave Ramsey | Spend on what matters · behavior over math · debt-free discipline |
| **Focus & deep work** | Cal Newport · James Clear · Greg McKeown | Rare skills and deep work · systems and habits · do less, better |
| **Mastery & skill** | Robert Greene · George Leonard · Anders Ericsson | Apprenticeship · love the plateau · deliberate practice |
| **Strategy & decisions** | Charlie Munger · Naval Ravikant · Annie Duke | Mental models · leverage and specific knowledge · thinking in bets |
| **Mindset & resilience** | Ryan Holiday · Marcus Aurelius · Viktor Frankl | Stoic practice · control what you can · meaning under hardship |
| **Relationships** | Esther Perel · John & Julie Gottman · Brené Brown | Desire and connection · what makes couples last · vulnerability |
| **Health & energy** | Peter Attia · Andrew Huberman · Matthew Walker | Longevity · protocols · sleep |
| **Creativity & craft** | Rick Rubin · Austin Kleon · Steven Pressfield | Taste and attention · show your work · beating resistance |
| **Leadership & career** | Brené Brown · Simon Sinek · Ben Horowitz | Brave leadership · start with why · hard decisions |
| **Parenting & family** | Dr. Becky Kennedy · Dan Siegel | Sturdy parenting · connection before correction |

**Custom seats are welcome:** a mentor you know personally, a grandparent's voice, a
fictional character, "my future self at 60." Claude writes their voice from what the
user tells it about them.

### After the choice
Claude fills in `board-of-advisors.md` — one section per advisor (optimizes for, voice,
frameworks, what they push you on, blind spot) plus the seat-coverage table — then
offers a test run: "Want to try it? Give me a decision for `/ask-the-board`."
