const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const packageJSON = require( '../package.json' );

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/auth/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './Auth': './src/bootstrap.js'
            },
            shared: packageJSON.dependencies
        })
    ],
}

module.exports = merge(commonConfig, prodConfig);