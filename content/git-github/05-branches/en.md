# Branches

## What is a branch?

In Git, a **branch is just a named pointer to a commit**; it is extremely light (a 41-byte file). *Pro Git* calls branching Git's "killer feature": creating a branch is almost instant, so use one per feature or bug.

**HEAD** is a special pointer saying *where you are* (usually pointing at the current branch). When you commit, the current branch moves forward one step.

![Branches main and feature pointing into the commit chain, HEAD on feature](/lessons/git-github/05-branches-branch-en.svg)
*A branch is just a label on a commit; HEAD shows the current branch.*

## Commands

```bash
git branch                 # list branches
git branch feature-x       # create (without switching)
git switch feature-x       # switch
git switch -c feature-x    # create and switch (old style: git checkout -b)
git branch -d feature-x    # delete a merged branch
```

When you switch, Git updates the working directory to match that branch's commit. If you have uncommitted changes the switch would overwrite, Git refuses to protect you.

## Merging: fast-forward

If the target branch has **no new commits** since you branched off, Git just *moves the pointer forward*: a **fast-forward**, with no new commit. The next lesson covers the case where both branches advanced.

![Fast-forward merge: the main label moves to the feature commit](/lessons/git-github/05-branches-ff-en.svg)
*No new merge commit; main simply steps forward.*

## Naming branches

Common convention: `feature/name`, `fix/name`, `docs/name`. Use lowercase, hyphens, short and clear.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 3 "Git Branching": Branches in a Nutshell; Basic Branching and Merging.
- Git docs: `git-branch`, `git-switch`, `git-merge`.
- GitHub Docs, "About branches".
