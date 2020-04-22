const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',

	entry: {
		editor: [
			'@babel/polyfill',
			'./src/editor.js'
		]
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: './[name].js',
		library: 'editor',
		libraryTarget: 'umd',
		umdNamedDefine: true
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
			template: 'src/index.html',
			filename: 'index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.ProvidePlugin({
			CodeMirror: 'codemirror'
		})
	]
};
