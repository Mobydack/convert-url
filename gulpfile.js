let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', ()=>{
    return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ()=>{
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
})

gulp.task('watch', ['browser-sync', 'sass'], () => {
    gulp.watch('app/sass/*.scss');
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['sass'], ()=>{
    let buildCss = gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'));
    let buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));
    let buildImage = gulp.src('app/image/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/image'));
    let buildHml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
    let buildJava = gulp.src('app/script/*.js')
    .pipe(gulp.dest('dist/script'));
});