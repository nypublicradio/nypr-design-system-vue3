import VTag from '../src/components/VTag.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: {"--tag-bg":" var(--primary-color)", "--tag-border":" solid 1px var(--primary-color)", "--tag-border-radius":" 40px", "--tag-font-size":" 1rem", "--tag-font-weight":" normal", "--tag-hover-bg":" var(--primary-dark-color)", "--tag-hover-text-color":" var(--white)", "--tag-letter-spacing":" 0.03rem", "--tag-padding":" 2px 10px", "--tag-text-color":" var(--white)",} },
            description:"CSS variables applied to the component.",
            type: { name: 'object' },
            value:{"key": "value"}
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