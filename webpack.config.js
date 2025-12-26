const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "landing-ui",

  shared: {
    ...shareAll({
      singleton: false,
      strictVersion: false,
      requiredVersion: false,
    }),
    "@clarium/ngce-components": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "@clarium/ngce-icon": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "@clarium/ngce-charts": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "@clarium/ezui-blocks": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },

    react: {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "react-dom": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "react-router-dom": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
  },
});
