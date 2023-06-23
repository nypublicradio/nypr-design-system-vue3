import { mount } from '@vue/test-utils'
import VTag from '../components/VTag.vue'
import PrimeVue from 'primevue/config'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VTag', () => {
  let wrapper = {}

  const name = 'news'
  const slug = 'news'
  // const radius = 10

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VTag, {
      props,
      global: {
        plugins: [PrimeVue],
        stubs: {
          //'nuxt-link': true
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

  test('text prop works: null', async () => {
    createComponent({
      props: {
        name,
        slug
      }
    })
    const button = wrapper.find('.flexible-link .p-button .p-button-label')
    expect(button.text()).toBe(name)
  })

  test('url link attribute works', () => {
    createComponent({
      props: {
        name,
        slug: 'https://example.com'
      }
    })
    const div = wrapper.find('.flexible-link')
    expect(div.attributes().href).toBe('https://example.com')
  })

  //this is using nuxt - link, so we need to find the "to" attribute instead of "href"
  test('route link attribute works', () => {
    createComponent({
      props: {
        name,
        slug
      }
    })
    const div = wrapper.find('.flexible-link')
    expect(div.attributes().to).toBe(slug)
  })

  test('no slug', () => {
    createComponent({
      props: {
        name,
        slug: null
      }
    })
    const div = wrapper.find('.flexible-link')
    expect(div.classes()).toContain('disabled')
  })

  test('tagClick emit', async () => {
    createComponent({
      props: {
        name,
        slug
      }
    })
    const div = wrapper.find('.flexible-link')
    await div.trigger('click')
    expect(wrapper.emitted()['tagClick']).toBeTruthy()
    expect(wrapper.emitted()['tagClick']).toEqual([[slug]])
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        name,
        slug
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
