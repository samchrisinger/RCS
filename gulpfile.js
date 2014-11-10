var gulp = require('gulp');

var wiredep = require('wiredep');

gulp.task('default', function(){

});

gulp.task('bower', function () {    
    wiredep({
	directory: 'bower_components',
	src: './index.html',
	bowerJson: require('./bower.json')
    });
});
