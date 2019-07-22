const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ([
    {
        test: /\.(js|jsx)$/,
        use: "babel-loader"
    },
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
    },
    {
        test: /\.(scss|css)$/,
        use: [
            argv.mode === "production" ? MiniCssExtractPlugin : "style-loader",
            "css-loader",
            "sass-loader"
        ]
    }
]);
