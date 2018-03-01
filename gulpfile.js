var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;
var source = require('vinyl-source-stream');

gulp.task('buildStyles', function() {
    gulp.src([
            'src/app/variables.scss',
            'src/app/**/*.scss'
        ])
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(gulp.dest('server/public'))
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
        .pipe(ngAnnotate())
        // source maps WILL WORK, at least on node v8.3.0 and **after a page refresh**.  Tested in Chrome/Firefox
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('server/public'));
});

gulp.task('buildHTML', function() {
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('server/public'));
});

gulp.task('buildAssets', function() {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('server/public/assets'));
});

gulp.task('watch', ['buildJS', 'buildStyles', 'buildHTML'], function() {
    gulp.watch('src/app/**/*.js', ['buildJS']);
    gulp.watch('src/app/**/*.scss', ['buildStyles']);
    gulp.watch('src/app/**/*.html', ['buildHTML']);
});

gulp.task('default', ['watch']);