# EventEmitter: event-driven code

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Much of Node (HTTP servers, streams, processes) is **event-driven**: "when X happens, do Y". The `EventEmitter` class is the foundation of that model.

```javascript
const EventEmitter = require("events");
const bus = new EventEmitter();

bus.on("message", (who, text) => { ... });  // subscribe
bus.emit("message", "An", "Hi!");           // fire the event
bus.once("done", fn);                        // runs only the first time
bus.off("message", handler);                 // unsubscribe
```

- `on(name, handler)`: listen. You may register **several** handlers per event.
- `emit(name, ...args)`: calls every registered handler **synchronously**, in order.
- The special `"error"` event: emitting it with no listener makes Node throw.

## Extending EventEmitter

```javascript
class Downloader extends EventEmitter {
  start() { this.emit("progress", 50); this.emit("done"); }
}
```

This lets your objects "talk" to the rest of the program without depending on each other.

![EventEmitter: emit calls every listener registered with on](/lessons/nodejs/03-events-fig-en.svg)
*EventEmitter: emit calls every listener registered with on*

