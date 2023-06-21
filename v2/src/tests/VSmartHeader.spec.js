import { mount } from '@vue/test-utils'
import VSmartHeader from '../components/VSmartHeader.vue'
import PrimeVue from 'primevue/config'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VSmartHeader', () => {
  let wrapper = {}
  const targetWindowClass = null
  const heroBuffer = 400
  const resumeDelay = 3

  const createComponent = ({ props = {}, slots = {} } = {}) => {

    wrapper = mount(VSmartHeader, {
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

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        targetWindowClass,
        heroBuffer,
        resumeDelay
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
