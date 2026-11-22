# Syncing: fetch, pull, push

## Remote-tracking branches

After `clone` or `fetch` your machine has read-only branches such as **`origin/main`**: a snapshot of *where `main` was the last time you looked* on the remote. They update only when you talk to the server. Your `main` and `origin/main` can diverge.

![Local main and remote origin/main diverged; push/pull bring them in line](/lessons/git-github/08-sync-fetch-pull-push-sync-en.svg)
*fetch updates origin/main; pull merges it into main; push sends main up.*

## Three commands

| Command | What it does |
|---|---|
| `git fetch` | downloads new commits, **updates `origin/main`**, does NOT touch your branch |
| `git merge origin/main` | merges the downloaded changes into the current branch |
| `git pull` | = `fetch` + `merge` (or `rebase` if configured) |
| `git push` | sends your commits to the remote |

A safe habit: `git fetch` first to *see* what others did (`git log main..origin/main`), then merge.

## Why is a push rejected?

If the remote has commits you **don't have**, `git push` is rejected (*non-fast-forward*): Git won't let you overwrite others' work. Fix: `git pull` (merge, resolve conflicts if any), then `git push` again.

> **Don't use** `git push --force` on a shared branch. If you must, use `--force-with-lease`, which is safer because it refuses if there are new commits you haven't seen.

## A daily routine

```bash
git switch main
git pull                      # update
git switch -c feature/abc     # work on your own branch
# ... edit, add, commit ...
git push -u origin feature/abc
```

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 2: Working with Remotes; chapter 3: Remote Branches.
- Git docs: `git-fetch`, `git-pull`, `git-push`.
- GitHub Docs, "Getting changes from a remote repository" and "About remote repositories".
