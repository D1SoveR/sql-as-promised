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
        
        describe("modification", function() {
            
            var columns,
                fields;
            
            beforeEach(function() {
                columns = ["spam", "ham", "eggs", "bacon"];
                fields = ["one", "two", "three", "four"];
            });
            
            it("does not allow for modification any of the index properties", function() {

                var testRow = new Row(columns, fields);

                expect(function() { testRow[0] = "notOne";   }).to.throw(TypeError, /Cannot assign to read only property/);
                expect(function() { testRow[1] = "notTwo";   }).to.throw(TypeError, /Cannot assign to read only property/);
                expect(function() { testRow[2] = "notOhree"; }).to.throw(TypeError, /Cannot assign to read only property/);
                expect(function() { testRow[3] = "notFour";  }).to.throw(TypeError, /Cannot assign to read only property/);
                
                expect(function() { delete testRow[0]; }).to.throw(TypeError, /Cannot delete property/);
                expect(function() { delete testRow[1]; }).to.throw(TypeError, /Cannot delete property/);
                expect(function() { delete testRow[2]; }).to.throw(TypeError, /Cannot delete property/);
                expect(function() { delete testRow[3]; }).to.throw(TypeError, /Cannot delete property/);
            });
            
            it("does not allow for addition of new index properties", function() {

                var testRow = new Row(columns, fields);
                
                expect(function() { testRow[-1] = "zero"; }).to.throw(TypeError, /Can\'t add property/);
                expect(function() { testRow[4] = "five";  }).to.throw(TypeError, /Can\'t add property/);
            });
            
            it("does not allow for modification of any of the column name properties", function() {
                
                var testRow = new Row(columns, fields);

                expect(function() { testRow.spam = "notOne";    }).to.throw(TypeError, /Cannot assign to read only property/);
                expect(function() { testRow.ham = "notTwo";     }).to.throw(TypeError, /Cannot assign to read only property/);
                expect(function() { testRow.eggs = "notOhree";  }).to.throw(TypeError, /Cannot assign to read only property/);
                expect(function() { testRow.bacon = "notFour";  }).to.throw(TypeError, /Cannot assign to read only property/);
                
                expect(function() { delete testRow.spam;  }).to.throw(TypeError, /Cannot delete property/);
                expect(function() { delete testRow.ham;   }).to.throw(TypeError, /Cannot delete property/);
                expect(function() { delete testRow.eggs;  }).to.throw(TypeError, /Cannot delete property/);
                expect(function() { delete testRow.bacon; }).to.throw(TypeError, /Cannot delete property/);
            });
            
            it("does not allow for addition of new named properties", function() {
                
                var testRow = new Row(columns, fields);
                
                expect(function() { testRow.test = "zero";     }).to.throw(TypeError, /Can\'t add property/);
                expect(function() { testRow.toString = "five"; }).to.throw(TypeError, /Can\'t add property/);
            });
            
            it("does not allow for change to length", function() {
                
                var testRow = new Row(columns, fields);
                
                expect(function() { testRow.length = 2; }).to.throw(TypeError, /Cannot assign to read only property/);
            });
            
        });
        
        xdescribe("generation from result", function() {
            
        });
        
    });
    
}());