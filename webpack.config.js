/**
 * Webpack utils
 */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ChunkWebpackPlugin = webpack.optimize.CommonsChunkPlugin

/**
 * Directory paths
 */
const webroot = 'target/webroot'

/**
 * Dev server config
 */
const devServerConfig = require('./webpack.dev-server.js')

/**
 * HTML METADATA
 */
const METADATA = {
  title: 'Salesforce Softphone',
  isDevServer: true
}

module.exports = {
    
    debug: true,
    devtool: 'source-map', 
    devServer: devServerConfig,

    resolve: {
        modulesDirectories: [ 'node_modules', 'src' ],
        extensions: [ '', '.ts', '.js', '.html' ]
    },
    
    entry: {
        polyfills: './src/polyfills.ts',
        index: './src/index.ts'
    },

    output: {
         path: path.resolve(__dirname, webroot),
         filename: '[name].js'
     },

     module: {
         loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { 
                test: /\.(html|css)$/, 
                loader: 'raw-loader',
                exclude: ['\/index.html$/']
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader!angular2-template-loader',
                exclude: /node_modules/
            },
         ]
     },

     plugins: [
        new HtmlWebpackPlugin({
            title: METADATA.title,
            filename: 'index.html',
            template: 'src/index.html',
            metadata: METADATA,
            inject: true
        })
    ],
}