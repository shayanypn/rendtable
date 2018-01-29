/* global __dirname, require, module*/

const webpack = require('webpack'),
UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
path = require('path'),
env = require('yargs').argv.env, // use --env with webpack 2
libraryName = 'rendtable';

let plugins = [],
  outputFile;

if (env === 'build') {
	plugins.push(
		new UglifyJsPlugin({
			uglifyOptions: {
				ie8: true,
				ecma: 8,
				warnings: false,
				parse: {},
				mangle: true,
				compress: {
					ecma: 8,
					arrows: true,
					booleans: true,
					comparisons: true,
					dead_code: true,
					passes: 2,
					expression: true,
					keep_fargs: false,
					toplevel: true
				},
				output: {
					comments: false,
					beautify: false,
				},
				toplevel: true,
				keep_classnames: false,
				keep_fnames: true,
				safari10: true
			}
		})
	);
}

const config = {
	entry: __dirname + '/app/app.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: (env === 'build') ? (libraryName + '.min.js') : (libraryName + '.js'),
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		modules: [path.resolve('./node_modules'), path.resolve('./src')],
		extensions: ['.json', '.js']
	},
	plugins: plugins
};

module.exports = config;
