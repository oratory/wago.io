const webpack                  = require('webpack');
const {merge}                    = require('webpack-merge');
// const OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin');
// const MiniCSSExtractPlugin     = require('mini-css-extract-plugin');
// const UglifyJSPlugin           = require('uglifyjs-webpack-plugin');
// const CompressionPlugin        = require('compression-webpack-plugin');
// const { CleanWebpackPlugin }   = require('clean-webpack-plugin');
const helpers                  = require('./helpers');
const commonConfig             = require('./webpack.config.common');
const isProd                   = true
const environment              = {NODE_ENV: 'production'}

const webpackConfig = merge(commonConfig, {
    mode: 'production',
    output: {
        clean: true,
        path: helpers.root('dist'),
        publicPath: '/',
        filename: 'js/[id].[hash].js',
        chunkFilename: 'js/[id].[hash].chunk.js',
        asyncChunks: true,
    },
    optimization: {
        runtimeChunk: 'single',
        // minimizer: [
        //     new OptimizeCSSAssetsPlugin({
        //         cssProcessorPluginOptions: {
        //             preset: [ 'default', { discardComments: { removeAll: true } } ],
        //         }
        //     }),
        //     new UglifyJSPlugin({
        //         cache: true,
        //         parallel: true,
        //         sourceMap: !isProd
        //     })
        // ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name (module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    }
                },
                styles: {
                    test: /\.css$/,
                    name: 'styles',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin(environment),
        // new CleanWebpackPlugin(),
        // new MiniCSSExtractPlugin({
        //     filename: 'css/[name].[hash].css',
        //     chunkFilename: 'css/[id].[hash].css'
        // }),
        // new CompressionPlugin({
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: new RegExp('\\.(js|css)$'),
        //     threshold: 10240,
        //     minRatio: 0.8
        // }),
        // new webpack.HashedModuleIdsPlugin()
    ]
});

module.exports = webpackConfig;