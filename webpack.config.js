const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const merge = require("webpack-merge");
const proConfig = require("./webpack.config.pro.js");
const devConfig = require("./webpack.config.dev.js");

const baseConfig = {
  entry: './src/script/index.js',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, "./src/images"),
        use: {
          loader: "url-loader",
          options: {
            name: "[name][hash:6].[ext]",
            outputPath: "images/",
            limit: 2048,
            esModule:false
          }
        }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src/script"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      react: path.resolve(
        __dirname,
        "./node_modules/react/umd/react.production.min.js"
      ),
      "react-dom": path.resolve(
        __dirname,
        "./node_modules/react-dom/umd/react-dom.production.min.js"
      )
    },
    extensions: [".js"]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

module.exports = env => {
  if (env && env.production) {
    return merge(baseConfig, proConfig);
  } else {
    return merge(baseConfig, devConfig);
  }
};




