import { task, series, parallel, watch, src, dest, lastRun } from "gulp";
import plumber from "gulp-plumber";
import debug from "gulp-debug";

import { paths } from "./config/paths";
import { clean } from "./tasks/clean";

import { lintHtml } from "./tasks/lintHtml";
import { compileHtml } from "./tasks/compileHtml";
import { processMetaFiles } from "./tasks/processMetaFiles";

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------
const getCSS = () => {
  return src("../living-style-guide/dist/**/*", { since: lastRun(getCSS) })
    .pipe(plumber())
    .pipe(debug({ title: "CSS : " }))
    .pipe(dest("dist"));
};

const getJavaScript = () => {
  return src("../js-component-library/dist/**/*", { since: lastRun(getJavaScript) })
    .pipe(plumber())
    .pipe(debug({ title: "JS : " }))
    .pipe(dest("dist"));
};

const getAssets = () => {
  return src("../../assets/dist/**/*", { since: lastRun(getAssets) })
  .pipe(plumber())
  .pipe(debug({ title: "ASSETS : " }))
  .pipe(dest("dist"));
}

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

// task("lint", parallel(lintHtml, lintScss));
task("build", series(clean, parallel(processMetaFiles, compileHtml, getJavaScript, getCSS, getAssets)));

task("watch", () => {
  watch("../js-component-library/dist/javascript/**/*", series(getJavaScript))
  watch("../living-style-guide/dist/css/**/*", series(getCSS));
  watch(paths.src.html.htmlFiles, series(lintHtml, compileHtml));
});
