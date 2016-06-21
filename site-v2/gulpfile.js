var gulp = require('gulp'),
		sass = require('gulp-sass'),
		connect = require('gulp-connect'),
		neat = require('node-neat'),
		concat = require('gulp-concat');

//on écoute les changements aux fichiers html
gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(connect.reload());
});



// on rajoute la ligne du reload .pipe(connect.reload());
gulp.task("compileSass", function(){
	return gulp.src('assets/scss/app.scss')
	.pipe(concat('assets/css/app.css'))
	.pipe(sass({ includePaths: neat.with('assets/scss/') }) )
	.pipe(gulp.dest('./'))
	.pipe(connect.reload());
});

// on ajoute watch
// rajouter ,['connect']
gulp.task('watch', ['connect'], function() {
	gulp.watch('*.html', ['html']);
	gulp.watch('assets/scss/*.*css', ['compileSass']);
});	

// gulp-connect
gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    livereload: true,
    port: 3000
  });
});

//la tache par defaut qui lance le serveur et écoute les changements de fichier
gulp.task('default', ['watch'], function() {});
