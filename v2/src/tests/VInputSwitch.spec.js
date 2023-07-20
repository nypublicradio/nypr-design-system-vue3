import VInputSwitch from '../components/VInputSwitch.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VInputSwitch', () => {
  let wrapper = {}

  const yes = 'AWESOME'
  const no = 'NOPE'
  // const radius = 10

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VInputSwitch, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          //'nuxt-link': true
        }
      },
      props
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
  })

  test('custom YES/NO text props work', () => {
    createComponent({
      props: {
        no,
        yes,
      }
    })
    const yesText = wrapper.find('.v-input-switch .options .yes')
    const noText = wrapper.find('.v-input-switch .options .no')
    expect(yesText.text()).toBe(yes)
    expect(noText.text()).toBe(no)
  })

  test('emits', async () => {
    createComponent({
      props: {

      }

    })
    const switchButton = wrapper.find('.v-input-switch .p-inputswitch')


    await switchButton.trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
    expect(wrapper.emitted()['update:data']).toBeTruthy()
    expect(wrapper.emitted()['change']).toBeTruthy()
    expect(wrapper.emitted()['input']).toBeTruthy()
    expect(wrapper.emitted()['update:data']).toEqual([[true]])
  })

  test('static width class exists', () => {
    createComponent({
      props: {
        staticWidth: true,
      }
    })
    const root = wrapper.find('.v-input-switch')
    expect(root.attributes().class).toContain('static-width')
  })


  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        no,
        yes
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
