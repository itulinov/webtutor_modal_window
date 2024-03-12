const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = require(
    "webpack/lib/container/ModuleFederationPlugin"
)


module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['react-refresh/babel', 'macros'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                             modules: {
                                auto: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
            },
            {
                test: /\.(png|jpe?g|webp|gif|woff2|woff|eot|ttf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    watchOptions: {
        poll: 1000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new ModuleFederationPlugin({
            name: "mw",
            remotes: {
                mwLib: "mwLib@https://localhost:3003/remoteEntry.js",
            }
        }),
    ],
    externals: {
        Chart: 'Chart',
        $: '$',
        jQuery: 'jQuery',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
        alias: {
            '@App': path.resolve(__dirname,             './src/App'),
            '@components': path.resolve(__dirname,      './src/App/components'),
            '@hooks': path.resolve(__dirname,           './src/App/hooks'),
            '@context': path.resolve(__dirname,         './src/App/context'),
            '@services': path.resolve(__dirname,        './src/services'),
        },
    },
};
