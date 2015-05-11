// Stash requires in variables
var
    $ = require('gulp-load-plugins')(),
	gulp = require( 'gulp' ),
	handleErrors = require('./gulp/handleErrors.js')(gulp, $);

// helper to get partials
function getGulpPartial(task) {
    return require('./gulp/' + task)(gulp, $, handleErrors);
}

// get tasks from partials
gulp.task( 'styles', getGulpPartial('styles') );
gulp.task( 'scripts', getGulpPartial('scripts') );
gulp.task( 'watch', getGulpPartial('watch') );

// Builder
gulp.task( 'build', ['styles', 'scripts']);

// Alias build to default
gulp.task( 'default', ['watch'] );