import VTag from '../src/components/VTag.vue'

export default {
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
    component: VTag,
    title: 'Components-V2/VTag',
}

const Template = (args) => ({
    components: { VTag },
    setup() {
        return { args }
    },
    template: '<v-tag v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    name: 'news',
    slug: 'https://www.google.com',
}

export const NoLink = Template.bind({})
NoLink.args = {
    name: 'news',
}