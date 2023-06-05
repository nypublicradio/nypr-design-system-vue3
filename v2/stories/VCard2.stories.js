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
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
}

export const CustomRatio = Template.bind({})
CustomRatio.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    ratio: [5, 2],
    maxWidth: 1440,
    maxHeight: 2560,
}

export const CustomRatioAndMobileRatio = Template.bind({})
CustomRatioAndMobileRatio.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 700,
    ratio: [5, 2],
    mobileRatio: [1, 1],
    maxWidth: 1440,
    maxHeight: 2560,
}

export const CustomeTitleClass = Template.bind({})
CustomeTitleClass.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleClass: 'h1 anythingElse',
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
}

export const IsNotDecrative = Template.bind({})
IsNotDecrative.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'When isDecrative is set to false, the text and image links aria-hidden ,tabindex and alt-text are enabled.Use to indicate decorative images with a link, where the exact same link is repeated in nearby text. e.g.A thumbnail that links to an article next to a title that links to the same article. WARNING: This will make the link unreachable by assistive software so only use this for truly redundant links.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    isDecorative: false,
    alt: 'alt text',
}

export const EagerLoading = Template.bind({})
EagerLoading.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    loading: 'eager',
}
export const AddCustomBaseClass = Template.bind({})
AddCustomBaseClass.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    baseClass: 'customBaseClass',
}

export const TruncateBlurb = Template.bind({})
TruncateBlurb.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}
export const NoTitle = Template.bind({})
NoTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    link: 'https://www.google.com',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}
export const NoBlurb = Template.bind({})
NoBlurb.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}

export const NoSubtitle = Template.bind({})
NoSubtitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}
export const NoImage = Template.bind({})
NoImage.args = {
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}
export const NoLinks = Template.bind({})
NoLinks.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    truncate: 2,
}

export const SlotAfterTitle = TemplateSlotAfterTitle.bind({})
SlotAfterTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
}
export const SlotBeforeTitle = TemplateSlotBeforeTitle.bind({})
SlotBeforeTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
}
export const SlotAboveTitle = TemplateSlotAboveTitle.bind({})
SlotAboveTitle.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
}
export const SlotBelowBlurb = TemplateSlotBelowBlurb.bind({})
SlotBelowBlurb.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
}


export const Caption = Template.bind({})
Caption.args = {
    imageSrc: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 200,
    height: 133,
    maxWidth: 1440,
    maxHeight: 2560,
    caption: 'This is sample caption on the image',
}