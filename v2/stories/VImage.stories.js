import VImage from '../src/components/VImage.vue'
import VImageCaption from '../src/components/VImageCaption.vue'
import VImageGallery from '../src/components/VImageGallery.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: { "--v-caption-bg-color": "var(--primary-color-rgb)", "--v-caption-bg-color-opacity": "0.95", "--v-image-button-padding": "8px" } },
            description: "CSS variables applied to the component.",
            type: { name: 'object' },
            value: { "key": "value" }
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
    components: { VImage },
    setup() {
        return { args }
    },
    template: '<VImage v-bind="args"> <template #belowImage>This is Content below the image</template></VImage> </template>',
})

export const WagtailImage = Template.bind({})
WagtailImage.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: '329944',
    width: 600,
}

export const PublisherImageSrc = Template.bind({})
PublisherImageSrc.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/09/twelfth_night_photo_for_nypl.jpg',
    width: 600,
}

export const PublisherImageSrcSlot = TemplateSlots.bind({})
PublisherImageSrcSlot.args = {
    alt: 'Fallback alt text here',
    height: 400,
    src: 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/09/twelfth_night_photo_for_nypl.jpg',
    width: 600,
}