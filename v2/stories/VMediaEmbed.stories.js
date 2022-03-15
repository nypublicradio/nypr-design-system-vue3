import VMediaEmbed from '../src/components/VMediaEmbed.vue'

export default {
    title: 'Components-V2/VMediaEmbed',
    component: VMediaEmbed,
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
    components: { VMediaEmbed },
    setup() {
        return { args }
    },
    template: '<v-media-embed v-bind="args" />',
})

export const Vimeo = Template.bind({})
Vimeo.args = {
    url: 'https://player.vimeo.com/video/90283590'
}

export const VimeoCustomRatio = Template.bind({})
VimeoCustomRatio.args = {
    url: 'https://player.vimeo.com/video/678288195',
    ratio: [9, 16]
}

export const Youtube = Template.bind({})
Youtube.args = {
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
}

export const YoutubeCustomRatio = Template.bind({})
YoutubeCustomRatio.args = {
    url: 'https://www.youtube.com/embed/stNnNjM-Rhk',
    ratio: [1, 1]
}

export const YoutubeNoControls = Template.bind({})
YoutubeNoControls.args = {
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
    controls: false,
}

export const YoutubeCustomStartTime = Template.bind({})
YoutubeCustomStartTime.args = {
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
    startTime: 60,
}

export const YoutubeAutoplay = Template.bind({})
YoutubeAutoplay.args = {
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
    autoPlay: true,
}

export const YoutubeAutoplayMuted = Template.bind({})
YoutubeAutoplayMuted.args = {
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
    autoPlay: true,
    mute: true,
}

