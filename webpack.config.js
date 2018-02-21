const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          loader: 'babel-loader'
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
      CSSExtract
    ]
  }
}