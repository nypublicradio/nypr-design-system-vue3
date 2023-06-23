import VFlexibleLink from '../src/components/VFlexibleLink.vue'
import Button from "primevue/button"

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
    component: VFlexibleLink,
    title: 'Components-V2/VFlexibleLink',
}

const Template = (args) => ({
    components: { VFlexibleLink },
    setup() {
        return { args }
    },
    template: '<v-flexible-link v-bind="args" >Link to URL or NUXT route</v-flexible-link>',
})

const TemplateAnchor = (args) => ({
    components: { VFlexibleLink },
    setup() {
        return { args }
    },
    template: '<v-flexible-link v-bind="args" >Anchor to ID</v-flexible-link><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><div id="anchor">anchored here</div>',
})


const TemplateRaw = (args) => ({
    components: { Button, VFlexibleLink },
    setup() {
        return { args }
    },
    template: '<div><v-flexible-link v-bind="args" ><Button label="button inside flexible-link"></v-flexible-link><br/><br/><Button label="Regular Button"/></div>',
})
const TemplateRawHover = (args) => ({
    components: { VFlexibleLink },
    setup() {
        return { args }
    },
    template: '<p>This is an inline <v-flexible-link v-bind="args" >link</v-flexible-link></p>',
})

export const Default = Template.bind({})
Default.args = {
    to: 'https://www.google.com/',
}

export const Tel = Template.bind({})
Tel.args = {
    target: '_self',
    to: 'tel:12011231234',
}

export const MailTo = Template.bind({})
MailTo.args = {
    to: 'mailto:name@gmail.com',
}

export const DefaultCustomTarget = Template.bind({})
DefaultCustomTarget.args = {
    target: '_self',
    to: 'https://www.google.com/',
}

export const NuxtLink = Template.bind({})
NuxtLink.args = {
    to: 'news',
}

export const DefaultRaw = TemplateRaw.bind({})
DefaultRaw.args = {
    raw: true,
    to: 'https://www.google.com/',
}

export const NuxtLinkRaw = TemplateRaw.bind({})
NuxtLinkRaw.args = {
    raw: true,
    to: 'news',
}

export const NuxtLinkRawHover = TemplateRawHover.bind({})
NuxtLinkRawHover.args = {
    raw: true,
    rawHover: "underline",
    to: 'news',
}

export const Anchor = TemplateAnchor.bind({})
Anchor.args = {
    to: '#anchor'
}

