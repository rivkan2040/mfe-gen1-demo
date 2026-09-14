const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = webpack.container;
const deps = require('./package.json').dependencies;

// כתובות ה-API לפי סביבה (sviva). הפרויקט רץ ברשת סגורה, לכן אלה שמות
// מארח פנימיים בלבד ולא כתובות בעולם החיצון.
const API_HOSTS = {
  local: 'http://localhost:4001/api',
  dev: 'https://mfe-gen1-demo-dev.internal/api',
  test: 'https://mfe-gen1-demo-test.internal/api',
  lrn: 'https://mfe-gen1-demo-lrn.internal/api',
  prod: 'https://mfe-gen1-demo.internal/api',
};

module.exports = (env = {}) => {
  const sviva = env.sviva || 'local';
  const apiBaseUrl = API_HOSTS[sviva] || API_HOSTS.local;

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: 'auto',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          // מזריק את כתובת ה-API והסביבה בזמן build (ראו src/config/env.js)
          test: /[\\/]src[\\/]config[\\/]env\.js$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: '__API_BASE_URL__', replace: apiBaseUrl, flags: 'g' },
              { search: '__SVIVA__', replace: sviva, flags: 'g' },
            ],
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new ModuleFederationPlugin({
        name: 'mfeGen1Demo',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App',
          './ClaimDetailsPage': './src/pages/ClaimDetailsPage',
        },
        shared: {
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
          'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
        },
      }),
    ],
    devServer: {
      port: 3001,
      historyApiFallback: true,
      hot: true,
    },
    devtool: sviva === 'local' ? 'eval-source-map' : 'source-map',
  };
};
