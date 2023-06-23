import { mount } from '@vue/test-utils'
import VFlexibleLink from '../components/VFlexibleLink.vue'
import PrimeVue from 'primevue/config'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VFlexibleLink', () => {
  let wrapper = {}
  const toLink = '/abc'
  const urlLink = 'https://example.com'
  const telLink = 'tel:1-234-567-8901'
  const anchorLink = '#anchor'
  const mailtoLink = 'mailto:digital@nypr.com'
  const findFlexibleLink = () => wrapper.find('.flexible-link')
  const findNuxtLink = () => wrapper.find('.internal')
  const findAnchor = () => wrapper.find('a')
  const findNullDiv = () => wrapper.find('.null')

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VFlexibleLink, {
      props,
      slots: {
        default: 'link text',
      },
      global: {
        plugins: [PrimeVue],
        stubs: {
          'nuxt-link': true
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

  it('should render with a relative link', () => {
    createComponent({
      props: {
        to: toLink
      }
    })
    expect(findNuxtLink().exists()).toBe(true)
    expect(findNuxtLink().attributes('to')).toBe(toLink)
  })

  it('should render with null link', () => {
    createComponent({
      props: {
        to: null
      }
    })
    expect(findNullDiv().exists()).toBe(true)
  })

  it('should render with an external link', () => {
    createComponent({
      props: {
        to: urlLink
      }
    })
    expect(findAnchor().exists()).toBe(true)
    expect(findAnchor().attributes('href')).toBe(urlLink)
    expect(findAnchor().attributes('target')).toBe('_blank')
    expect(findAnchor().attributes('rel')).toBe('noopener noreferrer')
    expect(findAnchor().attributes('class')).toBe('flexible-link external')
  })

  it('should render with a tel link', () => {
    createComponent({
      props: {
        to: telLink
      }
    })
    expect(findAnchor().attributes('href')).toBe(telLink)
  })

  it('should render with a mailto link', () => {
    createComponent({
      props: {
        to: mailtoLink
      }
    })
    expect(findAnchor().attributes('href')).toBe(mailtoLink)
  })

  it('should render with a anchor link', () => {
    createComponent({
      props: {
        to: anchorLink
      }
    })
    expect(findAnchor().attributes('href')).toBe(anchorLink)
  })

  it('custom target', () => {
    createComponent({
      props: {
        to: mailtoLink,
        target: '_self'
      }
    })
    expect(findAnchor().attributes('target')).toBe('_self')
  })


  test('counter click fires emit', async () => {
    createComponent({
      props: {
        to: toLink
      }
    })
    const link = wrapper.find('.flexible-link')
    link.trigger('click')

    expect(wrapper.emitted()['flexible-link-click']).toBeTruthy()
    expect(wrapper.emitted()['flexible-link-click']).toEqual([[toLink]])
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        to: urlLink
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

})