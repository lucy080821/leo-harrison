# Special characters and text semantics

## Special characters (HTML entities)

Some characters have a special meaning in HTML (`<`, `>`, `&`). To show them as plain text, use an **entity**:

| Type | Shows | Note |
|---|---|---|
| `&lt;` | `<` | less than |
| `&gt;` | `>` | greater than |
| `&amp;` | `&` | ampersand |
| `&quot;` | `"` | double quote |
| `&nbsp;` | (space) | a **non-breaking** space |
| `&copy;` | © | copyright |
| `&euro;` | € | euro sign |

```html
<p>To make a paragraph, use the &lt;p&gt; tag.</p>
```

You can also use numeric codes such as `&#169;` or `&#x1F600;`. In a UTF-8 document you can type characters like `©` or `é` directly.

## Meaningful text tags

| Tag | Used for |
|---|---|
| `<blockquote>` | A long (block) quotation |
| `<q>` | A short inline quotation |
| `<cite>` | The title of a work or a source |
| `<code>` | An inline piece of code |
| `<pre>` | Preserves spaces and line breaks (usually wraps `<code>`) |
| `<kbd>` | Keys, e.g. <kbd>Ctrl</kbd> + <kbd>C</kbd> |
| `<mark>` | Highlighted text |
| `<abbr title="...">` | An abbreviation; hover shows the meaning |
| `<time datetime="...">` | A date or time, machine-readable |
| `<sub>`, `<sup>` | Subscript and superscript: H<sub>2</sub>O, x<sup>2</sup> |
| `<del>`, `<ins>` | Deleted text, inserted text |

```html
<pre><code>function hi() {
  return "hello";
}</code></pre>
```

Inside `<pre>` all spaces and newlines are kept, which makes it ideal for showing code.
