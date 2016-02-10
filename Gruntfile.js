module.exports = function(grunt) {

    grunt.initConfig({
        "jsbeautifier": {
            files: ["app/**/*.js", "config/**/*.js", "Gruntfile.js", "server.js"],
            options: {}
        },
        watch: {
            files: ['<%= jsbeautifier.files %>'],
            tasks: ['jsbeautifier']
        }
    });

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jsbeautifier', 'watch']);

};
