const smWebpack = require('sm-webpack-config');

const config = {
	sourcePath: 'examples/simple',
	sourceMap: true,
	devServerPort: 3001,
	appPort: 3000,
	eslint: false,
	entry: {
		app: 'index.js',
	},
	devServer: {
		clientLogLevel: 'info',
	},
};

// The development server (the recommended option for development)
smWebpack.runDevServer({config}).then(() => {
	console.log('Running Dev Server');
});
