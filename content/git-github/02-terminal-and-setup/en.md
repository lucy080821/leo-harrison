# The terminal and setting up Git

## What is the terminal?

The **terminal** (*command-line interface*) is where you control the computer by typing commands. Advantages: precise, scriptable, and Git is designed around the command line. On Windows use *Git Bash* or PowerShell; on macOS/Linux use the built-in Terminal.

## Foundational commands

| Command | What it does | Example |
|---|---|---|
| `pwd` | print the current folder | `pwd` |
| `ls` | list files | `ls` |
| `cd` | change folder | `cd project`, `cd ..` (up one level) |
| `mkdir` | make a folder | `mkdir project` |
| `touch` | create an empty file | `touch notes.txt` |
| `cat` | show a file's contents | `cat notes.txt` |

(PowerShell has equivalents under other names; Git Bash uses exactly these.)

![A folder tree and the cd, ls, pwd commands that move through it](/lessons/git-github/02-terminal-and-setup-term-en.svg)
*The terminal is always in one current folder; cd moves, ls lists, pwd tells where you are.*

## Installing Git

1. Download from **git-scm.com/downloads** (Windows, macOS, Linux) or use a package manager (`brew install git`, `sudo apt install git`).
2. Check: `git --version`.

## Declaring your identity

Every commit records the author's name and email, so set them once:

```bash
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
git config --list
```

`--global` applies to every repository on the machine. The email should match your GitHub account email (or the *noreply* address GitHub provides) so commits are linked to your account. Since Git 2.28 you can set the default branch name: `git config --global init.defaultBranch main`.

## Getting help

`git help <command>` or `git <command> --help` opens the manual. Reading the official docs is an important skill.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 1: Installing Git; First-Time Git Setup; Getting Help.
- Git docs: `git-config`, git-scm.com/docs/git-config.
- GitHub Docs, "Set up Git" and "Setting your commit email address".
