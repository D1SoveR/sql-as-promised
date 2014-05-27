(function() {
    "use strict";
    
    /**
     * Container class for representing the rows returned from the SQLite database,
     * in a format that allows to work with them both via index-based retrieval and
     * by column names.
     * @constructor
     * 
     * @param {String[]} columns  List of column names, as ordered in the result
     * @param {String[]} values   List of values for given columns, in matching order
     */
    function Row(columns, values) {
        
        for (var i = 0; i < values.length; i++) {
            this[i] = this[columns[i]] = values[i];
        }
        
        Object.defineProperties(this, {
            "length": {
                "enumerable": false,
                "value": values.length
            },
            "_keys": {
                "enumerable": false,
                "value": Object.freeze(Array.prototype.slice.call(columns))
            }
        });
        Object.freeze(this);

    }
    
    /**
     * Result of the query on SQLite database, as returned by sql.js.
     * @typedef {Object} Result
     * @property {String[]} columns  List of columns retrieved in the query
     * @property {Array[]}  values   All the rows retrieved in the query, each item a list of fields
     */
    
    /**
     * Helper method to convert the entire sql.js result into array of rows.
     * @static
     *
     * @param   {Result} result  Result of SQL query to convert into row list
     * @returns {Row[]}          List of returned rows, converted into Row objects
     */
    Row.createFromResult = function(result) {
        
        if (result.columns && result.values) {
            return result.values.forEach(function(values) {
                return new Row(result.columns, values);
            });
        } else {
            return null;
        }

    };
    
    /** @borrows Array.every as Row.every */
    Row.prototype.every = Array.prototype.every;
    /** @borrows Array.filter as Row.filter */
    Row.prototype.filter = Array.prototype.filter;
    /** @borrows Array.forEach as Row.forEach */
    Row.prototype.forEach = Array.prototype.forEach;
    /** @borrows Array.indexOf as Row.indexOf */
    Row.prototype.indexOf = Array.prototype.indexOf;
    /** @borrows Array.lastIndexOf as Row.lastIndexOf */
    Row.prototype.lastIndexOf = Array.prototype.lastIndexOf;
    /** @borrows Array.map as Row.map */
    Row.prototype.map = Array.prototype.map;
    /** @borrows Array.reduce as Row.reduce */
    Row.prototype.reduce = Array.prototype.reduce;
    /** @borrows Array.reduceRight as Row.reduceRight */
    Row.prototype.reduceRight = Array.prototype.reduceRight;
    /** @borrows Array.slice as Row.slice */
    Row.prototype.slice = Array.prototype.slice;
    /** @borrows Array.some as Row.some */
    Row.prototype.some = Array.prototype.some;
    
    /** @exports Row */
    module.exports = Row;
    
}());