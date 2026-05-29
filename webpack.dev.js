//webpack.dev.js
import common from "./webpack.common.js";

export default {
  ...common,
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
};
