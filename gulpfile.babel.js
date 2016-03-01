'use strict';

import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import buffer from 'vinyl-buffer';
import reactify from 'reactify';

var $ = require('gulp-load-plugins')();

const dirs = {
    src: 'components',
    dest: 'build'
};

const sassPaths = {
    src: `${dirs.src}/picard.scss`,
    dest: `${dirs.dest}/`
};

const JSpaths = {
    src: `${dirs.src}/picard.jsx`,
    dest: `${dirs.dest}/`
};

gulp.task('styles', () => {
    $.util.log($.util.colors.green('Building ') + $.util.colors.yellow(`${sassPaths.src}...`));
    return gulp.src(sassPaths.src)
        // start sourcemap
        .pipe($.sourcemaps.init())
        // run sass
        .pipe($.sass.sync({
            outputStyle: 'nested'
        }))
        // log sass errors
        .on('error', err => {
            $.util.log($.util.colors.red("CSS Error:"), $.util.colors.yellow(
                err.message.replace(__dirname, '.').replace(__dirname, '.')
            ));
        })
        // add browser prefixes
        .pipe($.autoprefixer({
            browsers: [ '> 5%', 'last 2 versions' ]
        }))
        // save human readable file
        .pipe(gulp.dest(sassPaths.dest))
        // minify css
        .pipe($.cssnano())
        // rename to min
        .pipe($.rename({
            suffix: ".min"
        }))
        // write sourcemap
        .pipe($.sourcemaps.write('./'))
        // save minified file
        .pipe(gulp.dest(sassPaths.dest));
});

function buildScript(file, watch) {
    var props = {
        entries: ['./' + file],
        debug: true,
        transform: [
            babelify.configure({presets: ["es2015", "react"]}),
            reactify
        ]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    if( !watch ){
        $.util.log($.util.colors.green('Building ') + $.util.colors.yellow(`${file}...`));
    }

    function rebundle() {
        // create an initial text stream from browserify
        var stream = bundler.bundle();
        return stream
            // log errors
            .on('error', err => {
                $.util.log($.util.colors.red("JS Error:"), $.util.colors.yellow(
                    err.message.replace(__dirname, '.').replace(__dirname, '.')
                ));
            })
            /**
             * stream is a text stream but gulp uses
             * vinyl streams so we must convert the
             * text stream to a vinyl stream to use
             * any gulp elements
             */
            .pipe(source(file))
            // strip any directories in the file path
            .pipe($.rename({
                dirname: '/',
                extname: ".js"
            }))
            // output a human readable file
            .pipe(gulp.dest(JSpaths.dest))
            /**
             * we have a streaming vinyl object but uglify and
             * sourcemaps need a buffered vinyl file objects so
             * we must change the stream again by buffering it
             */
            .pipe(buffer())
            // start source maps
            .pipe($.sourcemaps.init({loadMaps: true}))
            // minify the file
            .pipe($.uglify({
                preserveComments: 'some',
                mangle: false
            }))
            // rename to .min
            .pipe($.rename({
                suffix: ".min"
            }))
            // save source map
            .pipe($.sourcemaps.write('./'))
            // save the minified file
            .pipe(gulp.dest(JSpaths.dest));
    }

    // listen for an update and run rebundle
    bundler.on('update', function () {
        rebundle();
        $.util.log($.util.colors.green('Rebuilding ') + $.util.colors.yellow(`${file}...`));
    });

    // run it once the first time buildScript is called
    return rebundle();
}

// buildScript will run once because watch is set to false
gulp.task('scripts', () => buildScript(JSpaths.src, false) );

// Build Task
gulp.task('build', [
    'scripts',
    'styles'
]);

gulp.task('watch', ['assets'], () => {
    // Watch Sass files and run styles task on change
    gulp.watch([sassPaths.src], ['styles']);

    return buildScript(JSpaths.src, true);
});

// Default task is to build assets
gulp.task('default', ['build']);