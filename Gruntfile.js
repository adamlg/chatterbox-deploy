module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      /* START SOLUTION */
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/env/*.js','client/scripts/*.js'],
        dest: 'dist/client/<%= pkg.name %>.js'
      }
      /* END SOLUTION */
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/spec/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/basic-server.js'
      }
    },

    uglify: {
      /* START SOLUTION */
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/client/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
      /* END SOLUTION */
    },

    jshint: {
      files: [
        /* START SOLUTION */
        'Gruntfile.js',
        'client/**/*.js'
        // 'public/**/*.js',
        // 'lib/**/*.js',
        // './*.js',
        // 'spec/**/*.js'
        /* ELSE
        // Add filespec list here
        END SOLUTION */
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          // 'public/lib/**/*.js',
          'dist/client/*.js'
        ]
      }
    },

    cssmin: {
      /* START SOLUTION */
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'dist/styles/style.min.css': 'client/styles/*.css'
        }
      }
      /* END SOLUTION */
    },

    watch: {
      scripts: {
        files: [
          'client/**/*.js'
          // 'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/styles/*.css',
        tasks: ['cssmin']
      }
    },

    // shell: {
    //   prodServer: {
    //     /* START SOLUTION */
    //     command: 'git push azure master',
    //     options: {
    //       stdout: true,
    //       stderr: true,
    //       failOnError: true
    //     }
    //     /* END SOLUTION */
    //   }
    // },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-shell');
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

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    /* START SOLUTION */
    'jshint',
    /* END SOLUTION */ 
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    /* START SOLUTION */
    'jshint',
    'concat',
    'uglify',
    'cssmin'
    /* END SOLUTION */
  ]);

  // grunt.registerTask('upload', function(n) {
  //   if(grunt.option('prod')) {
  //     /* START SOLUTION */
  //     grunt.task.run([ 'shell:prodServer' ]);
  //     /* ELSE
  //     // add your production server task here
  //     END SOLUTION */
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  grunt.registerTask('deploy', [
    /* START SOLUTION */
    'test',
    'build'
    // 'upload'
    /* ELSE
    // add your deploy tasks here
    END SOLUTION */
  ]);


};
