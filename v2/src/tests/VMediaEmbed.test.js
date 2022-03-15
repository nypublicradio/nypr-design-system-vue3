import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VMediaEmbed from '../components/VMediaEmbed'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VMediaEmbed', () => {
  const url = 'https://player.vimeo.com/video/90283590'
  test('url prop works', () => {
    const wrapper = shallowMount(VMediaEmbed, {
      propsData: {
        url
      }
    })
    // check if prop works and iframe src is populating correctly
    const iframe = wrapper.findAll('iframe')
    expect(iframe[0].attributes('src')).toBe(url + '?controls=1&start=0&autoplay=0&mute=0')
  })

  test('No controls', () => {
    const wrapper = shallowMount(VMediaEmbed, {
      propsData: {
        url,
        controls: false
      }
    })
    // check if prop works and iframe src is populating correctly
    const iframe = wrapper.findAll('iframe')
    expect(iframe[0].attributes('src')).toBe(url + '?controls=0&start=0&autoplay=0&mute=0')
  })

  test('Auto Play', () => {
    const wrapper = shallowMount(VMediaEmbed, {
      propsData: {
        url,
        autoPlay: true
      }
    })
    // check if prop works and iframe src is populating correctly
    const iframe = wrapper.findAll('iframe')
    expect(iframe[0].attributes('src')).toBe(url + '?controls=1&start=0&autoplay=1&mute=0')
  })

  test('Muted', () => {
    const wrapper = shallowMount(VMediaEmbed, {
      propsData: {
        url,
        mute: true
      }
    })
    // check if prop works and iframe src is populating correctly
    const iframe = wrapper.findAll('iframe')
    expect(iframe[0].attributes('src')).toBe(url + '?controls=1&start=0&autoplay=0&mute=1')
  })

  test('Custom start position', () => {
    const wrapper = shallowMount(VMediaEmbed, {
      propsData: {
        url,
        startTime: "90"
      }
    })
    // check if prop works and iframe src is populating correctly
    const iframe = wrapper.findAll('iframe')
    expect(iframe[0].attributes('src')).toBe(url + '?controls=1&start=90&autoplay=0&mute=0')
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(VMediaEmbed, {
      propsData: { url }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
