const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const slide = process.env.SLIDE || 'test';
const template = '!!pug-loader!' + resolve(__dirname, `presentations/${slide}/${slide}.pug`);
const entry = {};
entry[slide] = resolve(__dirname, `presentations/${slide}/${slide}.js`);
module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsm', '.ts', '.json'] },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'assets/' + slide + '.css' }),
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      template,
      chunks: [slide],
      filename: `${slide}.html`,
    }),
  ],
  output: {
    filename: 'assets/[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    path: resolve(__dirname, '..'),
    clean: false,
  },
  optimization: {
    minimize: true,
  },
};
