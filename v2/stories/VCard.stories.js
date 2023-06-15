import VCard from '../src/components/VCard.vue'
import VTag from '../src/components/VTag.vue'

export default {
    title: 'Components-V2/VCard',
    component: VCard,
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
        VCard
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"></v-card>',
})
const TemplateSlotAfterTitle = (args) => ({
    components: {
        VCard
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"><template #afterTitle><i class="pi pi-twitter" role="img" aria-label="twitter icon"></i></template></v-card>',
})
const TemplateSlotBeforeTitle = (args) => ({
    components: {
        VCard, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"><template #beforeTitle><VTag name="News" slug="/news"/></template></v-card>',
})

const TemplateSlotAboveTitle = (args) => ({
    components: {
        VCard, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"><template #aboveTitle><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/></template></v-card>',
})

const TemplateSlotBelowBlurb = (args) => ({
    components: {
        VCard, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"><template #belowBlurb><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/><VTag name="News" slug="/news"/></template></v-card>',
})

const TemplateSlotBelowImage = (args) => ({
    components: {
        VCard, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"><template #belowImage>By: Peter Gibbons</template></v-card>',
})

const TemplateSlotAboveImage = (args) => ({
    components: {
        VCard, VTag
    },
    setup() {
        return {
            args
        }
    },
    template: '<v-card v-bind="args"><template #aboveImage>By: Peter Gibbons</template></v-card>',
})


export const Default = Template.bind({})
Default.args = {
    imageSrc: '329944',
    alt: "Image alt text",
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
}
export const CustomImageFlexBasis = Template.bind({})
CustomImageFlexBasis.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
    imageFlexBasis: '50%',
}
export const NoImageFlexBasis = Template.bind({})
NoImageFlexBasis.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
    imageFlexBasis: null,
}

export const ImageMinWidth = Template.bind({})
ImageMinWidth.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
    minWidth: 150,
}

export const CustomRatio = Template.bind({})
CustomRatio.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
    ratio: [5, 2],
}

export const CustomRatioAndMobileRatio = Template.bind({})
CustomRatioAndMobileRatio.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 300,
    ratio: [5, 2],
    mobileRatio: [1, 1],
}

export const CustomeTitleClass = Template.bind({})
CustomeTitleClass.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    titleClass: 'h1 anythingElse',
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


}

export const IsNotDecrative = Template.bind({})
IsNotDecrative.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'When isDecrative is set to false, the text and image links aria-hidden ,tabindex and alt-text are enabled.Use to indicate decorative images with a link, where the exact same link is repeated in nearby text. e.g.A thumbnail that links to an article next to a title that links to the same article. WARNING: This will make the link unreachable by assistive software so only use this for truly redundant links.',
    width: 300,
    height: 200,


    isDecorative: false,
    alt: 'alt text',
}

export const EagerLoading = Template.bind({})
EagerLoading.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    loading: 'eager',
}
export const AddCustomBaseClass = Template.bind({})
AddCustomBaseClass.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    baseClass: 'customBaseClass',
}

export const TruncateBlurb = Template.bind({})
TruncateBlurb.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    truncate: 2,
}
export const NoTitle = Template.bind({})
NoTitle.args = {
    imageSrc: '329944',
    link: 'https://www.google.com',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    truncate: 2,
}
export const NoBlurb = Template.bind({})
NoBlurb.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 300,
    height: 200,


    truncate: 2,
}

export const NoSubtitle = Template.bind({})
NoSubtitle.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    truncate: 2,
}
export const NoImage = Template.bind({})
NoImage.args = {
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    truncate: 2,
}
export const NoLinks = Template.bind({})
NoLinks.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    truncate: 2,
}

export const Reverse = Template.bind({})
Reverse.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    reverse: true,
}

export const Vertical = Template.bind({})
Vertical.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 800,
    height: 533,


    vertical: true,
}

export const ReverseVertical = Template.bind({})
ReverseVertical.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 800,
    height: 533,


    vertical: true,
    reverse: true,
}

export const VerticalOnMobile = Template.bind({})
VerticalOnMobile.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 400,
    height: 266,


    verticalMobile: true,
}

export const ReverseVerticalOnMobile = Template.bind({})
ReverseVerticalOnMobile.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 400,
    height: 266,


    verticalMobile: true,
    reverse: true,
}
export const AllowVerticalEffect = Template.bind({})
AllowVerticalEffect.args = {
    imageSrc: '329836',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 800,
    height: 533,
    maxWidth: 2598,
    maxHeight: 3484,
    allowVerticalEffect: true,
    verticalBgBlur: '10px',
    verticalBgColorOpacity: '0.8',
    verticalBgColor: '#000000',
    vertical: true,
}

export const SlotAfterTitle = TemplateSlotAfterTitle.bind({})
SlotAfterTitle.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


}
export const SlotBeforeTitle = TemplateSlotBeforeTitle.bind({})
SlotBeforeTitle.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


}
export const SlotAboveTitle = TemplateSlotAboveTitle.bind({})
SlotAboveTitle.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


}
export const SlotBelowBlurb = TemplateSlotBelowBlurb.bind({})
SlotBelowBlurb.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
}
export const SlotBelowImage = TemplateSlotBelowImage.bind({})
SlotBelowImage.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
}

export const SlotAboveImage = TemplateSlotAboveImage.bind({})
SlotAboveImage.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,
}

export const ImageQuality = Template.bind({})
ImageQuality.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 300,
    height: 200,


    quality: 5,
}

export const Sizes = Template.bind({})
Sizes.args = {
    imageSrc: '329944',
    title: "Title with some <em>HTML</em>.",
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    width: 800,
    height: 533,
    vertical: true,
    sizes: "xs:300px md:400px lg:800px",
}