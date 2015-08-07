module.exports = function(grunt) {
 grunt.initConfig({

     less: {
         development: {
             options: {
                 paths: ["examples/styles/less"]
             },
             files: {"examples/styles/styles.css": "examples/styles/less/main.less"}
         },
         production: {
            options: {
                paths: ["examples/styles/less"],
                cleancss: true
            },
            files: {"examples/styles/styles.css": "examples/styles/less/main.less"}
         }
     },

	cssmin: {
	  target: {
	    files: [{
	      expand: true,
	      cwd: 'examples/styles',
	      src: ['*.css', '!*.min.css'],
	      dest: 'examples/styles',
	      ext: '.min.css'
	    }]
	  }
	},
	
	watch:{
		script:{
			files:["examples/**/**.*",],
			tasks:["less","cssmin"],
			options:{
				spawn:false,
				livereload:true
			}
		}
	}   
 });

 //load tasks
 grunt.loadNpmTasks('grunt-contrib-less');
 grunt.loadNpmTasks('grunt-contrib-cssmin');
 grunt.loadNpmTasks('grunt-contrib-watch');

 //register
 grunt.registerTask('default', ['less','cssmin','watch']);
};