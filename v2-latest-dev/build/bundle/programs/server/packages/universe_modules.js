(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var require, $__curScript, bestDetph;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/universe_modules/packages/universe_modules.js            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:modules/require-polyfill.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
require = Npm.require;                                                                                                 // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 11
}).call(this);                                                       // 12
                                                                     // 13
                                                                     // 14
                                                                     // 15
                                                                     // 16
                                                                     // 17
                                                                     // 18
(function () {                                                       // 19
                                                                     // 20
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:modules/vendor/system-polyfills.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * SystemJS Polyfills for URL and Promise providing IE8+ Support                                                       // 2
 */                                                                                                                    // 3
// from https://gist.github.com/Yaffle/1088850                                                                         // 4
(function(global) {                                                                                                    // 5
    function URLPolyfill(url, baseURL) {                                                                               // 6
        if (typeof url != 'string')                                                                                    // 7
            throw new TypeError('URL must be a string');                                                               // 8
        var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        if (!m) {                                                                                                      // 10
            throw new RangeError();                                                                                    // 11
        }                                                                                                              // 12
        var protocol = m[1] || "";                                                                                     // 13
        var username = m[2] || "";                                                                                     // 14
        var password = m[3] || "";                                                                                     // 15
        var host = m[4] || "";                                                                                         // 16
        var hostname = m[5] || "";                                                                                     // 17
        var port = m[6] || "";                                                                                         // 18
        var pathname = m[7] || "";                                                                                     // 19
        var search = m[8] || "";                                                                                       // 20
        var hash = m[9] || "";                                                                                         // 21
        if (baseURL !== undefined) {                                                                                   // 22
            var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);                            // 23
            var flag = protocol === "" && host === "" && username === "";                                              // 24
            if (flag && pathname === "" && search === "") {                                                            // 25
                search = base.search;                                                                                  // 26
            }                                                                                                          // 27
            if (flag && pathname.charAt(0) !== "/") {                                                                  // 28
                pathname = (pathname !== "" ? (((base.host !== "" || base.username !== "") && base.pathname === "" ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
            }                                                                                                          // 30
            // dot segments removal                                                                                    // 31
            var output = [];                                                                                           // 32
            pathname.replace(/^(\.\.?(\/|$))+/, "")                                                                    // 33
                .replace(/\/(\.(\/|$))+/g, "/")                                                                        // 34
                .replace(/\/\.\.$/, "/../")                                                                            // 35
                .replace(/\/?[^\/]*/g, function (p) {                                                                  // 36
                    if (p === "/..") {                                                                                 // 37
                        output.pop();                                                                                  // 38
                    } else {                                                                                           // 39
                        output.push(p);                                                                                // 40
                    }                                                                                                  // 41
                });                                                                                                    // 42
            pathname = output.join("").replace(/^\//, pathname.charAt(0) === "/" ? "/" : "");                          // 43
            if (flag) {                                                                                                // 44
                port = base.port;                                                                                      // 45
                hostname = base.hostname;                                                                              // 46
                host = base.host;                                                                                      // 47
                password = base.password;                                                                              // 48
                username = base.username;                                                                              // 49
            }                                                                                                          // 50
            if (protocol === "") {                                                                                     // 51
                protocol = base.protocol;                                                                              // 52
            }                                                                                                          // 53
        }                                                                                                              // 54
                                                                                                                       // 55
        // convert windows file URLs to use /                                                                          // 56
        if (protocol == 'file:')                                                                                       // 57
            pathname = pathname.replace(/\\/g, '/');                                                                   // 58
                                                                                                                       // 59
        this.origin = protocol + (protocol !== "" || host !== "" ? "//" : "") + host;                                  // 60
        this.href = protocol + (protocol !== "" || host !== "" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
        this.protocol = protocol;                                                                                      // 62
        this.username = username;                                                                                      // 63
        this.password = password;                                                                                      // 64
        this.host = host;                                                                                              // 65
        this.hostname = hostname;                                                                                      // 66
        this.port = port;                                                                                              // 67
        this.pathname = pathname;                                                                                      // 68
        this.search = search;                                                                                          // 69
        this.hash = hash;                                                                                              // 70
    }                                                                                                                  // 71
    global.URLPolyfill = URLPolyfill;                                                                                  // 72
})(typeof self != 'undefined' ? self : global);!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 74
    /** @author Brian Cavalier */                                                                                      // 75
    /** @author John Hann */                                                                                           // 76
                                                                                                                       // 77
    /**                                                                                                                // 78
     * ES6 global Promise shim                                                                                         // 79
     */                                                                                                                // 80
    var unhandledRejections = require('../lib/decorators/unhandledRejection');                                         // 81
    var PromiseConstructor = unhandledRejections(require('../lib/Promise'));                                           // 82
                                                                                                                       // 83
    module.exports = typeof global != 'undefined' ? (global.Promise = PromiseConstructor)                              // 84
        : typeof self   != 'undefined' ? (self.Promise   = PromiseConstructor)                                         // 85
        : PromiseConstructor;                                                                                          // 86
                                                                                                                       // 87
},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(require,module,exports){                  // 88
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 89
    /** @author Brian Cavalier */                                                                                      // 90
    /** @author John Hann */                                                                                           // 91
                                                                                                                       // 92
    (function(define) { 'use strict';                                                                                  // 93
        define(function (require) {                                                                                    // 94
                                                                                                                       // 95
            var makePromise = require('./makePromise');                                                                // 96
            var Scheduler = require('./Scheduler');                                                                    // 97
            var async = require('./env').asap;                                                                         // 98
                                                                                                                       // 99
            return makePromise({                                                                                       // 100
                scheduler: new Scheduler(async)                                                                        // 101
            });                                                                                                        // 102
                                                                                                                       // 103
        });                                                                                                            // 104
    })(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });
                                                                                                                       // 106
},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(require,module,exports){                                  // 107
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 108
    /** @author Brian Cavalier */                                                                                      // 109
    /** @author John Hann */                                                                                           // 110
                                                                                                                       // 111
    (function(define) { 'use strict';                                                                                  // 112
        define(function() {                                                                                            // 113
                                                                                                                       // 114
            // Credit to Twisol (https://github.com/Twisol) for suggesting                                             // 115
            // this type of extensible queue + trampoline approach for next-tick conflation.                           // 116
                                                                                                                       // 117
            /**                                                                                                        // 118
             * Async task scheduler                                                                                    // 119
             * @param {function} async function to schedule a single async function                                    // 120
             * @constructor                                                                                            // 121
             */                                                                                                        // 122
            function Scheduler(async) {                                                                                // 123
                this._async = async;                                                                                   // 124
                this._running = false;                                                                                 // 125
                                                                                                                       // 126
                this._queue = this;                                                                                    // 127
                this._queueLen = 0;                                                                                    // 128
                this._afterQueue = {};                                                                                 // 129
                this._afterQueueLen = 0;                                                                               // 130
                                                                                                                       // 131
                var self = this;                                                                                       // 132
                this.drain = function() {                                                                              // 133
                    self._drain();                                                                                     // 134
                };                                                                                                     // 135
            }                                                                                                          // 136
                                                                                                                       // 137
            /**                                                                                                        // 138
             * Enqueue a task                                                                                          // 139
             * @param {{ run:function }} task                                                                          // 140
             */                                                                                                        // 141
            Scheduler.prototype.enqueue = function(task) {                                                             // 142
                this._queue[this._queueLen++] = task;                                                                  // 143
                this.run();                                                                                            // 144
            };                                                                                                         // 145
                                                                                                                       // 146
            /**                                                                                                        // 147
             * Enqueue a task to run after the main task queue                                                         // 148
             * @param {{ run:function }} task                                                                          // 149
             */                                                                                                        // 150
            Scheduler.prototype.afterQueue = function(task) {                                                          // 151
                this._afterQueue[this._afterQueueLen++] = task;                                                        // 152
                this.run();                                                                                            // 153
            };                                                                                                         // 154
                                                                                                                       // 155
            Scheduler.prototype.run = function() {                                                                     // 156
                if (!this._running) {                                                                                  // 157
                    this._running = true;                                                                              // 158
                    this._async(this.drain);                                                                           // 159
                }                                                                                                      // 160
            };                                                                                                         // 161
                                                                                                                       // 162
            /**                                                                                                        // 163
             * Drain the handler queue entirely, and then the after queue                                              // 164
             */                                                                                                        // 165
            Scheduler.prototype._drain = function() {                                                                  // 166
                var i = 0;                                                                                             // 167
                for (; i < this._queueLen; ++i) {                                                                      // 168
                    this._queue[i].run();                                                                              // 169
                    this._queue[i] = void 0;                                                                           // 170
                }                                                                                                      // 171
                                                                                                                       // 172
                this._queueLen = 0;                                                                                    // 173
                this._running = false;                                                                                 // 174
                                                                                                                       // 175
                for (i = 0; i < this._afterQueueLen; ++i) {                                                            // 176
                    this._afterQueue[i].run();                                                                         // 177
                    this._afterQueue[i] = void 0;                                                                      // 178
                }                                                                                                      // 179
                                                                                                                       // 180
                this._afterQueueLen = 0;                                                                               // 181
            };                                                                                                         // 182
                                                                                                                       // 183
            return Scheduler;                                                                                          // 184
                                                                                                                       // 185
        });                                                                                                            // 186
    }(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));       // 187
                                                                                                                       // 188
},{}],4:[function(require,module,exports){                                                                             // 189
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 190
    /** @author Brian Cavalier */                                                                                      // 191
    /** @author John Hann */                                                                                           // 192
                                                                                                                       // 193
    (function(define) { 'use strict';                                                                                  // 194
        define(function(require) {                                                                                     // 195
                                                                                                                       // 196
            var setTimer = require('../env').setTimer;                                                                 // 197
            var format = require('../format');                                                                         // 198
                                                                                                                       // 199
            return function unhandledRejection(Promise) {                                                              // 200
                                                                                                                       // 201
                var logError = noop;                                                                                   // 202
                var logInfo = noop;                                                                                    // 203
                var localConsole;                                                                                      // 204
                                                                                                                       // 205
                if(typeof console !== 'undefined') {                                                                   // 206
                    // Alias console to prevent things like uglify's drop_console option from                          // 207
                    // removing console.log/error. Unhandled rejections fall into the same                             // 208
                    // category as uncaught exceptions, and build tools shouldn't silence them.                        // 209
                    localConsole = console;                                                                            // 210
                    logError = typeof localConsole.error !== 'undefined'                                               // 211
                        ? function (e) { localConsole.error(e); }                                                      // 212
                        : function (e) { localConsole.log(e); };                                                       // 213
                                                                                                                       // 214
                    logInfo = typeof localConsole.info !== 'undefined'                                                 // 215
                        ? function (e) { localConsole.info(e); }                                                       // 216
                        : function (e) { localConsole.log(e); };                                                       // 217
                }                                                                                                      // 218
                                                                                                                       // 219
                Promise.onPotentiallyUnhandledRejection = function(rejection) {                                        // 220
                    enqueue(report, rejection);                                                                        // 221
                };                                                                                                     // 222
                                                                                                                       // 223
                Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {                                 // 224
                    enqueue(unreport, rejection);                                                                      // 225
                };                                                                                                     // 226
                                                                                                                       // 227
                Promise.onFatalRejection = function(rejection) {                                                       // 228
                    enqueue(throwit, rejection.value);                                                                 // 229
                };                                                                                                     // 230
                                                                                                                       // 231
                var tasks = [];                                                                                        // 232
                var reported = [];                                                                                     // 233
                var running = null;                                                                                    // 234
                                                                                                                       // 235
                function report(r) {                                                                                   // 236
                    if(!r.handled) {                                                                                   // 237
                        reported.push(r);                                                                              // 238
                        logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));     // 239
                    }                                                                                                  // 240
                }                                                                                                      // 241
                                                                                                                       // 242
                function unreport(r) {                                                                                 // 243
                    var i = reported.indexOf(r);                                                                       // 244
                    if(i >= 0) {                                                                                       // 245
                        reported.splice(i, 1);                                                                         // 246
                        logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));          // 247
                    }                                                                                                  // 248
                }                                                                                                      // 249
                                                                                                                       // 250
                function enqueue(f, x) {                                                                               // 251
                    tasks.push(f, x);                                                                                  // 252
                    if(running === null) {                                                                             // 253
                        running = setTimer(flush, 0);                                                                  // 254
                    }                                                                                                  // 255
                }                                                                                                      // 256
                                                                                                                       // 257
                function flush() {                                                                                     // 258
                    running = null;                                                                                    // 259
                    while(tasks.length > 0) {                                                                          // 260
                        tasks.shift()(tasks.shift());                                                                  // 261
                    }                                                                                                  // 262
                }                                                                                                      // 263
                                                                                                                       // 264
                return Promise;                                                                                        // 265
            };                                                                                                         // 266
                                                                                                                       // 267
            function throwit(e) {                                                                                      // 268
                throw e;                                                                                               // 269
            }                                                                                                          // 270
                                                                                                                       // 271
            function noop() {}                                                                                         // 272
                                                                                                                       // 273
        });                                                                                                            // 274
    }(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
                                                                                                                       // 276
},{"../env":5,"../format":6}],5:[function(require,module,exports){                                                     // 277
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 278
    /** @author Brian Cavalier */                                                                                      // 279
    /** @author John Hann */                                                                                           // 280
                                                                                                                       // 281
    /*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/                        // 282
    (function(define) { 'use strict';                                                                                  // 283
        define(function(require) {                                                                                     // 284
            /*jshint maxcomplexity:6*/                                                                                 // 285
                                                                                                                       // 286
            // Sniff "best" async scheduling option                                                                    // 287
            // Prefer process.nextTick or MutationObserver, then check for                                             // 288
            // setTimeout, and finally vertx, since its the only env that doesn't                                      // 289
            // have setTimeout                                                                                         // 290
                                                                                                                       // 291
            var MutationObs;                                                                                           // 292
            var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;                                  // 293
                                                                                                                       // 294
            // Default env                                                                                             // 295
            var setTimer = function(f, ms) { return setTimeout(f, ms); };                                              // 296
            var clearTimer = function(t) { return clearTimeout(t); };                                                  // 297
            var asap = function (f) { return capturedSetTimeout(f, 0); };                                              // 298
                                                                                                                       // 299
            // Detect specific env                                                                                     // 300
            if (isNode()) { // Node                                                                                    // 301
                asap = function (f) { return process.nextTick(f); };                                                   // 302
                                                                                                                       // 303
            } else if (MutationObs = hasMutationObserver()) { // Modern browser                                        // 304
                asap = initMutationObserver(MutationObs);                                                              // 305
                                                                                                                       // 306
            } else if (!capturedSetTimeout) { // vert.x                                                                // 307
                var vertxRequire = require;                                                                            // 308
                var vertx = vertxRequire('vertx');                                                                     // 309
                setTimer = function (f, ms) { return vertx.setTimer(ms, f); };                                         // 310
                clearTimer = vertx.cancelTimer;                                                                        // 311
                asap = vertx.runOnLoop || vertx.runOnContext;                                                          // 312
            }                                                                                                          // 313
                                                                                                                       // 314
            return {                                                                                                   // 315
                setTimer: setTimer,                                                                                    // 316
                clearTimer: clearTimer,                                                                                // 317
                asap: asap                                                                                             // 318
            };                                                                                                         // 319
                                                                                                                       // 320
            function isNode () {                                                                                       // 321
                return typeof process !== 'undefined' && process !== null &&                                           // 322
                    typeof process.nextTick === 'function';                                                            // 323
            }                                                                                                          // 324
                                                                                                                       // 325
            function hasMutationObserver () {                                                                          // 326
                return (typeof MutationObserver === 'function' && MutationObserver) ||                                 // 327
                    (typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);                          // 328
            }                                                                                                          // 329
                                                                                                                       // 330
            function initMutationObserver(MutationObserver) {                                                          // 331
                var scheduled;                                                                                         // 332
                var node = document.createTextNode('');                                                                // 333
                var o = new MutationObserver(run);                                                                     // 334
                o.observe(node, { characterData: true });                                                              // 335
                                                                                                                       // 336
                function run() {                                                                                       // 337
                    var f = scheduled;                                                                                 // 338
                    scheduled = void 0;                                                                                // 339
                    f();                                                                                               // 340
                }                                                                                                      // 341
                                                                                                                       // 342
                var i = 0;                                                                                             // 343
                return function (f) {                                                                                  // 344
                    scheduled = f;                                                                                     // 345
                    node.data = (i ^= 1);                                                                              // 346
                };                                                                                                     // 347
            }                                                                                                          // 348
        });                                                                                                            // 349
    }(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
                                                                                                                       // 351
},{}],6:[function(require,module,exports){                                                                             // 352
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 353
    /** @author Brian Cavalier */                                                                                      // 354
    /** @author John Hann */                                                                                           // 355
                                                                                                                       // 356
    (function(define) { 'use strict';                                                                                  // 357
        define(function() {                                                                                            // 358
                                                                                                                       // 359
            return {                                                                                                   // 360
                formatError: formatError,                                                                              // 361
                formatObject: formatObject,                                                                            // 362
                tryStringify: tryStringify                                                                             // 363
            };                                                                                                         // 364
                                                                                                                       // 365
            /**                                                                                                        // 366
             * Format an error into a string.  If e is an Error and has a stack property,                              // 367
             * it's returned.  Otherwise, e is formatted using formatObject, with a                                    // 368
             * warning added about e not being a proper Error.                                                         // 369
             * @param {*} e                                                                                            // 370
             * @returns {String} formatted string, suitable for output to developers                                   // 371
             */                                                                                                        // 372
            function formatError(e) {                                                                                  // 373
                var s = typeof e === 'object' && e !== null && e.stack ? e.stack : formatObject(e);                    // 374
                return e instanceof Error ? s : s + ' (WARNING: non-Error used)';                                      // 375
            }                                                                                                          // 376
                                                                                                                       // 377
            /**                                                                                                        // 378
             * Format an object, detecting "plain" objects and running them through                                    // 379
             * JSON.stringify if possible.                                                                             // 380
             * @param {Object} o                                                                                       // 381
             * @returns {string}                                                                                       // 382
             */                                                                                                        // 383
            function formatObject(o) {                                                                                 // 384
                var s = String(o);                                                                                     // 385
                if(s === '[object Object]' && typeof JSON !== 'undefined') {                                           // 386
                    s = tryStringify(o, s);                                                                            // 387
                }                                                                                                      // 388
                return s;                                                                                              // 389
            }                                                                                                          // 390
                                                                                                                       // 391
            /**                                                                                                        // 392
             * Try to return the result of JSON.stringify(x).  If that fails, return                                   // 393
             * defaultValue                                                                                            // 394
             * @param {*} x                                                                                            // 395
             * @param {*} defaultValue                                                                                 // 396
             * @returns {String|*} JSON.stringify(x) or defaultValue                                                   // 397
             */                                                                                                        // 398
            function tryStringify(x, defaultValue) {                                                                   // 399
                try {                                                                                                  // 400
                    return JSON.stringify(x);                                                                          // 401
                } catch(e) {                                                                                           // 402
                    return defaultValue;                                                                               // 403
                }                                                                                                      // 404
            }                                                                                                          // 405
                                                                                                                       // 406
        });                                                                                                            // 407
    }(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));       // 408
                                                                                                                       // 409
},{}],7:[function(require,module,exports){                                                                             // 410
    /** @license MIT License (c) copyright 2010-2014 original author or authors */                                     // 411
    /** @author Brian Cavalier */                                                                                      // 412
    /** @author John Hann */                                                                                           // 413
                                                                                                                       // 414
    (function(define) { 'use strict';                                                                                  // 415
        define(function() {                                                                                            // 416
                                                                                                                       // 417
            return function makePromise(environment) {                                                                 // 418
                                                                                                                       // 419
                var tasks = environment.scheduler;                                                                     // 420
                var emitRejection = initEmitRejection();                                                               // 421
                                                                                                                       // 422
                var objectCreate = Object.create ||                                                                    // 423
                    function(proto) {                                                                                  // 424
                        function Child() {}                                                                            // 425
                        Child.prototype = proto;                                                                       // 426
                        return new Child();                                                                            // 427
                    };                                                                                                 // 428
                                                                                                                       // 429
                /**                                                                                                    // 430
                 * Create a promise whose fate is determined by resolver                                               // 431
                 * @constructor                                                                                        // 432
                 * @returns {Promise} promise                                                                          // 433
                 * @name Promise                                                                                       // 434
                 */                                                                                                    // 435
                function Promise(resolver, handler) {                                                                  // 436
                    this._handler = resolver === Handler ? handler : init(resolver);                                   // 437
                }                                                                                                      // 438
                                                                                                                       // 439
                /**                                                                                                    // 440
                 * Run the supplied resolver                                                                           // 441
                 * @param resolver                                                                                     // 442
                 * @returns {Pending}                                                                                  // 443
                 */                                                                                                    // 444
                function init(resolver) {                                                                              // 445
                    var handler = new Pending();                                                                       // 446
                                                                                                                       // 447
                    try {                                                                                              // 448
                        resolver(promiseResolve, promiseReject, promiseNotify);                                        // 449
                    } catch (e) {                                                                                      // 450
                        promiseReject(e);                                                                              // 451
                    }                                                                                                  // 452
                                                                                                                       // 453
                    return handler;                                                                                    // 454
                                                                                                                       // 455
                    /**                                                                                                // 456
                     * Transition from pre-resolution state to post-resolution state, notifying                        // 457
                     * all listeners of the ultimate fulfillment or rejection                                          // 458
                     * @param {*} x resolution value                                                                   // 459
                     */                                                                                                // 460
                    function promiseResolve (x) {                                                                      // 461
                        handler.resolve(x);                                                                            // 462
                    }                                                                                                  // 463
                    /**                                                                                                // 464
                     * Reject this promise with reason, which will be used verbatim                                    // 465
                     * @param {Error|*} reason rejection reason, strongly suggested                                    // 466
                     *   to be an Error type                                                                           // 467
                     */                                                                                                // 468
                    function promiseReject (reason) {                                                                  // 469
                        handler.reject(reason);                                                                        // 470
                    }                                                                                                  // 471
                                                                                                                       // 472
                    /**                                                                                                // 473
                     * @deprecated                                                                                     // 474
                     * Issue a progress event, notifying all progress listeners                                        // 475
                     * @param {*} x progress event payload to pass to all listeners                                    // 476
                     */                                                                                                // 477
                    function promiseNotify (x) {                                                                       // 478
                        handler.notify(x);                                                                             // 479
                    }                                                                                                  // 480
                }                                                                                                      // 481
                                                                                                                       // 482
                // Creation                                                                                            // 483
                                                                                                                       // 484
                Promise.resolve = resolve;                                                                             // 485
                Promise.reject = reject;                                                                               // 486
                Promise.never = never;                                                                                 // 487
                                                                                                                       // 488
                Promise._defer = defer;                                                                                // 489
                Promise._handler = getHandler;                                                                         // 490
                                                                                                                       // 491
                /**                                                                                                    // 492
                 * Returns a trusted promise. If x is already a trusted promise, it is                                 // 493
                 * returned, otherwise returns a new trusted Promise which follows x.                                  // 494
                 * @param  {*} x                                                                                       // 495
                 * @return {Promise} promise                                                                           // 496
                 */                                                                                                    // 497
                function resolve(x) {                                                                                  // 498
                    return isPromise(x) ? x                                                                            // 499
                        : new Promise(Handler, new Async(getHandler(x)));                                              // 500
                }                                                                                                      // 501
                                                                                                                       // 502
                /**                                                                                                    // 503
                 * Return a reject promise with x as its reason (x is used verbatim)                                   // 504
                 * @param {*} x                                                                                        // 505
                 * @returns {Promise} rejected promise                                                                 // 506
                 */                                                                                                    // 507
                function reject(x) {                                                                                   // 508
                    return new Promise(Handler, new Async(new Rejected(x)));                                           // 509
                }                                                                                                      // 510
                                                                                                                       // 511
                /**                                                                                                    // 512
                 * Return a promise that remains pending forever                                                       // 513
                 * @returns {Promise} forever-pending promise.                                                         // 514
                 */                                                                                                    // 515
                function never() {                                                                                     // 516
                    return foreverPendingPromise; // Should be frozen                                                  // 517
                }                                                                                                      // 518
                                                                                                                       // 519
                /**                                                                                                    // 520
                 * Creates an internal {promise, resolver} pair                                                        // 521
                 * @private                                                                                            // 522
                 * @returns {Promise}                                                                                  // 523
                 */                                                                                                    // 524
                function defer() {                                                                                     // 525
                    return new Promise(Handler, new Pending());                                                        // 526
                }                                                                                                      // 527
                                                                                                                       // 528
                // Transformation and flow control                                                                     // 529
                                                                                                                       // 530
                /**                                                                                                    // 531
                 * Transform this promise's fulfillment value, returning a new Promise                                 // 532
                 * for the transformed result.  If the promise cannot be fulfilled, onRejected                         // 533
                 * is called with the reason.  onProgress *may* be called with updates toward                          // 534
                 * this promise's fulfillment.                                                                         // 535
                 * @param {function=} onFulfilled fulfillment handler                                                  // 536
                 * @param {function=} onRejected rejection handler                                                     // 537
                 * @param {function=} onProgress @deprecated progress handler                                          // 538
                 * @return {Promise} new promise                                                                       // 539
                 */                                                                                                    // 540
                Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {                               // 541
                    var parent = this._handler;                                                                        // 542
                    var state = parent.join().state();                                                                 // 543
                                                                                                                       // 544
                    if ((typeof onFulfilled !== 'function' && state > 0) ||                                            // 545
                        (typeof onRejected !== 'function' && state < 0)) {                                             // 546
                        // Short circuit: value will not change, simply share handler                                  // 547
                        return new this.constructor(Handler, parent);                                                  // 548
                    }                                                                                                  // 549
                                                                                                                       // 550
                    var p = this._beget();                                                                             // 551
                    var child = p._handler;                                                                            // 552
                                                                                                                       // 553
                    parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);                         // 554
                                                                                                                       // 555
                    return p;                                                                                          // 556
                };                                                                                                     // 557
                                                                                                                       // 558
                /**                                                                                                    // 559
                 * If this promise cannot be fulfilled due to an error, call onRejected to                             // 560
                 * handle the error. Shortcut for .then(undefined, onRejected)                                         // 561
                 * @param {function?} onRejected                                                                       // 562
                 * @return {Promise}                                                                                   // 563
                 */                                                                                                    // 564
                Promise.prototype['catch'] = function(onRejected) {                                                    // 565
                    return this.then(void 0, onRejected);                                                              // 566
                };                                                                                                     // 567
                                                                                                                       // 568
                /**                                                                                                    // 569
                 * Creates a new, pending promise of the same type as this promise                                     // 570
                 * @private                                                                                            // 571
                 * @returns {Promise}                                                                                  // 572
                 */                                                                                                    // 573
                Promise.prototype._beget = function() {                                                                // 574
                    return begetFrom(this._handler, this.constructor);                                                 // 575
                };                                                                                                     // 576
                                                                                                                       // 577
                function begetFrom(parent, Promise) {                                                                  // 578
                    var child = new Pending(parent.receiver, parent.join().context);                                   // 579
                    return new Promise(Handler, child);                                                                // 580
                }                                                                                                      // 581
                                                                                                                       // 582
                // Array combinators                                                                                   // 583
                                                                                                                       // 584
                Promise.all = all;                                                                                     // 585
                Promise.race = race;                                                                                   // 586
                Promise._traverse = traverse;                                                                          // 587
                                                                                                                       // 588
                /**                                                                                                    // 589
                 * Return a promise that will fulfill when all promises in the                                         // 590
                 * input array have fulfilled, or will reject when one of the                                          // 591
                 * promises rejects.                                                                                   // 592
                 * @param {array} promises array of promises                                                           // 593
                 * @returns {Promise} promise for array of fulfillment values                                          // 594
                 */                                                                                                    // 595
                function all(promises) {                                                                               // 596
                    return traverseWith(snd, null, promises);                                                          // 597
                }                                                                                                      // 598
                                                                                                                       // 599
                /**                                                                                                    // 600
                 * Array<Promise<X>> -> Promise<Array<f(X)>>                                                           // 601
                 * @private                                                                                            // 602
                 * @param {function} f function to apply to each promise's value                                       // 603
                 * @param {Array} promises array of promises                                                           // 604
                 * @returns {Promise} promise for transformed values                                                   // 605
                 */                                                                                                    // 606
                function traverse(f, promises) {                                                                       // 607
                    return traverseWith(tryCatch2, f, promises);                                                       // 608
                }                                                                                                      // 609
                                                                                                                       // 610
                function traverseWith(tryMap, f, promises) {                                                           // 611
                    var handler = typeof f === 'function' ? mapAt : settleAt;                                          // 612
                                                                                                                       // 613
                    var resolver = new Pending();                                                                      // 614
                    var pending = promises.length >>> 0;                                                               // 615
                    var results = new Array(pending);                                                                  // 616
                                                                                                                       // 617
                    for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {                               // 618
                        x = promises[i];                                                                               // 619
                                                                                                                       // 620
                        if (x === void 0 && !(i in promises)) {                                                        // 621
                            --pending;                                                                                 // 622
                            continue;                                                                                  // 623
                        }                                                                                              // 624
                                                                                                                       // 625
                        traverseAt(promises, handler, i, x, resolver);                                                 // 626
                    }                                                                                                  // 627
                                                                                                                       // 628
                    if(pending === 0) {                                                                                // 629
                        resolver.become(new Fulfilled(results));                                                       // 630
                    }                                                                                                  // 631
                                                                                                                       // 632
                    return new Promise(Handler, resolver);                                                             // 633
                                                                                                                       // 634
                    function mapAt(i, x, resolver) {                                                                   // 635
                        if(!resolver.resolved) {                                                                       // 636
                            traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);                              // 637
                        }                                                                                              // 638
                    }                                                                                                  // 639
                                                                                                                       // 640
                    function settleAt(i, x, resolver) {                                                                // 641
                        results[i] = x;                                                                                // 642
                        if(--pending === 0) {                                                                          // 643
                            resolver.become(new Fulfilled(results));                                                   // 644
                        }                                                                                              // 645
                    }                                                                                                  // 646
                }                                                                                                      // 647
                                                                                                                       // 648
                function traverseAt(promises, handler, i, x, resolver) {                                               // 649
                    if (maybeThenable(x)) {                                                                            // 650
                        var h = getHandlerMaybeThenable(x);                                                            // 651
                        var s = h.state();                                                                             // 652
                                                                                                                       // 653
                        if (s === 0) {                                                                                 // 654
                            h.fold(handler, i, void 0, resolver);                                                      // 655
                        } else if (s > 0) {                                                                            // 656
                            handler(i, h.value, resolver);                                                             // 657
                        } else {                                                                                       // 658
                            resolver.become(h);                                                                        // 659
                            visitRemaining(promises, i+1, h);                                                          // 660
                        }                                                                                              // 661
                    } else {                                                                                           // 662
                        handler(i, x, resolver);                                                                       // 663
                    }                                                                                                  // 664
                }                                                                                                      // 665
                                                                                                                       // 666
                Promise._visitRemaining = visitRemaining;                                                              // 667
                function visitRemaining(promises, start, handler) {                                                    // 668
                    for(var i=start; i<promises.length; ++i) {                                                         // 669
                        markAsHandled(getHandler(promises[i]), handler);                                               // 670
                    }                                                                                                  // 671
                }                                                                                                      // 672
                                                                                                                       // 673
                function markAsHandled(h, handler) {                                                                   // 674
                    if(h === handler) {                                                                                // 675
                        return;                                                                                        // 676
                    }                                                                                                  // 677
                                                                                                                       // 678
                    var s = h.state();                                                                                 // 679
                    if(s === 0) {                                                                                      // 680
                        h.visit(h, void 0, h._unreport);                                                               // 681
                    } else if(s < 0) {                                                                                 // 682
                        h._unreport();                                                                                 // 683
                    }                                                                                                  // 684
                }                                                                                                      // 685
                                                                                                                       // 686
                /**                                                                                                    // 687
                 * Fulfill-reject competitive race. Return a promise that will settle                                  // 688
                 * to the same state as the earliest input promise to settle.                                          // 689
                 *                                                                                                     // 690
                 * WARNING: The ES6 Promise spec requires that race()ing an empty array                                // 691
                 * must return a promise that is pending forever.  This implementation                                 // 692
                 * returns a singleton forever-pending promise, the same singleton that is                             // 693
                 * returned by Promise.never(), thus can be checked with ===                                           // 694
                 *                                                                                                     // 695
                 * @param {array} promises array of promises to race                                                   // 696
                 * @returns {Promise} if input is non-empty, a promise that will settle                                // 697
                 * to the same outcome as the earliest input promise to settle. if empty                               // 698
                 * is empty, returns a promise that will never settle.                                                 // 699
                 */                                                                                                    // 700
                function race(promises) {                                                                              // 701
                    if(typeof promises !== 'object' || promises === null) {                                            // 702
                        return reject(new TypeError('non-iterable passed to race()'));                                 // 703
                    }                                                                                                  // 704
                                                                                                                       // 705
                    // Sigh, race([]) is untestable unless we return *something*                                       // 706
                    // that is recognizable without calling .then() on it.                                             // 707
                    return promises.length === 0 ? never()                                                             // 708
                        : promises.length === 1 ? resolve(promises[0])                                                 // 709
                        : runRace(promises);                                                                           // 710
                }                                                                                                      // 711
                                                                                                                       // 712
                function runRace(promises) {                                                                           // 713
                    var resolver = new Pending();                                                                      // 714
                    var i, x, h;                                                                                       // 715
                    for(i=0; i<promises.length; ++i) {                                                                 // 716
                        x = promises[i];                                                                               // 717
                        if (x === void 0 && !(i in promises)) {                                                        // 718
                            continue;                                                                                  // 719
                        }                                                                                              // 720
                                                                                                                       // 721
                        h = getHandler(x);                                                                             // 722
                        if(h.state() !== 0) {                                                                          // 723
                            resolver.become(h);                                                                        // 724
                            visitRemaining(promises, i+1, h);                                                          // 725
                            break;                                                                                     // 726
                        } else {                                                                                       // 727
                            h.visit(resolver, resolver.resolve, resolver.reject);                                      // 728
                        }                                                                                              // 729
                    }                                                                                                  // 730
                    return new Promise(Handler, resolver);                                                             // 731
                }                                                                                                      // 732
                                                                                                                       // 733
                // Promise internals                                                                                   // 734
                // Below this, everything is @private                                                                  // 735
                                                                                                                       // 736
                /**                                                                                                    // 737
                 * Get an appropriate handler for x, without checking for cycles                                       // 738
                 * @param {*} x                                                                                        // 739
                 * @returns {object} handler                                                                           // 740
                 */                                                                                                    // 741
                function getHandler(x) {                                                                               // 742
                    if(isPromise(x)) {                                                                                 // 743
                        return x._handler.join();                                                                      // 744
                    }                                                                                                  // 745
                    return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);                               // 746
                }                                                                                                      // 747
                                                                                                                       // 748
                /**                                                                                                    // 749
                 * Get a handler for thenable x.                                                                       // 750
                 * NOTE: You must only call this if maybeThenable(x) == true                                           // 751
                 * @param {object|function|Promise} x                                                                  // 752
                 * @returns {object} handler                                                                           // 753
                 */                                                                                                    // 754
                function getHandlerMaybeThenable(x) {                                                                  // 755
                    return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);                                  // 756
                }                                                                                                      // 757
                                                                                                                       // 758
                /**                                                                                                    // 759
                 * Get a handler for potentially untrusted thenable x                                                  // 760
                 * @param {*} x                                                                                        // 761
                 * @returns {object} handler                                                                           // 762
                 */                                                                                                    // 763
                function getHandlerUntrusted(x) {                                                                      // 764
                    try {                                                                                              // 765
                        var untrustedThen = x.then;                                                                    // 766
                        return typeof untrustedThen === 'function'                                                     // 767
                            ? new Thenable(untrustedThen, x)                                                           // 768
                            : new Fulfilled(x);                                                                        // 769
                    } catch(e) {                                                                                       // 770
                        return new Rejected(e);                                                                        // 771
                    }                                                                                                  // 772
                }                                                                                                      // 773
                                                                                                                       // 774
                /**                                                                                                    // 775
                 * Handler for a promise that is pending forever                                                       // 776
                 * @constructor                                                                                        // 777
                 */                                                                                                    // 778
                function Handler() {}                                                                                  // 779
                                                                                                                       // 780
                Handler.prototype.when                                                                                 // 781
                    = Handler.prototype.become                                                                         // 782
                    = Handler.prototype.notify // deprecated                                                           // 783
                    = Handler.prototype.fail                                                                           // 784
                    = Handler.prototype._unreport                                                                      // 785
                    = Handler.prototype._report                                                                        // 786
                    = noop;                                                                                            // 787
                                                                                                                       // 788
                Handler.prototype._state = 0;                                                                          // 789
                                                                                                                       // 790
                Handler.prototype.state = function() {                                                                 // 791
                    return this._state;                                                                                // 792
                };                                                                                                     // 793
                                                                                                                       // 794
                /**                                                                                                    // 795
                 * Recursively collapse handler chain to find the handler                                              // 796
                 * nearest to the fully resolved value.                                                                // 797
                 * @returns {object} handler nearest the fully resolved value                                          // 798
                 */                                                                                                    // 799
                Handler.prototype.join = function() {                                                                  // 800
                    var h = this;                                                                                      // 801
                    while(h.handler !== void 0) {                                                                      // 802
                        h = h.handler;                                                                                 // 803
                    }                                                                                                  // 804
                    return h;                                                                                          // 805
                };                                                                                                     // 806
                                                                                                                       // 807
                Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {                      // 808
                    this.when({                                                                                        // 809
                        resolver: to,                                                                                  // 810
                        receiver: receiver,                                                                            // 811
                        fulfilled: fulfilled,                                                                          // 812
                        rejected: rejected,                                                                            // 813
                        progress: progress                                                                             // 814
                    });                                                                                                // 815
                };                                                                                                     // 816
                                                                                                                       // 817
                Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {                          // 818
                    this.chain(failIfRejected, receiver, fulfilled, rejected, progress);                               // 819
                };                                                                                                     // 820
                                                                                                                       // 821
                Handler.prototype.fold = function(f, z, c, to) {                                                       // 822
                    this.when(new Fold(f, z, c, to));                                                                  // 823
                };                                                                                                     // 824
                                                                                                                       // 825
                /**                                                                                                    // 826
                 * Handler that invokes fail() on any handler it becomes                                               // 827
                 * @constructor                                                                                        // 828
                 */                                                                                                    // 829
                function FailIfRejected() {}                                                                           // 830
                                                                                                                       // 831
                inherit(Handler, FailIfRejected);                                                                      // 832
                                                                                                                       // 833
                FailIfRejected.prototype.become = function(h) {                                                        // 834
                    h.fail();                                                                                          // 835
                };                                                                                                     // 836
                                                                                                                       // 837
                var failIfRejected = new FailIfRejected();                                                             // 838
                                                                                                                       // 839
                /**                                                                                                    // 840
                 * Handler that manages a queue of consumers waiting on a pending promise                              // 841
                 * @constructor                                                                                        // 842
                 */                                                                                                    // 843
                function Pending(receiver, inheritedContext) {                                                         // 844
                    Promise.createContext(this, inheritedContext);                                                     // 845
                                                                                                                       // 846
                    this.consumers = void 0;                                                                           // 847
                    this.receiver = receiver;                                                                          // 848
                    this.handler = void 0;                                                                             // 849
                    this.resolved = false;                                                                             // 850
                }                                                                                                      // 851
                                                                                                                       // 852
                inherit(Handler, Pending);                                                                             // 853
                                                                                                                       // 854
                Pending.prototype._state = 0;                                                                          // 855
                                                                                                                       // 856
                Pending.prototype.resolve = function(x) {                                                              // 857
                    this.become(getHandler(x));                                                                        // 858
                };                                                                                                     // 859
                                                                                                                       // 860
                Pending.prototype.reject = function(x) {                                                               // 861
                    if(this.resolved) {                                                                                // 862
                        return;                                                                                        // 863
                    }                                                                                                  // 864
                                                                                                                       // 865
                    this.become(new Rejected(x));                                                                      // 866
                };                                                                                                     // 867
                                                                                                                       // 868
                Pending.prototype.join = function() {                                                                  // 869
                    if (!this.resolved) {                                                                              // 870
                        return this;                                                                                   // 871
                    }                                                                                                  // 872
                                                                                                                       // 873
                    var h = this;                                                                                      // 874
                                                                                                                       // 875
                    while (h.handler !== void 0) {                                                                     // 876
                        h = h.handler;                                                                                 // 877
                        if (h === this) {                                                                              // 878
                            return this.handler = cycle();                                                             // 879
                        }                                                                                              // 880
                    }                                                                                                  // 881
                                                                                                                       // 882
                    return h;                                                                                          // 883
                };                                                                                                     // 884
                                                                                                                       // 885
                Pending.prototype.run = function() {                                                                   // 886
                    var q = this.consumers;                                                                            // 887
                    var handler = this.handler;                                                                        // 888
                    this.handler = this.handler.join();                                                                // 889
                    this.consumers = void 0;                                                                           // 890
                                                                                                                       // 891
                    for (var i = 0; i < q.length; ++i) {                                                               // 892
                        handler.when(q[i]);                                                                            // 893
                    }                                                                                                  // 894
                };                                                                                                     // 895
                                                                                                                       // 896
                Pending.prototype.become = function(handler) {                                                         // 897
                    if(this.resolved) {                                                                                // 898
                        return;                                                                                        // 899
                    }                                                                                                  // 900
                                                                                                                       // 901
                    this.resolved = true;                                                                              // 902
                    this.handler = handler;                                                                            // 903
                    if(this.consumers !== void 0) {                                                                    // 904
                        tasks.enqueue(this);                                                                           // 905
                    }                                                                                                  // 906
                                                                                                                       // 907
                    if(this.context !== void 0) {                                                                      // 908
                        handler._report(this.context);                                                                 // 909
                    }                                                                                                  // 910
                };                                                                                                     // 911
                                                                                                                       // 912
                Pending.prototype.when = function(continuation) {                                                      // 913
                    if(this.resolved) {                                                                                // 914
                        tasks.enqueue(new ContinuationTask(continuation, this.handler));                               // 915
                    } else {                                                                                           // 916
                        if(this.consumers === void 0) {                                                                // 917
                            this.consumers = [continuation];                                                           // 918
                        } else {                                                                                       // 919
                            this.consumers.push(continuation);                                                         // 920
                        }                                                                                              // 921
                    }                                                                                                  // 922
                };                                                                                                     // 923
                                                                                                                       // 924
                /**                                                                                                    // 925
                 * @deprecated                                                                                         // 926
                 */                                                                                                    // 927
                Pending.prototype.notify = function(x) {                                                               // 928
                    if(!this.resolved) {                                                                               // 929
                        tasks.enqueue(new ProgressTask(x, this));                                                      // 930
                    }                                                                                                  // 931
                };                                                                                                     // 932
                                                                                                                       // 933
                Pending.prototype.fail = function(context) {                                                           // 934
                    var c = typeof context === 'undefined' ? this.context : context;                                   // 935
                    this.resolved && this.handler.join().fail(c);                                                      // 936
                };                                                                                                     // 937
                                                                                                                       // 938
                Pending.prototype._report = function(context) {                                                        // 939
                    this.resolved && this.handler.join()._report(context);                                             // 940
                };                                                                                                     // 941
                                                                                                                       // 942
                Pending.prototype._unreport = function() {                                                             // 943
                    this.resolved && this.handler.join()._unreport();                                                  // 944
                };                                                                                                     // 945
                                                                                                                       // 946
                /**                                                                                                    // 947
                 * Wrap another handler and force it into a future stack                                               // 948
                 * @param {object} handler                                                                             // 949
                 * @constructor                                                                                        // 950
                 */                                                                                                    // 951
                function Async(handler) {                                                                              // 952
                    this.handler = handler;                                                                            // 953
                }                                                                                                      // 954
                                                                                                                       // 955
                inherit(Handler, Async);                                                                               // 956
                                                                                                                       // 957
                Async.prototype.when = function(continuation) {                                                        // 958
                    tasks.enqueue(new ContinuationTask(continuation, this));                                           // 959
                };                                                                                                     // 960
                                                                                                                       // 961
                Async.prototype._report = function(context) {                                                          // 962
                    this.join()._report(context);                                                                      // 963
                };                                                                                                     // 964
                                                                                                                       // 965
                Async.prototype._unreport = function() {                                                               // 966
                    this.join()._unreport();                                                                           // 967
                };                                                                                                     // 968
                                                                                                                       // 969
                /**                                                                                                    // 970
                 * Handler that wraps an untrusted thenable and assimilates it in a future stack                       // 971
                 * @param {function} then                                                                              // 972
                 * @param {{then: function}} thenable                                                                  // 973
                 * @constructor                                                                                        // 974
                 */                                                                                                    // 975
                function Thenable(then, thenable) {                                                                    // 976
                    Pending.call(this);                                                                                // 977
                    tasks.enqueue(new AssimilateTask(then, thenable, this));                                           // 978
                }                                                                                                      // 979
                                                                                                                       // 980
                inherit(Pending, Thenable);                                                                            // 981
                                                                                                                       // 982
                /**                                                                                                    // 983
                 * Handler for a fulfilled promise                                                                     // 984
                 * @param {*} x fulfillment value                                                                      // 985
                 * @constructor                                                                                        // 986
                 */                                                                                                    // 987
                function Fulfilled(x) {                                                                                // 988
                    Promise.createContext(this);                                                                       // 989
                    this.value = x;                                                                                    // 990
                }                                                                                                      // 991
                                                                                                                       // 992
                inherit(Handler, Fulfilled);                                                                           // 993
                                                                                                                       // 994
                Fulfilled.prototype._state = 1;                                                                        // 995
                                                                                                                       // 996
                Fulfilled.prototype.fold = function(f, z, c, to) {                                                     // 997
                    runContinuation3(f, z, this, c, to);                                                               // 998
                };                                                                                                     // 999
                                                                                                                       // 1000
                Fulfilled.prototype.when = function(cont) {                                                            // 1001
                    runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);                              // 1002
                };                                                                                                     // 1003
                                                                                                                       // 1004
                var errorId = 0;                                                                                       // 1005
                                                                                                                       // 1006
                /**                                                                                                    // 1007
                 * Handler for a rejected promise                                                                      // 1008
                 * @param {*} x rejection reason                                                                       // 1009
                 * @constructor                                                                                        // 1010
                 */                                                                                                    // 1011
                function Rejected(x) {                                                                                 // 1012
                    Promise.createContext(this);                                                                       // 1013
                                                                                                                       // 1014
                    this.id = ++errorId;                                                                               // 1015
                    this.value = x;                                                                                    // 1016
                    this.handled = false;                                                                              // 1017
                    this.reported = false;                                                                             // 1018
                                                                                                                       // 1019
                    this._report();                                                                                    // 1020
                }                                                                                                      // 1021
                                                                                                                       // 1022
                inherit(Handler, Rejected);                                                                            // 1023
                                                                                                                       // 1024
                Rejected.prototype._state = -1;                                                                        // 1025
                                                                                                                       // 1026
                Rejected.prototype.fold = function(f, z, c, to) {                                                      // 1027
                    to.become(this);                                                                                   // 1028
                };                                                                                                     // 1029
                                                                                                                       // 1030
                Rejected.prototype.when = function(cont) {                                                             // 1031
                    if(typeof cont.rejected === 'function') {                                                          // 1032
                        this._unreport();                                                                              // 1033
                    }                                                                                                  // 1034
                    runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);                               // 1035
                };                                                                                                     // 1036
                                                                                                                       // 1037
                Rejected.prototype._report = function(context) {                                                       // 1038
                    tasks.afterQueue(new ReportTask(this, context));                                                   // 1039
                };                                                                                                     // 1040
                                                                                                                       // 1041
                Rejected.prototype._unreport = function() {                                                            // 1042
                    if(this.handled) {                                                                                 // 1043
                        return;                                                                                        // 1044
                    }                                                                                                  // 1045
                    this.handled = true;                                                                               // 1046
                    tasks.afterQueue(new UnreportTask(this));                                                          // 1047
                };                                                                                                     // 1048
                                                                                                                       // 1049
                Rejected.prototype.fail = function(context) {                                                          // 1050
                    this.reported = true;                                                                              // 1051
                    emitRejection('unhandledRejection', this);                                                         // 1052
                    Promise.onFatalRejection(this, context === void 0 ? this.context : context);                       // 1053
                };                                                                                                     // 1054
                                                                                                                       // 1055
                function ReportTask(rejection, context) {                                                              // 1056
                    this.rejection = rejection;                                                                        // 1057
                    this.context = context;                                                                            // 1058
                }                                                                                                      // 1059
                                                                                                                       // 1060
                ReportTask.prototype.run = function() {                                                                // 1061
                    if(!this.rejection.handled && !this.rejection.reported) {                                          // 1062
                        this.rejection.reported = true;                                                                // 1063
                        emitRejection('unhandledRejection', this.rejection) ||                                         // 1064
                        Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);                         // 1065
                    }                                                                                                  // 1066
                };                                                                                                     // 1067
                                                                                                                       // 1068
                function UnreportTask(rejection) {                                                                     // 1069
                    this.rejection = rejection;                                                                        // 1070
                }                                                                                                      // 1071
                                                                                                                       // 1072
                UnreportTask.prototype.run = function() {                                                              // 1073
                    if(this.rejection.reported) {                                                                      // 1074
                        emitRejection('rejectionHandled', this.rejection) ||                                           // 1075
                        Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);                                // 1076
                    }                                                                                                  // 1077
                };                                                                                                     // 1078
                                                                                                                       // 1079
                // Unhandled rejection hooks                                                                           // 1080
                // By default, everything is a noop                                                                    // 1081
                                                                                                                       // 1082
                Promise.createContext                                                                                  // 1083
                    = Promise.enterContext                                                                             // 1084
                    = Promise.exitContext                                                                              // 1085
                    = Promise.onPotentiallyUnhandledRejection                                                          // 1086
                    = Promise.onPotentiallyUnhandledRejectionHandled                                                   // 1087
                    = Promise.onFatalRejection                                                                         // 1088
                    = noop;                                                                                            // 1089
                                                                                                                       // 1090
                // Errors and singletons                                                                               // 1091
                                                                                                                       // 1092
                var foreverPendingHandler = new Handler();                                                             // 1093
                var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);                               // 1094
                                                                                                                       // 1095
                function cycle() {                                                                                     // 1096
                    return new Rejected(new TypeError('Promise cycle'));                                               // 1097
                }                                                                                                      // 1098
                                                                                                                       // 1099
                // Task runners                                                                                        // 1100
                                                                                                                       // 1101
                /**                                                                                                    // 1102
                 * Run a single consumer                                                                               // 1103
                 * @constructor                                                                                        // 1104
                 */                                                                                                    // 1105
                function ContinuationTask(continuation, handler) {                                                     // 1106
                    this.continuation = continuation;                                                                  // 1107
                    this.handler = handler;                                                                            // 1108
                }                                                                                                      // 1109
                                                                                                                       // 1110
                ContinuationTask.prototype.run = function() {                                                          // 1111
                    this.handler.join().when(this.continuation);                                                       // 1112
                };                                                                                                     // 1113
                                                                                                                       // 1114
                /**                                                                                                    // 1115
                 * Run a queue of progress handlers                                                                    // 1116
                 * @constructor                                                                                        // 1117
                 */                                                                                                    // 1118
                function ProgressTask(value, handler) {                                                                // 1119
                    this.handler = handler;                                                                            // 1120
                    this.value = value;                                                                                // 1121
                }                                                                                                      // 1122
                                                                                                                       // 1123
                ProgressTask.prototype.run = function() {                                                              // 1124
                    var q = this.handler.consumers;                                                                    // 1125
                    if(q === void 0) {                                                                                 // 1126
                        return;                                                                                        // 1127
                    }                                                                                                  // 1128
                                                                                                                       // 1129
                    for (var c, i = 0; i < q.length; ++i) {                                                            // 1130
                        c = q[i];                                                                                      // 1131
                        runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);                       // 1132
                    }                                                                                                  // 1133
                };                                                                                                     // 1134
                                                                                                                       // 1135
                /**                                                                                                    // 1136
                 * Assimilate a thenable, sending it's value to resolver                                               // 1137
                 * @param {function} then                                                                              // 1138
                 * @param {object|function} thenable                                                                   // 1139
                 * @param {object} resolver                                                                            // 1140
                 * @constructor                                                                                        // 1141
                 */                                                                                                    // 1142
                function AssimilateTask(then, thenable, resolver) {                                                    // 1143
                    this._then = then;                                                                                 // 1144
                    this.thenable = thenable;                                                                          // 1145
                    this.resolver = resolver;                                                                          // 1146
                }                                                                                                      // 1147
                                                                                                                       // 1148
                AssimilateTask.prototype.run = function() {                                                            // 1149
                    var h = this.resolver;                                                                             // 1150
                    tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);                              // 1151
                                                                                                                       // 1152
                    function _resolve(x) { h.resolve(x); }                                                             // 1153
                    function _reject(x)  { h.reject(x); }                                                              // 1154
                    function _notify(x)  { h.notify(x); }                                                              // 1155
                };                                                                                                     // 1156
                                                                                                                       // 1157
                function tryAssimilate(then, thenable, resolve, reject, notify) {                                      // 1158
                    try {                                                                                              // 1159
                        then.call(thenable, resolve, reject, notify);                                                  // 1160
                    } catch (e) {                                                                                      // 1161
                        reject(e);                                                                                     // 1162
                    }                                                                                                  // 1163
                }                                                                                                      // 1164
                                                                                                                       // 1165
                /**                                                                                                    // 1166
                 * Fold a handler value with z                                                                         // 1167
                 * @constructor                                                                                        // 1168
                 */                                                                                                    // 1169
                function Fold(f, z, c, to) {                                                                           // 1170
                    this.f = f; this.z = z; this.c = c; this.to = to;                                                  // 1171
                    this.resolver = failIfRejected;                                                                    // 1172
                    this.receiver = this;                                                                              // 1173
                }                                                                                                      // 1174
                                                                                                                       // 1175
                Fold.prototype.fulfilled = function(x) {                                                               // 1176
                    this.f.call(this.c, this.z, x, this.to);                                                           // 1177
                };                                                                                                     // 1178
                                                                                                                       // 1179
                Fold.prototype.rejected = function(x) {                                                                // 1180
                    this.to.reject(x);                                                                                 // 1181
                };                                                                                                     // 1182
                                                                                                                       // 1183
                Fold.prototype.progress = function(x) {                                                                // 1184
                    this.to.notify(x);                                                                                 // 1185
                };                                                                                                     // 1186
                                                                                                                       // 1187
                // Other helpers                                                                                       // 1188
                                                                                                                       // 1189
                /**                                                                                                    // 1190
                 * @param {*} x                                                                                        // 1191
                 * @returns {boolean} true iff x is a trusted Promise                                                  // 1192
                 */                                                                                                    // 1193
                function isPromise(x) {                                                                                // 1194
                    return x instanceof Promise;                                                                       // 1195
                }                                                                                                      // 1196
                                                                                                                       // 1197
                /**                                                                                                    // 1198
                 * Test just enough to rule out primitives, in order to take faster                                    // 1199
                 * paths in some code                                                                                  // 1200
                 * @param {*} x                                                                                        // 1201
                 * @returns {boolean} false iff x is guaranteed *not* to be a thenable                                 // 1202
                 */                                                                                                    // 1203
                function maybeThenable(x) {                                                                            // 1204
                    return (typeof x === 'object' || typeof x === 'function') && x !== null;                           // 1205
                }                                                                                                      // 1206
                                                                                                                       // 1207
                function runContinuation1(f, h, receiver, next) {                                                      // 1208
                    if(typeof f !== 'function') {                                                                      // 1209
                        return next.become(h);                                                                         // 1210
                    }                                                                                                  // 1211
                                                                                                                       // 1212
                    Promise.enterContext(h);                                                                           // 1213
                    tryCatchReject(f, h.value, receiver, next);                                                        // 1214
                    Promise.exitContext();                                                                             // 1215
                }                                                                                                      // 1216
                                                                                                                       // 1217
                function runContinuation3(f, x, h, receiver, next) {                                                   // 1218
                    if(typeof f !== 'function') {                                                                      // 1219
                        return next.become(h);                                                                         // 1220
                    }                                                                                                  // 1221
                                                                                                                       // 1222
                    Promise.enterContext(h);                                                                           // 1223
                    tryCatchReject3(f, x, h.value, receiver, next);                                                    // 1224
                    Promise.exitContext();                                                                             // 1225
                }                                                                                                      // 1226
                                                                                                                       // 1227
                /**                                                                                                    // 1228
                 * @deprecated                                                                                         // 1229
                 */                                                                                                    // 1230
                function runNotify(f, x, h, receiver, next) {                                                          // 1231
                    if(typeof f !== 'function') {                                                                      // 1232
                        return next.notify(x);                                                                         // 1233
                    }                                                                                                  // 1234
                                                                                                                       // 1235
                    Promise.enterContext(h);                                                                           // 1236
                    tryCatchReturn(f, x, receiver, next);                                                              // 1237
                    Promise.exitContext();                                                                             // 1238
                }                                                                                                      // 1239
                                                                                                                       // 1240
                function tryCatch2(f, a, b) {                                                                          // 1241
                    try {                                                                                              // 1242
                        return f(a, b);                                                                                // 1243
                    } catch(e) {                                                                                       // 1244
                        return reject(e);                                                                              // 1245
                    }                                                                                                  // 1246
                }                                                                                                      // 1247
                                                                                                                       // 1248
                /**                                                                                                    // 1249
                 * Return f.call(thisArg, x), or if it throws return a rejected promise for                            // 1250
                 * the thrown exception                                                                                // 1251
                 */                                                                                                    // 1252
                function tryCatchReject(f, x, thisArg, next) {                                                         // 1253
                    try {                                                                                              // 1254
                        next.become(getHandler(f.call(thisArg, x)));                                                   // 1255
                    } catch(e) {                                                                                       // 1256
                        next.become(new Rejected(e));                                                                  // 1257
                    }                                                                                                  // 1258
                }                                                                                                      // 1259
                                                                                                                       // 1260
                /**                                                                                                    // 1261
                 * Same as above, but includes the extra argument parameter.                                           // 1262
                 */                                                                                                    // 1263
                function tryCatchReject3(f, x, y, thisArg, next) {                                                     // 1264
                    try {                                                                                              // 1265
                        f.call(thisArg, x, y, next);                                                                   // 1266
                    } catch(e) {                                                                                       // 1267
                        next.become(new Rejected(e));                                                                  // 1268
                    }                                                                                                  // 1269
                }                                                                                                      // 1270
                                                                                                                       // 1271
                /**                                                                                                    // 1272
                 * @deprecated                                                                                         // 1273
                 * Return f.call(thisArg, x), or if it throws, *return* the exception                                  // 1274
                 */                                                                                                    // 1275
                function tryCatchReturn(f, x, thisArg, next) {                                                         // 1276
                    try {                                                                                              // 1277
                        next.notify(f.call(thisArg, x));                                                               // 1278
                    } catch(e) {                                                                                       // 1279
                        next.notify(e);                                                                                // 1280
                    }                                                                                                  // 1281
                }                                                                                                      // 1282
                                                                                                                       // 1283
                function inherit(Parent, Child) {                                                                      // 1284
                    Child.prototype = objectCreate(Parent.prototype);                                                  // 1285
                    Child.prototype.constructor = Child;                                                               // 1286
                }                                                                                                      // 1287
                                                                                                                       // 1288
                function snd(x, y) {                                                                                   // 1289
                    return y;                                                                                          // 1290
                }                                                                                                      // 1291
                                                                                                                       // 1292
                function noop() {}                                                                                     // 1293
                                                                                                                       // 1294
                function initEmitRejection() {                                                                         // 1295
                    /*global process, self, CustomEvent*/                                                              // 1296
                    if(typeof process !== 'undefined' && process !== null                                              // 1297
                        && typeof process.emit === 'function') {                                                       // 1298
                        // Returning falsy here means to call the default                                              // 1299
                        // onPotentiallyUnhandledRejection API.  This is safe even in                                  // 1300
                        // browserify since process.emit always returns falsy in browserify:                           // 1301
                        // https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46                // 1302
                        return function(type, rejection) {                                                             // 1303
                            return type === 'unhandledRejection'                                                       // 1304
                                ? process.emit(type, rejection.value, rejection)                                       // 1305
                                : process.emit(type, rejection);                                                       // 1306
                        };                                                                                             // 1307
                    } else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {                      // 1308
                        return (function(noop, self, CustomEvent) {                                                    // 1309
                            var hasCustomEvent = false;                                                                // 1310
                            try {                                                                                      // 1311
                                var ev = new CustomEvent('unhandledRejection');                                        // 1312
                                hasCustomEvent = ev instanceof CustomEvent;                                            // 1313
                            } catch (e) {}                                                                             // 1314
                                                                                                                       // 1315
                            return !hasCustomEvent ? noop : function(type, rejection) {                                // 1316
                                var ev = new CustomEvent(type, {                                                       // 1317
                                    detail: {                                                                          // 1318
                                        reason: rejection.value,                                                       // 1319
                                        key: rejection                                                                 // 1320
                                    },                                                                                 // 1321
                                    bubbles: false,                                                                    // 1322
                                    cancelable: true                                                                   // 1323
                                });                                                                                    // 1324
                                                                                                                       // 1325
                                return !self.dispatchEvent(ev);                                                        // 1326
                            };                                                                                         // 1327
                        }(noop, self, CustomEvent));                                                                   // 1328
                    }                                                                                                  // 1329
                                                                                                                       // 1330
                    return noop;                                                                                       // 1331
                }                                                                                                      // 1332
                                                                                                                       // 1333
                return Promise;                                                                                        // 1334
            };                                                                                                         // 1335
        });                                                                                                            // 1336
    }(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));       // 1337
                                                                                                                       // 1338
},{}]},{},[1])                                                                                                         // 1339
(1)                                                                                                                    // 1340
});                                                                                                                    // 1341
;if (typeof systemJSBootstrap !== 'undefined')                                                                         // 1342
    systemJSBootstrap();                                                                                               // 1343
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1371
}).call(this);                                                       // 1372
                                                                     // 1373
                                                                     // 1374
                                                                     // 1375
                                                                     // 1376
                                                                     // 1377
                                                                     // 1378
(function () {                                                       // 1379
                                                                     // 1380
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:modules/vendor/system.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * SystemJS v0.18.4                                                                                                    // 2
 */                                                                                                                    // 3
(function() {                                                                                                          // 4
    function bootstrap() {(function(__global) {                                                                        // 5
                                                                                                                       // 6
        var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
        var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';                                // 8
        var isWindows = typeof process != 'undefined' && !!process.platform.match(/^win/);                             // 9
                                                                                                                       // 10
        if (!__global.console)                                                                                         // 11
            __global.console = { assert: function() {} };                                                              // 12
                                                                                                                       // 13
        // IE8 support                                                                                                 // 14
        var indexOf = Array.prototype.indexOf || function(item) {                                                      // 15
                for (var i = 0, thisLen = this.length; i < thisLen; i++) {                                             // 16
                    if (this[i] === item) {                                                                            // 17
                        return i;                                                                                      // 18
                    }                                                                                                  // 19
                }                                                                                                      // 20
                return -1;                                                                                             // 21
            };                                                                                                         // 22
                                                                                                                       // 23
        var defineProperty;                                                                                            // 24
        (function () {                                                                                                 // 25
            try {                                                                                                      // 26
                if (!!Object.defineProperty({}, 'a', {}))                                                              // 27
                    defineProperty = Object.defineProperty;                                                            // 28
            }                                                                                                          // 29
            catch (e) {                                                                                                // 30
                defineProperty = function(obj, prop, opt) {                                                            // 31
                    try {                                                                                              // 32
                        obj[prop] = opt.value || opt.get.call(obj);                                                    // 33
                    }                                                                                                  // 34
                    catch(e) {}                                                                                        // 35
                }                                                                                                      // 36
            }                                                                                                          // 37
        })();                                                                                                          // 38
                                                                                                                       // 39
        function addToError(err, msg) {                                                                                // 40
            var newErr;                                                                                                // 41
            if (err instanceof Error) {                                                                                // 42
                var newErr = new Error(err.message, err.fileName, err.lineNumber);                                     // 43
                if (isBrowser) {                                                                                       // 44
                    newErr.message = err.message + '\n\t' + msg;                                                       // 45
                    newErr.stack = err.stack;                                                                          // 46
                }                                                                                                      // 47
                else {                                                                                                 // 48
                    // node errors only look correct with the stack modified                                           // 49
                    newErr.message = err.message;                                                                      // 50
                    newErr.stack = err.stack + '\n\t' + msg;                                                           // 51
                }                                                                                                      // 52
            }                                                                                                          // 53
            else {                                                                                                     // 54
                newErr = err + '\n\t' + msg;                                                                           // 55
            }                                                                                                          // 56
                                                                                                                       // 57
            return newErr;                                                                                             // 58
        }                                                                                                              // 59
                                                                                                                       // 60
        function __eval(source, debugName, context) {                                                                  // 61
            try {                                                                                                      // 62
                new Function(source).call(context);                                                                    // 63
            }                                                                                                          // 64
            catch(e) {                                                                                                 // 65
                throw addToError(e, 'Evaluating ' + debugName);                                                        // 66
            }                                                                                                          // 67
        }                                                                                                              // 68
                                                                                                                       // 69
        var baseURI;                                                                                                   // 70
        // environent baseURI detection                                                                                // 71
        if (typeof document != 'undefined' && document.getElementsByTagName) {                                         // 72
            baseURI = document.baseURI;                                                                                // 73
                                                                                                                       // 74
            if (!baseURI) {                                                                                            // 75
                var bases = document.getElementsByTagName('base');                                                     // 76
                baseURI = bases[0] && bases[0].href || window.location.href;                                           // 77
            }                                                                                                          // 78
                                                                                                                       // 79
            // sanitize out the hash and querystring                                                                   // 80
            baseURI = baseURI.split('#')[0].split('?')[0];                                                             // 81
            baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);                                                 // 82
        }                                                                                                              // 83
        else if (typeof process != 'undefined' && process.cwd) {                                                       // 84
            baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';                                        // 85
            if (isWindows)                                                                                             // 86
                baseURI = baseURI.replace(/\\/g, '/');                                                                 // 87
        }                                                                                                              // 88
        else if (typeof location != 'undefined') {                                                                     // 89
            baseURI = __global.location.href;                                                                          // 90
        }                                                                                                              // 91
        else {                                                                                                         // 92
            throw new TypeError('No environment baseURI');                                                             // 93
        }                                                                                                              // 94
                                                                                                                       // 95
        var URL = __global.URLPolyfill || __global.URL;                                                                // 96
        /*                                                                                                             // 97
         *********************************************************************************************                 // 98
                                                                                                                       // 99
         Dynamic Module Loader Polyfill                                                                                // 100
                                                                                                                       // 101
         - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15                     // 102
         http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27               // 103
                                                                                                                       // 104
         - Functions are commented with their spec numbers, with spec differences commented.                           // 105
                                                                                                                       // 106
         - Spec bugs are commented in this code with links.                                                            // 107
                                                                                                                       // 108
         - Abstract functions have been combined where possible, and their associated functions                        // 109
         commented.                                                                                                    // 110
                                                                                                                       // 111
         - Realm implementation is entirely omitted.                                                                   // 112
                                                                                                                       // 113
         *********************************************************************************************                 // 114
         */                                                                                                            // 115
                                                                                                                       // 116
        function Module() {}                                                                                           // 117
        function Loader(options) {                                                                                     // 118
            this._loader = {                                                                                           // 119
                loaderObj: this,                                                                                       // 120
                loads: [],                                                                                             // 121
                modules: {},                                                                                           // 122
                importPromises: {},                                                                                    // 123
                moduleRecords: {}                                                                                      // 124
            };                                                                                                         // 125
                                                                                                                       // 126
            // 26.3.3.6                                                                                                // 127
            defineProperty(this, 'global', {                                                                           // 128
                get: function() {                                                                                      // 129
                    return __global;                                                                                   // 130
                }                                                                                                      // 131
            });                                                                                                        // 132
                                                                                                                       // 133
            // 26.3.3.13 realm not implemented                                                                         // 134
        }                                                                                                              // 135
                                                                                                                       // 136
        (function() {                                                                                                  // 137
                                                                                                                       // 138
// Some Helpers                                                                                                        // 139
                                                                                                                       // 140
// logs a linkset snapshot for debugging                                                                               // 141
            /* function snapshot(loader) {                                                                             // 142
             console.log('---Snapshot---');                                                                            // 143
             for (var i = 0; i < loader.loads.length; i++) {                                                           // 144
             var load = loader.loads[i];                                                                               // 145
             var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';                                           // 146
                                                                                                                       // 147
             for (var j = 0; j < load.linkSets.length; j++) {                                                          // 148
             linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';                                              // 149
             }                                                                                                         // 150
             console.log(linkSetLog);                                                                                  // 151
             }                                                                                                         // 152
             console.log('');                                                                                          // 153
             }                                                                                                         // 154
             function logloads(loads) {                                                                                // 155
             var log = '';                                                                                             // 156
             for (var k = 0; k < loads.length; k++)                                                                    // 157
             log += loads[k].name + (k != loads.length - 1 ? ' ' : '');                                                // 158
             return log;                                                                                               // 159
             } */                                                                                                      // 160
                                                                                                                       // 161
                                                                                                                       // 162
            /* function checkInvariants() {                                                                            // 163
             // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1                                                // 164
                                                                                                                       // 165
             var loads = System._loader.loads;                                                                         // 166
             var linkSets = [];                                                                                        // 167
                                                                                                                       // 168
             for (var i = 0; i < loads.length; i++) {                                                                  // 169
             var load = loads[i];                                                                                      // 170
             console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');    // 171
                                                                                                                       // 172
             for (var j = 0; j < load.linkSets.length; j++) {                                                          // 173
             var linkSet = load.linkSets[j];                                                                           // 174
                                                                                                                       // 175
             for (var k = 0; k < linkSet.loads.length; k++)                                                            // 176
             console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');      // 177
                                                                                                                       // 178
             if (linkSets.indexOf(linkSet) == -1)                                                                      // 179
             linkSets.push(linkSet);                                                                                   // 180
             }                                                                                                         // 181
             }                                                                                                         // 182
                                                                                                                       // 183
             for (var i = 0; i < loads.length; i++) {                                                                  // 184
             var load = loads[i];                                                                                      // 185
             for (var j = 0; j < linkSets.length; j++) {                                                               // 186
             var linkSet = linkSets[j];                                                                                // 187
                                                                                                                       // 188
             if (linkSet.loads.indexOf(load) != -1)                                                                    // 189
             console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');   // 190
                                                                                                                       // 191
             if (load.linkSets.indexOf(linkSet) != -1)                                                                 // 192
             console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');      // 193
             }                                                                                                         // 194
             }                                                                                                         // 195
                                                                                                                       // 196
             for (var i = 0; i < linkSets.length; i++) {                                                               // 197
             var linkSet = linkSets[i];                                                                                // 198
             for (var j = 0; j < linkSet.loads.length; j++) {                                                          // 199
             var load = linkSet.loads[j];                                                                              // 200
                                                                                                                       // 201
             for (var k = 0; k < load.dependencies.length; k++) {                                                      // 202
             var depName = load.dependencies[k].value;                                                                 // 203
             var depLoad;                                                                                              // 204
             for (var l = 0; l < loads.length; l++) {                                                                  // 205
             if (loads[l].name != depName)                                                                             // 206
             continue;                                                                                                 // 207
             depLoad = loads[l];                                                                                       // 208
             break;                                                                                                    // 209
             }                                                                                                         // 210
                                                                                                                       // 211
             // loading records are allowed not to have their dependencies yet                                         // 212
             // if (load.status != 'loading')                                                                          // 213
             //  console.assert(depLoad, 'depLoad found');                                                             // 214
                                                                                                                       // 215
             // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');             // 216
             }                                                                                                         // 217
             }                                                                                                         // 218
             }                                                                                                         // 219
             } */                                                                                                      // 220
                                                                                                                       // 221
            // 15.2.3 - Runtime Semantics: Loader State                                                                // 222
                                                                                                                       // 223
            // 15.2.3.11                                                                                               // 224
            function createLoaderLoad(object) {                                                                        // 225
                return {                                                                                               // 226
                    // modules is an object for ES5 implementation                                                     // 227
                    modules: {},                                                                                       // 228
                    loads: [],                                                                                         // 229
                    loaderObj: object                                                                                  // 230
                };                                                                                                     // 231
            }                                                                                                          // 232
                                                                                                                       // 233
            // 15.2.3.2 Load Records and LoadRequest Objects                                                           // 234
                                                                                                                       // 235
            // 15.2.3.2.1                                                                                              // 236
            function createLoad(name) {                                                                                // 237
                return {                                                                                               // 238
                    status: 'loading',                                                                                 // 239
                    name: name,                                                                                        // 240
                    linkSets: [],                                                                                      // 241
                    dependencies: [],                                                                                  // 242
                    metadata: {}                                                                                       // 243
                };                                                                                                     // 244
            }                                                                                                          // 245
                                                                                                                       // 246
            // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions                                     // 247
                                                                                                                       // 248
            // 15.2.4                                                                                                  // 249
                                                                                                                       // 250
            // 15.2.4.1                                                                                                // 251
            function loadModule(loader, name, options) {                                                               // 252
                return new Promise(asyncStartLoadPartwayThrough({                                                      // 253
                    step: options.address ? 'fetch' : 'locate',                                                        // 254
                    loader: loader,                                                                                    // 255
                    moduleName: name,                                                                                  // 256
                    // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091                      // 257
                    moduleMetadata: options && options.metadata || {},                                                 // 258
                    moduleSource: options.source,                                                                      // 259
                    moduleAddress: options.address                                                                     // 260
                }));                                                                                                   // 261
            }                                                                                                          // 262
                                                                                                                       // 263
            // 15.2.4.2                                                                                                // 264
            function requestLoad(loader, request, refererName, refererAddress) {                                       // 265
                // 15.2.4.2.1 CallNormalize                                                                            // 266
                return new Promise(function(resolve, reject) {                                                         // 267
                    resolve(loader.loaderObj.normalize(request, refererName, refererAddress));                         // 268
                })                                                                                                     // 269
                    // 15.2.4.2.2 GetOrCreateLoad                                                                      // 270
                    .then(function(name) {                                                                             // 271
                        var load;                                                                                      // 272
                        if (loader.modules[name]) {                                                                    // 273
                            load = createLoad(name);                                                                   // 274
                            load.status = 'linked';                                                                    // 275
                            // https://bugs.ecmascript.org/show_bug.cgi?id=2795                                        // 276
                            load.module = loader.modules[name];                                                        // 277
                            return load;                                                                               // 278
                        }                                                                                              // 279
                                                                                                                       // 280
                        for (var i = 0, l = loader.loads.length; i < l; i++) {                                         // 281
                            load = loader.loads[i];                                                                    // 282
                            if (load.name != name)                                                                     // 283
                                continue;                                                                              // 284
                            console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');  // 285
                            return load;                                                                               // 286
                        }                                                                                              // 287
                                                                                                                       // 288
                        load = createLoad(name);                                                                       // 289
                        loader.loads.push(load);                                                                       // 290
                                                                                                                       // 291
                        proceedToLocate(loader, load);                                                                 // 292
                                                                                                                       // 293
                        return load;                                                                                   // 294
                    });                                                                                                // 295
            }                                                                                                          // 296
                                                                                                                       // 297
            // 15.2.4.3                                                                                                // 298
            function proceedToLocate(loader, load) {                                                                   // 299
                proceedToFetch(loader, load,                                                                           // 300
                    Promise.resolve()                                                                                  // 301
                        // 15.2.4.3.1 CallLocate                                                                       // 302
                        .then(function() {                                                                             // 303
                            return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });              // 304
                        })                                                                                             // 305
                );                                                                                                     // 306
            }                                                                                                          // 307
                                                                                                                       // 308
            // 15.2.4.4                                                                                                // 309
            function proceedToFetch(loader, load, p) {                                                                 // 310
                proceedToTranslate(loader, load,                                                                       // 311
                    p                                                                                                  // 312
                        // 15.2.4.4.1 CallFetch                                                                        // 313
                        .then(function(address) {                                                                      // 314
                            // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602                          // 315
                            if (load.status != 'loading')                                                              // 316
                                return;                                                                                // 317
                            load.address = address;                                                                    // 318
                                                                                                                       // 319
                            return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
                        })                                                                                             // 321
                );                                                                                                     // 322
            }                                                                                                          // 323
                                                                                                                       // 324
            var anonCnt = 0;                                                                                           // 325
                                                                                                                       // 326
            // 15.2.4.5                                                                                                // 327
            function proceedToTranslate(loader, load, p) {                                                             // 328
                p                                                                                                      // 329
                    // 15.2.4.5.1 CallTranslate                                                                        // 330
                    .then(function(source) {                                                                           // 331
                        if (load.status != 'loading')                                                                  // 332
                            return;                                                                                    // 333
                                                                                                                       // 334
                        return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))
                                                                                                                       // 336
                            // 15.2.4.5.2 CallInstantiate                                                              // 337
                            .then(function(source) {                                                                   // 338
                                load.source = source;                                                                  // 339
                                return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
                            })                                                                                         // 341
                                                                                                                       // 342
                            // 15.2.4.5.3 InstantiateSucceeded                                                         // 343
                            .then(function(instantiateResult) {                                                        // 344
                                if (instantiateResult === undefined) {                                                 // 345
                                    load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';             // 346
                                                                                                                       // 347
                                    // instead of load.kind, use load.isDeclarative                                    // 348
                                    load.isDeclarative = true;                                                         // 349
                                    return transpile.call(loader.loaderObj, load)                                      // 350
                                        .then(function(transpiled) {                                                   // 351
                                            // Hijack System.register to set declare function                          // 352
                                            var curSystem = __global.System;                                           // 353
                                            var curRegister = curSystem.register;                                      // 354
                                            curSystem.register = function(name, deps, declare) {                       // 355
                                                if (typeof name != 'string') {                                         // 356
                                                    declare = deps;                                                    // 357
                                                    deps = name;                                                       // 358
                                                }                                                                      // 359
                                                // store the registered declaration as load.declare                    // 360
                                                // store the deps as load.deps                                         // 361
                                                load.declare = declare;                                                // 362
                                                load.depsList = deps;                                                  // 363
                                            }                                                                          // 364
                                            // empty {} context is closest to undefined 'this' we can get              // 365
                                            __eval(transpiled, load.address, {});                                      // 366
                                            curSystem.register = curRegister;                                          // 367
                                        });                                                                            // 368
                                }                                                                                      // 369
                                else if (typeof instantiateResult == 'object') {                                       // 370
                                    load.depsList = instantiateResult.deps || [];                                      // 371
                                    load.execute = instantiateResult.execute;                                          // 372
                                    load.isDeclarative = false;                                                        // 373
                                }                                                                                      // 374
                                else                                                                                   // 375
                                    throw TypeError('Invalid instantiate return value');                               // 376
                            })                                                                                         // 377
                            // 15.2.4.6 ProcessLoadDependencies                                                        // 378
                            .then(function() {                                                                         // 379
                                load.dependencies = [];                                                                // 380
                                var depsList = load.depsList;                                                          // 381
                                                                                                                       // 382
                                var loadPromises = [];                                                                 // 383
                                for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {           // 384
                                    loadPromises.push(                                                                 // 385
                                        requestLoad(loader, request, load.name, load.address)                          // 386
                                                                                                                       // 387
                                            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)                       // 388
                                            .then(function(depLoad) {                                                  // 389
                                                                                                                       // 390
                                                // adjusted from spec to maintain dependency order                     // 391
                                                // this is due to the System.register internal implementation needs    // 392
                                                load.dependencies[index] = {                                           // 393
                                                    key: request,                                                      // 394
                                                    value: depLoad.name                                                // 395
                                                };                                                                     // 396
                                                                                                                       // 397
                                                if (depLoad.status != 'linked') {                                      // 398
                                                    var linkSets = load.linkSets.concat([]);                           // 399
                                                    for (var i = 0, l = linkSets.length; i < l; i++)                   // 400
                                                        addLoadToLinkSet(linkSets[i], depLoad);                        // 401
                                                }                                                                      // 402
                                                                                                                       // 403
                                                // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
                                                // snapshot(loader);                                                   // 405
                                            })                                                                         // 406
                                    );                                                                                 // 407
                                })(depsList[i], i);                                                                    // 408
                                                                                                                       // 409
                                return Promise.all(loadPromises);                                                      // 410
                            })                                                                                         // 411
                                                                                                                       // 412
                            // 15.2.4.6.2 LoadSucceeded                                                                // 413
                            .then(function() {                                                                         // 414
                                // console.log('LoadSucceeded ' + load.name);                                          // 415
                                // snapshot(loader);                                                                   // 416
                                                                                                                       // 417
                                console.assert(load.status == 'loading', 'is loading');                                // 418
                                                                                                                       // 419
                                load.status = 'loaded';                                                                // 420
                                                                                                                       // 421
                                var linkSets = load.linkSets.concat([]);                                               // 422
                                for (var i = 0, l = linkSets.length; i < l; i++)                                       // 423
                                    updateLinkSetOnLoad(linkSets[i], load);                                            // 424
                            });                                                                                        // 425
                    })                                                                                                 // 426
                    // 15.2.4.5.4 LoadFailed                                                                           // 427
                    ['catch'](function(exc) {                                                                          // 428
                    load.status = 'failed';                                                                            // 429
                    load.exception = exc;                                                                              // 430
                                                                                                                       // 431
                    var linkSets = load.linkSets.concat([]);                                                           // 432
                    for (var i = 0, l = linkSets.length; i < l; i++) {                                                 // 433
                        linkSetFailed(linkSets[i], load, exc);                                                         // 434
                    }                                                                                                  // 435
                                                                                                                       // 436
                    console.assert(load.linkSets.length == 0, 'linkSets not removed');                                 // 437
                });                                                                                                    // 438
            }                                                                                                          // 439
                                                                                                                       // 440
            // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions                               // 441
                                                                                                                       // 442
            // 15.2.4.7.1                                                                                              // 443
            function asyncStartLoadPartwayThrough(stepState) {                                                         // 444
                return function(resolve, reject) {                                                                     // 445
                    var loader = stepState.loader;                                                                     // 446
                    var name = stepState.moduleName;                                                                   // 447
                    var step = stepState.step;                                                                         // 448
                                                                                                                       // 449
                    if (loader.modules[name])                                                                          // 450
                        throw new TypeError('"' + name + '" already exists in the module table');                      // 451
                                                                                                                       // 452
                    // adjusted to pick up existing loads                                                              // 453
                    var existingLoad;                                                                                  // 454
                    for (var i = 0, l = loader.loads.length; i < l; i++) {                                             // 455
                        if (loader.loads[i].name == name) {                                                            // 456
                            existingLoad = loader.loads[i];                                                            // 457
                                                                                                                       // 458
                            if(step == 'translate' && !existingLoad.source) {                                          // 459
                                existingLoad.address = stepState.moduleAddress;                                        // 460
                                proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));     // 461
                            }                                                                                          // 462
                                                                                                                       // 463
                            return existingLoad.linkSets[0].done.then(function() {                                     // 464
                                resolve(existingLoad);                                                                 // 465
                            });                                                                                        // 466
                        }                                                                                              // 467
                    }                                                                                                  // 468
                                                                                                                       // 469
                    var load = createLoad(name);                                                                       // 470
                                                                                                                       // 471
                    load.metadata = stepState.moduleMetadata;                                                          // 472
                                                                                                                       // 473
                    var linkSet = createLinkSet(loader, load);                                                         // 474
                                                                                                                       // 475
                    loader.loads.push(load);                                                                           // 476
                                                                                                                       // 477
                    resolve(linkSet.done);                                                                             // 478
                                                                                                                       // 479
                    if (step == 'locate')                                                                              // 480
                        proceedToLocate(loader, load);                                                                 // 481
                                                                                                                       // 482
                    else if (step == 'fetch')                                                                          // 483
                        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));                        // 484
                                                                                                                       // 485
                    else {                                                                                             // 486
                        console.assert(step == 'translate', 'translate step');                                         // 487
                        load.address = stepState.moduleAddress;                                                        // 488
                        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));                     // 489
                    }                                                                                                  // 490
                }                                                                                                      // 491
            }                                                                                                          // 492
                                                                                                                       // 493
            // Declarative linking functions run through alternative implementation:                                   // 494
            // 15.2.5.1.1 CreateModuleLinkageRecord not implemented                                                    // 495
            // 15.2.5.1.2 LookupExport not implemented                                                                 // 496
            // 15.2.5.1.3 LookupModuleDependency not implemented                                                       // 497
                                                                                                                       // 498
            // 15.2.5.2.1                                                                                              // 499
            function createLinkSet(loader, startingLoad) {                                                             // 500
                var linkSet = {                                                                                        // 501
                    loader: loader,                                                                                    // 502
                    loads: [],                                                                                         // 503
                    startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995 // 504
                    loadingCount: 0                                                                                    // 505
                };                                                                                                     // 506
                linkSet.done = new Promise(function(resolve, reject) {                                                 // 507
                    linkSet.resolve = resolve;                                                                         // 508
                    linkSet.reject = reject;                                                                           // 509
                });                                                                                                    // 510
                addLoadToLinkSet(linkSet, startingLoad);                                                               // 511
                return linkSet;                                                                                        // 512
            }                                                                                                          // 513
            // 15.2.5.2.2                                                                                              // 514
            function addLoadToLinkSet(linkSet, load) {                                                                 // 515
                console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');  // 516
                                                                                                                       // 517
                for (var i = 0, l = linkSet.loads.length; i < l; i++)                                                  // 518
                    if (linkSet.loads[i] == load)                                                                      // 519
                        return;                                                                                        // 520
                                                                                                                       // 521
                linkSet.loads.push(load);                                                                              // 522
                load.linkSets.push(linkSet);                                                                           // 523
                                                                                                                       // 524
                // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603                                    // 525
                if (load.status != 'loaded') {                                                                         // 526
                    linkSet.loadingCount++;                                                                            // 527
                }                                                                                                      // 528
                                                                                                                       // 529
                var loader = linkSet.loader;                                                                           // 530
                                                                                                                       // 531
                for (var i = 0, l = load.dependencies.length; i < l; i++) {                                            // 532
                    var name = load.dependencies[i].value;                                                             // 533
                                                                                                                       // 534
                    if (loader.modules[name])                                                                          // 535
                        continue;                                                                                      // 536
                                                                                                                       // 537
                    for (var j = 0, d = loader.loads.length; j < d; j++) {                                             // 538
                        if (loader.loads[j].name != name)                                                              // 539
                            continue;                                                                                  // 540
                                                                                                                       // 541
                        addLoadToLinkSet(linkSet, loader.loads[j]);                                                    // 542
                        break;                                                                                         // 543
                    }                                                                                                  // 544
                }                                                                                                      // 545
                // console.log('add to linkset ' + load.name);                                                         // 546
                // snapshot(linkSet.loader);                                                                           // 547
            }                                                                                                          // 548
                                                                                                                       // 549
            // linking errors can be generic or load-specific                                                          // 550
            // this is necessary for debugging info                                                                    // 551
            function doLink(linkSet) {                                                                                 // 552
                var error = false;                                                                                     // 553
                try {                                                                                                  // 554
                    link(linkSet, function(load, exc) {                                                                // 555
                        linkSetFailed(linkSet, load, exc);                                                             // 556
                        error = true;                                                                                  // 557
                    });                                                                                                // 558
                }                                                                                                      // 559
                catch(e) {                                                                                             // 560
                    linkSetFailed(linkSet, null, e);                                                                   // 561
                    error = true;                                                                                      // 562
                }                                                                                                      // 563
                return error;                                                                                          // 564
            }                                                                                                          // 565
                                                                                                                       // 566
            // 15.2.5.2.3                                                                                              // 567
            function updateLinkSetOnLoad(linkSet, load) {                                                              // 568
                // console.log('update linkset on load ' + load.name);                                                 // 569
                // snapshot(linkSet.loader);                                                                           // 570
                                                                                                                       // 571
                console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');                // 572
                                                                                                                       // 573
                linkSet.loadingCount--;                                                                                // 574
                                                                                                                       // 575
                if (linkSet.loadingCount > 0)                                                                          // 576
                    return;                                                                                            // 577
                                                                                                                       // 578
                // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995                              // 579
                var startingLoad = linkSet.startingLoad;                                                               // 580
                                                                                                                       // 581
                // non-executing link variation for loader tracing                                                     // 582
                // on the server. Not in spec.                                                                         // 583
                /***/                                                                                                  // 584
                if (linkSet.loader.loaderObj.execute === false) {                                                      // 585
                    var loads = [].concat(linkSet.loads);                                                              // 586
                    for (var i = 0, l = loads.length; i < l; i++) {                                                    // 587
                        var load = loads[i];                                                                           // 588
                        load.module = !load.isDeclarative ? {                                                          // 589
                            module: _newModule({})                                                                     // 590
                        } : {                                                                                          // 591
                            name: load.name,                                                                           // 592
                            module: _newModule({}),                                                                    // 593
                            evaluated: true                                                                            // 594
                        };                                                                                             // 595
                        load.status = 'linked';                                                                        // 596
                        finishLoad(linkSet.loader, load);                                                              // 597
                    }                                                                                                  // 598
                    return linkSet.resolve(startingLoad);                                                              // 599
                }                                                                                                      // 600
                /***/                                                                                                  // 601
                                                                                                                       // 602
                var abrupt = doLink(linkSet);                                                                          // 603
                                                                                                                       // 604
                if (abrupt)                                                                                            // 605
                    return;                                                                                            // 606
                                                                                                                       // 607
                console.assert(linkSet.loads.length == 0, 'loads cleared');                                            // 608
                                                                                                                       // 609
                linkSet.resolve(startingLoad);                                                                         // 610
            }                                                                                                          // 611
                                                                                                                       // 612
            // 15.2.5.2.4                                                                                              // 613
            function linkSetFailed(linkSet, load, exc) {                                                               // 614
                var loader = linkSet.loader;                                                                           // 615
                                                                                                                       // 616
                if (load) {                                                                                            // 617
                    if (load && linkSet.loads[0].name != load.name)                                                    // 618
                        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);        // 619
                                                                                                                       // 620
                    if (load)                                                                                          // 621
                        exc = addToError(exc, 'Error loading ' + load.name);                                           // 622
                }                                                                                                      // 623
                else {                                                                                                 // 624
                    exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);                                   // 625
                }                                                                                                      // 626
                                                                                                                       // 627
                                                                                                                       // 628
                var loads = linkSet.loads.concat([]);                                                                  // 629
                for (var i = 0, l = loads.length; i < l; i++) {                                                        // 630
                    var load = loads[i];                                                                               // 631
                                                                                                                       // 632
                    // store all failed load records                                                                   // 633
                    loader.loaderObj.failed = loader.loaderObj.failed || [];                                           // 634
                    if (indexOf.call(loader.loaderObj.failed, load) == -1)                                             // 635
                        loader.loaderObj.failed.push(load);                                                            // 636
                                                                                                                       // 637
                    var linkIndex = indexOf.call(load.linkSets, linkSet);                                              // 638
                    console.assert(linkIndex != -1, 'link not present');                                               // 639
                    load.linkSets.splice(linkIndex, 1);                                                                // 640
                    if (load.linkSets.length == 0) {                                                                   // 641
                        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);                               // 642
                        if (globalLoadsIndex != -1)                                                                    // 643
                            linkSet.loader.loads.splice(globalLoadsIndex, 1);                                          // 644
                    }                                                                                                  // 645
                }                                                                                                      // 646
                linkSet.reject(exc);                                                                                   // 647
            }                                                                                                          // 648
                                                                                                                       // 649
            // 15.2.5.2.5                                                                                              // 650
            function finishLoad(loader, load) {                                                                        // 651
                // add to global trace if tracing                                                                      // 652
                if (loader.loaderObj.trace) {                                                                          // 653
                    if (!loader.loaderObj.loads)                                                                       // 654
                        loader.loaderObj.loads = {};                                                                   // 655
                    var depMap = {};                                                                                   // 656
                    load.dependencies.forEach(function(dep) {                                                          // 657
                        depMap[dep.key] = dep.value;                                                                   // 658
                    });                                                                                                // 659
                    loader.loaderObj.loads[load.name] = {                                                              // 660
                        name: load.name,                                                                               // 661
                        deps: load.dependencies.map(function(dep){ return dep.key }),                                  // 662
                        depMap: depMap,                                                                                // 663
                        address: load.address,                                                                         // 664
                        metadata: load.metadata,                                                                       // 665
                        source: load.source,                                                                           // 666
                        kind: load.isDeclarative ? 'declarative' : 'dynamic'                                           // 667
                    };                                                                                                 // 668
                }                                                                                                      // 669
                // if not anonymous, add to the module table                                                           // 670
                if (load.name) {                                                                                       // 671
                    console.assert(!loader.modules[load.name], 'load not in module table');                            // 672
                    loader.modules[load.name] = load.module;                                                           // 673
                }                                                                                                      // 674
                var loadIndex = indexOf.call(loader.loads, load);                                                      // 675
                if (loadIndex != -1)                                                                                   // 676
                    loader.loads.splice(loadIndex, 1);                                                                 // 677
                for (var i = 0, l = load.linkSets.length; i < l; i++) {                                                // 678
                    loadIndex = indexOf.call(load.linkSets[i].loads, load);                                            // 679
                    if (loadIndex != -1)                                                                               // 680
                        load.linkSets[i].loads.splice(loadIndex, 1);                                                   // 681
                }                                                                                                      // 682
                load.linkSets.splice(0, load.linkSets.length);                                                         // 683
            }                                                                                                          // 684
                                                                                                                       // 685
            function doDynamicExecute(linkSet, load, linkError) {                                                      // 686
                try {                                                                                                  // 687
                    var module = load.execute();                                                                       // 688
                }                                                                                                      // 689
                catch(e) {                                                                                             // 690
                    linkError(load, e);                                                                                // 691
                    return;                                                                                            // 692
                }                                                                                                      // 693
                if (!module || !(module instanceof Module))                                                            // 694
                    linkError(load, new TypeError('Execution must define a Module instance'));                         // 695
                else                                                                                                   // 696
                    return module;                                                                                     // 697
            }                                                                                                          // 698
                                                                                                                       // 699
            // 26.3 Loader                                                                                             // 700
                                                                                                                       // 701
            // 26.3.1.1                                                                                                // 702
            // defined at top                                                                                          // 703
                                                                                                                       // 704
            // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
            function createImportPromise(loader, name, promise) {                                                      // 706
                var importPromises = loader._loader.importPromises;                                                    // 707
                return importPromises[name] = promise.then(function(m) {                                               // 708
                    importPromises[name] = undefined;                                                                  // 709
                    return m;                                                                                          // 710
                }, function(e) {                                                                                       // 711
                    importPromises[name] = undefined;                                                                  // 712
                    throw e;                                                                                           // 713
                });                                                                                                    // 714
            }                                                                                                          // 715
                                                                                                                       // 716
            Loader.prototype = {                                                                                       // 717
                // 26.3.3.1                                                                                            // 718
                constructor: Loader,                                                                                   // 719
                // 26.3.3.2                                                                                            // 720
                define: function(name, source, options) {                                                              // 721
                    // check if already defined                                                                        // 722
                    if (this._loader.importPromises[name])                                                             // 723
                        throw new TypeError('Module is already loading.');                                             // 724
                    return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({                  // 725
                        step: 'translate',                                                                             // 726
                        loader: this._loader,                                                                          // 727
                        moduleName: name,                                                                              // 728
                        moduleMetadata: options && options.metadata || {},                                             // 729
                        moduleSource: source,                                                                          // 730
                        moduleAddress: options && options.address                                                      // 731
                    })));                                                                                              // 732
                },                                                                                                     // 733
                // 26.3.3.3                                                                                            // 734
                'delete': function(name) {                                                                             // 735
                    var loader = this._loader;                                                                         // 736
                    delete loader.importPromises[name];                                                                // 737
                    delete loader.moduleRecords[name];                                                                 // 738
                    return loader.modules[name] ? delete loader.modules[name] : false;                                 // 739
                },                                                                                                     // 740
                // 26.3.3.4 entries not implemented                                                                    // 741
                // 26.3.3.5                                                                                            // 742
                get: function(key) {                                                                                   // 743
                    if (!this._loader.modules[key])                                                                    // 744
                        return;                                                                                        // 745
                    doEnsureEvaluated(this._loader.modules[key], [], this);                                            // 746
                    return this._loader.modules[key].module;                                                           // 747
                },                                                                                                     // 748
                // 26.3.3.7                                                                                            // 749
                has: function(name) {                                                                                  // 750
                    return !!this._loader.modules[name];                                                               // 751
                },                                                                                                     // 752
                // 26.3.3.8                                                                                            // 753
                'import': function(name, parentName, parentAddress) {                                                  // 754
                    if (typeof parentName == 'object')                                                                 // 755
                        parentName = parentName.name;                                                                  // 756
                                                                                                                       // 757
                    // run normalize first                                                                             // 758
                    var loaderObj = this;                                                                              // 759
                                                                                                                       // 760
                    // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659                                     // 761
                    return Promise.resolve(loaderObj.normalize(name, parentName))                                      // 762
                        .then(function(name) {                                                                         // 763
                            var loader = loaderObj._loader;                                                            // 764
                                                                                                                       // 765
                            if (loader.modules[name]) {                                                                // 766
                                doEnsureEvaluated(loader.modules[name], [], loader._loader);                           // 767
                                return loader.modules[name].module;                                                    // 768
                            }                                                                                          // 769
                                                                                                                       // 770
                            return loader.importPromises[name] || createImportPromise(loaderObj, name,                 // 771
                                    loadModule(loader, name, {})                                                       // 772
                                        .then(function(load) {                                                         // 773
                                            delete loader.importPromises[name];                                        // 774
                                            return evaluateLoadedModule(loader, load);                                 // 775
                                        }));                                                                           // 776
                        });                                                                                            // 777
                },                                                                                                     // 778
                // 26.3.3.9 keys not implemented                                                                       // 779
                // 26.3.3.10                                                                                           // 780
                load: function(name, options) {                                                                        // 781
                    if (this._loader.modules[name]) {                                                                  // 782
                        doEnsureEvaluated(this._loader.modules[name], [], this._loader);                               // 783
                        return Promise.resolve(this._loader.modules[name].module);                                     // 784
                    }                                                                                                  // 785
                    return this._loader.importPromises[name] || createImportPromise(this, name, loadModule(this._loader, name, {}));
                },                                                                                                     // 787
                // 26.3.3.11                                                                                           // 788
                module: function(source, options) {                                                                    // 789
                    var load = createLoad();                                                                           // 790
                    load.address = options && options.address;                                                         // 791
                    var linkSet = createLinkSet(this._loader, load);                                                   // 792
                    var sourcePromise = Promise.resolve(source);                                                       // 793
                    var loader = this._loader;                                                                         // 794
                    var p = linkSet.done.then(function() {                                                             // 795
                        return evaluateLoadedModule(loader, load);                                                     // 796
                    });                                                                                                // 797
                    proceedToTranslate(loader, load, sourcePromise);                                                   // 798
                    return p;                                                                                          // 799
                },                                                                                                     // 800
                // 26.3.3.12                                                                                           // 801
                newModule: function (obj) {                                                                            // 802
                    if (typeof obj != 'object')                                                                        // 803
                        throw new TypeError('Expected object');                                                        // 804
                                                                                                                       // 805
                    // we do this to be able to tell if a module is a module privately in ES5                          // 806
                    // by doing m instanceof Module                                                                    // 807
                    var m = new Module();                                                                              // 808
                                                                                                                       // 809
                    var pNames;                                                                                        // 810
                    if (Object.getOwnPropertyNames && obj != null) {                                                   // 811
                        pNames = Object.getOwnPropertyNames(obj);                                                      // 812
                    }                                                                                                  // 813
                    else {                                                                                             // 814
                        pNames = [];                                                                                   // 815
                        for (var key in obj)                                                                           // 816
                            pNames.push(key);                                                                          // 817
                    }                                                                                                  // 818
                                                                                                                       // 819
                    for (var i = 0; i < pNames.length; i++) (function(key) {                                           // 820
                        defineProperty(m, key, {                                                                       // 821
                            configurable: false,                                                                       // 822
                            enumerable: true,                                                                          // 823
                            get: function () {                                                                         // 824
                                return obj[key];                                                                       // 825
                            }                                                                                          // 826
                        });                                                                                            // 827
                    })(pNames[i]);                                                                                     // 828
                                                                                                                       // 829
                    if (Object.preventExtensions)                                                                      // 830
                        Object.preventExtensions(m);                                                                   // 831
                                                                                                                       // 832
                    return m;                                                                                          // 833
                },                                                                                                     // 834
                // 26.3.3.14                                                                                           // 835
                set: function(name, module) {                                                                          // 836
                    if (!(module instanceof Module))                                                                   // 837
                        throw new TypeError('Loader.set(' + name + ', module) must be a module');                      // 838
                    this._loader.modules[name] = {                                                                     // 839
                        module: module                                                                                 // 840
                    };                                                                                                 // 841
                },                                                                                                     // 842
                // 26.3.3.15 values not implemented                                                                    // 843
                // 26.3.3.16 @@iterator not implemented                                                                // 844
                // 26.3.3.17 @@toStringTag not implemented                                                             // 845
                                                                                                                       // 846
                // 26.3.3.18.1                                                                                         // 847
                normalize: function(name, referrerName, referrerAddress) {                                             // 848
                    return name;                                                                                       // 849
                },                                                                                                     // 850
                // 26.3.3.18.2                                                                                         // 851
                locate: function(load) {                                                                               // 852
                    return load.name;                                                                                  // 853
                },                                                                                                     // 854
                // 26.3.3.18.3                                                                                         // 855
                fetch: function(load) {                                                                                // 856
                },                                                                                                     // 857
                // 26.3.3.18.4                                                                                         // 858
                translate: function(load) {                                                                            // 859
                    return load.source;                                                                                // 860
                },                                                                                                     // 861
                // 26.3.3.18.5                                                                                         // 862
                instantiate: function(load) {                                                                          // 863
                }                                                                                                      // 864
            };                                                                                                         // 865
                                                                                                                       // 866
            var _newModule = Loader.prototype.newModule;                                                               // 867
            /*                                                                                                         // 868
             * ES6 Module Declarative Linking Code - Dev Build Only                                                    // 869
             */                                                                                                        // 870
            function link(linkSet, linkError) {                                                                        // 871
                                                                                                                       // 872
                var loader = linkSet.loader;                                                                           // 873
                                                                                                                       // 874
                if (!linkSet.loads.length)                                                                             // 875
                    return;                                                                                            // 876
                                                                                                                       // 877
                var loads = linkSet.loads.concat([]);                                                                  // 878
                                                                                                                       // 879
                for (var i = 0; i < loads.length; i++) {                                                               // 880
                    var load = loads[i];                                                                               // 881
                                                                                                                       // 882
                    var module = doDynamicExecute(linkSet, load, linkError);                                           // 883
                    if (!module)                                                                                       // 884
                        return;                                                                                        // 885
                    load.module = {                                                                                    // 886
                        name: load.name,                                                                               // 887
                        module: module                                                                                 // 888
                    };                                                                                                 // 889
                    load.status = 'linked';                                                                            // 890
                                                                                                                       // 891
                    finishLoad(loader, load);                                                                          // 892
                }                                                                                                      // 893
            }                                                                                                          // 894
                                                                                                                       // 895
            function evaluateLoadedModule(loader, load) {                                                              // 896
                console.assert(load.status == 'linked', 'is linked ' + load.name);                                     // 897
                return load.module.module;                                                                             // 898
            }                                                                                                          // 899
                                                                                                                       // 900
            function doEnsureEvaluated() {}                                                                            // 901
                                                                                                                       // 902
            function transpile() {                                                                                     // 903
                throw new TypeError('ES6 transpilation is only provided in the dev module loader build.');             // 904
            }                                                                                                          // 905
        })();/*                                                                                                        // 906
         *********************************************************************************************                 // 907
                                                                                                                       // 908
         System Loader Implementation                                                                                  // 909
                                                                                                                       // 910
         - Implemented to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js                       // 911
                                                                                                                       // 912
         - <script type="module"> supported                                                                            // 913
                                                                                                                       // 914
         *********************************************************************************************                 // 915
         */                                                                                                            // 916
                                                                                                                       // 917
        var System;                                                                                                    // 918
                                                                                                                       // 919
        function SystemLoader() {                                                                                      // 920
            Loader.call(this);                                                                                         // 921
            this.paths = {};                                                                                           // 922
        }                                                                                                              // 923
                                                                                                                       // 924
// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
        function applyPaths(paths, name) {                                                                             // 926
            // most specific (most number of slashes in path) match wins                                               // 927
            var pathMatch = '', wildcard, maxSlashCount = 0;                                                           // 928
                                                                                                                       // 929
            // check to see if we have a paths entry                                                                   // 930
            for (var p in paths) {                                                                                     // 931
                var pathParts = p.split('*');                                                                          // 932
                if (pathParts.length > 2)                                                                              // 933
                    throw new TypeError('Only one wildcard in a path is permitted');                                   // 934
                                                                                                                       // 935
                // exact path match                                                                                    // 936
                if (pathParts.length == 1) {                                                                           // 937
                    if (name == p) {                                                                                   // 938
                        pathMatch = p;                                                                                 // 939
                        break;                                                                                         // 940
                    }                                                                                                  // 941
                }                                                                                                      // 942
                // wildcard path match                                                                                 // 943
                else {                                                                                                 // 944
                    var slashCount = p.split('/').length;                                                              // 945
                    if (slashCount >= maxSlashCount &&                                                                 // 946
                        name.substr(0, pathParts[0].length) == pathParts[0] &&                                         // 947
                        name.substr(name.length - pathParts[1].length) == pathParts[1]) {                              // 948
                        maxSlashCount = slashCount;                                                                    // 949
                        pathMatch = p;                                                                                 // 950
                        wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
                    }                                                                                                  // 952
                }                                                                                                      // 953
            }                                                                                                          // 954
                                                                                                                       // 955
            var outPath = paths[pathMatch] || name;                                                                    // 956
            if (wildcard)                                                                                              // 957
                outPath = outPath.replace('*', wildcard);                                                              // 958
                                                                                                                       // 959
            return outPath;                                                                                            // 960
        }                                                                                                              // 961
                                                                                                                       // 962
// inline Object.create-style class extension                                                                          // 963
        function LoaderProto() {}                                                                                      // 964
        LoaderProto.prototype = Loader.prototype;                                                                      // 965
        SystemLoader.prototype = new LoaderProto();                                                                    // 966
        var fetchTextFromURL;                                                                                          // 967
        if (typeof XMLHttpRequest != 'undefined') {                                                                    // 968
            fetchTextFromURL = function(url, fulfill, reject) {                                                        // 969
                // percent encode just '#' in urls                                                                     // 970
                // according to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js#L238            // 971
                // we should encode everything, but it breaks for servers that don't expect it                         // 972
                // like in (https://github.com/systemjs/systemjs/issues/168)                                           // 973
                if (isBrowser)                                                                                         // 974
                    url = url.replace(/#/g, '%23');                                                                    // 975
                                                                                                                       // 976
                var xhr = new XMLHttpRequest();                                                                        // 977
                var sameDomain = true;                                                                                 // 978
                var doTimeout = false;                                                                                 // 979
                if (!('withCredentials' in xhr)) {                                                                     // 980
                    // check if same domain                                                                            // 981
                    var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);                                                // 982
                    if (domainCheck) {                                                                                 // 983
                        sameDomain = domainCheck[2] === window.location.host;                                          // 984
                        if (domainCheck[1])                                                                            // 985
                            sameDomain &= domainCheck[1] === window.location.protocol;                                 // 986
                    }                                                                                                  // 987
                }                                                                                                      // 988
                if (!sameDomain && typeof XDomainRequest != 'undefined') {                                             // 989
                    xhr = new XDomainRequest();                                                                        // 990
                    xhr.onload = load;                                                                                 // 991
                    xhr.onerror = error;                                                                               // 992
                    xhr.ontimeout = error;                                                                             // 993
                    xhr.onprogress = function() {};                                                                    // 994
                    xhr.timeout = 0;                                                                                   // 995
                    doTimeout = true;                                                                                  // 996
                }                                                                                                      // 997
                function load() {                                                                                      // 998
                    fulfill(xhr.responseText);                                                                         // 999
                }                                                                                                      // 1000
                function error() {                                                                                     // 1001
                    reject(xhr.statusText + ': ' + url || 'XHR error');                                                // 1002
                }                                                                                                      // 1003
                                                                                                                       // 1004
                xhr.onreadystatechange = function () {                                                                 // 1005
                    if (xhr.readyState === 4) {                                                                        // 1006
                        if (xhr.status === 200 || (xhr.status == 0 && xhr.responseText)) {                             // 1007
                            load();                                                                                    // 1008
                        } else {                                                                                       // 1009
                            error();                                                                                   // 1010
                        }                                                                                              // 1011
                    }                                                                                                  // 1012
                };                                                                                                     // 1013
                xhr.open("GET", url, true);                                                                            // 1014
                                                                                                                       // 1015
                if (doTimeout)                                                                                         // 1016
                    setTimeout(function() {                                                                            // 1017
                        xhr.send();                                                                                    // 1018
                    }, 0);                                                                                             // 1019
                                                                                                                       // 1020
                xhr.send(null);                                                                                        // 1021
            };                                                                                                         // 1022
        }                                                                                                              // 1023
        else if (typeof require != 'undefined') {                                                                      // 1024
            var fs;                                                                                                    // 1025
            fetchTextFromURL = function(url, fulfill, reject) {                                                        // 1026
                if (url.substr(0, 8) != 'file:///')                                                                    // 1027
                    throw 'Only file URLs of the form file:/// allowed running in Node.';                              // 1028
                fs = fs || require('fs');                                                                              // 1029
                if (isWindows)                                                                                         // 1030
                    url = url.replace(/\//g, '\\').substr(8);                                                          // 1031
                else                                                                                                   // 1032
                    url = url.substr(7);                                                                               // 1033
                return fs.readFile(url, function(err, data) {                                                          // 1034
                    if (err)                                                                                           // 1035
                        return reject(err);                                                                            // 1036
                    else {                                                                                             // 1037
                        // Strip Byte Order Mark out if it's the leading char                                          // 1038
                        var dataString = data + '';                                                                    // 1039
                        if (dataString[0] === '\ufeff')                                                                // 1040
                            dataString = dataString.substr(1);                                                         // 1041
                                                                                                                       // 1042
                        fulfill(dataString);                                                                           // 1043
                    }                                                                                                  // 1044
                });                                                                                                    // 1045
            };                                                                                                         // 1046
        }                                                                                                              // 1047
        else {                                                                                                         // 1048
            throw new TypeError('No environment fetch API available.');                                                // 1049
        }                                                                                                              // 1050
                                                                                                                       // 1051
        SystemLoader.prototype.fetch = function(load) {                                                                // 1052
            return new Promise(function(resolve, reject) {                                                             // 1053
                fetchTextFromURL(load.address, resolve, reject);                                                       // 1054
            });                                                                                                        // 1055
        };/*                                                                                                           // 1056
         * Traceur, Babel and TypeScript transpile hook for Loader                                                     // 1057
         */                                                                                                            // 1058
        var transpile = (function() {                                                                                  // 1059
                                                                                                                       // 1060
            // use Traceur by default                                                                                  // 1061
            Loader.prototype.transpiler = 'traceur';                                                                   // 1062
                                                                                                                       // 1063
            function transpile(load) {                                                                                 // 1064
                var self = this;                                                                                       // 1065
                                                                                                                       // 1066
                return Promise.resolve(__global[self.transpiler == 'typescript' ? 'ts' : self.transpiler]              // 1067
                    || (self.pluginLoader || self)['import'](self.transpiler))                                         // 1068
                    .then(function(transpiler) {                                                                       // 1069
                        if (transpiler.__useDefault)                                                                   // 1070
                            transpiler = transpiler['default'];                                                        // 1071
                                                                                                                       // 1072
                        var transpileFunction;                                                                         // 1073
                        if (transpiler.Compiler)                                                                       // 1074
                            transpileFunction = traceurTranspile;                                                      // 1075
                        else if (transpiler.createLanguageService)                                                     // 1076
                            transpileFunction = typescriptTranspile;                                                   // 1077
                        else                                                                                           // 1078
                            transpileFunction = babelTranspile;                                                        // 1079
                                                                                                                       // 1080
                        // note __moduleName will be part of the transformer meta in future when we have the spec for this
                        return 'var __moduleName = "' + load.name + '";' + transpileFunction.call(self, load, transpiler) + '\n//# sourceURL=' + load.address + '!transpiled';
                    });                                                                                                // 1083
            };                                                                                                         // 1084
                                                                                                                       // 1085
            function traceurTranspile(load, traceur) {                                                                 // 1086
                var options = this.traceurOptions || {};                                                               // 1087
                options.modules = 'instantiate';                                                                       // 1088
                options.script = false;                                                                                // 1089
                options.sourceMaps = 'inline';                                                                         // 1090
                options.filename = load.address;                                                                       // 1091
                options.inputSourceMap = load.metadata.sourceMap;                                                      // 1092
                options.moduleName = false;                                                                            // 1093
                                                                                                                       // 1094
                var compiler = new traceur.Compiler(options);                                                          // 1095
                                                                                                                       // 1096
                return doTraceurCompile(load.source, compiler, options.filename);                                      // 1097
            }                                                                                                          // 1098
            function doTraceurCompile(source, compiler, filename) {                                                    // 1099
                try {                                                                                                  // 1100
                    return compiler.compile(source, filename);                                                         // 1101
                }                                                                                                      // 1102
                catch(e) {                                                                                             // 1103
                    // traceur throws an error array                                                                   // 1104
                    throw e[0];                                                                                        // 1105
                }                                                                                                      // 1106
            }                                                                                                          // 1107
                                                                                                                       // 1108
            function babelTranspile(load, babel) {                                                                     // 1109
                var options = this.babelOptions || {};                                                                 // 1110
                options.modules = 'system';                                                                            // 1111
                options.sourceMap = 'inline';                                                                          // 1112
                options.inputSourceMap = load.metadata.sourceMap;                                                      // 1113
                options.filename = load.address;                                                                       // 1114
                options.code = true;                                                                                   // 1115
                options.ast = false;                                                                                   // 1116
                                                                                                                       // 1117
                return babel.transform(load.source, options).code;                                                     // 1118
            }                                                                                                          // 1119
                                                                                                                       // 1120
            function typescriptTranspile(load, ts) {                                                                   // 1121
                var options = this.typescriptOptions || {};                                                            // 1122
                if (options.target === undefined) {                                                                    // 1123
                    options.target = ts.ScriptTarget.ES5;                                                              // 1124
                }                                                                                                      // 1125
                options.module = ts.ModuleKind.System;                                                                 // 1126
                options.inlineSourceMap = true;                                                                        // 1127
                                                                                                                       // 1128
                return ts.transpile(load.source, options, load.address);                                               // 1129
            }                                                                                                          // 1130
                                                                                                                       // 1131
            return transpile;                                                                                          // 1132
        })();                                                                                                          // 1133
// we define a __exec for globally-scoped execution                                                                    // 1134
// used by module format implementations                                                                               // 1135
        var __exec;                                                                                                    // 1136
                                                                                                                       // 1137
        (function() {                                                                                                  // 1138
                                                                                                                       // 1139
            // System clobbering protection (mostly for Traceur)                                                       // 1140
            var curSystem;                                                                                             // 1141
            function preExec(loader) {                                                                                 // 1142
                curSystem = __global.System;                                                                           // 1143
                __global.System = loader;                                                                              // 1144
            }                                                                                                          // 1145
            function postExec() {                                                                                      // 1146
                __global.System = curSystem;                                                                           // 1147
            }                                                                                                          // 1148
                                                                                                                       // 1149
            var hasBtoa = typeof btoa != 'undefined';                                                                  // 1150
                                                                                                                       // 1151
            function getSource(load) {                                                                                 // 1152
                var lastLineIndex = load.source.lastIndexOf('\n');                                                     // 1153
                                                                                                                       // 1154
                return load.source                                                                                     // 1155
                        // adds the sourceURL comment if not already present                                           // 1156
                    + (load.source.substr(lastLineIndex, 15) != '\n//# sourceURL='                                     // 1157
                        ? '\n//# sourceURL=' + load.address + (load.metadata.sourceMap ? '!transpiled' : '') : '')     // 1158
                        // add sourceMappingURL if load.metadata.sourceMap is set                                      // 1159
                    + (load.metadata.sourceMap && hasBtoa &&                                                           // 1160
                    '\n//# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(load.metadata.sourceMap))) || '')
            }                                                                                                          // 1162
                                                                                                                       // 1163
            // Web Worker and Chrome Extensions use original ESML eval                                                 // 1164
            // this may lead to some global module execution differences (eg var not defining onto global)             // 1165
            if (isWorker || isBrowser && window.chrome && window.chrome.extension) {                                   // 1166
                __exec = function(load) {                                                                              // 1167
                    try {                                                                                              // 1168
                        preExec(this);                                                                                 // 1169
                        new Function(getSource(load)).call(__global);                                                  // 1170
                        postExec();                                                                                    // 1171
                    }                                                                                                  // 1172
                    catch(e) {                                                                                         // 1173
                        throw addToError(e, 'Evaluating ' + load.address);                                             // 1174
                    }                                                                                                  // 1175
                };                                                                                                     // 1176
            }                                                                                                          // 1177
                                                                                                                       // 1178
            // use script injection eval to get identical global script behaviour                                      // 1179
            else if (typeof document != 'undefined') {                                                                 // 1180
                var head;                                                                                              // 1181
                                                                                                                       // 1182
                var scripts = document.getElementsByTagName('script');                                                 // 1183
                $__curScript = scripts[scripts.length - 1];                                                            // 1184
                                                                                                                       // 1185
                __exec = function(load) {                                                                              // 1186
                    if (!head)                                                                                         // 1187
                        head = document.head || document.body || document.documentElement;                             // 1188
                                                                                                                       // 1189
                    var script = document.createElement('script');                                                     // 1190
                    script.text = getSource(load);                                                                     // 1191
                    var onerror = window.onerror;                                                                      // 1192
                    var e;                                                                                             // 1193
                    window.onerror = function(_e) {                                                                    // 1194
                        e = addToError(_e, 'Evaluating ' + load.address);                                              // 1195
                    }                                                                                                  // 1196
                    preExec(this);                                                                                     // 1197
                    head.appendChild(script);                                                                          // 1198
                    head.removeChild(script);                                                                          // 1199
                    postExec();                                                                                        // 1200
                    window.onerror = onerror;                                                                          // 1201
                    if (e)                                                                                             // 1202
                        throw e;                                                                                       // 1203
                }                                                                                                      // 1204
            }                                                                                                          // 1205
            else {                                                                                                     // 1206
                // global scoped eval for node                                                                         // 1207
                var vmModule = 'vm';                                                                                   // 1208
                var vm = require(vmModule);                                                                            // 1209
                __exec = function(load) {                                                                              // 1210
                    try {                                                                                              // 1211
                        preExec(this);                                                                                 // 1212
                        vm.runInThisContext(getSource(load));                                                          // 1213
                        postExec();                                                                                    // 1214
                    }                                                                                                  // 1215
                    catch(e) {                                                                                         // 1216
                        throw addToError(e.toString(), 'Evaluating ' + load.address);                                  // 1217
                    }                                                                                                  // 1218
                };                                                                                                     // 1219
            }                                                                                                          // 1220
                                                                                                                       // 1221
        })();// SystemJS Loader Class and Extension helpers                                                            // 1222
                                                                                                                       // 1223
        function SystemJSLoader() {                                                                                    // 1224
            SystemLoader.call(this);                                                                                   // 1225
                                                                                                                       // 1226
            systemJSConstructor.call(this);                                                                            // 1227
        }                                                                                                              // 1228
                                                                                                                       // 1229
// inline Object.create-style class extension                                                                          // 1230
        function SystemProto() {};                                                                                     // 1231
        SystemProto.prototype = SystemLoader.prototype;                                                                // 1232
        SystemJSLoader.prototype = new SystemProto();                                                                  // 1233
                                                                                                                       // 1234
        var systemJSConstructor;                                                                                       // 1235
                                                                                                                       // 1236
        function hook(name, hook) {                                                                                    // 1237
            SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name]);                                     // 1238
        }                                                                                                              // 1239
        function hookConstructor(hook) {                                                                               // 1240
            systemJSConstructor = hook(systemJSConstructor || function() {});                                          // 1241
        }                                                                                                              // 1242
                                                                                                                       // 1243
        function dedupe(deps) {                                                                                        // 1244
            var newDeps = [];                                                                                          // 1245
            for (var i = 0, l = deps.length; i < l; i++)                                                               // 1246
                if (indexOf.call(newDeps, deps[i]) == -1)                                                              // 1247
                    newDeps.push(deps[i])                                                                              // 1248
            return newDeps;                                                                                            // 1249
        }                                                                                                              // 1250
                                                                                                                       // 1251
        function extend(a, b, underwrite) {                                                                            // 1252
            for (var p in b) {                                                                                         // 1253
                if (!underwrite || !(p in a))                                                                          // 1254
                    a[p] = b[p];                                                                                       // 1255
            }                                                                                                          // 1256
        }var absURLRegEx = /^[^\/]+:\/\//;                                                                             // 1257
                                                                                                                       // 1258
        function readMemberExpression(p, value) {                                                                      // 1259
            var pParts = p.split('.');                                                                                 // 1260
            while (pParts.length)                                                                                      // 1261
                value = value[pParts.shift()];                                                                         // 1262
            return value;                                                                                              // 1263
        }                                                                                                              // 1264
                                                                                                                       // 1265
        var baseURLCache = {};                                                                                         // 1266
        function getBaseURLObj() {                                                                                     // 1267
            if (baseURLCache[this.baseURL])                                                                            // 1268
                return baseURLCache[this.baseURL];                                                                     // 1269
                                                                                                                       // 1270
            // normalize baseURL if not already                                                                        // 1271
            if (this.baseURL[this.baseURL.length - 1] != '/')                                                          // 1272
                this.baseURL += '/';                                                                                   // 1273
                                                                                                                       // 1274
            var baseURL = new URL(this.baseURL, baseURI);                                                              // 1275
                                                                                                                       // 1276
            this.baseURL = baseURL.href;                                                                               // 1277
                                                                                                                       // 1278
            return (baseURLCache[this.baseURL] = baseURL);                                                             // 1279
        }                                                                                                              // 1280
                                                                                                                       // 1281
        var baseURIObj = new URL(baseURI);                                                                             // 1282
                                                                                                                       // 1283
        (function() {                                                                                                  // 1284
                                                                                                                       // 1285
            hookConstructor(function(constructor) {                                                                    // 1286
                return function() {                                                                                    // 1287
                    constructor.call(this);                                                                            // 1288
                                                                                                                       // 1289
                    // support baseURL                                                                                 // 1290
                    this.baseURL = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);                                    // 1291
                                                                                                                       // 1292
                    // support the empty module, as a concept                                                          // 1293
                    this.set('@empty', this.newModule({}));                                                            // 1294
                };                                                                                                     // 1295
            });                                                                                                        // 1296
                                                                                                                       // 1297
            /*                                                                                                         // 1298
             Normalization                                                                                             // 1299
                                                                                                                       // 1300
             If a name is relative, we apply URL normalization to the page                                             // 1301
             If a name is an absolute URL, we leave it as-is                                                           // 1302
                                                                                                                       // 1303
             Plain names (neither of the above) run through the map and package                                        // 1304
             normalization phases (applying before and after this one).                                                // 1305
                                                                                                                       // 1306
             The paths normalization phase applies last (paths extension), which                                       // 1307
             defines the `normalizeSync` function and normalizes everything into                                       // 1308
             a URL.                                                                                                    // 1309
                                                                                                                       // 1310
             The final normalization                                                                                   // 1311
             */                                                                                                        // 1312
            hook('normalize', function() {                                                                             // 1313
                return function(name, parentName) {                                                                    // 1314
                    // relative URL-normalization                                                                      // 1315
                    if (name[0] == '.' || name[0] == '/')                                                              // 1316
                        return new URL(name, parentName || baseURIObj).href;                                           // 1317
                    return name;                                                                                       // 1318
                };                                                                                                     // 1319
            });                                                                                                        // 1320
                                                                                                                       // 1321
            /*                                                                                                         // 1322
             __useDefault                                                                                              // 1323
                                                                                                                       // 1324
             When a module object looks like:                                                                          // 1325
             newModule(                                                                                                // 1326
             __useDefault: true,                                                                                       // 1327
             default: 'some-module'                                                                                    // 1328
             })                                                                                                        // 1329
                                                                                                                       // 1330
             Then importing that module provides the 'some-module'                                                     // 1331
             result directly instead of the full module.                                                               // 1332
                                                                                                                       // 1333
             Useful for eg module.exports = function() {}                                                              // 1334
             */                                                                                                        // 1335
            hook('import', function(systemImport) {                                                                    // 1336
                return function(name, parentName, parentAddress) {                                                     // 1337
                    return systemImport.call(this, name, parentName, parentAddress).then(function(module) {            // 1338
                        return module.__useDefault ? module['default'] : module;                                       // 1339
                    });                                                                                                // 1340
                };                                                                                                     // 1341
            });                                                                                                        // 1342
                                                                                                                       // 1343
            /*                                                                                                         // 1344
             Extend config merging one deep only                                                                       // 1345
                                                                                                                       // 1346
             loader.config({                                                                                           // 1347
             some: 'random',                                                                                           // 1348
             config: 'here',                                                                                           // 1349
             deep: {                                                                                                   // 1350
             config: { too: 'too' }                                                                                    // 1351
             }                                                                                                         // 1352
             });                                                                                                       // 1353
                                                                                                                       // 1354
             <=>                                                                                                       // 1355
                                                                                                                       // 1356
             loader.some = 'random';                                                                                   // 1357
             loader.config = 'here'                                                                                    // 1358
             loader.deep = loader.deep || {};                                                                          // 1359
             loader.deep.config = { too: 'too' };                                                                      // 1360
                                                                                                                       // 1361
                                                                                                                       // 1362
             Normalizes meta and package configs allowing for:                                                         // 1363
                                                                                                                       // 1364
             System.config({                                                                                           // 1365
             meta: {                                                                                                   // 1366
             './index.js': {}                                                                                          // 1367
             }                                                                                                         // 1368
             });                                                                                                       // 1369
                                                                                                                       // 1370
             To become                                                                                                 // 1371
                                                                                                                       // 1372
             System.meta['https://thissite.com/index.js'] = {};                                                        // 1373
                                                                                                                       // 1374
             For easy normalization canonicalization with latest URL support.                                          // 1375
                                                                                                                       // 1376
             */                                                                                                        // 1377
            SystemJSLoader.prototype.config = function(cfg) {                                                          // 1378
                                                                                                                       // 1379
                // always configure baseURL first                                                                      // 1380
                if (cfg.baseURL) {                                                                                     // 1381
                    var hasConfig = false;                                                                             // 1382
                    function checkHasConfig(obj) {                                                                     // 1383
                        for (var p in obj)                                                                             // 1384
                            return true;                                                                               // 1385
                    }                                                                                                  // 1386
                    if (checkHasConfig(this.packages) || checkHasConfig(this.meta) || checkHasConfig(this.depCache) || checkHasConfig(this.bundles))
                        throw new TypeError('baseURL should only be configured once and must be configured first.');   // 1388
                                                                                                                       // 1389
                    this.baseURL = cfg.baseURL;                                                                        // 1390
                                                                                                                       // 1391
                    // sanitize baseURL                                                                                // 1392
                    getBaseURLObj.call(this);                                                                          // 1393
                }                                                                                                      // 1394
                                                                                                                       // 1395
                if (cfg.paths) {                                                                                       // 1396
                    for (var p in cfg.paths)                                                                           // 1397
                        this.paths[p] = cfg.paths[p];                                                                  // 1398
                }                                                                                                      // 1399
                                                                                                                       // 1400
                if (cfg.map) {                                                                                         // 1401
                    for (var p in cfg.map) {                                                                           // 1402
                        var v = cfg.map[p];                                                                            // 1403
                                                                                                                       // 1404
                        // object map backwards-compat into packages configuration                                     // 1405
                        if (typeof v !== 'string') {                                                                   // 1406
                            var normalized = this.normalizeSync(p);                                                    // 1407
                                                                                                                       // 1408
                            // if doing default js extensions, undo to get package name                                // 1409
                            if (this.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js')                        // 1410
                                normalized = normalized.substr(0, normalized.length - 3);                              // 1411
                                                                                                                       // 1412
                            // if a package main, revert it                                                            // 1413
                            var pkgMatch = '';                                                                         // 1414
                            for (var pkg in this.packages) {                                                           // 1415
                                if (normalized.substr(0, pkg.length) == pkg                                            // 1416
                                    && (!normalized[pkg.length] || normalized[pkg.length] == '/')                      // 1417
                                    && pkgMatch.split('/').length < pkg.split('/').length)                             // 1418
                                    pkgMatch = pkg;                                                                    // 1419
                            }                                                                                          // 1420
                            if (pkgMatch && this.packages[pkgMatch].main)                                              // 1421
                                normalized = normalized.substr(0, normalized.length - this.packages[pkgMatch].main.length - 1);
                                                                                                                       // 1423
                            var pkg = this.packages[normalized] = this.packages[normalized] || {};                     // 1424
                            pkg.map = v;                                                                               // 1425
                        }                                                                                              // 1426
                        else {                                                                                         // 1427
                            this.map[p] = v;                                                                           // 1428
                        }                                                                                              // 1429
                    }                                                                                                  // 1430
                }                                                                                                      // 1431
                                                                                                                       // 1432
                if (cfg.packages) {                                                                                    // 1433
                    for (var p in cfg.packages) {                                                                      // 1434
                        var prop = this.normalizeSync(p);                                                              // 1435
                                                                                                                       // 1436
                        // if doing default js extensions, undo to get package name                                    // 1437
                        if (this.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js')                            // 1438
                            prop = prop.substr(0, prop.length - 3);                                                    // 1439
                                                                                                                       // 1440
                        this.packages[prop]= this.packages[prop] || {};                                                // 1441
                        for (var q in cfg.packages[p])                                                                 // 1442
                            this.packages[prop][q] = cfg.packages[p][q];                                               // 1443
                    }                                                                                                  // 1444
                }                                                                                                      // 1445
                                                                                                                       // 1446
                if (cfg.bundles) {                                                                                     // 1447
                    for (var p in cfg.bundles) {                                                                       // 1448
                        var bundle = [];                                                                               // 1449
                        for (var i = 0; i < cfg.bundles[p].length; i++)                                                // 1450
                            bundle.push(this.normalizeSync(cfg.bundles[p][i]));                                        // 1451
                        this.bundles[p] = bundle;                                                                      // 1452
                    }                                                                                                  // 1453
                }                                                                                                      // 1454
                                                                                                                       // 1455
                for (var c in cfg) {                                                                                   // 1456
                    var v = cfg[c];                                                                                    // 1457
                    var normalizeProp = false, normalizeValArray = false;                                              // 1458
                                                                                                                       // 1459
                    if (c == 'baseURL' || c == 'map' || c == 'packages' || c == 'bundles' || c == 'paths')             // 1460
                        continue;                                                                                      // 1461
                                                                                                                       // 1462
                    if (typeof v != 'object' || v instanceof Array) {                                                  // 1463
                        this[c] = v;                                                                                   // 1464
                    }                                                                                                  // 1465
                    else {                                                                                             // 1466
                        this[c] = this[c] || {};                                                                       // 1467
                                                                                                                       // 1468
                        if (c == 'meta' || c == 'depCache')                                                            // 1469
                            normalizeProp = true;                                                                      // 1470
                                                                                                                       // 1471
                        for (var p in v) {                                                                             // 1472
                            if (normalizeProp)                                                                         // 1473
                                this[c][this.normalizeSync(p)] = v[p];                                                 // 1474
                            else                                                                                       // 1475
                                this[c][p] = v[p];                                                                     // 1476
                        }                                                                                              // 1477
                    }                                                                                                  // 1478
                }                                                                                                      // 1479
            };                                                                                                         // 1480
                                                                                                                       // 1481
        })();/*                                                                                                        // 1482
         * Script tag fetch                                                                                            // 1483
         *                                                                                                             // 1484
         * When load.metadata.scriptLoad is true, we load via script tag injection.                                    // 1485
         */                                                                                                            // 1486
        (function() {                                                                                                  // 1487
                                                                                                                       // 1488
            if (typeof document != 'undefined')                                                                        // 1489
                var head = document.getElementsByTagName('head')[0];                                                   // 1490
                                                                                                                       // 1491
            // call this functione everytime a wrapper executes                                                        // 1492
            var curSystem;                                                                                             // 1493
            // System clobbering protection for Traceur                                                                // 1494
            SystemJSLoader.prototype.onScriptLoad = function() {                                                       // 1495
                __global.System = curSystem;                                                                           // 1496
            };                                                                                                         // 1497
                                                                                                                       // 1498
            function webWorkerImport(loader, load) {                                                                   // 1499
                return new Promise(function(resolve, reject) {                                                         // 1500
                    try {                                                                                              // 1501
                        importScripts(load.address);                                                                   // 1502
                    }                                                                                                  // 1503
                    catch(e) {                                                                                         // 1504
                        reject(e);                                                                                     // 1505
                    }                                                                                                  // 1506
                                                                                                                       // 1507
                    loader.onScriptLoad(load);                                                                         // 1508
                    // if nothing registered, then something went wrong                                                // 1509
                    if (!load.metadata.registered)                                                                     // 1510
                        reject(load.address + ' did not call System.register or AMD define');                          // 1511
                                                                                                                       // 1512
                    resolve('');                                                                                       // 1513
                });                                                                                                    // 1514
            }                                                                                                          // 1515
                                                                                                                       // 1516
            // override fetch to use script injection                                                                  // 1517
            hook('fetch', function(fetch) {                                                                            // 1518
                return function(load) {                                                                                // 1519
                    var loader = this;                                                                                 // 1520
                                                                                                                       // 1521
                    if (!load.metadata.scriptLoad || (!isBrowser && !isWorker))                                        // 1522
                        return fetch.call(this, load);                                                                 // 1523
                                                                                                                       // 1524
                    if (isWorker)                                                                                      // 1525
                        return webWorkerImport(loader, load);                                                          // 1526
                                                                                                                       // 1527
                    return new Promise(function(resolve, reject) {                                                     // 1528
                        var s = document.createElement('script');                                                      // 1529
                        s.async = true;                                                                                // 1530
                                                                                                                       // 1531
                        function complete(evt) {                                                                       // 1532
                            if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')                // 1533
                                return;                                                                                // 1534
                            cleanup();                                                                                 // 1535
                                                                                                                       // 1536
                            // this runs synchronously after execution                                                 // 1537
                            // we now need to tell the wrapper handlers that                                           // 1538
                            // this load record has just executed                                                      // 1539
                            loader.onScriptLoad(load);                                                                 // 1540
                                                                                                                       // 1541
                            // if nothing registered, then something went wrong                                        // 1542
                            if (!load.metadata.registered)                                                             // 1543
                                reject(load.address + ' did not call System.register or AMD define');                  // 1544
                                                                                                                       // 1545
                            resolve('');                                                                               // 1546
                        }                                                                                              // 1547
                                                                                                                       // 1548
                        function error(evt) {                                                                          // 1549
                            cleanup();                                                                                 // 1550
                            reject(new Error('Unable to load script ' + load.address));                                // 1551
                        }                                                                                              // 1552
                                                                                                                       // 1553
                        if (s.attachEvent) {                                                                           // 1554
                            s.attachEvent('onreadystatechange', complete);                                             // 1555
                        }                                                                                              // 1556
                        else {                                                                                         // 1557
                            s.addEventListener('load', complete, false);                                               // 1558
                            s.addEventListener('error', error, false);                                                 // 1559
                        }                                                                                              // 1560
                                                                                                                       // 1561
                        curSystem = __global.System;                                                                   // 1562
                        __global.System = loader;                                                                      // 1563
                        s.src = load.address;                                                                          // 1564
                        head.appendChild(s);                                                                           // 1565
                                                                                                                       // 1566
                        function cleanup() {                                                                           // 1567
                            if (s.detachEvent)                                                                         // 1568
                                s.detachEvent('onreadystatechange', complete);                                         // 1569
                            else {                                                                                     // 1570
                                s.removeEventListener('load', complete, false);                                        // 1571
                                s.removeEventListener('error', error, false);                                          // 1572
                            }                                                                                          // 1573
                            head.removeChild(s);                                                                       // 1574
                        }                                                                                              // 1575
                    });                                                                                                // 1576
                };                                                                                                     // 1577
            });                                                                                                        // 1578
        })();                                                                                                          // 1579
        /*                                                                                                             // 1580
         * Instantiate registry extension                                                                              // 1581
         *                                                                                                             // 1582
         * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.                               // 1583
         *                                                                                                             // 1584
         * - Creates the loader.register function                                                                      // 1585
         * - Also supports metadata.format = 'register' in instantiate for anonymous register modules                  // 1586
         * - Also supports metadata.deps, metadata.execute and metadata.executingRequire                               // 1587
         *     for handling dynamic modules alongside register-transformed ES6 modules                                 // 1588
         *                                                                                                             // 1589
         *                                                                                                             // 1590
         * The code here replicates the ES6 linking groups algorithm to ensure that                                    // 1591
         * circular ES6 compiled into System.register can work alongside circular AMD                                  // 1592
         * and CommonJS, identically to the actual ES6 loader.                                                         // 1593
         *                                                                                                             // 1594
         */                                                                                                            // 1595
        (function() {                                                                                                  // 1596
                                                                                                                       // 1597
            /*                                                                                                         // 1598
             * There are two variations of System.register:                                                            // 1599
             * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)             // 1600
             *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained                 // 1601
             *                                                                                                         // 1602
             * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
             * the true or false statement                                                                             // 1604
             *                                                                                                         // 1605
             * this extension implements the linking algorithm for the two variations identical to the spec            // 1606
             * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.            // 1607
             *                                                                                                         // 1608
             */                                                                                                        // 1609
            var anonRegister;                                                                                          // 1610
            var calledRegister;                                                                                        // 1611
            function doRegister(loader, name, register) {                                                              // 1612
                calledRegister = true;                                                                                 // 1613
                                                                                                                       // 1614
                // named register                                                                                      // 1615
                if (name) {                                                                                            // 1616
                    name = loader.normalizeSync(name);                                                                 // 1617
                    register.name = name;                                                                              // 1618
                    if (!(name in loader.defined))                                                                     // 1619
                        loader.defined[name] = register;                                                               // 1620
                }                                                                                                      // 1621
                // anonymous register                                                                                  // 1622
                else if (register.declarative) {                                                                       // 1623
                    if (anonRegister)                                                                                  // 1624
                        throw new TypeError('Multiple anonymous System.register calls in the same module file.');      // 1625
                    anonRegister = register;                                                                           // 1626
                }                                                                                                      // 1627
            }                                                                                                          // 1628
            SystemJSLoader.prototype.register = function(name, deps, declare) {                                        // 1629
                if (typeof name != 'string') {                                                                         // 1630
                    declare = deps;                                                                                    // 1631
                    deps = name;                                                                                       // 1632
                    name = null;                                                                                       // 1633
                }                                                                                                      // 1634
                                                                                                                       // 1635
                // dynamic backwards-compatibility                                                                     // 1636
                // can be deprecated eventually                                                                        // 1637
                if (typeof declare == 'boolean')                                                                       // 1638
                    return this.registerDynamic.apply(this, arguments);                                                // 1639
                                                                                                                       // 1640
                doRegister(this, name, {                                                                               // 1641
                    declarative: true,                                                                                 // 1642
                    deps: deps,                                                                                        // 1643
                    declare: declare                                                                                   // 1644
                });                                                                                                    // 1645
            };                                                                                                         // 1646
            SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {                        // 1647
                if (typeof name != 'string') {                                                                         // 1648
                    execute = declare;                                                                                 // 1649
                    declare = deps;                                                                                    // 1650
                    deps = name;                                                                                       // 1651
                    name = null;                                                                                       // 1652
                }                                                                                                      // 1653
                                                                                                                       // 1654
                // dynamic                                                                                             // 1655
                doRegister(this, name, {                                                                               // 1656
                    declarative: false,                                                                                // 1657
                    deps: deps,                                                                                        // 1658
                    execute: execute,                                                                                  // 1659
                    executingRequire: declare                                                                          // 1660
                });                                                                                                    // 1661
            };                                                                                                         // 1662
            /*                                                                                                         // 1663
             * Registry side table - loader.defined                                                                    // 1664
             * Registry Entry Contains:                                                                                // 1665
             *    - name                                                                                               // 1666
             *    - deps                                                                                               // 1667
             *    - declare for declarative modules                                                                    // 1668
             *    - execute for dynamic modules, different to declarative execute on module                            // 1669
             *    - executingRequire indicates require drives execution for circularity of dynamic modules             // 1670
             *    - declarative optional boolean indicating which of the above                                         // 1671
             *                                                                                                         // 1672
             * Can preload modules directly on System.defined['my/module'] = { deps, execute, executingRequire }       // 1673
             *                                                                                                         // 1674
             * Then the entry gets populated with derived information during processing:                               // 1675
             *    - normalizedDeps derived from deps, created in instantiate                                           // 1676
             *    - groupIndex used by group linking algorithm                                                         // 1677
             *    - evaluated indicating whether evaluation has happend                                                // 1678
             *    - module the module record object, containing:                                                       // 1679
             *      - exports actual module exports                                                                    // 1680
             *                                                                                                         // 1681
             *    For dynamic we track the es module with:                                                             // 1682
             *    - esModule actual es module value                                                                    // 1683
             *                                                                                                         // 1684
             *    Then for declarative only we track dynamic bindings with the 'module' records:                       // 1685
             *      - name                                                                                             // 1686
             *      - exports                                                                                          // 1687
             *      - setters declarative setter functions                                                             // 1688
             *      - dependencies, module records of dependencies                                                     // 1689
             *      - importers, module records of dependents                                                          // 1690
             *                                                                                                         // 1691
             * After linked and evaluated, entries are removed, declarative module records remain in separate          // 1692
             * module binding table                                                                                    // 1693
             *                                                                                                         // 1694
             */                                                                                                        // 1695
            hookConstructor(function(constructor) {                                                                    // 1696
                return function() {                                                                                    // 1697
                    constructor.call(this);                                                                            // 1698
                                                                                                                       // 1699
                    this.defined = {};                                                                                 // 1700
                    this._loader.moduleRecords = {};                                                                   // 1701
                };                                                                                                     // 1702
            });                                                                                                        // 1703
                                                                                                                       // 1704
            // script injection mode calls this function synchronously on load                                         // 1705
            hook('onScriptLoad', function(onScriptLoad) {                                                              // 1706
                return function(load) {                                                                                // 1707
                    onScriptLoad.call(this, load);                                                                     // 1708
                                                                                                                       // 1709
                    // anonymous define                                                                                // 1710
                    if (anonRegister)                                                                                  // 1711
                        load.metadata.entry = anonRegister;                                                            // 1712
                                                                                                                       // 1713
                    if (calledRegister) {                                                                              // 1714
                        load.metadata.format = load.metadata.format || 'defined';                                      // 1715
                        load.metadata.registered = true;                                                               // 1716
                        calledRegister = false;                                                                        // 1717
                        anonRegister = null;                                                                           // 1718
                    }                                                                                                  // 1719
                };                                                                                                     // 1720
            });                                                                                                        // 1721
                                                                                                                       // 1722
            function buildGroups(entry, loader, groups) {                                                              // 1723
                groups[entry.groupIndex] = groups[entry.groupIndex] || [];                                             // 1724
                                                                                                                       // 1725
                if (indexOf.call(groups[entry.groupIndex], entry) != -1)                                               // 1726
                    return;                                                                                            // 1727
                                                                                                                       // 1728
                groups[entry.groupIndex].push(entry);                                                                  // 1729
                                                                                                                       // 1730
                for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {                                         // 1731
                    var depName = entry.normalizedDeps[i];                                                             // 1732
                    var depEntry = loader.defined[depName];                                                            // 1733
                                                                                                                       // 1734
                    // not in the registry means already linked / ES6                                                  // 1735
                    if (!depEntry || depEntry.evaluated)                                                               // 1736
                        continue;                                                                                      // 1737
                                                                                                                       // 1738
                    // now we know the entry is in our unlinked linkage group                                          // 1739
                    var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);                // 1740
                                                                                                                       // 1741
                    // the group index of an entry is always the maximum                                               // 1742
                    if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {                    // 1743
                                                                                                                       // 1744
                        // if already in a group, remove from the old group                                            // 1745
                        if (depEntry.groupIndex !== undefined) {                                                       // 1746
                            groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);
                                                                                                                       // 1748
                            // if the old group is empty, then we have a mixed depndency cycle                         // 1749
                            if (groups[depEntry.groupIndex].length == 0)                                               // 1750
                                throw new TypeError("Mixed dependency cycle detected");                                // 1751
                        }                                                                                              // 1752
                                                                                                                       // 1753
                        depEntry.groupIndex = depGroupIndex;                                                           // 1754
                    }                                                                                                  // 1755
                                                                                                                       // 1756
                    buildGroups(depEntry, loader, groups);                                                             // 1757
                }                                                                                                      // 1758
            }                                                                                                          // 1759
                                                                                                                       // 1760
            function link(name, loader) {                                                                              // 1761
                var startEntry = loader.defined[name];                                                                 // 1762
                                                                                                                       // 1763
                // skip if already linked                                                                              // 1764
                if (startEntry.module)                                                                                 // 1765
                    return;                                                                                            // 1766
                                                                                                                       // 1767
                startEntry.groupIndex = 0;                                                                             // 1768
                                                                                                                       // 1769
                var groups = [];                                                                                       // 1770
                                                                                                                       // 1771
                buildGroups(startEntry, loader, groups);                                                               // 1772
                                                                                                                       // 1773
                var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;                               // 1774
                for (var i = groups.length - 1; i >= 0; i--) {                                                         // 1775
                    var group = groups[i];                                                                             // 1776
                    for (var j = 0; j < group.length; j++) {                                                           // 1777
                        var entry = group[j];                                                                          // 1778
                                                                                                                       // 1779
                        // link each group                                                                             // 1780
                        if (curGroupDeclarative)                                                                       // 1781
                            linkDeclarativeModule(entry, loader);                                                      // 1782
                        else                                                                                           // 1783
                            linkDynamicModule(entry, loader);                                                          // 1784
                    }                                                                                                  // 1785
                    curGroupDeclarative = !curGroupDeclarative;                                                        // 1786
                }                                                                                                      // 1787
            }                                                                                                          // 1788
                                                                                                                       // 1789
            // module binding records                                                                                  // 1790
            function getOrCreateModuleRecord(name, moduleRecords) {                                                    // 1791
                return moduleRecords[name] || (moduleRecords[name] = {                                                 // 1792
                        name: name,                                                                                    // 1793
                        dependencies: [],                                                                              // 1794
                        exports: {}, // start from an empty module and extend                                          // 1795
                        importers: []                                                                                  // 1796
                    });                                                                                                // 1797
            }                                                                                                          // 1798
                                                                                                                       // 1799
            function linkDeclarativeModule(entry, loader) {                                                            // 1800
                // only link if already not already started linking (stops at circular)                                // 1801
                if (entry.module)                                                                                      // 1802
                    return;                                                                                            // 1803
                                                                                                                       // 1804
                var moduleRecords = loader._loader.moduleRecords;                                                      // 1805
                var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);                        // 1806
                var exports = entry.module.exports;                                                                    // 1807
                                                                                                                       // 1808
                var declaration = entry.declare.call(__global, function(name, value) {                                 // 1809
                    module.locked = true;                                                                              // 1810
                                                                                                                       // 1811
                    if (typeof name == 'object') {                                                                     // 1812
                        for (var p in name)                                                                            // 1813
                            exports[p] = name[p];                                                                      // 1814
                    }                                                                                                  // 1815
                    else {                                                                                             // 1816
                        exports[name] = value;                                                                         // 1817
                    }                                                                                                  // 1818
                                                                                                                       // 1819
                    for (var i = 0, l = module.importers.length; i < l; i++) {                                         // 1820
                        var importerModule = module.importers[i];                                                      // 1821
                        if (!importerModule.locked) {                                                                  // 1822
                            var importerIndex = indexOf.call(importerModule.dependencies, module);                     // 1823
                            importerModule.setters[importerIndex](exports);                                            // 1824
                        }                                                                                              // 1825
                    }                                                                                                  // 1826
                                                                                                                       // 1827
                    module.locked = false;                                                                             // 1828
                    return value;                                                                                      // 1829
                });                                                                                                    // 1830
                                                                                                                       // 1831
                module.setters = declaration.setters;                                                                  // 1832
                module.execute = declaration.execute;                                                                  // 1833
                                                                                                                       // 1834
                if (!module.setters || !module.execute) {                                                              // 1835
                    throw new TypeError('Invalid System.register form for ' + entry.name);                             // 1836
                }                                                                                                      // 1837
                                                                                                                       // 1838
                // now link all the module dependencies                                                                // 1839
                for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {                                         // 1840
                    var depName = entry.normalizedDeps[i];                                                             // 1841
                    var depEntry = loader.defined[depName];                                                            // 1842
                    var depModule = moduleRecords[depName];                                                            // 1843
                                                                                                                       // 1844
                    // work out how to set depExports based on scenarios...                                            // 1845
                    var depExports;                                                                                    // 1846
                                                                                                                       // 1847
                    if (depModule) {                                                                                   // 1848
                        depExports = depModule.exports;                                                                // 1849
                    }                                                                                                  // 1850
                    // dynamic, already linked in our registry                                                         // 1851
                    else if (depEntry && !depEntry.declarative) {                                                      // 1852
                        depExports = depEntry.esModule;                                                                // 1853
                    }                                                                                                  // 1854
                    // in the loader registry                                                                          // 1855
                    else if (!depEntry) {                                                                              // 1856
                        depExports = loader.get(depName);                                                              // 1857
                    }                                                                                                  // 1858
                    // we have an entry -> link                                                                        // 1859
                    else {                                                                                             // 1860
                        linkDeclarativeModule(depEntry, loader);                                                       // 1861
                        depModule = depEntry.module;                                                                   // 1862
                        depExports = depModule.exports;                                                                // 1863
                    }                                                                                                  // 1864
                                                                                                                       // 1865
                    // only declarative modules have dynamic bindings                                                  // 1866
                    if (depModule && depModule.importers) {                                                            // 1867
                        depModule.importers.push(module);                                                              // 1868
                        module.dependencies.push(depModule);                                                           // 1869
                    }                                                                                                  // 1870
                    else {                                                                                             // 1871
                        module.dependencies.push(null);                                                                // 1872
                    }                                                                                                  // 1873
                                                                                                                       // 1874
                    // run the setter for this dependency                                                              // 1875
                    if (module.setters[i])                                                                             // 1876
                        module.setters[i](depExports);                                                                 // 1877
                }                                                                                                      // 1878
            }                                                                                                          // 1879
                                                                                                                       // 1880
            // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
            function getModule(name, loader) {                                                                         // 1882
                var exports;                                                                                           // 1883
                var entry = loader.defined[name];                                                                      // 1884
                                                                                                                       // 1885
                if (!entry) {                                                                                          // 1886
                    exports = loader.get(name);                                                                        // 1887
                    if (!exports)                                                                                      // 1888
                        throw new Error('Unable to load dependency ' + name + '.');                                    // 1889
                }                                                                                                      // 1890
                                                                                                                       // 1891
                else {                                                                                                 // 1892
                    if (entry.declarative)                                                                             // 1893
                        ensureEvaluated(name, [], loader);                                                             // 1894
                                                                                                                       // 1895
                    else if (!entry.evaluated)                                                                         // 1896
                        linkDynamicModule(entry, loader);                                                              // 1897
                                                                                                                       // 1898
                    exports = entry.module.exports;                                                                    // 1899
                }                                                                                                      // 1900
                                                                                                                       // 1901
                if ((!entry || entry.declarative) && exports && exports.__useDefault)                                  // 1902
                    return exports['default'];                                                                         // 1903
                                                                                                                       // 1904
                return exports;                                                                                        // 1905
            }                                                                                                          // 1906
                                                                                                                       // 1907
            function linkDynamicModule(entry, loader) {                                                                // 1908
                if (entry.module)                                                                                      // 1909
                    return;                                                                                            // 1910
                                                                                                                       // 1911
                var exports = {};                                                                                      // 1912
                                                                                                                       // 1913
                var module = entry.module = { exports: exports, id: entry.name };                                      // 1914
                                                                                                                       // 1915
                // AMD requires execute the tree first                                                                 // 1916
                if (!entry.executingRequire) {                                                                         // 1917
                    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {                                     // 1918
                        var depName = entry.normalizedDeps[i];                                                         // 1919
                        // we know we only need to link dynamic due to linking algorithm                               // 1920
                        var depEntry = loader.defined[depName];                                                        // 1921
                        if (depEntry)                                                                                  // 1922
                            linkDynamicModule(depEntry, loader);                                                       // 1923
                    }                                                                                                  // 1924
                }                                                                                                      // 1925
                                                                                                                       // 1926
                // now execute                                                                                         // 1927
                entry.evaluated = true;                                                                                // 1928
                var output = entry.execute.call(__global, function(name) {                                             // 1929
                    for (var i = 0, l = entry.deps.length; i < l; i++) {                                               // 1930
                        if (entry.deps[i] != name)                                                                     // 1931
                            continue;                                                                                  // 1932
                        return getModule(entry.normalizedDeps[i], loader);                                             // 1933
                    }                                                                                                  // 1934
                    throw new TypeError('Module ' + name + ' not declared as a dependency.');                          // 1935
                }, exports, module);                                                                                   // 1936
                                                                                                                       // 1937
                if (output)                                                                                            // 1938
                    module.exports = output;                                                                           // 1939
                                                                                                                       // 1940
                // create the esModule object, which allows ES6 named imports of dynamics                              // 1941
                exports = module.exports;                                                                              // 1942
                                                                                                                       // 1943
                if (exports && exports.__esModule) {                                                                   // 1944
                    entry.esModule = exports;                                                                          // 1945
                }                                                                                                      // 1946
                else {                                                                                                 // 1947
                    entry.esModule = {};                                                                               // 1948
                                                                                                                       // 1949
                    // don't trigger getters/setters in environments that support them                                 // 1950
                    if (typeof exports == 'object' || typeof exports == 'function') {                                  // 1951
                        if (Object.getOwnPropertyDescriptor) {                                                         // 1952
                            var d;                                                                                     // 1953
                            for (var p in exports)                                                                     // 1954
                                if (d = Object.getOwnPropertyDescriptor(exports, p))                                   // 1955
                                    Object.defineProperty(entry.esModule, p, d);                                       // 1956
                        }                                                                                              // 1957
                        else {                                                                                         // 1958
                            var hasOwnProperty = exports && exports.hasOwnProperty;                                    // 1959
                            for (var p in exports) {                                                                   // 1960
                                if (!hasOwnProperty || exports.hasOwnProperty(p))                                      // 1961
                                    entry.esModule[p] = exports[p];                                                    // 1962
                            }                                                                                          // 1963
                        }                                                                                              // 1964
                    }                                                                                                  // 1965
                    entry.esModule['default'] = exports;                                                               // 1966
                    defineProperty(entry.esModule, '__useDefault', {                                                   // 1967
                        value: true                                                                                    // 1968
                    });                                                                                                // 1969
                }                                                                                                      // 1970
            }                                                                                                          // 1971
                                                                                                                       // 1972
            /*                                                                                                         // 1973
             * Given a module, and the list of modules for this current branch,                                        // 1974
             *  ensure that each of the dependencies of this module is evaluated                                       // 1975
             *  (unless one is a circular dependency already in the list of seen                                       // 1976
             *  modules, in which case we execute it)                                                                  // 1977
             *                                                                                                         // 1978
             * Then we evaluate the module itself depth-first left to right                                            // 1979
             * execution to match ES6 modules                                                                          // 1980
             */                                                                                                        // 1981
            function ensureEvaluated(moduleName, seen, loader) {                                                       // 1982
                var entry = loader.defined[moduleName];                                                                // 1983
                                                                                                                       // 1984
                // if already seen, that means it's an already-evaluated non circular dependency                       // 1985
                if (!entry || entry.evaluated || !entry.declarative)                                                   // 1986
                    return;                                                                                            // 1987
                                                                                                                       // 1988
                // this only applies to declarative modules which late-execute                                         // 1989
                                                                                                                       // 1990
                seen.push(moduleName);                                                                                 // 1991
                                                                                                                       // 1992
                for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {                                         // 1993
                    var depName = entry.normalizedDeps[i];                                                             // 1994
                    if (indexOf.call(seen, depName) == -1) {                                                           // 1995
                        if (!loader.defined[depName])                                                                  // 1996
                            loader.get(depName);                                                                       // 1997
                        else                                                                                           // 1998
                            ensureEvaluated(depName, seen, loader);                                                    // 1999
                    }                                                                                                  // 2000
                }                                                                                                      // 2001
                                                                                                                       // 2002
                if (entry.evaluated)                                                                                   // 2003
                    return;                                                                                            // 2004
                                                                                                                       // 2005
                entry.evaluated = true;                                                                                // 2006
                entry.module.execute.call(__global);                                                                   // 2007
            }                                                                                                          // 2008
                                                                                                                       // 2009
            // override the delete method to also clear the register caches                                            // 2010
            hook('delete', function(del) {                                                                             // 2011
                return function(name) {                                                                                // 2012
                    delete this._loader.moduleRecords[name];                                                           // 2013
                    delete this.defined[name];                                                                         // 2014
                    return del.call(this, name);                                                                       // 2015
                };                                                                                                     // 2016
            });                                                                                                        // 2017
                                                                                                                       // 2018
            var registerRegEx = /^\s*(\/\*.*\*\/\s*|\/\/[^\n]*\s*)*System\.register(Dynamic)?\s*\(/;                   // 2019
                                                                                                                       // 2020
            hook('fetch', function(fetch) {                                                                            // 2021
                return function(load) {                                                                                // 2022
                    if (this.defined[load.name]) {                                                                     // 2023
                        load.metadata.format = 'defined';                                                              // 2024
                        return '';                                                                                     // 2025
                    }                                                                                                  // 2026
                                                                                                                       // 2027
                    // this is the synchronous chain for onScriptLoad                                                  // 2028
                    anonRegister = null;                                                                               // 2029
                    calledRegister = false;                                                                            // 2030
                                                                                                                       // 2031
                    if (load.metadata.format == 'register')                                                            // 2032
                        load.metadata.scriptLoad = true;                                                               // 2033
                                                                                                                       // 2034
                    // NB remove when "deps " is deprecated                                                            // 2035
                    load.metadata.deps = load.metadata.deps || [];                                                     // 2036
                                                                                                                       // 2037
                    return fetch.call(this, load);                                                                     // 2038
                };                                                                                                     // 2039
            });                                                                                                        // 2040
                                                                                                                       // 2041
            hook('translate', function(translate) {                                                                    // 2042
                // we run the meta detection here (register is after meta)                                             // 2043
                return function(load) {                                                                                // 2044
                    return Promise.resolve(translate.call(this, load)).then(function(source) {                         // 2045
                                                                                                                       // 2046
                        if (typeof load.metadata.deps === 'string')                                                    // 2047
                            load.metadata.deps = load.metadata.deps.split(',');                                        // 2048
                        load.metadata.deps = load.metadata.deps || [];                                                 // 2049
                                                                                                                       // 2050
                        // run detection for register format                                                           // 2051
                        if (load.metadata.format == 'register' || !load.metadata.format && load.source.match(registerRegEx))
                            load.metadata.format = 'register';                                                         // 2053
                        return source;                                                                                 // 2054
                    });                                                                                                // 2055
                };                                                                                                     // 2056
            });                                                                                                        // 2057
                                                                                                                       // 2058
            hook('instantiate', function(instantiate) {                                                                // 2059
                return function(load) {                                                                                // 2060
                    var loader = this;                                                                                 // 2061
                                                                                                                       // 2062
                    var entry;                                                                                         // 2063
                                                                                                                       // 2064
                    // first we check if this module has already been defined in the registry                          // 2065
                    if (loader.defined[load.name]) {                                                                   // 2066
                        entry = loader.defined[load.name];                                                             // 2067
                        entry.deps = entry.deps.concat(load.metadata.deps);                                            // 2068
                    }                                                                                                  // 2069
                                                                                                                       // 2070
                    // picked up already by a script injection                                                         // 2071
                    else if (load.metadata.entry)                                                                      // 2072
                        entry = load.metadata.entry;                                                                   // 2073
                                                                                                                       // 2074
                    // otherwise check if it is dynamic                                                                // 2075
                    else if (load.metadata.execute) {                                                                  // 2076
                        entry = {                                                                                      // 2077
                            declarative: false,                                                                        // 2078
                            deps: load.metadata.deps || [],                                                            // 2079
                            execute: load.metadata.execute,                                                            // 2080
                            executingRequire: load.metadata.executingRequire // NodeJS-style requires or not           // 2081
                        };                                                                                             // 2082
                    }                                                                                                  // 2083
                                                                                                                       // 2084
                    // Contains System.register calls                                                                  // 2085
                    else if (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6') {
                        anonRegister = null;                                                                           // 2087
                        calledRegister = false;                                                                        // 2088
                                                                                                                       // 2089
                        __exec.call(loader, load);                                                                     // 2090
                                                                                                                       // 2091
                        if (anonRegister)                                                                              // 2092
                            entry = anonRegister;                                                                      // 2093
                        else                                                                                           // 2094
                            load.metadata.bundle = true;                                                               // 2095
                                                                                                                       // 2096
                        if (!entry && loader.defined[load.name])                                                       // 2097
                            entry = loader.defined[load.name];                                                         // 2098
                                                                                                                       // 2099
                        if (!calledRegister && !load.metadata.registered)                                              // 2100
                            throw new TypeError(load.name + ' detected as System.register but didn\'t execute.');      // 2101
                    }                                                                                                  // 2102
                                                                                                                       // 2103
                    // named bundles are just an empty module                                                          // 2104
                    if (!entry)                                                                                        // 2105
                        entry = {                                                                                      // 2106
                            declarative: false,                                                                        // 2107
                            deps: load.metadata.deps,                                                                  // 2108
                            execute: function() {                                                                      // 2109
                                return loader.newModule({});                                                           // 2110
                            }                                                                                          // 2111
                        };                                                                                             // 2112
                                                                                                                       // 2113
                    // place this module onto defined for circular references                                          // 2114
                    loader.defined[load.name] = entry;                                                                 // 2115
                                                                                                                       // 2116
                    entry.deps = dedupe(entry.deps);                                                                   // 2117
                    entry.name = load.name;                                                                            // 2118
                                                                                                                       // 2119
                    // first, normalize all dependencies                                                               // 2120
                    var normalizePromises = [];                                                                        // 2121
                    for (var i = 0, l = entry.deps.length; i < l; i++)                                                 // 2122
                        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));           // 2123
                                                                                                                       // 2124
                    return Promise.all(normalizePromises).then(function(normalizedDeps) {                              // 2125
                                                                                                                       // 2126
                        entry.normalizedDeps = normalizedDeps;                                                         // 2127
                                                                                                                       // 2128
                        return {                                                                                       // 2129
                            deps: entry.deps,                                                                          // 2130
                            execute: function() {                                                                      // 2131
                                // recursively ensure that the module and all its                                      // 2132
                                // dependencies are linked (with dependency group handling)                            // 2133
                                link(load.name, loader);                                                               // 2134
                                                                                                                       // 2135
                                // now handle dependency execution in correct order                                    // 2136
                                ensureEvaluated(load.name, [], loader);                                                // 2137
                                                                                                                       // 2138
                                // remove from the registry                                                            // 2139
                                loader.defined[load.name] = undefined;                                                 // 2140
                                                                                                                       // 2141
                                // return the defined module object                                                    // 2142
                                return loader.newModule(entry.declarative ? entry.module.exports : entry.esModule);    // 2143
                            }                                                                                          // 2144
                        };                                                                                             // 2145
                    });                                                                                                // 2146
                };                                                                                                     // 2147
            });                                                                                                        // 2148
        })();                                                                                                          // 2149
        /*                                                                                                             // 2150
         * Extension to detect ES6 and auto-load Traceur or Babel for processing                                       // 2151
         */                                                                                                            // 2152
        (function() {                                                                                                  // 2153
            // good enough ES6 module detection regex - format detections not designed to be accurate, but to handle the 99% use case
            var esmRegEx = /(^\s*|[}\);\n]\s*)(import\s+(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s+from\s+['"]|\{)|export\s+\*\s+from\s+["']|export\s+(\{|default|function|class|var|const|let|async\s+function))/;
                                                                                                                       // 2156
            var traceurRuntimeRegEx = /\$traceurRuntime\s*\./;                                                         // 2157
            var babelHelpersRegEx = /babelHelpers\s*\./;                                                               // 2158
                                                                                                                       // 2159
            hook('translate', function(translate) {                                                                    // 2160
                return function(load) {                                                                                // 2161
                    var loader = this;                                                                                 // 2162
                    return translate.call(loader, load)                                                                // 2163
                        .then(function(source) {                                                                       // 2164
                            // detect & transpile ES6                                                                  // 2165
                            if (load.metadata.format == 'esm' || load.metadata.format == 'es6' || !load.metadata.format && source.match(esmRegEx)) {
                                load.metadata.format = 'esm';                                                          // 2167
                                                                                                                       // 2168
                                // setting _loadedTranspiler = false tells the next block to                           // 2169
                                // do checks for setting transpiler metadata                                           // 2170
                                loader._loadedTranspiler = loader._loadedTranspiler || false;                          // 2171
                                if (loader.pluginLoader)                                                               // 2172
                                    loader.pluginLoader._loadedTranspiler = loader._loadedTranspiler || false;         // 2173
                                                                                                                       // 2174
                                // defined in es6-module-loader/src/transpile.js                                       // 2175
                                return transpile.call(loader, load)                                                    // 2176
                                    .then(function(source) {                                                           // 2177
                                        // clear sourceMap as transpiler embeds it                                     // 2178
                                        load.metadata.sourceMap = undefined;                                           // 2179
                                        return source;                                                                 // 2180
                                    });                                                                                // 2181
                            }                                                                                          // 2182
                                                                                                                       // 2183
                            // load the transpiler correctly                                                           // 2184
                            if (loader._loadedTranspiler === false && load.name == loader.normalizeSync(loader.transpiler)) {
                                // always load transpiler as a global                                                  // 2186
                                if (source.length > 100) {                                                             // 2187
                                    load.metadata.format = load.metadata.format || 'global';                           // 2188
                                                                                                                       // 2189
                                    if (loader.transpiler === 'traceur')                                               // 2190
                                        load.metadata.exports = 'traceur';                                             // 2191
                                    if (loader.transpiler === 'typescript')                                            // 2192
                                        load.metadata.exports = 'ts';                                                  // 2193
                                }                                                                                      // 2194
                                                                                                                       // 2195
                                loader._loadedTranspiler = true;                                                       // 2196
                            }                                                                                          // 2197
                                                                                                                       // 2198
                            // load the transpiler runtime correctly                                                   // 2199
                            if (loader._loadedTranspilerRuntime === false) {                                           // 2200
                                if (load.name == loader.normalizeSync('traceur-runtime')                               // 2201
                                    || load.name == loader.normalizeSync('babel/external-helpers*')) {                 // 2202
                                    if (source.length > 100)                                                           // 2203
                                        load.metadata.format = load.metadata.format || 'global';                       // 2204
                                                                                                                       // 2205
                                    loader._loadedTranspilerRuntime = true;                                            // 2206
                                }                                                                                      // 2207
                            }                                                                                          // 2208
                                                                                                                       // 2209
                            // detect transpiler runtime usage to load runtimes                                        // 2210
                            if (load.metadata.format == 'register' && loader._loadedTranspilerRuntime !== true) {      // 2211
                                if (!__global.$traceurRuntime && load.source.match(traceurRuntimeRegEx)) {             // 2212
                                    loader._loadedTranspilerRuntime = loader._loadedTranspilerRuntime || false;        // 2213
                                    return loader['import']('traceur-runtime').then(function() {                       // 2214
                                        return source;                                                                 // 2215
                                    });                                                                                // 2216
                                }                                                                                      // 2217
                                if (!__global.babelHelpers && load.source.match(babelHelpersRegEx)) {                  // 2218
                                    loader._loadedTranspilerRuntime = loader._loadedTranspilerRuntime || false;        // 2219
                                    return loader['import']('babel/external-helpers').then(function() {                // 2220
                                        return source;                                                                 // 2221
                                    });                                                                                // 2222
                                }                                                                                      // 2223
                            }                                                                                          // 2224
                                                                                                                       // 2225
                            return source;                                                                             // 2226
                        });                                                                                            // 2227
                };                                                                                                     // 2228
            });                                                                                                        // 2229
                                                                                                                       // 2230
        })();                                                                                                          // 2231
        /*                                                                                                             // 2232
         SystemJS Global Format                                                                                        // 2233
                                                                                                                       // 2234
         Supports                                                                                                      // 2235
         metadata.deps                                                                                                 // 2236
         metadata.globals                                                                                              // 2237
         metadata.exports                                                                                              // 2238
                                                                                                                       // 2239
         Without metadata.exports, detects writes to the global object.                                                // 2240
         */                                                                                                            // 2241
        var __globalName = typeof self != 'undefined' ? 'self' : 'global';                                             // 2242
                                                                                                                       // 2243
        hook('onScriptLoad', function(onScriptLoad) {                                                                  // 2244
            return function(load) {                                                                                    // 2245
                if (load.metadata.format == 'global') {                                                                // 2246
                    load.metadata.registered = true;                                                                   // 2247
                    var globalValue = readMemberExpression(load.metadata.exports, __global);                           // 2248
                    load.metadata.execute = function() {                                                               // 2249
                        return globalValue;                                                                            // 2250
                    }                                                                                                  // 2251
                }                                                                                                      // 2252
                return onScriptLoad.call(this, load);                                                                  // 2253
            };                                                                                                         // 2254
        });                                                                                                            // 2255
                                                                                                                       // 2256
        hook('fetch', function(fetch) {                                                                                // 2257
            return function(load) {                                                                                    // 2258
                if (load.metadata.exports)                                                                             // 2259
                    load.metadata.format = 'global';                                                                   // 2260
                                                                                                                       // 2261
                // A global with exports, no globals and no deps                                                       // 2262
                // can be loaded via a script tag                                                                      // 2263
                if (load.metadata.format == 'global'                                                                   // 2264
                    && load.metadata.exports && !load.metadata.globals                                                 // 2265
                    && (!load.metadata.deps || load.metadata.deps.length == 0))                                        // 2266
                    load.metadata.scriptLoad = true;                                                                   // 2267
                                                                                                                       // 2268
                return fetch.call(this, load);                                                                         // 2269
            };                                                                                                         // 2270
        });                                                                                                            // 2271
                                                                                                                       // 2272
// ideally we could support script loading for globals, but the issue with that is that                                // 2273
// we can't do it with AMD support side-by-side since AMD support means defining the                                   // 2274
// global define, and global support means not definining it, yet we don't have any hook                               // 2275
// into the "pre-execution" phase of a script tag being loaded to handle both cases                                    // 2276
                                                                                                                       // 2277
                                                                                                                       // 2278
        hook('instantiate', function(instantiate) {                                                                    // 2279
            return function(load) {                                                                                    // 2280
                var loader = this;                                                                                     // 2281
                                                                                                                       // 2282
                if (!load.metadata.format)                                                                             // 2283
                    load.metadata.format = 'global';                                                                   // 2284
                                                                                                                       // 2285
                // add globals as dependencies                                                                         // 2286
                if (load.metadata.globals)                                                                             // 2287
                    for (var g in load.metadata.globals)                                                               // 2288
                        load.metadata.deps.push(load.metadata.globals[g]);                                             // 2289
                                                                                                                       // 2290
                // global is a fallback module format                                                                  // 2291
                if (load.metadata.format == 'global' && !load.metadata.registered) {                                   // 2292
                    load.metadata.execute = function(require, exports, module) {                                       // 2293
                                                                                                                       // 2294
                        var globals;                                                                                   // 2295
                        if (load.metadata.globals) {                                                                   // 2296
                            globals = {};                                                                              // 2297
                            for (var g in load.metadata.globals)                                                       // 2298
                                globals[g] = require(load.metadata.globals[g]);                                        // 2299
                        }                                                                                              // 2300
                                                                                                                       // 2301
                        var exportName = load.metadata.exports;                                                        // 2302
                        var retrieveGlobal = loader.get('@@global-helpers').prepareGlobal(module.id, exportName, globals);
                                                                                                                       // 2304
                        if (exportName)                                                                                // 2305
                            load.source += '\n' + __globalName + '["' + exportName + '"] = ' + exportName + ';';       // 2306
                                                                                                                       // 2307
                        // disable module detection                                                                    // 2308
                        var define = __global.define;                                                                  // 2309
                        var cRequire = __global.require;                                                               // 2310
                                                                                                                       // 2311
                        __global.define = undefined;                                                                   // 2312
                        __global.module = undefined;                                                                   // 2313
                        __global.exports = undefined;                                                                  // 2314
                                                                                                                       // 2315
                        __exec.call(loader, load);                                                                     // 2316
                                                                                                                       // 2317
                        __global.require = cRequire;                                                                   // 2318
                        __global.define = define;                                                                      // 2319
                                                                                                                       // 2320
                        return retrieveGlobal();                                                                       // 2321
                    }                                                                                                  // 2322
                }                                                                                                      // 2323
                return instantiate.call(this, load);                                                                   // 2324
            };                                                                                                         // 2325
        });                                                                                                            // 2326
        hookConstructor(function(constructor) {                                                                        // 2327
            return function() {                                                                                        // 2328
                var loader = this;                                                                                     // 2329
                constructor.call(loader);                                                                              // 2330
                                                                                                                       // 2331
                var hasOwnProperty = Object.prototype.hasOwnProperty;                                                  // 2332
                                                                                                                       // 2333
                // bare minimum ignores for IE8                                                                        // 2334
                var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external'];
                                                                                                                       // 2336
                var globalSnapshot;                                                                                    // 2337
                                                                                                                       // 2338
                function forEachGlobal(callback) {                                                                     // 2339
                    if (Object.keys)                                                                                   // 2340
                        Object.keys(__global).forEach(callback);                                                       // 2341
                    else                                                                                               // 2342
                        for (var g in __global) {                                                                      // 2343
                            if (!hasOwnProperty.call(__global, g))                                                     // 2344
                                continue;                                                                              // 2345
                            callback(g);                                                                               // 2346
                        }                                                                                              // 2347
                }                                                                                                      // 2348
                                                                                                                       // 2349
                function forEachGlobalValue(callback) {                                                                // 2350
                    forEachGlobal(function(globalName) {                                                               // 2351
                        if (indexOf.call(ignoredGlobalProps, globalName) != -1)                                        // 2352
                            return;                                                                                    // 2353
                        try {                                                                                          // 2354
                            var value = __global[globalName];                                                          // 2355
                        }                                                                                              // 2356
                        catch (e) {                                                                                    // 2357
                            ignoredGlobalProps.push(globalName);                                                       // 2358
                        }                                                                                              // 2359
                        callback(globalName, value);                                                                   // 2360
                    });                                                                                                // 2361
                }                                                                                                      // 2362
                                                                                                                       // 2363
                loader.set('@@global-helpers', loader.newModule({                                                      // 2364
                    prepareGlobal: function(moduleName, exportName, globals) {                                         // 2365
                        // set globals                                                                                 // 2366
                        var oldGlobals;                                                                                // 2367
                        if (globals) {                                                                                 // 2368
                            oldGlobals = {};                                                                           // 2369
                            for (var g in globals) {                                                                   // 2370
                                oldGlobals[g] = globals[g];                                                            // 2371
                                __global[g] = globals[g];                                                              // 2372
                            }                                                                                          // 2373
                        }                                                                                              // 2374
                                                                                                                       // 2375
                        // store a complete copy of the global object in order to detect changes                       // 2376
                        if (!exportName) {                                                                             // 2377
                            globalSnapshot = {};                                                                       // 2378
                                                                                                                       // 2379
                            forEachGlobalValue(function(name, value) {                                                 // 2380
                                globalSnapshot[name] = value;                                                          // 2381
                            });                                                                                        // 2382
                        }                                                                                              // 2383
                                                                                                                       // 2384
                        // return function to retrieve global                                                          // 2385
                        return function() {                                                                            // 2386
                            var globalValue;                                                                           // 2387
                                                                                                                       // 2388
                            if (exportName) {                                                                          // 2389
                                globalValue = readMemberExpression(exportName, __global);                              // 2390
                            }                                                                                          // 2391
                            else {                                                                                     // 2392
                                var singleGlobal;                                                                      // 2393
                                var multipleExports;                                                                   // 2394
                                var exports = {};                                                                      // 2395
                                                                                                                       // 2396
                                forEachGlobalValue(function(name, value) {                                             // 2397
                                    if (globalSnapshot[name] === value)                                                // 2398
                                        return;                                                                        // 2399
                                    if (typeof value == 'undefined')                                                   // 2400
                                        return;                                                                        // 2401
                                    exports[name] = value;                                                             // 2402
                                                                                                                       // 2403
                                    if (typeof singleGlobal != 'undefined') {                                          // 2404
                                        if (!multipleExports && singleGlobal !== value)                                // 2405
                                            multipleExports = true;                                                    // 2406
                                    }                                                                                  // 2407
                                    else {                                                                             // 2408
                                        singleGlobal = value;                                                          // 2409
                                    }                                                                                  // 2410
                                });                                                                                    // 2411
                                globalValue = multipleExports ? exports : singleGlobal;                                // 2412
                            }                                                                                          // 2413
                                                                                                                       // 2414
                            // revert globals                                                                          // 2415
                            if (oldGlobals) {                                                                          // 2416
                                for (var g in oldGlobals)                                                              // 2417
                                    __global[g] = oldGlobals[g];                                                       // 2418
                            }                                                                                          // 2419
                                                                                                                       // 2420
                            return globalValue;                                                                        // 2421
                        };                                                                                             // 2422
                    }                                                                                                  // 2423
                }));                                                                                                   // 2424
            };                                                                                                         // 2425
        });/*                                                                                                          // 2426
         SystemJS CommonJS Format                                                                                      // 2427
         */                                                                                                            // 2428
        (function() {                                                                                                  // 2429
            // CJS Module Format                                                                                       // 2430
            // require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...                        // 2431
            var cjsExportsRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.]|module\.)exports\s*(\[['"]|\.)|(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])module\.exports\s*[=,]/;
            // RegEx adjusted from https://github.com/jbrantly/yabble/blob/master/lib/yabble.js#L339                   // 2433
            var cjsRequireRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;
            var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;                                             // 2435
                                                                                                                       // 2436
            function getCJSDeps(source) {                                                                              // 2437
                cjsRequireRegEx.lastIndex = 0;                                                                         // 2438
                                                                                                                       // 2439
                var deps = [];                                                                                         // 2440
                                                                                                                       // 2441
                // remove comments from the source first, if not minified                                              // 2442
                if (source.length / source.split('\n').length < 200)                                                   // 2443
                    source = source.replace(commentRegEx, '');                                                         // 2444
                                                                                                                       // 2445
                var match;                                                                                             // 2446
                                                                                                                       // 2447
                while (match = cjsRequireRegEx.exec(source))                                                           // 2448
                    deps.push(match[1].substr(1, match[1].length - 2));                                                // 2449
                                                                                                                       // 2450
                return deps;                                                                                           // 2451
            }                                                                                                          // 2452
                                                                                                                       // 2453
            if (typeof window != 'undefined' && typeof document != 'undefined' && window.location)                     // 2454
                var windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
                                                                                                                       // 2456
            hookConstructor(function(constructor) {                                                                    // 2457
                return function() {                                                                                    // 2458
                    constructor.call(this);                                                                            // 2459
                                                                                                                       // 2460
                    // include the node require since we're overriding it                                              // 2461
                    if (typeof require != 'undefined' && require.resolve && typeof process != 'undefined')             // 2462
                        this._nodeRequire = require;                                                                   // 2463
                };                                                                                                     // 2464
            });                                                                                                        // 2465
                                                                                                                       // 2466
            hook('instantiate', function(instantiate) {                                                                // 2467
                return function(load) {                                                                                // 2468
                    var loader = this;                                                                                 // 2469
                    if (!load.metadata.format) {                                                                       // 2470
                        cjsExportsRegEx.lastIndex = 0;                                                                 // 2471
                        cjsRequireRegEx.lastIndex = 0;                                                                 // 2472
                        if (cjsRequireRegEx.exec(load.source) || cjsExportsRegEx.exec(load.source))                    // 2473
                            load.metadata.format = 'cjs';                                                              // 2474
                    }                                                                                                  // 2475
                                                                                                                       // 2476
                    if (load.metadata.format == 'cjs') {                                                               // 2477
                        var metaDeps = load.metadata.deps || [];                                                       // 2478
                        load.metadata.deps = metaDeps.concat(getCJSDeps(load.source));                                 // 2479
                                                                                                                       // 2480
                        load.metadata.executingRequire = true;                                                         // 2481
                                                                                                                       // 2482
                        load.metadata.execute = function(require, exports, module) {                                   // 2483
                            // ensure meta deps execute first                                                          // 2484
                            for (var i = 0; i < metaDeps.length; i++)                                                  // 2485
                                require(metaDeps[i]);                                                                  // 2486
                            var address = load.address || '';                                                          // 2487
                                                                                                                       // 2488
                            var dirname = address.split('/');                                                          // 2489
                            dirname.pop();                                                                             // 2490
                            dirname = dirname.join('/');                                                               // 2491
                                                                                                                       // 2492
                            if (windowOrigin && address.substr(0, windowOrigin.length) === windowOrigin) {             // 2493
                                address = address.substr(windowOrigin.length);                                         // 2494
                                dirname = dirname.substr(windowOrigin.length);                                         // 2495
                            }                                                                                          // 2496
                            else if (address.substr(0, 8) == 'file:///') {                                             // 2497
                                address = address.substr(7);                                                           // 2498
                                dirname = dirname.substr(7);                                                           // 2499
                                                                                                                       // 2500
                                // on windows remove leading '/'                                                       // 2501
                                if (isWindows) {                                                                       // 2502
                                    address = address.substr(1);                                                       // 2503
                                    dirname = dirname.substr(1);                                                       // 2504
                                }                                                                                      // 2505
                            }                                                                                          // 2506
                                                                                                                       // 2507
                            // disable AMD detection                                                                   // 2508
                            var define = __global.define;                                                              // 2509
                            __global.define = undefined;                                                               // 2510
                                                                                                                       // 2511
                            __global.__cjsWrapper = {                                                                  // 2512
                                exports: exports,                                                                      // 2513
                                args: [require, exports, module, address, dirname, __global]                           // 2514
                            };                                                                                         // 2515
                                                                                                                       // 2516
                            load.source = "(function(require, exports, module, __filename, __dirname, global) {"       // 2517
                                + load.source + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";                // 2518
                                                                                                                       // 2519
                            __exec.call(loader, load);                                                                 // 2520
                                                                                                                       // 2521
                            __global.__cjsWrapper = undefined;                                                         // 2522
                            __global.define = define;                                                                  // 2523
                        };                                                                                             // 2524
                    }                                                                                                  // 2525
                                                                                                                       // 2526
                    return instantiate.call(loader, load);                                                             // 2527
                };                                                                                                     // 2528
            });                                                                                                        // 2529
        })();                                                                                                          // 2530
        /*                                                                                                             // 2531
         * AMD Helper function module                                                                                  // 2532
         * Separated into its own file as this is the part needed for full AMD support in SFX builds                   // 2533
         *                                                                                                             // 2534
         */                                                                                                            // 2535
        hookConstructor(function(constructor) {                                                                        // 2536
            return function() {                                                                                        // 2537
                var loader = this;                                                                                     // 2538
                constructor.call(this);                                                                                // 2539
                                                                                                                       // 2540
                var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;                                         // 2541
                var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";                                                 // 2542
                var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";                                     // 2543
                var fnBracketRegEx = /\(([^\)]*)\)/;                                                                   // 2544
                var wsRegEx = /^\s+|\s+$/g;                                                                            // 2545
                                                                                                                       // 2546
                var requireRegExs = {};                                                                                // 2547
                                                                                                                       // 2548
                function getCJSDeps(source, requireIndex) {                                                            // 2549
                                                                                                                       // 2550
                    // remove comments                                                                                 // 2551
                    source = source.replace(commentRegEx, '');                                                         // 2552
                                                                                                                       // 2553
                    // determine the require alias                                                                     // 2554
                    var params = source.match(fnBracketRegEx);                                                         // 2555
                    var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');         // 2556
                                                                                                                       // 2557
                    // find or generate the regex for this requireAlias                                                // 2558
                    var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));
                                                                                                                       // 2560
                    requireRegEx.lastIndex = 0;                                                                        // 2561
                                                                                                                       // 2562
                    var deps = [];                                                                                     // 2563
                                                                                                                       // 2564
                    var match;                                                                                         // 2565
                    while (match = requireRegEx.exec(source))                                                          // 2566
                        deps.push(match[2] || match[3]);                                                               // 2567
                                                                                                                       // 2568
                    return deps;                                                                                       // 2569
                }                                                                                                      // 2570
                                                                                                                       // 2571
                /*                                                                                                     // 2572
                 AMD-compatible require                                                                                // 2573
                 To copy RequireJS, set window.require = window.requirejs = loader.amdRequire                          // 2574
                 */                                                                                                    // 2575
                function require(names, callback, errback, referer) {                                                  // 2576
                    // in amd, first arg can be a config object... we just ignore                                      // 2577
                    if (typeof names == 'object' && !(names instanceof Array))                                         // 2578
                        return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));   // 2579
                                                                                                                       // 2580
                    // amd require                                                                                     // 2581
                    if (typeof names == 'string' && typeof callback == 'function')                                     // 2582
                        names = [names];                                                                               // 2583
                    if (names instanceof Array) {                                                                      // 2584
                        var dynamicRequires = [];                                                                      // 2585
                        for (var i = 0; i < names.length; i++)                                                         // 2586
                            dynamicRequires.push(loader['import'](names[i], referer));                                 // 2587
                        Promise.all(dynamicRequires).then(function(modules) {                                          // 2588
                            if (callback)                                                                              // 2589
                                callback.apply(null, modules);                                                         // 2590
                        }, errback);                                                                                   // 2591
                    }                                                                                                  // 2592
                                                                                                                       // 2593
                    // commonjs require                                                                                // 2594
                    else if (typeof names == 'string') {                                                               // 2595
                        var module = loader.get(names);                                                                // 2596
                        return module.__useDefault ? module['default'] : module;                                       // 2597
                    }                                                                                                  // 2598
                                                                                                                       // 2599
                    else                                                                                               // 2600
                        throw new TypeError('Invalid require');                                                        // 2601
                };                                                                                                     // 2602
                                                                                                                       // 2603
                function define(name, deps, factory) {                                                                 // 2604
                    if (typeof name != 'string') {                                                                     // 2605
                        factory = deps;                                                                                // 2606
                        deps = name;                                                                                   // 2607
                        name = null;                                                                                   // 2608
                    }                                                                                                  // 2609
                    if (!(deps instanceof Array)) {                                                                    // 2610
                        factory = deps;                                                                                // 2611
                        deps = ['require', 'exports', 'module'].splice(0, factory.length);                             // 2612
                    }                                                                                                  // 2613
                                                                                                                       // 2614
                    if (typeof factory != 'function')                                                                  // 2615
                        factory = (function(factory) {                                                                 // 2616
                            return function() { return factory; }                                                      // 2617
                        })(factory);                                                                                   // 2618
                                                                                                                       // 2619
                    // in IE8, a trailing comma becomes a trailing undefined entry                                     // 2620
                    if (deps[deps.length - 1] === undefined)                                                           // 2621
                        deps.pop();                                                                                    // 2622
                                                                                                                       // 2623
                    // remove system dependencies                                                                      // 2624
                    var requireIndex, exportsIndex, moduleIndex;                                                       // 2625
                                                                                                                       // 2626
                    if ((requireIndex = indexOf.call(deps, 'require')) != -1) {                                        // 2627
                                                                                                                       // 2628
                        deps.splice(requireIndex, 1);                                                                  // 2629
                                                                                                                       // 2630
                        // only trace cjs requires for non-named                                                       // 2631
                        // named defines assume the trace has already been done                                        // 2632
                        if (!name)                                                                                     // 2633
                            deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));                          // 2634
                    }                                                                                                  // 2635
                                                                                                                       // 2636
                    if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)                                          // 2637
                        deps.splice(exportsIndex, 1);                                                                  // 2638
                                                                                                                       // 2639
                    if ((moduleIndex = indexOf.call(deps, 'module')) != -1)                                            // 2640
                        deps.splice(moduleIndex, 1);                                                                   // 2641
                                                                                                                       // 2642
                    var define = {                                                                                     // 2643
                        name: name,                                                                                    // 2644
                        deps: deps,                                                                                    // 2645
                        execute: function(req, exports, module) {                                                      // 2646
                                                                                                                       // 2647
                            var depValues = [];                                                                        // 2648
                            for (var i = 0; i < deps.length; i++)                                                      // 2649
                                depValues.push(req(deps[i]));                                                          // 2650
                                                                                                                       // 2651
                            module.uri = module.id;                                                                    // 2652
                                                                                                                       // 2653
                            module.config = function() {};                                                             // 2654
                                                                                                                       // 2655
                            // add back in system dependencies                                                         // 2656
                            if (moduleIndex != -1)                                                                     // 2657
                                depValues.splice(moduleIndex, 0, module);                                              // 2658
                                                                                                                       // 2659
                            if (exportsIndex != -1)                                                                    // 2660
                                depValues.splice(exportsIndex, 0, exports);                                            // 2661
                                                                                                                       // 2662
                            if (requireIndex != -1) {                                                                  // 2663
                                function contextualRequire(names, callback, errback) {                                 // 2664
                                    if (typeof names == 'string' && typeof callback != 'function')                     // 2665
                                        return req(names);                                                             // 2666
                                    return require.call(loader, names, callback, errback, module.id);                  // 2667
                                }                                                                                      // 2668
                                contextualRequire.toUrl = function(name) {                                             // 2669
                                    // normalize without defaultJSExtensions                                           // 2670
                                    var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
                                    var url = loader.normalizeSync(name, module.id);                                   // 2672
                                    if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')                  // 2673
                                        url = url.substr(0, url.length - 3);                                           // 2674
                                    return url;                                                                        // 2675
                                };                                                                                     // 2676
                                depValues.splice(requireIndex, 0, contextualRequire);                                  // 2677
                            }                                                                                          // 2678
                                                                                                                       // 2679
                            // set global require to AMD require                                                       // 2680
                            var curRequire = __global.require;                                                         // 2681
                            __global.require = require;                                                                // 2682
                                                                                                                       // 2683
                            var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);            // 2684
                                                                                                                       // 2685
                            __global.require = curRequire;                                                             // 2686
                                                                                                                       // 2687
                            if (typeof output == 'undefined' && module)                                                // 2688
                                output = module.exports;                                                               // 2689
                                                                                                                       // 2690
                            if (typeof output != 'undefined')                                                          // 2691
                                return output;                                                                         // 2692
                        }                                                                                              // 2693
                    };                                                                                                 // 2694
                                                                                                                       // 2695
                    // anonymous define                                                                                // 2696
                    if (!name) {                                                                                       // 2697
                        // already defined anonymously -> throw                                                        // 2698
                        if (lastModule.anonDefine)                                                                     // 2699
                            throw new TypeError('Multiple defines for anonymous module');                              // 2700
                        lastModule.anonDefine = define;                                                                // 2701
                    }                                                                                                  // 2702
                    // named define                                                                                    // 2703
                    else {                                                                                             // 2704
                        // if it has no dependencies and we don't have any other                                       // 2705
                        // defines, then let this be an anonymous define                                               // 2706
                        // this is just to support single modules of the form:                                         // 2707
                        // define('jquery')                                                                            // 2708
                        // still loading anonymously                                                                   // 2709
                        // because it is done widely enough to be useful                                               // 2710
                        if (deps.length == 0 && !lastModule.anonDefine && !lastModule.isBundle) {                      // 2711
                            lastModule.anonDefine = define;                                                            // 2712
                        }                                                                                              // 2713
                        // otherwise its a bundle only                                                                 // 2714
                        else {                                                                                         // 2715
                            // if there is an anonDefine already (we thought it could have had a single named define)  // 2716
                            // then we define it now                                                                   // 2717
                            // this is to avoid defining named defines when they are actually anonymous                // 2718
                            if (lastModule.anonDefine && lastModule.anonDefine.name)                                   // 2719
                                loader.registerDynamic(lastModule.anonDefine.name, lastModule.anonDefine.deps, false, lastModule.anonDefine.execute);
                                                                                                                       // 2721
                            lastModule.anonDefine = null;                                                              // 2722
                        }                                                                                              // 2723
                                                                                                                       // 2724
                        // note this is now a bundle                                                                   // 2725
                        lastModule.isBundle = true;                                                                    // 2726
                                                                                                                       // 2727
                        // define the module through the register registry                                             // 2728
                        loader.registerDynamic(name, define.deps, false, define.execute);                              // 2729
                    }                                                                                                  // 2730
                }                                                                                                      // 2731
                define.amd = {};                                                                                       // 2732
                                                                                                                       // 2733
                // adds define as a global (potentially just temporarily)                                              // 2734
                function createDefine(loader) {                                                                        // 2735
                    lastModule.anonDefine = null;                                                                      // 2736
                    lastModule.isBundle = false;                                                                       // 2737
                                                                                                                       // 2738
                    // ensure no NodeJS environment detection                                                          // 2739
                    var oldModule = __global.module;                                                                   // 2740
                    var oldExports = __global.exports;                                                                 // 2741
                    var oldDefine = __global.define;                                                                   // 2742
                                                                                                                       // 2743
                    __global.module = undefined;                                                                       // 2744
                    __global.exports = undefined;                                                                      // 2745
                    __global.define = define;                                                                          // 2746
                                                                                                                       // 2747
                    return function() {                                                                                // 2748
                        __global.define = oldDefine;                                                                   // 2749
                        __global.module = oldModule;                                                                   // 2750
                        __global.exports = oldExports;                                                                 // 2751
                    };                                                                                                 // 2752
                }                                                                                                      // 2753
                                                                                                                       // 2754
                var lastModule = {                                                                                     // 2755
                    isBundle: false,                                                                                   // 2756
                    anonDefine: null                                                                                   // 2757
                };                                                                                                     // 2758
                                                                                                                       // 2759
                loader.set('@@amd-helpers', loader.newModule({                                                         // 2760
                    createDefine: createDefine,                                                                        // 2761
                    require: require,                                                                                  // 2762
                    define: define,                                                                                    // 2763
                    lastModule: lastModule                                                                             // 2764
                }));                                                                                                   // 2765
                loader.amdDefine = define;                                                                             // 2766
                loader.amdRequire = require;                                                                           // 2767
            };                                                                                                         // 2768
        });/*                                                                                                          // 2769
         SystemJS AMD Format                                                                                           // 2770
         Provides the AMD module format definition at System.format.amd                                                // 2771
         as well as a RequireJS-style require on System.require                                                        // 2772
         */                                                                                                            // 2773
        (function() {                                                                                                  // 2774
            // AMD Module Format Detection RegEx                                                                       // 2775
            // define([.., .., ..], ...)                                                                               // 2776
            // define(varName); || define(function(require, exports) {}); || define({})                                // 2777
            var amdRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;
                                                                                                                       // 2779
            // script injection mode calls this function synchronously on load                                         // 2780
            hook('onScriptLoad', function(onScriptLoad) {                                                              // 2781
                return function(load) {                                                                                // 2782
                    onScriptLoad.call(this, load);                                                                     // 2783
                                                                                                                       // 2784
                    var lastModule = this.get('@@amd-helpers').lastModule;                                             // 2785
                    if (lastModule.anonDefine || lastModule.isBundle) {                                                // 2786
                        load.metadata.format = 'defined';                                                              // 2787
                        load.metadata.registered = true;                                                               // 2788
                        lastModule.isBundle = false;                                                                   // 2789
                    }                                                                                                  // 2790
                                                                                                                       // 2791
                    if (lastModule.anonDefine) {                                                                       // 2792
                        load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(lastModule.anonDefine.deps) : lastModule.anonDefine.deps;
                        load.metadata.execute = lastModule.anonDefine.execute;                                         // 2794
                        lastModule.anonDefine = null;                                                                  // 2795
                    }                                                                                                  // 2796
                };                                                                                                     // 2797
            });                                                                                                        // 2798
                                                                                                                       // 2799
            hook('fetch', function(fetch) {                                                                            // 2800
                return function(load) {                                                                                // 2801
                    if (load.metadata.format === 'amd')                                                                // 2802
                        load.metadata.scriptLoad = true;                                                               // 2803
                    if (load.metadata.scriptLoad)                                                                      // 2804
                        this.get('@@amd-helpers').createDefine(this);                                                  // 2805
                    return fetch.call(this, load);                                                                     // 2806
                };                                                                                                     // 2807
            });                                                                                                        // 2808
                                                                                                                       // 2809
            hook('instantiate', function(instantiate) {                                                                // 2810
                return function(load) {                                                                                // 2811
                    var loader = this;                                                                                 // 2812
                                                                                                                       // 2813
                    if (load.metadata.format == 'amd' || !load.metadata.format && load.source.match(amdRegEx)) {       // 2814
                        load.metadata.format = 'amd';                                                                  // 2815
                                                                                                                       // 2816
                        if (loader.execute !== false) {                                                                // 2817
                            var removeDefine = this.get('@@amd-helpers').createDefine(loader);                         // 2818
                                                                                                                       // 2819
                            __exec.call(loader, load);                                                                 // 2820
                                                                                                                       // 2821
                            removeDefine(loader);                                                                      // 2822
                                                                                                                       // 2823
                            var lastModule = this.get('@@amd-helpers').lastModule;                                     // 2824
                                                                                                                       // 2825
                            if (!lastModule.anonDefine && !lastModule.isBundle)                                        // 2826
                                throw new TypeError('AMD module ' + load.name + ' did not define');                    // 2827
                                                                                                                       // 2828
                            if (lastModule.anonDefine) {                                                               // 2829
                                load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(lastModule.anonDefine.deps) : lastModule.anonDefine.deps;
                                load.metadata.execute = lastModule.anonDefine.execute;                                 // 2831
                            }                                                                                          // 2832
                                                                                                                       // 2833
                            lastModule.isBundle = false;                                                               // 2834
                            lastModule.anonDefine = null;                                                              // 2835
                        }                                                                                              // 2836
                                                                                                                       // 2837
                        return instantiate.call(loader, load);                                                         // 2838
                    }                                                                                                  // 2839
                                                                                                                       // 2840
                    return instantiate.call(loader, load);                                                             // 2841
                };                                                                                                     // 2842
            });                                                                                                        // 2843
                                                                                                                       // 2844
        })();                                                                                                          // 2845
        /*                                                                                                             // 2846
         SystemJS map support                                                                                          // 2847
                                                                                                                       // 2848
         Provides map configuration through                                                                            // 2849
         System.map['jquery'] = 'some/module/map'                                                                      // 2850
                                                                                                                       // 2851
         Note that this applies for subpaths, just like RequireJS:                                                     // 2852
                                                                                                                       // 2853
         jquery      -> 'some/module/map'                                                                              // 2854
         jquery/path -> 'some/module/map/path'                                                                         // 2855
         bootstrap   -> 'bootstrap'                                                                                    // 2856
                                                                                                                       // 2857
         The most specific map is always taken, as longest path length                                                 // 2858
         */                                                                                                            // 2859
        hookConstructor(function(constructor) {                                                                        // 2860
            return function() {                                                                                        // 2861
                constructor.call(this);                                                                                // 2862
                this.map = {};                                                                                         // 2863
            };                                                                                                         // 2864
        });                                                                                                            // 2865
                                                                                                                       // 2866
        hook('normalize', function(normalize) {                                                                        // 2867
            return function(name, parentName, parentAddress) {                                                         // 2868
                if (name.substr(0, 1) != '.' && name.substr(0, 1) != '/' && !name.match(absURLRegEx)) {                // 2869
                    var bestMatch, bestMatchLength = 0;                                                                // 2870
                                                                                                                       // 2871
                    // now do the global map                                                                           // 2872
                    for (var p in this.map) {                                                                          // 2873
                        if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {     // 2874
                            var curMatchLength = p.split('/').length;                                                  // 2875
                            if (curMatchLength <= bestMatchLength)                                                     // 2876
                                continue;                                                                              // 2877
                            bestMatch = p;                                                                             // 2878
                            bestMatchLength = curMatchLength;                                                          // 2879
                        }                                                                                              // 2880
                    }                                                                                                  // 2881
                                                                                                                       // 2882
                    if (bestMatch)                                                                                     // 2883
                        name = this.map[bestMatch] + name.substr(bestMatch.length);                                    // 2884
                }                                                                                                      // 2885
                                                                                                                       // 2886
                return normalize.call(this, name, parentName, parentAddress);                                          // 2887
            };                                                                                                         // 2888
        });                                                                                                            // 2889
        /*                                                                                                             // 2890
         * Paths extension                                                                                             // 2891
         *                                                                                                             // 2892
         * Applies paths and normalizes to a full URL                                                                  // 2893
         */                                                                                                            // 2894
        hook('normalize', function(normalize) {                                                                        // 2895
                                                                                                                       // 2896
            return function(name, parentName) {                                                                        // 2897
                var normalized = normalize.call(this, name, parentName);                                               // 2898
                                                                                                                       // 2899
                // if the module is in the registry already, use that                                                  // 2900
                if (this.has(normalized))                                                                              // 2901
                    return normalized;                                                                                 // 2902
                                                                                                                       // 2903
                if (normalized.match(absURLRegEx)) {                                                                   // 2904
                    // defaultJSExtensions backwards compatibility                                                     // 2905
                    if (this.defaultJSExtensions && normalized.substr(normalized.length - 3, 3) != '.js')              // 2906
                        normalized += '.js';                                                                           // 2907
                    return normalized;                                                                                 // 2908
                }                                                                                                      // 2909
                                                                                                                       // 2910
                // applyPaths implementation provided from ModuleLoader system.js source                               // 2911
                normalized = applyPaths(this.paths, normalized) || normalized;                                         // 2912
                                                                                                                       // 2913
                // defaultJSExtensions backwards compatibility                                                         // 2914
                if (this.defaultJSExtensions && normalized.substr(normalized.length - 3, 3) != '.js')                  // 2915
                    normalized += '.js';                                                                               // 2916
                                                                                                                       // 2917
                // ./x, /x -> page-relative                                                                            // 2918
                if (normalized[0] == '.' || normalized[0] == '/')                                                      // 2919
                    return new URL(normalized, baseURIObj).href;                                                       // 2920
                // x -> baseURL-relative                                                                               // 2921
                else                                                                                                   // 2922
                    return new URL(normalized, getBaseURLObj.call(this)).href;                                         // 2923
            };                                                                                                         // 2924
        });/*                                                                                                          // 2925
         * Package Configuration Extension                                                                             // 2926
         *                                                                                                             // 2927
         * Example:                                                                                                    // 2928
         *                                                                                                             // 2929
         * System.packages = {                                                                                         // 2930
         *   jquery: {                                                                                                 // 2931
         *     main: 'index.js', // when not set, package name is requested directly                                   // 2932
         *     format: 'amd',                                                                                          // 2933
         *     defaultExtension: 'js',                                                                                 // 2934
         *     meta: {                                                                                                 // 2935
         *       '*.ts': {                                                                                             // 2936
         *         loader: 'typescript'                                                                                // 2937
         *       },                                                                                                    // 2938
         *       'vendor/sizzle.js': {                                                                                 // 2939
         *         format: 'global'                                                                                    // 2940
         *       }                                                                                                     // 2941
         *     },                                                                                                      // 2942
         *     map: {                                                                                                  // 2943
         *        // map internal require('sizzle') to local require('./vendor/sizzle')                                // 2944
         *        sizzle: './vendor/sizzle.js',                                                                        // 2945
         *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'             // 2946
         *        './vendor/another.js': './another/index.js',                                                         // 2947
         *        // test.js / test -> lib/test.js                                                                     // 2948
         *        './test.js': './lib/test.js',                                                                        // 2949
         *     },                                                                                                      // 2950
         *     env: {                                                                                                  // 2951
         *       'browser': {                                                                                          // 2952
         *         main: 'browser.js'                                                                                  // 2953
         *       }                                                                                                     // 2954
         *     }                                                                                                       // 2955
         *   }                                                                                                         // 2956
         * };                                                                                                          // 2957
         *                                                                                                             // 2958
         * Then:                                                                                                       // 2959
         *   import 'jquery'                       -> jquery/index.js                                                  // 2960
         *   import 'jquery/submodule'             -> jquery/submodule.js                                              // 2961
         *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript                         // 2962
         *   import 'jquery/vendor/another'        -> another/index.js                                                 // 2963
         *                                                                                                             // 2964
         * Detailed Behaviours                                                                                         // 2965
         * - main is the only property where a leading "./" can be added optionally                                    // 2966
         * - map and defaultExtension are applied to the main                                                          // 2967
         * - defaultExtension adds the extension only if no other extension is present                                 // 2968
         * - defaultJSExtensions applies after map when defaultExtension is not set                                    // 2969
         * - if a meta value is available for a module, map and defaultExtension are skipped                           // 2970
         * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)                    // 2971
         *                                                                                                             // 2972
         * In addition, the following meta properties will be allowed to be package                                    // 2973
         * -relative as well in the package meta config:                                                               // 2974
         *                                                                                                             // 2975
         *   - loader                                                                                                  // 2976
         *   - alias                                                                                                   // 2977
         *                                                                                                             // 2978
         */                                                                                                            // 2979
        (function() {                                                                                                  // 2980
                                                                                                                       // 2981
            hookConstructor(function(constructor) {                                                                    // 2982
                return function() {                                                                                    // 2983
                    constructor.call(this);                                                                            // 2984
                    this.packages = {};                                                                                // 2985
                };                                                                                                     // 2986
            });                                                                                                        // 2987
                                                                                                                       // 2988
            function getPackage(name) {                                                                                // 2989
                for (var p in this.packages) {                                                                         // 2990
                    if (name.substr(0, p.length) === p && (name.length === p.length || name[p.length] === '/'))        // 2991
                        return p;                                                                                      // 2992
                }                                                                                                      // 2993
            }                                                                                                          // 2994
                                                                                                                       // 2995
            function getPackageConfig(loader, pkgName) {                                                               // 2996
                var pkgConfig = loader.packages[pkgName];                                                              // 2997
                                                                                                                       // 2998
                if (!pkgConfig.env)                                                                                    // 2999
                    return Promise.resolve(pkgConfig);                                                                 // 3000
                                                                                                                       // 3001
                // check environment conditions                                                                        // 3002
                // default environment condition is '@env' in package or '@system-env' globally                        // 3003
                return loader['import'](pkgConfig.map['@env'] || '@system-env', pkgName)                               // 3004
                    .then(function(env) {                                                                              // 3005
                        // derived config object                                                                       // 3006
                        var pkg = {};                                                                                  // 3007
                        for (var p in pkgConfig)                                                                       // 3008
                            if (p !== 'map' & p !== 'env')                                                             // 3009
                                pkg[p] = pkgConfig[p];                                                                 // 3010
                                                                                                                       // 3011
                        pkg.map = {};                                                                                  // 3012
                        for (var p in pkgConfig.map)                                                                   // 3013
                            pkg.map[p] = pkgConfig.map[p];                                                             // 3014
                                                                                                                       // 3015
                        for (var e in pkgConfig.env) {                                                                 // 3016
                            if (env[e]) {                                                                              // 3017
                                var envConfig = pkgConfig.env[e];                                                      // 3018
                                if (envConfig.main)                                                                    // 3019
                                    pkg.main = envConfig.main;                                                         // 3020
                                for (var m in envConfig.map)                                                           // 3021
                                    pkg.map[m] = envConfig.map[m];                                                     // 3022
                            }                                                                                          // 3023
                        }                                                                                              // 3024
                                                                                                                       // 3025
                        // store the derived environment config so we have this cached for next time                   // 3026
                        loader.packages[pkgName] = pkg;                                                                // 3027
                                                                                                                       // 3028
                        return pkg;                                                                                    // 3029
                    });                                                                                                // 3030
            }                                                                                                          // 3031
                                                                                                                       // 3032
            function applyMap(map, name) {                                                                             // 3033
                var bestMatch, bestMatchLength = 0;                                                                    // 3034
                                                                                                                       // 3035
                for (var p in map) {                                                                                   // 3036
                    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {         // 3037
                        var curMatchLength = p.split('/').length;                                                      // 3038
                        if (curMatchLength <= bestMatchLength)                                                         // 3039
                            continue;                                                                                  // 3040
                        bestMatch = p;                                                                                 // 3041
                        bestMatchLength = curMatchLength;                                                              // 3042
                    }                                                                                                  // 3043
                }                                                                                                      // 3044
                if (bestMatch)                                                                                         // 3045
                    return map[bestMatch] + name.substr(bestMatch.length);                                             // 3046
            }                                                                                                          // 3047
                                                                                                                       // 3048
            SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.normalize;                               // 3049
                                                                                                                       // 3050
            hook('normalize', function(normalize) {                                                                    // 3051
                return function(name, parentName) {                                                                    // 3052
                    // apply contextual package map first                                                              // 3053
                    if (parentName) {                                                                                  // 3054
                        var parentPackage = getPackage.call(this, parentName) ||                                       // 3055
                            this.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&        // 3056
                            getPackage.call(this, parentName.substr(0, parentName.length - 3));                        // 3057
                    }                                                                                                  // 3058
                                                                                                                       // 3059
                    if (parentPackage && name[0] !== '.') {                                                            // 3060
                        var parentMap = this.packages[parentPackage].map;                                              // 3061
                        if (parentMap) {                                                                               // 3062
                            name = applyMap(parentMap, name) || name;                                                  // 3063
                                                                                                                       // 3064
                            // relative maps are package-relative                                                      // 3065
                            if (name[0] === '.')                                                                       // 3066
                                parentName = parentPackage + '/';                                                      // 3067
                        }                                                                                              // 3068
                    }                                                                                                  // 3069
                                                                                                                       // 3070
                    var defaultJSExtension = this.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';     // 3071
                                                                                                                       // 3072
                    // apply global map, relative normalization                                                        // 3073
                    var normalized = normalize.call(this, name, parentName);                                           // 3074
                                                                                                                       // 3075
                    // undo defaultJSExtension                                                                         // 3076
                    if (normalized.substr(normalized.length - 3, 3) != '.js')                                          // 3077
                        defaultJSExtension = false;                                                                    // 3078
                    if (defaultJSExtension)                                                                            // 3079
                        normalized = normalized.substr(0, normalized.length - 3);                                      // 3080
                                                                                                                       // 3081
                    // check if we are inside a package                                                                // 3082
                    var pkgName = getPackage.call(this, normalized);                                                   // 3083
                                                                                                                       // 3084
                    if (pkgName) {                                                                                     // 3085
                        return getPackageConfig(this, pkgName)                                                         // 3086
                            .then(function(pkg) {                                                                      // 3087
                                // main                                                                                // 3088
                                if (pkgName === normalized && pkg.main)                                                // 3089
                                    normalized += '/' + (pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main);
                                                                                                                       // 3091
                                if (normalized.substr(pkgName.length) == '/')                                          // 3092
                                    return normalized;                                                                 // 3093
                                                                                                                       // 3094
                                // defaultExtension & defaultJSExtension                                               // 3095
                                // if we have meta for this package, don't do defaultExtensions                        // 3096
                                var defaultExtension = '';                                                             // 3097
                                if (!pkg.meta || !pkg.meta[normalized.substr(pkgName.length + 1)]) {                   // 3098
                                    // apply defaultExtension                                                          // 3099
                                                                                                                       // 3100
                                    if ('defaultExtension' in pkg) {                                                   // 3101
                                        if (pkg.defaultExtension !== false && normalized.split('/').pop().indexOf('.') == -1)
                                            defaultExtension = '.' + pkg.defaultExtension;                             // 3103
                                    }                                                                                  // 3104
                                    // apply defaultJSExtensions if defaultExtension not set                           // 3105
                                    else if (defaultJSExtension) {                                                     // 3106
                                        defaultExtension = '.js';                                                      // 3107
                                    }                                                                                  // 3108
                                }                                                                                      // 3109
                                                                                                                       // 3110
                                // apply submap checking without then with defaultExtension                            // 3111
                                var subPath = '.' + normalized.substr(pkgName.length);                                 // 3112
                                var mapped = applyMap(pkg.map, subPath) || defaultExtension && applyMap(pkg.map, subPath + defaultExtension);
                                if (mapped)                                                                            // 3114
                                    normalized = mapped.substr(0, 2) == './' ? pkgName + mapped.substr(1) : mapped;    // 3115
                                else                                                                                   // 3116
                                    normalized += defaultExtension;                                                    // 3117
                                                                                                                       // 3118
                                                                                                                       // 3119
                                return normalized;                                                                     // 3120
                            });                                                                                        // 3121
                    }                                                                                                  // 3122
                                                                                                                       // 3123
                    // add back defaultJSExtension if not a package                                                    // 3124
                    if (defaultJSExtension)                                                                            // 3125
                        normalized += '.js';                                                                           // 3126
                                                                                                                       // 3127
                    return normalized;                                                                                 // 3128
                };                                                                                                     // 3129
            });                                                                                                        // 3130
                                                                                                                       // 3131
            hook('locate', function(locate) {                                                                          // 3132
                return function(load) {                                                                                // 3133
                    var loader = this;                                                                                 // 3134
                    return Promise.resolve(locate.call(this, load))                                                    // 3135
                        .then(function(address) {                                                                      // 3136
                            var pkgName = getPackage.call(loader, load.name);                                          // 3137
                            if (pkgName) {                                                                             // 3138
                                var pkg = loader.packages[pkgName];                                                    // 3139
                                                                                                                       // 3140
                                // format                                                                              // 3141
                                if (pkg.format)                                                                        // 3142
                                    load.metadata.format = load.metadata.format || pkg.format;                         // 3143
                                                                                                                       // 3144
                                // loader                                                                              // 3145
                                if (pkg.loader)                                                                        // 3146
                                    load.metadata.loader = load.metadata.loader || pkg.loader;                         // 3147
                                                                                                                       // 3148
                                if (pkg.meta) {                                                                        // 3149
                                    // wildcard meta                                                                   // 3150
                                    var meta = {};                                                                     // 3151
                                    var bestDepth = 0;                                                                 // 3152
                                    var wildcardIndex;                                                                 // 3153
                                    for (var module in pkg.meta) {                                                     // 3154
                                        wildcardIndex = module.indexOf('*');                                           // 3155
                                        if (wildcardIndex === -1)                                                      // 3156
                                            continue;                                                                  // 3157
                                        if (module.substr(0, wildcardIndex) === load.name.substr(0, wildcardIndex)     // 3158
                                            && module.substr(wildcardIndex + 1) === load.name.substr(load.name.length - module.length + wildcardIndex + 1)) {
                                            var depth = module.split('/').length;                                      // 3160
                                            if (depth > bestDepth)                                                     // 3161
                                                bestDetph = depth;                                                     // 3162
                                            extend(meta, pkg.meta[module], bestDepth != depth);                        // 3163
                                        }                                                                              // 3164
                                    }                                                                                  // 3165
                                    // exact meta                                                                      // 3166
                                    var exactMeta = pkg.meta[load.name.substr(pkgName.length + 1)];                    // 3167
                                    if (exactMeta)                                                                     // 3168
                                        extend(meta, exactMeta);                                                       // 3169
                                                                                                                       // 3170
                                    // allow alias and loader to be package-relative                                   // 3171
                                    if (meta.alias && meta.alias.substr(0, 2) == './')                                 // 3172
                                        meta.alias = pkgName + meta.alias.substr(1);                                   // 3173
                                    if (meta.loader && meta.loader.substr(0, 2) == './')                               // 3174
                                        meta.loader = pkgName + meta.loader.substr(1);                                 // 3175
                                                                                                                       // 3176
                                    extend(load.metadata, meta);                                                       // 3177
                                }                                                                                      // 3178
                            }                                                                                          // 3179
                                                                                                                       // 3180
                            return address;                                                                            // 3181
                        });                                                                                            // 3182
                };                                                                                                     // 3183
            });                                                                                                        // 3184
                                                                                                                       // 3185
        })();/*                                                                                                        // 3186
         SystemJS Loader Plugin Support                                                                                // 3187
                                                                                                                       // 3188
         Supports plugin loader syntax with "!", or via metadata.loader                                                // 3189
                                                                                                                       // 3190
         The plugin name is loaded as a module itself, and can override standard loader hooks                          // 3191
         for the plugin resource. See the plugin section of the systemjs readme.                                       // 3192
         */                                                                                                            // 3193
        (function() {                                                                                                  // 3194
                                                                                                                       // 3195
            // sync or async plugin normalize function                                                                 // 3196
            function normalizePlugin(normalize, name, parentName, sync) {                                              // 3197
                var loader = this;                                                                                     // 3198
                // if parent is a plugin, normalize against the parent plugin argument only                            // 3199
                var parentPluginIndex;                                                                                 // 3200
                if (parentName && (parentPluginIndex = parentName.indexOf('!')) != -1)                                 // 3201
                    parentName = parentName.substr(0, parentPluginIndex);                                              // 3202
                                                                                                                       // 3203
                // if this is a plugin, normalize the plugin name and the argument                                     // 3204
                var pluginIndex = name.lastIndexOf('!');                                                               // 3205
                if (pluginIndex != -1) {                                                                               // 3206
                    var argumentName = name.substr(0, pluginIndex);                                                    // 3207
                    var pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
                                                                                                                       // 3209
                    // note if normalize will add a default js extension                                               // 3210
                    // if so, remove for backwards compat                                                              // 3211
                    // this is strange and sucks, but will be deprecated                                               // 3212
                    var defaultExtension = loader.defaultJSExtensions && argumentName.substr(argumentName.length - 3, 3) != '.js';
                                                                                                                       // 3214
                    if (sync) {                                                                                        // 3215
                        argumentName = loader.normalizeSync(argumentName, parentName);                                 // 3216
                        pluginName = loader.normalizeSync(pluginName, parentName);                                     // 3217
                                                                                                                       // 3218
                        if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')              // 3219
                            argumentName = argumentName.substr(0, argumentName.length - 3);                            // 3220
                                                                                                                       // 3221
                        return argumentName + '!' + pluginName;                                                        // 3222
                    }                                                                                                  // 3223
                    else {                                                                                             // 3224
                        return Promise.all([                                                                           // 3225
                            loader.normalize(argumentName, parentName),                                                // 3226
                            loader.normalize(pluginName, parentName)                                                   // 3227
                        ])                                                                                             // 3228
                            .then(function(normalized) {                                                               // 3229
                                argumentName = normalized[0];                                                          // 3230
                                if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')      // 3231
                                    argumentName = argumentName.substr(0, argumentName.length - 3);                    // 3232
                                return argumentName + '!' + normalized[1];                                             // 3233
                            });                                                                                        // 3234
                    }                                                                                                  // 3235
                }                                                                                                      // 3236
                else {                                                                                                 // 3237
                    return normalize.call(loader, name, parentName);                                                   // 3238
                }                                                                                                      // 3239
            }                                                                                                          // 3240
                                                                                                                       // 3241
            // async plugin normalize                                                                                  // 3242
            hook('normalize', function(normalize) {                                                                    // 3243
                return function(name, parentName) {                                                                    // 3244
                    return normalizePlugin.call(this, normalize, name, parentName, false);                             // 3245
                };                                                                                                     // 3246
            });                                                                                                        // 3247
                                                                                                                       // 3248
            hook('normalizeSync', function(normalizeSync) {                                                            // 3249
                return function(name, parentName) {                                                                    // 3250
                    return normalizePlugin.call(this, normalizeSync, name, parentName, true);                          // 3251
                };                                                                                                     // 3252
            });                                                                                                        // 3253
                                                                                                                       // 3254
            hook('locate', function(locate) {                                                                          // 3255
                return function(load) {                                                                                // 3256
                    var loader = this;                                                                                 // 3257
                                                                                                                       // 3258
                    var name = load.name;                                                                              // 3259
                                                                                                                       // 3260
                    // plugin syntax                                                                                   // 3261
                    var pluginSyntaxIndex = name.lastIndexOf('!');                                                     // 3262
                    if (pluginSyntaxIndex != -1) {                                                                     // 3263
                        load.metadata.loader = name.substr(pluginSyntaxIndex + 1);                                     // 3264
                        load.name = name.substr(0, pluginSyntaxIndex);                                                 // 3265
                    }                                                                                                  // 3266
                                                                                                                       // 3267
                    return locate.call(loader, load)                                                                   // 3268
                        .then(function(address) {                                                                      // 3269
                            var plugin = load.metadata.loader;                                                         // 3270
                                                                                                                       // 3271
                            if (!plugin)                                                                               // 3272
                                return address;                                                                        // 3273
                                                                                                                       // 3274
                            // only fetch the plugin itself if this name isn't defined                                 // 3275
                            if (loader.defined && loader.defined[name])                                                // 3276
                                return address;                                                                        // 3277
                                                                                                                       // 3278
                            var pluginLoader = loader.pluginLoader || loader;                                          // 3279
                                                                                                                       // 3280
                            // load the plugin module and run standard locate                                          // 3281
                            return pluginLoader['import'](plugin)                                                      // 3282
                                .then(function(loaderModule) {                                                         // 3283
                                    // store the plugin module itself on the metadata                                  // 3284
                                    load.metadata.loaderModule = loaderModule;                                         // 3285
                                    load.metadata.loaderArgument = name;                                               // 3286
                                                                                                                       // 3287
                                    load.address = address;                                                            // 3288
                                    if (loaderModule.locate)                                                           // 3289
                                        return loaderModule.locate.call(loader, load);                                 // 3290
                                                                                                                       // 3291
                                    return address;                                                                    // 3292
                                });                                                                                    // 3293
                        });                                                                                            // 3294
                };                                                                                                     // 3295
            });                                                                                                        // 3296
                                                                                                                       // 3297
            hook('fetch', function(fetch) {                                                                            // 3298
                return function(load) {                                                                                // 3299
                    var loader = this;                                                                                 // 3300
                    if (load.metadata.loaderModule && load.metadata.loaderModule.fetch) {                              // 3301
                        load.metadata.scriptLoad = false;                                                              // 3302
                        return load.metadata.loaderModule.fetch.call(loader, load, function(load) {                    // 3303
                            return fetch.call(loader, load);                                                           // 3304
                        });                                                                                            // 3305
                    }                                                                                                  // 3306
                    else {                                                                                             // 3307
                        return fetch.call(loader, load);                                                               // 3308
                    }                                                                                                  // 3309
                };                                                                                                     // 3310
            });                                                                                                        // 3311
                                                                                                                       // 3312
            hook('translate', function(translate) {                                                                    // 3313
                return function(load) {                                                                                // 3314
                    var loader = this;                                                                                 // 3315
                    if (load.metadata.loaderModule && load.metadata.loaderModule.translate)                            // 3316
                        return Promise.resolve(load.metadata.loaderModule.translate.call(loader, load)).then(function(result) {
                            if (typeof result == 'string')                                                             // 3318
                                load.source = result;                                                                  // 3319
                            return translate.call(loader, load);                                                       // 3320
                        });                                                                                            // 3321
                    else                                                                                               // 3322
                        return translate.call(loader, load);                                                           // 3323
                };                                                                                                     // 3324
            });                                                                                                        // 3325
                                                                                                                       // 3326
            hook('instantiate', function(instantiate) {                                                                // 3327
                return function(load) {                                                                                // 3328
                    var loader = this;                                                                                 // 3329
                    if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate)                          // 3330
                        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load)).then(function(result) {
                            load.metadata.format = 'defined';                                                          // 3332
                            load.metadata.execute = function() {                                                       // 3333
                                return result;                                                                         // 3334
                            };                                                                                         // 3335
                            return instantiate.call(loader, load);                                                     // 3336
                        });                                                                                            // 3337
                    else                                                                                               // 3338
                        return instantiate.call(loader, load);                                                         // 3339
                };                                                                                                     // 3340
            });                                                                                                        // 3341
                                                                                                                       // 3342
        })();                                                                                                          // 3343
        /*                                                                                                             // 3344
         * Alias Extension                                                                                             // 3345
         *                                                                                                             // 3346
         * Allows a module to be a plain copy of another module by module name                                         // 3347
         *                                                                                                             // 3348
         * System.meta['mybootstrapalias'] = { alias: 'bootstrap' };                                                   // 3349
         *                                                                                                             // 3350
         */                                                                                                            // 3351
        (function() {                                                                                                  // 3352
            // aliases                                                                                                 // 3353
            hook('fetch', function(fetch) {                                                                            // 3354
                return function(load) {                                                                                // 3355
                    var alias = load.metadata.alias;                                                                   // 3356
                    if (alias) {                                                                                       // 3357
                        load.metadata.format = 'defined';                                                              // 3358
                        this.defined[load.name] = {                                                                    // 3359
                            declarative: true,                                                                         // 3360
                            deps: [alias],                                                                             // 3361
                            declare: function(_export) {                                                               // 3362
                                return {                                                                               // 3363
                                    setters: [function(module) {                                                       // 3364
                                        for (var p in module)                                                          // 3365
                                            _export(p, module[p]);                                                     // 3366
                                    }],                                                                                // 3367
                                    execute: function() {}                                                             // 3368
                                };                                                                                     // 3369
                            }                                                                                          // 3370
                        };                                                                                             // 3371
                        return '';                                                                                     // 3372
                    }                                                                                                  // 3373
                                                                                                                       // 3374
                    return fetch.call(this, load);                                                                     // 3375
                };                                                                                                     // 3376
            });                                                                                                        // 3377
        })();/*                                                                                                        // 3378
         * Meta Extension                                                                                              // 3379
         *                                                                                                             // 3380
         * Sets default metadata on a load record (load.metadata) from                                                 // 3381
         * loader.metadata via System.meta function.                                                                   // 3382
         *                                                                                                             // 3383
         *                                                                                                             // 3384
         * Also provides an inline meta syntax for module meta in source.                                              // 3385
         *                                                                                                             // 3386
         * Eg:                                                                                                         // 3387
         *                                                                                                             // 3388
         * loader.meta({                                                                                               // 3389
         *   'my/module': { deps: ['jquery'] }                                                                         // 3390
         *   'my/*': { format: 'amd' }                                                                                 // 3391
         * });                                                                                                         // 3392
         *                                                                                                             // 3393
         * Which in turn populates loader.metadata.                                                                    // 3394
         *                                                                                                             // 3395
         * load.metadata.deps and load.metadata.format will then be set                                                // 3396
         * for 'my/module'                                                                                             // 3397
         *                                                                                                             // 3398
         * The same meta could be set with a my/module.js file containing:                                             // 3399
         *                                                                                                             // 3400
         * my/module.js                                                                                                // 3401
         *   "format amd";                                                                                             // 3402
         *   "deps[] jquery";                                                                                          // 3403
         *   "globals.some value"                                                                                      // 3404
         *   console.log('this is my/module');                                                                         // 3405
         *                                                                                                             // 3406
         * Configuration meta always takes preference to inline meta.                                                  // 3407
         *                                                                                                             // 3408
         * Multiple matches in wildcards are supported and ammend the meta.                                            // 3409
         *                                                                                                             // 3410
         *                                                                                                             // 3411
         * The benefits of the function form is that paths are URL-normalized                                          // 3412
         * supporting say                                                                                              // 3413
         *                                                                                                             // 3414
         * loader.meta({ './app': { format: 'cjs' } });                                                                // 3415
         *                                                                                                             // 3416
         * Instead of needing to set against the absolute URL (https://site.com/app.js)                                // 3417
         *                                                                                                             // 3418
         */                                                                                                            // 3419
                                                                                                                       // 3420
        (function() {                                                                                                  // 3421
                                                                                                                       // 3422
            hookConstructor(function(constructor) {                                                                    // 3423
                return function() {                                                                                    // 3424
                    this.meta = {};                                                                                    // 3425
                    constructor.call(this);                                                                            // 3426
                };                                                                                                     // 3427
            });                                                                                                        // 3428
                                                                                                                       // 3429
            hook('locate', function(locate) {                                                                          // 3430
                return function(load) {                                                                                // 3431
                    var meta = this.meta;                                                                              // 3432
                    var name = load.name;                                                                              // 3433
                                                                                                                       // 3434
                    // NB for perf, maybe introduce a fast-path wildcard lookup cache here                             // 3435
                    // which is checked first                                                                          // 3436
                                                                                                                       // 3437
                    // apply wildcard metas                                                                            // 3438
                    var bestDepth = 0;                                                                                 // 3439
                    var wildcardIndex;                                                                                 // 3440
                    for (var module in meta) {                                                                         // 3441
                        wildcardIndex = indexOf.call(module, '*');                                                     // 3442
                        if (wildcardIndex === -1)                                                                      // 3443
                            continue;                                                                                  // 3444
                        if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex)                          // 3445
                            && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
                            var depth = module.split('/').length;                                                      // 3447
                            if (depth > bestDepth)                                                                     // 3448
                                bestDetph = depth;                                                                     // 3449
                            extend(load.metadata, meta[module], bestDepth != depth);                                   // 3450
                        }                                                                                              // 3451
                    }                                                                                                  // 3452
                                                                                                                       // 3453
                    // apply exact meta                                                                                // 3454
                    if (meta[name])                                                                                    // 3455
                        extend(load.metadata, meta[name]);                                                             // 3456
                                                                                                                       // 3457
                    return locate.call(this, load);                                                                    // 3458
                };                                                                                                     // 3459
            });                                                                                                        // 3460
                                                                                                                       // 3461
            // detect any meta header syntax                                                                           // 3462
            // only set if not already set                                                                             // 3463
            var metaRegEx = /^(\s*\/\*.*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;                         // 3464
            var metaPartRegEx = /\/\*.*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;                                    // 3465
                                                                                                                       // 3466
            function setMetaProperty(target, p, value) {                                                               // 3467
                var pParts = p.split('.');                                                                             // 3468
                var curPart;                                                                                           // 3469
                while (pParts.length > 1) {                                                                            // 3470
                    curPart = pParts.shift();                                                                          // 3471
                    target = target[curPart] = target[curPart] || {};                                                  // 3472
                }                                                                                                      // 3473
                curPart = pParts.shift();                                                                              // 3474
                if (!(curPart in target))                                                                              // 3475
                    target[curPart] = value;                                                                           // 3476
            }                                                                                                          // 3477
                                                                                                                       // 3478
            hook('translate', function(translate) {                                                                    // 3479
                return function(load) {                                                                                // 3480
                    // NB meta will be post-translate pending transpiler conversion to plugins                         // 3481
                    var meta = load.source.match(metaRegEx);                                                           // 3482
                    if (meta) {                                                                                        // 3483
                        var metaParts = meta[0].match(metaPartRegEx);                                                  // 3484
                                                                                                                       // 3485
                        for (var i = 0; i < metaParts.length; i++) {                                                   // 3486
                            var curPart = metaParts[i];                                                                // 3487
                            var len = curPart.length;                                                                  // 3488
                                                                                                                       // 3489
                            var firstChar = curPart.substr(0, 1);                                                      // 3490
                            if (curPart.substr(len - 1, 1) == ';')                                                     // 3491
                                len--;                                                                                 // 3492
                                                                                                                       // 3493
                            if (firstChar != '"' && firstChar != "'")                                                  // 3494
                                continue;                                                                              // 3495
                                                                                                                       // 3496
                            var metaString = curPart.substr(1, curPart.length - 3);                                    // 3497
                            var metaName = metaString.substr(0, metaString.indexOf(' '));                              // 3498
                                                                                                                       // 3499
                            if (metaName) {                                                                            // 3500
                                var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);
                                                                                                                       // 3502
                                if (metaName.substr(metaName.length - 2, 2) == '[]') {                                 // 3503
                                    metaName = metaName.substr(0, metaName.length - 2);                                // 3504
                                    load.metadata[metaName] = load.metadata[metaName] || [];                           // 3505
                                }                                                                                      // 3506
                                                                                                                       // 3507
                                // temporary backwards compat for previous "deps" syntax                               // 3508
                                if (load.metadata[metaName] instanceof Array)                                          // 3509
                                    load.metadata[metaName].push(metaValue);                                           // 3510
                                else                                                                                   // 3511
                                    setMetaProperty(load.metadata, metaName, metaValue);                               // 3512
                            }                                                                                          // 3513
                        }                                                                                              // 3514
                    }                                                                                                  // 3515
                                                                                                                       // 3516
                    return translate.call(this, load);                                                                 // 3517
                };                                                                                                     // 3518
            });                                                                                                        // 3519
        })();/*                                                                                                        // 3520
         System bundles                                                                                                // 3521
                                                                                                                       // 3522
         Allows a bundle module to be specified which will be dynamically                                              // 3523
         loaded before trying to load a given module.                                                                  // 3524
                                                                                                                       // 3525
         For example:                                                                                                  // 3526
         System.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']                                             // 3527
                                                                                                                       // 3528
         Will result in a load to "mybundle" whenever a load to "jquery"                                               // 3529
         or "bootstrap/js/bootstrap" is made.                                                                          // 3530
                                                                                                                       // 3531
         In this way, the bundle becomes the request that provides the module                                          // 3532
         */                                                                                                            // 3533
                                                                                                                       // 3534
        (function() {                                                                                                  // 3535
            // bundles support (just like RequireJS)                                                                   // 3536
            // bundle name is module name of bundle itself                                                             // 3537
            // bundle is array of modules defined by the bundle                                                        // 3538
            // when a module in the bundle is requested, the bundle is loaded instead                                  // 3539
            // of the form System.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']                           // 3540
            hookConstructor(function(constructor) {                                                                    // 3541
                return function() {                                                                                    // 3542
                    constructor.call(this);                                                                            // 3543
                    this.bundles = {};                                                                                 // 3544
                    this.loadedBundles_ = {};                                                                          // 3545
                };                                                                                                     // 3546
            });                                                                                                        // 3547
                                                                                                                       // 3548
            function loadFromBundle(loader, bundle) {                                                                  // 3549
                return Promise.resolve(loader.normalize(bundle))                                                       // 3550
                    .then(function(normalized) {                                                                       // 3551
                        loader.loadedBundles_[normalized] = true;                                                      // 3552
                        loader.bundles[normalized] = loader.bundles[normalized] || loader.bundles[bundle];             // 3553
                        return loader.load(normalized);                                                                // 3554
                    })                                                                                                 // 3555
                    .then(function() {                                                                                 // 3556
                        return '';                                                                                     // 3557
                    });                                                                                                // 3558
            }                                                                                                          // 3559
                                                                                                                       // 3560
            // assign bundle metadata for bundle loads                                                                 // 3561
            hook('locate', function(locate) {                                                                          // 3562
                return function(load) {                                                                                // 3563
                    if (load.name in this.loadedBundles_ || load.name in this.bundles)                                 // 3564
                        load.metadata.bundle = true;                                                                   // 3565
                                                                                                                       // 3566
                    return locate.call(this, load);                                                                    // 3567
                };                                                                                                     // 3568
            });                                                                                                        // 3569
                                                                                                                       // 3570
            hook('fetch', function(fetch) {                                                                            // 3571
                return function(load) {                                                                                // 3572
                    var loader = this;                                                                                 // 3573
                    if (loader.trace)                                                                                  // 3574
                        return fetch.call(loader, load);                                                               // 3575
                                                                                                                       // 3576
                    // if already defined, no need to load a bundle                                                    // 3577
                    if (load.name in loader.defined)                                                                   // 3578
                        return '';                                                                                     // 3579
                                                                                                                       // 3580
                    // check if it is in an already-loaded bundle                                                      // 3581
                    for (var b in loader.loadedBundles_) {                                                             // 3582
                        if (indexOf.call(loader.bundles[b], load.name) != -1)                                          // 3583
                            return loadFromBundle(loader, b);                                                          // 3584
                    }                                                                                                  // 3585
                                                                                                                       // 3586
                    // check if it is a new bundle                                                                     // 3587
                    for (var b in loader.bundles) {                                                                    // 3588
                        if (indexOf.call(loader.bundles[b], load.name) != -1)                                          // 3589
                            return loadFromBundle(loader, b);                                                          // 3590
                    }                                                                                                  // 3591
                                                                                                                       // 3592
                    return fetch.call(loader, load);                                                                   // 3593
                };                                                                                                     // 3594
            });                                                                                                        // 3595
        })();                                                                                                          // 3596
        /*                                                                                                             // 3597
         * Dependency Tree Cache                                                                                       // 3598
         *                                                                                                             // 3599
         * Allows a build to pre-populate a dependency trace tree on the loader of                                     // 3600
         * the expected dependency tree, to be loaded upfront when requesting the                                      // 3601
         * module, avoinding the n round trips latency of module loading, where                                        // 3602
         * n is the dependency tree depth.                                                                             // 3603
         *                                                                                                             // 3604
         * eg:                                                                                                         // 3605
         * System.depCache = {                                                                                         // 3606
         *  'app': ['normalized', 'deps'],                                                                             // 3607
         *  'normalized': ['another'],                                                                                 // 3608
         *  'deps': ['tree']                                                                                           // 3609
         * };                                                                                                          // 3610
         *                                                                                                             // 3611
         * System.import('app')                                                                                        // 3612
         * // simultaneously starts loading all of:                                                                    // 3613
         * // 'normalized', 'deps', 'another', 'tree'                                                                  // 3614
         * // before "app" source is even loaded                                                                       // 3615
         */                                                                                                            // 3616
                                                                                                                       // 3617
        (function() {                                                                                                  // 3618
            hookConstructor(function(constructor) {                                                                    // 3619
                return function() {                                                                                    // 3620
                    constructor.call(this);                                                                            // 3621
                    this.depCache = {};                                                                                // 3622
                }                                                                                                      // 3623
            });                                                                                                        // 3624
                                                                                                                       // 3625
            hook('locate', function(locate) {                                                                          // 3626
                return function(load) {                                                                                // 3627
                    var loader = this;                                                                                 // 3628
                    // load direct deps, in turn will pick up their trace trees                                        // 3629
                    var deps = loader.depCache[load.name];                                                             // 3630
                    if (deps)                                                                                          // 3631
                        for (var i = 0; i < deps.length; i++)                                                          // 3632
                            loader['import'](deps[i]);                                                                 // 3633
                                                                                                                       // 3634
                    return locate.call(loader, load);                                                                  // 3635
                };                                                                                                     // 3636
            });                                                                                                        // 3637
        })();                                                                                                          // 3638
                                                                                                                       // 3639
        /*                                                                                                             // 3640
         * Conditions Extension                                                                                        // 3641
         *                                                                                                             // 3642
         *   Allows a condition module to alter the resolution of an import via syntax:                                // 3643
         *                                                                                                             // 3644
         *     import $ from 'jquery/#{browser}';                                                                      // 3645
         *                                                                                                             // 3646
         *   Will first load the module 'browser' via `System.import('browser')` and                                   // 3647
         *   take the default export of that module.                                                                   // 3648
         *   If the default export is not a string, an error is thrown.                                                // 3649
         *                                                                                                             // 3650
         *   We then substitute the string into the require to get the conditional resolution                          // 3651
         *   enabling environment-specific variations like:                                                            // 3652
         *                                                                                                             // 3653
         *     import $ from 'jquery/ie'                                                                               // 3654
         *     import $ from 'jquery/firefox'                                                                          // 3655
         *     import $ from 'jquery/chrome'                                                                           // 3656
         *     import $ from 'jquery/safari'                                                                           // 3657
         *                                                                                                             // 3658
         *   It can be useful for a condition module to define multiple conditions.                                    // 3659
         *   This can be done via the `.` modifier to specify a member expression:                                     // 3660
         *                                                                                                             // 3661
         *     import 'jquery/#{browser.grade}'                                                                        // 3662
         *                                                                                                             // 3663
         *   Where the `grade` export of the `browser` module is taken for substitution.                               // 3664
         *                                                                                                             // 3665
         *   Note that `/` and a leading `.` are not permitted within conditional modules                              // 3666
         *   so that this syntax can be well-defined.                                                                  // 3667
         *                                                                                                             // 3668
         *                                                                                                             // 3669
         * Boolean Conditionals                                                                                        // 3670
         *                                                                                                             // 3671
         *   For polyfill modules, that are used as imports but have no module value,                                  // 3672
         *   a binary conditional allows a module not to be loaded at all if not needed:                               // 3673
         *                                                                                                             // 3674
         *     import 'es5-shim#?conditions.needs-es5shim'                                                             // 3675
         *                                                                                                             // 3676
         */                                                                                                            // 3677
        (function() {                                                                                                  // 3678
                                                                                                                       // 3679
            var conditionalRegEx = /#\{[^\}]+\}|#\?.+$/;                                                               // 3680
                                                                                                                       // 3681
            hookConstructor(function(constructor) {                                                                    // 3682
                return function() {                                                                                    // 3683
                    constructor.call(this);                                                                            // 3684
                                                                                                                       // 3685
                    // standard environment module, starting small as backwards-compat matters!                        // 3686
                    this.set('@system-env', this.newModule({                                                           // 3687
                        browser: isBrowser                                                                             // 3688
                    }));                                                                                               // 3689
                };                                                                                                     // 3690
            });                                                                                                        // 3691
                                                                                                                       // 3692
            hook('normalize', function(normalize) {                                                                    // 3693
                return function(name, parentName, parentAddress) {                                                     // 3694
                    var loader = this;                                                                                 // 3695
                    var conditionalMatch = name.match(conditionalRegEx);                                               // 3696
                    if (conditionalMatch) {                                                                            // 3697
                        var substitution = conditionalMatch[0][1] != '?';                                              // 3698
                                                                                                                       // 3699
                        var conditionModule = substitution ? conditionalMatch[0].substr(2, conditionalMatch[0].length - 3) : conditionalMatch[0].substr(2);
                                                                                                                       // 3701
                        if (conditionModule[0] == '.' || conditionModule.indexOf('/') != -1)                           // 3702
                            throw new TypeError('Invalid condition ' + conditionalMatch[0] + '\n\tCondition modules cannot contain . or / in the name.');
                                                                                                                       // 3704
                        var conditionExport = 'default';                                                               // 3705
                        var conditionExportIndex = conditionModule.indexOf('.');                                       // 3706
                        if (conditionExportIndex != -1) {                                                              // 3707
                            conditionExport = conditionModule.substr(conditionExportIndex + 1);                        // 3708
                            conditionModule = conditionModule.substr(0, conditionExportIndex);                         // 3709
                        }                                                                                              // 3710
                                                                                                                       // 3711
                        var booleanNegation = !substitution && conditionModule[0] == '~';                              // 3712
                        if (booleanNegation)                                                                           // 3713
                            conditionModule = conditionModule.substr(1);                                               // 3714
                                                                                                                       // 3715
                        return loader['import'](conditionModule, parentName, parentAddress)                            // 3716
                            .then(function(m) {                                                                        // 3717
                                var conditionValue = readMemberExpression(conditionExport, m);                         // 3718
                                                                                                                       // 3719
                                if (substitution) {                                                                    // 3720
                                    if (typeof conditionValue !== 'string')                                            // 3721
                                        throw new TypeError('The condition value for ' + conditionalMatch[0] + ' doesn\'t resolving to a string.');
                                    name = name.replace(conditionalRegEx, conditionValue);                             // 3723
                                }                                                                                      // 3724
                                else {                                                                                 // 3725
                                    if (typeof conditionValue !== 'boolean')                                           // 3726
                                        throw new TypeError('The condition value for ' + conditionalMatch[0] + ' isn\'t resolving to a boolean.');
                                    if (booleanNegation)                                                               // 3728
                                        conditionValue = !conditionValue;                                              // 3729
                                    if (!conditionValue)                                                               // 3730
                                        name = '@empty';                                                               // 3731
                                    else                                                                               // 3732
                                        name = name.replace(conditionalRegEx, '');                                     // 3733
                                }                                                                                      // 3734
                                return normalize.call(loader, name, parentName, parentAddress);                        // 3735
                            });                                                                                        // 3736
                    }                                                                                                  // 3737
                                                                                                                       // 3738
                    return Promise.resolve(normalize.call(loader, name, parentName, parentAddress));                   // 3739
                };                                                                                                     // 3740
            });                                                                                                        // 3741
                                                                                                                       // 3742
        })();System = new SystemJSLoader();                                                                            // 3743
        System.constructor = SystemJSLoader;  // -- exporting --                                                       // 3744
                                                                                                                       // 3745
        if (typeof exports === 'object')                                                                               // 3746
            module.exports = Loader;                                                                                   // 3747
                                                                                                                       // 3748
        __global.Reflect = __global.Reflect || {};                                                                     // 3749
        __global.Reflect.Loader = __global.Reflect.Loader || Loader;                                                   // 3750
        __global.Reflect.global = __global.Reflect.global || __global;                                                 // 3751
        __global.LoaderPolyfill = Loader;                                                                              // 3752
                                                                                                                       // 3753
        if (!System) {                                                                                                 // 3754
            System = new SystemLoader();                                                                               // 3755
            System.constructor = SystemLoader;                                                                         // 3756
        }                                                                                                              // 3757
                                                                                                                       // 3758
        if (typeof exports === 'object')                                                                               // 3759
            module.exports = System;                                                                                   // 3760
                                                                                                                       // 3761
        __global.System = System;                                                                                      // 3762
                                                                                                                       // 3763
    })(typeof self != 'undefined' ? self : global);}                                                                   // 3764
                                                                                                                       // 3765
// auto-load Promise and URL polyfills if needed in the browser                                                        // 3766
    try {                                                                                                              // 3767
        var hasURL = typeof URLPolyfill != 'undefined' || new URL('test:///').protocol == 'test:';                     // 3768
    }                                                                                                                  // 3769
    catch(e) {}                                                                                                        // 3770
                                                                                                                       // 3771
    if (typeof Promise === 'undefined' || !hasURL) {                                                                   // 3772
        // document.write                                                                                              // 3773
        if (typeof document !== 'undefined') {                                                                         // 3774
            var scripts = document.getElementsByTagName('script');                                                     // 3775
            $__curScript = scripts[scripts.length - 1];                                                                // 3776
            var curPath = $__curScript.src;                                                                            // 3777
            var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);                                            // 3778
            window.systemJSBootstrap = bootstrap;                                                                      // 3779
            document.write(                                                                                            // 3780
                '<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>'    // 3781
            );                                                                                                         // 3782
        }                                                                                                              // 3783
        // importScripts                                                                                               // 3784
        else if (typeof importScripts !== 'undefined') {                                                               // 3785
            var basePath = '';                                                                                         // 3786
            try {                                                                                                      // 3787
                throw new Error('_');                                                                                  // 3788
            } catch (e) {                                                                                              // 3789
                e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {                                   // 3790
                    basePath = url.replace(/\/[^\/]*$/, '/');                                                          // 3791
                });                                                                                                    // 3792
            }                                                                                                          // 3793
            importScripts(basePath + 'system-polyfills.js');                                                           // 3794
            bootstrap();                                                                                               // 3795
        }                                                                                                              // 3796
        else {                                                                                                         // 3797
            bootstrap();                                                                                               // 3798
        }                                                                                                              // 3799
    }                                                                                                                  // 3800
    else {                                                                                                             // 3801
        bootstrap();                                                                                                   // 3802
    }                                                                                                                  // 3803
                                                                                                                       // 3804
                                                                                                                       // 3805
})();                                                                                                                  // 3806
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5194
}).call(this);                                                       // 5195
                                                                     // 5196
                                                                     // 5197
                                                                     // 5198
                                                                     // 5199
                                                                     // 5200
                                                                     // 5201
(function () {                                                       // 5202
                                                                     // 5203
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:modules/system-config.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Backup original SystemJS methods                                                                                    // 1
var _System = {                                                                                                        // 2
    normalize: System.normalize,                                                                                       // 3
    normalizeSync: System.normalizeSync,                                                                               // 4
    locate: System.locate,                                                                                             // 5
    fetch: System.fetch,                                                                                               // 6
    translate: System.translate,                                                                                       // 7
    instantiate: System.instantiate                                                                                    // 8
};                                                                                                                     // 9
                                                                                                                       // 10
// Make `register` the default module format                                                                           // 11
System.config({                                                                                                        // 12
    meta: {                                                                                                            // 13
        '*': {                                                                                                         // 14
            format: 'register'                                                                                         // 15
        }                                                                                                              // 16
    }                                                                                                                  // 17
});                                                                                                                    // 18
                                                                                                                       // 19
// Regular expressions for Meteor package import syntax                                                                // 20
var appRegex = /^\{}\//;                                                                                               // 21
var packageRegex = /^{([\w-]*?):?([\w-]+)}/;                                                                           // 22
var packageRegexBC = /^([\w-]+):([\w-]+)/;                                                                             // 23
                                                                                                                       // 24
/**                                                                                                                    // 25
 * Convert Meteor package syntax to System.normalize friendly string.                                                  // 26
 * The `__author_package/foo` syntax in an internal implementation that is subject to change.                          // 27
 * You should never rely on it! Instead pass all your module names through System.normalizeSync                        // 28
 * @param {string} name - unnormalized module name with Meteor package syntax                                          // 29
 * @returns {string} - unnormalized module name without Meteor package syntax                                          // 30
 */                                                                                                                    // 31
var normalizeMeteorPackageName = function (name) {                                                                     // 32
    name = name                                                                                                        // 33
        .replace(appRegex, '') // {}/foo -> foo                                                                        // 34
        .replace(packageRegex, '__$1_$2'); // {author:package}/foo -> __author_package/foo                             // 35
                                                                                                                       // 36
    if (packageRegexBC.test(name)) {                                                                                   // 37
        // provide temporary backward compatibility for versions < 0.4 package syntax                                  // 38
        console.warn([                                                                                                 // 39
            '[Universe Modules]',                                                                                      // 40
            'You are using deprecated syntax for importing modules from a package.',                                   // 41
            'Instead of', name, 'you should use', name.replace(packageRegexBC, '{$1:$2}')                              // 42
        ].join(' '));                                                                                                  // 43
        return name.replace(packageRegexBC, '__$1_$2'); // author:package/foo -> __author_package/foo                  // 44
    }                                                                                                                  // 45
    return name;                                                                                                       // 46
};                                                                                                                     // 47
                                                                                                                       // 48
/*                                                                                                                     // 49
 * name: the unnormalized module name                                                                                  // 50
 * parentName: the canonical module name for the requesting module                                                     // 51
 * parentAddress: the address of the requesting module                                                                 // 52
 */                                                                                                                    // 53
System.normalize = function (name, parentName, parentAddress) {                                                        // 54
                                                                                                                       // 55
    // Allow foomodule.import syntax in import name (TypeScript support)                                               // 56
    if (name.slice(-7) === '.import') {                                                                                // 57
        name = name.slice(0, -7);                                                                                      // 58
    }                                                                                                                  // 59
                                                                                                                       // 60
    // Load original normalize                                                                                         // 61
    return _System.normalize.call(this, normalizeMeteorPackageName(name), parentName, parentAddress);                  // 62
};                                                                                                                     // 63
                                                                                                                       // 64
/*                                                                                                                     // 65
 * name: the unnormalized module name                                                                                  // 66
 * parentName: the canonical module name for the requesting module                                                     // 67
 */                                                                                                                    // 68
System.normalizeSync = function (name, parentName) {                                                                   // 69
    return _System.normalizeSync.call(this, normalizeMeteorPackageName(name), parentName);                             // 70
};                                                                                                                     // 71
                                                                                                                       // 72
/*                                                                                                                     // 73
 * load.name the canonical module name                                                                                 // 74
 * load.metadata a metadata object that can be used to store                                                           // 75
 *   derived metadata for reference in other hooks                                                                     // 76
 */                                                                                                                    // 77
//System.locate = function (load) {                                                                                    // 78
//    return _System.locate.call(this, load);                                                                          // 79
//};                                                                                                                   // 80
                                                                                                                       // 81
/*                                                                                                                     // 82
 * load.name: the canonical module name                                                                                // 83
 * load.address: the URL returned from locate                                                                          // 84
 * load.metadata: the same metadata object by reference, which                                                         // 85
 *   can be modified                                                                                                   // 86
 */                                                                                                                    // 87
System.fetch = function (load) {                                                                                       // 88
    var promise = _System.fetch.call(this, load);                                                                      // 89
                                                                                                                       // 90
    if (!promise) {                                                                                                    // 91
        // not really a promise                                                                                        // 92
        return promise;                                                                                                // 93
    }                                                                                                                  // 94
                                                                                                                       // 95
    // Add our warning                                                                                                 // 96
    return promise.catch(function () {                                                                                 // 97
        console.warn('[Universe Modules]: Module ' + load.name.replace(System.baseURL, '') + ' does not exist! You will probably see other errors in the console because of that.');
                                                                                                                       // 99
    });                                                                                                                // 100
};                                                                                                                     // 101
                                                                                                                       // 102
/*                                                                                                                     // 103
 * load.name                                                                                                           // 104
 * load.address                                                                                                        // 105
 * load.metadata                                                                                                       // 106
 * load.source: the fetched source                                                                                     // 107
 */                                                                                                                    // 108
//System.translate = function (load) {                                                                                 // 109
//    return _System.translate.call(this, load);                                                                       // 110
//};                                                                                                                   // 111
                                                                                                                       // 112
/*                                                                                                                     // 113
 * load identical to previous hooks, but load.source                                                                   // 114
 * is now the translated source                                                                                        // 115
 */                                                                                                                    // 116
//System.instantiate = function (load) {                                                                               // 117
//    return _System.instantiate.call(this, load);                                                                     // 118
//};                                                                                                                   // 119
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5330
}).call(this);                                                       // 5331
                                                                     // 5332
                                                                     // 5333
                                                                     // 5334
                                                                     // 5335
                                                                     // 5336
                                                                     // 5337
(function () {                                                       // 5338
                                                                     // 5339
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:modules/package-level-vars.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * Following script, adds possibility of import of exported variables from packages                                    // 2
 * @example import {UniCollection, UniUsers} from '{vazco:universe-collection}!vars'                                   // 3
 * import {DDP} from '{ddp}!vars'                                                                                      // 4
 */                                                                                                                    // 5
var packageRegex = /^{((?:[\w-]*?):?(?:[\w-]+))}!vars$/;                                                               // 6
var _normalize = System.normalize;                                                                                     // 7
                                                                                                                       // 8
System.normalize = function (name) {                                                                                   // 9
    var packageName;                                                                                                   // 10
    if (packageRegex.test(name)) {                                                                                     // 11
        packageName = name.replace(packageRegex, '$1');                                                                // 12
        if (Package[packageName]) {                                                                                    // 13
            //Getting access for exported variables by meteor package                                                  // 14
            System.registerDynamic(name, [], true, function (require, exports, module) {                               // 15
                module.exports = Package[packageName];                                                                 // 16
            });                                                                                                        // 17
        }                                                                                                              // 18
    }                                                                                                                  // 19
    return _normalize.apply(this, arguments);                                                                          // 20
};                                                                                                                     // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5368
}).call(this);                                                       // 5369
                                                                     // 5370
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['universe:modules'] = {};

})();

//# sourceMappingURL=universe_modules.js.map
