const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const packageJSON = require( '../package.json' );

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './Marketing': './src/bootstrap.js'
            },
            shared: packageJSON.dependencies
        })
    ],
}

module.exports = merge(commonConfig, devConfig);