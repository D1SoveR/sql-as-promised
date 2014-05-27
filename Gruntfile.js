module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.initConfig({
        
        mochaTest: {
            
            all: {
                options: { reporter: "spec" },
                src: ["test/**/*.js"]
            }

        }

    });

    grunt.registerTask("test", "mochaTest:all");
    grunt.registerTask("default", "test");

};