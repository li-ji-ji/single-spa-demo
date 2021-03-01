const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
	config = rewireAliases.aliasesOptions({
		'@component': path.resolve(__dirname, `${paths.appSrc}/component/`),
		'@util': path.resolve(__dirname, `${paths.appSrc}/util/`),
		'@page': path.resolve(__dirname, `${paths.appSrc}/page/`),
		'@context': path.resolve(__dirname, `${paths.appSrc}/context/`),
	})(config, env);
  return config;
}