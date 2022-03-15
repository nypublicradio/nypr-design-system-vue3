import VByline from '../src/components/VByline.vue'

export default {
    title: 'Components-V2/VByline',
    component: VByline,
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
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args" />',
})

const authors = [
    {
        firstName: 'Jen',
        lastName: 'Chung',
        organization: 'Gothamist',
        organizationUrl: 'http://www.gothamist.com',
        url: '/jen-chung'
    },
    {
        firstName: 'Jen',
        lastName: 'Chung',
        organization: 'Gothamist',
        url: '/jen-chung'
    },
    {
        firstName: 'Brian',
        lastName: 'Lehrer',
        url: '/brian-lehrer',
    },
    {
        firstName: 'Trinity',
        lastName: 'Anderson',
        url: '/trinity-anderson',
        organization: 'Gothamist',
        organizationUrl: 'http://www.gothamist.com',
    }
]

export const Default = Template.bind({})
Default.args = {
    authors: authors
}

export const OneAuthor = Template.bind({})
OneAuthor.args = {
    authors: authors.slice(0, 1)
}

export const CustomPrefix = Template.bind({})
CustomPrefix.args = {
    authors: authors,
    prefix: 'Produced by:'
}
