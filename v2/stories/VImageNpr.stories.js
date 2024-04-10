import VImageCaption from '../src/components/VImageCaption.vue'
import VImageGallery from '../src/components/VImageGallery.vue'
import VImageNpr from '../src/components/VImageNpr.vue'

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
    component: VImageNpr,
    title: 'Components-V2/VImageNpr',
}

const Template = (args) => ({
    components: { VImageNpr },
    setup() {
        return { args }
    },
    template: '<VImageNpr v-bind="args"/>',
})
const TemplateVertcal = (args) => ({
    components: { VImageNpr },
    setup() {
        return { args }
    },
    template: '<VImageNpr v-bind="args"/>NPR does not supply vertical images, but you can manually use this effect by changing the width and cropping the image your self in css so you can see the blurred background image in the background if desired',
})

const TemplateLink = (args) => ({
    components: { VImageNpr },
    setup() {
        return { args }
    },
    template: '<VImageNpr v-bind="args" to="https://www.google.com"/>',
})

const TemplateSlots = (args) => ({
    components: { VImageCaption, VImageGallery, VImageNpr },
    setup() {
        return { args }
    },
    template: '<VImageNpr v-bind="args"> <template #caption> <VImageCaption text="This is a sample caption text <b>HTML</b>" /> </template> <template #gallery> <VImageGallery count="9" gallery-link="https://www.google.com" />  </template> <template #belowImage> <p>this is a slot below the image</p> </template></VImageNpr>',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    maxHeight: 1384,
    maxWidth: 2461,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 400
}
export const DefaultSquare = Template.bind({})
DefaultSquare.args = {
    alt: 'Fallback alt text here',
    maxHeight: 1384,
    maxWidth: 2461,
    ratio: [1, 1],
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 400
}


export const DefaultWithLink = TemplateLink.bind({})
DefaultWithLink.args = {
    alt: 'Fallback alt text here',
    maxHeight: 1384,
    maxWidth: 2461,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 400
}

export const EagerLoading = Template.bind({})
EagerLoading.args = {
    alt: 'Fallback alt text here',
    loading: 'eager',
    maxHeight: 1384,
    maxWidth: 2461,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 400
}

export const Quality = Template.bind({})
Quality.args = {
    alt: 'Fallback alt text here',
    maxHeight: 1384,
    maxWidth: 2461,
    quality: 1,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 400
}


export const VerticalEffect = TemplateVertcal.bind({})
VerticalEffect.args = {
    allowVerticalEffect: true,
    alt: 'Fallback alt text here',
    maxHeight: 2461,
    maxWidth: 1384,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    verticalBgBlur: '10px',
    verticalBgColor: '#000000',
    verticalBgColorOpacity: '0.8',
    width: 640,
}

export const Enlarge = Template.bind({})
Enlarge.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 600,
}

export const EnlargeCustomSize = Template.bind({})
EnlargeCustomSize.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    maxWidth: 1000,
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 600,
}

export const RatioSquare = Template.bind({})
RatioSquare.args = {
    alt: 'Fallback alt text here',
    ratio: [1, 1],
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 600,
}

export const RatioWide = Template.bind({})
RatioWide.args = {
    alt: 'Fallback alt text here',
    ratio: [16, 9],
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 600,
}

export const RatioCustomUsingWide = Template.bind({})
RatioCustomUsingWide.args = {
    alt: 'Fallback alt text here',
    ratio: [4, 1],
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 600,
}

export const PreviewAndCaptionSlotAndGallerySlotImageLinkAndCaption = TemplateSlots.bind({})
PreviewAndCaptionSlotAndGallerySlotImageLinkAndCaption.args = {
    allowPreview: true,
    alt: 'Fallback alt text here',
    height: 400,
    src: '329944',
    src: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}',
    srcSq: 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}',
    width: 600
}