import VCard from '../src/components/VCard.vue'
import VTag from '../src/components/VTag.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: {"--v-card-bg-color": "transparent", "--v-card-border-radius": 0, "--v-card-image-radius": 0, "--v-card-padding": 0, "--v-card-title-color": "inherit", "--v-card-title-font-family": "var(--font-family-header)", "--v-card-title-font-size": "var(--font-size-13)", "--v-card-title-font-weight": "var(--font-weight-600)","--v-card-title-hover-color": "inherit", "--v-card-title-hover-text-decoration": "underline", "--v-card-title-letter-spacing": "-0.02em", "--v-card-title-line-height":" var(--font-size-13)", "--v-card-title-mobile-font-size": "var(--font-size-10)", "--v-card-title-mobile-line-height": "var(--font-size-10)", "--v-card-title-text-decoration": "inherit", "--v-card-title-transition-duration": "var(--transition-duration)"} },
            description:"CSS variables applied to the component.",
            type: { name: 'object' },
            value:{"key": "value"}
        },
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
    component: VCard,
    title: 'Components-V2/VCard',
}


const blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


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
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,
}
export const CustomImageFlexBasis = Template.bind({})
CustomImageFlexBasis.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    imageFlexBasis: '50%',
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,
}
export const NoImageFlexBasis = Template.bind({})
NoImageFlexBasis.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    imageFlexBasis: null,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,
}

export const ImageMinWidth = Template.bind({})
ImageMinWidth.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    minWidth: 150,
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,
}

export const CustomRatio = Template.bind({})
CustomRatio.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    ratio: [5, 2],
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,
}

export const CustomRatioAndMobileRatio = Template.bind({})
CustomRatioAndMobileRatio.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 300,
    link: 'https://www.google.com',
    mobileRatio: [1, 1],
    ratio: [5, 2],
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,
}

export const CustomeTitleClass = Template.bind({})
CustomeTitleClass.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    titleClass: 'h1 anythingElse',
    width: 300,


}

export const IsNotDecrative = Template.bind({})
IsNotDecrative.args = {
    alt: "Image alt text",
    alt: 'alt text',
    blurb: 'When isDecrative is set to false, the text and image links aria-hidden ,tabindex and alt-text are enabled.Use to indicate decorative images with a link, where the exact same link is repeated in nearby text. e.g.A thumbnail that links to an article next to a title that links to the same article. WARNING: This will make the link unreachable by assistive software so only use this for truly redundant links.',
    height: 200,
    isDecorative: false,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',


    title: "Title with some <em>HTML</em>",
    width: 300,
}

export const EagerLoading = Template.bind({})
EagerLoading.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    loading: 'eager',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",


    width: 300,
}

export const TruncateBlurb = Template.bind({})
TruncateBlurb.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    truncate: 2,


    width: 300,
}
export const NoTitle = Template.bind({})
NoTitle.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    truncate: 2,


    width: 300,
}
export const NoBlurb = Template.bind({})
NoBlurb.args = {
    alt: "Image alt text",
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    truncate: 2,


    width: 300,
}

export const NoSubtitle = Template.bind({})
NoSubtitle.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    title: "Title with some <em>HTML</em>",
    truncate: 2,


    width: 300,
}
export const NoImage = Template.bind({})
NoImage.args = {
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    truncate: 2,


    width: 300,
}
export const NoLinks = Template.bind({})
NoLinks.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    truncate: 2,


    width: 300,
}

export const Reverse = Template.bind({})
Reverse.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    reverse: true,
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",


    width: 300,
}

export const Vertical = Template.bind({})
Vertical.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 533,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    vertical: true,


    width: 800,
}

export const ReverseVertical = Template.bind({})
ReverseVertical.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 533,
    link: 'https://www.google.com',
    reverse: true,
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",


    vertical: true,
    width: 800,
}

export const VerticalOnMobile = Template.bind({})
VerticalOnMobile.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 266,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    verticalMobile: true,


    width: 400,
}

export const ReverseVerticalOnMobile = Template.bind({})
ReverseVerticalOnMobile.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 266,
    link: 'https://www.google.com',
    reverse: true,
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",


    verticalMobile: true,
    width: 400,
}
export const AllowVerticalEffect = Template.bind({})
AllowVerticalEffect.args = {
    allowVerticalEffect: true,
    alt: "Image alt text",
    blurb: blurb,
    height: 533,
    link: 'https://www.google.com',
    maxHeight: 3484,
    maxWidth: 2598,
    src: '329836',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    vertical: true,
    verticalBgBlur: '10px',
    verticalBgColor: '#000000',
    verticalBgColorOpacity: '0.8',
    width: 800,
}

export const SlotAfterTitle = TemplateSlotAfterTitle.bind({})
SlotAfterTitle.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>",
    width: 300,


}
export const SlotBeforeTitle = TemplateSlotBeforeTitle.bind({})
SlotBeforeTitle.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>. Title with some <em>HTML</em>",
    width: 300,


}
export const SlotAboveTitle = TemplateSlotAboveTitle.bind({})
SlotAboveTitle.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>.",
    width: 300,


}
export const SlotBelowBlurb = TemplateSlotBelowBlurb.bind({})
SlotBelowBlurb.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>.",
    width: 300,
}
export const SlotBelowImage = TemplateSlotBelowImage.bind({})
SlotBelowImage.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>.",
    width: 300,
}

export const SlotAboveImage = TemplateSlotAboveImage.bind({})
SlotAboveImage.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>.",
    width: 300,
}

export const ImageQuality = Template.bind({})
ImageQuality.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 200,
    link: 'https://www.google.com',
    quality: 5,
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>.",
    width: 300,
}

export const Sizes = Template.bind({})
Sizes.args = {
    alt: "Image alt text",
    blurb: blurb,
    height: 533,
    link: 'https://www.google.com',
    sizes: "xs:300px md:400px lg:800px",
    src: '329944',
    subtitle: 'Subtitle',
    title: "Title with some <em>HTML</em>.",
    vertical: true,
    width: 800,
}