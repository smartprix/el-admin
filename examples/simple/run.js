const smWebpack = require('sm-webpack-config');

const config = {
	sourcePath: 'examples/simple',
	sourceMap: true,
	eslint: false,
	entry: {
		app: 'index.js',
	},
	devServer: {
		port: 3010,
		appPort: 3011,
		clientLogLevel: 'info',
	},
};

// The development server (the recommended option for development)
smWebpack.runDevServer({config}).then(() => {
	console.log('Running Dev Server');
});
