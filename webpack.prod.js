// webpack.prod.js
import common from "./webpack.common.js";

export default {
  ...common,
  mode: "production",
  devtool: false, // optional: no source maps in prod
};
