import VTag from '../src/components/VTag.vue'

export default {
    title: 'Components-V2/VTag',
    component: VTag,
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

export const CustomRadius = Template.bind({})
CustomRadius.args = {
    name: 'news',
    radius: 12,
}