const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')

gulp.task('browserSync', ['stylus', 'pug', 'js'], () => {
	browserSync.init({
		server: {
			baseDir: './',
			index: './html/index.html'
		}
	})
})

gulp.task('stylus', () => {
	return gulp.src('./stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
})

gulp.task('js', () => {
    return gulp.src('./js/*.js')
    	.pipe(gulp.dest('./js'))
    	.pipe(browserSync.stream())
})

gulp.task('pug', () => {
    return gulp.src('./pug/*.pug')
    	.pipe(pug({
        	pretty: true
    	}))
    	.pipe(gulp.dest('./html'))
})


gulp.task('watch', ['browserSync'], () => {
    gulp.watch('./pug/*.pug', ['pug'])
    gulp.watch('./stylus/*.styl', ['stylus'])
    gulp.watch('./js/*.js', ['js'])
    gulp.watch('./html/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['stylus', 'pug', 'js', 'watch'])