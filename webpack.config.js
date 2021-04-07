const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  mode: "none", // To make the code readable in AWS Lambda
};