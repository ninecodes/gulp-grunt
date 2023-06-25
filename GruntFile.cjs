/* the file ending .cjs stands for "common js", which refers to the old node.js syntax.
This file ending is needed because the type is currently "module" in the package.json file - 
which is not compatible to the old syntax. see documentation here: https://nodejs.org/docs/latest-v16.x/api/esm.html#esm_enabling */

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Project configuration.
  grunt.initConfig({
    /**
     * Uglify Images
     */
    imagemin: {
      jpgs: {
        options: {
          progressive: true,
        },
        files: [
          {
            expand: true,
            cwd: 'src/images',
            src: ['*.jpg'],
            dest: 'dist/grunt/images/',
          },
        ],
      },
    },
    /**
     * Copy Task
     */
    copy: {
      dist: {
        files: [
          // Html Files
          {
            expand: true,
            cwd: 'src',
            src: '*.html',
            dest: 'dist/grunt',
          },
        ],
      },
    },
    /**
     * SASS
     */
    sass: {
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'dist/grunt/styles.css': 'src/scss/styles.scss', // 'destination': 'source'
        },
      },
    },
    /**
     * JS
     */
    uglify: {
      dist: {
        files: {
          'dist/grunt/main.js': ['src/js/main.js'], // 'destination': 'source'
        },
      },
    },
  });

  // Load task in following order
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['imagemin', 'copy', 'sass', 'uglify']);

  /*******************************************************************/
  /**Parallel tasks -> https://www.npmjs.com/package/grunt-concurrent **/
  /*******************************************************************/
};
