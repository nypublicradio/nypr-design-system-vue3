import VLoginWithEmail from '../../src/components/supabase/VLoginWithEmail.vue'
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
    component: VLoginWithEmail,
    title: 'supabase/VLoginWithEmail',
}

const Template = (args) => ({
    components: { VLoginWithEmail },
    setup() {
        return { args }
    },
    template: '<VLoginWithEmail v-bind="args"></VLoginWithEmail>'
})
const TemplateIcon = (args) => ({
    components: { VLoginWithEmail },
    setup() {
        return { args }
    },
    template: '<VLoginWithEmail v-bind="args"><template #icon>XX</template></VLoginWithEmail>'
})

export const Default = Template.bind({})
Default.args = {
}

export const CustomLabelAndIcon = TemplateIcon.bind({})
CustomLabelAndIcon.args = {
    label: "Custom Button Text Here",
}
export const CustomSlug = Template.bind({})
CustomSlug.args = {
    slug: "/custom-slug-here",
}

export const CustomErrorText = Template.bind({})
CustomErrorText.args = {
    error: "This is a custom error message that can't be tested in Storybook",
}