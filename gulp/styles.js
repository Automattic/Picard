module.exports = function (gulp, $, handleErrors) {
    return function () {
		gulp.src('./components/style.scss')
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
	}
};