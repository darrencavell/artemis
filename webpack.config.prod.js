const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: { main: path.join(__dirname, './src/index.js') },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle[chunkhash:4].js',
    publicPath: '/assets/'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebPackPlugin({
    //   template: "./src/index.html",
    //   filename: "index.html"
    // }),
    new CopyWebpackPlugin([{
      from: "./public"
    }]),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/sw-src.js",
      swDest: "sw.js"
    })
  ]
}