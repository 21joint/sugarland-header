const PKG = require("./package");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");
const args = require("yargs").argv;
const CopyWebpackPlugin = require("copy-webpack-plugin");

// const PurifyCss = require("purifycss-webpack");

const publicPath = args.git ? "/" + PKG.name + "/" : "/";
const dist = args.git ? "./docs" : "./dist";

module.exports = merge(webpackConfig, {
  output: {
    path: path.join(__dirname, dist),
    filename: "[name].[chunkhash].js",
    publicPath: publicPath
  },

  plugins: [
    new CleanWebpackPlugin([dist]),
    new CopyWebpackPlugin([
      {
        from: "./**/*.{ico}",
        to: args.git ? "./docs/[name].[ext]" : "./dist/[name].[ext]"
      }
    ])
  ]
});
