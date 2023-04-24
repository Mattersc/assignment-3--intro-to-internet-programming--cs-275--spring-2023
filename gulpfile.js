const { src, dest, series } = require(`gulp`);
const htmlCompress = require(`gulp-htmlmin`);
const cssLint = require(`gulp-stylelint`);
const jsTranspile = require(`gulp-babel`);
const jsLint = require(`gulp-eslint`);
const jsCompress = require(`gulp-uglify`);
const cssCompress = require(`gulp-uglifycss`);
const reload = require(`browser-sync`);
const lintGulp = require(`gulp-eslint`);

let browserChoice = `default`;

let browserRestart = () => {
    reload({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temporary`,
            ]
        }
    });
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompress())
        .pipe(dest(`prod/styles`));
};

let compressHTMLDev = () => {
    return src(`*.html`)
        .pipe(htmlCompress({collapseWhitespace:true}))
        .pipe(dest(`temporary`));
};

let compressHTMLProd = () => {
    return src(`*.html`)
        .pipe(htmlCompress({collapseWhitespace:true}))
        .pipe(dest(`prod`));
};

let fixJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsTranspile())
        .pipe(jsCompress())
        .pipe(dest(`prod/scripts`));
};

let GulpLint = () => {
    return src(`gulpfile.js`)
        .pipe(lintGulp())
        .pipe(lintGulp.result(result => {
            console.log(`ESLint: ${result.filePath}`);
        }));
};

let lintCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssLint({
            reporters: [{formatter: `string`, console: true}]}))
        .pipe(dest(`temporary/styles`));
};

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLint())
        .pipe(jsLint.result(result => {
            console.log(`ESLint: ${result.filePath}`);
        }))
        .pipe(dest(`temporary/scripts`));
};

let transpileJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsTranspile())
        .pipe(dest(`temporary/scripts`));
};

exports.default = series(
    lintCSS,
    lintJS,
    transpileJS,
    compressHTMLDev,
    browserRestart
);

exports.build = series(
    compressHTMLProd,
    compressCSS,
    fixJS
);

exports.gulpLinter = series(
    GulpLint
);
