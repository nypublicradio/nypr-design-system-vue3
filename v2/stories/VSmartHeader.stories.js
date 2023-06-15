import VSmartHeader from '../src/components/VSmartHeader.vue'

export default {
    title: 'Components-V2/VSmartHeader',
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
    template: '<div><v-smart-header v-bind="args" >This is slotted header content<br/>This is slotted header content<br/></v-smart-header><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>',
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
