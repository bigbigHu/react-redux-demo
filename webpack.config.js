// var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'source-map', 
    entry: __dirname + '/dist/index.js', //入口文件
    output: {
        path: __dirname + '/src/js',  //存放位置
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            //解析.css文件
            {
                test: /\.css$/, // Only .css files
                loader: 'style-loader!css-loader' //新版本需要写-loader
            },
            //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'  //新版本需要写-loader
            }
        ]
    }
}
