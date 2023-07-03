import VPersistentPlayer from '../src/components/VPersistentPlayer.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: { "--persistent-player-bg": " #f1f1f1", "--persistent-player-height": " 100px", "--persistent-player-height-buffer": " 20px", "--persistent-player-live-indicator-bg": "var(--text-color)", "--persistent-player-live-indicator-color": "#fff", "--persistent-player-maximize-btn-bg": "var(--persistent-player-bg)", "--persistent-player-maximize-btn-bg-hover": "#a6a6a6", "--persistent-player-maximize-btn-color": "#000", "--persistent-player-minimize-btn-bg": "var(--persistent-player-bg)", "--persistent-player-minimize-btn-bg-hover": "#a6a6a6", "--persistent-player-minimize-btn-color": "#000", "--persistent-player-play-button-height": "40px", "--persistent-player-play-button-radius": "20px", "--persistent-player-play-button-width": "40px", "--persistent-player-text-button-color": "var(--text-color)", "--persistent-player-text-button-color-hover": "inherit", "--persistent-player-text-button-radius": "15px", "--persistent-player-title-color": "var(--text-color)", "--persistent-player-title-decoration": "none", "--persistent-player-title-hover-decoration": "underline", "--persistent-player-title-size": "var(--font-size-9)", "--persistent-player-title-weight": "400", "--persistent-player-z-index": "var(--z-index-10)" } },
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
    component: VPersistentPlayer,
    title: 'Components-V2/VPersistentPlayer',
}

const Template = (args) => ({
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" style="position:relative;" />',
})
const TemplateCustomIcons = (args) => ({
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" style="position:relative;" ><template #chevronDown> <i class="pi pi-twitter"></ > </template > <template #chevronUp> <i class="pi pi-facebook"></i> </template> <template #volumeOn> <i class="pi pi-twitter"></i> </template> <template #volumeOff> <i class="pi pi-facebook"></i> </template> <template #prev> <i class="pi pi-twitter"></i> </template> <template #play> <i class="pi pi-twitter"></i> </template> <template #pause> <i class="pi pi-facebook"></i> </template> <template #loading> <i class="pi pi-spin pi-spinner"></i> </template> <template #skip> <i class="pi pi-twitter"></i> </template> <template #download> <i class="pi pi-twitter"></i> </template></v-persistent-player> ',
})
const TemplateCanExpand = (args) => ({
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" style="position:relative;" ><template #expanded-content>Slotted content here</template></v-persistent-player> ',
})
const TemplateCanExpandCustomButtonIcon = (args) => ({
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" style="position:relative;"><template #expanded-content>Slotted content here</template><template #unexpanded-button-icon><i class="pi pi-facebook" /></template></v-persistent-player> ',
})
const TemplateCanExpandCustomHeaderContent = (args) => ({
    components: { VPersistentPlayer },
    setup() {
        return { args }
    },
    template: '<v-persistent-player v-bind="args" style="position:relative;"><template #expanded-content>Slotted content here</template><template #header-content><p>Custom Header Content</p></template></v-persistent-player> ',
})

export const Default = Template.bind({})
Default.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const DescriptionLink = Template.bind({})
DescriptionLink.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    descriptionLink: "http://www.bing.com",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const WithImage = Template.bind({})
WithImage.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const HideImageOnMobile = Template.bind({})
HideImageOnMobile.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    hideImageOnMobile: true,
    image: "329534",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const HideDescriptionOnMobile = Template.bind({})
HideDescriptionOnMobile.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    hideDescriptionOnMobile: true,
    image: "329534",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}
export const HideTimeOnMobile = Template.bind({})
HideTimeOnMobile.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    hideTimeOnMobile: true,
    image: "329534",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}
export const TimelineTop = Template.bind({})
TimelineTop.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    hideTimeOnMobile: true,
    image: "329534",
    station: "WNYC 93.9 FM",
    timelineInteractive: false,
    timelineTop: true,
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}
export const TimelineBottom = Template.bind({})
TimelineBottom.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    hideTimeOnMobile: true,
    image: "329534",
    station: "WNYC 93.9 FM",
    timelineBottom: true,
    timelineInteractive: false,
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const TimelineNotInteractive = Template.bind({})
TimelineNotInteractive.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    station: "WNYC 93.9 FM",
    timelineInteractive: false,
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const AutoPlay = Template.bind({})
AutoPlay.args = {
    autoPlay: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const LiveStream = Template.bind({})
LiveStream.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    livestream: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const LiveStreamWithoutTitleLink = Template.bind({})
LiveStreamWithoutTitleLink.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    livestream: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway"
}

export const LivestreamWithoutTitle = Template.bind({})
LivestreamWithoutTitle.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    livestream: true,
    station: "WNYC 93.9 FM",
    titleLink: "http://www.google.com"
}

export const LivestreamWithoutDescription = Template.bind({})
LivestreamWithoutDescription.args = {
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    livestream: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const LivestreamWithoutStation = Template.bind({})
LivestreamWithoutStation.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    livestream: true,
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}


export const Download = Template.bind({})
Download.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}

export const CanMinimize = Template.bind({})
CanMinimize.args = {
    canMinimize: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
}

export const CanExpand = TemplateCanExpand.bind({})
CanExpand.args = {
    canExpand: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
}
export const CanExpandHeaderContent = TemplateCanExpandCustomHeaderContent.bind({})
CanExpandHeaderContent.args = {
    canExpand: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
}
export const CanExpandCustomUnexpandButtonIcon = TemplateCanExpandCustomButtonIcon.bind({})
CanExpandCustomUnexpandButtonIcon.args = {
    canExpand: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
}
export const CanExpandWithSwipe = CanExpand.bind({})
CanExpandWithSwipe.args = {
    canExpand: true,
    canExpandWithSwipe: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
}
export const CanUnexpandWithSwipe = CanExpand.bind({})
CanUnexpandWithSwipe.args = {
    canExpand: true,
    canExpandWithSwipe: true,
    canUnexpandWithSwipe: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
}

export const SetVolume = Template.bind({})
SetVolume.args = {
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com",
    volume: 15,
}

export const customIcons = TemplateCustomIcons.bind({})
customIcons.args = {
    canMinimize: true,
    description: "This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.",
    file: "https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3",
    image: "329534",
    showDownload: true,
    station: "WNYC 93.9 FM",
    title: "The Takeaway",
    titleLink: "http://www.google.com"
}