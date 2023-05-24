import VPerson from '../src/components/VPerson.vue'

export default {
    title: 'Components-V2/VPerson',
    component: VPerson,
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

const social = [
    {
        service: 'facebook',
        profileUrl: 'https://www.facebook.com/WNYC',
    },
    {
        service: 'twitter',
        profileUrl: 'https://twitter.com/WNYC'
    },
    {
        service: 'instagram',
        profileUrl: 'https://www.instagram.com/WNYC/'
    },
    {
        service: 'linkedin',
        profileUrl: 'https://www.linkedin.com/company/wnyc-radio/'
    },
    {
        service: 'youtube',
        profileUrl: 'https://www.youtube.com/channel/UCbysmY4hyViQAAYEzOR-uCQ'
    }
]

const Template = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" />',
})

export const DefaultHorizontal = Template.bind({})
DefaultHorizontal.args = {
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
}

export const NoImage = Template.bind({})
NoImage.args = {
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
}

export const VerticalLayout = Template.bind({})
VerticalLayout.args = {
    orientation: 'vertical',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
}

export const ResponsiveLayout = Template.bind({})
ResponsiveLayout.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
}

export const CircleImage = Template.bind({})
CircleImage.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    circle: true,
}

export const Organization = Template.bind({})
Organization.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
}

export const OrganizationLinked = Template.bind({})
OrganizationLinked.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
}

export const Blurb = Template.bind({})
Blurb.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
    blurb: 'Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order.',
}

export const BlurbTruncated = Template.bind({})
BlurbTruncated.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
    blurb: 'Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order. Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order.',
    truncate: '2'
}

export const Website = Template.bind({})
Website.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
    websiteUrl: 'https://www.google.com',
    websiteLabel: 'Website Label',

}

export const WebsiteAndEmail = Template.bind({})
WebsiteAndEmail.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
    websiteUrl: 'https://www.google.com',
    websiteLabel: 'Website Label',
    email: 'jchung@nypr.com',

}

export const WebsiteAndEmailAndPhoneNumbers = Template.bind({})
WebsiteAndEmailAndPhoneNumbers.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
    websiteUrl: 'https://www.google.com',
    websiteLabel: 'Website Label',
    email: 'jchung@nypr.com',
    phoneNumbers: [
        { phoneNumber: '1-973-615-6339' },
        { phoneNumber: '1-973-123-1234' }
    ],

}

export const WebsiteAndEmailAndPhoneNumbersAndSocial = Template.bind({})
WebsiteAndEmailAndPhoneNumbersAndSocial.args = {
    orientation: 'responsive',
    image: 'https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/',
    fullName: 'Jen Chung',
    role: 'Executive Editor and Co-founder',
    organization: 'Gothamist',
    organizationLink: 'https://gothamist.com/',
    websiteUrl: 'https://www.google.com',
    websiteLabel: 'Website Label',
    email: 'jchung@nypr.com',
    phoneNumbers: [
        { phoneNumber: '1-973-615-6339' },
        { phoneNumber: '1-973-123-1234' }
    ],
    social: social,

}
