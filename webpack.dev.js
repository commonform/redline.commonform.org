const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: {
		editor: [
			'@babel/polyfill',
			'./src/editor'
		]
	},

	output: {
		filename: 'editor.js',
	},

	module: {
		rules: [{
			include: [
				path.resolve(__dirname, 'src')
			],
			test: /\.js$/
		}, {
			test: /\.(js)$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
			loader: 'url-loader'
		}, {
			test: /\.css$/,
			use: [{
				loader: 'style-loader',
				options: {
					sourceMap: true
				}
			}, {
				loader: 'css-loader'
			}]
		}]
	},

	resolve: {
		extensions: ['.js'],
		alias: {
			'mergely':			path.join(__dirname, 'node_modules', 'mergely'),
			'CodeMirror':		path.join(__dirname, 'node_modules', 'codemirror'),
			'jQuery':		 	path.join(__dirname, 'node_modules', 'jquery'),
			'jquery-ui-core':   path.join(__dirname, 'node_modules', 'jquery-ui', 'ui', 'core.js'),
			'jquery-ui':		path.join(__dirname, 'node_modules', 'jquery-ui'),
			'farbtastic':		path.join(__dirname, 'node_modules', 'farbtastic'),
			'tipsy':			path.join(__dirname, 'node_modules', 'tipsy', 'src', 'javascripts', 'jquery.tipsy.js'),
			'wickedmenu':		path.join(__dirname, 'src')
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/editor.html',
			filename: 'mergely.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.ProvidePlugin({
			CodeMirror: 'codemirror'
		})
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},
			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
