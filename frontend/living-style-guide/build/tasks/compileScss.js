import { src, dest } from "gulp";
import { paths } from "../config/paths";
import dartSass from "dart-sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import stripCssComments from "gulp-strip-css-comments";

import prettier from "gulp-prettier";
import wait from "gulp-wait";
import gulpif from "gulp-if";
import minifyCss from "gulp-minify-css";
import cleanCss from "gulp-clean-css";
import size from "gulp-size";

const sass = gulpSass(dartSass);
const plugins = [autoprefixer()];
const nodeEnv = process.env.NODE_ENV || "development";

export const compileScss = () => {
  console.log(
    `Executing Compile SCSS on '${paths.src.styles.scssPages}'`
  );
  return new Promise((resolve, reject) => {
    return (
      src([...paths.src.styles.scssPages])
        .pipe(
          plumber()
        )
        .pipe(wait(200))
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(postcss(plugins))
        .pipe(
          rename((file) => {
            const moduleType = file.basename.split(".")[1];
            file.dirname = `css/${moduleType}`;
          })
        )
        .pipe(
          cleanCss({
            level: {
              2: {
                restructureRules: true,
                removeDuplicateRules: true,
              },
            },
          })
        )
        // .pipe(debug({ title: "@debug compileScss : " }))
        .pipe(stripCssComments())
        .pipe(prettier())
        .pipe(gulpif(nodeEnv !== "development", minifyCss()))
        .pipe(
          size({
            title: "compileScss : ",
            showFiles: true,
            showTotal: true,
          })
        )
        .pipe(dest(paths.dist.dir))
        .on("error", reject)
        .on("end", resolve)
    );
  });
};
