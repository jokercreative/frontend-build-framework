'use strict';
module.exports = function (grunt) {
	var globalConfig = {
    	src: "src",
    	dist: "dist",
    	assets: "assets",
    	includes: "includes",
    	scss: "<%= globalConfig.assets %>/scss",
    	css: "<%= globalConfig.assets %>/css",
    	js: "<%= globalConfig.assets %>/js",
    	images: "<%= globalConfig.assets %>/images",
    	fonts: "<%= globalConfig.assets %>/fonts",
    	bower: "<%= globalConfig.assets %>/vendor"
    }

    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	globalConfig: globalConfig,


    /**
     * Shell Commands
     * @github.com/sindresorhus/grunt-shell
     */
    shell: {
      bowerinstall: {
        command: function () {
          return 'bower install -S --allow-root';
        }
      },
      bowerupdate: {
        command: function () {
          return 'bower update';
        }
      }
    },


    /**
     * Delete and Clean Folder
     * @github.com/gruntjs/grunt-contrib-clean
     */
    clean: {
      dist: ["<%= globalConfig.dist %>"],
      bower: ["<%= globalConfig.src %>/<%= globalConfig.bower %>"]
    },

    /**
     * Includes
     * @github.com/vanetix/grunt-includes
     */
    includes: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/',
          src: [
            '**/*.html',
            '!assets/**/*.html',
            '!includes/**/*.html'
          ],
          dest: '<%= globalConfig.dist %>/',
          ext: '.html'
        }]
      }
    },


	  /**
		 * Sass compiling
		 * @github.com/gruntjs/grunt-contrib-sass
		 */
		sass: {
	    compile: {
	    	options: {
	    		// style: "compressed",
	    		//trace: true,
	    		//debugInfo: true
	    	},
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/<%= globalConfig.scss %>',
          src: '*.scss',
          dest: '<%= globalConfig.dist %>/<%= globalConfig.css %>',
          ext: '.css'
        }]
	    },
		},
		/**
     * Post Processer for CSS
     * @github.com/ndmitry/grunt-postcss
     */
    postcss: {
      options: {
        map: false,
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({ browsers: [, 'IE 8', 'IE 9', 'last 2 versions'] }), // add vendor prefixes
          require('postcss-opacity')() // add opacity filter for IE8
        ]
      },
      dist: {
        src: '<%= globalConfig.dist %>/<%= globalConfig.css %>/*.css'
      }
    },

    /**
     * CSS Strip Comments
     * @github.com/sindresorhus/grunt-strip-css-comments
     */
    stripCssComments: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.dist %>/<%= globalConfig.css %>',
          src: ['**/*.css'],
          dest: '<%= globalConfig.dist %>/<%= globalConfig.css %>',
          ext: '.css'
        }]
      }
    },

    /**
     * CSS Beautify
     * @github.com/senchalabs/cssbeautify
     */
    cssbeautifier: {
      files: ['<%= globalConfig.dist %>/<%= globalConfig.css %>/*.css'],
      options: {
        indent: '  ',
        openbrace: 'end-of-line',
        autosemicolon: true
      }
    },

    /**
     * Bower Copy
     * @github.com/timmywil/grunt-bowercopy
     */
    bowercopy: {
      global: {
        options: {
            destPrefix: '<%= globalConfig.dist %>/<%= globalConfig.js %>/vendor'
        },
        files: {
          'jquery.js': 'jquery/dist/jquery.js',
          'fontfaceobserver.js': 'fontfaceobserver/fontfaceobserver.js',
        }
      },
      polyfill: {
        options: {
          destPrefix: '<%= globalConfig.dist %>/<%= globalConfig.js %>/vendor/polyfill'
        },
        files: {
          'html5shiv-printshiv.js': 'html5shiv/dist/html5shiv-printshiv.js',
          'html5shiv.js': 'html5shiv/dist/html5shiv.js',
          'respond.js': 'respond/dest/respond.src.js'
        }
      },
      css: {
        options: {
          destPrefix: '<%= globalConfig.dist %>/<%= globalConfig.css %>'
        },
        files: {
          'normalize.css': 'normalize.css/normalize.css'
        }
      }
    },



		/**
		 * Concatenate
		 * @github.com/gruntjs/grunt-contrib-concat
		 */
		concat: {
      js: {
            src: [
              '<%= globalConfig.src %>/<%= globalConfig.js %>/*/*.js',
              '!<%= globalConfig.dist %>/<%= globalConfig.js %>/vendor/*.js',
            ],
            dest: '<%= globalConfig.dist %>/<%= globalConfig.js %>/script.pkg.min.js'
        },
		    plugins: {
		        src: [
		          '<%= globalConfig.dist %>/<%= globalConfig.js %>/vendor/jquery.js',
		        ],
		        dest: '<%= globalConfig.dist %>/<%= globalConfig.js %>/plugins.pkg.min.js'
		    }
		},


		/**
		 * Uglify
		 * @github.com/gruntjs/grunt-contrib-uglify
		 */
		uglify: {
			options: {
				// banner: '<%= banner %>'
			},

			// Minify js files in js/src/
			dist: {
				src: ['<%= globalConfig.dist %>/<%= globalConfig.js %>/scripts.pkg.min.js'],
				dest: '<%= globalConfig.dist %>/<%= globalConfig.js %>/scripts.pkg.min.js'
			},
		},

		/**
     * JS Hint
     * @github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      js: {
        files: {
          src: [
            '<%= globalConfig.src %>/<%= globalConfig.js %>/*/*.js',
            '!<%= globalConfig.src %>/<%= globalConfig.js %>/polyfill/*.js',
            '!<%= globalConfig.src %>/<%= globalConfig.js %>/vendor/*.js',
          ],
        },
      },
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
    },

		/**
     * Copy Files or Directories
     * @github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      fonts: {
        files: [{
          cwd: '<%= globalConfig.src %>/<%= globalConfig.fonts %>',
          src: '**/*',
          dest: '<%= globalConfig.dist %>/<%= globalConfig.fonts %>',
          expand: true
        }]
      },
      images: {
        files: [{
          cwd: '<%= globalConfig.src %>/<%= globalConfig.images %>',
          src: '**/*',
          dest: '<%= globalConfig.dist %>/<%= globalConfig.images %>',
          expand: true
        }]
      },
		},



		/**
		 * Watch
		 * @github.com/gruntjs/grunt-contrib-watch
		 */
		watch: {
			//Compile HTML
      html: {
        files: ['<%= globalConfig.src %>/**/*.html'],
        tasks: ['includes'],
        options: {
          spawn: false,
        }
      },

      //Compile SASS
      css: {
        files: ["<%= globalConfig.src %>/<%= globalConfig.scss %>/**/*.scss"],
        tasks: ['sass', 'postcss', 'stripCssComments', 'cssbeautifier'],
        options: {
          spawn: false,
        }
      },

      //Compile JS
      js: {
        files: '<%= globalConfig.src %>/<%= globalConfig.js %>/**/*.js',
        tasks: ['jshint', 'concat'],
        options: {
          spawn: false,
        }
      },

      //Move Images
      images: {
        files: [
          "<%= globalConfig.src %>/<%= globalConfig.assets %>/images/**/*.*"
        ],
        tasks: ["copy:images"],
        options: {
          nospawn: true
        }
      }
		},


		/**
     * browser_sync
     * @github.com/browser_sync/grunt-browser-sync
     */
    browserSync: {
      bsFiles: {
        src: [
        '<%= globalConfig.dist %>/<%= globalConfig.css %>/*.css',
        '<%= globalConfig.dist %>/<%= globalConfig.js %>/*.js',
        '<%= globalConfig.dist %>/**/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: '<%= globalConfig.dist %>'
        }
      }
    },


		/**
		* grunt-string-replace
		* @github.com/erickrdch/grunt-string-replace
		*/
		'string-replace': {
			dist: {
			    files: [{ expand: true, cwd: 'dist/assets/css', src: '**/*', dest: 'dist/assets/css' }],
			    options: {
			      replacements: [{
			        pattern: /..\/images\//gi,
			        replacement: 'mysource_files/'
			      }]
			    }
		  	}
		}
    });

	require('load-grunt-tasks')(grunt);

	/**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'clean',
    'shell:bowerinstall',
    'bowercopy',
    'sass',
    'postcss',
    'stripCssComments',
    'cssbeautifier',
    'includes',
    'copy',
    'concat',
    'browserSync',
    'watch'
  ]);

  /**
   * Production Task
   * run `grunt`
   */
  grunt.registerTask('prod', [
    'clean',
    'shell:bowerinstall',
    'bowercopy',
    'sass',
    'postcss',
    'stripCssComments',
    'cssbeautifier',
    'includes',
    'copy',
    'concat'
  ]);

  /**
   * Squiz Matrix Build Task
   * run `grunt matrix`
   */
  grunt.registerTask('matrix', [
    'clean',
    'shell:bowerinstall',
    'sass',
    'postcss',
    'copy',
    'bowercopy',
    'concat',
    'string-replace',
    'stripCssComments',
    'cssbeautifier',
    'includes',
    'uglify'
  ]);

  /**
   * Squiz Matrix Build Task
   * run `grunt matrix`
   */
  grunt.registerTask('matrix-raw', [
    'clean',
    'shell:bowerinstall',
    'sass',
    'postcss',
    'copy',
    'bowercopy',
    'concat',
    'string-replace',
    'stripCssComments',
    'cssbeautifier',
    'includes'
  ]);
};