var webpackConfig = require( './webpack.config.js' )

/**
 * Gruntfile.js
 */
module.exports = function ( grunt ) {

    /**
     * Load all grunt tasks
     */
    require( 'load-grunt-tasks' )( grunt );

    /**
     * Config
     */
    grunt.initConfig( {

                          clean: [ "target/webroot/*" ],

                          webpack: {
                              index: webpackConfig
                          },

                          run: {
                              cleanJS: {
                                  exec : 'npm run clean'
                              },
                              wCleanJS: {
                                  exec : 'npm run wclean'
                              },
                          },

                          gitadd: {
                              task: {
                                  options: {
                                      force: false,
                                      all  : true
                                  }
                              }
                          },

                          bump: {
                              options: {
                                  files             : [ 'package.json' ],
                                  commit            : true,
                                  commitMessage     : '[NS] Release v%VERSION%',
                                  commitFiles       : [ '-a' ],
                                  createTag         : true,
                                  tagName           : '%VERSION%',
                                  tagMessage        : 'Version %VERSION%',
                                  push              : true,
                                  pushTo            : 'origin',
                                  gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                                  globalReplace     : false,
                                  prereleaseName    : false,
                                  metadata          : '',
                                  regExp            : false
                              }
                          }

                      } );

   /**
    * Tasks
    */
    grunt.registerTask( 'build', [
        'run:wCleanJS',
        'run:cleanJS',
        'clean',
        'webpack',
    ] );

    grunt.registerTask( 'target/webroot', [
        'gitadd',
        'bump'
    ] );


    grunt.registerTask( 'release',       [ 'target/webroot'] );
    grunt.registerTask( 'snapshot',      [ 'build' ] );

}
