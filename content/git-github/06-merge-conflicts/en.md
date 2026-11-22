# Merging and resolving conflicts

## The three-way merge

When **both branches have new commits** since the common split point, Git cannot just move a pointer. It finds the **common ancestor** of the two tips and compares *three snapshots*: the common ancestor (base), your branch, the other branch. For each file:

- Only one side changed → take the changed side.
- Both sides changed to the *same result* → take it.
- Both sides changed *differently in the same place* → **conflict**.

If the merge succeeds, Git creates a **merge commit** with **two parents**.

![Three-way merge: two diverged branches joined into a commit with two parents](/lessons/git-github/06-merge-conflicts-merge-en.svg)
*Merge commit M has two parents: the tip of main and the tip of feature.*

## Conflicts

A conflict is not an error: Git just cannot guess what you want. It marks the file:

```text
<<<<<<< HEAD
pho bo
=======
pho chay
>>>>>>> vegan
```

The part between `<<<<<<<` and `=======` is your version (HEAD); the other part is the other branch's.

### Resolution workflow

1. `git status` shows which files are in conflict ("unmerged").
2. Open the file, **edit it to the right content** (keep one side, the other, or a mix), and **remove all markers** `<<<<<<<`, `=======`, `>>>>>>>`.
3. `git add <file>` to say it is resolved.
4. `git commit` completes the merge commit.

To give up the merge: `git merge --abort`.

## Reducing conflicts

- Short-lived branches, merged often.
- Update your branch from `main` regularly (`git merge main`).
- Split work so people edit different files; talk when editing the same place.

> **Simulator:** the code pane runs a *miniature Git* in your browser. Commands and output match real Git for the core behaviour but are simplified (short 7-character hashes, no real network). Type the same commands on a real machine to practise.

## References

- *Pro Git*, chapter 3: Basic Merging; Basic Merge Conflicts.
- Git docs: `git-merge` (section How conflicts are presented).
- GitHub Docs, "Resolving a merge conflict using the command line".
