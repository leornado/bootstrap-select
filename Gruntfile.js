module.exports = function (grunt) {

  // From TWBS
  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * Bootstrap-select v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' *\n' +
      ' * Copyright 2013-<%= grunt.template.today(\'yyyy\') %> bootstrap-select\n' +
      ' * Licensed under <%= pkg.license %> (https://github.com/leornado/bootstrap-select/tree/master/LICENSE)\n' +
      ' */\n',

    // Task configuration.

    clean: {
      css: 'dist/css',
      js: 'dist/js',
      docs: 'docs/docs/dist',
      tmp: 'dist/css/bootstrap-select-iconfont.css'
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        options: {
          'node': true
        },
        src: 'Gruntfile.js'
      },
      main: {
        src: 'js/*.js'
      },
      i18n: {
        src: 'js/i18n/*.js'
      }
    },

    concat: {
      options: {
        stripBanners: true
      },
      js: {
        files: [{ // main
          src : '<%= jshint.main.src %>',
          dest: 'dist/js/bootstrap-select.js'
        }, { // i18n
          expand: true,
          src   : '<%= jshint.i18n.src %>',
          dest  : 'dist/'
        }]
      },
      css: {
        files: [{ // iconfont
          src : ['<%= less.css.dest %>', 'dist/css/bootstrap-select-iconfont.css'],
          dest: '<%= less.css.dest %>'
        }]
      }
    },

    replace: {
      css: {
        options: {
          patterns: [{
            match      : /iconfont/g,
            replacement: 'bootstrap-select-iconfont'
          }]
        },
        files  : [{
          expand: true,
          cwd   : 'resources/css/iconfont/',
          src   : ['iconfont.css'],
          dest: 'dist/css/',
          rename: function (dest, src) {
            return dest + 'bootstrap-select-iconfont' +  src.substring(src.lastIndexOf('.'));
          }
        }]
      }
    },

    umd: {
      main: {
        options: {
          deps: {
            'default': ['jQuery'],
            amd: ['jquery'],
            cjs: ['jquery'],
            global: ['jQuery']
          }
        },
        src: '<%= concat.js.files[0].dest %>'
      },
      i18n: {
        options: {
          deps: {
            'default': ['jQuery'],
            amd: ['jquery'],
            cjs: ['jquery'],
            global: ['jQuery']
          }
        },
        src: 'dist/<%= jshint.i18n.src %>',
        dest: '.'
      }
    },

    uglify: {
      options: {
        preserveComments: function(node, comment) {
          return /^!|@preserve|@license|@cc_on/i.test(comment.value);
        }
      },
      main: {
        src: '<%= concat.js.files[0].dest %>',
        dest: 'dist/js/bootstrap-select.min.js',
        options: {
          sourceMap: true,
          sourceMapName: 'dist/js/bootstrap-select.js.map'
        }
      },
      i18n: {
        expand: true,
        src: 'dist/<%= jshint.i18n.src %>',
        ext: '.min.js'
      }
    },

    less: {
      options: {
        strictMath: true,
        sourceMap: true,
        outputSourceFiles: true,
        sourceMapURL: 'bootstrap-select.css.map',
        sourceMapFilename: '<%= less.css.dest %>.map'
      },
      css: {
        src: 'less/bootstrap-select.less',
        dest: 'dist/css/bootstrap-select.css'
      }
    },

    usebanner: {
      css: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= less.css.dest %>'
      },
      js: {
        options: {
          banner: '<%= banner %>'
        },
        src: [
          '<%= concat.js.files[0].dest %>',
          '<%= uglify.main.dest %>',
          'dist/<%= jshint.i18n.src %>',
        ]
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/docs/dist/'
      },
      iconfont: {
        expand: true,
        cwd: 'resources/css/iconfont/',
        src   : ['*.{eot,svg,ttf,woff,woff2}'],
        dest  : 'dist/css/',
        rename: function (dest, src) {
          return dest + 'bootstrap-select-iconfont' + src.substring(src.lastIndexOf('.'));
        }
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      css: {
        src: '<%= less.css.dest %>',
        dest: 'dist/css/bootstrap-select.min.css'
      }
    },

    csslint: {
      options: {
        'adjoining-classes': false,
        'box-sizing': false,
        'box-model': false,
        'compatible-vendor-prefixes': false,
        'floats': false,
        'font-sizes': false,
        'gradients': false,
        'important': false,
        'known-properties': false,
        'outline-none': false,
        'qualified-headings': false,
        'regex-selectors': false,
        'shorthand': false,
        'text-indent': false,
        'unique-headings': false,
        'universal-selector': false,
        'unqualified-attributes': false,
        'overqualified-elements': false
      },
      css: {
        src: '<%= less.css.dest %>'
      }
    },

    version: {
      js: {
        options: {
          prefix: 'Selectpicker.VERSION = \''
        },
        src: [
          'js/bootstrap-select.js'
        ],
      },
      cdn: {
        options: {
          prefix: 'ajax/libs/bootstrap-select/'
        },
        src: [
          'README.md',
          'docs/docs/index.md'
        ],
      },
      nuget: {
        options: {
          prefix: '<version>'
        },
        src: [
          'nuget/bootstrap-select.nuspec'
        ],
      },
      default: {
        options: {
          prefix: '[\'"]?version[\'"]?:[ "\']*'
        },
        src: [
          'composer.json',
          'docs/mkdocs.yml',
          'package.json'
        ],
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      css: {
        options: {
          map: true
        },
        src: '<%= less.css.dest %>'
      }
    },

    compress: {
      zip: {
        options: {
          archive: 'bootstrap-select-<%= pkg.version %>.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: '**',
            dest: 'bootstrap-select-<%= pkg.version %>/'
          }, {
            src: ['bower.json', 'composer.json', 'package.json'],
            dest: 'bootstrap-select-<%= pkg.version %>/'
          }
        ]
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: 'jshint:gruntfile'
      },
      js: {
        files: ['<%= jshint.main.src %>', '<%= jshint.i18n.src %>'],
        tasks: 'build-js'
      },
      less: {
        files: 'less/*.less',
        tasks: 'build-css'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  // Version numbering task.
  // to update version number, use grunt version::x.y.z

  // CSS distribution
  grunt.registerTask('build-css',
    ['clean:css', 'replace:css', 'less', 'autoprefixer', 'concat:css', 'usebanner:css', 'cssmin', 'copy:iconfont', 'clean:tmp']);

  // JS distribution
  grunt.registerTask('build-js', ['clean:js', 'concat:js', 'umd', 'usebanner:js', 'uglify']);

  // Copy dist to docs
  grunt.registerTask('docs', ['clean:docs', 'copy:docs']);

  // Development watch
  grunt.registerTask('dev-watch', ['build-css', 'build-js', 'watch']);

  // Full distribution
  grunt.registerTask('dist', ['build-css', 'build-js', 'compress']);

  // Default task.
  grunt.registerTask('default', ['build-css', 'build-js']);

};
