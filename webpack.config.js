const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [    './src/client/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
    alias: {
      '@client': path.resolve(__dirname, 'src/client/'),
      '@server': path.resolve(__dirname, 'src/client/'),
      '@cli': path.resolve(__dirname, 'src/client/'),
      '@core': path.resolve(__dirname, 'src/core/'),
    }
  }
};

module.exports = config;
