import VPerson from '../components/VPerson.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VPerson', () => {
  let wrapper = {}
  // all props once
  const profileData = {
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
      },
      {
        "profileUrl": 'https://www.instagram.com/WNYC/',
        "service": 'instagram'
      },
      {
        "profileUrl": 'https://www.linkedin.com/company/wnyc-radio/',
        "service": 'linkedin'
      },
      {
        "profileUrl": 'https://www.youtube.com/channel/UCbysmY4hyViQAAYEzOR-uCQ',
        "service": 'youtube'
      },
      {
        "service": 'email',
        "username": 'jchung@nypr.com'
      },
      {
        "label": 'My site',
        "profileUrl": 'https://www.google.com',
        "service": 'site'
      }
    ],
    "url": "/staff/scott-lynch",
    "website": "http://t.co/Np4U39BYlh"
  }
  const namePrefix = 'By'
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
      global: {
        plugins: [PrimeVue],
        stubs: {

        }
      },
      props,
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

  test('it renders props', () => {
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
    for (let i = 0; i < _flexibleLinks.length; i++) {
      expect(_flexibleLinks.classes().toContain('flexible-link').attributes('href')).toBe(profileData.url)
    }

  })

  test('it renders custom prefix', () => {
    createComponent({
      props: { namePrefix, profileData }
    })

    const _name = wrapper.find('.name-link .name')
    expect(_name.text()).toContain(namePrefix)

  })

  test('it renders a vertical layout', () => {
    createComponent({
      props: { profileData, vertical: true }
    })

    const _profile = wrapper.find('.author-profile')
    expect(_profile.classes()).toContain('vertical')

  })

  test('it renders custom CTA', () => {
    createComponent({
      props: { ctaText: 'custom cta', profileData }
    })

    const _cta = wrapper.find('.cta')
    expect(_cta.text()).toMatch('custom cta')

  })

  test('it hides CTA', () => {
    createComponent({
      props: { profileData, showCta: false }
    })

    const _cta = wrapper.find('.cta')
    expect(_cta.exists()).toBe(false)

  })

  test('it hides social links', () => {
    createComponent({
      props: { profileData, showSocial: false }
    })

    const _social = wrapper.find('.v-share-tools')
    expect(_social.exists()).toBe(false)

  })

  test('it truncates the bio', () => {
    createComponent({
      props: { profileData, truncate: 2 }
    })

    const _bio = wrapper.find('.bio')
    expect(_bio.classes()).toContain('truncate', 't2lines')

  })

  test('it loads the image eagerly', () => {
    createComponent({
      props: { loading: 'eager', profileData }
    })

    const _img = wrapper.find('.image')
    expect(_img.attributes('loading')).toBe('eager')

  })

  test('it loads just the image', () => {
    createComponent({
      props: { justImage: true, profileData }
    })

    const _info = wrapper.find('.info')
    expect(_info.exists()).toBe(false)

  })

  test('emits', async () => {
    createComponent({
      props: {
        profileData
      }

    })
    const img = wrapper.find('.image')
    const name = wrapper.find('.name-link')
    const cta = wrapper.find('.cta')
    const socialIcon = wrapper.find('.v-share-tools-item.instagram')

    await img.trigger('click')
    expect(wrapper.emitted()['image-click']).toBeTruthy()
    expect(wrapper.emitted()['image-click']).toEqual([[profileData.url]])

    await name.trigger('click')
    expect(wrapper.emitted()['name-click']).toBeTruthy()
    expect(wrapper.emitted()['name-click']).toEqual([[profileData.url]])

    await cta.trigger('click')
    expect(wrapper.emitted()['cta-click']).toBeTruthy()
    expect(wrapper.emitted()['cta-click']).toEqual([[profileData.url]])

    await socialIcon.trigger('click')
    expect(wrapper.emitted()['social-follow-click']).toBeTruthy()
    expect(wrapper.emitted()['social-follow-click']).toEqual([['instagram']])
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: { profileData }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
