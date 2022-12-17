/* eslint-disable import/no-unresolved */
import webpack from "webpack";
import { es5jsLoader } from "../loaders/jsLoader";
import TerserPlugin from "terser-webpack-plugin";

const plugins = [new webpack.ProgressPlugin()];

const nodeEnv = process.env.NODE_ENV || "development";

export const webpackDevConfig = {
  mode: "production",
  cache: true,
  watch: nodeEnv !== "development" && nodeEnv !== "production",
  // devtool: false, /* uncomment if source mapping is not desired */
  module: {
    rules: [es5jsLoader],
  },
  optimization: {
    minimize: true ,
    minimizer: [new TerserPlugin()],
  },
  plugins: [...plugins],
};
