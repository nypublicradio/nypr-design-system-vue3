import { mount } from '@vue/test-utils'
import VImage from '../components/VImage.vue'
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
