const pkg = require("./package");
const path = require("path");
const args = require("yargs").argv;
const IS_DEV = process.env.NODE_ENV !== "production";
const dirNode = path.resolve(__dirname, "node_modules");
const dirApp = path.resolve(__dirname, "src");
const dirAssets = path.resolve(__dirname, "assets");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const Autoprefixer = require("autoprefixer")({
  browsers: ["last 2 version", "> 1%", "IE 10"]
});

/**
 * Webpack Configuration
 */
module.exports = {
  entry: ["./src/index.js", "./client.js"],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    modules: [dirAssets, dirApp, dirNode],
    alias: {
      "~": dirNode
    }
  },
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [dirApp]
      },
      // SCSS | CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: IS_DEV,
              plugins: [PostcssFlexbugsFixes, Autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: IS_DEV,
              data: "$prefix: " + pkg.prefix + ";"
            }
          }
        ]
      },

      // FONTS/IMAGES
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg|gif|png|jpe?g)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5120,
              name(file) {
                if (file.indexOf("fonts") > -1) {
                  return "fonts/[name].[ext]";
                } else {
                  return "images/[name].[ext]";
                }
              },
              fallback: "file-loader",
              outputPath: "./",
              publicPath: args.git ? pkg.name : "/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
      PKG: pkg
    }),
    new MiniCssExtractPlugin({
      filename: module.hot ? "css/[name].css" : "css/[name].[contenthash].css",
      chunkFilename: "css/[id].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.ejs"),
      title: pkg.description
    })
  ],
  devtool: "inline-source-map"
};
