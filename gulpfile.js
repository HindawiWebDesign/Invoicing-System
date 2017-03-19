var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync'),
    useref       = require('gulp-useref'),
    uglify       = require('gulp-uglify'),
    gulpIf       = require('gulp-if'),
    cssnano      = require('gulp-cssnano'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    del          = require('del'),
    runSequence  = require('run-sequence');


// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
})


// SASS, Autoprefixer, Sourcemaps
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') 
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./')) 
    .pipe(gulp.dest('app/css')) 
    .pipe(browserSync.reload({ 
        stream: true
    }));
})


// Watchers
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})


// Optimizing CSS and JavaScript 
gulp.task('useref', function() {
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});


// Optimizing Images 
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});


// Copying fonts 
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})


// Cleaning 
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});


// Build Sequences
gulp.task('default', function(callback) {
    runSequence(
        ['sass', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'sass',
        ['useref', 'images', 'fonts'],
        callback
    )
})