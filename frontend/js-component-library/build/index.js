import { task, series, watch, parallel } from "gulp";
import { paths } from "./config/paths";
import { lintJavaScript } from "./tasks/lintJavaScript";
import { transpileJavaScript } from "./tasks/transpileJavaScript";

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------
const watchJS = () => {
  const folder = paths.src.scripts.javaScriptFiles;
  watch(folder, series(lintJavaScript, transpileJavaScript));
};

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

task("lint", series(lintJavaScript));
task("transpile", series(transpileJavaScript));
task("watch", series(lintJavaScript, transpileJavaScript, watchJS));
