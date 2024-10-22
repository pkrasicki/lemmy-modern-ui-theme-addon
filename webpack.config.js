const path = require('path');

module.exports =
{
	entry: "./content-script.js",
	mode: "development",
	devtool: process.env.NODE_ENV == "production" ? "source-map" : "inline-source-map",
	output:
	{
		path: path.resolve(__dirname, "dist"),
		filename: "content-script.js",
	},
	module:
	{
		rules:
		[
			{
				test: /\.scss$/,
				use:
				[
					"to-string-loader",
					"css-loader", // Translates CSS into CommonJS
					"sass-loader", // Compiles Sass to CSS
				],
			},
		],
	},
};