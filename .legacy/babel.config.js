module.exports = {
	presets: [['@babel/env', { modules: false }], '@babel/preset-react'],
	plugins: [
		[
			'effector-logger/babel-plugin',
			'module-resolver',
			{
				root: ['./'],
				alias: {
					'@client': './src/client',
					'@server': './src/server',
					'@cli': './src/cli',
					'@core': './src/core',
				},
			},
		],
	],
}
