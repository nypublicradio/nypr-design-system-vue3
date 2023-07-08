import VSignupWithEmail from '../../src/components/supabase/VSignupWithEmail.vue'
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
    component: VSignupWithEmail,
    title: 'supabase/VSignupWithEmail',
}

const Template = (args) => ({
    components: { VSignupWithEmail },
    setup() {
        return { args }
    },
    template: '<VSignupWithEmail v-bind="args"></VSignupWithEmail>'
})
const TemplateIcon = (args) => ({
    components: { VSignupWithEmail },
    setup() {
        return { args }
    },
    template: '<VSignupWithEmail v-bind="args"><template #icon>XX</template></VSignupWithEmail>'
})

export const DefaultGoogle = Template.bind({})
DefaultGoogle.args = {
    provider: "google",
}

export const CustomLabelAndIcon = TemplateIcon.bind({})
CustomLabelAndIcon.args = {
    label: "Signup now!",
}

export const CustomErrorText = Template.bind({})
CustomErrorText.args = {
    error: "This is a custom error message that can't be tested in Storybook",
    provider: "google",
}

export const CustomSuccessText = Template.bind({})
CustomSuccessText.args = {
    success: "This is a custom success message that can't be tested in Storybook",
}