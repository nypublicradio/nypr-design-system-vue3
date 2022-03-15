const path = require('path')
module.exports = {
  "stories": ["../v2/**/*.stories.mdx", "../v2/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-docs", "@storybook/preset-scss", "storybook-dark-mode"],
  "framework": "@storybook/vue3",
  core: {
    builder: "webpack5"
  },
  staticDirs: ['../assets-shared'],
  webpackFinal: async (config, { configType }) => {

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        // 'style-loader',
        // 'css-loader',
        'sass-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: '@import "~/src/assets/themes/radiolab/_theme.scss"; @import "primevue/resources/primevue.min.css"; @import "primeicons/primeicons.css"; body.dark{background-color: #080808 !important;}',
            // additionalData: '@import "./assets/scss/main.scss";',
            //@import "primeflex/primeflex.scss";
            //@import "primevue/resources/themes/lara-light-blue/theme.css";
          },
        },
      ],
      // include: path.resolve(__dirname, '../'),
    })
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     'style-loader',
    //     'css-loader',
    //     {
    //       loader: 'css-loader',
    //     },
    //   ],
    // })
    return config
  },
}
