import VImageWithCaption from '../src/components/VImageWithCaption.vue'

export default {
    title: 'Components-V2/VImageWithCaption',
    component: VImageWithCaption,
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
    components: { VImageWithCaption },
    setup() {
        return { args }
    },
    template: '<v-image-with-caption v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    width: 600,
    height: 400,
}

export const NoText = Template.bind({})
NoText.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    width: 600,
    height: 400,
}

export const quality = Template.bind({})
quality.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    width: 600,
    height: 400,
    quality: 30,
}
export const Srcset = Template.bind({})
Srcset.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    width: 300,
    height: 200,
    sizes: [2, 3],
}

export const PublisherImageNoText = Template.bind({})
PublisherImageNoText.args = {
    altText: 'Fallback alt text here',
    image: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2022/02/RL_Hello_EpisodeImage.png',
    width: 600,
    height: 400,
}

export const Caption = Template.bind({})
Caption.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    caption: 'Caption Text Here',
    title: 'Title Text Here',
    description: 'Description Text Here',
    width: 600,
    height: 400,
}

export const Enlarge = Template.bind({})
Enlarge.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    width: 600,
    height: 400,
    allowPreview: true,
    //imageUrl: 'https://www.google.com',
}

export const ImageIsLink = Template.bind({})
ImageIsLink.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    width: 600,
    height: 400,
    allowPreview: false,
    imageUrl: 'https://www.google.com',
}

export const ImageIsRoute = Template.bind({})
ImageIsRoute.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    width: 600,
    height: 400,
    allowPreview: false,
    imageUrl: 'news',
}

export const CaptionAndEnlarge = Template.bind({})
CaptionAndEnlarge.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    caption: 'Caption Text Here',
    width: 600,
    height: 400,
    allowPreview: true,
    imageUrl: 'https://www.google.com',
}

export const Responsive = Template.bind({})
Responsive.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
}

export const ResponsiveCustomRatio = Template.bind({})
ResponsiveCustomRatio.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    ratio: [3, 1],
}

export const ResponsiveVerticalEffect = Template.bind({})
ResponsiveVerticalEffect.args = {
    altText: 'Fallback alt text here',
    image: 'https://cms.demo.nypr.digital/images/212136/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    maxWidth: 1440,
    maxHeight: 2560,
    allowVerticalEffect: true
}

export const Raw = Template.bind({})
Raw.args = {
    altText: 'Fallback alt text here',
    image: 'https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head-768.jpg',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
}

export const RawEnlarged = Template.bind({})
RawEnlarged.args = {
    altText: 'Fallback alt text here',
    image: 'https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head-768.jpg',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    allowPreview: true,
    imageEnlarged: 'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg'
}

export const PublisherTokens = Template.bind({})
PublisherTokens.args = {
    altText: 'Fallback alt text here',
    image: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/2022/02/RL_Hello_EpisodeImage.png',
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
}

export const PublisherTokensLowRez = Template.bind({})
PublisherTokensLowRez.args = {
    altText: 'Fallback alt text here',
    image: 'https://media.wnyc.org/i/%width%/%height%/c/%quality%/photologue/photos/150430.jpg',
    maxWidth: 211,
    maxHeight: 211,
    credit: 'Credit Text Here',
    creditUrl: 'https://www.Credit-URL-Here.com',
    title: 'Title Text Here',
    description: 'Description Text Here',
    ratio: [6, 1],
}
