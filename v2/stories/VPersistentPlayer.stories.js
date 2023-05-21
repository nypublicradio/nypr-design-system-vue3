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
const TemplateCustomIcons = (args) => ({
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" ><template #chevronDown> < i class="pi pi-twitter" ></ > </template > <template #chevronUp> <i class="pi pi-facebook"></i> </template> <template #volumeOn> <i class="pi pi-twitter"></i> </template> <template #volumeOff> <i class="pi pi-facebook"></i> </template> <template #prev> <i class="pi pi-twitter"></i> </template> <template #play> <i class="pi pi-twitter"></i> </template> <template #pause> <i class="pi pi-facebook"></i> </template> <template #loading> <i class="pi pi-spin pi-spinner"></i> </template> <template #skip> <i class="pi pi-twitter"></i> </template> <template #download> <i class="pi pi-twitter"></i> </template></v-persistent-player> ',
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

export const SetVolume = Template.bind({})
SetVolume.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    volume: 15,
}

export const customIcons = TemplateCustomIcons.bind({})
customIcons.args = {
    title: "The Takeaway",
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com",
    image: "https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/",
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    showDownload: true
}