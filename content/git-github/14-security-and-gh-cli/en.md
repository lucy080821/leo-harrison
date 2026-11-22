# Account security and the GitHub CLI

## Protecting your account

- **Two-factor authentication (2FA)**: GitHub required 2FA for code contributors (rolled out from 2023). Prefer *passkeys* or an authenticator app; store **recovery codes**.
- **Strong, unique password** via a password manager.
- **Least-privilege tokens**: prefer *fine-grained personal access tokens* limited to the repos needed, short expiry, and **revoke** when unused.
- **SSH keys** with a passphrase; review *Settings → SSH and GPG keys* to remove unknown keys.
- **Sign commits** (GPG or SSH) so GitHub shows *Verified*, proving you created them.

## Secrets never go into the repo

Rule: **never commit** passwords, tokens, private keys, `.env`. If it happens:

1. **Revoke/rotate** the secret immediately (deleting the commit is not enough; history and copies remain).
2. Remove it from history with a tool such as `git filter-repo` (advanced), then tell everyone to update.
3. Add it to `.gitignore`.

GitHub has **secret scanning** (and *push protection*) that detects many common token types when you push.

![Layers of protection around a repo: 2FA, limited tokens, secret scanning, Dependabot](/lessons/git-github/14-security-and-gh-cli-security-en.svg)
*Many small defences combine: account, tokens, source, dependencies.*

## Keeping dependencies safe

**Dependabot** opens PRs to update outdated or vulnerable libraries. **Security advisories** announce known vulnerabilities. Enable them in *Settings → Code security*.

## GitHub CLI (`gh`)

**`gh`** is GitHub's official command-line tool, for doing in the terminal what you do on the website:

```bash
gh auth login                 # sign in (replaces managing tokens by hand)
gh repo create name --public  # create a repo
gh repo clone you/name
gh issue list
gh pr create --fill           # open a PR from the current branch
gh pr checkout 42             # fetch PR #42 locally to try it
gh pr merge --squash
```

Install `gh` from cli.github.com. `gh` *complements* Git; it does not replace `git`.

## Quick reference

| Goal | Command |
|---|---|
| Start | `git init` / `git clone` |
| Save | `git add` → `git commit` |
| Branch | `git switch -c` / `git merge` |
| Share | `git push` / `git pull` |
| Undo | `git restore` / `git revert` |
| Collaborate | pull request, review |

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- GitHub Docs: "Securing your account with two-factor authentication", "About secret scanning", "About Dependabot", "About commit signature verification".
- GitHub CLI manual, cli.github.com/manual.
- GitHub Blog, "GitHub will require all code contributors to use 2FA by end of 2023".
- OWASP, "Secrets Management Cheat Sheet".
