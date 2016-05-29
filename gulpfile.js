var gulp = require('gulp')
var babel = require('gulp-babel')
var del = require('del')

gulp.task('default', ['build'])

gulp.task('build', ['clean'], function() {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() {
    return del('dist')
})
