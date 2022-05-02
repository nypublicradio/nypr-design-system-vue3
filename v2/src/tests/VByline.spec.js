import { mount } from '@vue/test-utils'
import VByline from '../components/VByline.vue'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VByline', () => {

  let wrapper = {}
  const authors = [
    {
      firstName: 'Shumita',
      lastName: 'Basu',
      url: 'http://www.google.com',
      organization: 'WNYC',
      organizationUrl: 'http://www.wnyc.org'
    }
  ]
  const prefix = 'By'

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VByline, {
      props,
      global: {
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

  test('authors prop works', () => {
    createComponent({
      props: {
        authors,
        prefix
      }
    })
    expect(wrapper.text()).toContain(authors[0].lastName)
    expect(wrapper.text()).toContain(authors[0].firstName)
    expect(wrapper.text()).toContain(authors[0].organization)
    const div = wrapper.findAll('.flexible-link')
    expect(div[0].attributes().to).toBe(authors[0].url)
    expect(div[1].attributes().to).toBe(authors[0].organizationUrl)
  })

  test('it passes basic accessibility tests', async () => {
    const axeWrapper = mount(VByline)
    const results = await axe(axeWrapper.element)
    expect(results).toHaveNoViolations()
  })
})
