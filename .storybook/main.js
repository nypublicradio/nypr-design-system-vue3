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
    const envTheme = process.env.STORYBOOK_THEME
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        // 'style-loader',
        // 'css-loader',
        'sass-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: `${process.env.STORYBOOK_EDIT === 'true' ? `@import "~/src/assets/themes/${envTheme}/_theme.scss";` : `@import "~/src/assets/themes/${envTheme}/${envTheme}.min.css"; @import "~/src/assets/themes/${envTheme}/variables.scss"; @import "~/src/assets/themes/${envTheme}/_mixins.scss";`} @import "primevue/resources/primevue.min.css"; @import "primeicons/primeicons.css"; body.dark{background-color: #080808 !important;}`,
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
