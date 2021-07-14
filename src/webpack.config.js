const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = require("path").resolve;
const slide = process.env.SLIDE || 'test.pug';
const template = '!!pug-loader!' + resolve(__dirname, `presentations/${slide}/${slide}.pug`);
const entry = {};
entry[slide] = resolve(__dirname, `presentations/${slide}/${slide}.js`);
module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inlineSource: '.(js|css)$',
            inject: "head",
            scriptLoading: "defer",
            template,
            chunks: [slide],
            filename: `${slide}.html`
        }),
    ],
    output: {
        filename: "assets/[name].js",
        assetModuleFilename: 'assets/[hash][ext][query]',
        path: resolve(__dirname, ".."),
        clean: false
    },
    optimization: {
        minimize: true
    },
}