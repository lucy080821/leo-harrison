# Rebase, stash and tags

## Rebase: a straight history

`merge` preserves the real history, with a merge commit. **Rebase** *replays* your branch's commits on top of the latest tip of another branch, producing a tidier **linear** history:

```bash
git switch feature
git rebase main        # put feature's commits on top of the latest main
```

![Comparing merge and rebase of a feature branch onto main](/lessons/git-github/12-rebase-stash-tags-rebase-en.svg)
*Merge keeps both lines and adds a merge commit; rebase lays feature commits in a straight chain (new hashes).*

Because each commit is **recreated** (new parent ⇒ new hash), rebase **rewrites history**.

> **The golden rule of rebasing** (*Pro Git*): **do not rebase commits that you have pushed and others may be using.** Rebase freely on your own *local* branches.

Rebase also lets you tidy up: `git rebase -i HEAD~3` (interactive) to squash, edit, drop or reorder a few commits before opening a PR. On conflicts, resolve each commit then `git rebase --continue`; to bail out: `git rebase --abort`.

Merge vs rebase is a team-convention choice; both are valid.

## Stash: shelving unfinished work

In the middle of an edit and need to switch branch urgently? **Stash** shelves uncommitted changes on a stack:

```bash
git stash              # shelve; the working dir is clean again
git switch hotfix      # do something else...
git switch feature
git stash pop          # bring the work back
git stash list
```

## Tags: marking releases

A **tag** is a *fixed* label on one commit (unlike a branch, which moves forward):

```bash
git tag v1.0.0                       # lightweight tag
git tag -a v1.0.0 -m "Release 1.0"   # annotated tag (recommended for releases)
git push origin v1.0.0               # tags are not pushed automatically
```

On GitHub a tag becomes a **Release** with notes and attached files.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 3: Rebasing; chapter 7: Stashing and Cleaning; chapter 2: Tagging; Rewriting History.
- Git docs: `git-rebase`, `git-stash`, `git-tag`.
- GitHub Docs, "Managing releases in a repository".
