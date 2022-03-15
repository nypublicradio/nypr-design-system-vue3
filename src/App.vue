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
    <div v-if="codeEditor || initialized" class="layout-content">
      <router-view />
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
import AppIntro from './AppIntro.vue'
import AppTopBar from './AppTopbar.vue'
import AppEditor from './AppEditor.vue'
import AppFooter from './AppFooter.vue'

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
      // return import.meta.env.VITE_VUE_APP_EDITOR === 'code'
      return true
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
