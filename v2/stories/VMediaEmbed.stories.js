import VMediaEmbed from '../src/components/VMediaEmbed.vue'

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
    component: VMediaEmbed,
    title: 'Components-V2/VMediaEmbed',
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
    ratio: [9, 16],
    url: 'https://player.vimeo.com/video/678288195'
}

export const Youtube = Template.bind({})
Youtube.args = {
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
}

export const YoutubeCustomRatio = Template.bind({})
YoutubeCustomRatio.args = {
    ratio: [1, 1],
    url: 'https://www.youtube.com/embed/stNnNjM-Rhk'
}

export const YoutubeNoControls = Template.bind({})
YoutubeNoControls.args = {
    controls: false,
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
}

export const YoutubeCustomStartTime = Template.bind({})
YoutubeCustomStartTime.args = {
    startTime: 60,
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
}

export const YoutubeAutoplay = Template.bind({})
YoutubeAutoplay.args = {
    autoPlay: true,
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
}

export const YoutubeAutoplayMuted = Template.bind({})
YoutubeAutoplayMuted.args = {
    autoPlay: true,
    mute: true,
    url: 'https://www.youtube.com/embed/1BCkSYQ0NRQ',
}

export const Spotify = Template.bind({})
Spotify.args = {
    url: 'https://open.spotify.com/embed/track/5F7I0CfdEnVSPlwFabMyIi?utm_source=generator',
}
export const Soundcloud = Template.bind({})
Soundcloud.args = {
    autoPlay: false,
    ratio: [3, 1],
    url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/13165175&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
}

