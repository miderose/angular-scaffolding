var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var zip = require('gulp-zip');

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

    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));

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


var DIST_FOLDER = "_dist";
var ZIP_NAME = "_dist";

gulp.task('prepareSite', function () {
    // Prepare dist package folders
    var FOLDERS_TO_COPY = [
        "controllers",
        "css",
        "img",
        "libs",
        "services",
        "templates",
        "translations"
        //"fonts",
        //"resources",
    ];

    for (var i = 0; i < FOLDERS_TO_COPY.length; i++) {
        console.log("copying " + FOLDERS_TO_COPY[i] + " to " + DIST_FOLDER + "/" + FOLDERS_TO_COPY[i]);

        gulp.src(FOLDERS_TO_COPY[i] + "/**/*")
            .pipe(gulp.dest(DIST_FOLDER + "/" + FOLDERS_TO_COPY[i]));
    }

    // Prepare dist package files
    console.log("copying projects files");
    gulp.src([
            "index.html",
            "app.js",
            "constants.js",
            "routes.js"
        ])
        .pipe(gulp.dest(DIST_FOLDER));
});

var d = new Date();
ZIP_NAME += "_";

ZIP_NAME += d.getFullYear();
ZIP_NAME += "" + (d.getMonth() + 1);
ZIP_NAME += "" + (d.getDate());

ZIP_NAME += "_";

ZIP_NAME += "" + (d.getHours());
ZIP_NAME += "" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
ZIP_NAME += "" + (d.getSeconds());

ZIP_NAME += ".zip";

gulp.task("prepareZip", function () {
    console.log("zipping " + DIST_FOLDER);
    gulp.src(DIST_FOLDER + "/**")
        .pipe(zip(ZIP_NAME))
        .pipe(gulp.dest('.'))
});

gulp.task('prepare', ['prepareSite', 'prepareZip']);
