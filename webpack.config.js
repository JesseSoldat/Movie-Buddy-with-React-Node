const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'development') {
  dotenv.config({path: '.env.development'});
}

module.exports = () => {
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill', './client/client.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        { 
          test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader",
          options: {
            name: '[name].[ext]'
          }
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.MOVIE_API': JSON.stringify(process.env.MOVIE_API)
      })
    ],
    // devtool: 'inline-source-map',
    // devServer: {
    //   historyApiFallback: true,
    //   port: 3000, // Defaults to 8080
    //   publicPath: '/dist/',
    //   contentBase: path.resolve(__dirname,'public'),
    //   proxy: {
    //     "/api/**": {
    //       target: "http://localhost:3001/",
    //       secure: false,
    //       changeOrigin: true
    //     }
    //   }
    // }
  }
}