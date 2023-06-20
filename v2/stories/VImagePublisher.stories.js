import VImagePublisher from '../src/components/VImagePublisher.vue'

export default {
    title: 'Components-V2/VImagePublisher',
    component: VImagePublisher,
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
    components: { VImagePublisher },
    setup() {
        return { args }
    },
    template: '<v-image-publisher v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 600,
    height: 400,
}
export const ImageLink = Template.bind({})
ImageLink.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 600,
    height: 400,
    to: 'https://www.google.com',
}

export const Quality = Template.bind({})
Quality.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 300,
    height: 200,
    quality: 50,
}

export const FlatQuality = Template.bind({})
FlatQuality.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 300,
    height: 200,
    quality: 50,
    flatQuality: true,
}

export const EnlargeMustSpecifyMaxwidthAndMaxheight = Template.bind({})
EnlargeMustSpecifyMaxwidthAndMaxheight.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 640,
    height: 480,
    maxWidth: 1860,
    maxHeight: 1240,
    allowPreview: true,
}

export const SrcsetSizes = Template.bind({})
SrcsetSizes.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/JuneteenthJeremyDaniel.jpg',
    width: 200,
    height: 150,
    sizes: [2, 2.5, 3]
}

export const Vertical = Template.bind({})
Vertical.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2023/06/lorriemoore.jpg',
    width: 640,
    height: 480,
    maxWidth: 1395,
    maxHeight: 1860,
    allowVerticalEffect: true,
}