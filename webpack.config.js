const path = require('path');

module.exports = () => {
  return {
    entry: ['babel-polyfill', './client/client.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
}