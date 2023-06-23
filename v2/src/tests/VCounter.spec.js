import VCounter from '../components/VCounter.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VCounter', () => {
  let wrapper = {}
  const value = 10
  const icon = 'pi-camera'
  const text = 'Photossss'
  const href = 'https://www.google.com'

  const createComponent = ({ props = {}, slots = {} } = {}) => {
    wrapper = mount(VCounter, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          'nuxt-link': true,
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

  test('default props work', () => {
    createComponent({
      props: {
        href,
        href,
        icon,
        text,
        value
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
        href,
        icon,
        text: "custom text",
        value,
      }
    })
    expect(wrapper.text()).toMatch(`${value} custom text`)
  })

  test('no text', () => {
    createComponent({
      props: {
        href,
        href,
        icon,
        text: null,
        value,
      }
    })
    expect(wrapper.text()).toMatch(`${value}`)
  })

  test('no icon', () => {
    createComponent({
      props: {
        href,
        href,
        icon,
        showIcon: false,
        text,
        value
      }
    })
    const iconElm = wrapper.find('.icon')
    expect(iconElm.exists()).toBe(false)
  })

  test('href(to) prop works with nuxt route', () => {
    createComponent({
      props: {
        href: '/news',
        icon,
        text,
        value
      }
    })
    const link = wrapper.find('.flexible-link')
    expect(link.attributes('to')).toBe('/news')
  })

  test('custom icon class', () => {
    createComponent({
      props: {
        href,
        href,
        icon: 'pi-facebook',
        text,
        value,
      }
    })
    const iconElm = wrapper.find('.icon .pi')
    expect(iconElm.classes()).toContain('pi-facebook')
  })

  test('custom icon slot', () => {
    createComponent({
      props: {
        href,
        href,
        icon,
        text,
        value,
      },
      slots: { icon: '<div class="pi pi-twitter custom-icon"></div>' }
    })
    const iconElm = wrapper.find('.icon .custom-icon')
    expect(iconElm.classes()).toContain('pi-twitter')
  })

  test('counter click fires emit', async () => {
    createComponent({
      props: {
        href,
        href,
        icon,
        text,
        value,
      }
    })
    const link = wrapper.find('.counter')
    link.trigger('click')

    expect(wrapper.emitted()['counter-click']).toBeTruthy()
    expect(wrapper.emitted()['counter-click']).toEqual([[{ text: `${value} ${text}`, url: `${href}` }]])
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        href,
        icon,
        text,
        value
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

})
