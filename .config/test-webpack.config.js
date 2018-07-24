var webpack = require('webpack');
var path = require('path');

var babelOptions = {
    "presets": [
        ["es2015", { "modules": false }],
        "stage-3"
    ],
    "comments": false,
    "env": {
        "test": {
            "plugins": [ "istanbul" ],
            "presets": [ ["es2015"] ]
        }
    },
    "plugins": [
        ["transform-es2015-modules-commonjs", {
            "allowTopLevelThis": true
        }]
    ]
};

module.exports = {
    devtool: '#inline-source-map',

    entry: [
        './test/index.spec',
    ],

    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    target: 'node',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            src: path.resolve('./src')
        },
    },

    /*module: {
        rules: [
            {
                test: /\.tsx||js?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },*/
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelOptions
                },
                {
                    loader: 'ts-loader'
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            ]
        }]
    },
};