module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        jshint: {
          all: ['js/*.js', 'js/*!min.js', '!js/jquery.md5.js','!js/zepto.min.js']
        },
		watch: {
			script: {
				files: ["js/*.js", "**/**/**.js", "!js/*.min.js"],
				tasks: ["jshint"],
				options: {  
                    debounceDelay: 250  
                }  	
			},
            uglify: {
                files: ["js/*.js", "*/*/*.js", "!js/*.min.js", "!js/city.js"],
                tasks: ["uglify"],
                options: {
                    debounceDelay: 250
                }
            },
			compass: {
				files: ["sass/*.scss"],
				tasks: ["compass"],
				options: {
					debounceDelay: 250
				}
			},
            cssmin: {
                files: ["stylesheets/*.css"],
                tasks: ["cssmin"],
                options: {
                    debounceDelay:250
                }
            }
		},
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                files:{
                    "dist/jquery.md5.js":[ "js/jquery.md5.js" ],
                    "dist/zepto.min.js":[ "js/zepto.min.js" ],
                    "dist/score.js":["js/widget.js", "js/score.js" ]
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'stylesheets',
                src: ['*.css', '!*.min.css'],
                dist: 'dist',
                ext: '.min.css'
            }

        },
		compass: {
			dist:{
				options: {
					config: 'config.rb'
				}
			}
		},
		copy: {
            main: {
                files: [
                    {expand: true, src: ['stylesheets/score.css*'], dist: 'project2/', filter: 'isFile'},
                    {expand: true, src: ['dist/zepto.min.js'], dist: 'project2/'},
                    {expand: true, src: ['dist/jquery.md5.js'], dist: 'project2/'},
                    {expand: true,  src: ['dist/score.js'], dist: 'project2/'},
                    {expand: true, src: ['images/**/*'], dist: 'project2/', filter: 'isFile'},
                    {expand: true, src: ['returnscore.html'], dist: 'project2/', filter: 'isFile'},
                    {expand: true, src: ['scoreactivity.html'], dist: 'project2/', filter: 'isFile'}
                ]
            }
        }/*,
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**//*.{png,jpg,gif}'],
                    dist: 'images'
                }]
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                   // paths：js源码位置；
                    //themedir：文档模板位置；
                    //outdir：文档输出位置。
                    paths: 'js/',
                    themedir: 'theme/',
                    outdir: 'docs/'
                }
            }
        }*/
    });
    

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.registerTask('default', [ 'uglify', 'jshint', 'watch', 'cssmin', 'compass', 'copy']);
}; 