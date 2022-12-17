import { src, lastRun } from "gulp";
import eslint from "gulp-eslint";
import { paths } from "../config/paths";
import plumber from "gulp-plumber";
import debug from "gulp-debug";
import { onError } from "../utils/onError";

export const lintJavaScript = () => {
  return src(paths.src.scripts.javaScriptFiles, { since: lastRun(lintJavaScript) })
    .pipe(
      plumber({
        errorHandler: onError,
      })
    )
    .pipe(eslint())
    .pipe(debug({ title: "lintJavaScript : " }))
    .pipe(
      eslint.results((results) => {
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
      })
    );
};
