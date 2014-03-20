module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'app/**/*.js',
        'public/**/*.js',
        'lib/**/*.js',
        './*.js',
        'spec/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc'
      }
    },

    cssmin: {
      prod: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'dist/style.min.css': 'public/style.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      localServer: {
        command: 'node server.js',
        options: {
          stdout: true
        }
      },
      prodServer: {
        command: 'git push azure master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);

  });

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('build-dev', [
    'jshint',
    'concat',
    'uglify',
    'server-dev'
  ]);

  grunt.registerTask('build-prod', [
    'jshint',
    'concat',
    'cssmin',
    'uglify',
    'shell:prodServer'
  ]);

};
