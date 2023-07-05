import VLoginWithProvider from '../../src/components/supabase/VLoginWithProvider.vue'
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
    component: VLoginWithProvider,
    title: 'supabase/VLoginWithProvider',
}

const Template = (args) => ({
    components: { VLoginWithProvider },
    setup() {
        return { args }
    },
    template: '<VLoginWithProvider v-bind="args"></VLoginWithProvider>'
})
const TemplateIcon = (args) => ({
    components: { VLoginWithProvider },
    setup() {
        return { args }
    },
    template: '<VLoginWithProvider v-bind="args"><template #icon>XX</template></VLoginWithProvider>'
})

export const DefaultGoogle = Template.bind({})
DefaultGoogle.args = {
    provider: "google",
}

export const twitter = Template.bind({})
twitter.args = {
    provider: "twitter",
}

export const CustomLabelAndIcon = TemplateIcon.bind({})
CustomLabelAndIcon.args = {
    label: "Login now!",
}

export const CustomErrorText = Template.bind({})
CustomErrorText.args = {
    error: "This is a custom error message that can't be tested in Storybook",
    provider: "google",
}