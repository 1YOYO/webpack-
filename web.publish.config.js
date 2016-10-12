var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports={
	entry:[
		path.resolve(__dirname,'src/app.js')
	],
	output:{
		path:path.resolve(__dirname,'publish'),
		filename: 'js/bundle.js',
	},
	module:{
		loaders:[{
			test: /\.jsx?$/, 
            loader: 'babel',
            query: {presets: ['es2015', 'react']}
		},
		{
		 	test: /\.css$/, // Only .css files
			loader:ExtractTextPlugin.extract("style-loader", "css-loader")
		},
		{
		     test: /\.scss$/,
		     loader:  ExtractTextPlugin.extract('style', "css!sass")
		 },
		 {
		      test: /\.(png|jpg)$/,
		      loader: 'url?limit=25000&name=images/[name].[ext]'
		 }


		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'Custom template using Handlebars',
			template:'./src/index.html'
		}),
		new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("app.css"),
        new OpenBrowserPlugin()
	]
}
