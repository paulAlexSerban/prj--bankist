import { src, dest } from "gulp";
import { paths } from "../config/paths";
import plumber from "gulp-plumber";
import size from "gulp-size";

export const processSvgs = () => {
  return new Promise((resolve, reject) => {
    return src(paths.src.assets.svgs)
    .pipe(
      plumber()
    )
      .pipe(
        size({
          title: "processSvgs : ",
          showFiles: true,
          showTotal: true,
        })
      )
      .pipe(dest(`${paths.dist.dir}/svgs`))
      .on("error", reject)
      .on("end", resolve);
  });
};
