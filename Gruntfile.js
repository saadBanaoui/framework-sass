module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		config:{
			vendorsFilesToCopy : {src: 'bower_components/jquery/jquery.min.js', dest: 'www/scripts/jquery.min.js'},
			assetsFilesToCopy : {expand: true, cwd: 'assets/', src: ['**'], dest: 'www/'},
			filesToUglify : {'www/scripts/app.js': ['src/scripts/*.js']},
			folderToClean : ['build/*', 'www/*']
		},
		
		clean: {
			run: '<%= config.folderToClean %>'
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'build/css',
					imagesDir: 'src/assets/images',
					generatedImagesDir:    "build/images",
					generatedImagesPath:   "www/images",
					httpGeneratedImagesPath: "../images"

					//http_fonts_path: '../fonts'
				}
			}
		},
		
		
		connect: {
			server: {
				options: {
					port: 3000,
					base: 'www',
					livereload: true
		    }
		  }
		},
		
		assemble: {
			html: {
				options: {
					layout: 'src/assets/layout.html' 
				},
				src: ['*.html', '!layout.html'],
				dest: 'build/html/',
				expand: true,
				cwd: 'src/assets/'
			}
		},
			
		copy: {
			assets: {
				expand: true,
				cwd: 'src/assets/',
				src: ['**', '!*.html'],
				dest: 'www/'
			},
			html: {
				expand: true,
				cwd: 'build/html/',
				src: '*',
				dest: 'www/'
			},
			styles: {
				expand: true,
				cwd: 'build/css/',
				src: '*.css',
				dest: 'www/css/'
			},
			resources: {
				expand: true,
				cwd: 'bower_components/bootstrap/fonts',
				src: '*',
				dest: 'www/fonts/'
			}
		},
		
		watch: {
			options: {
				livereload: true
			},
			html: {
				files: 'src/assets/**/*.html',
				tasks: ['assemble:html', 'copy:html']
			},
			sass: {
				files: 'src/sass/**/*.scss',
				tasks: ['compass:dist', 'copy:styles']
			}
		}
	});
	

	/**
	 * loading npm tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-clean');;
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
   // grunt.loadNpmTasks('grunt-spritesmith');
	/**
   * register tasks
   */
	grunt.registerTask('default', ['run']);
	grunt.registerTask('build', ['compass', 'assemble']);
	grunt.registerTask('rebuild', ['clean', 'build']);
	grunt.registerTask('deploy', ['copy']);
	grunt.registerTask('redeploy', ['rebuild', 'deploy']);
	grunt.registerTask('run', ['rebuild', 'deploy', 'connect', 'watch']);
};