const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJSON = require( '../package.json' );

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './Marketing': './src/bootstrap.js'
            },
            shared: packageJSON.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
}

module.exports = merge(commonConfig, devConfig);