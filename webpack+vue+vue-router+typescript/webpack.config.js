const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引入vue-loader库
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Fiber = require('fibers');

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'src/ts/index.ts'),
    // style: ['./src/css/index.css']
  },
  externals: {
    'vue': 'Vue',
    '$': '$',
    'axios': 'axios',
    'echarts': 'echarts',
    'vuex': 'Vuex',
  },
  devtool: '#eval-source-map',
  stats: 'normal',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'src'),
    host: '192.168.1.91',
    compress: true,
    port: 9000,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [
          path.resolve(__dirname, `src/vendor`)
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../imgs/',
              outputPath: 'imgs'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        exclude: [
          path.resolve(__dirname, `src/vendor`)
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          // {
          //   loader: "style-loader"
          // },
          // {
          //   loader: "css-loader"
          // },
          // {
          //   loader: "sass-loader",
          //   // options: {
          //     // implementation: require('sass'),
          //     // fiber: Fiber,
          //     // includePaths: ["absolute/path/a", "absolute/path/b"]
          //   // }
          // }
        ],
      },
      {
        test: /\.tsx?$/, loader: 'ts-loader',//ts加载器
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/.vue$/]
        } //认识vue文件
      },
      // {test: /\.css$/, loader: 'vue-style-loader!css-loader'} //css加载器
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/[name].js?hash=[hash]`,
    chunkFilename: `js/[name].js?hash=[chunkhash]`,
    sourceMapFilename: `sourcemaps/[file].map?hash=[hash]`,
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'dist/css',
        'dist/js',
        'dist/sourcemaps',
        'dist/*.*',
      ]
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?hash=[chunkhash]',
    }),
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
    }),
    /*new CopyWebpackPlugin([
      {
        from: `./vendor/!**!/!*`,
        to: `./`
      },
      {
        from: `./data/!**!/!*`,
        to: `./`
      },
      {
        from: `./imgs/!**!/!*`,
        to: `./`
      },
    ]),*/
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: { // 这里开始设置缓存的 chunks
        vendor: { // key 为entry中定义的 入口名称
          chunks: "all", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          test: /[\\/]node_modules[\\/]/, // 正则规则验证，如果符合就提取 chunk
          name: "vendor", // 要缓存的 分隔出来的 chunk 名称
          minChunks: 1,
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        },
        comms: { // key 为entry中定义的 入口名称
          chunks: "all", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          test: /[\\/]js[\\/]/, // 正则规则验证，如果符合就提取 chunk
          name: "comms", // 要缓存的 分隔出来的 chunk 名称
          minChunks: 1,
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  },
  cache: true,
  watch: false,
};
