import VInputSwitch from '../src/components/VInputSwitch.vue'

export default {
    argTypes: {
        cssvars: {
            control: {
                value: {
                    "--v-input-switch-border-radius": " 30px",
                    "--v-input-switch-padding-buffer": " 5px",
                    "--v-input-switch-slider-size": "0.825rem",
                    "--v-input-switch-transition-duration": " var(--transition-duration)"
                }
            },
            description: "CSS variables applied to the component.",
            type: { name: 'object' },
            value: { "key": "value" }
        },
        // alt: {
        //     control: { type: 'text' },
        //     type: { name: 'string' }
        // },
        // onClick: {},
        // size: {
        //     control: { type: 'select' },
        //     options: ['small', 'medium', 'large'],
        // },
    },
    component: VInputSwitch,
    title: 'Components-V2/VInputSwitch',
}

const Template = (args) => ({
    components: { VInputSwitch },
    setup() {
        return { args }
    },
    template: '<v-input-switch v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {

}
