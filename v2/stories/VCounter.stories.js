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

const TemplateCustomIconSlot = (args) => ({
    components: { VCounter },
    setup() {
        return { args }
    },
    template: '<v-counter v-bind="args"><template #icon="slotProps"><i :class="`pi pi-twitter`" role="img" :aria-label="`${slotProps.props.value} ${slotProps.props.text}`" ></i></template></v-counter>',
})

export const Default = Template.bind({})
Default.args = {
    showIcon: true,
    value: 40,
    href: "http://www.google.com"
}

export const CustomText = Template.bind({})
CustomText.args = {
    text: "Photos",
    value: 40,
    href: "http://www.google.com"
}
export const NoIcon = Template.bind({})
NoIcon.args = {
    showIcon: false,
    value: 40,
    href: "http://www.google.com"
}
export const CustomIconClass = Template.bind({})
CustomIconClass.args = {
    icon: "pi-facebook",
    value: 40,
    href: "http://www.google.com"
}
export const CustomIconSlot = TemplateCustomIconSlot.bind({})
CustomIconSlot.args = {
    value: 40,
    href: "http://www.google.com"
}

export const NoText = Template.bind({})
NoText.args = {
    value: 40,
    text: null,
    href: "http://www.google.com"
}
