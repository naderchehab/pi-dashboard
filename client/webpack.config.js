const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        './src/index.jsx'
    ],
    output: {
        path: __dirname,
        filename: './public/dist/bundle.js',
        publicPath: '/dist'
    },
    module: {
        loaders: [{
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0']
            },
            {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!toolbox')
            }
        ]
    },
    toolbox: {theme: 'src/theme/config.scss'},
    plugins: [
        new ExtractTextPlugin('/public/dist/build.css', { allChunks: true })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.sass']
    }
};
