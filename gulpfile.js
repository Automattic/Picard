var // stash all gulp plugins in $
    $ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	}),
	browserify = require( 'browserify' ),
	buffer = require( 'vinyl-buffer' ),
	gulp = require( 'gulp' ),
	reactify = require( 'reactify' ),
	source = require( 'vinyl-source-stream' ),
	watchify = require( 'watchify' );

// Error Handler
var handleErrors = function () {
    // Send error to notification center with gulp-notify
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, arguments);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task( 'react', function() {
	return gulp.src( 'components/picard.jsx' )
		.pipe( react() )
		.pipe( gulp.dest( 'js' ) );
});

var bundler = browserify( './components/picard.jsx' );
bundler.transform( reactify );

gulp.task( 'js', bundle );
// bundler.on( 'update', bundle );

function bundle() {
	return bundler.bundle()
		// .on( 'error', $.util.log.bind( $.util, 'Browserify Error' ) )
		.pipe( source( 'picard.js' ) )
			// .pipe( buffer() )
			// .pipe( $.sourcemaps.init( { loadMaps: true } ) )
			// .pipe( $.sourcemaps.write( './' ) )
		.pipe( gulp.dest( './' ) );
}

gulp.task('styles', function () {
	return gulp.src('./components/style.scss')
	.pipe($.sourcemaps.init())
	.pipe($.sass())
	// send SASS errors to console
    .on('error', handleErrors)
	// add browser prefixes
    .pipe($.autoprefixer({
		browsers: [ 'last 3 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ]
	}))
    // minify css
    .pipe($.minifyCss({
        keepSpecialComments: 1
    }))
	.pipe($.sourcemaps.write())
	.pipe( gulp.dest( './' ) );
});

// Builder
gulp.task( 'build', ['styles', 'js']);

// Watcher
gulp.task( 'watch', function() {
	// Watch .scss files
	gulp.watch('components/**/*.scss', ['styles']);

	// Watch .jsx files
	gulp.watch('components/**/*.jsx', ['js']);
});


gulp.task( 'default', ['watch'] );