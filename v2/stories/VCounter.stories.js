import VCounter from '../src/components/VCounter.vue'

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
    component: VCounter,
    title: 'Components-V2/VCounter',
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
    //# skipcq: JS-0038
    template: '<v-counter v-bind="args"><template #icon="slotProps"><i :class="`pi pi-twitter`" role="img" :aria-label="`${slotProps.props.value} ${slotProps.props.text}`" ></i></template></v-counter>',
})

export const Default = Template.bind({})
Default.args = {
    href: "http://www.google.com",
    showIcon: true,
    value: 40
}

export const CustomText = Template.bind({})
CustomText.args = {
    href: "http://www.google.com",
    text: "Photos",
    value: 40
}
export const NoIcon = Template.bind({})
NoIcon.args = {
    href: "http://www.google.com",
    showIcon: false,
    value: 40
}
export const CustomIconClass = Template.bind({})
CustomIconClass.args = {
    href: "http://www.google.com",
    icon: "pi-facebook",
    value: 40
}
export const CustomIconSlot = TemplateCustomIconSlot.bind({})
CustomIconSlot.args = {
    href: "http://www.google.com",
    value: 40
}

export const NoText = Template.bind({})
NoText.args = {
    href: "http://www.google.com",
    text: null,
    value: 40
}
