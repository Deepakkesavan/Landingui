const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "landing-ui",
  library: { type: 'var', name: 'landing_ui' },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    }),
    "@clarium/ngce-components": {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
    "@clarium/ngce-icon": {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
    "@clarium/ngce-charts": {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
    "@clarium/ezui-blocks": {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },

    react: {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
    "react-dom": {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
    "react-router-dom": {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
  },
});

module.exports.output = {
  ...(module.exports.output || {}),
  publicPath: 'auto',
  scriptType: 'module'
}

module.exports.experiments = { ...(module.exports.experiments || {}), outputModule: true };
