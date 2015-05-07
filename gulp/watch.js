module.exports = function (gulp, $, handleErrors) {
    return function () {
		// Watch .scss files
		gulp.watch('components/**/*.scss', ['styles']);

		// Watch .jsx files
		gulp.watch('components/**/*.jsx', ['scripts']);
	}
};