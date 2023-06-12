import VImage from '../src/components/VImage.vue'

export default {
    title: 'Components-V2/VImage',
    component: VImage,
    argTypes: {
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
}

const Template = (args) => ({
    components: { VImage },
    setup() {
        return { args }
    },
    template: '<VImage v-bind="args"/>',
})
const TemplateLink = (args) => ({
    components: { VImage },
    setup() {
        return { args }
    },
    template: '<VImage v-bind="args" to="https://www.google.com"/>',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
}
export const DefaultWithLink = TemplateLink.bind({})
DefaultWithLink.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
}
