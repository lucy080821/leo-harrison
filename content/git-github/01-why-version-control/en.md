# Why version control

## The problem

Everyone has had `thesis_final.docx`, `thesis_final_v2.docx`, `thesis_final_really.docx`. With code it is worse: a fix in one place breaks another, several people edit the same file, and nobody remembers *who changed what, when, and why*.

A **version control system (VCS)** records the history of changes so you can: see who changed what, return to an earlier state, experiment on a separate branch, and merge many people's work.

## Generations of VCS

- **Local**: keeps patches on one machine (RCS).
- **Centralised**: one server holds the history, everyone checks out copies (CVS, Subversion).
- **Distributed**: *everyone has the full history* on their own machine (Git, Mercurial). You can work offline and there is no single point of failure.

Git was created by **Linus Torvalds** in 2005 to manage the Linux kernel. According to *Pro Git*, Git's core difference is that it thinks of data as a **stream of snapshots** of the whole project, not a list of per-file changes.

![A chain of commits: each commit points to its parent](/lessons/git-github/01-why-version-control-chain-en.svg)
*Each box is a snapshot; arrows point to the previous commit.*

## Key concepts

- **Repository**: the project folder plus its full history (the hidden `.git` directory).
- **Commit**: a named snapshot (a hash), with author, message, and a *pointer to its parent commit*.
- **Hash**: the commit's unique identifier computed from its content (Git currently uses SHA-1; SHA-256 support is arriving gradually). Because it depends on the parent too, **rewriting old history changes every hash after it**.
- **Git vs GitHub**: Git is a *tool* on your machine; GitHub is a *web service* hosting Git repositories and adding collaboration tools (pull requests, issues...).

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- Chacon, S. & Straub, B. *Pro Git* (2nd ed.), chapter 1 "Getting Started": About Version Control; What is Git?, git-scm.com/book.
- Git documentation, git-scm.com/docs.
- GitHub Docs, "About Git" and "About GitHub and Git", docs.github.com.
