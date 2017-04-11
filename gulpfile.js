var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

gulp.task('collect-bower-js', function () {
    return gulp.src(mainBowerFiles("**/*.js"))
        .pipe(concat('vendor.js'))
        .pipe(minify())
        .pipe(gulp.dest("./libs/js"))
        .on('end', function () {
            del('./libs/js/vendor.js');
        })
});

gulp.task('collect-bower-css', function () {
    return gulp.src(mainBowerFiles("**/*.css"))
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./libs/css"))
});

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

gulp.task("default", ["collect-bower-js", "collect-bower-css", "serve"]);
