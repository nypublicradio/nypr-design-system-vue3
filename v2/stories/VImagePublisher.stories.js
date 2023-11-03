import VImageCaption from '../src/components/VImageCaption.vue'
import VImageGallery from '../src/components/VImageGallery.vue'
import VImagePublisher from '../src/components/VImagePublisher.vue'


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
    component: VImagePublisher,
    title: 'Components-V2/VImagePublisher',
}

const Template = (args) => ({
    components: { VImagePublisher },
    setup() {
        return { args }
    },
    template: '<v-image-publisher v-bind="args" />',
})

const TemplateSlots = (args) => ({
    components: { VImageCaption, VImageGallery, VImagePublisher },
    setup() {
        return { args }
    },
    template: '<VImagePublisher v-bind="args"> <template #belowImage>This is Content below the image</template> <template #caption> <VImageCaption text="This is a sample caption text <b>HTML</b>" /> </template> <template #gallery> <VImageGallery count="9" gallery-link="https://www.google.com" /> </VImagePublisher> </template>',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 600,
}
export const Responsive = Template.bind({})
Responsive.args = {
    alt: 'Fallback alt text here',
    maxHeight: 1240,
    maxWidth: 1860,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
}
export const ImageLink = Template.bind({})
ImageLink.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    to: 'https://www.google.com',
    width: 600,
}

export const Quality = Template.bind({})
Quality.args = {
    alt: 'Fallback alt text here',
    height: 200,
    quality: 50,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 300,
}

export const FlatQuality = Template.bind({})
FlatQuality.args = {
    alt: 'Fallback alt text here',
    flatQuality: true,
    height: 200,
    quality: 50,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 300,
}

export const Enlarge = Template.bind({})
Enlarge.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    height: 480,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 640,
}

export const SrcsetSizes = Template.bind({})
SrcsetSizes.args = {
    alt: 'Fallback alt text here',
    height: 150,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    srcset: [2, 2.5, 3],
    width: 200
}

export const Vertical = Template.bind({})
Vertical.args = {
    allowVerticalEffect: true,
    alt: 'Fallback alt text here',
    height: 480,
    maxHeight: 1860,
    maxWidth: 1395,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/lorriemoore.jpg',
    width: 640,
}

export const PreviewAndCaptionSlotAndGallerySlotandImageLink = TemplateSlots.bind({})
PreviewAndCaptionSlotAndGallerySlotandImageLink.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    height: 400,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg',
    to: 'https://www.imgLink.com',
    width: 600,
}