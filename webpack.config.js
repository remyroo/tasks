const path = require("path");
const webpack = require("webpack");

const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";

module.exports = {
  mode,
  devtool: "source-map",
  entry: {
    application: "./app/javascript/packs/Index.jsx",
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    moduleIds: "deterministic",
  },
};
