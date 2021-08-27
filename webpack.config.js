const webpack = require('webpack')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config = {
	entry: ['./src/client/index.tsx'],
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'ts-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: 'file-loader',
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							mimetype: 'image/png',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin({ configFile: 'tsconfig.client.json' }),
		],
		alias: {
			'@client': path.resolve(__dirname, 'src/client/'),
			'@server': path.resolve(__dirname, 'src/server/'),
			'@cli': path.resolve(__dirname, 'src/cli/'),
			'@core': path.resolve(__dirname, 'src/core/'),
		},
	},
}

module.exports = config
