<template>
  <div :class="['layout-editor', { 'layout-editor-active': active }]">
    <div class="layout-editor-panel">
      <div class="layout-editor-top">
        <img src="./assets/images/logo.svg" class="logo" alt="topbar-logo" />
        <div>
          <a
            v-tooltip.bottom="'Restart'"
            class="action-icon action-restart p-button-raised"
            @click="restartDialog = true"
          >
            <i class="pi pi-replay"></i>
          </a>
          <a
            v-tooltip.bottom="'Download'"
            class="action-icon action-download p-button-raised p-ml-2"
            @click="download"
          >
            <i class="pi pi-download"></i>
          </a>
        </div>
      </div>

      <p>
        Visual editor is for quick prototyping, for advanced editing such as
        implementing your style guide, refer to the
        <a href="https://www.primefaces.org/designer/api/primevue/3.10.0/"
          >SASS API</a
        >
        with 500+ variables.
      </p>

      <h6>Component Scale</h6>
      <div class="config-scale">
        <Button
          icon="pi pi-minus"
          class="p-button-text"
          :disabled="scale === scales[0]"
          @click="decrementScale"
        />
        <i
          v-for="s of scales"
          :key="s"
          class="pi pi-circle-on"
          :class="{ 'scale-active': s === scale }"
        />
        <Button
          icon="pi pi-plus"
          class="p-button-text"
          :disabled="scale === scales[scales.length - 1]"
          @click="incrementScale"
        />
      </div>

      <div class="p-d-flex p-mt-4">
        <div>
          <h6>Input Style</h6>
          <div class="p-formgroup-inline">
            <div class="p-field-radiobutton">
              <RadioButton
                id="input_outlined"
                name="inputstyle"
                value="outlined"
                :model-value="inputStyleValue"
                @update:modelValue="onInputStyleChange"
              />
              <label for="input_outlined">Outlined</label>
            </div>
            <div class="p-field-radiobutton">
              <RadioButton
                id="input_filled"
                name="inputstyle"
                value="filled"
                :model-value="inputStyleValue"
                @update:modelValue="onInputStyleChange"
              />
              <label for="input_filled">Filled</label>
            </div>
          </div>
        </div>

        <div class="p-ml-auto">
          <h6>Ripple Effect</h6>
          <InputSwitch
            :model-value="rippleActive"
            @update:modelValue="onRippleChange"
          />
        </div>
      </div>

      <div
        v-for="category in categories"
        :key="category.label"
        class="editor-category"
      >
        <h6 class="p-mt-4 mb:p-2">{{ category.label }}</h6>
        <div
          v-for="option of category.options"
          :key="option.name"
          class="editor-field"
        >
          <label :for="option.name">{{ option.description }}</label>
          <input
            v-if="option.type === 'color'"
            :id="option.name"
            v-model="variables[option.name]"
            type="color"
            @change="compile"
          />
          <input
            v-else-if="option.type === 'text'"
            :id="option.name"
            v-model="variables[option.name]"
            type="text"
            :size="option.size || 20"
            @change="compile"
          />
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="restartDialog"
      :style="{ width: '450px' }"
      header="Restart"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to discard your changes?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="restartDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="restart"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="downloadDialog"
      :style="{ width: '450px' }"
      header="Download"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-circle mr-3" style="font-size: 2rem" />
        <span>A designer license is required to download this theme.</span>
      </div>
      <template #footer>
        <Button
          label="Learn More"
          icon="pi pi-info-circle"
          class="p-button-text"
          @click="navigateToDesigner()"
        />
        <Button
          label="Buy Now"
          icon="pi pi-shopping-cart"
          class="p-button-text"
          @click="navigateToStore()"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import EditorService from './service/EditorService'
import axios from 'axios'

export default {
  props: {
    active: Boolean,
    theme: String,
  },
  data() {
    return {
      variables: {},
      restartDialog: false,
      downloadDialog: false,
      categories: null,
      scale: 14,
      scales: [12, 13, 14, 15, 16],
    }
  },
  downloadLink: null,
  editorService: null,
  computed: {
    updateIcon() {
      return this.compiling ? 'pi pi-spinner pi-spin' : 'pi pi-spinner'
    },
    inputStyleValue() {
      return this.$appState.inputStyle
    },
    rippleActive() {
      return this.$primevue.config.ripple
    },
  },
  created() {
    this.editorService = new EditorService()
  },
  mounted() {
    this.editorService.getEditor(this.theme).then((data) => {
      this.categories = data
      this.initVariables()
      this.compile()
    })
  },
  methods: {
    initVariables() {
      if (this.categories) {
        for (let category of this.categories) {
          for (let option of category.options) {
            this.variables[option.name] = option.value
          }
        }
      }
    },
    async compile() {
      try {
        const response = await axios.post(
          import.meta.VITE_VUE_APP_THEME_BUILDER_URL + '?theme=' + this.theme,
          this.variables
        )
        this.$emit('compile', response.data)
      } catch (e) {
        this.messages = [{ severity: 'error', content: 'Error Occurred' }]
      }
    },
    async downloadTheme() {
      try {
        const response = await axios.post(
          import.meta.VITE_VUE_APP_THEME_BUILDER_URL + '?theme=' + this.theme,
          this.variables
        )
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: 'text/css; charset=utf-8' })
        )

        if (this.downloadLink) {
          document.body.removeChild(this.downloadLink)
        }

        this.downloadLink = document.createElement('a')
        this.downloadLink.href = url
        this.downloadLink.setAttribute('download', 'theme.css')
        document.body.appendChild(this.downloadLink)
        this.downloadLink.click()
      } catch (e) {
        this.messages = [{ severity: 'error', content: 'Error Occurred' }]
      }
    },
    onInputStyleChange(value) {
      this.$appState.inputStyle = value
    },
    onRippleChange(value) {
      this.$primevue.config.ripple = value
    },
    restart() {
      this.restartDialog = false
      this.$emit('restart')
    },
    download() {
      if (!this.$allowDownload) this.downloadDialog = true
      else this.downloadTheme()
    },
    navigateToStore() {
      window.location.href = 'https://www.primefaces.org/store'
    },
    navigateToDesigner() {
      window.location.href = 'https://www.primefaces.org/designer/primevue'
    },
    decrementScale() {
      this.scale--
      document.documentElement.style.fontSize = this.scale + 'px'
    },
    incrementScale() {
      this.scale++
      document.documentElement.style.fontSize = this.scale + 'px'
    },
  },
}
</script>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
