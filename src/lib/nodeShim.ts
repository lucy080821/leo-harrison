/**
 * Lớp mô phỏng Node.js chạy trong iframe sandbox (không cần mạng, không cần WebContainers).
 * Cung cấp: require/module/exports, process, Buffer, path, events, fs (bộ nhớ), util, assert, os, url,
 * http (có server.inject để kiểm thử) và một bản Express thu nhỏ.
 */
export const NODE_SHIM = String.raw`
(function () {
  var g = window;
  // ---------- process & Buffer ----------
  g.process = { argv: ['node', 'script.js'], env: { NODE_ENV: 'development' }, platform: 'linux', version: 'v22.0.0',
    versions: { node: '22.0.0' }, cwd: function () { return '/app'; }, exit: function (c) { throw new Error('process.exit(' + (c || 0) + ')'); },
    nextTick: function (fn) { var a = [].slice.call(arguments, 1); Promise.resolve().then(function () { fn.apply(null, a); }); },
    hrtime: Object.assign(function () { var t = performance.now(); return [Math.floor(t / 1000), Math.floor((t % 1000) * 1e6)]; }, { bigint: function () { return BigInt(Math.floor(performance.now() * 1e6)); } }),
    memoryUsage: function () { return { rss: 5e7, heapUsed: 2e7, heapTotal: 3e7 }; }, on: function () {}, stdout: { write: function (s) { console.log(String(s).replace(/\n$/, '')); return true; } } };
  function Buf(bytes) { this.bytes = bytes; this.length = bytes.length; }
  Buf.from = function (v, enc) {
    if (typeof v === 'string') {
      if (enc === 'base64') { var b = atob(v); var a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return new Buf(a); }
      if (enc === 'hex') { var h = []; for (var j = 0; j < v.length; j += 2) h.push(parseInt(v.substr(j, 2), 16)); return new Buf(new Uint8Array(h)); }
      return new Buf(new TextEncoder().encode(v));
    }
    return new Buf(new Uint8Array(v));
  };
  Buf.alloc = function (n) { return new Buf(new Uint8Array(n)); };
  Buf.isBuffer = function (x) { return x instanceof Buf; };
  Buf.byteLength = function (s) { return new TextEncoder().encode(String(s)).length; };
  Buf.concat = function (list) { var all = []; list.forEach(function (b) { all = all.concat(Array.from(b.bytes)); }); return new Buf(new Uint8Array(all)); };
  Buf.prototype.toString = function (enc) {
    if (enc === 'hex') return Array.from(this.bytes).map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    if (enc === 'base64') { var s = ''; this.bytes.forEach(function (b) { s += String.fromCharCode(b); }); return btoa(s); }
    return new TextDecoder().decode(this.bytes);
  };
  Buf.prototype.toJSON = function () { return { type: 'Buffer', data: Array.from(this.bytes) }; };
  g.Buffer = Buf;

  // ---------- path ----------
  function normalizeArr(parts, abs) { var out = []; parts.forEach(function (p) { if (!p || p === '.') return; if (p === '..') { if (out.length && out[out.length - 1] !== '..') out.pop(); else if (!abs) out.push('..'); } else out.push(p); }); return out; }
  var path = {
    sep: '/', delimiter: ':',
    normalize: function (p) { var abs = p.charAt(0) === '/'; var trail = p.slice(-1) === '/'; var r = normalizeArr(p.split('/'), abs).join('/'); if (!r && !abs) r = '.'; if (r && trail) r += '/'; return (abs ? '/' : '') + r; },
    join: function () { var s = [].filter.call(arguments, Boolean).join('/'); return s ? path.normalize(s) : '.'; },
    resolve: function () { var r = '', abs = false; for (var i = arguments.length - 1; i >= -1 && !abs; i--) { var p = i >= 0 ? arguments[i] : process.cwd(); if (!p) continue; r = p + '/' + r; abs = p.charAt(0) === '/'; } r = normalizeArr(r.split('/'), abs).join('/'); return (abs ? '/' : '') + r || '.'; },
    isAbsolute: function (p) { return p.charAt(0) === '/'; },
    dirname: function (p) { var i = p.replace(/\/+$/, '').lastIndexOf('/'); return i < 0 ? '.' : i === 0 ? '/' : p.slice(0, i); },
    basename: function (p, ext) { var b = p.replace(/\/+$/, '').split('/').pop(); return ext && b.slice(-ext.length) === ext ? b.slice(0, -ext.length) : b; },
    extname: function (p) { var b = path.basename(p); var i = b.lastIndexOf('.'); return i <= 0 ? '' : b.slice(i); },
    parse: function (p) { var base = path.basename(p), ext = path.extname(p); return { root: p.charAt(0) === '/' ? '/' : '', dir: path.dirname(p), base: base, ext: ext, name: ext ? base.slice(0, -ext.length) : base }; },
    format: function (o) { return (o.dir ? o.dir + '/' : '') + (o.base || (o.name || '') + (o.ext || '')); },
    relative: function (from, to) { var f = path.resolve(from).split('/').filter(Boolean), t = path.resolve(to).split('/').filter(Boolean); while (f.length && t.length && f[0] === t[0]) { f.shift(); t.shift(); } return f.map(function () { return '..'; }).concat(t).join('/'); },
  };
  path.posix = path;

  // ---------- events ----------
  function EventEmitter() { this._events = {}; }
  EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (n, f) { (this._events[n] = this._events[n] || []).push(f); return this; };
  EventEmitter.prototype.prependListener = function (n, f) { (this._events[n] = this._events[n] || []).unshift(f); return this; };
  EventEmitter.prototype.once = function (n, f) { var self = this; function w() { self.off(n, w); return f.apply(this, arguments); } w.listener = f; return this.on(n, w); };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function (n, f) { var l = this._events[n]; if (l) this._events[n] = l.filter(function (x) { return x !== f && x.listener !== f; }); return this; };
  EventEmitter.prototype.removeAllListeners = function (n) { if (n) delete this._events[n]; else this._events = {}; return this; };
  EventEmitter.prototype.emit = function (n) { var l = this._events[n]; var a = [].slice.call(arguments, 1); if (!l || !l.length) { if (n === 'error') throw a[0] instanceof Error ? a[0] : new Error('Unhandled error'); return false; } l.slice().forEach(function (f) { f.apply(this, a); }, this); return true; };
  EventEmitter.prototype.listenerCount = function (n) { return (this._events[n] || []).length; };
  EventEmitter.prototype.listeners = function (n) { return (this._events[n] || []).slice(); };
  EventEmitter.prototype.eventNames = function () { return Object.keys(this._events); };
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.once = function (em, n) { return new Promise(function (res) { em.once(n, function () { res([].slice.call(arguments)); }); }); };

  // ---------- fs (trong bộ nhớ) ----------
  var files = {}; var dirs = { '/': true, '/app': true };
  function abs(p) { return path.resolve(String(p)); }
  function enoent(op, p) { var e = new Error("ENOENT: no such file or directory, " + op + " '" + p + "'"); e.code = 'ENOENT'; e.errno = -2; e.syscall = op; e.path = p; return e; }
  var fs = {
    existsSync: function (p) { p = abs(p); return p in files || !!dirs[p]; },
    readFileSync: function (p, enc) { var a = abs(p); if (!(a in files)) throw enoent('open', p); var v = files[a]; return enc ? v : Buf.from(v); },
    writeFileSync: function (p, data) { var a = abs(p); files[a] = String(data && data.toString ? data.toString() : data); var d = path.dirname(a); while (d && d !== '/') { dirs[d] = true; d = path.dirname(d); } },
    appendFileSync: function (p, data) { var a = abs(p); files[a] = (files[a] || '') + String(data); },
    unlinkSync: function (p) { var a = abs(p); if (!(a in files)) throw enoent('unlink', p); delete files[a]; },
    mkdirSync: function (p, o) { var a = abs(p); if (dirs[a] && !(o && o.recursive)) { var e = new Error("EEXIST: file already exists, mkdir '" + p + "'"); e.code = 'EEXIST'; throw e; } var d = a; while (d && d !== '/') { dirs[d] = true; d = path.dirname(d); } },
    readdirSync: function (p) { var a = abs(p); if (!dirs[a]) throw enoent('scandir', p); var out = {}; var pre = a === '/' ? '/' : a + '/'; Object.keys(files).concat(Object.keys(dirs)).forEach(function (f) { if (f.indexOf(pre) === 0 && f !== a) out[f.slice(pre.length).split('/')[0]] = 1; }); return Object.keys(out).sort(); },
    statSync: function (p) { var a = abs(p); var isF = a in files, isD = !!dirs[a]; if (!isF && !isD) throw enoent('stat', p); return { isFile: function () { return isF; }, isDirectory: function () { return isD; }, size: isF ? files[a].length : 0 }; },
    rmSync: function (p, o) { var a = abs(p); Object.keys(files).forEach(function (f) { if (f === a || f.indexOf(a + '/') === 0) delete files[f]; }); delete dirs[a]; },
    renameSync: function (a, b) { var x = abs(a); if (!(x in files)) throw enoent('rename', a); files[abs(b)] = files[x]; delete files[x]; },
    copyFileSync: function (a, b) { fs.writeFileSync(b, fs.readFileSync(a, 'utf8')); },
  };
  function cbify(name) { return function () { var a = [].slice.call(arguments); var cb = a.pop(); var r, err = null; try { r = fs[name + 'Sync'].apply(null, a); } catch (e) { err = e; } setTimeout(function () { cb(err, r); }, 0); }; }
  function pify(name) { return function () { var a = [].slice.call(arguments); return new Promise(function (res, rej) { setTimeout(function () { try { res(fs[name + 'Sync'].apply(null, a)); } catch (e) { rej(e); } }, 0); }); }; }
  fs.promises = {};
  ['readFile', 'writeFile', 'appendFile', 'unlink', 'mkdir', 'readdir', 'stat', 'rm', 'rename', 'copyFile'].forEach(function (n) { fs[n] = cbify(n); fs.promises[n] = pify(n); });
  fs.promises.access = function (p) { return fs.existsSync(p) ? Promise.resolve() : Promise.reject(enoent('access', p)); };

  // ---------- util, assert, os, url ----------
  function inspect(v) { if (typeof v === 'string') return v; try { return typeof v === 'function' ? '[Function]' : JSON.stringify(v); } catch (e) { return String(v); } }
  var util = {
    promisify: function (fn) { return function () { var a = [].slice.call(arguments); return new Promise(function (res, rej) { fn.apply(null, a.concat(function (err, v) { err ? rej(err) : res(v); })); }); }; },
    inspect: inspect,
    format: function (f) { var a = [].slice.call(arguments, 1); var i = 0; var s = String(f).replace(/%[sdifjo%]/g, function (m) { if (m === '%%') return '%'; var v = a[i++]; return m === '%d' || m === '%i' ? String(Number(v)) : m === '%j' || m === '%o' ? JSON.stringify(v) : String(v); }); return [s].concat(a.slice(i).map(inspect)).join(' '); },
    isDeepStrictEqual: function (a, b) { return JSON.stringify(a) === JSON.stringify(b); },
    types: { isPromise: function (x) { return x && typeof x.then === 'function'; } },
    TextEncoder: TextEncoder, TextDecoder: TextDecoder,
  };
  function fail(msg, def) { var e = new Error(msg || def); e.name = 'AssertionError'; e.code = 'ERR_ASSERTION'; throw e; }
  var assert = function (v, m) { if (!v) fail(m, 'The expression evaluated to a falsy value'); };
  assert.ok = assert;
  assert.equal = function (a, b, m) { if (a != b) fail(m, a + ' == ' + b); };
  assert.strictEqual = function (a, b, m) { if (a !== b) fail(m, 'Expected values to be strictly equal: ' + inspect(a) + ' !== ' + inspect(b)); };
  assert.notStrictEqual = function (a, b, m) { if (a === b) fail(m, 'Expected "actual" to be strictly unequal to: ' + inspect(b)); };
  assert.deepStrictEqual = assert.deepEqual = function (a, b, m) { if (!util.isDeepStrictEqual(a, b)) fail(m, 'Expected values to be deeply equal: ' + inspect(a) + ' vs ' + inspect(b)); };
  assert.throws = function (fn, exp, m) { var threw = false; try { fn(); } catch (e) { threw = true; if (exp instanceof RegExp && !exp.test(String(e.message))) fail(m, 'Error message did not match'); } if (!threw) fail(m, 'Missing expected exception.'); };
  assert.rejects = function (p) { return Promise.resolve(typeof p === 'function' ? p() : p).then(function () { fail('', 'Missing expected rejection.'); }, function () {}); };
  var os = { EOL: '\n', platform: function () { return 'linux'; }, cpus: function () { return [{}, {}, {}, {}]; }, totalmem: function () { return 8e9; }, freemem: function () { return 4e9; }, homedir: function () { return '/home/user'; }, tmpdir: function () { return '/tmp'; }, hostname: function () { return 'lexi-sandbox'; } };

  // ---------- http (mô phỏng) với server.inject ----------
  function makeReqRes(opts, done) {
    var body = opts.body === undefined ? '' : typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body);
    var headers = {}; Object.keys(opts.headers || {}).forEach(function (k) { headers[k.toLowerCase()] = opts.headers[k]; });
    if (opts.body !== undefined && typeof opts.body !== 'string' && !headers['content-type']) headers['content-type'] = 'application/json';
    var req = new EventEmitter(); req.method = (opts.method || 'GET').toUpperCase(); req.url = opts.url || opts.path || '/'; req.headers = headers; req.rawBody = body; req.jsonBody = opts.body;
    req.setEncoding = function () {};
    var res = new EventEmitter(); res.statusCode = 200; res.headersSent = false; var out = []; var hdrs = {};
    res.setHeader = function (k, v) { hdrs[String(k).toLowerCase()] = v; return res; };
    res.getHeader = function (k) { return hdrs[String(k).toLowerCase()]; };
    res.writeHead = function (c, h) { res.statusCode = c; Object.keys(h || {}).forEach(function (k) { hdrs[k.toLowerCase()] = h[k]; }); return res; };
    res.write = function (c) { out.push(String(c)); return true; };
    res.end = function (c) { if (res.finished) return; if (c !== undefined && c !== null) out.push(String(c)); res.finished = true; res.headersSent = true; var text = out.join(''); done({ statusCode: res.statusCode, headers: hdrs, body: text, json: function () { return JSON.parse(text); } }); };
    setTimeout(function () { if (body) req.emit('data', body); req.emit('end'); }, 0);
    return { req: req, res: res };
  }
  function Server(handler) { EventEmitter.call(this); this.handler = handler; this.listening = false; }
  Server.prototype = Object.create(EventEmitter.prototype);
  Server.prototype.listen = function (port, a, b) { var cb = [a, b].filter(function (f) { return typeof f === 'function'; })[0]; var self = this; self.listening = true; self.port = port; if (cb) setTimeout(cb, 0); return self; };
  Server.prototype.close = function (cb) { this.listening = false; if (cb) setTimeout(cb, 0); };
  Server.prototype.address = function () { return { port: this.port, address: '127.0.0.1' }; };
  Server.prototype.inject = function (opts) { var self = this; if (typeof opts === 'string') opts = { url: opts }; return new Promise(function (resolve, reject) { var rr = makeReqRes(opts, resolve); try { var r = self.handler(rr.req, rr.res); if (r && r.catch) r.catch(reject); } catch (e) { reject(e); } }); };
  var http = { createServer: function (h) { return new Server(h); }, STATUS_CODES: { 200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error' }, Server: Server };
  http.request = http.get = function () { throw new Error('Mạng bị tắt trong sandbox: hãy dùng server.inject() để kiểm thử.'); };

  // ---------- Express thu nhỏ ----------
  function compile(p, end) { var keys = []; var re = '^' + p.replace(/\/+$/, '').replace(/[.+?^\${}()|[\]\\]/g, '\\$&').replace(/:(\w+)/g, function (_, k) { keys.push(k); return '([^/]+)'; }).replace(/\*/g, '.*') + (end ? '/?$' : '(?=/|$)'); return { re: new RegExp(re), keys: keys }; }
  function Router() { var stack = []; function router(req, res, next) { router.handle(req, res, next); }
    router.stack = stack;
    router.use = function (a) { var p = '/', fns = [].slice.call(arguments); if (typeof a === 'string') { p = a; fns.shift(); } fns.forEach(function (f) { stack.push({ method: null, path: p, m: compile(p, false), fn: f, use: true }); }); return router; };
    ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].forEach(function (m) { router[m] = function (p) { var fns = [].slice.call(arguments, 1); var mm = compile(p, true); fns.forEach(function (f) { stack.push({ method: m.toUpperCase(), path: p, m: mm, fn: f }); }); return router; }; });
    router.all = function (p) { var fns = [].slice.call(arguments, 1); var mm = compile(p, true); fns.forEach(function (f) { stack.push({ method: '*', path: p, m: mm, fn: f }); }); return router; };
    router.route = function (p) { var r = {}; ['get', 'post', 'put', 'patch', 'delete'].forEach(function (m) { r[m] = function () { router[m].apply(router, [p].concat([].slice.call(arguments))); return r; }; }); return r; };
    router.handle = function (req, res, out) { var i = 0; var baseUrl = req.baseUrl || ''; var origPath = req.path;
      function next(err) { var layer; while ((layer = stack[i++])) { var m = layer.m.re.exec(req.path); if (!m) continue; if (layer.method && layer.method !== '*' && layer.method !== req.method) continue; var isErr = layer.fn.length === 4; if ((err && !isErr) || (!err && isErr)) continue;
          var savedParams = req.params; req.params = Object.assign({}, req.params);
          layer.m.keys.forEach(function (k, idx) { req.params[k] = decodeURIComponent(m[idx + 1]); });
          var savedBase = req.baseUrl, savedPath = req.path;
          if (layer.use && layer.path !== '/') { req.baseUrl = (req.baseUrl || '') + m[0]; req.path = req.path.slice(m[0].length) || '/'; }
          var restore = function () { req.baseUrl = savedBase; req.path = savedPath; req.params = savedParams; };
          var nx = function (e) { restore(); next(e); };
          try { var r = isErr ? layer.fn(err, req, res, nx) : layer.fn(req, res, nx); if (r && typeof r.then === 'function') r.then(null, nx); } catch (e) { nx(e); }
          return; }
        req.path = origPath; if (out) return out(err);
        if (err) { if (!res.headersSent) res.status(err.status || 500).json({ error: err.message }); return; }
        res.status(404).send('Cannot ' + req.method + ' ' + req.path); }
      next(); };
    return router; }
  function decorate(req, res) {
    var u = new URL(req.url, 'http://localhost'); req.path = u.pathname; req.originalUrl = req.url; req.query = {}; u.searchParams.forEach(function (v, k) { req.query[k] = v; }); req.params = {}; req.baseUrl = '';
    req.get = req.header = function (n) { return req.headers[String(n).toLowerCase()]; };
    req.body = undefined; req.ip = '127.0.0.1';
    res.status = function (c) { res.statusCode = c; return res; };
    res.set = res.header = function (k, v) { if (typeof k === 'object') Object.keys(k).forEach(function (x) { res.setHeader(x, k[x]); }); else res.setHeader(k, v); return res; };
    res.type = function (t) { return res.setHeader('content-type', t === 'json' ? 'application/json' : t === 'html' ? 'text/html' : t === 'text' ? 'text/plain' : t); };
    res.json = function (o) { if (!res.getHeader('content-type')) res.setHeader('content-type', 'application/json; charset=utf-8'); res.end(JSON.stringify(o)); return res; };
    res.send = function (b) { if (b !== null && typeof b === 'object') return res.json(b); if (!res.getHeader('content-type')) res.setHeader('content-type', 'text/html; charset=utf-8'); res.end(b === undefined ? '' : String(b)); return res; };
    res.sendStatus = function (c) { res.statusCode = c; res.setHeader('content-type', 'text/plain'); res.end(http.STATUS_CODES[c] || String(c)); return res; };
    res.redirect = function (a, b) { res.statusCode = typeof a === 'number' ? a : 302; res.setHeader('location', typeof a === 'number' ? b : a); res.end(''); return res; };
    res.locals = {};
  }
  function express() {
    var app = new EventEmitter(); var router = Router(); app.settings = {};
    ['use', 'get', 'post', 'put', 'patch', 'delete', 'all', 'options', 'route'].forEach(function (m) { app[m] = function () { if (m === 'get' && arguments.length === 1) return app.settings[arguments[0]]; var r = router[m].apply(router, arguments); return r === router ? app : r; }; });
    app.set = function (k, v) { app.settings[k] = v; return app; };
    app.enable = function (k) { return app.set(k, true); };
    app.disable = function (k) { return app.set(k, false); };
    app.handle = function (req, res) { decorate(req, res); router.handle(req, res); };
    app.listen = function () { var s = http.createServer(function (req, res) { app.handle(req, res); }); var a = [].slice.call(arguments); s.listen.apply(s, a); app._server = s; return s; };
    app.inject = function (opts) { var s = app._server || http.createServer(function (req, res) { app.handle(req, res); }); return s.inject(opts); };
    return app; }
  express.Router = Router;
  express.json = function () { return function (req, res, next) { if (req.rawBody) { try { req.body = req.jsonBody !== undefined && typeof req.jsonBody === 'object' ? req.jsonBody : JSON.parse(req.rawBody); } catch (e) { e.status = 400; return next(e); } } else if (req.body === undefined) req.body = {}; next(); }; };
  express.urlencoded = function () { return function (req, res, next) { if (req.rawBody && (req.headers['content-type'] || '').indexOf('urlencoded') >= 0) { req.body = Object.fromEntries(new URLSearchParams(req.rawBody)); } else if (req.body === undefined) req.body = {}; next(); }; };
  express.static = function () { return function (req, res, next) { next(); }; };

  var cryptoMod = { randomUUID: function () { return crypto.randomUUID(); }, randomBytes: function (n) { var a = new Uint8Array(n); crypto.getRandomValues(a); return new Buf(a); } };
  var timersPromises = { setTimeout: function (ms, v) { return new Promise(function (r) { setTimeout(function () { r(v); }, ms); }); }, setImmediate: function (v) { return Promise.resolve(v); } };
  var builtins = { path: path, events: EventEmitter, fs: fs, 'fs/promises': fs.promises, util: util, assert: assert, 'assert/strict': assert, os: os, url: { URL: URL, URLSearchParams: URLSearchParams, parse: function (s) { var u = new URL(s, 'http://localhost'); return { pathname: u.pathname, search: u.search, query: Object.fromEntries(u.searchParams), hostname: u.hostname, href: u.href }; } }, http: http, https: http, express: express, crypto: cryptoMod, 'timers/promises': timersPromises, buffer: { Buffer: Buf }, process: g.process };
  var modules = {};
  function makeRequire(base) { return function require(name) { name = String(name).replace(/^node:/, ''); if (builtins[name]) return builtins[name]; var key = path.resolve(path.dirname(base), name); var cands = [key, key + '.js', key + '.json', key + '/index.js']; for (var i = 0; i < cands.length; i++) { if (modules[cands[i]]) return modules[cands[i]].exports; if (cands[i] in files) { var src = files[cands[i]]; var m = { exports: {} }; modules[cands[i]] = m; if (/\.json$/.test(cands[i])) m.exports = JSON.parse(src); else new Function('require', 'module', 'exports', '__filename', '__dirname', src)(makeRequire(cands[i]), m, m.exports, cands[i], path.dirname(cands[i])); return m.exports; } } var e = new Error("Cannot find module '" + name + "'"); e.code = 'MODULE_NOT_FOUND'; throw e; }; }
  g.module = { exports: {} }; g.exports = g.module.exports; g.require = makeRequire('/app/script.js'); g.__filename = '/app/script.js'; g.__dirname = '/app';
  g.global = g; g.globalThis.global = g;
})();
`;
