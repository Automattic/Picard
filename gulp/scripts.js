module.exports = function (gulp, $, handleErrors) {
	var
		browserify = require( 'browserify' ),
		buffer = require( 'vinyl-buffer' ),
		reactify = require( 'reactify' ),
		bundler = browserify( './components/picard.jsx' ),
		source = require( 'vinyl-source-stream' );
		bundler.transform( reactify );

    return function () {

		// bundler.on( 'update', bundle );

		return bundler.bundle()
			// .on( 'error', $.util.log.bind( $.util, 'Browserify Error' ) )
			.pipe( source( 'picard.js' ) )
				// .pipe( buffer() )
				// .pipe( $.sourcemaps.init( { loadMaps: true } ) )
				// .pipe( $.sourcemaps.write( './' ) )
			.pipe( gulp.dest( './' ) );

	}

}