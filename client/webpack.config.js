var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ["babel-polyfill", './src/index.js'], 
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // output: {
    //     path: __dirname + '/assets'
    //   },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: [/.css$/, /\.s[ac]ss$/i],
                use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
              }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'style.min.css'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minimize: true
    }),
    new CopyPlugin([
        { from: 'src/img', to: 'img' }
      ])],
    devServer: {
        historyApiFallback: true,
        port: 5000
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}