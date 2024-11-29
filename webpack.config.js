// webpack.config.js
import { DefinePlugin } from "webpack";

export const plugins = [
  new DefinePlugin({
    "process.env": JSON.stringify(process.env), // Pass environment variables
  }),
];
