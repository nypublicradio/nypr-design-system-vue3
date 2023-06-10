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
    "biography": "Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
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
    "logo": "images/default-sponsor.png",
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

const profileFromArticleNoPhoto = {
    "id": 19,
    "firstName": "Scott",
    "lastName": "Lynch",
    "name": "Scott Lynch",
    "photoID": null,
    "jobTitle": "Photojournalist",
    "biography": "Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
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
    "logo": "../assets/images/default-sponsor.jpg",
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
const profileFromArticleNoSocial = {
    "id": 19,
    "firstName": "Scott",
    "lastName": "Lynch",
    "name": "Scott Lynch",
    "photoID": 327700,
    "jobTitle": "Photojournalist",
    "biography": "Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
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
    "logo": "../assets/images/default-sponsor.jpg",
    "socialMediaProfile": null
}

const Template = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" />',
})

const TemplateJustImage = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<div style="display:flex; flex-wrap:wrap; gap:10px;"><v-person v-bind="args" /><v-person v-bind="args" /><v-person v-bind="args" /><v-person v-bind="args" /><v-person v-bind="args" /><v-person v-bind="args" /><v-person v-bind="args" /></div>',
})
const TemplateSlots = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" ><template #slot-above-name>SLOTTED CONTENT ABOVE NAME</template><template #slot-above-bio>SLOTTED CONTENT ABOVE BIO</template><template #slot-below-bio>SLOTTED CONTENT BELOW BIO</template><template #slot-below-cta>SLOTTED CONTENT BELOW CTA</template></v-person>',
})

export const Default = Template.bind({})
Default.args = {
    profileData: profileFromArticle,
}
export const ImageSize = Template.bind({})
ImageSize.args = {
    profileData: profileFromArticle,

    imageSize: 150,
}
export const ImageSizeScaleRatio = Template.bind({})
ImageSizeScaleRatio.args = {
    profileData: profileFromArticle,

    imageSize: 150,
    imageSizeScaleRatio: 2.5
}
export const ImageSizeWithNoScaleRatio = Template.bind({})
ImageSizeWithNoScaleRatio.args = {
    profileData: profileFromArticle,

    imageSize: 80,
    imageSizeScaleRatio: 1
}
export const NamePrefix = Template.bind({})
NamePrefix.args = {
    profileData: profileFromArticle,

    namePrefix: 'By',
}
export const NoPhotoFallbackImage = Template.bind({})
NoPhotoFallbackImage.args = {
    profileData: profileFromArticleNoPhoto,
}
export const NoPhotoCustomImage = Template.bind({})
NoPhotoCustomImage.args = {
    profileData: profileFromArticleNoPhoto,

    imageFallbackPath: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg',
}
export const Vertical = Template.bind({})
Vertical.args = {
    profileData: profileFromArticle,

    vertical: true,
}
export const VerticalMobile = Template.bind({})
VerticalMobile.args = {
    profileData: profileFromArticle,

    verticalMobile: true,
}
export const HideCTA = Template.bind({})
HideCTA.args = {
    profileData: profileFromArticle,

    showCta: false,
}
export const HideBioCTAAndCenter = Template.bind({})
HideBioCTAAndCenter.args = {
    profileData: profileFromArticle,

    showBio: false,
    showCta: false,
    alignItems: 'center',
}
export const HideSocial = Template.bind({})
HideSocial.args = {
    profileData: profileFromArticle,

    showSocial: false,
}
export const Sponsored = Template.bind({})
Sponsored.args = {
    profileData: profileFromArticle,

    sponsored: true,
}
export const Reverse = Template.bind({})
Reverse.args = {
    profileData: profileFromArticle,

    flexDirection: 'row-reverse',
}
export const TruncatedBio2Lines = Template.bind({})
TruncatedBio2Lines.args = {
    profileData: profileFromArticle,

    truncate: 2,
}
export const TruncatedBio3Lines = Template.bind({})
TruncatedBio3Lines.args = {
    profileData: profileFromArticle,

    truncate: 3,
}
export const ImageRadius = Template.bind({})
ImageRadius.args = {
    profileData: profileFromArticle,

    radius: '10px',
}
export const EagerLoading = Template.bind({})
EagerLoading.args = {
    profileData: profileFromArticle,

    loading: 'eager',
}
export const ImageRatio = Template.bind({})
ImageRatio.args = {
    profileData: profileFromArticle,

    imageRatio: [4, 2],
    radius: '0',
}
export const ImageSizes = Template.bind({})
ImageSizes.args = {
    profileData: profileFromArticle,

    sizes: [2, 3, 4],
}
export const SlottedContent = TemplateSlots.bind({})
SlottedContent.args = {
    profileData: profileFromArticle,

}
export const justImage = TemplateJustImage.bind({})
justImage.args = {
    profileData: profileFromArticle,

    justImage: true
}
export const NoSocial = Template.bind({})
NoSocial.args = {
    profileData: profileFromArticleNoSocial,
}