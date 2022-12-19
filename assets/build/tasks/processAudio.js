import { src, dest } from "gulp";
import { paths } from "../config/paths";
import plumber from "gulp-plumber";
import size from "gulp-size";

export const processAudio = () => {
  return new Promise((resolve, reject) => {
    return src(paths.src.assets.audio)
      .pipe(
        plumber()
      )
      .pipe(
        size({
          title: "processAudio : ",
          showFiles: true,
          showTotal: true,
        })
      )
      .pipe(dest(`${paths.dist.dir}/audio`))
      .on("error", reject)
      .on("end", resolve);
  });
};
