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
    "biography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
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
    "biography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
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

const Template = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" />',
})
const TemplateSlots = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" ><template #slot-above-name>SLOTTED CONTENT ABOVE NAME</template><template #slot-above-bio>SLOTTED CONTENT ABOVE BIO</template><template #slot-below-bio>SLOTTED CONTENT BELOW BIO</template><template #slot-below-cta>SLOTTED CONTENT BELOW CTA</template></v-person>',
})

function useImageUrl(imageID, options) {
    console.log('imageID = ', imageID)
    if (!imageID) {
        return null
    }
    const imageUrlTemplate = `https://cms.prod.nypr.digital/images/${imageID}/fill-%width%x%height%|format-webp|webpquality-%quality%`
    return imageUrlTemplate
        .replace('%width%', options?.width && String(options.width) || '%width%')
        .replace('%height%', options?.height && String(options.height) || '%height%')
        .replace('%quality%', options?.quality && String(options.quality) || '%quality%')
}

export const Default = Template.bind({})
Default.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID)
}
export const ImageSize = Template.bind({})
ImageSize.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    imageSize: 150,
}
export const ImageSizeScaleRatio = Template.bind({})
ImageSizeScaleRatio.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    imageSize: 150,
    imageSizeScaleRatio: 2
}
export const ImageSizeWithNoScaleRatio = Template.bind({})
ImageSizeWithNoScaleRatio.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    imageSize: 80,
    imageSizeScaleRatio: 1
}
export const NamePrefix = Template.bind({})
NamePrefix.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    namePrefix: 'By',
}
export const NoPhotoFallbackImage = Template.bind({})
NoPhotoFallbackImage.args = {
    profileData: profileFromArticleNoPhoto,
    imageSrc: useImageUrl(profileFromArticleNoPhoto.photoID),
}
export const NoPhotoCustomImage = Template.bind({})
NoPhotoCustomImage.args = {
    profileData: profileFromArticleNoPhoto,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    imageFallbackPath: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg',
}
export const VerticalMobile = Template.bind({})
VerticalMobile.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    verticalMobile: true,
}
export const HideCTA = Template.bind({})
HideCTA.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    showCta: false,
}
export const HideBioCTAAndCenter = Template.bind({})
HideBioCTAAndCenter.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    showBio: false,
    showCta: false,
    alignItems: 'center',
}
export const HideSocial = Template.bind({})
HideSocial.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    showSocial: false,
}
export const Sponsored = Template.bind({})
Sponsored.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    sponsored: true,
}
export const Reverse = Template.bind({})
Reverse.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    reverse: true,
}
export const TruncatedBio2Lines = Template.bind({})
TruncatedBio2Lines.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    truncate: 2,
}
export const TruncatedBio3Lines = Template.bind({})
TruncatedBio3Lines.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    truncate: 3,
}
export const ImageRadius = Template.bind({})
ImageRadius.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    radius: '10px',
}
export const EagerLoading = Template.bind({})
EagerLoading.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    loading: 'eager',
}
export const ImageRatio = Template.bind({})
ImageRatio.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    imageRatio: [4, 2],
    radius: '0',
}
export const PixelDensitySizes = Template.bind({})
PixelDensitySizes.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
    pixelDensitySizes: [2, 3, 4],
}
export const SlottedContent = TemplateSlots.bind({})
SlottedContent.args = {
    profileData: profileFromArticle,
    imageSrc: useImageUrl(profileFromArticle.photoID),
}