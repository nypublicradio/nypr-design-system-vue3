import VCounter from '../src/components/VCounter.vue'

export default {
    title: 'Components-V2/VCounter',
    component: VCounter,
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
    components: { VCounter },
    setup() {
        return { args }
    },
    template: '<v-counter v-bind="args"></v-counter>',
})

const TemplateCustomIcon = (args) => ({
    components: { VCounter },
    setup() {
        return { args }
    },
    template: '<v-counter v-bind="args"><template #icon="slotProps"><i :class="`pi pi-facebook`" role="img" :aria-label="`${slotProps.props.value} ${slotProps.props.text}`" ></i></template></v-counter>',
})

export const Default = Template.bind({})
Default.args = {
    icon: true,
    text: "Comments",
    value: 40,
    href: "http://www.google.com"
}

export const NoIcon = Template.bind({})
NoIcon.args = {
    text: "Comments",
    value: 40,
    href: "http://www.google.com"
}
export const CustomIcon = TemplateCustomIcon.bind({})
CustomIcon.args = {
    icon: true,
    text: "Comments",
    value: 40,
    href: "http://www.google.com"
}

export const NoText = Template.bind({})
NoText.args = {
    icon: true,
    value: 40,
    href: "http://www.google.com"
}
