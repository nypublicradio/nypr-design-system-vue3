import VPerson from '../src/components/VPerson.vue'

export default {
    argTypes: {
        cssvars: {
            control: { value: {"--person-name-color": "var(--text-color)", "--person-name-decoration": "none", "--person-name-hover-decoration": "underline", "--person-name-size": "var(--font-size-9)", "--person-name-small-size": "var(--font-size-7)", "--person-name-weight": "var(--font-weight-600)",} },
            description:"CSS variables applied to the component.",
            type: { name: 'object' },
            value:{"key": "value"}
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
    component: VPerson,
    title: 'Components-V2/VPerson',
}
const profileFromArticle = {
    "biography": "Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
    "email": "scoboco@gmail.com",
    "firstName": "Scott",
    "id": 19,
    "jobTitle": "Photojournalist",
    "lastName": "Lynch",
    "link": "https://www.sponsoredLink.com",
    "logo": "/default-sponsor.png",
    "name": "Scott Lynch",
    "phone_numbers": [
        {
            "phone_number": "9731231234"
        },
        {
            "phone_number": "2011231234"
        }
    ],
    "photoID": 327700,
    "slug": "scott-lynch",
    "socialMediaProfile": [
        {
            "profileUrl": "https://www.instagram.com/scoboco/",
            "service": "instagram"
        },
        {
            "profileUrl": "https://twitter.com/Scoboco",
            "service": "twitter"
        }
    ],
    "url": "/staff/scott-lynch",
    "website": "http://t.co/Np4U39BYlh"
}

const profileFromArticleNoPhoto = {
    "biography": "Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
    "email": "scoboco@gmail.com",
    "firstName": "Scott",
    "id": 19,
    "jobTitle": "Photojournalist",
    "lastName": "Lynch",
    "link": "https://www.sponsoredLink.com",
    "logo": "/images/default-sponsor.jpg",
    "name": "Scott Lynch",
    "phone_numbers": [
        {
            "phone_number": "9731231234"
        },
        {
            "phone_number": "2011231234"
        }
    ],
    "photoID": null,
    "slug": "scott-lynch",
    "socialMediaProfile": [
        {
            "profileUrl": "https://www.instagram.com/scoboco/",
            "service": "instagram"
        },
        {
            "profileUrl": "https://twitter.com/Scoboco",
            "service": "twitter"
        }
    ],
    "url": "/staff/scott-lynch",
    "website": "http://t.co/Np4U39BYlh"
}
const profileFromArticleNoSocial = {
    "biography": "Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
    "email": "scoboco@gmail.com",
    "firstName": "Scott",
    "id": 19,
    "jobTitle": "Photojournalist",
    "lastName": "Lynch",
    "link": "https://www.sponsoredLink.com",
    "logo": "/images/default-sponsor.jpg",
    "name": "Scott Lynch",
    "phone_numbers": [
        {
            "phone_number": "9731231234"
        },
        {
            "phone_number": "2011231234"
        }
    ],
    "photoID": 327700,
    "slug": "scott-lynch",
    "socialMediaProfile": null,
    "url": "/staff/scott-lynch",
    "website": "http://t.co/Np4U39BYlh"
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
    imageSize: 150,
    profileData: profileFromArticle,
}
export const ImageFlexBasis = Template.bind({})
ImageFlexBasis.args = {
    imageFlexBasis: "8%",

    imageSize: 150,
    profileData: profileFromArticle
}
export const ImageSizeWithNoScale = Template.bind({})
ImageSizeWithNoScale.args = {
    imageFlexBasis: "80px",
    imageSize: 80,
    profileData: profileFromArticle
}
export const ImageSizeMinWidth = Template.bind({})
ImageSizeMinWidth.args = {
    minWidth: 80,
    profileData: profileFromArticle,
}
export const NamePrefix = Template.bind({})
NamePrefix.args = {
    namePrefix: 'By',

    profileData: profileFromArticle,
}
export const NoPhotoFallbackImage = Template.bind({})
NoPhotoFallbackImage.args = {
    profileData: profileFromArticleNoPhoto,
}
export const NoPhotoCustomImage = Template.bind({})
NoPhotoCustomImage.args = {
    imageFallbackPath: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg',

    profileData: profileFromArticleNoPhoto,
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
export const CustomCTA = Template.bind({})
CustomCTA.args = {
    ctaText: "Learn more",
    profileData: profileFromArticle,
}
export const HideBioCTAAndCenter = Template.bind({})
HideBioCTAAndCenter.args = {
    alignItems: 'center',

    profileData: profileFromArticle,
    showBio: false,
    showCta: false,
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
    flexDirection: 'row-reverse',

    profileData: profileFromArticle,
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
    loading: 'eager',

    profileData: profileFromArticle,
}
export const ImageRatio = Template.bind({})
ImageRatio.args = {
    imageRatio: [4, 2],

    profileData: profileFromArticle,
    radius: '0',
}
export const ImageSizes = Template.bind({})
ImageSizes.args = {
    profileData: profileFromArticle,

    sizes: 'xs:30 sm:100 md:200',
}
export const SlottedContent = TemplateSlots.bind({})
SlottedContent.args = {
    profileData: profileFromArticle,

}
export const justImage = TemplateJustImage.bind({})
justImage.args = {
    justImage: true,

    profileData: profileFromArticle
}
export const NoSocial = Template.bind({})
NoSocial.args = {
    profileData: profileFromArticleNoSocial,
}