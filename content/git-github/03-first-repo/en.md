# Your first repo: add and commit

## Git's three areas

Everything in Git revolves around three areas (*Pro Git* calls them three states):

1. **Working directory**: the files you are editing.
2. **Staging area (index)**: where you *choose* the changes that go into the next commit.
3. **Repository (`.git`)**: where commits are permanently stored.

![Git's three areas and the commands that move files between them](/lessons/git-github/03-first-repo-areas-en.svg)
*git add moves from working directory to staging; git commit moves from staging into the repository.*

The basic loop: **edit files → `git add` → `git commit`**. The staging area lets you make *focused, topical* commits even if you changed many things.

## The commands

```bash
git init                 # turn the current folder into a Git repo
git status               # see state: new / modified / staged files
git add README.md        # stage a file
git add .                # stage all changes in the folder
git commit -m "Message"  # save the snapshot
git log --oneline        # compact history
```

A file can be in four states: **untracked**, **unmodified**, **modified**, **staged**.

## Writing good commit messages

- First line ≤ ~50 characters, imperative: "Fix login bug", "Add search box".
- Say *why* when needed, not only *what*.
- One commit = one meaningful change. This is the most valuable team habit.

## Careful: don't commit what you shouldn't

Passwords, API keys, `.env` files, `node_modules`: never put them in the repo (the `.gitignore` lesson comes later).

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 2 "Git Basics": Getting a Git Repository; Recording Changes to the Repository; Viewing the Commit History.
- Git docs: `git-add`, `git-commit`, `git-status`.
- GitHub Docs, "Git cheat sheet".
