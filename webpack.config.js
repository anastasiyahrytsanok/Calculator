const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/** @type {import('webpack').Configuration | ((env:any, argv:{mode?:string})=>import('webpack').Configuration)} */
module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      filename: "calculator.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        filename: "index.html",
        scriptLoading: "defer",
        minify: isProd && {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
    module: {
      rules: [{ test: /\.css$/i, use: ["style-loader", "css-loader"] }],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: { comments: false },
            compress: { dead_code: true, drop_console: true, passes: 2 },
          },
        }),
      ],
      splitChunks: false,
      runtimeChunk: false,
    },
    devtool: false,
    devServer: {
      static: { directory: path.resolve(__dirname, "dist") },
      port: 8080,
      open: true,
      hot: true,
      client: { overlay: true },
    },
  };
};
