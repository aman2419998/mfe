const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const packageJSON = require( '../package.json' );

const devConfig = {
    mode: 'development',
    output:{
        publicPath: 'http://localhost:8083/'
    },
    devServer: {
        port: 8083,
        historyApiFallback: true
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

module.exports = merge(commonConfig, devConfig);