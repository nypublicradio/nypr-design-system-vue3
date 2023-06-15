import { mount } from '@vue/test-utils'
import VCard from '../components/VCard.vue'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VCard', () => {

  let wrapper = {}

  const imageSrc = '329944'
  const title = "Title with some <em>HTML</em>"
  const link = 'https=//www.google.com'
  const subtitle = 'Subtitle'
  const blurb = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const width = 300
  const height = 200

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VCard, {
      props,
      global: {
        stubs: {
          'nuxt-link': true,
          'nuxt-img': true
        }
      },
      slots: {}
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
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        titleClass: "customClass"
      }
    })
    // can't figure out how to test the css of an element
    const _title = wrapper.find('.card-title-link')
    expect(_title.classes()).toContain('customClass')
  })

  test('is decrotive', () => {
    createComponent({
      props: {
        imageSrc,
        title,
        link,
        subtitle,
        blurb,
        width,
        height,
        isDecrotive: true
      }
    })
    // can't figure out how to test the css of an element
    const _img = wrapper.find('.v-card .card-image .image')
    expect(_img.attributes('alt')).toBe('')
  })


  test('it passes basic accessibility tests', async () => {
    const axeWrapper = mount(VCard)
    const results = await axe(axeWrapper.element)
    expect(results).toHaveNoViolations()
  })

})
