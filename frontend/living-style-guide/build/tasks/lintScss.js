import { src, lastRun } from "gulp";
import gulpStylelint from "@ronilaukkarinen/gulp-stylelint";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import { paths } from "../config/paths";

export const lintScss = () => {
  return new Promise((resolve, reject) => {
    return src(paths.src.styles.scssFiles, { since: lastRun(lintScss) })
      .pipe(plumber())
      .pipe(debug({ title: "lintScss : " }))
      .pipe(
        gulpStylelint({
          failAfterError: true,
          reporters: [{ formatter: "string", console: true }],
          debug: true,
        })
      )
      .on("error", reject)
      .on("end", resolve);
  });
};
