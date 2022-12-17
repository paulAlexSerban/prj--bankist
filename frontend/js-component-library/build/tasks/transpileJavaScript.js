import {src, dest, lastRun } from 'gulp';
import gulpWebpack from 'webpack-stream';
import webpack from 'webpack';
import { webpackDevConfig } from '../config/webpack.config';
import { paths } from '../config/paths';
import plumber from 'gulp-plumber';
import rename from "gulp-rename";
import through from 'through';
import path from "path";
import debug from 'gulp-debug';
import { onError } from "../utils/onError";

const nodeEnv = process.env.NODE_ENV || "development";

export const transpileJavaScript = () => {
  console.log(
    `Executing TRANSPILE:JAVASCRIPT on '${paths.src.scripts.javaScriptPages}' in MODE: ${nodeEnv}`
  );
  return new Promise((resolve, reject) => {
    return src([...paths.src.scripts.javaScriptPages, ...paths.src.scripts.javaScriptLibrary], { since: lastRun(transpileJavaScript) })
    .pipe(debug({title: 'transpileJavaScript :'}))
    .pipe(
      plumber({
        errorHandler: onError,
      })
    )
    .pipe(through(function(file) {
      const relative = path.relative(".", file.path).split(".");
      relative.pop();
      file.named = relative.join(".");
      this.queue(file);
    }))
    .pipe(gulpWebpack( webpackDevConfig, webpack))
    .pipe(
      rename((file) => {
        const moduleType = file.basename.split(".")[1];
        file.dirname = `javascript/${moduleType}`;
      })
    )
    .pipe(dest(paths.dist.dir))
    .on("error", reject)
    .on("end", resolve);
  })

};
