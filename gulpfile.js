var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
var path    = {
    development : __dirname + '/development/',
    production  : __dirname + '/production/'
};


/******************* Bower *******************/
gulp.task('bower-clean', function () {
    return gulp.src(path.production + 'assets/vendor/*', {read: false})
        .pipe($.clean());
});
gulp.task('bower', ['bower-clean'], function () {
    return $.bowerFiles()
        .pipe(gulp.dest(path.production + 'assets/vendor'));
});


/******************* HTML *******************/
gulp.task('html-clean', function () {
    return gulp.src(path.production + '*.html', {read: false})
        .pipe($.clean());
});

gulp.task('html', ['html-clean'], function () {
    
});


/******************* Scripts *******************/
gulp.task('scripts-clean', function () {
    return gulp.src(path.production + 'assets/js/*', {read: false})
        .pipe($.clean());
});

gulp.task('scripts', ['scripts-clean'], function () {
    // `app.js` only
    gulp.src(path.development + 'assets/js/app.js')
        .pipe(gulp.dest(path.production + 'assets/js'));
});


/******************* Styles *******************/    // OK
gulp.task('styles-clean', function () {
    return gulp.src(path.production + 'assets/css/*', {read: false})
        .pipe($.clean());
});

gulp.task('styles', ['styles-clean'], function () {
    // `style.less` only
    gulp.src(path.development + 'assets/less/style.less')
        .pipe($.less())
        .pipe($.minifyCss())
        .pipe(gulp.dest(path.production + 'assets/css'));
});


/******************* Images *******************/
gulp.task('images-clean', function () {
    return gulp.src(path.production + 'assets/img/*', {read: false})
        .pipe($.clean());
});

gulp.task('images', ['images-clean'], function () {
    
});


/******************* Default Task *******************/
gulp.task('default', ['bower', 'html', 'scripts', 'styles', 'images', 'connect', 'watch']);


/******************* Connect *******************/
gulp.task('connect', $.connect.server({
    root        : [path.production],
    port        : 9000,
    livereload  : true
}));


/******************* Watch *******************/
gulp.task('watch', function () {
    // Bower
    gulp.watch('bower.json', ['bower']);

    // HTML
    gulp.watch([
        path.development + 'base/*.html',
        path.development + 'pages/*.html',
        path.development + 'widgets/*.html'
    ], ['html']);

    // Script
    gulp.watch(path.development + 'assets/js/app.js', ['scripts']);

    // Styles
    gulp.watch(path.development + 'assets/less/style.less', ['styles']);

    // Images
    gulp.watch(path.development + 'assets/img/*', ['images']);

    // Watch for changes in `production` folder
    gulp.watch([path.production + '*'], function(event) {
        gulp.src(event.path)
            .pipe($.connect.reload());
    });
});
