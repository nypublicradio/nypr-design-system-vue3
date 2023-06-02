import VCard2 from '../src/components/VCard2.vue'
import VTag from '../src/components/VTag.vue'

export default {
    title: 'Components-V2/VCard2',
    component: VCard2,
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
    components: {
        VCard2
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card2 v-bind="args"></v-card2>',
})
const TemplateSlotAfterTitle = (args) => ({
    components: {
        VCard2
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card2 v-bind="args"><template #afterTitle><i class="pi pi-twitter" role="img" aria-label="twitter icon"></i></template></v-card2>',
})
const TemplateSlotBeforeTitle = (args) => ({
    components: {
        VCard2, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card2 v-bind="args"><template #beforeTitle><VTag name="News" slug="/news"/></template></v-card2>',
})

const TemplateSlotAboveTitle = (args) => ({
    components: {
        VCard2, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card2 v-bind="args"><template #aboveTitle><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/></template></v-card2>',
})

const TemplateSlotBelowBlurb = (args) => ({
    components: {
        VCard2, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card2 v-bind="args"><template #belowBlurb><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/></template></v-card2>',
})


export const Default = Template.bind({})
Default.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 200,
    maxWidth: 1440,
    maxHeight: 2560,
}

export const TruncateBlurb = Template.bind({})
TruncateBlurb.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 200,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}

export const SlotAfterTitle = TemplateSlotAfterTitle.bind({})
SlotAfterTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 200,
    height: 200,
    maxWidth: 1440,
    maxHeight: 2560,
}
export const SlotBeforeTitle = TemplateSlotBeforeTitle.bind({})
SlotBeforeTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 200,
    height: 200,
    maxWidth: 1440,
    maxHeight: 2560,
}
export const SlotAboveTitle = TemplateSlotAboveTitle.bind({})
SlotAboveTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 200,
    height: 200,
    maxWidth: 1440,
    maxHeight: 2560,
}
export const SlotBelowBlurb = TemplateSlotBelowBlurb.bind({})
SlotBelowBlurb.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 200,
    maxWidth: 1440,
    maxHeight: 2560,
}