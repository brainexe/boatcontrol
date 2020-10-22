const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CSS = [
    'bootstrap/dist/css/bootstrap.css',
    'angular-ui-bootstrap/ui-bootstrap-csp.css',
];
const JS = [
    'angular/angular.min.js',
    'bootstrap/dist/js/bootstrap.bundle.js',
    'socket.io-client/dist/socket.io.slim.js',
    'angular-ui-bootstrap/ui-bootstrap-tpls.min.js'
];

module.exports = {
    entry: {
        app: "./browser/app/app.js",
    },
    output: {
        path: __dirname + "/browser/assets/",
        filename: "[name].bundle.js"
    },
    plugins: [
      new CopyWebpackPlugin(
          [...JS, ...CSS].map(asset => {
          return {
            from: path.resolve(__dirname, `./node_modules/${asset}`),
            to: path.resolve(__dirname, './browser/assets/')
          };
        })
      )
    ]
};
