import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VTag from '../components/VTag'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VTag', () => {
  const name = 'news'
  const slug = 'news'
  // const radius = 10
  test('text prop works: null', () => {
    const wrapper = mount(VTag, {
      propsData: {
        name,
        slug,
        stubs: ['nuxt-link']
      }
    })
    // check if prop works
    const button = wrapper.find('.flexible-link .p-button .p-button-label')
    expect(button.text()).toBe(name)
  })

  // this is using nuxt-link, so we need to find the "to" attribute instead of "href"
  test('link attribute works', () => {
    const wrapper = mount(VTag, {
      propsData: {
        name,
        slug,
        stubs: ['nuxt-link']
      }
    })
    // check if prop works and rendered correctly
    const div = wrapper.find('.flexible-link')
    expect(div.attributes().to).toBe(slug)
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(VTag, {
      propsData: {
        name,
        slug,
        stubs: ['nuxt-link']
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
}) 
