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

const profile = {
    "id": 19,
    "meta": {
        "first_published_at": "2021-12-06T13:34:20.421614-05:00",
        "type": "people.PersonPage",
        "detail_url": "https://cms.demo.nypr.digital/api/v2/pages/19/",
        "html_url": "http://cms.prod.nypr.digital/staff/scott-lynch/",
        "slug": "scott-lynch",
        "show_in_menus": true,
        "seo_title": "",
        "search_description": "",
        "parent": {
            "id": 6,
            "meta": {
                "type": "people.PersonIndexPage",
                "detail_url": "https://cms.demo.nypr.digital/api/v2/pages/6/",
                "html_url": "http://cms.prod.nypr.digital/staff/"
            },
            "title": "Staff"
        }
    },
    "title": "Scott Lynch",
    "listing_title": "",
    "listing_summary": "",
    "listing_image": null,
    "social_image": null,
    "social_title": "",
    "social_text": "",
    "show_on_index_listing": true,
    "uuid": "163e9257-5f83-4326-b55a-d367ce10d423",
    "url": "https://gothamist-vue3demo.gothamist.com/staff/scott-lynch",
    "first_name": "Scott",
    "last_name": "Lynch",
    "photo": {
        "id": 327700,
        "meta": {
            "type": "images.CustomImage",
            "detail_url": "https://cms.demo.nypr.digital/api/v2/images/327700/",
            "download_url": "https://cdn.cms.demo.nypr.digital/original_images/B9898331-C616-45E9-A940-B7B092A7163D.JPG"
        },
        "title": "B9898331-C616-45E9-A940-B7B092A7163D.JPG"
    },
    "job_title": "Photojournalist",
    "social_media_profile": [
        {
            "id": 26,
            "meta": {
                "type": "people.SocialMediaProfile"
            },
            "profile_url": "https://www.instagram.com/scoboco/",
            "service": "instagram"
        },
        {
            "id": 48,
            "meta": {
                "type": "people.SocialMediaProfile"
            },
            "profile_url": "https://twitter.com/Scoboco",
            "service": "twitter"
        },
        {
            "id": 49,
            "meta": {
                "type": "people.SocialMediaProfile"
            },
            "profile_url": "https://facebook.com/Scoboco",
            "service": "facebook"
        },
        {
            "id": 50,
            "meta": {
                "type": "people.SocialMediaProfile"
            },
            "profile_url": "https://linkedin.com/Scoboco",
            "service": "linkedin"
        },
        {
            "id": 51,
            "meta": {
                "type": "people.SocialMediaProfile"
            },
            "profile_url": "https://youtube.com/Scoboco",
            "service": "youtube"
        }
    ],
    "website": "http://t.co/Np4U39BYlh",
    "email": "scoboco@gmail.com",
    "phone_numbers": [
        {
            "id": 1,
            "meta": {
                "type": "people.PersonPagePhoneNumber"
            },
            "phone_number": "9731231234"
        }
    ],
    "biography": "Photojournalist, food writer, preschool receptionist. Love NYC."
}

const Template = (args) => ({
    components: { VPerson },
    setup() {
        return { args }
    },
    template: '<v-person v-bind="args" />',
})

export const DefaultHorizontal = Template.bind({})
DefaultHorizontal.args = {
    profileId: 19,
}
