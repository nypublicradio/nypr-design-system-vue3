import VSmartHeader from '../components/VSmartHeader.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VSmartHeader', () => {
  let wrapper = {}
  const targetWindowClass = null
  const heroBuffer = 400
  const resumeDelay = 3

  const createComponent = ({ props = {}, slots = {} } = {}) => {

    wrapper = mount(VSmartHeader, {
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

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        heroBuffer,
        resumeDelay,
        targetWindowClass
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
