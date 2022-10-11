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
        id: '1',
        firstName: 'Jen',
        lastName: 'Chung',
        name: 'Jen Chung',
        organization: 'Gothamist',
        organizationUrl: 'http://www.gothamist.com',
        url: '/jen-chung'
    },
    {
        id: '2',
        firstName: 'Jen',
        lastName: 'Chung2',
        name: 'Jen Chung 2',
        organization: 'Gothamist',
        url: '/jen-chung2'
    },
    {
        id: '3',
        firstName: 'Brian',
        lastName: 'Lehrer',
        name: 'Brian Lehrer',
        url: '/brian-lehrer',
    },
    {
        id: '4',
        firstName: 'Trinity',
        lastName: 'Anderson',
        name: 'Trinity Anderson',
        url: '/trinity-anderson',
        organization: 'Gothamist',
        organizationUrl: 'http://www.gothamist.com',
    }
]

const authorsObject =
{
    id: '1',
    firstName: 'Trinity',
    lastName: 'Anderson',
    name: 'Trinity Anderson',
    url: '/trinity-anderson',
    organization: 'Gothamist',
    organizationUrl: 'http://www.gothamist.com',
}


export const Default = Template.bind({})
Default.args = {
    authors: authors
}
export const DefaultDataAsObject = Template.bind({})
DefaultDataAsObject.args = {
    authors: authorsObject
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
