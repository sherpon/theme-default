var gulp = require('gulp')
var webserver = require('gulp-webserver')
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var fs = require("fs")
var browserify = require("browserify")
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')

var distPath = "dist/"
var publicPath = "public/"
var srcPath = "src/"

var versionJs = "1.0.0"
var versionCss = "1.0.0"

var config = {
  theme: {
    sass: {
      main: srcPath + 'theme.default.scss',
      watch: srcPath + '**/**/*.scss',
      bundle: srcPath + ''
    },
    postcss: {
      main: srcPath + 'theme.default.css',
      watch: srcPath + 'theme.default.css',
      bundle: publicPath + 'css',
      distBundle: distPath,
    },
    js: {
      main: srcPath + 'theme.default.js',
      watch: srcPath + '**/**/*.js',
      bundle: publicPath + 'js',
      bundlefile: 'theme.default.js',
      distBundlefile: 'theme.default.min.js'
    }
  }
}

/*
  tasks store
*/
gulp.task('css', function () {
  gulp.src(config.theme.sass.main)
    .pipe(sass())
    .pipe(gulp.dest(config.theme.sass.bundle))
})

gulp.task('postcss', function () {
  var processors = [
    autoprefixer({ browsers: ['>5%', 'ie 8'] })
  ]

  gulp.src(config.theme.postcss.main)
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.theme.postcss.distBundle))
})

gulp.task('postcss-dev', function () {
  var processors = [
    autoprefixer({ browsers: ['>5%', 'ie 8'] })
  ]

  gulp.src(config.theme.postcss.main)
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.theme.postcss.bundle))
})

gulp.task('js', function () {
  browserify(config.theme.js.main)
    .transform("babelify", {presets: ["env", "react"], plugins: ["transform-object-rest-spread"]})
    .bundle()
    /* version MINIFY para prod */
    .pipe(source(config.theme.js.distBundlefile)) // (minify) gives streaming vinyl file object
    .pipe(buffer()) //  (minify) <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) //  (minify) now gulp-uglify works
    .pipe(gulp.dest(distPath)) // (minify)
})

gulp.task('js-dev', function () {
  browserify(config.theme.js.main)
    .transform("babelify", {presets: ["env", "react"], plugins: ["transform-object-rest-spread"]})
    .bundle()
    /* version no minify para dev */
    .pipe(fs.createWriteStream(config.theme.js.bundle + '/' + config.theme.js.bundlefile)) // version no minificada para dev
})

/*
  watch
*/
gulp.task('watch', function () {
  gulp.watch(config.theme.sass.watch, ['css'])
  gulp.watch(config.theme.postcss.watch, ['postcss'])
  gulp.watch(config.theme.js.watch, ['js'])
})

gulp.task('watch-dev', function () {
  gulp.watch(config.theme.sass.watch, ['css'])
  gulp.watch(config.theme.postcss.watch, ['postcss-dev'])
  gulp.watch(config.theme.js.watch, ['js-dev'])
})

/*
  server
*/
const _storeusername = 'paolaboutique'
const _host = '0.0.0.0'
const _port = 8080

gulp.task('server', function () {
  gulp.src(publicPath)
  .pipe(webserver({
    host: _host,
    port: _port,
    livereload: true,
    open: false,
    proxies: [
      { source: `/${_storeusername}`, target: `http://${_host}:${_port}` },
      { source: `/${_storeusername}/congratulation/purchase`, target: `http://${_host}:${_port}` }
    ]
  }))
})

gulp.task('dev', [
  'css',
  'postcss-dev',
  'js-dev',
  'watch-dev',
  'server'
])

gulp.task('default', [
  'css',
  'postcss',
  'js',
  'watch',
  'server'
])
