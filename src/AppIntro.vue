<template>
  <div class="layout-intro">
    <h2 class="intro-title">
      <transition name="fade" mode="out-in">
        <span v-if="!theme" key="init">Choose a Base Theme</span>
        <span v-else key="loading"
          >Setting Up... <i class="pi pi-cog pi-spin"></i
        ></span>
      </transition>
    </h2>

    <div class="theme-options">
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'md_light' },
        ]"
      >
        <a
          v-tooltip.bottom="'Material Light'"
          style="background: #3c4db7"
          @click="chooseTheme('md_light')"
        >
          <img src="./assets/images/themes/md-light-indigo.svg" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'md_dark' },
        ]"
      >
        <a
          v-tooltip.bottom="'Material Dark'"
          style="background: #3c4db7"
          @click="chooseTheme('md_dark')"
        >
          <img src="./assets/images/themes/md-dark-indigo.svg" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'bootstrap_light' },
        ]"
      >
        <a
          v-tooltip.bottom="'Bootstrap Light'"
          @click="chooseTheme('bootstrap_light')"
        >
          <img src="./assets/images/themes/bootstrap4-light-blue.svg" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'bootstrap_dark' },
        ]"
      >
        <a
          v-tooltip.bottom="'Bootstrap Dark'"
          @click="chooseTheme('bootstrap_dark')"
        >
          <img src="./assets/images/themes/bootstrap4-dark-blue.svg" />
        </a>
      </div>
    </div>
    <div class="theme-options">
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'lara_light' },
        ]"
      >
        <a v-tooltip.bottom="'Lara Light'" @click="chooseTheme('lara_light')">
          <img src="./assets/images/themes/lara-light-indigo.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'lara_dark' },
        ]"
      >
        <a v-tooltip.bottom="'Lara Dark'" @click="chooseTheme('lara_dark')">
          <img src="./assets/images/themes/lara-dark-indigo.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'saga' },
        ]"
      >
        <a v-tooltip.bottom="'Saga'" @click="chooseTheme('saga')">
          <img src="./assets/images/themes/saga-blue.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'vela' },
        ]"
      >
        <a v-tooltip.bottom="'Vela'" @click="chooseTheme('vela')">
          <img src="./assets/images/themes/vela-blue.png" />
        </a>
      </div>
    </div>
    <div class="theme-options">
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'arya' },
        ]"
      >
        <a v-tooltip.bottom="'Arya'" @click="chooseTheme('arya')">
          <img src="./assets/images/themes/arya-blue.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'fluent_light' },
        ]"
      >
        <a v-tooltip.bottom="'Fluent'" @click="chooseTheme('fluent_light')">
          <img src="./assets/images/themes/fluent-light.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'soho_light' },
        ]"
      >
        <a v-tooltip.bottom="'Soho Light'" @click="chooseTheme('soho_light')">
          <img src="./assets/images/themes/soho-light.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'soho_dark' },
        ]"
      >
        <a v-tooltip.bottom="'Soho Dark'" @click="chooseTheme('soho_dark')">
          <img src="./assets/images/themes/soho-dark.png" />
        </a>
      </div>
    </div>
    <div class="theme-options">
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'tailwind_light' },
        ]"
      >
        <a
          v-tooltip.bottom="'Tailwind Light'"
          @click="chooseTheme('tailwind_light')"
        >
          <img src="./assets/images/themes/tailwind-light.png" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'viva_light' },
        ]"
      >
        <a v-tooltip.bottom="'Viva Light'" @click="chooseTheme('viva_light')">
          <img src="./assets/images/themes/viva-light.svg" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'viva_dark' },
        ]"
      >
        <a v-tooltip.bottom="'Viva Dark'" @click="chooseTheme('viva_dark')">
          <img src="./assets/images/themes/viva-dark.svg" />
        </a>
      </div>
      <div
        :class="[
          'theme-option',
          { 'theme-option-leave': theme && theme !== 'mira' },
        ]"
      >
        <a v-tooltip.bottom="'Mira'" @click="chooseTheme('mira')">
          <img src="./assets/images/themes/mira.jpg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: null,
    }
  },
  timeout: null,
  methods: {
    chooseTheme(theme) {
      if (this.timeout) {
        return
      }

      this.theme = theme
      this.timeout = setTimeout(() => {
        this.$emit('theme-select', theme)
      }, 1000)
    },
  },
}
</script>

<style>
.p-tooltip-text {
  background: #212121;
  color: #ffffff;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}

.p-tooltip-right .p-tooltip-arrow {
  border-right-color: #212121;
}

.p-tooltip-left .p-tooltip-arrow {
  border-left-color: #212121;
}

.p-tooltip-top .p-tooltip-arrow {
  border-top-color: #212121;
}

.p-tooltip-bottom .p-tooltip-arrow {
  border-bottom-color: #212121;
}
</style>
