module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  var semver = require('semver');
  var extend = require('extend');

  var path = {
    config: 'grunt-config',
    source: 'src',
    dist: 'dist',
    dist_config: 'dist-config.json',
    dev_config: 'dev-config.json',
    live_config: 'live-config.json'
  };

  var pkg = grunt.file.readJSON('package.json');

  // Configuración de Grunt.js    
  grunt.initConfig({

    /*Global Vars*/
    path: path,
    banner: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
        ' */\n',
    pkg: pkg,
    compressOnExport: false,

    /*Concurrent Tasks*/
    concurrent:{
      options:{
        logConcurrentOutput: true
      },
      dev:{
        tasks: ['server','watch']
      }
    },

    /*Install Dependencies*/
    bowercopy: grunt.file.readJSON( path.config + '/dependencies.json'),

    /*Control Version*/
    version: {
      options: {
        pkg: 'package.json'
      },
      dist: {
        options: {
            prefix: 'Current Version\\:\\s'
        },
        src: [ 'readme.md']
      },
      pkg: {
        src: ['package.json','bower.json']
      }
    },

    /*Files Info Banner*/
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: '<%= path.dist %>/assets/css/*.css'
      }
    },

    /*Dist remove folders*/
    clean: {
      install:{
        options:{
          force: true
        },
        src: ['<%= path.source %>/assets/lib']
      },
      dist:{
        src: ['dist']
      }
    },

    /*Dist copy files*/
    copy: {
      dist:{
        files:[
          {expand: true, src: ['**'], cwd: '<%= path.source %>/assets', dest: 'dist/assets' },
        ]
      }
    },

    /*Compile LESS task*/
    less: {
      development: {
         options: {
             paths: ["<%= path.source %>/less"]
         },
         files: { "<%= path.source %>/assets/css/style.css": "<%= path.source %>/less/style.less"}
      },
      dist: {
         options: {
             paths: ["<%= path.source %>/less"]
         },
         files: {"<%= path.dist %>/assets/css/style.css": "<%= path.source %>/less/style.less"}
      }
    },

    /*Compile Jade Task*/
    jade: {
      dist: {
        options: {
          basedir: '<%= path.source %>/html', 
          pretty: true,
          data: function(dest, src) {

            var conf = grunt.file.readJSON( './' + path.source + '/' + path.dev_config );
            var dist_conf = grunt.file.readJSON( './' + path.source + '/' + path.dist_config );

            //Extend default conf with dist conf
            extend ( conf, dist_conf );

            var data = {
              conf: conf
            }

            return data;
          },
        },
        files: [{
          expand: true,
          cwd: '<%= path.source %>/html',
          src: [ '*.jade' ],
          dest: 'dist',
          ext: '.html'
        }]
      }
    },

    /*Notifications Task*/
    notify: {
      compiled: {
        options: {
          title: 'Success!',  // optional
          message: 'CSS was compiled succesfully!', //required
        }
      },
      server: {
        options: {
          title: 'Jade Server Running!',  // optional
          message: 'Server running at localhost:8080', //required
        }
      }
    },

    /*Dist Zip File Generator*/  
    compress: {
      dist: {
          options: {
            archive: '<%= pkg.name %>-<%= pkg.version %>.zip'
          },
          files: [
            {expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.name %>-<%= pkg.version %>'}, // makes all src relative to cwd
          ]
        }
    },

    /*Watch task*/
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: [ '<%= path.source %>/less/**/*.less'],
        tasks: ['less:development','notify:compiled'],
      }
    },

    prompt: {
      version: {
        options: {
          questions: [
            {
              config:  'version.options.release',
              type:    'list',
              message: 'Increase version from ' + '<%= pkg.version %>' + ' to:',
              choices: [
                {
                  value: 'patch',
                  name:  'Patch:  ' + semver.inc(pkg.version, 'patch') + ' Backwards-compatible bug fixes.'
                },
                {
                  value: 'minor',
                  name:  'Minor:  ' + semver.inc(pkg.version, 'minor') + ' Add functionality in a backwards-compatible manner.'
                },
                {
                  value: 'major',
                  name:  'Major:  ' + semver.inc(pkg.version, 'major') + ' Incompatible API changes.'
                }
              ]
            },
            {
              config: 'compressOnExport',
              type:   'confirm',
              message:'Do you want to export dist folder in a zip file?:',
              default: false
            }
          ]
        }
      }
    }
  });

  //Update the current version changed by version task
  grunt.registerTask('update-version', function( release ){  
    var pkg = grunt.file.readJSON('package.json');
    grunt.config.set('pkg.version', pkg.version);
    grunt.log.writeln('Package version updated to:' + pkg.version );
  });

  grunt.registerTask('export', function( ){
    var compress = grunt.config('compressOnExport');

    if( compress ){
      grunt.task.run('compress:dist');
    }
  });

  //Create a Jade Server with express
  grunt.registerTask('server', function(){
    var done = this.async();
    grunt.log.writeln('Starting web server on port 8080.');
    require('./' + path.config + '/jade-server.js').listen(8080).on('close', done);
  });


  // Register tasks
  grunt.registerTask('default', [
    'concurrent:dev'
  ]);

  //Install Dependencies
  grunt.registerTask('install', [
    'clean:install','bowercopy'
  ]);

  //Compile dist files
  grunt.registerTask('dist', function( ){
    grunt.task.run([ 'clean:dist','copy:dist','less:dist','jade:dist','usebanner' ]);
  });

  //Create a release
  grunt.registerTask('release', function( release ){
    grunt.task.run([ 'prompt:version','clean:dist','copy:dist','less:dist','jade:dist','version','update-version','usebanner','export']);
  });

};