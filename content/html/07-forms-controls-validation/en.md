# Forms (2): choices and validation

## Drop-down lists

```html
<label for="city">City</label>
<select id="city" name="city">
  <option value="">-- Choose --</option>
  <option value="hn">Hanoi</option>
  <option value="sg" selected>Ho Chi Minh City</option>
</select>
```

- An `<option>`'s `value` is the data sent; the text inside is what users see.
- `selected` preselects an item.

## Radio: pick one

Radios belong to one group when they share the **same `name`**. Only one in the group can be selected.

```html
<label><input type="radio" name="level" value="easy" /> Easy</label>
<label><input type="radio" name="level" value="hard" /> Hard</label>
```

## Checkbox: pick many

```html
<label><input type="checkbox" name="agree" /> I agree</label>
```

Each checkbox is independent; add `checked` to tick it by default.

## Multi-line text

```html
<textarea name="msg" rows="4" cols="40"></textarea>
```

## Grouping

```html
<fieldset>
  <legend>Contact details</legend>
  ...
</fieldset>
```

## Built-in HTML5 validation

The browser blocks invalid forms and shows a message if you use these attributes:

| Attribute | Meaning |
|---|---|
| `required` | Must be filled in |
| `minlength`, `maxlength` | Minimum and maximum text length |
| `min`, `max` | Smallest and largest value (`number`, `date`) |
| `pattern` | A regular expression; e.g. `pattern="[0-9]{10}"` for 10 digits |
| `type="email"` | Must look like an email |

```html
<input type="text" name="phone" pattern="[0-9]{10}" required />
```

> Browser validation is only a convenience. The server **must always validate again**, because anyone can bypass browser-side checks.
