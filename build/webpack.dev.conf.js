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
        // host: 'localhost', // can be overwritten by process.env.HOST
        open: true,
        quiet: true, // 结合FriendlyErrorsWebpackPlugin 将打包出来的日志进行清除
        proxy: {
            '/*.mock':{
                target: 'http://127.0.0.1:5021'
            }
        }
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