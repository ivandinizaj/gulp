/* jshint node:true */

// Include project requirements.
var gulp 		= require('gulp')
	,jshint 	= require('gulp-jshint')
	,uglify 	= require('gulp-uglify')
	,imagemin 	= require('gulp-imagemin')
	,compass 	= require('gulp-compass')
	,path 		= require('path')
	,plumber 	= require('gulp-plumber')
	,gutil 		= require('gulp-util');

onError = function (err){  
  gutil.beep();
  console.log(err);
};

//Caminho padrão
var _root = '';

//PATH onde ficará os arquivos compilados
var _path = _root+'';

//PATH onde estão os arquivos editáveis 
var _path_tmp = _root+'';

// Sets assets folders.
var dirs = {
	js: {
		dir: _path+'js'
		,tmp : _path_tmp+'js'
	}	
	,css:{
		dir : _path+'css'
		,tmp : _path_tmp+'sass'
	}
	,img:{
		dir: _path+'img'
		,tmp: _path_tmp+'img'
	} 
	,fonts: _path+'fonts'
};


console.log(_path_tmp);

gulp.task( 'scripts', function (){

	// Hint all JavaScript.
	gulp.src( dirs.js.tmp + '/*.js' )
        .pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) );

	// Minify and copy all JavaScript.
	gulp.src( dirs.js.tmp + '/*.js' )       
		.pipe( uglify() )
		.pipe( gulp.dest( dirs.js.dir ) );
});

gulp.task('sass', function() {
    gulp.src(dirs.css.tmp + '/*.scss')
        .pipe(plumber({
	      errorHandler: onError
	    }))
        .pipe(compass({
			css: dirs.css.dir
			,sass: dirs.css.tmp
			,image: dirs.img.dir
			,style: 'compressed'
			,comments: false
			,relative: true

        }))

    .pipe(gulp.dest(dirs.css.dir));
});

gulp.task( 'optimize', function () {
	// Optimize all images.
	gulp.src( dirs.img.tmp + '/**/*.{png,jpg,gif}' )
        
		.pipe( imagemin({
			optimizationLevel: 7
			,progressive: true
		}) )
		.pipe( gulp.dest( dirs.img.dir ) );
});

//
gulp.task( 'watch', function () {
	
	gulp.watch(dirs.js.tmp + '/*.js', ['scripts']);

	gulp.watch(dirs.css.tmp + '/**', ['sass']);
});

//Chama as tarefas assim que chama o GULP 
gulp.task('default', ['scripts','sass','watch']);