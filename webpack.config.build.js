const PKG = require("./package");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");
const args = require("yargs").argv;
const PurifyCSSPlugin = require("purifycss-webpack");

const publicPath = args.git ? PKG.name + "/" : "/";
const dist = args.git ? "docs" : "dist";

module.exports = merge(webpackConfig, {
  output: {
    path: path.join(__dirname, dist),
    filename: "[name].[chunkhash].js",
    publicPath: publicPath
  },

  plugins: [new CleanWebpackPlugin([dist])]
});
