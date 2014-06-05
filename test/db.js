(function() {
    "use strict";

    var chai = require("chai"),
        expect = chai.expect;

    describe("Database", function() {

        var Database = require("../lib/db.js");

        describe("database", function() {

            xit("opens the new database in memory", function() {


            });

            xit("successfully opens the existing database from file", function() {


            });

            xit("saves the new database to specified location on disk", function() {


            });

            xit("fails to save the new database if not given the location", function() {


            });

            xit("saves the existing database to specified location on disk", function() {


            });

            xit("saves the existing database to its old location of not given an explicit one", function() {


            });

            xit("closes the opened database without issues", function() {


            });

            xit("re-opens existing database after saving and closing", function() {


            });

        });

        describe("queries", function() {

            xit("executes simple queries", function() {


            });

            xit("executes queries with parameters", function() {


            });

            xit("fails if the query would throw a SQL error", function() {


            });

            xit("gives empty array as result for non-returning queries", function() {


            });

            xit("gives array of rows as result for returning queries", function() {


            });

            xit("does not allow the returned array of rows to be modified", function() {


            });

        });

    });

}());
