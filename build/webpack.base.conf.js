const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
        ]
    },
    resolve:{
        alias:{
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new VueLoaderPlugin()
    ]
}