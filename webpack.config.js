const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}, argv = {}) => {
  return {
    module: {
      rules: require("./config/module.rules")(env, argv)
    },
    devtool: "source-map",
    plugins: [
      argv.mode === "development" ? new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }) : null,
      argv.mode === "production" ? new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }) : null,
    ].filter((plugin) => !!plugin),
    resolve: {
      extensions: [".js", ".jsx"],
    }
  }
};
