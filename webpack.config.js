// webpack.config.js
import { DefinePlugin } from "webpack";
import process from "process";

export const plugins = [
  new DefinePlugin({
    "process.env": JSON.stringify(process.env), // Pass environment variables
  }),
];

export default {
  //...
  externals: {
    ["@solana/web3.js"]: "commonjs @solana/web3.js",
  },
};
