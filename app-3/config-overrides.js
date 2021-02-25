const rewireAliases = require("react-app-rewire-aliases");

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({})(config, env);
  config.entry = "./src/index.js";
  config.output.libraryTarget = "system";
  config.output.filename = "app3.js";

  return config;
};
