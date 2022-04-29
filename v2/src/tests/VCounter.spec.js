import { mount } from '@vue/test-utils'
const { toHaveNoViolations } = require('jest-axe')
import VCounter from '../components/VCounter.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VCounter', () => {
  let wrapper = {}
  const value = 10
  const icon = 'images'
  const text = 'Photos'
  const href = 'https://www.google.com'

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VCounter, {
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


  test('props work', () => {
    createComponent({
      props: {
        value,
        icon,
        text,
        href
      }
    })
    const iconElm = wrapper.find('.icon')
    const link = wrapper.find('.flexible-link')
    const iconSVG = wrapper.find('.flexible-link .pi')
    expect(iconElm.exists()).toBe(true)
    expect(wrapper.text()).toMatch(`${value} ${text}`)
    expect(link.attributes().href).toMatch(href)
    expect(iconSVG.attributes().class).toContain(`pi-${icon}`)
  })



  test('href(to) prop works with nuxt route', () => {
    createComponent({
      props: {
        value: value,
        icon: icon,
        text: text,
        href: '/news'
      }
    })
    const link = wrapper.find('.flexible-link')
    expect(link.attributes('to')).toBe('/news')
  })


  // test('it passes basic accessibility tests', async () => {
  //   // await createComponent({
  //   //   props: {
  //   //     value,
  //   //     icon,
  //   //     text,
  //   //     href
  //   //   }
  //   // })
  //   const wrapper = mount(VCounter)
  //   console.log('wrapper = ', wrapper.__app._instance)

  //   const html = wrapper.__app._instance


  //   const results = axe('<div>' + 'hello' + '</div>')
  //   expect(results).toHaveNoViolations()
  // })

})
