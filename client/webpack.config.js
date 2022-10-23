const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'static',
};

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
}

const plugins = [
    new HtmlWebpackPlugin({
        title: 'Todos',
        template: `${PATHS.src}/index.html`,
        favicon: `${PATHS.src}/assets/img/favicon.ico`,
    }),
    new MiniCssExtractPlugin({
        filename: `${PATHS.assets}/css/[name].[contenthash].css`,
    }),
];

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode,
    target,
    plugins,
    entry: {
        main: `${PATHS.src}/index.js`,
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}/js/[name].[contenthash].js`,
        assetModuleFilename: `${PATHS.assets}/[hash][ext][query]`,
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        open: {
            app: {
                name: 'Google Chrome',
            },
        },
        port: 3000,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}/img/[hash][ext][query]`,
                },
            },
            // {
            //     test: /.svg$/,
            //     type: 'asset',
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 20 * 1024 // 20kb
            //         }
            //     },
            //     use: 'svgo-loader'
            // },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}/fonts/[hash][ext][query]`,
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 name: 'vendors',
    //                 test: /node_modules/,
    //                 chunks: 'all',
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
};
