# Inspecting, undoing and .gitignore

## See what changed

```bash
git status          # overview
git diff            # UNSTAGED changes (working dir vs staging)
git diff --staged   # STAGED changes (staging vs last commit)
git log --oneline   # history
git show <hash>     # details of one commit
```

## Undoing safely: pick the right tool

| Situation | Command |
|---|---|
| Discard unstaged changes in a file | `git restore <file>` |
| Unstage a file (keep its contents) | `git restore --staged <file>` |
| Fix message/content of an **unpushed** commit | `git commit --amend` |
| Reverse a commit that is **already shared** | `git revert <hash>` (makes a new commit) |
| Move the branch back to an old commit (local, **dangerous**) | `git reset --hard <hash>` |

`git restore` and `git switch` were added in Git 2.23 (2019) to split up the jobs `git checkout` used to mix.

> **Golden rule:** commands that *rewrite history* (`reset --hard`, `commit --amend`, `rebase`) are for **unpushed** commits only. For shared commits use `revert`, which *adds* history instead of erasing it.

![Decision guide: which undo command depends on whether the commit was pushed](/lessons/git-github/04-undo-ignore-undo-en.svg)
*Not pushed: history may be rewritten. Pushed: use revert.*

Even after a slip, `git reflog` records everywhere `HEAD` has been and can often rescue a seemingly lost commit (for a while).

## .gitignore

A `.gitignore` file lists name patterns Git must **skip**:

```gitignore
node_modules/
.env
*.log
.DS_Store
```

- Create it **before** `git add`; ignoring has no effect on files *already tracked* (use `git rm --cached`).
- GitHub keeps a `github/gitignore` repository of templates per language.
- **A secret (password, token) committed by mistake stays in history.** Revoke (rotate) it immediately; don't just delete the file.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 2: Undoing Things; Ignoring Files; chapter 7: Reset Demystified.
- Git docs: `git-restore`, `git-revert`, `git-reset`, `gitignore`.
- GitHub Docs, "Ignoring files" and "Removing sensitive data from a repository".
