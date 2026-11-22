# Forks and pull requests

## What is a pull request?

A **pull request (PR)** is a *proposal to merge one branch into another*, with a discussion space. It is the heart of collaboration on GitHub: others view the diff, comment line by line, run automated tests, and only then merge.

![PR lifecycle: branch, push, open PR, review, merge into main](/lessons/git-github/10-fork-pull-request-pr-en.svg)
*The PR sits between push and merge: where discussion and tests happen before main.*

## Workflow inside one repo (with write access)

1. Branch from `main`: `git switch -c feature/name`.
2. Commit, then `git push -u origin feature/name`.
3. On GitHub click **Compare & pull request**, write a title and description (*what, why, how to test*, `Fixes #12`).
4. A **reviewer** looks at *Files changed*, leaves comments, then **Approve** or **Request changes**.
5. You keep fixing by committing to the same branch; the PR updates itself.
6. When it is approved and tests are green, click **Merge**.

Three merge styles on GitHub: **Merge commit** (preserve history), **Squash and merge** (collapse all commits into one), **Rebase and merge** (replay commits in a straight line). Pick per team convention.

## Forks: contributing without write access

For open source you **fork** (make a copy under your account), edit there, then open a PR back to the original:

```bash
git clone https://github.com/you/project.git       # your fork
git remote add upstream https://github.com/original/project.git
git fetch upstream && git switch -c fix/typo upstream/main
# edit, commit, push to your fork, then open a PR on GitHub
```

`origin` is your fork, `upstream` is the original.

## Reviewing kindly and effectively

- **Small, focused** PRs are far easier to review.
- Reviewers: comment on the *code*, not the *person*; give reasons; separate "required" from "suggestion".
- Authors: read carefully, answer each comment, say thanks.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- GitHub Docs: "About pull requests", "Reviewing proposed changes in a pull request", "Fork a repo", "About merge methods on GitHub".
- *Pro Git*, chapter 6: Contributing to a Project.
- GitHub Docs, "GitHub flow".
