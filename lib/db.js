(function() {
    "use strict";

    var fs = require("fs"),
        Row = require("./row"),
        SQL = require("sql.js");

    /**
     * SQLite database connection, wrapping the sql.js library into handler with
     * node-style asynchronous callbacks and simple interface for accessing the results.
     * @constructor
     *
     * @param {String} [filePath]  Path to the SQLite database file; if not provided, new database will be opened in memory
     */
    function Database(filePath) {

        this.filePath = filePath;
    }

    /**
     * Path of the opened SQLite database, if opening existing file.
     * If not set, indicates the new database has been opened in memory.
     * @property {?String}
     */
    Database.prototype.filePath = null;

    /**
     * Internal reference to sql.js database object, on which all the methods
     * are executed. Should not be modified directly.
     */
    Database.prototype._dbConnection = null;

    /**
     * Node-style callback, passing state of success and failure both by having the
     * possible error as first parameter, or null in case of success.
     * @callback NodeCallback
     *
     * @param {?Error} err       Error indicating reason for async function failure, null for success
     * @param {*}      [result]  Result returned by async function, if any result is relevant to the call
     */

    /**
     * Opens the database, either by reading the existing file from the disk and loading it into memory
     * (if file path has been given at construction) or by creating a new database in the memory (if no
     * file path has been given).
     *
     * @param {NodeCallback} callback  Node-style callback, with no result
     */
    Database.prototype.open = function(callback) {

        if (this._dbConnection) {
            callback(new Error("Database already opened."));
            return;
        }

        if (!this.filePath) {

            this._dbConnection = new SQL.Database();
            callback(null);

        } else {

            fs.readFile(this.filePath, function(err, data) {
                if (err) {
                    callback(err);
                } else {
                    this._dbConnection = new SQL.Database(data);
                    callback(null);
                }
            });

        }
    };

    /**
     * Executes given query against the database, optionally with parameters,
     * processing the result and, if the query is intended to return the rows,
     * returning the array of Rows, carrying the retrieved data.
     *
     * @param {String}       query     SQL query to execute against the database
     * @param {?Object}      params    Values to bind to parameterised query, if any parameters were included
     * @param {NodeCallback} callback  Node-style callback, with result being the array of Rows from query result
     */
    Database.prototype.execute = function(query, params, callback) {

        if (!this._dbConnection) {
            callback(new Error("No database opened."));
            return;
        }

        try { callback(null, this._runQuery(query, params)); }
        catch (err) { callback(err); }
    };

    /**
     * Saves the current state of the database into given file.
     * If given specific path, saves to that location, otherwise,
     * saves to the same location database was opened from.
     *
     * @param {String}       [filePath]  Path to save the database to, uses opening path if not provided
     * @param {NodeCallback} callback    Node-style callback with no result
     */
    Database.prototype.flush = function(filePath, callback) {

        if (!this._dbConnection) {
            callback(new Error("No database opened."));
            return;
        }

        if (!filePath) {
            callback = filePath;
            filePath = this.filePath;
        }

        if (!filePath) {
            callback(new Error("No location to save the database given."));
        }

        var data = new Buffer(this._dbConnection.export());
        fs.writeFile(filePath, data, callback);
    };

    /**
     * Closes the currently opened database.
     * After the database is closed, all attempts to query it will fail.
     *
     * @param {NodeCallback} callback  Node-style callback with no result
     */
    Database.prototype.close = function(callback) {

        if (!this._dbConnection) {
            callback(new Error("No database opened."));
            return;
        }

        this._dbConnection = null;
        callback(null);
    };

    /**
     * Executes the given query with optional parameters against the database,
     * either returning the list of Rows representing the query result or throwing an error.
     * @private
     *
     * @param   {String}  query   Query to execute against the database
     * @param   {?Object} params  Optional parameters to bind to the query (if parameters are used)
     * @throws  {Error}           SQL query fails for some reason
     * @returns {Row[]}           List of rows returned by the query (or empty array if no result)
     */
    Database.prototype._runQuery = function(query, params) {

        var columns,
            result = [],
            statement = this._dbConnection.prepare(query, params),
            values;

        while (statement.step()) {
            columns = columns || statement.getColumnNames();
            values = statement.get();
            result.push(new Row(columns, values));
        }

        statement.free();
        return Object.freeze(result);
    };

    /** @exports Database */
    module.exports = Database;

}());
