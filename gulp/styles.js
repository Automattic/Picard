module.exports = function (gulp, $, handleErrors) {
    return function () {
		gulp.src('./components/style.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		// send SASS errors to console
		.on('error', handleErrors)
		// add browser prefixes
		.pipe($.autoprefixer({
			browsers: [ '> 5%', 'last 2 versions' ]
		}))
		// minify css
		.pipe($.minifyCss({
			keepSpecialComments: 1
		}))
		.pipe($.sourcemaps.write())
		.pipe( gulp.dest( './' ) );
	}
};