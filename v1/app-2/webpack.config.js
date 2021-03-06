const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "hzby",
    projectName: "app-2",
    webpackConfigEnv,
    argv,
  });
  const output = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // output:{
    //   library: "singleReact",
    //   libraryTarget:"window",
    //   filename: 'static/js/bundle.js',
    //   chunkFilename: 'static/js/[name].chunk.js',
    // },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
  });
  return output;
};
