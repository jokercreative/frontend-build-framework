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
    }

    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	globalConfig: globalConfig, 


    	/**
	     * Set banner
	     */
	    banner: '/**\n' +
	    '<%= pkg.title %> - <%= pkg.version %>\n' +
	    '<%= pkg.homepage %>\n' +
	    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
	    'License: <%= pkg.license %>\n' +
	    '*/\n',


    	/**
		 * Process HTML
		 * @github.com/dciccale/grunt-processhtml
		 */		
		processhtml: {
			build: {
				options: {
		        	process: true,
			    },
				files: [{
				   expand: true,
				   cwd: '<%= globalConfig.src %>/',
				   src: ['*.html'],
				   dest: '<%= globalConfig.dist %>/',
				   ext: '.html'
				}]
			}
	    },


	    /**
		 * HTML Minify
		 * @github.com/gruntjs/grunt-contrib-htmlmin
		 */		
		htmlmin: {
		   dist: {
		      options: {
		         removeComments: true,
		         collapseWhitespace: true,
		         minifyJS: true,
		         minifyCSS: true
		      },
		      files: [{
		         expand: true,
		         cwd: '<%= globalConfig.src %>',
		         src: '**/*.html',
		         dest: '<%= globalConfig.dist %>'
		      }]
		   }
		},


	    /**
		 * Sass compiling
		 * @github.com/gruntjs/grunt-contrib-sass
		 */		
		sass: {
		    dev: {
		    	options: {
		    		style: "compressed",
		    		//trace: true,
		    		//debugInfo: true
		    	},
		        files: {
		            "<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css" : "<%= globalConfig.src %>/<%= globalConfig.scss %>/styles.scss"
		        }
		    },

		    dist: {
		    	options: {
		    		style: "compressed",
		    	},
		        files: {
		            "<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css" : "<%= globalConfig.src %>/<%= globalConfig.scss %>/styles.scss"
		        }
		    },
		},


		/**
		 * CSS Auto Prefixer
		 * @github.com/nDmitry/grunt-autoprefixer
		 */		
		autoprefixer: {
		  	options: {
		    	browsers : ['> 5%', 'last 2 version', 'ie 8', 'ie 9']
		  	},
		  	dist : {
				files : {
					'<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css' : '<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css'
				}

			}
		},


		/**
		 * CSS Strip Comments
		 * @github.com/sindresorhus/grunt-strip-css-comments
		 */	
		stripCssComments: {
	        dist: {
	            files: {
	                '<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css': '<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css'
	            }
	        }
	    },


	    /**
		 * CSS Beautify
		 * @github.com/senchalabs/cssbeautify
		 */
	    cssbeautifier : {
		  	files : ['<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css'],
            options : {
				indent: '  ',
			    openbrace: 'end-of-line',
			    autosemicolon: true
			}
		},


		/**
		 * CSS Minify
		 * @github.com/gruntjs/grunt-contrib-cssmin
		 */		
		cssmin: {
		  css: {
		    options: {
		      keepSpecialComments: 0
		    },
		    files:{
		      '<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.min.css':'<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css'
		    }
		  },
		},


		/**
		 * Concatenate
		 * @github.com/gruntjs/grunt-contrib-concat
		 */		
		concat: {
		    js: {
		        src: [
		            '<%= globalConfig.src %>/<%= globalConfig.js %>/vendor/jquery-1.11.1.js',
		            '<%= globalConfig.src %>/<%= globalConfig.js %>/vendor/*.js',
		            '<%= globalConfig.src %>/<%= globalConfig.js %>/main.js'
		        ],
		        dest: '<%= globalConfig.dist %>/<%= globalConfig.js %>/scripts.pkg.min.js'
		    }
		},


		/**
		 * Uglify
		 * @github.com/gruntjs/grunt-contrib-uglify
		 */		
		uglify: {
			options: {
				banner: '<%= banner %>'
			},

			// Minify js files in js/src/
			dist: {
				src: ['<%= globalConfig.dist %>/<%= globalConfig.js %>/scripts.pkg.min.js'],
				dest: '<%= globalConfig.dist %>/<%= globalConfig.js %>/scripts.pkg.min.js'
			},
		},


		/**
		 * Image Minify
		 * @github.com/gruntjs/grunt-contrib-imagemin
		 */		
		imagemin: {
			dist: {
				options: {
			  		optimizationLevel: 7
				},
				files: [{
				   expand: true,
				   cwd: '<%= globalConfig.src %>/<%= globalConfig.images %>',
				   src: ['**/*.{png,jpg,gif}'],
				   dest: '<%= globalConfig.dist %>/<%= globalConfig.images %>='
				}]
			}
		},


		/**
		 * Copy Files or Directories
		 * @github.com/gruntjs/grunt-contrib-copy
		 */		
		copy: {
			main: {
				files: [{
					expand: true, 
					src: '<%= globalConfig.src %>/<%= globalConfig.fonts %>/*', 
					dest: '<%= globalConfig.dist %>/<%= globalConfig.fonts %>/'
					},
				],
			},
		},


		/**
		 * Delete and Clean Folder
		 * @github.com/gruntjs/grunt-contrib-clean
		 */		
		clean: ["<%= globalConfig.dist %>"],


		/**
		 * Watch
		 * @github.com/gruntjs/grunt-contrib-watch
		 */		
		watch: {
			html: {
				files: ["<%= globalConfig.src %>/*.html","<%= globalConfig.src %>/includes/*.html"],
				tasks: ['processhtml'],
				options: {
					spawn: false,
				}
			},
			// Compile Sass dev on change
			css: {
				files: ["<%= globalConfig.src %>/<%= globalConfig.scss %>/*.scss", "<%= globalConfig.src %>/<%= globalConfig.scss %>/**/*.scss"],
				tasks: ['sass:dev', 'autoprefixer', 'stripCssComments', 'cssbeautifier'],
				options: {
					spawn: false,
				}
			},

			//
			js: {
				files: '<%= globalConfig.src %>/<%= globalConfig.js %>/main.js',
				tasks: ['concat:js'],
				options: {
					spawn: false,
				}
			},
		},


		/**
		* BrowserSync
		* @github.com/BrowserSync/grunt-browser-sync
		*/		
		browserSync : {
			bsFiles : {
				src : [
				'<%= globalConfig.dist %>/<%= globalConfig.css %>/styles.css', 
				'<%= globalConfig.src %>/<%= globalConfig.js %>/main.js', 
				'<%= globalConfig.dist %>/*.html'
				]
			},
			options : {
				watchTask : true,
				server: {
			      baseDir: '<%= globalConfig.dist %>'
			    }				
			}
		},
    });

	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-strip-css-comments');
	grunt.loadNpmTasks('grunt-cssbeautifier');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	/**
	* Default Task
	* run `grunt`
	*/
	grunt.registerTask('default', [
		'clean',
		'sass:dev', 
		'autoprefixer',
		'cssbeautifier',
		'concat:js',
		'processhtml',
		'browserSync',
		'watch'
	]);


	/**
	* Production Task
	* run `grunt production`
	*/
	grunt.registerTask('production', [
		'clean',
		'processhtml',	
		'sass:dist',
		'autoprefixer',
		'cssmin',
		'concat:js',
		'uglify',	
		'imagemin',
		'copy'
	]);
};