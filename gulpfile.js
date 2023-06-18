const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const scss = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const nunjucks = require('gulp-nunjucks-render');
const uglify = require('gulp-uglify');

const PATH = {
    HTML: "./src",
    ASSETS: {
        STYLE: "./src/assets/scss",
        IMAGES: "./src/assets/images",
        SCRIPT : "./src/assets/js",
    },
};

const DIST_PATH = {
    HTML: "./dist",
    ASSETS: {
        STYLE: "./dist/assets/css",
        IMAGES: "./dist/assets/images",
        SCRIPT: "./dist/assets/js"
    },
};

gulp.task('html', () => {
    return gulp.src([PATH.HTML + "/*.html", "!src/templates/*.*"])
    .pipe(
        nunjucks({
            path: ["./src/templates"],
        }),
    )
    .pipe(gulp.dest(DIST_PATH.HTML))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', () => {
    const options = {
        outputStyle: 'expanded',  // expanded compressed
        indentType: 'sapce',
        indentWidth: 4,
        precision: 8,
        sourceComments: true
    }

    return gulp.src(PATH.ASSETS.STYLE + '/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss(options))
    .pipe(autoprefixer({cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH.ASSETS.STYLE))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('script', () => {
    return gulp.src(PATH.ASSETS.SCRIPT + '/*.js')
    // .pipe(babel({
    //     'presets': [
    //         '@babel/preset-env'
    //     ]
    // }))
    // .pipe(uglify())
    .pipe(gulp.dest(DIST_PATH.ASSETS.SCRIPT))
    .pipe(browserSync.reload({stream:true}))
})

gulp.task('images', () => {
    return gulp.src(PATH.ASSETS.IMAGES + '/*.*')
    .pipe(gulp.dest(DIST_PATH.ASSETS.IMAGES))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('clean', () => {
    return gulp.src(DIST_PATH.HTML, {read: false})
    .pipe(clean())
})

gulp.task('nodemon', cb => {
    let started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    })
})

gulp.task('browser-sync', 
    gulp.series('nodemon', () => {
        browserSync.init(null, {
            proxy: 'http://localhost:8080',
            port: 8081
        })
    })
)

gulp.task('watch', () => {
    gulp.watch(PATH.HTML +'/**/*.html', gulp.series(['html']))
    gulp.watch(PATH.ASSETS.STYLE +'/**/*.scss', gulp.series(['scss']))
    gulp.watch(PATH.ASSETS.SCRIPT +'/**/*.js', gulp.series(['script']))
    gulp.watch(PATH.ASSETS.IMAGES +'/**/*.*', gulp.series(['images']))
})

const series = gulp.series([
    'clean',
    'html',
    'scss',
    'script',
    'images',
    gulp.parallel('browser-sync', 'watch')
])

gulp.task('default', series)