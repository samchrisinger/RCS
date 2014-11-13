var gulp = require('gulp');

var wiredep = require('wiredep');
var concat = require('gulp-concat');

gulp.task('concat', function(){
    gulp.src(["./scripts/app.js",
	      "./scripts/settings.js",
	      "./scripts/config.js",
	      "./scripts/directives/date.js",
	      "./scripts/directives/time.js",
	      "./scripts/filters/correct.js",
	      "./scripts/filters/date.js",
	      "./scripts/filters/partition.js",                  
	      "./scripts/models/app.js",
	      "./scripts/models/user.js",
	      "./scripts/models/chemical_report.js",
	      "./scripts/models/bacteria_report.js",
	      "./scripts/models/report.js",
	      "./scripts/controllers/user.js",
	      "./scripts/controllers/report.js",
	      "./scripts/controllers/login.js"])
	.pipe(concat('all.js', {newLine: ';'}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('bower', function () {    
    wiredep({
	directory: 'bower_components',
	src: './index.html',
	bowerJson: require('./bower.json')
    });
});

gulp.task('default', function(){});
