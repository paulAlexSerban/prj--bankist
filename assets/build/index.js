import { task, parallel, series} from "gulp";
import { clean } from "./tasks/clean";
import { processIcons } from "./tasks/processIcons";
import { processSvgs } from "./tasks/processSvgs";
import { createImageRenditions } from "./tasks/createImageRenditions";
import { processVideos } from "./tasks/processVideos";
import { processAudio } from "./tasks/processAudio";

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------
task(
  "process",
  series(clean, parallel( processIcons, createImageRenditions, processSvgs))
);
