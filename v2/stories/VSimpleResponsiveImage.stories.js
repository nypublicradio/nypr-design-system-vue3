import VSimpleResponsiveImage from '../src/components/VSimpleResponsiveImage.vue'

export default {
    title: 'Components-V2/VSimpleResponsiveImage',
    component: VSimpleResponsiveImage,
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
    components: { VSimpleResponsiveImage },
    setup() {
        return { args }
    },
    template: '<v-simple-responsive-image v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    alt: 'Fallback alt text here',
    src: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    width: 600,
    height: 400,
    allowVerticalEffect: false,
}

export const Enlarge = Template.bind({})
Enlarge.args = {
    alt: 'Fallback alt text here',
    src: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    width: 600,
    height: 400,
    allowVerticalEffect: false,
    allowPreview: true,
}

export const RawImageEnlarge = Template.bind({})
RawImageEnlarge.args = {
    alt: 'Fallback alt text here',
    src: 'https://images.ctfassets.net/pjshm78m9jt4/6LU8pkJjaDEZBnPdOwgAY5/df1dc98c5cb25c8efe0cc70e38fa7040/CATS_010721_PA.jpg',
    width: 600,
    height: 400,
    allowVerticalEffect: false,
    allowPreview: true,
}

export const Vertical = Template.bind({})
Vertical.args = {
    alt: 'Fallback alt text here',
    src: 'https://cms.demo.nypr.digital/images/212136/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    width: 600,
    height: 400,
    maxWidth: 616,
    maxHeight: 952,
    allowVerticalEffect: true,
}

export const PublisherSupport = Template.bind({})
PublisherSupport.args = {
    alt: 'Fallback alt text here',
    src: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2022/02/RL_Hello_EpisodeImage.png',
    width: 600,
    height: 400,
    maxWidth: 1860,
    maxHeight: 1395,
}