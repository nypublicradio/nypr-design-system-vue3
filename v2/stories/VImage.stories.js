import VImage from '../src/components/VImage.vue'
import VImageCaption from '../src/components/VImageCaption.vue'
import VImageGallery from '../src/components/VImageGallery.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: {"--v-caption-bg-color": "var(--primary-color-rgb)","--v-caption-bg-color-opacity": "0.95", "--v-image-button-padding": "8px"} },
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
    component: VImage,
    title: 'Components-V2/VImage',
}

const Template = (args) => ({
    components: { VImage },
    setup() {
        return { args }
    },
    template: '<VImage v-bind="args"/>',
})
const TemplateSlots = (args) => ({
    components: { VImage, VImageCaption, VImageGallery },
    setup() {
        return { args }
    },
    template: '<VImage v-bind="args"> <template #caption> <VImageCaption text="This is a sample caption text <b>HTML</b>" /> </template> <template #gallery> <VImageGallery count="9" gallery-link="https://www.google.com" /> </VImage> </template>',
})
const TemplateLink = (args) => ({
    components: { VImage },
    setup() {
        return { args }
    },
    template: '<VImage v-bind="args" to="https://www.google.com"/>',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: '329944',
    width: 600,
}
export const DefaultWithLink = TemplateLink.bind({})
DefaultWithLink.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: '329944',
    width: 600,
}
export const EagerLoading = Template.bind({})
EagerLoading.args = {
    alt: 'Fallback alt text here',
    height: 400,
    loading: 'eager',
    src: '329944',
    width: 600
}
export const localImage = Template.bind({})
localImage.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: 'default-user.jpg',
    width: 600
}
export const Sizes = Template.bind({})
Sizes.args = {
    alt: 'Fallback alt text here',
    height: 400,
    sizes: 'sm:200px md:400px lg:600px xl:800px',
    src: '329944',
    width: 600,
}
export const Quality = Template.bind({})
Quality.args = {
    alt: 'Fallback alt text here',
    height: 400,
    quality: 10,
    src: '329944',
    width: 600
}
export const Modifiers = Template.bind({})
Modifiers.args = {
    alt: 'Fallback alt text here',
    height: 400,
    modifiers: { focusZoom: '100' },
    src: '329944',
    width: 600
}
export const VerticalEffect = Template.bind({})
VerticalEffect.args = {
    allowVerticalEffect: true,
    alt: 'Fallback alt text here',
    height: 480,
    maxHeight: 3484,
    maxWidth: 2598,
    src: '329836',
    verticalBgBlur: '10px',
    verticalBgColor: '#000000',
    verticalBgColorOpacity: '0.8',
    width: 640,
}
export const Enlarge = Template.bind({})
Enlarge.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    height: 400,
    src: '329944',
    width: 600,
}
export const Ratio = Template.bind({})
Ratio.args = {
    alt: 'Fallback alt text here',
    height: 400,
    ratio: [6, 2],
    src: '329944',
    width: 600,
}
export const PreviewAndCaptionSlotAndGallerySlotAndImageLink = TemplateSlots.bind({})
PreviewAndCaptionSlotAndGallerySlotAndImageLink.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    height: 400,
    src: '329944',
    to: 'https://www.imgLink.com',
    width: 600
}
export const raw = Template.bind({})
raw.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg',
    width: 600
}