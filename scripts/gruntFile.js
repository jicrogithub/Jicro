module.exports = function(grunt) {

    grunt.initConfig({
      shell: {
        start_redis: {
          command: 'wsl /usr/bin/redis-server',
          options: {
            async: true
          },
          
        },
        start_backend: {
          command: 'cd ../server && npx nodemon index.js',
          options: {
            async: true
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-shell');
  
    grunt.registerTask('default', ['shell:start_redis', 'shell:start_backend']);
  
  };
  