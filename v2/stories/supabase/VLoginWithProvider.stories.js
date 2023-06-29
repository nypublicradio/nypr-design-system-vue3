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
    template: '<VLoginWithProvider v-bind="args"></VLoginWithProvider>',
})

export const Default = Template.bind({})
Default.args = {
    provider: "google",
}
