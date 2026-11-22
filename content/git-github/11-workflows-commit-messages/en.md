# Team workflows and commit messages

## Choosing a workflow

**GitHub flow** (simple, popular for web/continuously deployed software):

1. `main` is always **deployable**.
2. Each task lives on **a short-lived branch** split from `main`.
3. Open a **pull request** early; discuss and review.
4. Green automated tests, approval → **merge into `main`** → deploy.

Heavier models like *Git Flow* (`develop`, `release`, `hotfix` branches) suit versioned releases; many teams now prefer lean models such as GitHub flow or *trunk-based development*.

![GitHub flow: short branch off main, PR, review, merge back](/lessons/git-github/11-workflows-commit-messages-flow-en.svg)
*The repeating loop: branch → PR → review → merge → deploy.*

## Protecting the main branch

In **Settings → Branches (Rulesets)** you can require for `main`: a PR, a **number of approvals**, **passing checks**, and forbid force pushes. A **CODEOWNERS** file automatically requests the right reviewers per folder.

## Structured commit messages

**Conventional Commits** is a popular convention: `type(scope): description`.

- `feat`: new feature · `fix`: bug fix · `docs`: documentation · `refactor`, `test`, `chore`…
- Example: `feat(login): add Google sign-in button`.

Benefits: readable history, auto-generated *changelogs*, and deriving the next version number.

## Semantic Versioning (SemVer)

`MAJOR.MINOR.PATCH`, e.g. `2.4.1`:

- **MAJOR**: *backward-incompatible* changes.
- **MINOR**: *backward-compatible* new features.
- **PATCH**: backward-compatible bug fixes.

On GitHub, publish with a **tag** (`git tag v1.2.0`) and the **Releases** page.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- GitHub Docs, "GitHub flow", "About protected branches", "About code owners".
- Conventional Commits 1.0.0, conventionalcommits.org.
- Semantic Versioning 2.0.0, semver.org.
- Driessen, V. (2010). A successful Git branching model (Git Flow).
- *Pro Git*, chapter 5: Distributed Workflows.
