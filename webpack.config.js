import path from "path";

export default {
  entry: "./src/app.lambda.js",
  output: {
    path: path.resolve(path.resolve(), "build"),
    filename: "main.js",
    libraryTarget: 'commonjs2',
  },
  target: "node",
};
