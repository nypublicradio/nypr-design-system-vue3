import { mount } from '@vue/test-utils'
import VPerson from '../components/VPerson.vue'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VPerson', () => {
  let wrapper = {}
  // all props once
  const profileData = {
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
    "logo": "/default-sponsor.png",
    "socialMediaProfile": [
      {
        "service": "instagram",
        "profileUrl": "https://www.instagram.com/scoboco/"
      },
      {
        "service": "twitter",
        "profileUrl": "https://twitter.com/Scoboco"
      },
      {
        "service": 'instagram',
        "profileUrl": 'https://www.instagram.com/WNYC/'
      },
      {
        "service": 'linkedin',
        "profileUrl": 'https://www.linkedin.com/company/wnyc-radio/'
      },
      {
        "service": 'youtube',
        "profileUrl": 'https://www.youtube.com/channel/UCbysmY4hyViQAAYEzOR-uCQ'
      },
      {
        "service": 'email',
        "username": 'jchung@nypr.com'
      },
      {
        "service": 'site',
        "label": 'My site',
        "profileUrl": 'https://www.google.com'
      }
    ]
  }
  const namePrefix = null
  const imageSize = 100
  const minWidth = null
  const imageFlexBasis = '20%'
  const imageFallbackPath = null
  const alt = 'Profile Image'
  const vertical = false
  const verticalMobile = false
  const showCta = true
  const ctaText = 'Read more'
  const showBio = true
  const showSocial = true
  const showName = true
  const justImage = false
  const alignItems = 'flex-start'
  const sponsored = false
  const flexDirection = 'row'
  const truncate = null
  const radius = '50%'
  const loading = 'lazy'
  const imageRatio = [1, 1]
  const sizes = null
  const isDecorative = false

  const createComponent = ({ props = {}, slots = {} } = {}) => {
    wrapper = mount(VPerson, {
      props,
      global: {
        stubs: {

        }
      },
      slots
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
  })

  test('it renders props', async () => {
    createComponent({
      props: { profileData }
    })

    const _img = wrapper.find('.author-image .image')
    const _name = wrapper.find('.name-link .name')
    const _bio = wrapper.find('.info .bio')
    const _cta = wrapper.find('.info .cta')
    const _flexibleLinks = wrapper.find('a')

    expect(_img.attributes('src')).toContain(profileData.photoID)
    expect(_name.text()).toContain(profileData.name)
    expect(_bio.html()).toContain(profileData.biography)
    expect(_cta.text()).toContain('Read more')
    for (var i = 0; i < _flexibleLinks.length; i++) {
      expect(_flexibleLinks.classes().toContain('flexible-link').attributes('href')).toBe(profileData.url)
    }

  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: { profileData }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
