var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload');

gulp.task('hello', function() {
    console.log('Привет, я таск!');
});

gulp.task('pug', function buildHTML() {
    return gulp.src('app/views/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('app/'))
    .pipe(livereload())
});

gulp.task('scss', function () {
    return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(livereload())
});

// gulp.task('js', function () {
//     return gulp.src('app/js/*.js')
//         .pipe(sass())
//         .pipe(gulp.dest('app/js'))
//         .pipe(livereload())
// });

gulp.task('watch', function () {
    gulp.watch('app/scss/*.scss', ['scss']);
    gulp.watch('app/views/*.pug', ['pug']);
    // gulp.watch('app/js/*.js', ['js']);
    livereload.listen();
});