module.exports = {
  "stories": ["../v2/**/*.stories.mdx", "../v2/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-scss", "@storybook/addon-interactions", "@storybook/addon-console", "storybook-dark-mode"],
  "framework": {
    name: "@storybook/vue3-webpack5",
    options: {}
  },
  staticDirs: ['../assets-shared'],
  webpackFinal: async (config, {
    configType
  }) => {

    const envTheme = process.env.STORYBOOK_THEME
    await config.module.rules.push({
      test: /\.scss$/,
      use: [
        // 'style-loader',
        // 'css-loader',
        'sass-loader', {
          loader: 'sass-loader',
          options: {
            additionalData: `${process.env.STORYBOOK_EDIT === 'true' ? `@import "~/src/assets/themes/${envTheme}/_theme.scss";` : `@import "~/src/assets/themes/${envTheme}/${envTheme}.min.css"; @import "~/src/assets/themes/${envTheme}/variables.scss"; @import "~/src/assets/themes/${envTheme}/_mixins.scss";`} @import "~/src/assets/themes/${envTheme}/fonts/fonts.css"; @import "primevue/resources/primevue.min.css"; @import "primeicons/primeicons.css";`
          }
        }]
      // include: path.resolve(__dirname, '../'),

    })

    return config
  },
  docs: {
    autodocs: true
  }
}