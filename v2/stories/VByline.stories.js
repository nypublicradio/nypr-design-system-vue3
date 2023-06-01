import VByline from '../src/components/VByline.vue'
import VSimpleResponsiveImage from '../src/components/VSimpleResponsiveImage.vue'

export default {
    title: 'Components-V2/VByline',
    component: VByline,
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
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args" />',
})


const TemplateImage = (args) => ({
    components: { VByline, VSimpleResponsiveImage },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args"> <template #images="slotProps" ><VSimpleResponsiveImage :src="`https://cms.prod.nypr.digital/images/${slotProps.author.photoID}/fill-%width%x%height%|format-webp|webpquality-%quality%`" :width="48" :height="48" :ratio="[1,1]" alt="Profile image" style="width:48px; height:auto;"/></template></v-byline>',
})

const TemplateBelowNameSlot = (args) => ({
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args"> <template #belowNames="slotProps" >SLOT BELOW THE NAMES</template></v-byline>',
})

const TemplateAfterNameSlot = (args) => ({
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args"> <template #afterNames="slotProps" >SLOT AFTER THE NAMES</template></v-byline>',
})
const authorArray = [
    {
        "id": 146821,
        "firstName": "Nsikan",
        "lastName": "Akpan",
        "name": "Nsikan Akpan",
        "photoID": 327577,
        "jobTitle": "Editor, Health & Science",
        "biography": "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
        "website": "",
        "email": "",
        "slug": "nsikan-akpan",
        "url": "/staff/nsikan-akpan",
        "socialMediaProfile": [
            {
                "service": "twitter",
                "profileUrl": "https://twitter.com/MoNscience"
            }
        ]
    }
]
const authorsArray = [
    {
        "id": 121,
        "firstName": "Jaclyn",
        "lastName": "Jeffrey-Wilensky",
        "name": "Jaclyn Jeffrey-Wilensky",
        "photoID": 327474,
        "jobTitle": "Data Reporter",
        "biography": "Jaclyn writes data-driven health and science stories for WNYC/Gothamist. She also runs Gothamist's COVID data dashboards. She is an alumna of the Newmark Graduate School of Journalism. Her work has appeared in NBC News, Spectrum, the Daily Beast, and other outlets.",
        "website": "",
        "email": "",
        "slug": "jaclyn-jeffrey-wilensky",
        "url": "/staff/jaclyn-jeffrey-wilensky",
        "socialMediaProfile": []
    },
    {
        "id": 146821,
        "firstName": "Nsikan",
        "lastName": "Akpan",
        "name": "Nsikan Akpan",
        "photoID": 327577,
        "jobTitle": "Editor, Health & Science",
        "biography": "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
        "website": "",
        "email": "",
        "slug": "nsikan-akpan",
        "url": "/staff/nsikan-akpan",
        "socialMediaProfile": [
            {
                "service": "twitter",
                "profileUrl": "https://twitter.com/MoNscience"
            }
        ]
    }
]

const authorsObject =
{
    id: '1',
    firstName: 'Trinity',
    lastName: 'Anderson',
    name: 'Trinity Anderson',
    url: '/trinity-anderson',
    organization: 'Gothamist',
    organizationUrl: 'http://www.gothamist.com',
}


export const Default = Template.bind({})
Default.args = {
    authors: authorsArray
}
export const DefaultDataAsObject = Template.bind({})
DefaultDataAsObject.args = {
    authors: authorsObject
}

export const OneAuthor = Template.bind({})
OneAuthor.args = {
    authors: authorsArray.slice(0, 1)
}

export const CustomPrefix = Template.bind({})
CustomPrefix.args = {
    authors: authorsArray,
    prefix: 'Produced by:'
}
export const CustomConcatsNoPrefix = Template.bind({})
CustomConcatsNoPrefix.args = {
    authors: authorsArray,
    prefix: '',
    concat: ' : ',
    concatLast: ' : '
}
export const imageSlot = TemplateImage.bind({})
imageSlot.args = {
    authors: authorArray,
    showImage: true,
}
export const imagesSlot = TemplateImage.bind({})
imagesSlot.args = {
    authors: authorsArray,
    flexDirection: 'column',
    showImage: true,
}
export const BelowNameSlot = TemplateBelowNameSlot.bind({})
BelowNameSlot.args = {
    authors: authorsArray,
}
export const AfterNameSlot = TemplateAfterNameSlot.bind({})
AfterNameSlot.args = {
    authors: authorsArray,
}
