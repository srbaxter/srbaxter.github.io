var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var log = require('fancy-log');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

gulp.task('uglify', function() {   
    log('Minifying JS');

    return gulp
        .src(config.alljs)
        .pipe(uglify())
        .pipe(gulp.dest(config.build + 'js'));
});  

gulp.task('prefix', function() {
    log('Autoprefix CSS');

    return gulp
        .src(config.allcss)
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.build + 'styles'));
});

gulp.task('minify-css', function() {
    log('Minify CSS');

    return gulp
        .src(config.allcss)
        .pipe(cleanCSS({compatability: 'ie8'}))
        .pipe(gulp.dest(config.build + 'styles'));
});

gulp.task('images', function() {
    log('Copying and compressing images');

    return gulp
        .src(config.images)
        .pipe(
            imagemin([
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 })
            ])            
        )
        .pipe(gulp.dest(config.build + 'images'));
});


gulp.task('clean', function() {
    log('Cleaning up build...');
    return del([config.build]);
});

gulp.task('watch', function() {
    gulp.watch(config.allcss, gulp.series('prefix','minify-css'));
    gulp.watch(config.alljs, gulp.series('uglify'));    
});
  

gulp.task('hello', function(done) {
    log('hi there');
    done();
});

gulp.task('default', gulp.series('clean', gulp.series('prefix', 'minify-css'), gulp.parallel('uglify', 'images')));