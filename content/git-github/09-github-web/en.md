# The GitHub website: README, issues, labels

## Reading a repository

A repo's main page shows: the file list, the **README** (rendered below), current branch, commit count, languages. Key tabs: **Code**, **Issues**, **Pull requests**, **Actions**, **Settings**.

- Click a file to view it; **History** shows the file's history; **Blame** shows who last changed each line.
- Press **`.`** to open the web editor; **`t`** to find files quickly.
- You can edit files on the web (pencil icon); GitHub makes the commit for you.

![Wireframe of a GitHub repo page: tabs, file list, README, sidebar](/lessons/git-github/09-github-web-repo-en.svg)
*The main areas of a repo: Code, Issues, Pull requests, Actions, README.*

## README and Markdown

`README.md` is the project's "front door": it should say *what the project is, how to install and run it, how to contribute*. GitHub uses **GitHub Flavored Markdown**: `# Heading`, `**bold**`, lists `- item`, fenced code blocks, tables, task lists `- [ ] task`, and mentions `@name`.

## Issues: tracking work

An **issue** is a unit of work: a bug, proposal or question. Each has a number (`#12`), title, description, an **assignee**, **labels** like `bug`, `enhancement`, `good first issue`, and a **milestone**.

A good bug report has: steps to reproduce, expected result, actual result, version/environment.

### Linking issues to code

Write **`Fixes #12`** (or `Closes`, `Resolves`) in a pull request description or commit message: when the PR merges into the default branch, GitHub **closes issue #12 automatically**. Mentioning `#12` anywhere creates a cross-link.

## Discovering and searching

The search bar supports filters such as `language:python stars:>100`. **Star** bookmarks interest; **Watch** gets notifications; **Fork** makes your own copy (next lesson).

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- GitHub Docs: "About READMEs", "About issues", "Basic writing and formatting syntax", "Linking a pull request to an issue".
- *Pro Git*, chapter 6 "GitHub".
