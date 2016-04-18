module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      js: {
        files: [
          'src/**'
        ],
        tasks: [
          'default',
        ]
      }
    },
    includes: {
      files: {
        src: ['src/*.html', 'src/partials/*.html'], // Source files
        dest: 'dist', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: false
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: false, src: ['**'], dest: 'dist/vendor/', cwd:'src/vendor'},
          {expand: true, flatten: false, src: ['**'], dest: 'dist/js/', cwd:'src/js', filter: ''},
          {expand: true, flatten: false, src: ['**'], dest: 'dist/css/', cwd:'src/css/', filter: ''}
        ],
        options: {

        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['includes', 'copy']);
}