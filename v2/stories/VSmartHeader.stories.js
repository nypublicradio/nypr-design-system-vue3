import VSmartHeader from '../src/components/VSmartHeader.vue'

export default {
    title: 'Components-V2/VSmartHeader',
    subTitle: 'Smart header that hides when scrolling down and shows when scrolling up.',

    component: VSmartHeader,
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
    components: { VSmartHeader },
    setup() {
        return { args }
    },
    template: '<div><v-smart-header v-bind="args" >This is slotted header content<br/>We can not simulate this component here in Storybook. Run `npm run dev` and navigate to /nuxt to see it in action.</v-smart-header></div>',
})

export const Default = Template.bind({})
Default.args = {
}

export const TargetWindowClass = Template.bind({})
TargetWindowClass.args = {
    targetWindowClass: 'sb-show-main'
}
export const HeroBuffer = Template.bind({})
HeroBuffer.args = {
    heroBuffer: 800
}
export const ResumeDelay = Template.bind({})
ResumeDelay.args = {
    resumeDelay: 5
}
