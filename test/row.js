(function() {
    "use strict";
    
    var chai = require("chai"),
        expect = chai.expect;
    
    describe("Row", function() {
       
        var Row = require("../lib/row.js");
        
        describe("creation", function() {
            
            var columns,
                fields;
            
            beforeEach(function() {
                columns = ["spam", "ham", "eggs", "bacon"];
                fields = ["one", "two", "three", "four"];
            });
           
            it("creates instance of Row", function() {

                var testRow = new Row(columns, fields);

                expect(testRow).to.be.instanceof(Row);
            });
            
            it("allows for accessing fields through index", function() {
                
                var testRow = new Row(columns, fields);
                
                expect(testRow).to.have.property(0, "one");
                expect(testRow).to.have.property(1, "two");
                expect(testRow).to.have.property(2, "three");
                expect(testRow).to.have.property(3, "four");
            });
            
            it("allows for accessing fields through column names", function() {
                
                var testRow = new Row(columns, fields);
                
                expect(testRow).to.have.property("spam", "one");
                expect(testRow).to.have.property("ham", "two");
                expect(testRow).to.have.property("eggs", "three");
                expect(testRow).to.have.property("bacon", "four");
            });
            
            it("provides length of the entire row", function() {
                
                var testRow = new Row(columns, fields);
                
                expect(testRow).to.have.length(4);
            });
            
            it("exposes only index and column names as keys", function() {
               
                var testRow = new Row(columns, fields);

                expect(testRow).to.have.keys(
                    "0", "1", "2", "3",
                    "spam", "ham", "eggs", "bacon"
                );
            });

        });
        
        xdescribe("modification", function() {
            
            var columns,
                fields;
            
            beforeEach(function() {
                columns = ["spam", "ham", "eggs", "bacon"];
                fields = ["one", "two", "three", "four"];
            });
            
            it("does not allow to modify any of the index properties");
            
            it("does not allow to modify any of the column name properties");
            
            it("does not allow to modify length");
            
        });
        
        xdescribe("generation from result", function() {
            
        });
        
        xdescribe("array methods", function() {
            
        });
        
    });
    
}());