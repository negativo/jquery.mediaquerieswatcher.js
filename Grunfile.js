module.exports = function(grunt) {
 grunt.initConfig({

     less: {
         development: {
             options: {
                 paths: ["examples/less"]
             },
             files: {"examples/styles/styles.css": "examples/less/main.less"}
         },
         production: {
            options: {
                paths: ["examples/less"],
                cleancss: true
            },
            files: {"examples/styles.css": "examples/less/main.less"}
         }
     },

	cssmin: {
	  target: {
	    files: [{
	      expand: true,
	      cwd: 'assets/css',
	      src: ['*.css', '!*.min.css'],
	      dest: 'assets/css',
	      ext: '.min.css'
	    }]
	  }
	},
	
	watch:{
		script:{
			files:["examples/less*.less"],
			tasks:["less","cssmin"],
			options:{
				spawn:false
			}
		}
	}   
 });

 //load tasks
 grunt.loadNpmTasks('grunt-contrib-less');
 grunt.loadNpmTasks('grunt-contrib-cssmin');
 grunt.loadNpmTasks('grunt-contrib-watch');

 //register
 grunt.registerTask('default', ['less','cssmin']);
};