import VCounter from '../src/components/VCounter.vue'

export default {
    title: 'Components-V2/VCounter',
    component: VCounter,
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
    components: { VCounter },
    setup() {
        return { args }
    },
    template: '<v-counter v-bind="args"></v-counter>',
})

export const Comments = Template.bind({})
Comments.args = {
    icon: "comment",
    text: "Comments",
    value: 40,
    href: "http://www.google.com"
}

export const Gallery = Template.bind({})
Gallery.args = {
    icon: "gallery",
    text: "Photos",
    value: 25,
    href: "http://www.google.com"
}

export const NoIcon = Template.bind({})
NoIcon.args = {
    text: "Comments",
    value: 40,
    href: "http://www.google.com"
}

export const NoText = Template.bind({})
NoText.args = {
    icon: "comment",
    value: 40,
    href: "http://www.google.com"
}
