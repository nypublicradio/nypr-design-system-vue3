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

## Selecting your theme
In the `.env` file on line 1, update the THEME env var with the name of the theme you want to use. Just use the directory name in the themes folder. `src/assets/themes/`. This theme will be used in the Storybook and Nuxt instances


## Storybook
if STORYBOOK_EDIT env var is set to true (default = false), it will use the _theme.scss file and provide real time updates as you develop. Unfortunalty, this results is a very slow build. You are better off quickly building the theme and the currently running storybook instance will update with the changes.
```
npm run storybook
```
NOTE: be sure to build the theme to see the theme updates
```
npm run build-theme themeName
```

# TESTING 
VSCode users, install the test helper plugin: `https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer`

All the tests can be found here: `v2/src/tests/`

Vitest config found in this file: `./vitest.config.js`
## run Vitest tests
```
npm run test
```
## run Vitest tests on a specific component
```
npm run test VComponentName
```

## run Vitest coverage
```
npm run coverage
```

## Themes location
src/assets/themes/

## global scss location
src/assets/library/

## build all Themes
this will compile all the themes and output a .min and a .map file in the theme folder 
```
npm run build-themes
```

## build one Theme
this will compile one theme and output a .min and a .map file in the theme folder 
```
npm run build-theme themeName
```

## Nuxt instance
Manually navigate to /nuxt to view the sample `pages/nuxt.vue`
```
npm run dev
```
NOTE: be sure to build the theme to see the theme updates
```
npm run build-theme themeName
```

## Component library management
Each component has cssvars associated with it. The can befound in the `v2/src/assets/cssvars/` directory. Each theme imports the `_cssvars.scss` file. When creating a new component, be sure to add the components cssvars to the `_cssvars.scss` file.


## Prime Theme View
Prime Theme view is now included in the NUXT instance via pages/nuxt.vue
file being rendered: `src/components/Home.vue`


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
Navigate to `nypr-design-system-vue3\src\assets\themes`
Duplicate “default” folder and rename it (no spaces in name)
Delete `.min.css` and `.min.css.map` in the new theme folder
In the root `.env` file, change THEME on line 1 to equal the new name

## Updating the new theme
Make all variable changes to the `nypr-design-system-vue3/src/assets/themes/newthemename/variables.scss` file.
Put all your colors into the $colors sass object (this will export a gradient for each color that you can use in your project where the "-500" version is the selected color. Lower values are lighter, higher numbers are darker. eg. --blue-100,--blue-200,--blue-300,--blue-400,--blue-500,--blue-600,--blue-700,--blue-800,--blue-900).
You can then refer to that object in `variables.scss` when populating the scss variables like this `map-get($colors, "blue");`.
Add or modify css vars in the `nypr-design-system-vue3/src/assets/themes/newthemename/cssvars.scss` file. 
Do not remove any css vars, as they may be being used by our custom components in `nypr-design-system-vue3/v2/src/components`.
Be sure to use the css var font scale located in the `cssvars.scss` file for all font-sizes. Then reference chart above will how you choose.
When creating/modifying custom components, make sure to use the css vars when styling.
When modifying/overriding PrimeVue components for your new theme, add the styles to the `nypr-design-system-vue3/src/assets/themes/newthemename/extensions.scss` file. Once again, be sure to use css vars when styling. This will allow for the components to react to data-style-mode changes (dark mode etc).


## Updating the PrimeFlex breakpoints
default breakpoints
```
$xs: 375px !default;
$sm: 576px !default;
$md: 768px !default;
$lg: 992px !default;
$xl: 1200px !default;
```

The default PrimeFlex breakpoints css file we use (just adding xs:375 to their default) is located here: `nypr-design-system-vue3/src/assets/library/primeflex.min.css`

All the themes load this file by default in their respective `_theme.scss` file. You can create your own breakpoints by following the steps below.


To update them,
clone this repo: `https://github.com/primefaces/primeflex`
open this file `primeflex\styles\lib\core\_variables.scss`
and update/add the breakpoints you want to use
then run `npm run build:sass` to compile the new css files in the `dist-lib` directory.
Put the new css file in your theme directory and update the `_theme.scss` file to point to the new file.