(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var babelHelpers = Package['babel-runtime'].babelHelpers;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe_carousel/packages/universe_carousel.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/index.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.config({                                                                                                        // 1
    packages: {                                                                                                        // 2
        '{universe:carousel}': {                                                                                       // 3
            main: 'index',                                                                                             // 4
            format: 'register',                                                                                        // 5
            map: {                                                                                                     // 6
                '.': System.normalizeSync('{universe:carousel}')                                                       // 7
            }                                                                                                          // 8
        }                                                                                                              // 9
    }                                                                                                                  // 10
});                                                                                                                    // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 21
}).call(this);                                                                                                         // 22
                                                                                                                       // 23
                                                                                                                       // 24
                                                                                                                       // 25
                                                                                                                       // 26
                                                                                                                       // 27
                                                                                                                       // 28
(function () {                                                                                                         // 29
                                                                                                                       // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/index.import.js.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/index', ['./components/slider'], function (_export) {                             // 37
  return {                                                                                                             // 38
    setters: [function (_componentsSlider) {                                                                           // 39
      for (var _key in _componentsSlider) {                                                                            // 40
        _export(_key, _componentsSlider[_key]);                                                                        // 41
      }                                                                                                                // 42
    }],                                                                                                                // 43
    execute: function () {}                                                                                            // 44
  };                                                                                                                   // 45
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 47
}).call(this);                                                                                                         // 48
                                                                                                                       // 49
                                                                                                                       // 50
                                                                                                                       // 51
                                                                                                                       // 52
                                                                                                                       // 53
                                                                                                                       // 54
(function () {                                                                                                         // 55
                                                                                                                       // 56
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/classnames.import.jsx.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/classnames', [], function (_export) {                                         // 63
    _export('default', classNames);                                                                                    // 64
                                                                                                                       // 65
    function classNames() {                                                                                            // 66
                                                                                                                       // 67
        var classes = '';                                                                                              // 68
                                                                                                                       // 69
        for (var i = 0; i < arguments.length; i++) {                                                                   // 70
            var arg = arguments[i];                                                                                    // 71
            if (!arg) continue;                                                                                        // 72
                                                                                                                       // 73
            var argType = typeof arg;                                                                                  // 74
                                                                                                                       // 75
            if ('string' === argType || 'number' === argType) {                                                        // 76
                classes += ' ' + arg;                                                                                  // 77
            } else if (Array.isArray(arg)) {                                                                           // 78
                classes += ' ' + classNames.apply(null, arg);                                                          // 79
            } else if ('object' === argType) {                                                                         // 80
                for (var key in arg) {                                                                                 // 81
                    if (arg.hasOwnProperty(key) && arg[key]) {                                                         // 82
                        classes += ' ' + key;                                                                          // 83
                    }                                                                                                  // 84
                }                                                                                                      // 85
            }                                                                                                          // 86
        }                                                                                                              // 87
                                                                                                                       // 88
        return classes.substr(1);                                                                                      // 89
    }                                                                                                                  // 90
                                                                                                                       // 91
    return {                                                                                                           // 92
        setters: [],                                                                                                   // 93
        execute: function () {                                                                                         // 94
            ;                                                                                                          // 95
        }                                                                                                              // 96
    };                                                                                                                 // 97
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 99
}).call(this);                                                                                                         // 100
                                                                                                                       // 101
                                                                                                                       // 102
                                                                                                                       // 103
                                                                                                                       // 104
                                                                                                                       // 105
                                                                                                                       // 106
(function () {                                                                                                         // 107
                                                                                                                       // 108
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/enquire.import.jsx.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/enquire', [], function (_export) {                                            // 115
    var enquire, matchMedia;                                                                                           // 116
                                                                                                                       // 117
    /*jshint unused:false */                                                                                           // 118
    /**                                                                                                                // 119
     * Helper function for iterating over a collection                                                                 // 120
     *                                                                                                                 // 121
     * @param collection                                                                                               // 122
     * @param fn                                                                                                       // 123
     */                                                                                                                // 124
    function each(collection, fn) {                                                                                    // 125
        var i = 0,                                                                                                     // 126
            length = collection.length,                                                                                // 127
            cont;                                                                                                      // 128
                                                                                                                       // 129
        for (i; i < length; i++) {                                                                                     // 130
            cont = fn(collection[i], i);                                                                               // 131
            if (cont === false) {                                                                                      // 132
                break; //allow early exit                                                                              // 133
            }                                                                                                          // 134
        }                                                                                                              // 135
    }                                                                                                                  // 136
                                                                                                                       // 137
    /**                                                                                                                // 138
     * Helper function for determining whether target object is an array                                               // 139
     *                                                                                                                 // 140
     * @param target the object under test                                                                             // 141
     * @return {Boolean} true if array, false otherwise                                                                // 142
     */                                                                                                                // 143
    function isArray(target) {                                                                                         // 144
        return Object.prototype.toString.apply(target) === '[object Array]';                                           // 145
    }                                                                                                                  // 146
                                                                                                                       // 147
    /**                                                                                                                // 148
     * Helper function for determining whether target object is a function                                             // 149
     *                                                                                                                 // 150
     * @param target the object under test                                                                             // 151
     * @return {Boolean} true if function, false otherwise                                                             // 152
     */                                                                                                                // 153
    function isFunction(target) {                                                                                      // 154
        return typeof target === 'function';                                                                           // 155
    }                                                                                                                  // 156
                                                                                                                       // 157
    /**                                                                                                                // 158
     * Delegate to handle a media query being matched and unmatched.                                                   // 159
     *                                                                                                                 // 160
     * @param {object} options                                                                                         // 161
     * @param {function} options.match callback for when the media query is matched                                    // 162
     * @param {function} [options.unmatch] callback for when the media query is unmatched                              // 163
     * @param {function} [options.setup] one-time callback triggered the first time a query is matched                 // 164
     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
     * @constructor                                                                                                    // 166
     */                                                                                                                // 167
    function QueryHandler(options) {                                                                                   // 168
        this.options = options;                                                                                        // 169
        !options.deferSetup && this.setup();                                                                           // 170
    }                                                                                                                  // 171
                                                                                                                       // 172
    /**                                                                                                                // 173
     * Represents a single media query, manages it's state and registered handlers for this query                      // 174
     *                                                                                                                 // 175
     * @constructor                                                                                                    // 176
     * @param {string} query the media query string                                                                    // 177
     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
     */                                                                                                                // 179
    function MediaQuery(query, isUnconditional) {                                                                      // 180
        this.query = query;                                                                                            // 181
        this.isUnconditional = isUnconditional;                                                                        // 182
        this.handlers = [];                                                                                            // 183
        this.mql = matchMedia(query);                                                                                  // 184
                                                                                                                       // 185
        var self = this;                                                                                               // 186
        this.listener = function (mql) {                                                                               // 187
            self.mql = mql;                                                                                            // 188
            self.assess();                                                                                             // 189
        };                                                                                                             // 190
        this.mql.addListener(this.listener);                                                                           // 191
    }                                                                                                                  // 192
                                                                                                                       // 193
    /**                                                                                                                // 194
     * Allows for registration of query handlers.                                                                      // 195
     * Manages the query handler's state and is responsible for wiring up browser events                               // 196
     *                                                                                                                 // 197
     * @constructor                                                                                                    // 198
     */                                                                                                                // 199
    function MediaQueryDispatch() {                                                                                    // 200
        if (!matchMedia) {                                                                                             // 201
            throw new Error('matchMedia not present, legacy browsers require a polyfill');                             // 202
        }                                                                                                              // 203
                                                                                                                       // 204
        this.queries = {};                                                                                             // 205
        this.browserIsIncapable = !matchMedia('only all').matches;                                                     // 206
    }                                                                                                                  // 207
                                                                                                                       // 208
    return {                                                                                                           // 209
        setters: [],                                                                                                   // 210
        execute: function () {                                                                                         // 211
            if (Meteor.isClient) {                                                                                     // 212
                                                                                                                       // 213
                /*!                                                                                                    // 214
                 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript                                             // 215
                 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js                                // 216
                 * License: MIT (http://www.opensource.org/licenses/mit-license.php)                                   // 217
                 */                                                                                                    // 218
                matchMedia = typeof window !== 'undefined' && window.matchMedia;                                       // 219
                QueryHandler.prototype = {                                                                             // 220
                                                                                                                       // 221
                    /**                                                                                                // 222
                     * coordinates setup of the handler                                                                // 223
                     *                                                                                                 // 224
                     * @function                                                                                       // 225
                     */                                                                                                // 226
                    setup: function () {                                                                               // 227
                        if (this.options.setup) {                                                                      // 228
                            this.options.setup();                                                                      // 229
                        }                                                                                              // 230
                        this.initialised = true;                                                                       // 231
                    },                                                                                                 // 232
                                                                                                                       // 233
                    /**                                                                                                // 234
                     * coordinates setup and triggering of the handler                                                 // 235
                     *                                                                                                 // 236
                     * @function                                                                                       // 237
                     */                                                                                                // 238
                    on: function () {                                                                                  // 239
                        !this.initialised && this.setup();                                                             // 240
                        this.options.match && this.options.match();                                                    // 241
                    },                                                                                                 // 242
                                                                                                                       // 243
                    /**                                                                                                // 244
                     * coordinates the unmatch event for the handler                                                   // 245
                     *                                                                                                 // 246
                     * @function                                                                                       // 247
                     */                                                                                                // 248
                    off: function () {                                                                                 // 249
                        this.options.unmatch && this.options.unmatch();                                                // 250
                    },                                                                                                 // 251
                                                                                                                       // 252
                    /**                                                                                                // 253
                     * called when a handler is to be destroyed.                                                       // 254
                     * delegates to the destroy or unmatch callbacks, depending on availability.                       // 255
                     *                                                                                                 // 256
                     * @function                                                                                       // 257
                     */                                                                                                // 258
                    destroy: function () {                                                                             // 259
                        this.options.destroy ? this.options.destroy() : this.off();                                    // 260
                    },                                                                                                 // 261
                                                                                                                       // 262
                    /**                                                                                                // 263
                     * determines equality by reference.                                                               // 264
                     * if object is supplied compare options, if function, compare match callback                      // 265
                     *                                                                                                 // 266
                     * @function                                                                                       // 267
                     * @param {object || function} [target] the target for comparison                                  // 268
                     */                                                                                                // 269
                    equals: function (target) {                                                                        // 270
                        return this.options === target || this.options.match === target;                               // 271
                    }                                                                                                  // 272
                                                                                                                       // 273
                };MediaQuery.prototype = {                                                                             // 274
                                                                                                                       // 275
                    /**                                                                                                // 276
                     * add a handler for this query, triggering if already active                                      // 277
                     *                                                                                                 // 278
                     * @param {object} handler                                                                         // 279
                     * @param {function} handler.match callback for when query is activated                            // 280
                     * @param {function} [handler.unmatch] callback for when query is deactivated                      // 281
                     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
                     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
                     */                                                                                                // 284
                    addHandler: function (handler) {                                                                   // 285
                        var qh = new QueryHandler(handler);                                                            // 286
                        this.handlers.push(qh);                                                                        // 287
                                                                                                                       // 288
                        this.matches() && qh.on();                                                                     // 289
                    },                                                                                                 // 290
                                                                                                                       // 291
                    /**                                                                                                // 292
                     * removes the given handler from the collection, and calls it's destroy methods                   // 293
                     *                                                                                                 // 294
                     * @param {object || function} handler the handler to remove                                       // 295
                     */                                                                                                // 296
                    removeHandler: function (handler) {                                                                // 297
                        var handlers = this.handlers;                                                                  // 298
                        each(handlers, function (h, i) {                                                               // 299
                            if (h.equals(handler)) {                                                                   // 300
                                h.destroy();                                                                           // 301
                                return !handlers.splice(i, 1); //remove from array and exit each early                 // 302
                            }                                                                                          // 303
                        });                                                                                            // 304
                    },                                                                                                 // 305
                                                                                                                       // 306
                    /**                                                                                                // 307
                     * Determine whether the media query should be considered a match                                  // 308
                     *                                                                                                 // 309
                     * @return {Boolean} true if media query can be considered a match, false otherwise                // 310
                     */                                                                                                // 311
                    matches: function () {                                                                             // 312
                        return this.mql.matches || this.isUnconditional;                                               // 313
                    },                                                                                                 // 314
                                                                                                                       // 315
                    /**                                                                                                // 316
                     * Clears all handlers and unbinds events                                                          // 317
                     */                                                                                                // 318
                    clear: function () {                                                                               // 319
                        each(this.handlers, function (handler) {                                                       // 320
                            handler.destroy();                                                                         // 321
                        });                                                                                            // 322
                        this.mql.removeListener(this.listener);                                                        // 323
                        this.handlers.length = 0; //clear array                                                        // 324
                    },                                                                                                 // 325
                                                                                                                       // 326
                    /*                                                                                                 // 327
                     * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
                     */                                                                                                // 329
                    assess: function () {                                                                              // 330
                        var action = this.matches() ? 'on' : 'off';                                                    // 331
                                                                                                                       // 332
                        each(this.handlers, function (handler) {                                                       // 333
                            handler[action]();                                                                         // 334
                        });                                                                                            // 335
                    }                                                                                                  // 336
                };MediaQueryDispatch.prototype = {                                                                     // 337
                                                                                                                       // 338
                    /**                                                                                                // 339
                     * Registers a handler for the given media query                                                   // 340
                     *                                                                                                 // 341
                     * @param {string} q the media query                                                               // 342
                     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
                     * @param {function} options.match fired when query matched                                        // 344
                     * @param {function} [options.unmatch] fired when a query is no longer matched                     // 345
                     * @param {function} [options.setup] fired when handler first triggered                            // 346
                     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
                     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
                     */                                                                                                // 349
                    register: function (q, options, shouldDegrade) {                                                   // 350
                        var queries = this.queries,                                                                    // 351
                            isUnconditional = shouldDegrade && this.browserIsIncapable;                                // 352
                                                                                                                       // 353
                        if (!queries[q]) {                                                                             // 354
                            queries[q] = new MediaQuery(q, isUnconditional);                                           // 355
                        }                                                                                              // 356
                                                                                                                       // 357
                        //normalise to object in an array                                                              // 358
                        if (isFunction(options)) {                                                                     // 359
                            options = { match: options };                                                              // 360
                        }                                                                                              // 361
                        if (!isArray(options)) {                                                                       // 362
                            options = [options];                                                                       // 363
                        }                                                                                              // 364
                        each(options, function (handler) {                                                             // 365
                            if (isFunction(handler)) {                                                                 // 366
                                handler = { match: handler };                                                          // 367
                            }                                                                                          // 368
                            queries[q].addHandler(handler);                                                            // 369
                        });                                                                                            // 370
                                                                                                                       // 371
                        return this;                                                                                   // 372
                    },                                                                                                 // 373
                                                                                                                       // 374
                    /**                                                                                                // 375
                     * unregisters a query and all it's handlers, or a specific handler for a query                    // 376
                     *                                                                                                 // 377
                     * @param {string} q the media query to target                                                     // 378
                     * @param {object || function} [handler] specific handler to unregister                            // 379
                     */                                                                                                // 380
                    unregister: function (q, handler) {                                                                // 381
                        var query = this.queries[q];                                                                   // 382
                                                                                                                       // 383
                        if (query) {                                                                                   // 384
                            if (handler) {                                                                             // 385
                                query.removeHandler(handler);                                                          // 386
                            } else {                                                                                   // 387
                                query.clear();                                                                         // 388
                                delete this.queries[q];                                                                // 389
                            }                                                                                          // 390
                        }                                                                                              // 391
                                                                                                                       // 392
                        return this;                                                                                   // 393
                    }                                                                                                  // 394
                };                                                                                                     // 395
                enquire = new MediaQueryDispatch();                                                                    // 396
            }                                                                                                          // 397
                                                                                                                       // 398
            _export('default', enquire);                                                                               // 399
        }                                                                                                              // 400
    };                                                                                                                 // 401
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 403
}).call(this);                                                                                                         // 404
                                                                                                                       // 405
                                                                                                                       // 406
                                                                                                                       // 407
                                                                                                                       // 408
                                                                                                                       // 409
                                                                                                                       // 410
(function () {                                                                                                         // 411
                                                                                                                       // 412
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/execution-environment.import.jsx.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/execution-environment', [], function (_export) {                              // 419
    var canUseDOM;                                                                                                     // 420
    return {                                                                                                           // 421
        setters: [],                                                                                                   // 422
        execute: function () {                                                                                         // 423
            canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);         // 424
                                                                                                                       // 425
            _export('default', {                                                                                       // 426
                                                                                                                       // 427
                canUseDOM: canUseDOM,                                                                                  // 428
                                                                                                                       // 429
                canUseWorkers: typeof Worker !== 'undefined',                                                          // 430
                                                                                                                       // 431
                canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),                  // 432
                                                                                                                       // 433
                canUseViewport: canUseDOM && !!window.screen                                                           // 434
                                                                                                                       // 435
            });                                                                                                        // 436
        }                                                                                                              // 437
    };                                                                                                                 // 438
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 440
}).call(this);                                                                                                         // 441
                                                                                                                       // 442
                                                                                                                       // 443
                                                                                                                       // 444
                                                                                                                       // 445
                                                                                                                       // 446
                                                                                                                       // 447
(function () {                                                                                                         // 448
                                                                                                                       // 449
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/json2mq.import.jsx.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/json2mq', ['./string-convert'], function (_export) {                          // 456
    var stringConvert, camel2hyphen, isDimension, obj2mq;                                                              // 457
    return {                                                                                                           // 458
        setters: [function (_stringConvert) {                                                                          // 459
            stringConvert = _stringConvert['default'];                                                                 // 460
        }],                                                                                                            // 461
        execute: function () {                                                                                         // 462
            camel2hyphen = stringConvert.camel2hyphen;                                                                 // 463
                                                                                                                       // 464
            isDimension = function (feature) {                                                                         // 465
                var re = /[height|width]$/;                                                                            // 466
                return re.test(feature);                                                                               // 467
            };                                                                                                         // 468
                                                                                                                       // 469
            obj2mq = function (obj) {                                                                                  // 470
                var mq = '';                                                                                           // 471
                var features = Object.keys(obj);                                                                       // 472
                features.forEach(function (feature, index) {                                                           // 473
                    var value = obj[feature];                                                                          // 474
                    feature = camel2hyphen(feature);                                                                   // 475
                    // Add px to dimension features                                                                    // 476
                    if (isDimension(feature) && typeof value === 'number') {                                           // 477
                        value = value + 'px';                                                                          // 478
                    }                                                                                                  // 479
                    if (value === true) {                                                                              // 480
                        mq += feature;                                                                                 // 481
                    } else if (value === false) {                                                                      // 482
                        mq += 'not ' + feature;                                                                        // 483
                    } else {                                                                                           // 484
                        mq += '(' + feature + ': ' + value + ')';                                                      // 485
                    }                                                                                                  // 486
                    if (index < features.length - 1) {                                                                 // 487
                        mq += ' and ';                                                                                 // 488
                    }                                                                                                  // 489
                });                                                                                                    // 490
                return mq;                                                                                             // 491
            };                                                                                                         // 492
                                                                                                                       // 493
            _export('default', function (query) {                                                                      // 494
                var mq = '';                                                                                           // 495
                if (typeof query === 'string') {                                                                       // 496
                    return query;                                                                                      // 497
                }                                                                                                      // 498
                // Handling array of media queries                                                                     // 499
                if (query instanceof Array) {                                                                          // 500
                    query.forEach(function (q, index) {                                                                // 501
                        mq += obj2mq(q);                                                                               // 502
                        if (index < query.length - 1) {                                                                // 503
                            mq += ', ';                                                                                // 504
                        }                                                                                              // 505
                    });                                                                                                // 506
                    return mq;                                                                                         // 507
                }                                                                                                      // 508
                // Handling single media query                                                                         // 509
                return obj2mq(query);                                                                                  // 510
            });                                                                                                        // 511
                                                                                                                       // 512
            ;                                                                                                          // 513
        }                                                                                                              // 514
    };                                                                                                                 // 515
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 517
}).call(this);                                                                                                         // 518
                                                                                                                       // 519
                                                                                                                       // 520
                                                                                                                       // 521
                                                                                                                       // 522
                                                                                                                       // 523
                                                                                                                       // 524
(function () {                                                                                                         // 525
                                                                                                                       // 526
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/object-assign.import.jsx.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/object-assign', [], function (_export) {                                      // 533
    var hasOwnProperty, propIsEnumerable;                                                                              // 534
                                                                                                                       // 535
    function toObject(val) {                                                                                           // 536
        if (val === null || val === undefined) {                                                                       // 537
            throw new TypeError('Object.assign cannot be called with null or undefined');                              // 538
        }                                                                                                              // 539
                                                                                                                       // 540
        return Object(val);                                                                                            // 541
    }                                                                                                                  // 542
                                                                                                                       // 543
    return {                                                                                                           // 544
        setters: [],                                                                                                   // 545
        execute: function () {                                                                                         // 546
            hasOwnProperty = Object.prototype.hasOwnProperty;                                                          // 547
            propIsEnumerable = Object.prototype.propertyIsEnumerable;                                                  // 548
                                                                                                                       // 549
            _export('default', Object.assign || function (target, source) {                                            // 550
                var from;                                                                                              // 551
                var to = toObject(target);                                                                             // 552
                var symbols;                                                                                           // 553
                                                                                                                       // 554
                for (var s = 1; s < arguments.length; s++) {                                                           // 555
                    from = Object(arguments[s]);                                                                       // 556
                                                                                                                       // 557
                    for (var key in from) {                                                                            // 558
                        if (hasOwnProperty.call(from, key)) {                                                          // 559
                            to[key] = from[key];                                                                       // 560
                        }                                                                                              // 561
                    }                                                                                                  // 562
                                                                                                                       // 563
                    if (Object.getOwnPropertySymbols) {                                                                // 564
                        symbols = Object.getOwnPropertySymbols(from);                                                  // 565
                        for (var i = 0; i < symbols.length; i++) {                                                     // 566
                            if (propIsEnumerable.call(from, symbols[i])) {                                             // 567
                                to[symbols[i]] = from[symbols[i]];                                                     // 568
                            }                                                                                          // 569
                        }                                                                                              // 570
                    }                                                                                                  // 571
                }                                                                                                      // 572
                                                                                                                       // 573
                return to;                                                                                             // 574
            });                                                                                                        // 575
        }                                                                                                              // 576
    };                                                                                                                 // 577
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 579
}).call(this);                                                                                                         // 580
                                                                                                                       // 581
                                                                                                                       // 582
                                                                                                                       // 583
                                                                                                                       // 584
                                                                                                                       // 585
                                                                                                                       // 586
(function () {                                                                                                         // 587
                                                                                                                       // 588
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/react-clonewithprops.import.jsx.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/react-clonewithprops', [], function (_export) {                               // 595
    var hasOwn, version, RESERVED;                                                                                     // 596
                                                                                                                       // 597
    _export('default', cloneWithProps);                                                                                // 598
                                                                                                                       // 599
    function cloneWithProps(child, props) {                                                                            // 600
        var newProps = mergeProps(props, child.props);                                                                 // 601
                                                                                                                       // 602
        if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children')) newProps.children = child.props.children;
                                                                                                                       // 604
        // < 0.11                                                                                                      // 605
        if (version[0] === 0 && version[1] < 11) return child.constructor.ConvenienceConstructor(newProps);            // 606
                                                                                                                       // 607
        // 0.11                                                                                                        // 608
        if (version[0] === 0 && version[1] === 11) return child.constructor(newProps);                                 // 609
                                                                                                                       // 610
        // 0.12                                                                                                        // 611
        else if (version[0] === 0 && version[1] === 12) {                                                              // 612
                MockLegacyFactory.isReactLegacyFactory = true;                                                         // 613
                MockLegacyFactory.type = child.type;                                                                   // 614
                return React.createElement(MockLegacyFactory, newProps);                                               // 615
            }                                                                                                          // 616
                                                                                                                       // 617
        // 0.13+                                                                                                       // 618
        return React.createElement(child.type, newProps);                                                              // 619
                                                                                                                       // 620
        function MockLegacyFactory() {}                                                                                // 621
    }                                                                                                                  // 622
                                                                                                                       // 623
    function mergeProps(currentProps, childProps) {                                                                    // 624
        var newProps = extend(currentProps),                                                                           // 625
            key;                                                                                                       // 626
                                                                                                                       // 627
        for (key in childProps) {                                                                                      // 628
            if (hasOwn.call(RESERVED, key)) RESERVED[key](newProps, childProps[key], key);else if (!hasOwn.call(newProps, key)) newProps[key] = childProps[key];
        }                                                                                                              // 630
        return newProps;                                                                                               // 631
    }                                                                                                                  // 632
                                                                                                                       // 633
    function resolve(fn) {                                                                                             // 634
        return function (src, value, key) {                                                                            // 635
            if (!hasOwn.call(src, key)) src[key] = value;else src[key] = fn(src[key], value);                          // 636
        };                                                                                                             // 637
    }                                                                                                                  // 638
                                                                                                                       // 639
    function joinClasses(a, b) {                                                                                       // 640
        if (!a) return b || '';                                                                                        // 641
        return a + (b ? ' ' + b : '');                                                                                 // 642
    }                                                                                                                  // 643
                                                                                                                       // 644
    function extend() {                                                                                                // 645
        var target = {};                                                                                               // 646
        for (var i = 0; i < arguments.length; i++) for (var key in arguments[i]) if (hasOwn.call(arguments[i], key)) target[key] = arguments[i][key];
        return target;                                                                                                 // 648
    }                                                                                                                  // 649
    return {                                                                                                           // 650
        setters: [],                                                                                                   // 651
        execute: function () {                                                                                         // 652
            hasOwn = Object.prototype.hasOwnProperty;                                                                  // 653
            version = React.version.split('.').map(parseFloat);                                                        // 654
            RESERVED = {                                                                                               // 655
                className: resolve(joinClasses),                                                                       // 656
                children: function () {},                                                                              // 657
                key: function () {},                                                                                   // 658
                ref: function () {},                                                                                   // 659
                style: resolve(extend)                                                                                 // 660
            };                                                                                                         // 661
        }                                                                                                              // 662
    };                                                                                                                 // 663
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 665
}).call(this);                                                                                                         // 666
                                                                                                                       // 667
                                                                                                                       // 668
                                                                                                                       // 669
                                                                                                                       // 670
                                                                                                                       // 671
                                                                                                                       // 672
(function () {                                                                                                         // 673
                                                                                                                       // 674
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/react-transition-events.import.jsx.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/react-transition-events', ['./execution-environment'], function (_export) {   // 681
    var ExecutionEnvironment, EVENT_NAME_MAP, endEvents, ReactTransitionEvents;                                        // 682
                                                                                                                       // 683
    function detectEvents() {                                                                                          // 684
        var testEl = document.createElement('div');                                                                    // 685
        var style = testEl.style;                                                                                      // 686
                                                                                                                       // 687
        // On some platforms, in particular some releases of Android 4.x,                                              // 688
        // the un-prefixed "animation" and "transition" properties are defined on the                                  // 689
        // style object but the events that fire will still be prefixed, so we need                                    // 690
        // to check if the un-prefixed events are useable, and if not remove them                                      // 691
        // from the map                                                                                                // 692
        if (!('AnimationEvent' in window)) {                                                                           // 693
            delete EVENT_NAME_MAP.animationend.animation;                                                              // 694
        }                                                                                                              // 695
                                                                                                                       // 696
        if (!('TransitionEvent' in window)) {                                                                          // 697
            delete EVENT_NAME_MAP.transitionend.transition;                                                            // 698
        }                                                                                                              // 699
                                                                                                                       // 700
        for (var baseEventName in EVENT_NAME_MAP) {                                                                    // 701
            var baseEvents = EVENT_NAME_MAP[baseEventName];                                                            // 702
            for (var styleName in baseEvents) {                                                                        // 703
                if (styleName in style) {                                                                              // 704
                    endEvents.push(baseEvents[styleName]);                                                             // 705
                    break;                                                                                             // 706
                }                                                                                                      // 707
            }                                                                                                          // 708
        }                                                                                                              // 709
    }                                                                                                                  // 710
                                                                                                                       // 711
    // We use the raw {add|remove}EventListener() call because EventListener                                           // 712
    // does not know how to remove event listeners and we really should                                                // 713
    // clean up. Also, these events are not triggered in older browsers                                                // 714
    // so we should be A-OK here.                                                                                      // 715
                                                                                                                       // 716
    function addEventListener(node, eventName, eventListener) {                                                        // 717
        node.addEventListener(eventName, eventListener, false);                                                        // 718
    }                                                                                                                  // 719
                                                                                                                       // 720
    function removeEventListener(node, eventName, eventListener) {                                                     // 721
        node.removeEventListener(eventName, eventListener, false);                                                     // 722
    }                                                                                                                  // 723
                                                                                                                       // 724
    return {                                                                                                           // 725
        setters: [function (_executionEnvironment) {                                                                   // 726
            ExecutionEnvironment = _executionEnvironment['default'];                                                   // 727
        }],                                                                                                            // 728
        execute: function () {                                                                                         // 729
            /**                                                                                                        // 730
             * Copyright 2013-2015, Facebook, Inc.                                                                     // 731
             * All rights reserved.                                                                                    // 732
             *                                                                                                         // 733
             * This source code is licensed under the BSD-style license found in the                                   // 734
             * LICENSE file in the root directory of this source tree. An additional grant                             // 735
             * of patent rights can be found in the PATENTS file in the same directory.                                // 736
             *                                                                                                         // 737
             * @providesModule ReactTransitionEvents                                                                   // 738
             */                                                                                                        // 739
                                                                                                                       // 740
            /**                                                                                                        // 741
             * EVENT_NAME_MAP is used to determine which event fired when a                                            // 742
             * transition/animation ends, based on the style property used to                                          // 743
             * define that event.                                                                                      // 744
             */                                                                                                        // 745
            EVENT_NAME_MAP = {                                                                                         // 746
                transitionend: {                                                                                       // 747
                    'transition': 'transitionend',                                                                     // 748
                    'WebkitTransition': 'webkitTransitionEnd',                                                         // 749
                    'MozTransition': 'mozTransitionEnd',                                                               // 750
                    'OTransition': 'oTransitionEnd',                                                                   // 751
                    'msTransition': 'MSTransitionEnd'                                                                  // 752
                },                                                                                                     // 753
                                                                                                                       // 754
                animationend: {                                                                                        // 755
                    'animation': 'animationend',                                                                       // 756
                    'WebkitAnimation': 'webkitAnimationEnd',                                                           // 757
                    'MozAnimation': 'mozAnimationEnd',                                                                 // 758
                    'OAnimation': 'oAnimationEnd',                                                                     // 759
                    'msAnimation': 'MSAnimationEnd'                                                                    // 760
                }                                                                                                      // 761
            };                                                                                                         // 762
            endEvents = [];                                                                                            // 763
            if (ExecutionEnvironment.canUseDOM) {                                                                      // 764
                detectEvents();                                                                                        // 765
            }ReactTransitionEvents = {                                                                                 // 766
                addEndEventListener: function (node, eventListener) {                                                  // 767
                    if (endEvents.length === 0) {                                                                      // 768
                        // If CSS transitions are not supported, trigger an "end animation"                            // 769
                        // event immediately.                                                                          // 770
                        window.setTimeout(eventListener, 0);                                                           // 771
                        return;                                                                                        // 772
                    }                                                                                                  // 773
                    endEvents.forEach(function (endEvent) {                                                            // 774
                        addEventListener(node, endEvent, eventListener);                                               // 775
                    });                                                                                                // 776
                },                                                                                                     // 777
                                                                                                                       // 778
                removeEndEventListener: function (node, eventListener) {                                               // 779
                    if (endEvents.length === 0) {                                                                      // 780
                        return;                                                                                        // 781
                    }                                                                                                  // 782
                    endEvents.forEach(function (endEvent) {                                                            // 783
                        removeEventListener(node, endEvent, eventListener);                                            // 784
                    });                                                                                                // 785
                }                                                                                                      // 786
            };                                                                                                         // 787
                                                                                                                       // 788
            _export('default', ReactTransitionEvents);                                                                 // 789
        }                                                                                                              // 790
    };                                                                                                                 // 791
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 793
}).call(this);                                                                                                         // 794
                                                                                                                       // 795
                                                                                                                       // 796
                                                                                                                       // 797
                                                                                                                       // 798
                                                                                                                       // 799
                                                                                                                       // 800
(function () {                                                                                                         // 801
                                                                                                                       // 802
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/lib/string-convert.import.jsx.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/lib/string-convert', [], function (_export) {                                     // 809
    return {                                                                                                           // 810
        setters: [],                                                                                                   // 811
        execute: function () {                                                                                         // 812
            _export('default', {                                                                                       // 813
                hyphen2camel: function (str) {                                                                         // 814
                    return str.toLowerCase().replace(/-[a-z]/g, function (match) {                                     // 815
                        return match.slice(1).toUpperCase();                                                           // 816
                    });                                                                                                // 817
                }, camel2hyphen: function (str) {                                                                      // 818
                    return str.replace(/[A-Z]/g, function (match) {                                                    // 819
                        return '-' + match.toLowerCase();                                                              // 820
                    }).toLowerCase();                                                                                  // 821
                } });                                                                                                  // 822
        }                                                                                                              // 823
    };                                                                                                                 // 824
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 826
}).call(this);                                                                                                         // 827
                                                                                                                       // 828
                                                                                                                       // 829
                                                                                                                       // 830
                                                                                                                       // 831
                                                                                                                       // 832
                                                                                                                       // 833
(function () {                                                                                                         // 834
                                                                                                                       // 835
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/arrows.import.jsx.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/components/arrows', ['../lib/classnames'], function (_export) {                   // 842
    var classnames, PrevArrow, NextArrow;                                                                              // 843
    return {                                                                                                           // 844
        setters: [function (_libClassnames) {                                                                          // 845
            classnames = _libClassnames['default'];                                                                    // 846
        }],                                                                                                            // 847
        execute: function () {                                                                                         // 848
            PrevArrow = React.createClass({                                                                            // 849
                                                                                                                       // 850
                clickHandler: function (options, e) {                                                                  // 851
                    e.preventDefault();                                                                                // 852
                    this.props.clickHandler(options, e);                                                               // 853
                },                                                                                                     // 854
                render: function () {                                                                                  // 855
                    var prevClasses = { 'slick-prev': true, ui: true, icon: true, chevron: true, left: true };         // 856
                    var prevHandler = this.clickHandler.bind(this, { message: 'previous' });                           // 857
                                                                                                                       // 858
                    if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
                        prevClasses['slick-disabled'] = true;                                                          // 860
                        prevHandler = null;                                                                            // 861
                    }                                                                                                  // 862
                                                                                                                       // 863
                    var prevArrowProps = {                                                                             // 864
                        key: '0',                                                                                      // 865
                        ref: 'previous',                                                                               // 866
                        'data-role': 'none',                                                                           // 867
                        className: classnames(prevClasses),                                                            // 868
                        style: { display: 'block' },                                                                   // 869
                        onClick: prevHandler                                                                           // 870
                    };                                                                                                 // 871
                    var prevArrow;                                                                                     // 872
                                                                                                                       // 873
                    if (this.props.prevArrow) {                                                                        // 874
                        prevArrow = React.createElement(this.props.prevArrow, prevArrowProps);                         // 875
                    } else {                                                                                           // 876
                        prevArrow = React.createElement('i', babelHelpers._extends({ key: '0' }, prevArrowProps));     // 877
                    }                                                                                                  // 878
                                                                                                                       // 879
                    return prevArrow;                                                                                  // 880
                }                                                                                                      // 881
            });                                                                                                        // 882
                                                                                                                       // 883
            _export('PrevArrow', PrevArrow);                                                                           // 884
                                                                                                                       // 885
            NextArrow = React.createClass({                                                                            // 886
                clickHandler: function (options, e) {                                                                  // 887
                    e.preventDefault();                                                                                // 888
                    this.props.clickHandler(options, e);                                                               // 889
                },                                                                                                     // 890
                render: function () {                                                                                  // 891
                    var nextClasses = { 'slick-next': true, ui: true, icon: true, chevron: true, right: true };        // 892
                    var nextHandler = this.clickHandler.bind(this, { message: 'next' });                               // 893
                                                                                                                       // 894
                    if (!this.props.infinite) {                                                                        // 895
                        if (this.props.centerMode && this.props.currentSlide >= this.props.slideCount - 1) {           // 896
                            nextClasses['slick-disabled'] = true;                                                      // 897
                            nextHandler = null;                                                                        // 898
                        } else {                                                                                       // 899
                            if (this.props.currentSlide >= this.props.slideCount - this.props.slidesToShow) {          // 900
                                nextClasses['slick-disabled'] = true;                                                  // 901
                                nextHandler = null;                                                                    // 902
                            }                                                                                          // 903
                        }                                                                                              // 904
                                                                                                                       // 905
                        if (this.props.slideCount <= this.props.slidesToShow) {                                        // 906
                            nextClasses['slick-disabled'] = true;                                                      // 907
                            nextHandler = null;                                                                        // 908
                        }                                                                                              // 909
                    }                                                                                                  // 910
                                                                                                                       // 911
                    var nextArrowProps = {                                                                             // 912
                        key: '1',                                                                                      // 913
                        ref: 'next',                                                                                   // 914
                        'data-role': 'none',                                                                           // 915
                        className: classnames(nextClasses),                                                            // 916
                        style: { display: 'block' },                                                                   // 917
                        onClick: nextHandler                                                                           // 918
                    };                                                                                                 // 919
                                                                                                                       // 920
                    var nextArrow;                                                                                     // 921
                                                                                                                       // 922
                    if (this.props.nextArrow) {                                                                        // 923
                        nextArrow = React.createElement(this.props.nextArrow, nextArrowProps);                         // 924
                    } else {                                                                                           // 925
                        nextArrow = React.createElement('i', babelHelpers._extends({ key: '1' }, nextArrowProps));     // 926
                    }                                                                                                  // 927
                                                                                                                       // 928
                    return nextArrow;                                                                                  // 929
                }                                                                                                      // 930
            });                                                                                                        // 931
                                                                                                                       // 932
            _export('NextArrow', NextArrow);                                                                           // 933
        }                                                                                                              // 934
    };                                                                                                                 // 935
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 937
}).call(this);                                                                                                         // 938
                                                                                                                       // 939
                                                                                                                       // 940
                                                                                                                       // 941
                                                                                                                       // 942
                                                                                                                       // 943
                                                                                                                       // 944
(function () {                                                                                                         // 945
                                                                                                                       // 946
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/default-props.import.jsx.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/components/default-props', [], function (_export) {                               // 953
    return {                                                                                                           // 954
        setters: [],                                                                                                   // 955
        execute: function () {                                                                                         // 956
            _export('default', {                                                                                       // 957
                className: '',                                                                                         // 958
                // accessibility: true,                                                                                // 959
                adaptiveHeight: false,                                                                                 // 960
                arrows: true,                                                                                          // 961
                autoplay: false,                                                                                       // 962
                autoplaySpeed: 3000,                                                                                   // 963
                centerMode: false,                                                                                     // 964
                centerPadding: '50px',                                                                                 // 965
                cssEase: 'ease',                                                                                       // 966
                dots: false,                                                                                           // 967
                dotsClass: 'slick-dots',                                                                               // 968
                draggable: true,                                                                                       // 969
                easing: 'linear',                                                                                      // 970
                edgeFriction: 0.35,                                                                                    // 971
                fade: false,                                                                                           // 972
                focusOnSelect: false,                                                                                  // 973
                infinite: true,                                                                                        // 974
                initialSlide: 0,                                                                                       // 975
                lazyLoad: false,                                                                                       // 976
                responsive: null,                                                                                      // 977
                rtl: false,                                                                                            // 978
                slide: 'div',                                                                                          // 979
                slidesToShow: 1,                                                                                       // 980
                slidesToScroll: 1,                                                                                     // 981
                speed: 500,                                                                                            // 982
                swipe: true,                                                                                           // 983
                swipeToSlide: false,                                                                                   // 984
                touchMove: true,                                                                                       // 985
                touchThreshold: 5,                                                                                     // 986
                useCSS: true,                                                                                          // 987
                variableWidth: false,                                                                                  // 988
                vertical: false,                                                                                       // 989
                // waitForAnimate: true,                                                                               // 990
                afterChange: null,                                                                                     // 991
                beforeChange: null,                                                                                    // 992
                edgeEvent: null,                                                                                       // 993
                init: null,                                                                                            // 994
                swipeEvent: null,                                                                                      // 995
                // nextArrow, prevArrow are react componets                                                            // 996
                nextArrow: null,                                                                                       // 997
                prevArrow: null                                                                                        // 998
            });                                                                                                        // 999
        }                                                                                                              // 1000
    };                                                                                                                 // 1001
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1003
}).call(this);                                                                                                         // 1004
                                                                                                                       // 1005
                                                                                                                       // 1006
                                                                                                                       // 1007
                                                                                                                       // 1008
                                                                                                                       // 1009
                                                                                                                       // 1010
(function () {                                                                                                         // 1011
                                                                                                                       // 1012
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/dots.import.jsx.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/components/dots', ['../lib/classnames'], function (_export) {                     // 1019
    var classnames, getDotCount, Dots;                                                                                 // 1020
    return {                                                                                                           // 1021
        setters: [function (_libClassnames) {                                                                          // 1022
            classnames = _libClassnames['default'];                                                                    // 1023
        }],                                                                                                            // 1024
        execute: function () {                                                                                         // 1025
            getDotCount = function (spec) {                                                                            // 1026
                var dots;                                                                                              // 1027
                dots = Math.ceil(spec.slideCount / spec.slidesToScroll);                                               // 1028
                return dots;                                                                                           // 1029
            };                                                                                                         // 1030
                                                                                                                       // 1031
            Dots = React.createClass({                                                                                 // 1032
                                                                                                                       // 1033
                clickHandler: function (options, e) {                                                                  // 1034
                    // In Autoplay the focus stays on clicked button even after transition                             // 1035
                    // to next slide. That only goes away by click somewhere outside                                   // 1036
                    e.preventDefault();                                                                                // 1037
                    this.props.clickHandler(options);                                                                  // 1038
                },                                                                                                     // 1039
                render: function () {                                                                                  // 1040
                    var _this = this;                                                                                  // 1041
                                                                                                                       // 1042
                    var dotCount = getDotCount({                                                                       // 1043
                        slideCount: this.props.slideCount,                                                             // 1044
                        slidesToScroll: this.props.slidesToScroll                                                      // 1045
                    });                                                                                                // 1046
                                                                                                                       // 1047
                    var dots = Array.apply(null, { length: dotCount }).map(function (x, i) {                           // 1048
                                                                                                                       // 1049
                        var className = classnames({                                                                   // 1050
                            'slick-active': _this.props.currentSlide === i * _this.props.slidesToScroll                // 1051
                        });                                                                                            // 1052
                                                                                                                       // 1053
                        var dotOptions = {                                                                             // 1054
                            message: 'dots',                                                                           // 1055
                            index: i,                                                                                  // 1056
                            slidesToScroll: _this.props.slidesToScroll,                                                // 1057
                            currentSlide: _this.props.currentSlide                                                     // 1058
                        };                                                                                             // 1059
                                                                                                                       // 1060
                        return React.createElement(                                                                    // 1061
                            'li',                                                                                      // 1062
                            { key: i, className: className },                                                          // 1063
                            React.createElement(                                                                       // 1064
                                'button',                                                                              // 1065
                                { onClick: _this.clickHandler.bind(_this, dotOptions) },                               // 1066
                                i                                                                                      // 1067
                            )                                                                                          // 1068
                        );                                                                                             // 1069
                    });                                                                                                // 1070
                                                                                                                       // 1071
                    return React.createElement(                                                                        // 1072
                        'ul',                                                                                          // 1073
                        { className: this.props.dotsClass, style: { display: 'block' } },                              // 1074
                        dots                                                                                           // 1075
                    );                                                                                                 // 1076
                }                                                                                                      // 1077
            });                                                                                                        // 1078
                                                                                                                       // 1079
            _export('Dots', Dots);                                                                                     // 1080
        }                                                                                                              // 1081
    };                                                                                                                 // 1082
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1084
}).call(this);                                                                                                         // 1085
                                                                                                                       // 1086
                                                                                                                       // 1087
                                                                                                                       // 1088
                                                                                                                       // 1089
                                                                                                                       // 1090
                                                                                                                       // 1091
(function () {                                                                                                         // 1092
                                                                                                                       // 1093
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/initial-state.import.jsx.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register("{universe:carousel}/components/initial-state", [], function (_export) {                               // 1100
    return {                                                                                                           // 1101
        setters: [],                                                                                                   // 1102
        execute: function () {                                                                                         // 1103
            _export("default", {                                                                                       // 1104
                animating: false,                                                                                      // 1105
                dragging: false,                                                                                       // 1106
                autoPlayTimer: null,                                                                                   // 1107
                currentDirection: 0,                                                                                   // 1108
                currentLeft: null,                                                                                     // 1109
                currentSlide: 0,                                                                                       // 1110
                direction: 1,                                                                                          // 1111
                // listWidth: null,                                                                                    // 1112
                // listHeight: null,                                                                                   // 1113
                // loadIndex: 0,                                                                                       // 1114
                slideCount: null,                                                                                      // 1115
                slideWidth: null,                                                                                      // 1116
                // sliding: false,                                                                                     // 1117
                // slideOffset: 0,                                                                                     // 1118
                swipeLeft: null,                                                                                       // 1119
                touchObject: {                                                                                         // 1120
                    startX: 0,                                                                                         // 1121
                    startY: 0,                                                                                         // 1122
                    curX: 0,                                                                                           // 1123
                    curY: 0                                                                                            // 1124
                },                                                                                                     // 1125
                                                                                                                       // 1126
                lazyLoadedList: [],                                                                                    // 1127
                                                                                                                       // 1128
                // added for react                                                                                     // 1129
                initialized: false,                                                                                    // 1130
                edgeDragged: false,                                                                                    // 1131
                swiped: false, // used by swipeEvent. differentites between touch and swipe.                           // 1132
                trackStyle: {},                                                                                        // 1133
                trackWidth: 0                                                                                          // 1134
                                                                                                                       // 1135
                // Removed                                                                                             // 1136
                // transformsEnabled: false,                                                                           // 1137
                // $nextArrow: null,                                                                                   // 1138
                // $prevArrow: null,                                                                                   // 1139
                // $dots: null,                                                                                        // 1140
                // $list: null,                                                                                        // 1141
                // $slideTrack: null,                                                                                  // 1142
                // $slides: null,                                                                                      // 1143
            });                                                                                                        // 1144
        }                                                                                                              // 1145
    };                                                                                                                 // 1146
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1148
}).call(this);                                                                                                         // 1149
                                                                                                                       // 1150
                                                                                                                       // 1151
                                                                                                                       // 1152
                                                                                                                       // 1153
                                                                                                                       // 1154
                                                                                                                       // 1155
(function () {                                                                                                         // 1156
                                                                                                                       // 1157
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/inner-slider.import.jsx.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/components/inner-slider', ['../mixins/event-handlers', '../mixins/helpers', './initial-state', './default-props', '../lib/classnames', './track', './dots', './arrows'], function (_export) {
    var EventHandlersMixin, HelpersMixin, initialState, defaultProps, classnames, Track, Dots, PrevArrow, NextArrow, InnerSlider;
    return {                                                                                                           // 1166
        setters: [function (_mixinsEventHandlers) {                                                                    // 1167
            EventHandlersMixin = _mixinsEventHandlers['default'];                                                      // 1168
        }, function (_mixinsHelpers) {                                                                                 // 1169
            HelpersMixin = _mixinsHelpers['default'];                                                                  // 1170
        }, function (_initialState) {                                                                                  // 1171
            initialState = _initialState['default'];                                                                   // 1172
        }, function (_defaultProps) {                                                                                  // 1173
            defaultProps = _defaultProps['default'];                                                                   // 1174
        }, function (_libClassnames) {                                                                                 // 1175
            classnames = _libClassnames['default'];                                                                    // 1176
        }, function (_track) {                                                                                         // 1177
            Track = _track.Track;                                                                                      // 1178
        }, function (_dots) {                                                                                          // 1179
            Dots = _dots.Dots;                                                                                         // 1180
        }, function (_arrows) {                                                                                        // 1181
            PrevArrow = _arrows.PrevArrow;                                                                             // 1182
            NextArrow = _arrows.NextArrow;                                                                             // 1183
        }],                                                                                                            // 1184
        execute: function () {                                                                                         // 1185
            InnerSlider = React.createClass({                                                                          // 1186
                mixins: [HelpersMixin, EventHandlersMixin],                                                            // 1187
                getInitialState: function () {                                                                         // 1188
                    return initialState;                                                                               // 1189
                },                                                                                                     // 1190
                getDefaultProps: function () {                                                                         // 1191
                    return defaultProps;                                                                               // 1192
                },                                                                                                     // 1193
                componentWillMount: function () {                                                                      // 1194
                    if (this.props.init) {                                                                             // 1195
                        this.props.init();                                                                             // 1196
                    }                                                                                                  // 1197
                    this.setState({                                                                                    // 1198
                        mounted: true                                                                                  // 1199
                    });                                                                                                // 1200
                    var lazyLoadedList = [];                                                                           // 1201
                    for (var i = 0; i < this.props.children.length; i++) {                                             // 1202
                        if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {   // 1203
                            lazyLoadedList.push(i);                                                                    // 1204
                        }                                                                                              // 1205
                    }                                                                                                  // 1206
                                                                                                                       // 1207
                    if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {                               // 1208
                        this.setState({                                                                                // 1209
                            lazyLoadedList: lazyLoadedList                                                             // 1210
                        });                                                                                            // 1211
                    }                                                                                                  // 1212
                },                                                                                                     // 1213
                componentDidMount: function () {                                                                       // 1214
                    // Hack for autoplay -- Inspect Later                                                              // 1215
                    this.initialize(this.props);                                                                       // 1216
                    this.adaptHeight();                                                                                // 1217
                    window.addEventListener('resize', this.onWindowResized);                                           // 1218
                },                                                                                                     // 1219
                componentWillUnmount: function () {                                                                    // 1220
                    window.removeEventListener('resize', this.onWindowResized);                                        // 1221
                    if (this.state.autoPlayTimer) {                                                                    // 1222
                        window.clearTimeout(this.state.autoPlayTimer);                                                 // 1223
                    }                                                                                                  // 1224
                },                                                                                                     // 1225
                componentWillReceiveProps: function (nextProps) {                                                      // 1226
                    this.update(nextProps);                                                                            // 1227
                },                                                                                                     // 1228
                componentDidUpdate: function () {                                                                      // 1229
                    this.adaptHeight();                                                                                // 1230
                },                                                                                                     // 1231
                onWindowResized: function () {                                                                         // 1232
                    this.initialize(this.props);                                                                       // 1233
                },                                                                                                     // 1234
                render: function () {                                                                                  // 1235
                    var className = classnames('slick-initialized', 'slick-slider', this.props.className);             // 1236
                                                                                                                       // 1237
                    var trackProps = {                                                                                 // 1238
                        fade: this.props.fade,                                                                         // 1239
                        cssEase: this.props.cssEase,                                                                   // 1240
                        speed: this.props.speed,                                                                       // 1241
                        infinite: this.props.infinite,                                                                 // 1242
                        centerMode: this.props.centerMode,                                                             // 1243
                        currentSlide: this.state.currentSlide,                                                         // 1244
                        lazyLoad: this.props.lazyLoad,                                                                 // 1245
                        lazyLoadedList: this.state.lazyLoadedList,                                                     // 1246
                        rtl: this.props.rtl,                                                                           // 1247
                        slideWidth: this.state.slideWidth,                                                             // 1248
                        slidesToShow: this.props.slidesToShow,                                                         // 1249
                        slideCount: this.state.slideCount,                                                             // 1250
                        trackStyle: this.state.trackStyle,                                                             // 1251
                        variableWidth: this.props.variableWidth                                                        // 1252
                    };                                                                                                 // 1253
                                                                                                                       // 1254
                    var dots;                                                                                          // 1255
                                                                                                                       // 1256
                    if (this.props.dots === true && this.state.slideCount > this.props.slidesToShow) {                 // 1257
                        var dotProps = {                                                                               // 1258
                            dotsClass: this.props.dotsClass,                                                           // 1259
                            slideCount: this.state.slideCount,                                                         // 1260
                            slidesToShow: this.props.slidesToShow,                                                     // 1261
                            currentSlide: this.state.currentSlide,                                                     // 1262
                            slidesToScroll: this.props.slidesToScroll,                                                 // 1263
                            clickHandler: this.changeSlide                                                             // 1264
                        };                                                                                             // 1265
                                                                                                                       // 1266
                        dots = React.createElement(Dots, dotProps);                                                    // 1267
                    }                                                                                                  // 1268
                                                                                                                       // 1269
                    var prevArrow, nextArrow;                                                                          // 1270
                                                                                                                       // 1271
                    var arrowProps = {                                                                                 // 1272
                        infinite: this.props.infinite,                                                                 // 1273
                        centerMode: this.props.centerMode,                                                             // 1274
                        currentSlide: this.state.currentSlide,                                                         // 1275
                        slideCount: this.state.slideCount,                                                             // 1276
                        slidesToShow: this.props.slidesToShow,                                                         // 1277
                        prevArrow: this.props.prevArrow,                                                               // 1278
                        nextArrow: this.props.nextArrow,                                                               // 1279
                        clickHandler: this.changeSlide                                                                 // 1280
                    };                                                                                                 // 1281
                                                                                                                       // 1282
                    if (this.props.arrows) {                                                                           // 1283
                        prevArrow = React.createElement(PrevArrow, arrowProps);                                        // 1284
                        nextArrow = React.createElement(NextArrow, arrowProps);                                        // 1285
                    }                                                                                                  // 1286
                                                                                                                       // 1287
                    return React.createElement(                                                                        // 1288
                        'div',                                                                                         // 1289
                        { className: className },                                                                      // 1290
                        React.createElement(                                                                           // 1291
                            'div',                                                                                     // 1292
                            {                                                                                          // 1293
                                ref: 'list',                                                                           // 1294
                                className: "slick-list",                                                               // 1295
                                onMouseDown: this.swipeStart,                                                          // 1296
                                onMouseMove: this.state.dragging ? this.swipeMove : null,                              // 1297
                                onMouseUp: this.swipeEnd,                                                              // 1298
                                onMouseLeave: this.state.dragging ? this.swipeEnd : null,                              // 1299
                                onTouchStart: this.swipeStart,                                                         // 1300
                                onTouchMove: this.state.dragging ? this.swipeMove : null,                              // 1301
                                onTouchEnd: this.swipeEnd,                                                             // 1302
                                onTouchCancel: this.state.dragging ? this.swipeEnd : null },                           // 1303
                            React.createElement(                                                                       // 1304
                                Track,                                                                                 // 1305
                                babelHelpers._extends({ ref: 'track' }, trackProps),                                   // 1306
                                this.props.children                                                                    // 1307
                            )                                                                                          // 1308
                        ),                                                                                             // 1309
                        prevArrow,                                                                                     // 1310
                        nextArrow,                                                                                     // 1311
                        dots                                                                                           // 1312
                    );                                                                                                 // 1313
                }                                                                                                      // 1314
            });                                                                                                        // 1315
                                                                                                                       // 1316
            _export('InnerSlider', InnerSlider);                                                                       // 1317
        }                                                                                                              // 1318
    };                                                                                                                 // 1319
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1321
}).call(this);                                                                                                         // 1322
                                                                                                                       // 1323
                                                                                                                       // 1324
                                                                                                                       // 1325
                                                                                                                       // 1326
                                                                                                                       // 1327
                                                                                                                       // 1328
(function () {                                                                                                         // 1329
                                                                                                                       // 1330
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/slider.import.jsx.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/components/slider', ['./inner-slider', '../lib/object-assign', '../lib/json2mq', '../mixins/react-responsive', './default-props'], function (_export) {
    var InnerSlider, assign, json2mq, ResponsiveMixin, defaultProps;                                                   // 1338
    return {                                                                                                           // 1339
        setters: [function (_innerSlider) {                                                                            // 1340
            InnerSlider = _innerSlider.InnerSlider;                                                                    // 1341
        }, function (_libObjectAssign) {                                                                               // 1342
            assign = _libObjectAssign['default'];                                                                      // 1343
        }, function (_libJson2mq) {                                                                                    // 1344
            json2mq = _libJson2mq['default'];                                                                          // 1345
        }, function (_mixinsReactResponsive) {                                                                         // 1346
            ResponsiveMixin = _mixinsReactResponsive['default'];                                                       // 1347
        }, function (_defaultProps) {                                                                                  // 1348
            defaultProps = _defaultProps['default'];                                                                   // 1349
        }],                                                                                                            // 1350
        execute: function () {                                                                                         // 1351
            _export('default', React.createClass({                                                                     // 1352
                displayName: 'Slider',                                                                                 // 1353
                mixins: [ResponsiveMixin],                                                                             // 1354
                getInitialState: function () {                                                                         // 1355
                    return {                                                                                           // 1356
                        breakpoint: null                                                                               // 1357
                    };                                                                                                 // 1358
                },                                                                                                     // 1359
                componentDidMount: function () {                                                                       // 1360
                    var _this = this;                                                                                  // 1361
                                                                                                                       // 1362
                    if (this.props.responsive) {                                                                       // 1363
                        var breakpoints = this.props.responsive.map(function (breakpt) {                               // 1364
                            return breakpt.breakpoint;                                                                 // 1365
                        });                                                                                            // 1366
                        breakpoints.sort(function (x, y) {                                                             // 1367
                            return x - y;                                                                              // 1368
                        });                                                                                            // 1369
                                                                                                                       // 1370
                        breakpoints.forEach(function (breakpoint, index) {                                             // 1371
                            var bQuery;                                                                                // 1372
                            if (index === 0) {                                                                         // 1373
                                bQuery = json2mq({ minWidth: 0, maxWidth: breakpoint });                               // 1374
                            } else {                                                                                   // 1375
                                bQuery = json2mq({ minWidth: breakpoints[index - 1], maxWidth: breakpoint });          // 1376
                            }                                                                                          // 1377
                            _this.media(bQuery, function () {                                                          // 1378
                                _this.setState({ breakpoint: breakpoint });                                            // 1379
                            });                                                                                        // 1380
                        });                                                                                            // 1381
                                                                                                                       // 1382
                        // Register media query for full screen. Need to support resize from small to large            // 1383
                        var query = json2mq({ minWidth: breakpoints.slice(-1)[0] });                                   // 1384
                                                                                                                       // 1385
                        this.media(query, function () {                                                                // 1386
                            _this.setState({ breakpoint: null });                                                      // 1387
                        });                                                                                            // 1388
                    }                                                                                                  // 1389
                },                                                                                                     // 1390
                render: function () {                                                                                  // 1391
                    var _this2 = this;                                                                                 // 1392
                                                                                                                       // 1393
                    var settings;                                                                                      // 1394
                    var newProps;                                                                                      // 1395
                    if (this.state.breakpoint) {                                                                       // 1396
                        newProps = this.props.responsive.filter(function (resp) {                                      // 1397
                            return resp.breakpoint === _this2.state.breakpoint;                                        // 1398
                        });                                                                                            // 1399
                        settings = newProps[0].settings === 'unslick' ? 'unslick' : assign({}, this.props, newProps[0].settings);
                    } else {                                                                                           // 1401
                        settings = assign({}, defaultProps, this.props);                                               // 1402
                    }                                                                                                  // 1403
                    if (settings === 'unslick') {                                                                      // 1404
                        // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML   // 1405
                        return React.createElement(                                                                    // 1406
                            'div',                                                                                     // 1407
                            null,                                                                                      // 1408
                            this.props.children                                                                        // 1409
                        );                                                                                             // 1410
                    } else {                                                                                           // 1411
                        return React.createElement(                                                                    // 1412
                            InnerSlider,                                                                               // 1413
                            settings,                                                                                  // 1414
                            this.props.children                                                                        // 1415
                        );                                                                                             // 1416
                    }                                                                                                  // 1417
                }                                                                                                      // 1418
            }));                                                                                                       // 1419
        }                                                                                                              // 1420
    };                                                                                                                 // 1421
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1423
}).call(this);                                                                                                         // 1424
                                                                                                                       // 1425
                                                                                                                       // 1426
                                                                                                                       // 1427
                                                                                                                       // 1428
                                                                                                                       // 1429
                                                                                                                       // 1430
(function () {                                                                                                         // 1431
                                                                                                                       // 1432
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/components/track.import.jsx.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/components/track', ['../lib/react-clonewithprops', '../lib/object-assign', '../lib/classnames'], function (_export) {
    var cloneWithProps, assign, classnames, getSlideClasses, getSlideStyle, renderSlides, Track;                       // 1440
    return {                                                                                                           // 1441
        setters: [function (_libReactClonewithprops) {                                                                 // 1442
            cloneWithProps = _libReactClonewithprops['default'];                                                       // 1443
        }, function (_libObjectAssign) {                                                                               // 1444
            assign = _libObjectAssign['default'];                                                                      // 1445
        }, function (_libClassnames) {                                                                                 // 1446
            classnames = _libClassnames['default'];                                                                    // 1447
        }],                                                                                                            // 1448
        execute: function () {                                                                                         // 1449
            getSlideClasses = function (spec) {                                                                        // 1450
                var slickActive, slickCenter, slickCloned;                                                             // 1451
                var centerOffset, index;                                                                               // 1452
                                                                                                                       // 1453
                if (spec.rtl) {                                                                                        // 1454
                    index = spec.slideCount - 1 - spec.index;                                                          // 1455
                    console.log();                                                                                     // 1456
                } else {                                                                                               // 1457
                    index = spec.index;                                                                                // 1458
                }                                                                                                      // 1459
                                                                                                                       // 1460
                slickCloned = index < 0 || index >= spec.slideCount;                                                   // 1461
                if (spec.centerMode) {                                                                                 // 1462
                    centerOffset = Math.floor(spec.slidesToShow / 2);                                                  // 1463
                    slickCenter = spec.currentSlide === index;                                                         // 1464
                    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {   // 1465
                        slickActive = true;                                                                            // 1466
                    }                                                                                                  // 1467
                } else {                                                                                               // 1468
                    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;         // 1469
                }                                                                                                      // 1470
                return classnames({                                                                                    // 1471
                    'slick-slide': true,                                                                               // 1472
                    'slick-active': slickActive,                                                                       // 1473
                    'slick-center': slickCenter,                                                                       // 1474
                    'slick-cloned': slickCloned                                                                        // 1475
                });                                                                                                    // 1476
            };                                                                                                         // 1477
                                                                                                                       // 1478
            getSlideStyle = function (spec) {                                                                          // 1479
                var style = {};                                                                                        // 1480
                                                                                                                       // 1481
                if (spec.variableWidth === undefined || spec.variableWidth === false) {                                // 1482
                    style.width = spec.slideWidth;                                                                     // 1483
                }                                                                                                      // 1484
                                                                                                                       // 1485
                if (spec.fade) {                                                                                       // 1486
                    style.position = 'relative';                                                                       // 1487
                    style.left = -spec.index * spec.slideWidth;                                                        // 1488
                    style.opacity = spec.currentSlide === spec.index ? 1 : 0;                                          // 1489
                    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;                                 // 1490
                    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;                           // 1491
                }                                                                                                      // 1492
                                                                                                                       // 1493
                return style;                                                                                          // 1494
            };                                                                                                         // 1495
                                                                                                                       // 1496
            renderSlides = function (spec) {                                                                           // 1497
                var key;                                                                                               // 1498
                var slides = [];                                                                                       // 1499
                var preCloneSlides = [];                                                                               // 1500
                var postCloneSlides = [];                                                                              // 1501
                var count = React.Children.count(spec.children);                                                       // 1502
                var child;                                                                                             // 1503
                                                                                                                       // 1504
                React.Children.forEach(spec.children, function (elem, index) {                                         // 1505
                    if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {                 // 1506
                        child = elem;                                                                                  // 1507
                    } else {                                                                                           // 1508
                        child = React.createElement('div', null);                                                      // 1509
                    }                                                                                                  // 1510
                                                                                                                       // 1511
                    var childStyle = getSlideStyle(assign({}, spec, { index: index }));                                // 1512
                    slides.push(cloneWithProps(child, {                                                                // 1513
                        key: index,                                                                                    // 1514
                        'data-index': index,                                                                           // 1515
                        className: getSlideClasses(assign({ index: index }, spec)),                                    // 1516
                        style: childStyle                                                                              // 1517
                    }));                                                                                               // 1518
                                                                                                                       // 1519
                    // variableWidth doesn't wrap properly.                                                            // 1520
                    if (spec.infinite && spec.fade === false) {                                                        // 1521
                        var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;            // 1522
                                                                                                                       // 1523
                        if (index >= count - infiniteCount) {                                                          // 1524
                            key = -(count - index);                                                                    // 1525
                            preCloneSlides.push(cloneWithProps(child, {                                                // 1526
                                key: key,                                                                              // 1527
                                'data-index': key,                                                                     // 1528
                                className: getSlideClasses(assign({ index: key }, spec)),                              // 1529
                                style: childStyle                                                                      // 1530
                            }));                                                                                       // 1531
                        }                                                                                              // 1532
                                                                                                                       // 1533
                        if (index < infiniteCount) {                                                                   // 1534
                            key = count + index;                                                                       // 1535
                            postCloneSlides.push(cloneWithProps(child, {                                               // 1536
                                key: key,                                                                              // 1537
                                'data-index': key,                                                                     // 1538
                                className: getSlideClasses(assign({ index: key }, spec)),                              // 1539
                                style: childStyle                                                                      // 1540
                            }));                                                                                       // 1541
                        }                                                                                              // 1542
                    }                                                                                                  // 1543
                });                                                                                                    // 1544
                                                                                                                       // 1545
                if (spec.rtl) {                                                                                        // 1546
                    return preCloneSlides.concat(slides, postCloneSlides).reverse();                                   // 1547
                } else {                                                                                               // 1548
                    return preCloneSlides.concat(slides, postCloneSlides);                                             // 1549
                }                                                                                                      // 1550
            };                                                                                                         // 1551
                                                                                                                       // 1552
            Track = React.createClass({                                                                                // 1553
                render: function () {                                                                                  // 1554
                    var slides = renderSlides(this.props);                                                             // 1555
                    return React.createElement(                                                                        // 1556
                        'div',                                                                                         // 1557
                        { className: 'slick-track', style: this.props.trackStyle },                                    // 1558
                        slides                                                                                         // 1559
                    );                                                                                                 // 1560
                }                                                                                                      // 1561
            });                                                                                                        // 1562
                                                                                                                       // 1563
            _export('Track', Track);                                                                                   // 1564
        }                                                                                                              // 1565
    };                                                                                                                 // 1566
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1568
}).call(this);                                                                                                         // 1569
                                                                                                                       // 1570
                                                                                                                       // 1571
                                                                                                                       // 1572
                                                                                                                       // 1573
                                                                                                                       // 1574
                                                                                                                       // 1575
(function () {                                                                                                         // 1576
                                                                                                                       // 1577
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/mixins/event-handlers.import.jsx.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/mixins/event-handlers', ['./trackHelper', '../lib/object-assign'], function (_export) {
    var getTrackCSS, getTrackLeft, getTrackAnimateCSS, assign, EventHandlers;                                          // 1585
    return {                                                                                                           // 1586
        setters: [function (_trackHelper) {                                                                            // 1587
            getTrackCSS = _trackHelper.getTrackCSS;                                                                    // 1588
            getTrackLeft = _trackHelper.getTrackLeft;                                                                  // 1589
            getTrackAnimateCSS = _trackHelper.getTrackAnimateCSS;                                                      // 1590
        }, function (_libObjectAssign) {                                                                               // 1591
            assign = _libObjectAssign['default'];                                                                      // 1592
        }],                                                                                                            // 1593
        execute: function () {                                                                                         // 1594
            EventHandlers = {                                                                                          // 1595
                // Event handler for previous and next                                                                 // 1596
                changeSlide: function (options) {                                                                      // 1597
                    var indexOffset, slideOffset, unevenOffset, targetSlide;                                           // 1598
                    unevenOffset = this.state.slideCount % this.props.slidesToScroll !== 0;                            // 1599
                    indexOffset = unevenOffset ? 0 : (this.state.slideCount - this.state.currentSlide) % this.props.slidesToScroll;
                                                                                                                       // 1601
                    if (options.message === 'previous') {                                                              // 1602
                        slideOffset = indexOffset === 0 ? this.props.slidesToScroll : this.props.slidesToShow - indexOffset;
                        targetSlide = this.state.currentSlide - slideOffset;                                           // 1604
                    } else if (options.message === 'next') {                                                           // 1605
                        slideOffset = indexOffset === 0 ? this.props.slidesToScroll : indexOffset;                     // 1606
                        targetSlide = this.state.currentSlide + slideOffset;                                           // 1607
                    } else if (options.message === 'dots') {                                                           // 1608
                        // Click on dots                                                                               // 1609
                        targetSlide = options.index * options.slidesToScroll;                                          // 1610
                        if (targetSlide === options.currentSlide) {                                                    // 1611
                            return;                                                                                    // 1612
                        }                                                                                              // 1613
                    }                                                                                                  // 1614
                                                                                                                       // 1615
                    this.slideHandler(targetSlide);                                                                    // 1616
                },                                                                                                     // 1617
                // Accessiblity handler for previous and next                                                          // 1618
                keyHandler: function (e) {},                                                                           // 1619
                // Focus on selecting a slide (click handler on track)                                                 // 1620
                selectHandler: function (e) {},                                                                        // 1621
                swipeStart: function (e) {                                                                             // 1622
                    var touches, posX, posY;                                                                           // 1623
                                                                                                                       // 1624
                    if (this.props.swipe === false || 'ontouchend' in document && this.props.swipe === false) {        // 1625
                        return;                                                                                        // 1626
                    } else if (this.props.draggable === false && e.type.indexOf('mouse') !== -1) {                     // 1627
                        return;                                                                                        // 1628
                    }                                                                                                  // 1629
                    posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;                                   // 1630
                    posY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;                                   // 1631
                    this.setState({                                                                                    // 1632
                        dragging: true,                                                                                // 1633
                        touchObject: {                                                                                 // 1634
                            startX: posX,                                                                              // 1635
                            startY: posY,                                                                              // 1636
                            curX: posX,                                                                                // 1637
                            curY: posY                                                                                 // 1638
                        }                                                                                              // 1639
                    });                                                                                                // 1640
                },                                                                                                     // 1641
                swipeMove: function (e) {                                                                              // 1642
                    if (!this.state.dragging) {                                                                        // 1643
                        return;                                                                                        // 1644
                    }                                                                                                  // 1645
                    if (this.state.animating) {                                                                        // 1646
                        return;                                                                                        // 1647
                    }                                                                                                  // 1648
                    var swipeLeft;                                                                                     // 1649
                    var curLeft, positionOffset;                                                                       // 1650
                    var touchObject = this.state.touchObject;                                                          // 1651
                                                                                                                       // 1652
                    curLeft = getTrackLeft(assign({                                                                    // 1653
                        slideIndex: this.state.currentSlide,                                                           // 1654
                        trackRef: this.refs.track                                                                      // 1655
                    }, this.props, this.state));                                                                       // 1656
                    touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;                                     // 1657
                    touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;                                     // 1658
                    touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
                                                                                                                       // 1660
                    positionOffset = (this.props.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
                                                                                                                       // 1662
                    var currentSlide = this.state.currentSlide;                                                        // 1663
                    var dotCount = Math.ceil(this.state.slideCount / this.props.slidesToScroll);                       // 1664
                    var swipeDirection = this.swipeDirection(this.state.touchObject);                                  // 1665
                    var touchSwipeLength = touchObject.swipeLength;                                                    // 1666
                                                                                                                       // 1667
                    if (this.props.infinite === false) {                                                               // 1668
                        if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left') {
                            touchSwipeLength = touchObject.swipeLength * this.props.edgeFriction;                      // 1670
                                                                                                                       // 1671
                            if (this.state.edgeDragged === false && this.props.edgeEvent) {                            // 1672
                                this.props.edgeEvent(swipeDirection);                                                  // 1673
                                this.setState({ edgeDragged: true });                                                  // 1674
                            }                                                                                          // 1675
                        }                                                                                              // 1676
                    }                                                                                                  // 1677
                                                                                                                       // 1678
                    if (this.state.swiped === false && this.props.swipeEvent) {                                        // 1679
                        this.props.swipeEvent(swipeDirection);                                                         // 1680
                        this.setState({ swiped: true });                                                               // 1681
                    }                                                                                                  // 1682
                                                                                                                       // 1683
                    swipeLeft = curLeft + touchSwipeLength * positionOffset;                                           // 1684
                    this.setState({                                                                                    // 1685
                        touchObject: touchObject,                                                                      // 1686
                        swipeLeft: swipeLeft,                                                                          // 1687
                        trackStyle: getTrackCSS(assign({ left: swipeLeft }, this.props, this.state))                   // 1688
                    });                                                                                                // 1689
                                                                                                                       // 1690
                    if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
                        return;                                                                                        // 1692
                    }                                                                                                  // 1693
                    if (touchObject.swipeLength > 4) {                                                                 // 1694
                        e.preventDefault();                                                                            // 1695
                    }                                                                                                  // 1696
                },                                                                                                     // 1697
                swipeEnd: function (e) {                                                                               // 1698
                    if (!this.state.dragging) {                                                                        // 1699
                        return;                                                                                        // 1700
                    }                                                                                                  // 1701
                    var touchObject = this.state.touchObject;                                                          // 1702
                    var minSwipe = this.state.listWidth / this.props.touchThreshold;                                   // 1703
                    var swipeDirection = this.swipeDirection(touchObject);                                             // 1704
                                                                                                                       // 1705
                    // reset the state of touch related state variables.                                               // 1706
                    this.setState({                                                                                    // 1707
                        dragging: false,                                                                               // 1708
                        edgeDragged: false,                                                                            // 1709
                        swiped: false,                                                                                 // 1710
                        swipeLeft: null,                                                                               // 1711
                        touchObject: {}                                                                                // 1712
                    });                                                                                                // 1713
                    // Fix for #13                                                                                     // 1714
                    if (!touchObject.swipeLength) {                                                                    // 1715
                        return;                                                                                        // 1716
                    }                                                                                                  // 1717
                    if (touchObject.swipeLength > minSwipe) {                                                          // 1718
                        e.preventDefault();                                                                            // 1719
                        if (swipeDirection === 'left') {                                                               // 1720
                            this.slideHandler(this.state.currentSlide + this.props.slidesToScroll);                    // 1721
                        } else if (swipeDirection === 'right') {                                                       // 1722
                            this.slideHandler(this.state.currentSlide - this.props.slidesToScroll);                    // 1723
                        } else {                                                                                       // 1724
                            this.slideHandler(this.state.currentSlide);                                                // 1725
                        }                                                                                              // 1726
                    } else {                                                                                           // 1727
                        // Adjust the track back to it's original position.                                            // 1728
                        var currentLeft = getTrackLeft(assign({                                                        // 1729
                            slideIndex: this.state.currentSlide,                                                       // 1730
                            trackRef: this.refs.track                                                                  // 1731
                        }, this.props, this.state));                                                                   // 1732
                                                                                                                       // 1733
                        this.setState({                                                                                // 1734
                            trackStyle: getTrackAnimateCSS(assign({ left: currentLeft }, this.props, this.state))      // 1735
                        });                                                                                            // 1736
                    }                                                                                                  // 1737
                }                                                                                                      // 1738
            };                                                                                                         // 1739
                                                                                                                       // 1740
            _export('default', EventHandlers);                                                                         // 1741
        }                                                                                                              // 1742
    };                                                                                                                 // 1743
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1745
}).call(this);                                                                                                         // 1746
                                                                                                                       // 1747
                                                                                                                       // 1748
                                                                                                                       // 1749
                                                                                                                       // 1750
                                                                                                                       // 1751
                                                                                                                       // 1752
(function () {                                                                                                         // 1753
                                                                                                                       // 1754
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/mixins/helpers.import.jsx.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/mixins/helpers', ['../lib/react-transition-events', './trackHelper', '../lib/object-assign'], function (_export) {
    var ReactTransitionEvents, getTrackCSS, getTrackLeft, getTrackAnimateCSS, assign, helpers;                         // 1762
    return {                                                                                                           // 1763
        setters: [function (_libReactTransitionEvents) {                                                               // 1764
            ReactTransitionEvents = _libReactTransitionEvents['default'];                                              // 1765
        }, function (_trackHelper) {                                                                                   // 1766
            getTrackCSS = _trackHelper.getTrackCSS;                                                                    // 1767
            getTrackLeft = _trackHelper.getTrackLeft;                                                                  // 1768
            getTrackAnimateCSS = _trackHelper.getTrackAnimateCSS;                                                      // 1769
        }, function (_libObjectAssign) {                                                                               // 1770
            assign = _libObjectAssign['default'];                                                                      // 1771
        }],                                                                                                            // 1772
        execute: function () {                                                                                         // 1773
            helpers = {                                                                                                // 1774
                initialize: function (props) {                                                                         // 1775
                    var slideCount = React.Children.count(props.children);                                             // 1776
                    var listWidth = this.refs.list.getDOMNode().getBoundingClientRect().width;                         // 1777
                    var trackWidth = this.refs.track.getDOMNode().getBoundingClientRect().width;                       // 1778
                    var slideWidth = this.getDOMNode().getBoundingClientRect().width / props.slidesToShow;             // 1779
                                                                                                                       // 1780
                    var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;           // 1781
                                                                                                                       // 1782
                    this.setState({                                                                                    // 1783
                        slideCount: slideCount,                                                                        // 1784
                        slideWidth: slideWidth,                                                                        // 1785
                        listWidth: listWidth,                                                                          // 1786
                        trackWidth: trackWidth,                                                                        // 1787
                        currentSlide: currentSlide                                                                     // 1788
                                                                                                                       // 1789
                    }, function () {                                                                                   // 1790
                                                                                                                       // 1791
                        var targetLeft = getTrackLeft(assign({                                                         // 1792
                            slideIndex: this.state.currentSlide,                                                       // 1793
                            trackRef: this.refs.track                                                                  // 1794
                        }, props, this.state));                                                                        // 1795
                        // getCSS function needs previously set state                                                  // 1796
                        var trackStyle = getTrackCSS(assign({ left: targetLeft }, props, this.state));                 // 1797
                                                                                                                       // 1798
                        this.setState({ trackStyle: trackStyle });                                                     // 1799
                                                                                                                       // 1800
                        this.autoPlay(); // once we're set up, trigger the initial autoplay.                           // 1801
                    });                                                                                                // 1802
                },                                                                                                     // 1803
                update: function (props) {                                                                             // 1804
                    // This method has mostly same code as initialize method.                                          // 1805
                    // Refactor it                                                                                     // 1806
                    var slideCount = React.Children.count(props.children);                                             // 1807
                    var listWidth = this.refs.list.getDOMNode().getBoundingClientRect().width;                         // 1808
                    var trackWidth = this.refs.track.getDOMNode().getBoundingClientRect().width;                       // 1809
                    var slideWidth = this.getDOMNode().getBoundingClientRect().width / props.slidesToShow;             // 1810
                                                                                                                       // 1811
                    this.setState({                                                                                    // 1812
                        slideCount: slideCount,                                                                        // 1813
                        slideWidth: slideWidth,                                                                        // 1814
                        listWidth: listWidth,                                                                          // 1815
                        trackWidth: trackWidth                                                                         // 1816
                    }, function () {                                                                                   // 1817
                                                                                                                       // 1818
                        var targetLeft = getTrackLeft(assign({                                                         // 1819
                            slideIndex: this.state.currentSlide,                                                       // 1820
                            trackRef: this.refs.track                                                                  // 1821
                        }, props, this.state));                                                                        // 1822
                        // getCSS function needs previously set state                                                  // 1823
                        var trackStyle = getTrackCSS(assign({ left: targetLeft }, props, this.state));                 // 1824
                                                                                                                       // 1825
                        this.setState({ trackStyle: trackStyle });                                                     // 1826
                    });                                                                                                // 1827
                },                                                                                                     // 1828
                adaptHeight: function () {                                                                             // 1829
                    if (this.props.adaptiveHeight) {                                                                   // 1830
                        var selector = '[data-index="' + this.state.currentSlide + '"]';                               // 1831
                        if (this.refs.list) {                                                                          // 1832
                            var slickList = this.refs.list.getDOMNode();                                               // 1833
                            slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';            // 1834
                        }                                                                                              // 1835
                    }                                                                                                  // 1836
                },                                                                                                     // 1837
                slideHandler: function (index) {                                                                       // 1838
                    var _this = this;                                                                                  // 1839
                                                                                                                       // 1840
                    // Functionality of animateSlide and postSlide is merged into this function                        // 1841
                    // console.log('slideHandler', index);                                                             // 1842
                    var targetSlide, currentSlide;                                                                     // 1843
                    var targetLeft, currentLeft;                                                                       // 1844
                    var callback;                                                                                      // 1845
                                                                                                                       // 1846
                    if (this.state.animating === true || this.state.currentSlide === index) {                          // 1847
                        return;                                                                                        // 1848
                    }                                                                                                  // 1849
                                                                                                                       // 1850
                    if (this.props.fade) {                                                                             // 1851
                        currentSlide = this.state.currentSlide;                                                        // 1852
                                                                                                                       // 1853
                        if (this.props.beforeChange) {                                                                 // 1854
                            this.props.beforeChange(currentSlide);                                                     // 1855
                        }                                                                                              // 1856
                                                                                                                       // 1857
                        //  Shifting targetSlide back into the range                                                   // 1858
                        if (index < 0) {                                                                               // 1859
                            targetSlide = index + this.state.slideCount;                                               // 1860
                        } else if (index >= this.state.slideCount) {                                                   // 1861
                            targetSlide = index - this.state.slideCount;                                               // 1862
                        } else {                                                                                       // 1863
                            targetSlide = index;                                                                       // 1864
                        }                                                                                              // 1865
                                                                                                                       // 1866
                        if (this.props.lazyLoad && this.state.lazyLoadedList.indexOf(targetSlide) < 0) {               // 1867
                            this.setState({                                                                            // 1868
                                lazyLoadedList: this.state.lazyLoadedList.concat(targetSlide)                          // 1869
                            });                                                                                        // 1870
                        }                                                                                              // 1871
                                                                                                                       // 1872
                        callback = function () {                                                                       // 1873
                            _this.setState({                                                                           // 1874
                                animating: false                                                                       // 1875
                            });                                                                                        // 1876
                            if (_this.props.afterChange) {                                                             // 1877
                                _this.props.afterChange(currentSlide);                                                 // 1878
                            }                                                                                          // 1879
                            ReactTransitionEvents.removeEndEventListener(_this.refs.track.getDOMNode().children[currentSlide], callback);
                        };                                                                                             // 1881
                                                                                                                       // 1882
                        this.setState({                                                                                // 1883
                            animating: true,                                                                           // 1884
                            currentSlide: targetSlide                                                                  // 1885
                        }, function () {                                                                               // 1886
                            ReactTransitionEvents.addEndEventListener(this.refs.track.getDOMNode().children[currentSlide], callback);
                        });                                                                                            // 1888
                                                                                                                       // 1889
                        this.autoPlay();                                                                               // 1890
                        return;                                                                                        // 1891
                    }                                                                                                  // 1892
                                                                                                                       // 1893
                    targetSlide = index;                                                                               // 1894
                    if (targetSlide < 0) {                                                                             // 1895
                        if (this.props.infinite === false) {                                                           // 1896
                            currentSlide = 0;                                                                          // 1897
                        } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {                          // 1898
                            currentSlide = this.state.slideCount - this.state.slideCount % this.props.slidesToScroll;  // 1899
                        } else {                                                                                       // 1900
                            currentSlide = this.state.slideCount + targetSlide;                                        // 1901
                        }                                                                                              // 1902
                    } else if (targetSlide >= this.state.slideCount) {                                                 // 1903
                        if (this.props.infinite === false) {                                                           // 1904
                            currentSlide = this.state.slideCount - this.props.slidesToShow;                            // 1905
                        } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {                          // 1906
                            currentSlide = 0;                                                                          // 1907
                        } else {                                                                                       // 1908
                            currentSlide = targetSlide - this.state.slideCount;                                        // 1909
                        }                                                                                              // 1910
                    } else {                                                                                           // 1911
                        currentSlide = targetSlide;                                                                    // 1912
                    }                                                                                                  // 1913
                                                                                                                       // 1914
                    targetLeft = getTrackLeft(assign({                                                                 // 1915
                        slideIndex: targetSlide,                                                                       // 1916
                        trackRef: this.refs.track                                                                      // 1917
                    }, this.props, this.state));                                                                       // 1918
                                                                                                                       // 1919
                    currentLeft = getTrackLeft(assign({                                                                // 1920
                        slideIndex: currentSlide,                                                                      // 1921
                        trackRef: this.refs.track                                                                      // 1922
                    }, this.props, this.state));                                                                       // 1923
                                                                                                                       // 1924
                    if (this.props.infinite === false) {                                                               // 1925
                        targetLeft = currentLeft;                                                                      // 1926
                    }                                                                                                  // 1927
                                                                                                                       // 1928
                    if (this.props.beforeChange) {                                                                     // 1929
                        this.props.beforeChange(currentSlide);                                                         // 1930
                    }                                                                                                  // 1931
                                                                                                                       // 1932
                    if (this.props.lazyLoad) {                                                                         // 1933
                        var loaded = true;                                                                             // 1934
                        var slidesToLoad = [];                                                                         // 1935
                        for (var i = targetSlide; i < targetSlide + this.props.slidesToShow; i++) {                    // 1936
                            loaded = loaded && this.state.lazyLoadedList.indexOf(i) >= 0;                              // 1937
                            if (!loaded) {                                                                             // 1938
                                slidesToLoad.push(i);                                                                  // 1939
                            }                                                                                          // 1940
                        }                                                                                              // 1941
                        if (!loaded) {                                                                                 // 1942
                            this.setState({                                                                            // 1943
                                lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)                         // 1944
                            });                                                                                        // 1945
                        }                                                                                              // 1946
                    }                                                                                                  // 1947
                                                                                                                       // 1948
                    // Slide Transition happens here.                                                                  // 1949
                    // animated transition happens to target Slide and                                                 // 1950
                    // non - animated transition happens to current Slide                                              // 1951
                    // If CSS transitions are false, directly go the current slide.                                    // 1952
                                                                                                                       // 1953
                    if (this.props.useCSS === false) {                                                                 // 1954
                                                                                                                       // 1955
                        this.setState({                                                                                // 1956
                            currentSlide: currentSlide,                                                                // 1957
                            trackStyle: getTrackCSS(assign({ left: currentLeft }, this.props, this.state))             // 1958
                        }, function () {                                                                               // 1959
                            if (this.props.afterChange) {                                                              // 1960
                                this.props.afterChange(currentSlide);                                                  // 1961
                            }                                                                                          // 1962
                        });                                                                                            // 1963
                    } else {                                                                                           // 1964
                                                                                                                       // 1965
                        var nextStateChanges = {                                                                       // 1966
                            animating: false,                                                                          // 1967
                            currentSlide: currentSlide,                                                                // 1968
                            trackStyle: getTrackCSS(assign({ left: currentLeft }, this.props, this.state)),            // 1969
                            swipeLeft: null                                                                            // 1970
                        };                                                                                             // 1971
                                                                                                                       // 1972
                        callback = function () {                                                                       // 1973
                            _this.setState(nextStateChanges);                                                          // 1974
                            if (_this.props.afterChange) {                                                             // 1975
                                _this.props.afterChange(currentSlide);                                                 // 1976
                            }                                                                                          // 1977
                            ReactTransitionEvents.removeEndEventListener(_this.refs.track.getDOMNode(), callback);     // 1978
                        };                                                                                             // 1979
                                                                                                                       // 1980
                        this.setState({                                                                                // 1981
                            animating: true,                                                                           // 1982
                            currentSlide: targetSlide,                                                                 // 1983
                            trackStyle: getTrackAnimateCSS(assign({ left: targetLeft }, this.props, this.state))       // 1984
                        }, function () {                                                                               // 1985
                            ReactTransitionEvents.addEndEventListener(this.refs.track.getDOMNode(), callback);         // 1986
                        });                                                                                            // 1987
                    }                                                                                                  // 1988
                                                                                                                       // 1989
                    this.autoPlay();                                                                                   // 1990
                },                                                                                                     // 1991
                swipeDirection: function (touchObject) {                                                               // 1992
                    var xDist, yDist, r, swipeAngle;                                                                   // 1993
                                                                                                                       // 1994
                    xDist = touchObject.startX - touchObject.curX;                                                     // 1995
                    yDist = touchObject.startY - touchObject.curY;                                                     // 1996
                    r = Math.atan2(yDist, xDist);                                                                      // 1997
                                                                                                                       // 1998
                    swipeAngle = Math.round(r * 180 / Math.PI);                                                        // 1999
                    if (swipeAngle < 0) {                                                                              // 2000
                        swipeAngle = 360 - Math.abs(swipeAngle);                                                       // 2001
                    }                                                                                                  // 2002
                    if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {               // 2003
                        return this.props.rtl === false ? 'left' : 'right';                                            // 2004
                    }                                                                                                  // 2005
                    if (swipeAngle >= 135 && swipeAngle <= 225) {                                                      // 2006
                        return this.props.rtl === false ? 'right' : 'left';                                            // 2007
                    }                                                                                                  // 2008
                                                                                                                       // 2009
                    return 'vertical';                                                                                 // 2010
                },                                                                                                     // 2011
                autoPlay: function () {                                                                                // 2012
                    var _this2 = this;                                                                                 // 2013
                                                                                                                       // 2014
                    var play = function () {                                                                           // 2015
                        if (_this2.state.mounted) {                                                                    // 2016
                            _this2.slideHandler(_this2.state.currentSlide + _this2.props.slidesToScroll);              // 2017
                        }                                                                                              // 2018
                    };                                                                                                 // 2019
                    if (this.props.autoplay) {                                                                         // 2020
                        window.clearTimeout(this.state.autoPlayTimer);                                                 // 2021
                        this.setState({                                                                                // 2022
                            autoPlayTimer: window.setTimeout(play, this.props.autoplaySpeed)                           // 2023
                        });                                                                                            // 2024
                    }                                                                                                  // 2025
                }                                                                                                      // 2026
            };                                                                                                         // 2027
                                                                                                                       // 2028
            _export('default', helpers);                                                                               // 2029
        }                                                                                                              // 2030
    };                                                                                                                 // 2031
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 2033
}).call(this);                                                                                                         // 2034
                                                                                                                       // 2035
                                                                                                                       // 2036
                                                                                                                       // 2037
                                                                                                                       // 2038
                                                                                                                       // 2039
                                                                                                                       // 2040
(function () {                                                                                                         // 2041
                                                                                                                       // 2042
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/mixins/react-responsive.import.jsx.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/mixins/react-responsive', ['../lib/enquire', '../lib/json2mq'], function (_export) {
    var enquire, json2mq, ResponsiveMixin;                                                                             // 2050
    return {                                                                                                           // 2051
        setters: [function (_libEnquire) {                                                                             // 2052
            enquire = _libEnquire['default'];                                                                          // 2053
        }, function (_libJson2mq) {                                                                                    // 2054
            json2mq = _libJson2mq['default'];                                                                          // 2055
        }],                                                                                                            // 2056
        execute: function () {                                                                                         // 2057
            ResponsiveMixin = {                                                                                        // 2058
                media: function (query, handler) {                                                                     // 2059
                    query = json2mq(query);                                                                            // 2060
                    if (typeof handler === 'function') {                                                               // 2061
                        handler = {                                                                                    // 2062
                            match: handler                                                                             // 2063
                        };                                                                                             // 2064
                    }                                                                                                  // 2065
                    enquire.register(query, handler);                                                                  // 2066
                                                                                                                       // 2067
                    // Queue the handlers to unregister them at unmount                                                // 2068
                    if (!this._responsiveMediaHandlers) {                                                              // 2069
                        this._responsiveMediaHandlers = [];                                                            // 2070
                    }                                                                                                  // 2071
                    this._responsiveMediaHandlers.push({ query: query, handler: handler });                            // 2072
                },                                                                                                     // 2073
                componentWillUnmount: function () {                                                                    // 2074
                    if (this._responsiveMediaHandlers) {                                                               // 2075
                        this._responsiveMediaHandlers.forEach(function (obj) {                                         // 2076
                            enquire.unregister(obj.query, obj.handler);                                                // 2077
                        });                                                                                            // 2078
                    }                                                                                                  // 2079
                }                                                                                                      // 2080
            };                                                                                                         // 2081
                                                                                                                       // 2082
            _export('default', ResponsiveMixin);                                                                       // 2083
        }                                                                                                              // 2084
    };                                                                                                                 // 2085
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 2087
}).call(this);                                                                                                         // 2088
                                                                                                                       // 2089
                                                                                                                       // 2090
                                                                                                                       // 2091
                                                                                                                       // 2092
                                                                                                                       // 2093
                                                                                                                       // 2094
(function () {                                                                                                         // 2095
                                                                                                                       // 2096
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/mixins/trackHelper.import.jsx.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register('{universe:carousel}/mixins/trackHelper', [], function (_export) {                                     // 2103
    var checkSpecKeys, getTrackCSS, getTrackAnimateCSS, getTrackLeft;                                                  // 2104
    return {                                                                                                           // 2105
        setters: [],                                                                                                   // 2106
        execute: function () {                                                                                         // 2107
            checkSpecKeys = function (spec, keysArray) {                                                               // 2108
                return keysArray.reduce(function (value, key) {                                                        // 2109
                    return value && spec.hasOwnProperty(key);                                                          // 2110
                }, true) ? null : console.error('Keys Missing', spec);                                                 // 2111
            };                                                                                                         // 2112
                                                                                                                       // 2113
            getTrackCSS = function (spec) {                                                                            // 2114
                checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);            // 2115
                                                                                                                       // 2116
                var trackWidth;                                                                                        // 2117
                                                                                                                       // 2118
                if (spec.variableWidth) {                                                                              // 2119
                    trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;                          // 2120
                } else if (spec.centerMode) {                                                                          // 2121
                    trackWidth = (spec.slideCount + 2 * (spec.slidesToShow + 1)) * spec.slideWidth;                    // 2122
                } else {                                                                                               // 2123
                    trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;                          // 2124
                }                                                                                                      // 2125
                                                                                                                       // 2126
                var style = {                                                                                          // 2127
                    opacity: 1,                                                                                        // 2128
                    width: trackWidth,                                                                                 // 2129
                    WebkitTransform: 'translate3d(' + spec.left + 'px, 0px, 0px)',                                     // 2130
                    transform: 'translate3d(' + spec.left + 'px, 0px, 0px)',                                           // 2131
                    transition: '',                                                                                    // 2132
                    WebkitTransition: '',                                                                              // 2133
                    msTransform: 'translateX(' + spec.left + 'px)'                                                     // 2134
                };                                                                                                     // 2135
                                                                                                                       // 2136
                return style;                                                                                          // 2137
            };                                                                                                         // 2138
                                                                                                                       // 2139
            _export('getTrackCSS', getTrackCSS);                                                                       // 2140
                                                                                                                       // 2141
            getTrackAnimateCSS = function (spec) {                                                                     // 2142
                checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);
                                                                                                                       // 2144
                var style = getTrackCSS(spec);                                                                         // 2145
                // useCSS is true by default so it can be undefined                                                    // 2146
                style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;                     // 2147
                style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;                                   // 2148
                return style;                                                                                          // 2149
            };                                                                                                         // 2150
                                                                                                                       // 2151
            _export('getTrackAnimateCSS', getTrackAnimateCSS);                                                         // 2152
                                                                                                                       // 2153
            getTrackLeft = function (spec) {                                                                           // 2154
                                                                                                                       // 2155
                checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth']);
                                                                                                                       // 2157
                var slideOffset = 0;                                                                                   // 2158
                var targetLeft;                                                                                        // 2159
                var targetSlide;                                                                                       // 2160
                                                                                                                       // 2161
                if (spec.fade) {                                                                                       // 2162
                    return 0;                                                                                          // 2163
                }                                                                                                      // 2164
                                                                                                                       // 2165
                if (spec.infinite) {                                                                                   // 2166
                    if (spec.slideCount > spec.slidesToShow) {                                                         // 2167
                        slideOffset = spec.slideWidth * spec.slidesToShow * -1;                                        // 2168
                    }                                                                                                  // 2169
                    if (spec.slideCount % spec.slidesToScroll !== 0) {                                                 // 2170
                        if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
                            if (spec.slideIndex > spec.slideCount) {                                                   // 2172
                                slideOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideWidth * -1;
                            } else {                                                                                   // 2174
                                slideOffset = spec.slideCount % spec.slidesToScroll * spec.slideWidth * -1;            // 2175
                            }                                                                                          // 2176
                        }                                                                                              // 2177
                    }                                                                                                  // 2178
                }                                                                                                      // 2179
                                                                                                                       // 2180
                if (spec.centerMode) {                                                                                 // 2181
                    if (spec.infinite) {                                                                               // 2182
                        slideOffset += spec.slideWidth * Math.floor(spec.slidesToShow / 2);                            // 2183
                    } else {                                                                                           // 2184
                        slideOffset = spec.slideWidth * Math.floor(spec.slidesToShow / 2);                             // 2185
                    }                                                                                                  // 2186
                }                                                                                                      // 2187
                                                                                                                       // 2188
                targetLeft = spec.slideIndex * spec.slideWidth * -1 + slideOffset;                                     // 2189
                                                                                                                       // 2190
                if (spec.variableWidth === true) {                                                                     // 2191
                    var targetSlideIndex;                                                                              // 2192
                    if (spec.slideCount <= spec.slidesToShow || spec.infinite === false) {                             // 2193
                        targetSlide = spec.trackRef.getDOMNode().childNodes[spec.slideIndex];                          // 2194
                    } else {                                                                                           // 2195
                        targetSlideIndex = spec.slideIndex + spec.slidesToShow;                                        // 2196
                        targetSlide = spec.trackRef.getDOMNode().childNodes[targetSlideIndex];                         // 2197
                    }                                                                                                  // 2198
                    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;                                        // 2199
                    if (spec.centerMode === true) {                                                                    // 2200
                        if (spec.infinite === false) {                                                                 // 2201
                            targetSlide = spec.trackRef.getDOMNode().children[spec.slideIndex];                        // 2202
                        } else {                                                                                       // 2203
                            targetSlide = spec.trackRef.getDOMNode().children[spec.slideIndex + spec.slidesToShow + 1];
                        }                                                                                              // 2205
                                                                                                                       // 2206
                        targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;                                    // 2207
                        targetLeft += (spec.listWidth - targetSlide.offsetWidth) / 2;                                  // 2208
                    }                                                                                                  // 2209
                }                                                                                                      // 2210
                                                                                                                       // 2211
                return targetLeft;                                                                                     // 2212
            };                                                                                                         // 2213
                                                                                                                       // 2214
            _export('getTrackLeft', getTrackLeft);                                                                     // 2215
        }                                                                                                              // 2216
    };                                                                                                                 // 2217
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 2219
}).call(this);                                                                                                         // 2220
                                                                                                                       // 2221
                                                                                                                       // 2222
                                                                                                                       // 2223
                                                                                                                       // 2224
                                                                                                                       // 2225
                                                                                                                       // 2226
(function () {                                                                                                         // 2227
                                                                                                                       // 2228
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe:carousel/example/demos.import.jsx.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
System.register("{universe:carousel}/example/demos", ["../index"], function (_export) {                                // 2235
    var Slider, SingleItem, MultipleItems, Responsive, CenterMode, AutoPlay, VariableWidth, AdaptiveHeight, LazyLoad, Fade;
    return {                                                                                                           // 2237
        setters: [function (_index) {                                                                                  // 2238
            Slider = _index["default"];                                                                                // 2239
        }],                                                                                                            // 2240
        execute: function () {                                                                                         // 2241
            SingleItem = React.createClass({                                                                           // 2242
                getInitialState: function () {                                                                         // 2243
                    return { count: 10 };                                                                              // 2244
                },                                                                                                     // 2245
                click: function () {                                                                                   // 2246
                    this.setState({ count: this.state.count + 1 });                                                    // 2247
                },                                                                                                     // 2248
                render: function () {                                                                                  // 2249
                    var settings = {                                                                                   // 2250
                        dots: true,                                                                                    // 2251
                        infinite: true,                                                                                // 2252
                        speed: 500,                                                                                    // 2253
                        slidesToShow: 1,                                                                               // 2254
                        slidesToScroll: 1                                                                              // 2255
                    };                                                                                                 // 2256
                    return React.createElement(                                                                        // 2257
                        "div",                                                                                         // 2258
                        null,                                                                                          // 2259
                        React.createElement(                                                                           // 2260
                            "h2",                                                                                      // 2261
                            null,                                                                                      // 2262
                            " Single Item"                                                                             // 2263
                        ),                                                                                             // 2264
                        React.createElement(                                                                           // 2265
                            Slider,                                                                                    // 2266
                            settings,                                                                                  // 2267
                            React.createElement(                                                                       // 2268
                                "div",                                                                                 // 2269
                                { onClick: this.click },                                                               // 2270
                                React.createElement(                                                                   // 2271
                                    "h3",                                                                              // 2272
                                    { className: "carousel-demo-box" },                                                // 2273
                                    this.state.count                                                                   // 2274
                                )                                                                                      // 2275
                            ),                                                                                         // 2276
                            React.createElement(                                                                       // 2277
                                "div",                                                                                 // 2278
                                null,                                                                                  // 2279
                                React.createElement(                                                                   // 2280
                                    "h3",                                                                              // 2281
                                    { className: "carousel-demo-box" },                                                // 2282
                                    "2"                                                                                // 2283
                                )                                                                                      // 2284
                            ),                                                                                         // 2285
                            React.createElement(                                                                       // 2286
                                "div",                                                                                 // 2287
                                null,                                                                                  // 2288
                                React.createElement(                                                                   // 2289
                                    "h3",                                                                              // 2290
                                    { className: "carousel-demo-box" },                                                // 2291
                                    "3"                                                                                // 2292
                                )                                                                                      // 2293
                            ),                                                                                         // 2294
                            React.createElement(                                                                       // 2295
                                "div",                                                                                 // 2296
                                null,                                                                                  // 2297
                                React.createElement(                                                                   // 2298
                                    "h3",                                                                              // 2299
                                    { className: "carousel-demo-box" },                                                // 2300
                                    "4"                                                                                // 2301
                                )                                                                                      // 2302
                            ),                                                                                         // 2303
                            React.createElement(                                                                       // 2304
                                "div",                                                                                 // 2305
                                null,                                                                                  // 2306
                                React.createElement(                                                                   // 2307
                                    "h3",                                                                              // 2308
                                    { className: "carousel-demo-box" },                                                // 2309
                                    "5"                                                                                // 2310
                                )                                                                                      // 2311
                            ),                                                                                         // 2312
                            React.createElement(                                                                       // 2313
                                "div",                                                                                 // 2314
                                null,                                                                                  // 2315
                                React.createElement(                                                                   // 2316
                                    "h3",                                                                              // 2317
                                    { className: "carousel-demo-box" },                                                // 2318
                                    "6"                                                                                // 2319
                                )                                                                                      // 2320
                            )                                                                                          // 2321
                        )                                                                                              // 2322
                    );                                                                                                 // 2323
                }                                                                                                      // 2324
            });                                                                                                        // 2325
            MultipleItems = React.createClass({                                                                        // 2326
                                                                                                                       // 2327
                render: function () {                                                                                  // 2328
                    var settings = {                                                                                   // 2329
                        dots: true,                                                                                    // 2330
                        infinite: true,                                                                                // 2331
                        speed: 500,                                                                                    // 2332
                        slidesToShow: 3,                                                                               // 2333
                        slidesToScroll: 3                                                                              // 2334
                    };                                                                                                 // 2335
                    return React.createElement(                                                                        // 2336
                        "div",                                                                                         // 2337
                        null,                                                                                          // 2338
                        React.createElement(                                                                           // 2339
                            "h2",                                                                                      // 2340
                            null,                                                                                      // 2341
                            " Multiple items "                                                                         // 2342
                        ),                                                                                             // 2343
                        React.createElement(                                                                           // 2344
                            Slider,                                                                                    // 2345
                            settings,                                                                                  // 2346
                            React.createElement(                                                                       // 2347
                                "div",                                                                                 // 2348
                                null,                                                                                  // 2349
                                React.createElement(                                                                   // 2350
                                    "h3",                                                                              // 2351
                                    { className: "carousel-demo-box" },                                                // 2352
                                    "1"                                                                                // 2353
                                )                                                                                      // 2354
                            ),                                                                                         // 2355
                            React.createElement(                                                                       // 2356
                                "div",                                                                                 // 2357
                                null,                                                                                  // 2358
                                React.createElement(                                                                   // 2359
                                    "h3",                                                                              // 2360
                                    { className: "carousel-demo-box" },                                                // 2361
                                    "2"                                                                                // 2362
                                )                                                                                      // 2363
                            ),                                                                                         // 2364
                            React.createElement(                                                                       // 2365
                                "div",                                                                                 // 2366
                                null,                                                                                  // 2367
                                React.createElement(                                                                   // 2368
                                    "h3",                                                                              // 2369
                                    { className: "carousel-demo-box" },                                                // 2370
                                    "3"                                                                                // 2371
                                )                                                                                      // 2372
                            ),                                                                                         // 2373
                            React.createElement(                                                                       // 2374
                                "div",                                                                                 // 2375
                                null,                                                                                  // 2376
                                React.createElement(                                                                   // 2377
                                    "h3",                                                                              // 2378
                                    { className: "carousel-demo-box" },                                                // 2379
                                    "4"                                                                                // 2380
                                )                                                                                      // 2381
                            ),                                                                                         // 2382
                            React.createElement(                                                                       // 2383
                                "div",                                                                                 // 2384
                                null,                                                                                  // 2385
                                React.createElement(                                                                   // 2386
                                    "h3",                                                                              // 2387
                                    { className: "carousel-demo-box" },                                                // 2388
                                    "5"                                                                                // 2389
                                )                                                                                      // 2390
                            ),                                                                                         // 2391
                            React.createElement(                                                                       // 2392
                                "div",                                                                                 // 2393
                                null,                                                                                  // 2394
                                React.createElement(                                                                   // 2395
                                    "h3",                                                                              // 2396
                                    { className: "carousel-demo-box" },                                                // 2397
                                    "6"                                                                                // 2398
                                )                                                                                      // 2399
                            ),                                                                                         // 2400
                            React.createElement(                                                                       // 2401
                                "div",                                                                                 // 2402
                                null,                                                                                  // 2403
                                React.createElement(                                                                   // 2404
                                    "h3",                                                                              // 2405
                                    { className: "carousel-demo-box" },                                                // 2406
                                    "7"                                                                                // 2407
                                )                                                                                      // 2408
                            ),                                                                                         // 2409
                            React.createElement(                                                                       // 2410
                                "div",                                                                                 // 2411
                                null,                                                                                  // 2412
                                React.createElement(                                                                   // 2413
                                    "h3",                                                                              // 2414
                                    { className: "carousel-demo-box" },                                                // 2415
                                    "8"                                                                                // 2416
                                )                                                                                      // 2417
                            ),                                                                                         // 2418
                            React.createElement(                                                                       // 2419
                                "div",                                                                                 // 2420
                                null,                                                                                  // 2421
                                React.createElement(                                                                   // 2422
                                    "h3",                                                                              // 2423
                                    { className: "carousel-demo-box" },                                                // 2424
                                    "9"                                                                                // 2425
                                )                                                                                      // 2426
                            )                                                                                          // 2427
                        )                                                                                              // 2428
                    );                                                                                                 // 2429
                }                                                                                                      // 2430
            });                                                                                                        // 2431
            Responsive = React.createClass({                                                                           // 2432
                render: function () {                                                                                  // 2433
                    var settings = {                                                                                   // 2434
                        dots: true,                                                                                    // 2435
                        infinite: false,                                                                               // 2436
                        speed: 500,                                                                                    // 2437
                        slidesToShow: 4,                                                                               // 2438
                        slidesToScroll: 4,                                                                             // 2439
                        responsive: [{                                                                                 // 2440
                            breakpoint: 1024,                                                                          // 2441
                            settings: {                                                                                // 2442
                                slidesToShow: 3,                                                                       // 2443
                                slidesToScroll: 3,                                                                     // 2444
                                infinite: true,                                                                        // 2445
                                dots: true                                                                             // 2446
                            }                                                                                          // 2447
                        }, {                                                                                           // 2448
                            breakpoint: 600,                                                                           // 2449
                            settings: {                                                                                // 2450
                                slidesToShow: 2,                                                                       // 2451
                                slidesToScroll: 2                                                                      // 2452
                            }                                                                                          // 2453
                        }, {                                                                                           // 2454
                            breakpoint: 480,                                                                           // 2455
                            settings: {                                                                                // 2456
                                slidesToShow: 1,                                                                       // 2457
                                slidesToScroll: 1                                                                      // 2458
                            }                                                                                          // 2459
                        }]                                                                                             // 2460
                    };                                                                                                 // 2461
                    return React.createElement(                                                                        // 2462
                        "div",                                                                                         // 2463
                        null,                                                                                          // 2464
                        React.createElement(                                                                           // 2465
                            "h2",                                                                                      // 2466
                            null,                                                                                      // 2467
                            " Responsive "                                                                             // 2468
                        ),                                                                                             // 2469
                        React.createElement(                                                                           // 2470
                            Slider,                                                                                    // 2471
                            settings,                                                                                  // 2472
                            React.createElement(                                                                       // 2473
                                "div",                                                                                 // 2474
                                null,                                                                                  // 2475
                                React.createElement(                                                                   // 2476
                                    "h3",                                                                              // 2477
                                    { className: "carousel-demo-box" },                                                // 2478
                                    "1"                                                                                // 2479
                                )                                                                                      // 2480
                            ),                                                                                         // 2481
                            React.createElement(                                                                       // 2482
                                "div",                                                                                 // 2483
                                null,                                                                                  // 2484
                                React.createElement(                                                                   // 2485
                                    "h3",                                                                              // 2486
                                    { className: "carousel-demo-box" },                                                // 2487
                                    "2"                                                                                // 2488
                                )                                                                                      // 2489
                            ),                                                                                         // 2490
                            React.createElement(                                                                       // 2491
                                "div",                                                                                 // 2492
                                null,                                                                                  // 2493
                                React.createElement(                                                                   // 2494
                                    "h3",                                                                              // 2495
                                    { className: "carousel-demo-box" },                                                // 2496
                                    "3"                                                                                // 2497
                                )                                                                                      // 2498
                            ),                                                                                         // 2499
                            React.createElement(                                                                       // 2500
                                "div",                                                                                 // 2501
                                null,                                                                                  // 2502
                                React.createElement(                                                                   // 2503
                                    "h3",                                                                              // 2504
                                    { className: "carousel-demo-box" },                                                // 2505
                                    "4"                                                                                // 2506
                                )                                                                                      // 2507
                            ),                                                                                         // 2508
                            React.createElement(                                                                       // 2509
                                "div",                                                                                 // 2510
                                null,                                                                                  // 2511
                                React.createElement(                                                                   // 2512
                                    "h3",                                                                              // 2513
                                    { className: "carousel-demo-box" },                                                // 2514
                                    "5"                                                                                // 2515
                                )                                                                                      // 2516
                            ),                                                                                         // 2517
                            React.createElement(                                                                       // 2518
                                "div",                                                                                 // 2519
                                null,                                                                                  // 2520
                                React.createElement(                                                                   // 2521
                                    "h3",                                                                              // 2522
                                    { className: "carousel-demo-box" },                                                // 2523
                                    "6"                                                                                // 2524
                                )                                                                                      // 2525
                            ),                                                                                         // 2526
                            React.createElement(                                                                       // 2527
                                "div",                                                                                 // 2528
                                null,                                                                                  // 2529
                                React.createElement(                                                                   // 2530
                                    "h3",                                                                              // 2531
                                    { className: "carousel-demo-box" },                                                // 2532
                                    "7"                                                                                // 2533
                                )                                                                                      // 2534
                            ),                                                                                         // 2535
                            React.createElement(                                                                       // 2536
                                "div",                                                                                 // 2537
                                null,                                                                                  // 2538
                                React.createElement(                                                                   // 2539
                                    "h3",                                                                              // 2540
                                    { className: "carousel-demo-box" },                                                // 2541
                                    "8"                                                                                // 2542
                                )                                                                                      // 2543
                            )                                                                                          // 2544
                        )                                                                                              // 2545
                    );                                                                                                 // 2546
                }                                                                                                      // 2547
            });                                                                                                        // 2548
            CenterMode = React.createClass({                                                                           // 2549
                render: function () {                                                                                  // 2550
                    var settings = {                                                                                   // 2551
                        className: 'center',                                                                           // 2552
                        centerMode: true,                                                                              // 2553
                        infinite: true,                                                                                // 2554
                        centerPadding: '60px',                                                                         // 2555
                        slidesToShow: 7,                                                                               // 2556
                        speed: 500,                                                                                    // 2557
                        beforeChange: function (index) {                                                               // 2558
                            console.log('Slider will change from:' + index);                                           // 2559
                        },                                                                                             // 2560
                        afterChange: function (currentSlide) {                                                         // 2561
                            console.log('Slider Changed to :' + (currentSlide + 1));                                   // 2562
                        }                                                                                              // 2563
                    };                                                                                                 // 2564
                    return React.createElement(                                                                        // 2565
                        "div",                                                                                         // 2566
                        null,                                                                                          // 2567
                        React.createElement(                                                                           // 2568
                            "h2",                                                                                      // 2569
                            null,                                                                                      // 2570
                            "Center Mode"                                                                              // 2571
                        ),                                                                                             // 2572
                        React.createElement(                                                                           // 2573
                            "p",                                                                                       // 2574
                            null,                                                                                      // 2575
                            "Fix flicker issue at warping"                                                             // 2576
                        ),                                                                                             // 2577
                        React.createElement(                                                                           // 2578
                            Slider,                                                                                    // 2579
                            settings,                                                                                  // 2580
                            React.createElement(                                                                       // 2581
                                "div",                                                                                 // 2582
                                null,                                                                                  // 2583
                                React.createElement(                                                                   // 2584
                                    "h3",                                                                              // 2585
                                    { className: "carousel-demo-box" },                                                // 2586
                                    "1"                                                                                // 2587
                                )                                                                                      // 2588
                            ),                                                                                         // 2589
                            React.createElement(                                                                       // 2590
                                "div",                                                                                 // 2591
                                null,                                                                                  // 2592
                                React.createElement(                                                                   // 2593
                                    "h3",                                                                              // 2594
                                    { className: "carousel-demo-box" },                                                // 2595
                                    "2"                                                                                // 2596
                                )                                                                                      // 2597
                            ),                                                                                         // 2598
                            React.createElement(                                                                       // 2599
                                "div",                                                                                 // 2600
                                null,                                                                                  // 2601
                                React.createElement(                                                                   // 2602
                                    "h3",                                                                              // 2603
                                    { className: "carousel-demo-box" },                                                // 2604
                                    "3"                                                                                // 2605
                                )                                                                                      // 2606
                            ),                                                                                         // 2607
                            React.createElement(                                                                       // 2608
                                "div",                                                                                 // 2609
                                null,                                                                                  // 2610
                                React.createElement(                                                                   // 2611
                                    "h3",                                                                              // 2612
                                    { className: "carousel-demo-box" },                                                // 2613
                                    "4"                                                                                // 2614
                                )                                                                                      // 2615
                            ),                                                                                         // 2616
                            React.createElement(                                                                       // 2617
                                "div",                                                                                 // 2618
                                null,                                                                                  // 2619
                                React.createElement(                                                                   // 2620
                                    "h3",                                                                              // 2621
                                    { className: "carousel-demo-box" },                                                // 2622
                                    "5"                                                                                // 2623
                                )                                                                                      // 2624
                            ),                                                                                         // 2625
                            React.createElement(                                                                       // 2626
                                "div",                                                                                 // 2627
                                null,                                                                                  // 2628
                                React.createElement(                                                                   // 2629
                                    "h3",                                                                              // 2630
                                    { className: "carousel-demo-box" },                                                // 2631
                                    "6"                                                                                // 2632
                                )                                                                                      // 2633
                            ),                                                                                         // 2634
                            React.createElement(                                                                       // 2635
                                "div",                                                                                 // 2636
                                null,                                                                                  // 2637
                                React.createElement(                                                                   // 2638
                                    "h3",                                                                              // 2639
                                    { className: "carousel-demo-box" },                                                // 2640
                                    "7"                                                                                // 2641
                                )                                                                                      // 2642
                            ),                                                                                         // 2643
                            React.createElement(                                                                       // 2644
                                "div",                                                                                 // 2645
                                null,                                                                                  // 2646
                                React.createElement(                                                                   // 2647
                                    "h3",                                                                              // 2648
                                    { className: "carousel-demo-box" },                                                // 2649
                                    "8"                                                                                // 2650
                                )                                                                                      // 2651
                            ),                                                                                         // 2652
                            React.createElement(                                                                       // 2653
                                "div",                                                                                 // 2654
                                null,                                                                                  // 2655
                                React.createElement(                                                                   // 2656
                                    "h3",                                                                              // 2657
                                    { className: "carousel-demo-box" },                                                // 2658
                                    "9"                                                                                // 2659
                                )                                                                                      // 2660
                            )                                                                                          // 2661
                        )                                                                                              // 2662
                    );                                                                                                 // 2663
                }                                                                                                      // 2664
            });                                                                                                        // 2665
            AutoPlay = React.createClass({                                                                             // 2666
                render: function () {                                                                                  // 2667
                    var settings = {                                                                                   // 2668
                        dots: true,                                                                                    // 2669
                        infinite: true,                                                                                // 2670
                        slidesToShow: 3,                                                                               // 2671
                        slidesToScroll: 1,                                                                             // 2672
                        autoplay: true,                                                                                // 2673
                        autoplaySpeed: 2000                                                                            // 2674
                    };                                                                                                 // 2675
                    return React.createElement(                                                                        // 2676
                        "div",                                                                                         // 2677
                        null,                                                                                          // 2678
                        React.createElement(                                                                           // 2679
                            "h2",                                                                                      // 2680
                            null,                                                                                      // 2681
                            "Auto Play"                                                                                // 2682
                        ),                                                                                             // 2683
                        React.createElement(                                                                           // 2684
                            Slider,                                                                                    // 2685
                            settings,                                                                                  // 2686
                            React.createElement(                                                                       // 2687
                                "div",                                                                                 // 2688
                                null,                                                                                  // 2689
                                React.createElement(                                                                   // 2690
                                    "h3",                                                                              // 2691
                                    { className: "carousel-demo-box" },                                                // 2692
                                    "1"                                                                                // 2693
                                )                                                                                      // 2694
                            ),                                                                                         // 2695
                            React.createElement(                                                                       // 2696
                                "div",                                                                                 // 2697
                                null,                                                                                  // 2698
                                React.createElement(                                                                   // 2699
                                    "h3",                                                                              // 2700
                                    { className: "carousel-demo-box" },                                                // 2701
                                    "2"                                                                                // 2702
                                )                                                                                      // 2703
                            ),                                                                                         // 2704
                            React.createElement(                                                                       // 2705
                                "div",                                                                                 // 2706
                                null,                                                                                  // 2707
                                React.createElement(                                                                   // 2708
                                    "h3",                                                                              // 2709
                                    { className: "carousel-demo-box" },                                                // 2710
                                    "3"                                                                                // 2711
                                )                                                                                      // 2712
                            ),                                                                                         // 2713
                            React.createElement(                                                                       // 2714
                                "div",                                                                                 // 2715
                                null,                                                                                  // 2716
                                React.createElement(                                                                   // 2717
                                    "h3",                                                                              // 2718
                                    { className: "carousel-demo-box" },                                                // 2719
                                    "4"                                                                                // 2720
                                )                                                                                      // 2721
                            ),                                                                                         // 2722
                            React.createElement(                                                                       // 2723
                                "div",                                                                                 // 2724
                                null,                                                                                  // 2725
                                React.createElement(                                                                   // 2726
                                    "h3",                                                                              // 2727
                                    { className: "carousel-demo-box" },                                                // 2728
                                    "5"                                                                                // 2729
                                )                                                                                      // 2730
                            ),                                                                                         // 2731
                            React.createElement(                                                                       // 2732
                                "div",                                                                                 // 2733
                                null,                                                                                  // 2734
                                React.createElement(                                                                   // 2735
                                    "h3",                                                                              // 2736
                                    { className: "carousel-demo-box" },                                                // 2737
                                    "6"                                                                                // 2738
                                )                                                                                      // 2739
                            )                                                                                          // 2740
                        )                                                                                              // 2741
                    );                                                                                                 // 2742
                }                                                                                                      // 2743
            });                                                                                                        // 2744
            VariableWidth = React.createClass({                                                                        // 2745
                render: function () {                                                                                  // 2746
                    var settings = {                                                                                   // 2747
                        className: 'slider variable-width',                                                            // 2748
                        dots: true,                                                                                    // 2749
                        infinite: true,                                                                                // 2750
                        centerMode: true,                                                                              // 2751
                        slidesToShow: 1,                                                                               // 2752
                        slidesToScroll: 1,                                                                             // 2753
                        variableWidth: true                                                                            // 2754
                    };                                                                                                 // 2755
                    return React.createElement(                                                                        // 2756
                        "div",                                                                                         // 2757
                        null,                                                                                          // 2758
                        React.createElement(                                                                           // 2759
                            "h2",                                                                                      // 2760
                            null,                                                                                      // 2761
                            "Variable width"                                                                           // 2762
                        ),                                                                                             // 2763
                        React.createElement(                                                                           // 2764
                            Slider,                                                                                    // 2765
                            settings,                                                                                  // 2766
                            React.createElement(                                                                       // 2767
                                "div",                                                                                 // 2768
                                { style: { width: 100 } },                                                             // 2769
                                React.createElement(                                                                   // 2770
                                    "p",                                                                               // 2771
                                    { className: "carousel-demo-box" },                                                // 2772
                                    "100"                                                                              // 2773
                                )                                                                                      // 2774
                            ),                                                                                         // 2775
                            React.createElement(                                                                       // 2776
                                "div",                                                                                 // 2777
                                { style: { width: 200 } },                                                             // 2778
                                React.createElement(                                                                   // 2779
                                    "p",                                                                               // 2780
                                    { className: "carousel-demo-box" },                                                // 2781
                                    "200"                                                                              // 2782
                                )                                                                                      // 2783
                            ),                                                                                         // 2784
                            React.createElement(                                                                       // 2785
                                "div",                                                                                 // 2786
                                { style: { width: 75 } },                                                              // 2787
                                React.createElement(                                                                   // 2788
                                    "p",                                                                               // 2789
                                    { className: "carousel-demo-box" },                                                // 2790
                                    "75"                                                                               // 2791
                                )                                                                                      // 2792
                            ),                                                                                         // 2793
                            React.createElement(                                                                       // 2794
                                "div",                                                                                 // 2795
                                { style: { width: 300 } },                                                             // 2796
                                React.createElement(                                                                   // 2797
                                    "p",                                                                               // 2798
                                    { className: "carousel-demo-box" },                                                // 2799
                                    "300"                                                                              // 2800
                                )                                                                                      // 2801
                            ),                                                                                         // 2802
                            React.createElement(                                                                       // 2803
                                "div",                                                                                 // 2804
                                { style: { width: 225 } },                                                             // 2805
                                React.createElement(                                                                   // 2806
                                    "p",                                                                               // 2807
                                    { className: "carousel-demo-box" },                                                // 2808
                                    "225"                                                                              // 2809
                                )                                                                                      // 2810
                            ),                                                                                         // 2811
                            React.createElement(                                                                       // 2812
                                "div",                                                                                 // 2813
                                { style: { width: 175 } },                                                             // 2814
                                React.createElement(                                                                   // 2815
                                    "p",                                                                               // 2816
                                    { className: "carousel-demo-box" },                                                // 2817
                                    "175"                                                                              // 2818
                                )                                                                                      // 2819
                            )                                                                                          // 2820
                        )                                                                                              // 2821
                    );                                                                                                 // 2822
                }                                                                                                      // 2823
            });                                                                                                        // 2824
            AdaptiveHeight = React.createClass({                                                                       // 2825
                render: function () {                                                                                  // 2826
                    var settings = {                                                                                   // 2827
                        className: '',                                                                                 // 2828
                        dots: true,                                                                                    // 2829
                        infinite: true,                                                                                // 2830
                        slidesToShow: 1,                                                                               // 2831
                        slidesToScroll: 1,                                                                             // 2832
                        adaptiveHeight: true                                                                           // 2833
                    };                                                                                                 // 2834
                    return React.createElement(                                                                        // 2835
                        "div",                                                                                         // 2836
                        null,                                                                                          // 2837
                        React.createElement(                                                                           // 2838
                            "h2",                                                                                      // 2839
                            null,                                                                                      // 2840
                            "Adaptive height"                                                                          // 2841
                        ),                                                                                             // 2842
                        React.createElement(                                                                           // 2843
                            Slider,                                                                                    // 2844
                            settings,                                                                                  // 2845
                            React.createElement(                                                                       // 2846
                                "div",                                                                                 // 2847
                                null,                                                                                  // 2848
                                React.createElement(                                                                   // 2849
                                    "h3",                                                                              // 2850
                                    { className: "carousel-demo-box" },                                                // 2851
                                    "1"                                                                                // 2852
                                )                                                                                      // 2853
                            ),                                                                                         // 2854
                            React.createElement(                                                                       // 2855
                                "div",                                                                                 // 2856
                                null,                                                                                  // 2857
                                React.createElement(                                                                   // 2858
                                    "h3",                                                                              // 2859
                                    { className: "carousel-demo-box" },                                                // 2860
                                    "2"                                                                                // 2861
                                ),                                                                                     // 2862
                                React.createElement(                                                                   // 2863
                                    "p",                                                                               // 2864
                                    null,                                                                              // 2865
                                    "Hello"                                                                            // 2866
                                )                                                                                      // 2867
                            ),                                                                                         // 2868
                            React.createElement(                                                                       // 2869
                                "div",                                                                                 // 2870
                                null,                                                                                  // 2871
                                React.createElement(                                                                   // 2872
                                    "h3",                                                                              // 2873
                                    { className: "carousel-demo-box" },                                                // 2874
                                    "3"                                                                                // 2875
                                ),                                                                                     // 2876
                                React.createElement(                                                                   // 2877
                                    "p",                                                                               // 2878
                                    null,                                                                              // 2879
                                    "See ...."                                                                         // 2880
                                ),                                                                                     // 2881
                                React.createElement(                                                                   // 2882
                                    "p",                                                                               // 2883
                                    null,                                                                              // 2884
                                    "Height is adaptive"                                                               // 2885
                                )                                                                                      // 2886
                            ),                                                                                         // 2887
                            React.createElement(                                                                       // 2888
                                "div",                                                                                 // 2889
                                null,                                                                                  // 2890
                                React.createElement(                                                                   // 2891
                                    "h3",                                                                              // 2892
                                    { className: "carousel-demo-box" },                                                // 2893
                                    "4"                                                                                // 2894
                                )                                                                                      // 2895
                            ),                                                                                         // 2896
                            React.createElement(                                                                       // 2897
                                "div",                                                                                 // 2898
                                null,                                                                                  // 2899
                                React.createElement(                                                                   // 2900
                                    "h3",                                                                              // 2901
                                    { className: "carousel-demo-box" },                                                // 2902
                                    "5"                                                                                // 2903
                                )                                                                                      // 2904
                            ),                                                                                         // 2905
                            React.createElement(                                                                       // 2906
                                "div",                                                                                 // 2907
                                null,                                                                                  // 2908
                                React.createElement(                                                                   // 2909
                                    "h3",                                                                              // 2910
                                    { className: "carousel-demo-box" },                                                // 2911
                                    "6"                                                                                // 2912
                                )                                                                                      // 2913
                            )                                                                                          // 2914
                        )                                                                                              // 2915
                    );                                                                                                 // 2916
                }                                                                                                      // 2917
            });                                                                                                        // 2918
            LazyLoad = React.createClass({                                                                             // 2919
                                                                                                                       // 2920
                render: function () {                                                                                  // 2921
                    var settings = {                                                                                   // 2922
                        dots: true,                                                                                    // 2923
                        lazyLoad: true,                                                                                // 2924
                        infinite: true,                                                                                // 2925
                        speed: 500,                                                                                    // 2926
                        slidesToShow: 1,                                                                               // 2927
                        slidesToScroll: 1                                                                              // 2928
                    };                                                                                                 // 2929
                    return React.createElement(                                                                        // 2930
                        "div",                                                                                         // 2931
                        null,                                                                                          // 2932
                        React.createElement(                                                                           // 2933
                            "h2",                                                                                      // 2934
                            null,                                                                                      // 2935
                            " Lazy Load"                                                                               // 2936
                        ),                                                                                             // 2937
                        React.createElement(                                                                           // 2938
                            Slider,                                                                                    // 2939
                            settings,                                                                                  // 2940
                            React.createElement(                                                                       // 2941
                                "div",                                                                                 // 2942
                                null,                                                                                  // 2943
                                React.createElement("img", { src: "http://placehold.it/350x150/f0f00f/0000000" })      // 2944
                            ),                                                                                         // 2945
                            React.createElement(                                                                       // 2946
                                "div",                                                                                 // 2947
                                null,                                                                                  // 2948
                                React.createElement("img", { src: "http://placehold.it/350x150/ff0000/000ff00" })      // 2949
                            ),                                                                                         // 2950
                            React.createElement(                                                                       // 2951
                                "div",                                                                                 // 2952
                                null,                                                                                  // 2953
                                React.createElement("img", { src: "http://placehold.it/350x150/00f000/f00000f" })      // 2954
                            ),                                                                                         // 2955
                            React.createElement(                                                                       // 2956
                                "div",                                                                                 // 2957
                                null,                                                                                  // 2958
                                React.createElement("img", { src: "http://placehold.it/350x150" })                     // 2959
                            )                                                                                          // 2960
                        )                                                                                              // 2961
                    );                                                                                                 // 2962
                }                                                                                                      // 2963
            });                                                                                                        // 2964
            Fade = React.createClass({                                                                                 // 2965
                                                                                                                       // 2966
                render: function () {                                                                                  // 2967
                    var settings = {                                                                                   // 2968
                        dots: true,                                                                                    // 2969
                        fade: true,                                                                                    // 2970
                        infinite: true,                                                                                // 2971
                        speed: 500,                                                                                    // 2972
                        slidesToShow: 1,                                                                               // 2973
                        slidesToScroll: 1                                                                              // 2974
                    };                                                                                                 // 2975
                    return React.createElement(                                                                        // 2976
                        "div",                                                                                         // 2977
                        null,                                                                                          // 2978
                        React.createElement(                                                                           // 2979
                            "h2",                                                                                      // 2980
                            null,                                                                                      // 2981
                            "Fade"                                                                                     // 2982
                        ),                                                                                             // 2983
                        React.createElement(                                                                           // 2984
                            Slider,                                                                                    // 2985
                            settings,                                                                                  // 2986
                            React.createElement(                                                                       // 2987
                                "div",                                                                                 // 2988
                                null,                                                                                  // 2989
                                React.createElement("img", { src: "http://placehold.it/350x150" })                     // 2990
                            ),                                                                                         // 2991
                            React.createElement(                                                                       // 2992
                                "div",                                                                                 // 2993
                                null,                                                                                  // 2994
                                React.createElement("img", { src: "http://placehold.it/350x150/00f0ff/00f00f" })       // 2995
                            ),                                                                                         // 2996
                            React.createElement(                                                                       // 2997
                                "div",                                                                                 // 2998
                                null,                                                                                  // 2999
                                React.createElement("img", { src: "http://placehold.it/350x150/fff0ff/0f0f00" })       // 3000
                            ),                                                                                         // 3001
                            React.createElement(                                                                       // 3002
                                "div",                                                                                 // 3003
                                null,                                                                                  // 3004
                                React.createElement("img", { src: "http://placehold.it/350x150/f0f00f/000000" })       // 3005
                            )                                                                                          // 3006
                        )                                                                                              // 3007
                    );                                                                                                 // 3008
                }                                                                                                      // 3009
            });                                                                                                        // 3010
                                                                                                                       // 3011
            _export("default", React.createClass({                                                                     // 3012
                render: function () {                                                                                  // 3013
                    //need to add variable width and center mode demo                                                  // 3014
                    return React.createElement(                                                                        // 3015
                        "div",                                                                                         // 3016
                        { className: 'content' },                                                                      // 3017
                        React.createElement(                                                                           // 3018
                            "style",                                                                                   // 3019
                            null,                                                                                      // 3020
                            ".carousel-demo-box {" + "background: #0055ff;" + "color: #fff;" + "font-size: 36px;" + "line-height: 80px;" + "margin: 10px;" + "padding: 2%;" + "position: relative;" + "text-align: center;" + "}"
                        ),                                                                                             // 3022
                        React.createElement(SingleItem, null),                                                         // 3023
                        React.createElement(MultipleItems, null),                                                      // 3024
                        React.createElement(Responsive, null),                                                         // 3025
                        React.createElement(CenterMode, null),                                                         // 3026
                        React.createElement(AutoPlay, null),                                                           // 3027
                        React.createElement(VariableWidth, null),                                                      // 3028
                        React.createElement(AdaptiveHeight, null),                                                     // 3029
                        React.createElement(LazyLoad, null),                                                           // 3030
                        React.createElement(Fade, null)                                                                // 3031
                    );                                                                                                 // 3032
                }                                                                                                      // 3033
            }));                                                                                                       // 3034
        }                                                                                                              // 3035
    };                                                                                                                 // 3036
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 3038
}).call(this);                                                                                                         // 3039
                                                                                                                       // 3040
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['universe:carousel'] = {};

})();

//# sourceMappingURL=universe_carousel.js.map
