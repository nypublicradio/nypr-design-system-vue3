import { mount } from '@vue/test-utils'
import VImagePublisher from '../components/VImagePublisher.vue'
import PrimeVue from 'primevue/config'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VImagePublisher', () => {
  let wrapper = {}
  const alt = ''
  const loading = 'lazy'
  const src = 'https://media.wnyc.org/i/%s/%s/%s/%s/2023/06/JuneteenthJeremyDaniel.jpg'
  const width = 600
  const height = 400
  const maxWidth = Infinity
  const maxHeight = Infinity
  const sizes = ''
  const quality = 80
  const allowVerticalEffect = false
  const verticalBgColor = '#f1f1f1'
  const verticalBgColorOpacity = '0.6'
  const verticalBgBlur = '3px'
  const allowPreview = false
  const ratio = [3, 2]
  const to = 'https://www.google.com'
  const isDecorative = false

  const createComponent = ({ props = {}, slots = {} } = {}) => {

    wrapper = mount(VImagePublisher, {
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
        src,
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
    const _enlargeBtn = wrapper.find('.enlarge-button')
    expect(_enlargeBtn.exists()).toBe(true)
  })

  test('aspect ratio', () => {
    createComponent({
      props: {
        src,
        width,
        height,
        ratio: [6, 2],
      }
    })
    const _imgHolder = wrapper.find('.v-image-publisher-holder')
    expect(_imgHolder.attributes('style')).toContain('aspect-ratio: 6 / 2')
  })

  test('gallery button component slot', () => {
    createComponent({
      props: {
        src,
        width,
        height,
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
        width,
        height,
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
        width,
        height,
        to: 'https://www.google.com'
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
        src,
        width,
        height,
        allowPreview: true,
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
        width,
        height
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
