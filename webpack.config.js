module.exports = {
  resolve: {
    extensions: [".ts", ".js"],
  },
  entry: "./cypress/src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};
