const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./utils')
module.exports = merge(baseConfig,{
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        open: true,
        quiet: true // 结合FriendlyErrorsWebpackPlugin 将打包出来的日志进行清除
    },
    plugins:[
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: ${false ? 'https' : 'http'}://localhost:8082`],
            },
            onErrors: true
                ? utils.createNotifierCallback()
                : undefined,
            clearConsole: true,
        })
    ]
})