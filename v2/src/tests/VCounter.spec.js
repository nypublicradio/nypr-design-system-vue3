import { mount } from '@vue/test-utils'
import VCounter from '../components/VCounter.vue'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VCounter', () => {
  let wrapper = {}
  const value = 10
  const icon = 'pi-camera'
  const text = 'Photossss'
  const href = 'https://www.google.com'

  const createComponent = ({ props = {}, slots = {} } = {}) => {
    wrapper = mount(VCounter, {
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

  test('default props work', () => {
    createComponent({
      props: {
        href,
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
    expect(iconSVG.attributes().class).toContain(icon)
  })

  test('custom text', () => {
    createComponent({
      props: {
        href,
        value,
        icon,
        text: "custom text",
        href,
      }
    })
    expect(wrapper.text()).toMatch(`${value} custom text`)
  })

  test('no text', () => {
    createComponent({
      props: {
        href,
        value,
        icon,
        text: null,
        href,
      }
    })
    expect(wrapper.text()).toMatch(`${value}`)
  })

  test('no icon', () => {
    createComponent({
      props: {
        href,
        value,
        icon,
        text,
        href,
        showIcon: false
      }
    })
    const iconElm = wrapper.find('.icon')
    expect(iconElm.exists()).toBe(false)
  })

  test('href(to) prop works with nuxt route', () => {
    createComponent({
      props: {
        value,
        icon,
        text,
        href: '/news'
      }
    })
    const link = wrapper.find('.flexible-link')
    expect(link.attributes('to')).toBe('/news')
  })

  test('custom icon class', () => {
    createComponent({
      props: {
        href,
        value,
        icon: 'pi-facebook',
        text,
        href,
      }
    })
    const iconElm = wrapper.find('.icon .pi')
    expect(iconElm.classes()).toContain('pi-facebook')
  })

  test('custom icon slot', () => {
    createComponent({
      props: {
        href,
        value,
        icon,
        text,
        href,
      },
      slots: { icon: '<div class="pi pi-twitter custom-icon"></div>' }
    })
    const iconElm = wrapper.find('.icon .custom-icon')
    expect(iconElm.classes()).toContain('pi-twitter')
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        value,
        icon,
        text,
        href
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

})
