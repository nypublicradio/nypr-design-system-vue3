import VCard from '../src/components/VCard.vue'
import GothamistArrow from '../../assets-shared/icons/gothamist/GothamistArrow.vue'

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
    components: { VCard },
    setup() {
        return { args }
    },
    template: '<v-card v-bind="args"></v-card>',
})
const TemplateIcons = (args) => ({
    components: { VCard },
    setup() {
        return { args }
    },
    template: '<v-card v-bind="args"><a href="https://primefaces.org/primevue/showcase/#/icons">Get icons here</a></v-card>',
})

const TemplateCustomIcons = (args) => ({
    components: { VCard, GothamistArrow },
    setup() {
        return { args }
    },
    template: '<v-card v-bind="args"><code>&lt;template #customIcon&gt; &lt;gothamist-arrow/&gt; &lt;/template&gt;</code><template #customIcon> <gothamist-arrow/> </template></v-card>',
})


const TemplateWithSlot = (args) => ({
    components: { VCard },
    setup() {
        return { args }
    },
    template: '<v-card v-bind="args"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </v-card>',
})

export const Default = Template.bind({})
Default.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
}

export const Icon = TemplateIcons.bind({})
Icon.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    icon: "images"
}

export const CustomIcon = TemplateCustomIcons.bind({})
CustomIcon.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
}

export const SmallerImageOnPhone = Template.bind({})
SmallerImageOnPhone.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    mobileImageScale: 0.65,
}

export const SmallerImageCustomBreapoint = Template.bind({})
SmallerImageCustomBreapoint.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    mobileImageScale: 0.65,
    bp: "lg"
}

export const VerticalImageEffect = Template.bind({})
VerticalImageEffect.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    allowVerticalEffect: true,
    responsive: true,
}

export const Tags = Template.bind({})
Tags.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    tags: [{ 'name': 'news', 'slug': 'news' }, { 'name': 'food', 'food': '' }],
}


export const TagsSponsored = Template.bind({})
TagsSponsored.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    tags: [{ 'name': 'news', 'slug': 'news' }, { 'name': 'food', 'food': '' }],
    sponsored: true,
}

export const DefaultWithSlotContent = TemplateWithSlot.bind({})
DefaultWithSlotContent.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    tags: [{ 'name': 'news', 'slug': 'news' }, { 'name': 'food', 'food': '' }],
    sponsored: true,
}

export const ResponsiveWithSlotContent = TemplateWithSlot.bind({})
ResponsiveWithSlotContent.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    tags: [{ 'name': 'news', 'slug': 'news' }, { 'name': 'food', 'food': '' }],
    sponsored: true,
    responsive: true,
}

export const ResponsiveDefaultAtSM = Template.bind({})
ResponsiveDefaultAtSM.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    responsive: true,
}

export const ResponsiveAtMdBreakpoint = Template.bind({})
ResponsiveAtMdBreakpoint.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    responsive: true,
    bp: 'md',
}

export const ResponsiveAlways = Template.bind({})
ResponsiveAlways.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    responsive: true,
    bp: 'max',
}

export const CustomImageRatio = Template.bind({})
CustomImageRatio.args = {
    image: 'https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    title: "Title with some <em>HTML</em>",
    titleLink: 'https://www.google.com',
    subtitle: 'Subtitle',
    width: 175,
    height: 175,
    maxWidth: 1440,
    maxHeight: 2560,
    responsive: true,
    bp: 'md',
    ratio: [3, 1]
}
