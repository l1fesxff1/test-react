var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

function css_style(done) {
    gulp.src('./styles/scss/styles.scss')
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./styles/css/'))
        .pipe(browserSync.stream());
    done();
}

function watchFiles() {
    gulp.watch("./styles/scss/**/*", css_style)
    gulp.watch("./styles/**/*.css", browserReload)
    gulp.watch("./styles/**/*.js", browserReload)
    gulp.watch("./styles/**/*.html", browserReload);
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: "http://localhost:5173/"
        },
        port: 3000
    });
    done();
}

function browserReload (done) {
    browserSync.reload();
    done();
}

gulp.task('default', gulp.parallel(sync, watchFiles));