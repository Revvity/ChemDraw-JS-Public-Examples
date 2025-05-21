//
// webpack.config.js
//
// Copyright © 2023 Revvity Signals Software, Inc. All rights reserved.
//

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const package = require("./package.json");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    port: 3000,
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),

    // Copy CDJS rather than importing it as a node module. CDJS is too big
    // for webpack to bundle directly.
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/@revvity-signals/chemdraw-js/dist/chemdrawweb",
          to: "assets/chemdrawweb",
        },
      ],
    }),

    new HtmlWebpackPlugin({
      title: package.name,
      template: path.join(__dirname, "src/index.ejs"),
      appMountId: "root",
      cdjs: "http:/assets/chemdrawweb/chemdrawweb.js",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.xml$/,
        type: "asset/source",
      },
    ],
  },
};
