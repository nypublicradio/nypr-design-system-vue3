import VImageCaption from '../src/components/VImageCaption.vue'
import VImageGallery from '../src/components/VImageGallery.vue'
import VImageNpr from '../src/components/VImageNpr.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: { "--v-caption-bg-color": "var(--primary-color-rgb)", "--v-caption-bg-color-opacity": "0.95", "--v-image-button-padding": "8px" } },
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
    component: VImageNpr,
    title: 'Components-V2/VImageNpr',
}

const Template = (args) => ({
    components: { VImageNpr },
    setup() {
        return { args }
    },
    template: '<VImageNpr v-bind="args"/>',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',

    src: 'https://media.npr.org/assets/img/2024/04/08/carol-shields-prize2024_wide-4f0474711babaa8e9ac925869263d6f73b3fb1ff.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/08/carol-shields-prize2024_sq-2d7bee7b007d14dde13ab7be8405c7ddcc8f6e4e.jpg?s={width}&c={quality}&f={format}',
    width: 400
}
