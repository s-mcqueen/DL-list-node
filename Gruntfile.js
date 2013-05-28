module.exports = function(grunt){
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
            prod: {
                options: {
                  file: 'app.js',
                  ignoredFiles: ['README.md', 'node_modules/**'],
                }
            },
        },
        jshint: {
            all: ['*.js']
        }

    });

    // load tasks
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // running tasks
    grunt.registerTask('default', ['jshint', 'nodemon']);

};
