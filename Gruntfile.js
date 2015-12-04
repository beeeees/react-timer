///////////////////////////////////////////////
// Configuration Options
///////////////////////////////////////////////
var uglifyWhenWatching = false;
var sassOutputStyle = 'expanded'; // expanded | nested | compact | compressed

// Require any extras that we might need.
var fs = require('fs');

///////////////////////////////////////////////
// Helper Functions
///////////////////////////////////////////////
function merge(source, target) {
  for(var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
}

// Main Grunt section
module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          // jQuery
          'js/vendor/jquery-1.11.1.min.js',

          // Bootstrap
          'bootstrap/assets/javascripts/bootstrap.js',

          'js/vendor/react-with-addons.js',
          'js/vendor/react-dom.js',

          // Blanket Vendor Scripts
          'js/vendor/*.js',            // Include rest of vendor scripts in no particular order.
          '!js/vendor/html5shiv.js', // [!] Needs to be in the head to work properly.
          '!js/vendor/respond.min.js', // [!] Needs to be in the head to work properly.


          'js/build/*.js',        // All .js files.
          'js/build/scripts.js',  // Add the scripts.js file last.
          '!js/build/all.js',
        ],
        dest: 'js/build/all.js',
      },
    },
    sass: {
      dist: {
        options: {
          style: sassOutputStyle
        },
        files: {
          'css/styles.css': 'sass/main.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: [
          // Run the concat task when any of these files change:
          'js/build/**/*.js',    // all of the .js files
          '!js/build/all.js' // [!] We don't want to watch the generated file.
        ],
        tasks: ['concat']
      },
      css: {
        // Run the sass task when any of these files change:
        files: [
          'sass/**/*.scss'  // all of the .scss files.
        ],
        tasks: ['sass']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            // Livereload when any of these files change:
            'css/**/*.css',      // compiled CSS
            'js/**/all*.js',     // concatenated/minified JS
            '**/*.html',         // any HTML files
            '**/*.php'           // any PHP files
          ]
        },
        options: {
          watchTask: true,
          server: './',
          port: 8000,
          snippetOptions: {
            // Inject the snippet at the end of the body tag.
            // this helps with issues related to IE conditional
            // comments getting in the way.
            rule: {
              match: /<\/body>/i,
              fn: function (snippet, match) {
                return snippet + match;
              }
            }
          }
        }
      }
    }
  };


  ///////////////////////////////////////////////
  // Tasks
  ///////////////////////////////////////////////
  var defaultTasks = [
    'browserSync',
    'concat',
    'sass'
  ];


  ///////////////////////////////////////////////
  // Conditional for Babel
  ///////////////////////////////////////////////
  var babelConfig = {
    babel: {
      options: {
        presets: ['react', 'es2015']
      },
      files: {
        expand: true,
        flatten: true,
        src: [
          'js/src/*.es6',
          'js/src/*.jsx'
        ],
        dest: 'js/build/',
        ext: '.js'
      }
    }
  };
  var babelWatch = {
    babel: {
      files: [
        'js/src/**.es6',
        'js/src/**.jsx'
      ], // Watch the babel files.
      tasks: ['babel'] // Run the babel processor.
    }
  };
  merge(babelConfig, config); // Add the babel configuration.
  merge(babelWatch, config.watch); // Add the babel watcher.
  defaultTasks.unshift('babel');
  grunt.loadNpmTasks('grunt-babel');


  ///////////////////////////////////////////////
  // Conditional for Uglification
  ///////////////////////////////////////////////
  if(uglifyWhenWatching){
    var uglifyConfig = {
      uglify: {
        dist: {
          files: {
            'js/build/all.min.js': ['js/build/all.js']
          }
        }
      }
    };
    merge(uglifyConfig, config); // Add the uglify configuration.
    config.watch.scripts.tasks.push('uglify'); // Add uglify to the concat watcher.
    defaultTasks.push('uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  }


  ///////////////////////////////////////////////
  // Where we tell Grunt we plan to use
  // the plug-ins configured above
  ///////////////////////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');


  // Initialize the Grunt configuration
  grunt.initConfig(config);


  ///////////////////////////////////////////////
  // What will initialize when we type
  // "grunt" into the terminal.
  ///////////////////////////////////////////////
  //
  // grunt
  // grunt uglify - to minify the JavaScript
  //
  // Minification of JavaScript is kept separate to keep the
  // save -> refresh cycle fast. Run `grunt uglify` before switching
  // the all.js script tag to all.min.js

  defaultTasks.push('watch'); // Watch blocks, so it must be pushed last.
  grunt.registerTask('default', defaultTasks);
};
