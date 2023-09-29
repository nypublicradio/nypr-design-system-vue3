import VImageWagtail from '../components/VImageWagtail.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VImageWagtail', () => {
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

    wrapper = mount(VImageWagtail, {
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
        height,
        src,
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
        height,
        loading: 'eager',
        src,
        width
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.attributes('loading')).toBe('eager')
  })

  test('use local image', () => {
    createComponent({
      props: {
        height,
        src: 'default-userEvent.jpg',
        width
      }
    })
    const _img = wrapper.find('.image')
    expect(_img.attributes('src')).toBe('default-userEvent.jpg')
  })

  test('is a vertical image effect', () => {
    createComponent({
      props: {
        allowVerticalEffect: true,
        height,
        maxHeight: 3484,
        maxWidth: 2598,
        src: 329836,
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
        height,
        src,
        width,
      }
    })
    const _enlargeBtn = wrapper.find('.enlarge-button-holder')
    expect(_enlargeBtn.exists()).toBe(true)
  })

  test('aspect ratio', () => {
    createComponent({
      props: {
        height,
        ratio: [6, 2],
        src,
        width,
      }
    })
    const _imgHolder = wrapper.find('.v-image-holder')
    expect(_imgHolder.attributes('style')).toContain('aspect-ratio: 6 / 2')
  })

  test('gallery button component slot', () => {
    createComponent({
      props: {
        height,
        src,
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
        height,
        src,
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
        height,
        src,
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
        height,
        src,
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
        height,
        src,
        width
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
