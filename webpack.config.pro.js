const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const proConfig = {
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "script/[name][hash:6].js",
    // publicPath: 'build/'
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "./src/style"),
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../'
            }
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor"
        }
      }
    }
  },
  plugins: [
    //支持ejs模板引擎的写法
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    }),
    // 抽离css为独立文件输出
    new MiniCssExtractPlugin({
      filename: "style/[name][contenthash:6].css"
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    })
  ]
};

module.exports = proConfig;
