import { mount } from '@vue/test-utils'
import VFlexibleLink from '../components/VFlexibleLink.vue'

describe('VFlexibleLink', () => {
  let wrapper = {}
  const toLink = '/abc'
  const urlLink = 'https://example.com'
  const findNuxtLink = () => wrapper.find('.internal')
  const findAnchor = () => wrapper.find('a')
  const findNullDiv = () => wrapper.find('.null')

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VFlexibleLink, {
      props,
      global: {
        stubs: {
          'nuxt-link': true
        }
      }
    })
  }

  afterEach(() => {
    if (wrapper.destroy) {
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
})