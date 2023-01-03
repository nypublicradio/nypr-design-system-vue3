<template>
  <div :class="containerClass">
    <AppTopBar
      v-if="codeEditor || initialized"
      @menubutton-click="onMenuButtonClick"
    />
    <AppEditor
      v-if="!codeEditor && theme"
      :theme="theme"
      :active="sidebarActive"
      @compile="onCompile"
      @restart="onRestart"
    />
    <div class="layout-content">
      <div v-if="codeEditor || initialized" class="layout-content-inner">
        <router-view />
      </div>
    </div>
    <div
      v-if="!codeEditor && initialized"
      :class="['layout-mask', { 'layout-mask-active': sidebarActive }]"
      @click="onMaskClick"
    ></div>
    <AppFooter v-if="codeEditor || initialized" />
    <transition name="fade">
      <AppIntro
        v-if="!codeEditor && !initialized"
        @theme-select="onThemeSelect"
      />
    </transition>
  </div>
</template>

<script>
import AppIntro from './AppIntro'
import AppTopBar from './AppTopbar'
import AppEditor from './AppEditor'
import AppFooter from './AppFooter'

export default {
  components: {
    AppTopBar: AppTopBar,
    AppEditor: AppEditor,
    AppFooter: AppFooter,
    AppIntro: AppIntro,
  },
  data() {
    return {
      sidebarActive: false,
      theme: null,
      initialized: false,
    }
  },
  themeStyle: null,
  computed: {
    containerClass() {
      return [
        'layout-wrapper',
        {
          'layout-editor-code': this.codeEditor,
          'p-ripple-disabled': this.$primevue.config.ripple === false,
        },
      ]
    },
    codeEditor() {
      return process.env.VUE_APP_EDITOR === 'code'
    },
  },
  methods: {
    onThemeSelect(theme) {
      this.theme = theme
    },
    onCompile(value) {
      if (!this.initialized) {
        this.initialized = true
      }

      var styleElement = document.createElement('style')
      styleElement.type = 'text/css'
      document.getElementsByTagName('head')[0].appendChild(styleElement)

      if (this.themeStyle) {
        this.themeStyle.remove()
      }

      this.themeStyle = styleElement
      this.themeStyle.appendChild(document.createTextNode(value))
    },
    onRestart() {
      this.theme = null
      this.initialized = false
    },
    onMenuButtonClick() {
      this.sidebarActive = true
    },
    onMaskClick() {
      this.sidebarActive = false
    },
  },
}
</script>

<style lang="scss">
@import './App.scss';
</style>
