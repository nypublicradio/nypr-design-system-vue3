import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VCounter from '../components/VCounter'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VCounter', () => {
  const value = 10
  const icon = 'gallery'
  const text = 'Photos'
  const href = 'https://www.google.com'
  test('icon prop works', () => {
    const wrapper = shallowMount(VCounter, {
      propsData: {
        value,
        icon,
        text,
        href,
        stubs: ['nuxt-link']
      }
    })
    // check if prop works
    const div = wrapper.find('.icon')
    expect(div.exists()).toBe(true)
  })

  test('text prop works', () => {
    const wrapper = shallowMount(VCounter, {
      propsData: {
        value,
        icon,
        text,
        href
      },
      stubs: ['nuxt-link']
    })
    // check if prop works
    expect(wrapper.text()).toContain(text)
  })

  test('href prop works', () => {
    const wrapper = shallowMount(VCounter, {
      propsData: {
        value,
        icon,
        text,
        href
      },
      stubs: ['nuxt-link']
    })
    // check if prop works
    const div = wrapper.find('.counter')
    expect(div.attributes('to')).toBe(href)
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(VCounter, {
      propsData: {
        value,
        icon,
        text,
        href
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
