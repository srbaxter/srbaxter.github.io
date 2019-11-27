var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var log = require('fancy-log');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');

gulp.task('uglify', function() {   
    log('Minifying JS');

    return gulp
        .src(config.alljs)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(config.build + 'js'));
});  

gulp.task('prefix', function() {
    log('Autoprefix CSS');

    return gulp
        .src(config.allcss)
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.build + 'styles'));
});

gulp.task('images', function() {
    log('Copying and compressing images');

    return gulp
        .src(config.images)
        .pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});


gulp.task('clean', function() {
    log('Cleaning up build...');
    return del([config.build]);
});

gulp.task('watch', function() {
    return gulp
        .watch([config.allcss], gulp.series('prefix'));
});
  

gulp.task('hello', function(done) {
    log('hi there');
    done();
});

gulp.task('default', gulp.series('clean', gulp.parallel('uglify', 'prefix', 'images')));