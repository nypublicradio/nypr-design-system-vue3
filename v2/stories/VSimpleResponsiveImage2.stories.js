import VSimpleResponsiveImage2 from '../src/components/VSimpleResponsiveImage2.vue'

export default {
    title: 'Components-V2/VSimpleResponsiveImage2',
    component: VSimpleResponsiveImage2,
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
    components: { VSimpleResponsiveImage2 },
    setup() {
        return { args }
    },
    template: '<v-simple-responsive-image2 v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
}
