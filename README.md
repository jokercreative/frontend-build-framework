**PROJECT NAME**
========

Version
----
1.0


Developer
----
Jodie Walker


Tech
-----------

**PROJECT NAME** has been created with the following programs and assets:

* [Sublime Text] - text editor
* [SASS] - css preprocessor
* [Grunt] - automated JS task runner

[Sublime Text]:http://www.sublimetext.com/
[SASS]:http://sass-lang.com/
[Grunt]:http://gruntjs.com/


Installation
--------------

Install grunt and all other project dependencies via 
```sh
$ npm install
```


Developing
--------------

From the command line, simply run the default grunt task by using:
```sh
$ grunt
```
Browsersync will automatic open a window running a localhost. If not, check the grunt cmd window or you should be able to see the site running at `http://localhost:3000/`
The grunt tasks for development includes a watch and live reload feature.

All source/working files are under the `src` folder


Distribution/Deploy
--------------

When your ready to build out the files, use the following command:
```sh 
$ grunt production
```
This will run the following grunt commands:
```sh 
grunt.registerTask('production', [
	'clean',
	'processhtml',
	//'htmlmin',		
	'sass:dist',
	'autoprefixer',
	'cssmin',
	'concat:js',
	'uglify',	
	'imagemin',
	'copy'
]);
```
The site will be built into the `dist` folder with compressed HTML and images as well as minified JS and CSS