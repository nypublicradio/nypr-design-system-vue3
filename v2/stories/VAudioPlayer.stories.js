import VAudioPlayerSystem from '../src/components/VAudioPlayerSystem.vue'

export default {
  title: 'Components-V2/VAudioPlayerSystem',
  component: VAudioPlayerSystem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    persistent: { control: 'boolean' },
    always: { control: 'boolean' },
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { VAudioPlayerSystem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<v-audio-player-system v-bind="args" /> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>',
})

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  persistent: false,
  always: false,
}

export const Persistent = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Persistent.args = {
  persistent: true,
  always: false,
}

export const AlwaysPersistent = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
AlwaysPersistent.args = {
  persistent: true,
  always: true,
}

