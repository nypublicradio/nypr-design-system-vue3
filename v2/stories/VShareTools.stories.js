import VShareTools from '../src/components/VShareTools.vue'
import VShareToolsItem from '../src/components/VShareToolsItem.vue'

export default {
    title: 'Components-V2/VShareTools',
    component: VShareTools,
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
    components: { VShareTools, VShareToolsItem },
    setup() {
        return { args }
    },
    template: `
        <v-share-tools v-bind="args">
            <v-share-tools-item service="facebook" username="WNYC" />
            <v-share-tools-item service="twitter" username="WNYC" />
            <v-share-tools-item service="instagram" username="WNYC" />
            <v-share-tools-item service="linkedin" username="WNYC" />
            <v-share-tools-item service="reddit" username="WNYC" />
            <v-share-tools-item service="spotify" username="WNYC" />
            <v-share-tools-item service="youtube" username="UCbysmY4hyViQAAYEzOR-uCQ" />
            <v-share-tools-item service="phone" link="tel:19731231234" />
            <v-share-tools-item service="email" link="mailto:sample@gmail.com" />
            <v-share-tools-item service="site" label="google.com" link="https://www.google.com" />
        </v-share-tools>
    `,
})

const TemplateShare = (args) => ({
    components: { VShareTools, VShareToolsItem },
    setup() {
        return { args }
    },
    template: `
        <v-share-tools v-bind="args">
            <v-share-tools-item service="facebook" username="WNYC" action="share"/>
            <v-share-tools-item service="twitter" username="WNYC" action="share"/>
            <v-share-tools-item service="instagram" username="WNYC" action="share"/>
            <v-share-tools-item service="youtube" username="UCbysmY4hyViQAAYEzOR-uCQ" action="share"/>
        </v-share-tools>
    `,
})

export const Default = Template.bind({})
Default.args = {

}

export const DefaultWithLabel = Template.bind({})
DefaultWithLabel.args = {
    label: 'Connect'
}

export const Share = TemplateShare.bind({})
Share.args = {
    label: 'Share'
}

export const DefaultResponsive = Template.bind({})
DefaultResponsive.args = {
    label: 'Connect',
    responsive: true,
}

export const DefaultVertical = Template.bind({})
DefaultVertical.args = {
    label: 'Connect',
    vertical: true,
}


