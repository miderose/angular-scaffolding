var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;


gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});


gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(
        [
            "**/*.html",

            "*.js",
            "controllers/*.js",
            //!"gulpfile.js",
            "services/*.js"
        ]
    ).on("change", reload);

    gulp.watch('./sass/**/*.scss', ['sass']);

    // watch css and stream to BrowserSync when it changes
    gulp.watch('css/style.css', function () {
        // grab css files and send them into browserSync.stream
        // this injects the css into the page
        gulp.src('css/style.css')
            .pipe(browserSync.stream());
    });
});
