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

        columns = Object.isFrozen(columns) ? columns : Object.freeze(Array.prototype.slice.call(columns));
        Object.defineProperties(this, {
            "length": {
                "enumerable": false,
                "value": values.length
            },
            "_keys": {
                "enumerable": false,
                "value": columns
            }
        });
        Object.freeze(this);

    }

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
