const { merge }  = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "hzby",
    projectName: "client",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|mp4)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@component': path.resolve(__dirname, `src/component/`),
        '@util': path.resolve(__dirname, `src/util/`),
        '@page': path.resolve(__dirname, `src/page/`),
        '@context': path.resolve(__dirname, `src/context/`),
      },
    },
  });
};
