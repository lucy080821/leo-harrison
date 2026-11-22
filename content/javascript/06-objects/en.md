# Objects

An **object** is a collection of **key: value** pairs used to describe an "entity": a user, a product, a config...

```javascript
const person = {
  name: "Lexi",
  age: 20,
  skills: ["HTML", "CSS"],          // values can be arrays or other objects
  address: { city: "Hanoi" },
  greet() {                         // a function inside an object is a METHOD
    return `Hello, I'm ${this.name}`;
  },
};
```

## Reading and changing

```javascript
person.name;               // "Lexi"       dot notation
person["name"];            // "Lexi"       brackets (dynamic keys, keys with spaces)
person.address.city;       // "Hanoi"
person.age = 21;           // change
person.email = "a@b.c";    // add
delete person.email;       // remove
"age" in person;           // true        check a key exists
```

> `const` only forbids **reassigning the variable**, not changing **inside** the object.

![An object: a set of key–value pairs](/lessons/javascript/06-objects-fig-en.svg)
*An object: a set of key–value pairs*

## `this` in methods

When you call `person.greet()`, `this` is `person`, so `this.name` is `"Lexi"`. Use the method syntax `greet() {}` and **not** an arrow function for methods, because arrows have no `this` of their own.

## Iterating an object

```javascript
Object.keys(person);      // ["name", "age", ...]     array of keys
Object.values(person);    // array of values
Object.entries(person);   // [["name","Lexi"], ...]   array of [key, value] pairs

for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}
```

## Destructuring and spread

```javascript
const { name, age } = person;             // pull properties into variables
const { name: fullName } = person;        // rename the variable
const { city = "Unknown" } = person;      // default value

const copy = { ...person };                // shallow copy
const merged = { ...user, ...updates };    // merge; the RIGHT side overrides the left
```

## References and copying

Objects are **passed by reference**: `const b = a` makes `a` and `b` point to the **same** object. Spread copies only the **top level**; nested objects are still shared. For a deep copy use `structuredClone(obj)`.

## Optional chaining

```javascript
person.address?.city;        // if address doesn't exist → undefined instead of an error
person.getAge?.();           // call only if the function exists
```
