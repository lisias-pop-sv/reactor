/*eslint-disable indent, no-var, no-undef, quotes*/
// const pathToReact = path.resolve(nodeModules, 'react/dist/react.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    addVendor (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    // devtool: '#sourcemap',
    entry: [
        // 'webpack-dev-server/client?http://0.0.0.0:3000',
        // 'webpack/hot/only-dev-server',
        __dirname + '/src/app/main.jsx'
    ],
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js' // filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.styl'],
        alias: {},
        root: __dirname + '/src/app'
    },
    module: {
        noParse: [], // preLoaders: [{test: /\.styl$/, loader: 'stylint'}],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css!stylus')
            },
            {
                test: /\.(eot|woff2?|svg|ttf|otf|png|json)(\?.*)?$/,
                loaders: ['file?name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('styles.css', {allChunks: true // publicPath: '/styles/',
        }) // , new Webpack.optimize.UglifyJsPlugin()
        , new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
