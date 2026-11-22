# GitHub Actions and GitHub Pages

## What is CI/CD?

**Continuous Integration (CI)** runs builds and tests *automatically* on every change so bugs are found early. **Continuous Delivery/Deployment (CD)** automatically ships a tested version to where it runs. Both are core practices of modern software engineering.

## GitHub Actions

**GitHub Actions** is the built-in CI/CD platform. You describe the pipeline in a YAML file at `.github/workflows/name.yml`:

```yaml
name: CI
on: [push, pull_request]        # trigger events
jobs:
  test:                          # one job
    runs-on: ubuntu-latest       # the machine (runner)
    steps:
      - uses: actions/checkout@v4          # fetch the code
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
```

Concepts: a **workflow** (YAML file) contains **jobs** running in parallel or in sequence; each job has **steps** (`run` a shell command or `uses` a reusable *action*); a **runner** is the machine executing the job. Results appear on the PR as ✓/✗ (**status checks**), and with branch protection can block merging when tests are red.

![CI pipeline: push → checkout → install → test → status on the PR](/lessons/git-github/13-actions-pages-actions-en.svg)
*On every push the runner executes the steps in order and reports ✓/✗ to the pull request.*

### Secrets in workflows

Keep API keys and tokens in **Settings → Secrets and variables → Actions** and use them as `${{ secrets.NAME }}`. **Never** write them directly in the workflow file. For third-party actions, pin to a specific version/commit.

## GitHub Pages

**GitHub Pages** publishes a **static** website (HTML/CSS/JS) directly from a repo: *Settings → Pages* then choose the source (a branch/folder, or use GitHub Actions to build then publish). The default address looks like `https://yourname.github.io/repo-name/`, and you can attach a custom domain. Good for portfolios, docs, static blogs. It cannot run server-side code.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- GitHub Docs: "Understanding GitHub Actions", "Workflow syntax for GitHub Actions", "Using secrets in GitHub Actions", "What is GitHub Pages?".
- Humble, J. & Farley, D. *Continuous Delivery* (Addison-Wesley, 2010).
