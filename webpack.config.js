const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	mode: "development",
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "/dist"),
		publicPath: "/",
		filename: "index_bundle.js",
		chunkFilename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				include: [path.resolve(__dirname, "src")],
				exclude: [path.resolve(__dirname, "node_modules")],
				loader: "babel-loader",
				query: {
					presets: [
						[
							"@babel/env",
							{
								targets: {
									browsers: "last 2 chrome versions"
								}
							}
						]
					]
				}
			}
		]
	},

	plugins: [new HtmlWebpackPlugin({})],
	resolve: {
		extensions: [".json", ".js", ".jsx"]
	},
	devtool: "source-map",
	devServer: {
		contentBase: path.join("/dist/"),
		inline: true,
		host: "0.0.0.0",
		port: 8080
	}
};
