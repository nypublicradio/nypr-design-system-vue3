import VByline from '../src/components/VByline.vue'
import VCounter from '../src/components/VCounter.vue'
import VImage from '../src/components/VImage.vue'
import VPerson from '../src/components/VPerson.vue'

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
    component: VByline,
    title: 'Components-V2/VByline',
}

const authorArray = [
    {
        "biography": "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
        "email": "",
        "firstName": "Nsikan",
        "id": 146821,
        "jobTitle": "Editor, Health & Science",
        "lastName": "Akpan",
        "name": "Nsikan Akpan",
        "photoID": 327577,
        "slug": "nsikan-akpan",
        "socialMediaProfile": [
            {
                "profileUrl": "https://twitter.com/MoNscience",
                "service": "twitter"
            }
        ],
        "url": "/staff/nsikan-akpan",

        "website": ""
    }
]
const authorsArray = [
    {
        "biography": "Jaclyn writes data-driven health and science stories for WNYC/Gothamist. She also runs Gothamist's COVID data dashboards. She is an alumna of the Newmark Graduate School of Journalism. Her work has appeared in NBC News, Spectrum, the Daily Beast, and other outlets.",
        "email": "",
        "firstName": "Jaclyn",
        "id": 121,
        "jobTitle": "Data Reporter",
        "lastName": "Jeffrey-Wilensky",
        "name": "Jaclyn Jeffrey-Wilensky",
        "organization": null,
        "organizationUrl": null,
        "photoID": 327474,
        "slug": "jaclyn-jeffrey-wilensky",
        "socialMediaProfile": [],
        "url": "",
        "website": ""
    },
    {
        "biography": "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
        "email": "",
        "id": 146821,
        "jobTitle": "Editor, Health & Science",
        "name": "Nsikan Akpan",
        "organization": 'Gothamist',
        "organizationUrl": 'http://www.gothamist.com',
        "photoID": 327577,
        "slug": "nsikan-akpan",
        "socialMediaProfile": [
            {
                "profileUrl": "https://twitter.com/MoNscience",
                "service": "twitter"
            }
        ],
        "url": "/staff/nsikan-akpan",
        "website": ""
    },
    {
        "biography": "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
        "email": "",
        "firstName": "Peter",
        "id": 146823,
        "jobTitle": "Editor, Health & Science",
        "lastName": "Gibbons",
        "name": "Peter Gibbons",
        "organization": 'Inatech',
        "organizationUrl": null,
        "photoID": 32755,
        "slug": "nsikan-akpan",
        "socialMediaProfile": [
            {
                "profileUrl": "https://twitter.com/MoNscience",
                "service": "twitter"
            }
        ],
        "url": "/staff/nsikan-akpan",
        "website": ""
    }
]

const authorsObject =
{
    firstName: 'Trinity',
    id: '1',
    lastName: 'Anderson',
    name: 'Trinity Anderson',
    organization: 'Gothamist',
    organizationUrl: 'http://www.gothamist.com',
    url: '/trinity-anderson',
}


const Template = (args) => ({
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args" />',
})
const TemplateBlockLinks = (args) => ({
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args" isBlockLinks />',
})


const TemplateImage = (args) => ({
    components: { VByline, VImage },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args"> <template #images="slotProps" ><VImage :src="slotProps.author.photoID" :width="48" :height="48" :ratio="[1,1]" alt="Profile image" style="width:48px; height:auto;"/></template></v-byline>',
})
const TemplateImagePerson = (args) => ({
    components: { VByline, VPerson },
    setup() {
        return { args }
    },
    //# skipcq: JS-0038
    template: '<v-byline v-bind="args"> <template #images="slotProps" ><VPerson :profileData="slotProps.author" :imageSize="45" :justImage="true" :imageSrc="`https://cms.prod.nypr.digital/images/${slotProps.author.photoID}/fill-%width%x%height%|format-webp|webpquality-%quality%`"/></template></v-byline>',
})

const TemplateBelowNameSlot = (args) => ({
    components: { VByline, VCounter },
    setup() {
        return { args, authorArray }
    },
    template: '<v-byline v-bind="args"> <template #belowNames="slotProps" ><v-counter text="Comments" :value="authorArray[0].photoID" href="http://www.google.com" /></template></v-byline>',
})

const TemplateAfterNameSlot = (args) => ({
    components: { VByline },
    setup() {
        return { args }
    },
    template: '<v-byline v-bind="args"> <template #afterNames="slotProps" >SLOT AFTER THE NAMES</template></v-byline>',
})


export const Default = Template.bind({})
Default.args = {
    authors: authorsArray
}
export const BlockLinks = TemplateBlockLinks.bind({})
BlockLinks.args = {
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
    concat: ' : ',
    concatLast: ' : ',
    prefix: ''
}
export const imageSlot = TemplateImage.bind({})
imageSlot.args = {
    authors: authorArray,
    showImage: true,
}
export const imageSlotVPerson = TemplateImagePerson.bind({})
imageSlotVPerson.args = {
    authors: authorArray,
    showImage: true,
}
export const imagesSlotVPersons = TemplateImagePerson.bind({})
imagesSlotVPersons.args = {
    authors: authorsArray,
    flexDirection: 'column',
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
