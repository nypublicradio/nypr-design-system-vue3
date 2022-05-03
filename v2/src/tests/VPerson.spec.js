import { mount } from '@vue/test-utils'
import VPerson from '../components/VPerson.vue'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VPerson', () => {
  let wrapper = {}
  // all props once
  const orientation = 'responsive'
  const image = 'https://placehold.it/175x175'
  const imageGIF = 'https://placehold.it/175x175.gif'
  const video = 'https://www.youtube.com/watch?v=LOS5WB75gkY'
  const imgScale = '70'
  const circle = true
  const fullName = 'FirstName LastName'
  const nameLink = 'https://example.com'
  const organization = 'Gothamist'
  const organizationLink = 'https://gothamist.com/'
  const role = 'Subtitle'
  const blurb = 'Jen grew up in New Jersey and co-founded Gothamist in 2003 as a way to learn more about New York City beyond Law & Order.'
  const truncate = '2'
  const bp = 'sm'
  const social = [
    {
      service: 'facebook',
      profile_url: 'https://www.facebook.com/WNYC'
    },
    {
      service: 'twitter',
      profile_url: 'https://twitter.com/WNYC'
    },
    {
      service: 'instagram',
      profile_url: 'https://www.instagram.com/WNYC/'
    },
    {
      service: 'linkedin',
      profile_url: 'https://www.linkedin.com/company/wnyc-radio/'
    },
    {
      service: 'youtube',
      profile_url: 'https://www.youtube.com/channel/UCbysmY4hyViQAAYEzOR-uCQ'
    },
    {
      service: 'email',
      username: 'jchung@nypr.com'
    },
    {
      service: 'site',
      label: 'My site',
      profile_url: 'https://www.google.com'
    }
  ]

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VPerson, {
      props,
      global: {
        stubs: {
          'nuxt-link': true,
          'client-only': true
        }
      }
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
      props: { orientation, image, video, imgScale, circle, fullName, nameLink, organization, organizationLink, role, blurb, truncate, social, bp }
    })
    // check if prop works and was rendered correctly
    // const imageHolder = wrapper.find('.visual-holder')
    const circleProp = wrapper.find('.circle')
    // const animateProp
    const nameLinkProp = wrapper.find('.person-name-link')
    const imageLinkProp = wrapper.find('.image-with-caption-image-link')
    const roleProp = wrapper.find('.person-role')
    const blurbProp = wrapper.find('.blurbHolder')
    const truncateProp = wrapper.find('.truncate')
    const socialProp = wrapper.find('.social')
    const imageProp = wrapper.find('.prime-img-class')

    expect(imageProp.attributes('src')).toMatch(image)
    expect(circleProp.exists()).toBe(true)
    expect(nameLinkProp.text()).toContain(fullName)
    expect(nameLinkProp.attributes('href')).toBe(nameLink)
    expect(imageLinkProp.attributes('href')).toBe(nameLink)
    expect(roleProp.text()).toContain(role)
    expect(blurbProp.text()).toContain(blurb)
    expect(truncateProp.exists()).toBe(true)
    expect(socialProp.exists()).toBe(true)
  })

  test('it has image only', () => {
    createComponent({
      props: { image }
    })
    const imageProp = wrapper.find('.prime-img-class')
    const hasDetails = wrapper.find('.person-details').exists()
    expect(imageProp.attributes('src')).toBe(image)
    expect(hasDetails).toBe(false)
  })

  test('image is GIF', () => {
    createComponent({
      props: { image: imageGIF }
    })
    const imageProp = wrapper.find('.person-image-img')
    expect(imageProp.attributes('src')).toBe(imageGIF)
    expect(wrapper.vm.isGIF(imageGIF)).toBeTruthy()
  })

  test('it has image only with link', () => {
    createComponent({
      props: { image, nameLink }
    })
    const imageLinkProp = wrapper.find('.image-with-caption-image-link')
    const imageProp = wrapper.find('.prime-img-class')
    const hasDetails = wrapper.find('.person-details').exists()
    expect(imageLinkProp.attributes('to')).toBe(nameLink)
    expect(imageProp.attributes('src')).toBe(image)
    expect(hasDetails).toBe(false)
  })

  test('it has details', () => {
    createComponent({
      props: { image, fullName, role, blurb, social }
    })
    const hasDetails = wrapper.find('.person-details').exists()
    expect(hasDetails).toBe(true)
  })

  test('it does not have details', () => {
    createComponent({
      props: { image, video, circle }
    })
    const hasDetails = wrapper.find('.person-details').exists()
    expect(hasDetails).toBe(false)
  })

  test('it has details with organization', () => {
    createComponent({
      props: { image, fullName, role, blurb, social, organization, organizationLink }
    })
    const personRole = wrapper.find('.person-role')
    const hasDetails = wrapper.find('.person-details')
    const hasDetailsExists = hasDetails.exists()
    expect(hasDetailsExists).toBe(true)
    expect(personRole.text()).toContain(organization)
  })

  test('it has circle image', () => {
    createComponent({
      props: { image, fullName, role, blurb, circle }
    })
    const circleProp = wrapper.find('.circle').exists()
    expect(circleProp).toBe(true)
  })

  test('it has detail, but no image', () => {
    createComponent({
      props: { fullName, role, blurb, circle }
    })
    const imagePropExists = wrapper.find('.person-image-img').exists()
    const hasDetailsExists = wrapper.find('.person-details').exists()
    expect(imagePropExists).toBe(false)
    expect(hasDetailsExists).toBe(true)
  })

  test('it has truncated blurb', () => {
    createComponent({
      props: { fullName, role, blurb, truncate }
    })
    const truncateExists = wrapper.find('.truncate').exists()
    expect(truncateExists).toBe(true)
  })

  test('it extracts youtube ID from url', async () => {
    createComponent({
      props: { fullName, role, blurb }
    })
    const id = await wrapper.vm.getYoutubeId('https://www.youtube.com/watch?v=LOS5WB75gkY')
    expect(id).toMatch('LOS5WB75gkY')
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: { orientation, image, video, imgScale, circle, fullName, nameLink, organization, organizationLink, role, blurb, truncate }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
