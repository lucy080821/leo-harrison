# GitHub: account, remotes and authentication

## What is GitHub?

**GitHub** is a web service hosting **remote Git repositories** and adding collaboration tools: *pull requests, issues, reviews, Actions, Pages…* Comparable services: GitLab, Bitbucket. Git is the software; GitHub is where you put the repository to *back it up, share it and collaborate*.

## Creating a repo on the website

1. Sign up at github.com and **enable two-factor authentication (2FA)**.
2. Click **New repository**. Name it, choose *Public* (anyone can see) or *Private*.
3. Optionally tick *Add a README*, `.gitignore` and a **License** (with no license, others are legally not yet free to reuse your code).
4. **Create repository**: GitHub shows the commands to connect.

## Remotes and push

A **remote** is a name (usually `origin`) for the URL of a remote repository.

```bash
git remote add origin https://github.com/you/repo-name.git
git push -u origin main     # push main, -u remembers the link
git clone https://github.com/you/repo-name.git   # download a repo
```

![Your machine, the origin remote on GitHub and the push, pull, clone commands](/lessons/git-github/07-github-account-remote-remote-en.svg)
*push sends commits to GitHub; pull/fetch brings them back; clone downloads the whole repo the first time.*

After `-u`, later you only need `git push` / `git pull`.

## Authentication: HTTPS or SSH?

GitHub **no longer accepts account passwords** for command-line Git operations (since August 2021). Two options:

- **HTTPS + Personal Access Token (PAT)** or a credential helper (Git Credential Manager / `gh auth login`). Tokens have scopes and expiry; grant *minimal* permissions.
- **SSH**: generate a key pair with `ssh-keygen -t ed25519`, paste the **public key** (`.pub`) into *Settings → SSH and GPG keys*, then use URLs like `git@github.com:you/repo-name.git`. **Never share the private key.**

> Tokens and private keys are secrets: don't paste them into chats, don't commit them.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 2: Working with Remotes; chapter 6: GitHub (Account Setup and Configuration).
- GitHub Docs, "Creating a new repository", "Connecting to GitHub with SSH", "Managing your personal access tokens", "Securing your account with two-factor authentication".
- GitHub Blog (2020), "Token authentication requirements for Git operations".
