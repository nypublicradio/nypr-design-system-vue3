import VImage from '../src/components/VImage.vue'
import VImageGallery from '../src/components/VImageGallery.vue'
import VImageCaption from '../src/components/VImageCaption.vue'

export default {
    title: 'Components-V2/VImage',
    component: VImage,
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
    src: '329944',
    width: 600,
    height: 400,
}
export const DefaultWithLink = TemplateLink.bind({})
DefaultWithLink.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
}
export const EagerLoading = Template.bind({})
EagerLoading.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    loading: 'eager'
}
export const URLPath = Template.bind({})
URLPath.args = {
    alt: 'Fallback alt text here',
    src: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg',
    width: 600,
    height: 400,
    provider: null
}
export const localImage = Template.bind({})
localImage.args = {
    alt: 'Fallback alt text here',
    src: '/default-user.jpg',
    width: 600,
    height: 400,
    provider: null
}
export const Sizes = Template.bind({})
Sizes.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    sizes: 'sm:200px md:400px lg:600px xl:800px',
}
export const Quality = Template.bind({})
Quality.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    quality: 10
}
export const Modifiers = Template.bind({})
Modifiers.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    modifiers: { focusZoom: '100' }
}
export const VerticalEffect = Template.bind({})
VerticalEffect.args = {
    alt: 'Fallback alt text here',
    src: '329836',
    width: 800,
    height: 533,
    maxWidth: 2598,
    maxHeight: 3484,
    allowVerticalEffect: true,
    verticalBgBlur: '10px',
    verticalBgColorOpacity: '0.8',
    verticalBgColor: '#000000',
}
export const Preview = Template.bind({})
Preview.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    allowPreview: true,
}
export const Ratio = Template.bind({})
Ratio.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    ratio: [6, 2],
}
export const PreviewAndCaptionSlotAndGallerySlot = TemplateSlots.bind({})
PreviewAndCaptionSlotAndGallerySlot.args = {
    alt: 'Fallback alt text here',
    src: '329944',
    width: 600,
    height: 400,
    allowPreview: true,
}