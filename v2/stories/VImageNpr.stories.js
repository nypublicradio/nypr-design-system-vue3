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
    maxHeight: 1384,
    maxWidth: 2461,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 400
}
