import VFlexibleLink from '../src/components/VFlexibleLink.vue'
import Button from "primevue/button/button.esm.js"
export default {
    title: 'Components-V2/VFlexibleLink',
    component: VFlexibleLink,
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
    components: { VFlexibleLink },
    setup() {
        return { args }
    },
    template: '<v-flexible-link v-bind="args" >Link to URL or NUXT route</v-flexible-link>',
})

const TemplateRaw = (args) => ({
    components: { VFlexibleLink, Button },
    setup() {
        return { args }
    },
    template: '<v-flexible-link v-bind="args" ><Button>button inside flexible-link</Button></v-flexible-link><Button>normal button</Button>',
})

export const Default = Template.bind({})
Default.args = {
    to: 'https://www.google.com/',
}

export const DefaultCustomTarget = Template.bind({})
DefaultCustomTarget.args = {
    to: 'https://www.google.com/',
    target: '_self',
}

export const NuxtLink = Template.bind({})
NuxtLink.args = {
    to: 'news',
}

export const DefaultRaw = TemplateRaw.bind({})
DefaultRaw.args = {
    to: 'https://www.google.com/',
    raw: true,
}

export const NuxtLinkRaw = TemplateRaw.bind({})
NuxtLinkRaw.args = {
    to: 'news',
    raw: true,
}

