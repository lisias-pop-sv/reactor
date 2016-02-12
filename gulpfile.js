/** eslint-env es6*/
'use strict';
let gulp = require('gulp');
let uglify = require('gulp-uglify');
let livereload = require('gulp-livereload');
let eslint = require('gulp-eslint');
// let webpack = require('webpack');
let shell = require('gulp-shell');
let concat = require('gulp-concat');

gulp.task('default', () => {
    gulp.src('src/**/*.js')
    // .pipe(uglify().on('error', gulpUtil.log)) // notice the error event here
    .pipe(uglify())
    .pipe(gulp.dest('build/minified.js'));
});

gulp.task('empty-build', shell.task(
    [
        'rm -rf build',
        'mkdir build'
    ],
    {
        verbose: true
    }
));

gulp.task('web-build', shell.task([
    'webpack --progress'
]));

gulp.task('web-dev', shell.task([
    'webpack-dev-server --devtool eval --progress --inline --colors --hot --content-base build'
]));

gulp.task('lint-html', () => {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!src/minified{,/**}'])
        .pipe(eslint())
        .pipe(eslint.format('html'));
});

gulp.task('lint-save', shell.task([
    'gulp lint-html > build/ESlint.html'
]));

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!src/minified{,/**}'])
        // .pipe(shell(['gulp lint-save']))
        .pipe(eslint())
        .pipe(eslint.format());
        // .pipe(shell(['gulp lint-html ']))
        // gulp.src(['src/**/*.js', 'src/**/*.jsx', '!src/minified{,/**}'])
        // .pipe(eslint.failAfterError());
        // .pipe(eslint.format('html', gutil.log()))
        // .pipe(gutil.log('build/lint-report.html'))

});

gulp.task('stylus', () => (
    gulp.src('src/assets/**/*.css')
    // .pipe(uglify().on('error', gulpUtil.log))
    .pipe(concat('styles.css'))
    // .pipe(uglify())
    .pipe(gulp.dest('build'))
));

gulp.task('f5', () => {
    gulp.src('src/**/*.js')
    .pipe(livereload());
});

gulp.task('watch', () => {
    gulp.watch(
        ['src/**/*.js', 'src/**/*.jsx'],
        ['lint-save', 'lint']
    );
});
