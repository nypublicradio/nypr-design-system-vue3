import VFlexibleLink from '../src/components/VFlexibleLink.vue'
import Button from "primevue/button"

//import Button from "primevue/button/button.esm.js"
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

const TemplateAnchor = (args) => ({
    components: { VFlexibleLink },
    setup() {
        return { args }
    },
    template: '<v-flexible-link v-bind="args" >Anchor to ID</v-flexible-link><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><div id="anchor">anchored here</div>',
})


const TemplateRaw = (args) => ({
    components: { VFlexibleLink, Button },
    setup() {
        return { args }
    },
    template: '<v-flexible-link v-bind="args" ><Button>button inside flexible-link</Button></v-flexible-link><Button>normal button</Button>',
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
    to: 'tel:12011231234',
    target: '_self',
}

export const MailTo = Template.bind({})
MailTo.args = {
    to: 'mailto:name@gmail.com',
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

export const NuxtLinkRawHover = TemplateRawHover.bind({})
NuxtLinkRawHover.args = {
    to: 'news',
    raw: true,
    rawHover: "underline",
}

export const Anchor = TemplateAnchor.bind({})
Anchor.args = {
    to: '#anchor'
}

