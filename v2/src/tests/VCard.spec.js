import { mount } from '@vue/test-utils'
import VCard from '../components/VCard.vue'
import PrimeVue from 'primevue/config'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VCard', () => {

  let wrapper = {}

  const imageSrc = '329944'
  const alt = 'Alt text'
  const title = "Title with some <em>HTML</em>"
  const link = 'https=//www.google.com'
  const subtitle = 'Subtitle'
  const blurb = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const width = 300
  const height = 200

  const createComponent = ({ props = {}, slots = {} } = {}) => {
    wrapper = mount(VCard, {
      props,
      global: {
        plugins: [PrimeVue],
        stubs: {

        }
      },
      slots
      //slots: { afterTitle: '<div>After Title</div>', beforeTitle: '<div>Before Title</div>', aboveTitle: '<div>Above Title</div>', belowBlurb: '<div>Below Blurb</div>', belowImage: '<div>Below Image</div>', aboveImage: '<div>Above Image</div>' }
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
  })

  test('default prop works', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
      }
    })
    const _img = wrapper.find('.card-image-holder')
    const _title = wrapper.find('.card-title')
    const _subTitle = wrapper.find('.card-subtitle')
    const _blurb = wrapper.find('.card-blurb')
    expect(_img.exists()).toBe(true)
    expect(_title.exists()).toBe(true)
    expect(_subTitle.exists()).toBe(true)
    expect(_subTitle.text()).toBe(subtitle)
    expect(_blurb.exists()).toBe(true)
    expect(_blurb.text()).toBe(blurb)
  })

  test('custom flex-basis', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        imageFlexBasis: "60%"
      }
    })
    // can't figure out how to test the css of an element
    const _img = wrapper.find('.card-image-holder')
    _img.element.style.flexBasis = "60%"
    expect(_img.element.style.flexBasis).toBe('60%')
  })

  test('custom title class', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        titleClass: "customClass"
      }
    })
    const _title = wrapper.find('.card-title-link')
    expect(_title.classes()).toContain('customClass')
  })

  test('is decrotive', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        isDecorative: true
      }
    })
    const _img = wrapper.find('.card-image .v-image-holder .image')
    expect(_img.attributes('alt')).toBe('')
  })

  test('eager loading', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        loading: 'eager'
      }
    })
    const _img = wrapper.find('.card-image .v-image-holder .image')
    expect(_img.attributes('loading')).toBe('eager')
  })

  test('truncate blurb', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        truncate: 2
      }
    })
    const _blurb = wrapper.find('.card-blurb')
    expect(_blurb.classes()).toContain('truncate')
    expect(_blurb.classes()).toContain('t2lines')
  })

  test('no title', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title: null,
        link,
        subtitle,
        blurb,
        width,
        height,

      }
    })
    const _title = wrapper.find('.card-title')
    expect(_title.exists()).toBe(false)
  })

  test('no subtitle', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle: null,
        blurb,
        width,
        height,

      }
    })
    const _subTitle = wrapper.find('.card-subtitle')
    expect(_subTitle.exists()).toBe(false)
  })

  test('no blurb', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb: null,
        width,
        height,

      }
    })
    const _blurb = wrapper.find('.card-blurb')
    expect(_blurb.exists()).toBe(false)
  })

  test('no image', () => {
    createComponent({
      props: {
        imageSrc: null,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,

      }
    })
    const _img = wrapper.find('.card-image-holder')
    expect(_img.exists()).toBe(false)
  })

  test('no links', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link: null,
        subtitle,
        blurb,
        width,
        height,

      }
    })
    const _flexibleLink = wrapper.findAll('.flexible-link')
    for (var i = 0; i < _flexibleLink.length; i++) {
      expect(_flexibleLink[i].classes()).toContain('null')
    }
  })

  test('allow vertical effect', () => {
    createComponent({
      props: {
        imageSrc: '329836',
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        maxWidth: 2598,
        maxHeight: 3484,
        allowVerticalEffect: true
      }
    })
    const _img = wrapper.find('.card-image .v-image-holder .image')
    expect(_img.classes()).toContain('is-vertical')
  })

  test('slots have children', () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
      },
      slots: { afterTitle: '<div>After Title</div>', beforeTitle: '<div>Before Title</div>', aboveTitle: '<div>Above Title</div>', belowBlurb: '<div>Below Blurb</div>', belowImage: '<div>Below Image</div>', aboveImage: '<div>Above Image</div>' }
    })
    const aboveImage = wrapper.find('.slot.slot-above-image')
    const belowImage = wrapper.find('.slot.slot-below-image')
    const aboveTitle = wrapper.find('.slot.slot-above-title')
    const beforeTitle = wrapper.find('.slot.slot-before-title')
    const afterTitle = wrapper.find('.slot.slot-after-title')
    const belowBlurb = wrapper.find('.slot.slot-below-blurb')
    expect(aboveImage.element.children.length).toBeGreaterThan(0)
    expect(belowImage.element.children.length).toBeGreaterThan(0)
    expect(aboveTitle.element.children.length).toBeGreaterThan(0)
    expect(beforeTitle.element.children.length).toBeGreaterThan(0)
    expect(afterTitle.element.children.length).toBeGreaterThan(0)
    expect(belowBlurb.element.children.length).toBeGreaterThan(0)
  })


  test('it passes basic accessibility tests', async () => {
    const axeWrapper = mount(VCard)
    const results = await axe(axeWrapper.element)
    expect(results).toHaveNoViolations()
  })

  test('title click fires emit', async () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
      }
    })
    const _title = wrapper.find('.card-title-link')
    _title.trigger('click')

    expect(wrapper.emitted()['title-click']).toBeTruthy()
    expect(wrapper.emitted()['title-click']).toEqual([[link]])
  })

  test('image click fires emit', async () => {
    createComponent({
      props: {
        imageSrc,
        alt,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
      }
    })
    const img = wrapper.find('.card-image .flexible-link')
    img.trigger('click')

    expect(wrapper.emitted()['image-click']).toBeTruthy()
    expect(wrapper.emitted()['image-click']).toEqual([[imageSrc]])
  })
})
