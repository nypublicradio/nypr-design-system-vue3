import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VShareTools from '../components/VShareTools'
import AudioIcon from '../../../assets-shared/icons/AudioIcon'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VShareTools', () => {
  const label = 'The Label'
  test('label prop works', () => {
    const wrapper = mount(VShareTools, {
      propsData: {
        label
      }
    })
    // check if prop works
    expect(wrapper.props().label).toBe(label)
    // check if it was rendered correctly
    const p = wrapper.find('.label')
    expect(p.text()).toContain('The Label')
  })

  test('slot works', () => {
    const wrapper = shallowMount(VShareTools, {
      slots: {
        default: AudioIcon
      }
    })
    // check if the component was successfully passed through the slot
    expect(wrapper.findComponent(AudioIcon).exists()).toBe(true)
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(VShareTools, {
      propsData: { label },
      slots: {
        default: AudioIcon
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
