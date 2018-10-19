const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const args = require("yargs").argv;
module.exports = merge(webpackConfig, {
  devServer: {
    contentBase: require("path").resolve(__dirname, "/dist"),
    publicPath: "/",
    host: "localhost",
    hot: true,
    open: true
  },
  plugins: [
    //activates HMR
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    colors: true
  }
});
