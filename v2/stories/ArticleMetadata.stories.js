import VByline from '../src/components/VByline.vue'
import VCounter from '../src/components/VCounter.vue'

export default {
    title: 'Components-V2/ArticleMetadata',
    components: { VByline, VCounter }
}

const Template = (args) => ({
    components: { VByline, VCounter },
    setup() {
        return { args }
    },
    template: '<div class="article-metadata"><v-byline v-bind="args" /><v-counter text="Comments" :value="40" href="http://www.google.com" /></div>'
})

const authors = [
    {
        firstName: 'Jen',
        lastName: 'Chung',
        organization: 'Gothamist',
        organizationUrl: 'http://www.gothamist.com',
        url: '/jen-chung'
    }
]

export const Default = Template.bind({})
Default.args = {
    authors: authors
}
