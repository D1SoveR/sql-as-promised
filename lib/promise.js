(function() {
    "use strict";
    
    var Database = require("./db");
    
    function PromisedDatabase(filePath, promiseConstructor) {

        var basePromise;

        promiseConstructor = promiseConstructor || PromisedDatabase.guessPromise();

        if (promiseConstructor) {
            this._db = new Database(filePath);
            this._constructor = promiseConstructor;
            basePromise = this._addDBMethods(new this._constructor(function(resolve) { resolve(); }));
        } else {
            basePromise = PromisedDatabase._noPromisesThenable;
        }

        this.then = basePromise.then.bind(basePromise);
    }
    
    PromisedDatabase._noPromisesThenable = (function() {

        var error = new Error("No valid Promises implementation provided."),
            thenable = Object.freeze({
                then: function(onFulfilled, onRejected) {
                    process.nextTick(onRejected.bind(thenable, error));
                    return thenable;
                }
            });

        return thenable;

    }());

    PromisedDatabase.guessPromise = function() {
        /* global Promise */
        
        var rsvp;
        
        // Native ES6 Promises
        if (Promise && typeof Promise === "function") {
            return Promise;
        }
        
        // RSVP.js
        try {
            rsvp = require("rsvp");
            return rsvp.Promise;
        } catch (e) {}
        
        return null;
    };
    
    PromisedDatabase.prototype._constructor = null;
    
    PromisedDatabase.prototype._db = null;
    
    PromisedDatabase.prototype.open = function() {
        
        var onFulfilled = typeof arguments[0] === "function" ? arguments[0] : null,
            onRejected = typeof arguments[1] === "function" ? arguments[1] : null,
            promise = this.then(callMethod(this, "open", []));
        
        if (onFulfilled || onRejected) {
            promise = promise.then(onFulfilled, onRejected);
        }
        
        return promise;
    };
    
    PromisedDatabase.prototype.execute = function(query, params) {
        
        var onFulfilled = typeof arguments[2] === "function" ? arguments[2] : null,
            onRejected = typeof arguments[3] === "function" ? arguments[3] : null,
            promise = this.then(callMethod(this, "execute", [query, params]));
        
        if (onFulfilled || onRejected) {
            promise = promise.then(onFulfilled, onRejected);
        }
        
        return promise;
    };
    
    PromisedDatabase.prototype.flush = function(filePath) {
        
        var hasPath = typeof arguments[0] === "string",
            onFulfilled = typeof arguments[0 + hasPath] === "function" ? arguments[0 + hasPath] : null,
            onRejected = typeof arguments[1 + hasPath] === "function" ? arguments[1 + hasPath] : null,
            promise = this.then(callMethod(this, "flush", hasPath ? [filePath] : []));
        
        if (onFulfilled || onRejected) {
            promise = promise.then(onFulfilled, onRejected);
        }
        
        return promise;
    };
    
    PromisedDatabase.prototype.close = function() {
        
        var onFulfilled = typeof arguments[0] === "function" ? arguments[0] : null,
            onRejected = typeof arguments[1] === "function" ? arguments[1] : null,
            promise = this.then(callMethod(this, "close", []));
        
        if (onFulfilled || onRejected) {
            promise = promise.then(onFulfilled, onRejected);
        }
        
        return promise;
    };
    
    PromisedDatabase.prototype.then = function() { throw new Error("Instance-only method."); };
    
    PromisedDatabase.prototype._addDBMethods = function(promise) {
        
        var originalThen = promise.then,
            that = this;
        
        function getDB() {
            return that._db;
        }
        function wrapThen() {
            /* jshint -W040 */
            var promise = originalThen.apply(this, arguments);
            return that._addDBMethods(promise);
            /* jshint +W040 */
        }
        
        Object.defineProperties(promise, {
            open: { value: that.open },
            execute: { value: that.execute },
            flush: { value: that.flush },
            close: { value: that.close },
            then: { value: wrapThen },
            _constructor: { value: that._constructor },
            _db: { get: getDB }
        });
        
        return promise;
    };
    
    function nodeToPromise(resolve, reject, err, value) {
        if (err) {
            reject(err);   
        } else {
            resolve(value);
        }
    }
    
    function callMethod(context, methodName, args) {
        return function() {
            return new context._constructor(function(resolve, reject) {
                args.push(nodeToPromise.bind(this, resolve, reject));
                context._db[methodName].apply(context._db, args);
            });
        };
    }
    
    module.exports = PromisedDatabase;
    
}());