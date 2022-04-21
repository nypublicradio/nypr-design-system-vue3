import VPersistentPlayer from '../src/components/VPersistentPlayer.vue'

export default {
    title: 'Components-V2/VPersistentPlayer',
    component: VPersistentPlayer,
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
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const DescriptionLink = Template.bind({})
DescriptionLink.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    descriptionLink: "http://www.bing.com",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const WithImage = Template.bind({})
WithImage.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const AutoPlay = Template.bind({})
AutoPlay.args = {
    autoPlay: true,
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const LiveStream = Template.bind({})
LiveStream.args = {
    livestream: true,
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const LiveStreamWithoutTitleLink = Template.bind({})
LiveStreamWithoutTitleLink.args = {
    livestream: true,
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const LivestreamWithCTA = Template.bind({})
LivestreamWithCTA.args = {
    livestream: true,
    shouldShowCta: true,
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const LivestreamWithoutTitle = Template.bind({})
LivestreamWithoutTitle.args = {
    livestream: true,
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const LivestreamWithoutDescription = Template.bind({})
LivestreamWithoutDescription.args = {
    livestream: true,
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}

export const LivestreamWithoutStation = Template.bind({})
LivestreamWithoutStation.args = {
    livestream: true,
    title: "The Takeaway",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
}


export const Download = Template.bind({})
Download.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    showDownload: true
}

export const CanMinimize = Template.bind({})
CanMinimize.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    showDownload: true,
    canMinimize: true,
}