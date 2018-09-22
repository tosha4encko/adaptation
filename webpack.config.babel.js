const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.tsx'
  },
  output:  {
      path: __dirname + '/my_TB/main/static',
      filename: 'index.js'
  },
  module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use:{
              loader: 'ts-loader',
              options: {
	              transpileOnly: true,
	              onlyCompileBundledFiles: true,
            }
          }           
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
  },
  resolve: {
      extensions: ['*', '.tsx', '.ts', '.json', '.js', '.jsx']
  },
  mode: "development",
  devtool: 'source-map',
  watch: true,
  watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
  },
  plugins: [
      new ExtractTextPlugin('styles.css')
  ]
}
