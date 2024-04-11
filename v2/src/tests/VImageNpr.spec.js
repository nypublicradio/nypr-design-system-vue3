import VImageNpr from '../components/VImageNpr.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VImageNpr', () => {
  let wrapper = {}
  const provider = 'wagtail'
  const alt = ''
  const loading = 'lazy'
  const src = 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_wide-36aa32c7db11f0b773a9e5dfbb9d80581ea76f24.jpg?s={width}&c={quality}&f={format}'
  const srcSq = 'https://media.npr.org/assets/img/2024/04/09/ap24100143830851_sq-7b82fa6f41a1d3b3aa15bc9ca21a8212cca64ed6.jpg?s={width}&c={quality}&f={format}'
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

    wrapper = mount(VImageNpr, {
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

  test('the image has a link', () => {
    createComponent({
      props: {
        src,
        srcSq,
        to: 'https://www.google.com',
        width
      }
    })
    const _link = wrapper.find('.flexible-link')
    expect(_link.attributes('href')).toBe('https://www.google.com')
  })

  test('to have eager loading', () => {
    createComponent({
      props: {
        loading: 'eager',
        src,
        srcSq,
        width
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.attributes('loading')).toBe('eager')
  })


  test('is a vertical image effect', () => {
    createComponent({
      props: {
        allowVerticalEffect: true,
        maxHeight: 3484,
        maxWidth: 2598,
        src,
        width,
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.classes()).toContain('is-vertical')
  })

  test('enable enlarge', () => {
    createComponent({
      props: {
        allowPreview: true,
        src,
        srcSq,
        width,
      }
    })
    const _enlargeBtn = wrapper.find('.enlarge-button-holder')
    expect(_enlargeBtn.exists()).toBe(true)
  })

  test('aspect ratio', () => {
    createComponent({
      props: {
        ratio: [6, 2],
        src,
        srcSq,
        width,
      }
    })
    const _imgHolder = wrapper.find('.v-image-holder')
    expect(_imgHolder.attributes('style')).toContain('aspect-ratio: 6 / 2')
  })

  test('gallery button component slot', () => {
    createComponent({
      props: {
        src,
        srcSq,
        width,
      },
      slots: {
        gallery: '<button class="v-image-gallery"></button>'
      }
    })
    const _galleryButton = wrapper.find('.v-image-gallery')
    expect(_galleryButton.exists()).toBe(true)
  })

  test('caption button component slot', () => {
    createComponent({
      props: {
        src,
        srcSq,
        width,
      },
      slots: {
        caption: '<button class="v-image-caption"></button>'
      }
    })
    const _captionButtonComp = wrapper.find('.v-image-caption')
    expect(_captionButtonComp.exists()).toBe(true)
  })

  test('image click fires emit', () => {
    createComponent({
      props: {
        src,
        srcSq,
        to: 'https://www.google.com',
        width
      }

    })
    const link = wrapper.find('.flexible-link')
    link.trigger('click')

    expect(wrapper.emitted()['image-click']).toBeTruthy()
    expect(wrapper.emitted()['image-click']).toEqual([['https://www.google.com']])
  })

  test('image-enlarge-click fires emit', () => {
    createComponent({
      props: {
        allowPreview: true,
        src,
        srcSq,
        width,
      }

    })
    const enlargeBtn = wrapper.find('.enlarge-button')
    enlargeBtn.trigger('click')

    expect(wrapper.emitted()['image-enlarge-click']).toBeTruthy()
  })


  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        src,
        srcSq,
        width
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
