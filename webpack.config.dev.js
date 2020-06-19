const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const webpack = require("webpack");

const devConfig = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "script/[name][hash:6].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer:  {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: '8080',
    inline: true,
    open: true,
    overlay: true
  },

  plugins: [
    //支持ejs模板引擎的写法
    new htmlwebpackplugin({
      title: "首页",
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = devConfig;