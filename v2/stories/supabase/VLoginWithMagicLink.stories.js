import VLoginWithMagicLink from '../../src/components/supabase/VLoginWithMagicLink.vue'
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
    component: VLoginWithMagicLink,
    title: 'supabase/VLoginWithMagicLink',
}

const Template = (args) => ({
    components: { VLoginWithMagicLink },
    setup() {
        return { args }
    },
    template: '<VLoginWithMagicLink v-bind="args"></VLoginWithMagicLink>'
})
const TemplateIcon = (args) => ({
    components: { VLoginWithMagicLink },
    setup() {
        return { args }
    },
    template: '<VLoginWithMagicLink v-bind="args"><template #icon>XX</template></VLoginWithMagicLink>'
})

export const Default = Template.bind({})
Default.args = {
}

export const CustomLabelAndIcon = TemplateIcon.bind({})
CustomLabelAndIcon.args = {
    label: "Custom Button Text Here",
}

export const CustomErrorText = Template.bind({})
CustomErrorText.args = {
    error: "This is a custom error message that can't be tested in Storybook",
}
export const CustomSuccessText = Template.bind({})
CustomSuccessText.args = {
    success: "This is a custom success message that can't be tested in Storybook",
}