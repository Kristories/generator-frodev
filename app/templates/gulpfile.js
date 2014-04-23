var gulp 	= require('gulp');
var $ 		= require('gulp-load-plugins')();
var path    = {
    production  : './app/',
    development : './dev/'
}


/************** HTML **************/
gulp.task('html-clean', function () {
    gulp.src(path.production + '*.html', { read: false })
        .pipe($.clean());
});

gulp.task('html', ['html-clean'], function () {
    gulp.src(path.development + 'pages/*.html')
        .pipe($.nunjucksRender({
            base    : path.development + 'base/',
            widgets : path.development + 'widgets/',
        }))
        .pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe($.prettify({ indentSize: 4 }))
        .pipe(gulp.dest(path.production))
        .pipe($.connect.reload());
});


/************** STYLE **************/
gulp.task('styles-clean', function () {
    gulp.src(path.production + 'assets/css/*', {read: false})
        .pipe($.clean());
});

gulp.task('styles-less', function () {
    gulp.src(path.development + 'assets/less/*.less')
        .pipe($.less())
        .pipe($.minifyCss({
            root                : path.development + 'assets/less',
            keepSpecialComments : 0
        }))
        .pipe($.cssbeautify({ autosemicolon : true }))
        .pipe(gulp.dest(path.production + 'assets/css'))
        .pipe($.minifyCss())
        .pipe($.rename({ suffix : '.min' }))
        .pipe(gulp.dest(path.production + 'assets/css'))
        .pipe($.connect.reload());
});

gulp.task('styles', ['styles-clean', 'styles-less']);


/************** SCRIPT **************/
gulp.task('scripts-clean', function () {
    gulp.src(path.production + 'assets/js/*', {read: false})
        .pipe($.clean());
});

gulp.task('scripts-js', ['scripts-clean'], function () {
    gulp.src(path.development + 'assets/js/*.js')
        .pipe($.include())
        .pipe($.uglify())
        .pipe($.beautify({ indentSize: 4 }))
        .pipe(gulp.dest(path.production + 'assets/js'))
        .pipe($.uglify({ compress : true }))
        .pipe($.rename({ suffix : '.min' }))
        .pipe(gulp.dest(path.production + 'assets/js'))
        .pipe($.connect.reload());
});

gulp.task('scripts', ['scripts-clean', 'scripts-js']);


/************** IMAGES **************/
gulp.task('images-clean', function () {
    gulp.src(path.production + 'assets/img/*')
        .pipe($.clean());
});

gulp.task('images', ['images-clean'], function () {
    gulp.src(path.development + 'assets/img/*.{jpg,png,gif}')
        .pipe($.imagemin())
        .pipe($.flatten())
        .pipe(gulp.dest(path.production + 'assets/img'))
        .pipe($.connect.reload());
});


/************** FONTS **************/
gulp.task('fonts-clean', function () {
    gulp.src(path.production + 'assets/fonts/*')
        .pipe($.clean());
});

gulp.task('fonts', ['fonts-clean'], function () {
    gulp.src(path.development + 'assets/**/*.{otf,eot,svg,ttf,woff}')
        .pipe($.flatten())
        .pipe(gulp.dest(path.production + 'assets/fonts'))
        .pipe($.connect.reload());
});


/************** SERVER **************/
gulp.task('server', function() {
    $.connect.server({
        root 		: ['./app'],
        port 		: 9000,
        livereload 	: true
    });
});


/************** WATCH **************/
gulp.task('watch', function () {
    gulp.watch([
        path.development + 'base/*.html',
        path.development + 'pages/*.html',
        path.development + 'widgets/*.html'
    ], ['html']);
    gulp.watch(path.development + 'assets/less/*.less', ['styles']);
    gulp.watch(path.development + 'assets/js/*.js', ['js']);
});


/************** DEFAULT **************/
gulp.task('default', [
    'html', 
    'styles', 
    'scripts',
    'images',
    'fonts',
    'server',
    'watch'
]);



