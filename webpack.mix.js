const mix = require('laravel-mix');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./config.js');
const WebpackShellPlugin = require('webpack-shell-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('./').js([
	'resources/assets/js/dependencies.js',
	'resources/assets/js/init.js',
	'resources/assets/js/app.js',
], 'js/app.js');

mix.styles([
	// Start of dependencies
	'node_modules/bootstrap/dist/css/bootstrap.min.css',
	'resources/assets/css/dependencies/fontawesome-all.css',
	// End of dependencies
	// Start of custom css
	// End of custom css
], 'css/style.css');

mix.copyDirectory(config.dataPath, config.exportPath + 'data');

// Check the env status to enable nodemon
let nodemon;
if (process.env.NODE_ENV !== 'production') {
    nodemon = new WebpackShellPlugin({onBuildEnd: ['nodemon --watch export app.js']});
}

// Resolve the webpack bug, where fs is not a function
mix.webpackConfig({
	module: {
		rules: [
			{
				test: /\.exec\.js$/,
				use: ['script-loader']
			}
		],
	},
	plugins: [
		// Fixes warning in moment-with-locales.min.js
		//   Module not found: Error: Can't resolve './locale' in ...
		new webpack.IgnorePlugin(/\.\/locale$/),
		new ExtractTextPlugin("resources/assets/css/dependencies.css"),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
			Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
			Button: 'exports-loader?Button!bootstrap/js/dist/button',
			Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
			Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
			Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
			Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
			Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
			Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: 'exports-loader?Util!bootstrap/js/dist/util'
		}),
		nodemon
	],
	node: {
		fs: 'empty'
	}
});

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
