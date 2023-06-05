const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJSON = require( '../package.json' );

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8082,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJSON.dependencies
        })
    ],
}

module.exports = merge(commonConfig, devConfig);