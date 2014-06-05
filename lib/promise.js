(function() {
    "use strict";
    
    var Database = require("./db");
    
    function PromisedDatabase(filePath, PromiseConstructor) {
        
        PromiseConstructor = PromiseConstructor || PromisedDatabase.guessPromise();
        
        this._db = new Database(filePath);
        this._promise = PromiseConstructor ?
            this._addDBMethods(new PromiseConstructor(function(resolve) { resolve(); })) :
            PromisedDatabase._noPromisesThenable;

        this.then = this._promise.then.bind(this._promise);
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
        
        // Native ES6 Promises
        if (Promise && typeof Promise === "function") {
            return Promise;
        }
        
        return null;
    };

    // TODO: Actually implement addition of these methods to promises
    PromisedDatabase.prototype._addDBMethods = function(promise) {
        return promise;
    };
    
    module.exports = PromisedDatabase;
    
}());