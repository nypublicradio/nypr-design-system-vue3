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
const profileFromArticle = {
    "id": 19,
    "firstName": "Scott",
    "lastName": "Lynch",
    "name": "Scott Lynch",
    "photoID": 327700,
    "jobTitle": "Photojournalist",
    "biography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "website": "http://t.co/Np4U39BYlh",
    "phone_numbers": [
        {
            "phone_number": "9731231234"
        },
        {
            "phone_number": "2011231234"
        }
    ],
    "email": "scoboco@gmail.com",
    "slug": "scott-lynch",
    "url": "/staff/scott-lynch",
    "link": "https://www.sponsoredLink.com",
    "socialMediaProfile": [
        {
            "service": "instagram",
            "profileUrl": "https://www.instagram.com/scoboco/"
        },
        {
            "service": "twitter",
            "profileUrl": "https://twitter.com/Scoboco"
        }
    ]
}

const Template = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" />',
})
const TemplateSlot = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" ><template #slot>slotted content</template></v-person>',
})

export const Default = Template.bind({})
Default.args = {
    profileData: profileFromArticle,
    //truncate: 2,
    //namePrefix: 'By',
    //showBio: false,
    //showCta: false,
    //showSocial: false,
    //reverse: true,
    //alignItems: 'center',
    //verticalMobile: true,
}
