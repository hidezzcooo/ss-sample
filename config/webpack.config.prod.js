const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: {
  	index: './src/script/index.js'
  },
  output: {
  	filename: 'script/[name].js',
  	path: path.resolve(__dirname, '../dist')
  },
  module: {
  	rules: [
  	 	{
	      test: /\.js$/,
	      exclude: __dirname + 'node_modules',
	      include: __dirname + 'src',
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    },
  		{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
  	]
  },
  plugins: [
    new ExtractTextPlugin('./style/index.css'),
  	new HtmlWebpackPlugin({
  		template: './src/index.html'
  	}),
  	new OptimizeCssAssetsPlugin(),
  	new UglifyJsPlugin()
  ]
}
