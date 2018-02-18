var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('buildStyles', function() {
    gulp.src([
            'src/app/variables.scss',
            'src/app/**/*.scss'
        ])
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(gulp.dest('dist'))
});

gulp.task('buildJS', function() {
    return browserify(
        {
            entries: ['./src/app/app.module.js'],
            debug: true
        })
        .transform(babelify, { presets: ['env'], sourceMaps: true })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // source maps WILL WORK, at least on node v8.3.0 and **after a page refresh**.  Tested in Chrome/Firefox
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['buildJS', 'buildStyles'], function() {
    gulp.watch('src/app/**/*.js', ['buildJS']);
    gulp.watch('src/app/**/*.scss', ['buildStyles']);
    gulp.watch('src/app/index.html').on('change', browserSync.reload);
});

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        // serve from the src/app/ and dist/ directories
        server: ["src/app", "dist"]
    });
});

gulp.task('default', ['serve']);