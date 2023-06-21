import { mount } from '@vue/test-utils'
import VImage from '../components/VImage.vue'
import PrimeVue from 'primevue/config'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VImage', () => {
  let wrapper = {}
  const provider = 'wagtail'
  const alt = ''
  const loading = 'lazy'
  const src = 329944
  const width = 600
  const height = 400
  const maxWidth = Infinity
  const maxHeight = Infinity
  const sizes = ''
  const density = 'x1 x2'
  const quality = 80
  const modifiers = null
  const allowVerticalEffect = false
  const verticalBgColor = '#f1f1f1'
  const verticalBgColorOpacity = '0.6'
  const verticalBgBlur = '3px'
  const allowPreview = false
  const ratio = [3, 2]
  const to = null
  const isDecorative = false

  const createComponent = ({ props = {}, slots = {} } = {}) => {

    wrapper = mount(VImage, {
      props,
      global: {
        plugins: [PrimeVue],
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

  test('the image has a link', () => {
    createComponent({
      props: {
        src,
        width,
        height,
        to: 'https://www.google.com'
      }
    })
    const _link = wrapper.find('.flexible-link')
    expect(_link.attributes('href')).toBe('https://www.google.com')
  })

  test('to have eager loading', () => {
    createComponent({
      props: {
        src,
        width,
        height,
        loading: 'eager'
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.attributes('loading')).toBe('eager')
  })

  test('use local image', () => {
    createComponent({
      props: {
        src: 'default-userEvent.jpg',
        width,
        height
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.attributes('src')).toBe('default-userEvent.jpg')
  })

  test('is a vertical image effect', () => {
    createComponent({
      props: {
        src: 329836,
        width,
        height,
        maxWidth: 2598,
        maxHeight: 3484,
        allowVerticalEffect: true,
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.classes()).toContain('is-vertical')
  })

  test('enable enlarge', () => {
    createComponent({
      props: {
        src,
        width,
        height,
        allowPreview: true,
      }
    })
    const _enlargeBtn = wrapper.find('.enlarge-button-holder')
    expect(_enlargeBtn.exists()).toBe(true)
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        src,
        width,
        height
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
