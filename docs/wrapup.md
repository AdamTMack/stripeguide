# Session Wrapup Instructions

When the user says "Please follow wrapup.md", execute these steps in order:

## 1. Write Session Summary
- Create `docs/sessionN.md` (increment N from the highest existing session file)
- Brief bullet points: what was built, what was fixed, what changed
- Note any unfinished work or known issues

## 2. Update Decisions Log
- Append to `docs/decisions.md` (create if it doesn't exist)
- Add only critical decisions that need to carry across sessions
- Format: date, decision, brief rationale
- If creating for the first time, summarize all important decisions from the project so far

## 3. Compress Session History
- Read all existing `docs/sessionN.md` files
- Append their contents (compressed to 2-3 sentences each) into `docs/history.md` (create if it doesn't exist)
- Delete the old session files after compacting them
- Do NOT delete the session file just created in step 1 — only compress previous ones

## 4. Commit, Merge, Push
- Stage and commit all changes on the current working branch
- Merge the working branch into main
- Push both the branch and main to GitHub
