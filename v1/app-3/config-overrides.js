const rewireAliases = require("react-app-rewire-aliases");

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({})(config, env);
  config.output.library = "singleReact";
  config.output.libraryTarget = "window";
  config.output.globalObject = 'this';
  return config;
};
