import VUploadImage from '../../src/components/supabase/VUploadImage.vue'
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
    component: VUploadImage,
    title: 'supabase/VUploadImage',
}

const Template = (args) => ({
    components: { VUploadImage },
    setup() {
        return { args }
    },
    template: '<VUploadImage v-bind="args"></VUploadImage>'
})

export const DefaultGoogle = Template.bind({})
DefaultGoogle.args = {

}