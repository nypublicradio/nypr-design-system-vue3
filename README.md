# NODE version 14.19.0 

## How to use in another project

This repository is packaged as an npm package. To use in your project, add the following to the `.npmrc` file in the root directory. Replace `your_personal_access_token` with a github personal access token that has `read:packages` permission.

```bash
@nypublicradio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=your_personal_access_token
```
Only commit the `.npmrc` file with the first line to git. Your personal access token should *never* be committed to git. If you accidentally commit your personal access token, delete it and generate a new personal access token with `read:packages` permission. 

## Installation
```
npm i
```

## Storybook
if STORYBOOK_EDIT is set to false (default = ture), it will use the compiled minified theme and not provide real time updates as you develop. This is useful when you just want to reference the storybook instance quickly because it builds way faster, and to test the minified theme build
```
npm run storybook
```

# TESTING 
VSCode users, install the test helper plugin: `https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer`

Vitest config found in this file: `./vitest.config.js`
## run Vitest tests
update THEME env var with the name of the theme you want to use: `.env` line 1
```
npm run test
```

## run Vitest tests with coverage
update THEME env var with the name of the theme you want to use: `.env` line 1
```
npm run coverage
```

## Themes location
src/assets/themes/

## global scss location
src/assets/library/

## build Themes 
```
npm run build-themes
```

## Prime Theme View
first, rename config file to `vite.config.js`
file being rendered: `src/components/Home.vue`
add/select the theme you want import here: `\src\main.js` line 51
```
npm run prime-serve
```



## Nuxt instance
first, rename config file to `--vite.config.js` to avoid conflict with nuxt.config.js
update THEME env var with the name of the theme you want to use: `.env` line 1
```
npm run dev
```

## font size scale reference helper
--font-size = 16px
--font-ratio = 1.125
--font-size-20 = 5.202rem/83.23px	
--font-size-19 = 4.624rem/73.98px	
--font-size-18 = 4.11rem/65.76px	    
--font-size-17 = 3.653rem/58.45px	
--font-size-16 = 3.247rem/51.96px	
--font-size-15 = 2.887rem/46.18px	
--font-size-14 = 2.566rem/41.05px	
--font-size-13 = 2.281rem/36.49px	
--font-size-12 = 2.027rem/32.44px	
--font-size-11 = 1.802rem/28.83px	
--font-size-10 = 1.602rem/25.63px	
--font-size-9 = 1.424rem/22.78px	
--font-size-8 = 1.266rem/20.25px	
--font-size-7 = 1.125rem/18.00px	
--font-size-6 = 1rem/16.00px	
--font-size-5 = 0.889rem/14.22px	
--font-size-4 = 0.79rem/12.64px	
--font-size-3 = 0.702rem/11.24px	
--font-size-2 = 0.624rem/9.99px	
--font-size-1 = 0.555rem/8.88px	
--font-size-0 = 0.493rem/7.89px	


## Creating a new theme
Navigate to nypr-design-system-vue3\src\assets\themes
Duplicate “radiolab” folder and rename it (no spaces in name)
Delete .min.css and .min.css.map in the new folder
In .env file, change THEME to equal the new name
Navigate to nypr-design-system-vue3\src\main.js  line:51
Add a new import for the new theme
import './assets/themes/newthemename/_theme.scss'
