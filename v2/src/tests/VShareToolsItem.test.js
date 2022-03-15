import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect, jest } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VShareToolsItem from '../components/VShareToolsItem'
import FacebookIcon from '../../../assets-shared/icons/FacebookIcon'
import InstagramIcon from '../../../assets-shared/icons/InstagramIcon'
import SpotifyIcon from '../../../assets-shared/icons/SpotifyIcon'
import RedditIcon from '../../../assets-shared/icons/RedditIcon'
import TwitterIcon from '../../../assets-shared/icons/TwitterIcon'
import YoutubeIcon from '../../../assets-shared/icons/YoutubeIcon'
import EmailIcon from '../../../assets-shared/icons/EmailIcon'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VShareToolsItem', () => {
  const label = 'follow us'
  const username = 'WNYC'
  const link = 'http://www.test.com'
  const windowName = 'share window'
  const windowString = 'location=no,toolbar=no,menubar=no,scrollbars=no,status=no,width=550,height=600,top=NaN,left=NaN'
  test('username attribute works', () => {
    const service = 'facebook'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if prop works and rendered correctly
    expect(wrapper.attributes('href')).toBe(`https://www.facebook.com/${username}`)
  })

  test('label attribute works', () => {
    const service = 'facebook'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        label,
        username,
        service
      }
    })
    // check if prop works and rendered correctly
    expect(wrapper.attributes('aria-label')).toBe(label)
  })

  test('aria-label has a default value', () => {
    const service = 'facebook'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if prop works and rendered correctly
    expect(wrapper.attributes('aria-label')).toBe(`Follow us on ${service}`)
  })

  test('service prop works: site', () => {
    const service = 'site'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        service,
        label,
        link
      }
    })
    // check if the corresponding component was successfully created
    const linkTag = wrapper.find('.c-share-tools__link')
    const span = wrapper.find('.site span')
    const spanExists = span.exists()
    expect(spanExists).toBe(true)
    expect(span.text()).toContain(label)
    expect(linkTag.attributes('href')).toBe(link)
  })

  test('service prop works: facebook', () => {
    const service = 'facebook'
    const wrapper = mount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if the corresponding component was successfully created
    setTimeout(() => {
      // expect(wrapper.html()).toContain('Loading Component')
      expect(wrapper.findComponent(FacebookIcon).exists()).toBe(true)
      expect(wrapper.attributes().href).toBe('https://www.facebook.com/WNYC')
    }, 35)
  })

  test('service prop works: instagram', () => {
    const service = 'instagram'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if the corresponding component was successfully created
    setTimeout(() => {
      expect(wrapper.findComponent(InstagramIcon).exists()).toBe(true)
      expect(wrapper.attributes().href).toBe('https://www.instagram.com/WNYC')
    }, 35)
  })

  test('service prop works: spotify', () => {
    const service = 'spotify'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if the corresponding component was successfully created
    setTimeout(() => {
      expect(wrapper.findComponent(SpotifyIcon).exists()).toBe(true)
      expect(wrapper.attributes().href).toBe('https://open.spotify.com/playlist/WNYC')

    }, 35)
  })

  test('service prop works: twitter', () => {
    const service = 'twitter'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if the corresponding component was successfully created
    setTimeout(() => {
      expect(wrapper.findComponent(TwitterIcon).exists()).toBe(true)
      expect(wrapper.attributes().href).toBe('https://twitter.com/WNYC')

    }, 35)
  })

  test('service prop works: youtube', () => {
    const service = 'youtube'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        username,
        service
      }
    })
    // check if the corresponding component was successfully created
    setTimeout(() => {

      expect(wrapper.findComponent(YoutubeIcon).exists()).toBe(true)
      expect(wrapper.attributes().href).toBe('https://www.youtube.com/channel/WNYC')
    }, 35)
  })

  it('service prop works: email', () => {
    const service = 'email'
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        service,
        username: 'test@test.com'
      }
    })
    // check if the corresponding component was successfully created
    setTimeout(() => {

      expect(wrapper.findComponent(EmailIcon).exists()).toBe(true)
      expect(wrapper.attributes().href).toBe('mailto:test@test.com')
    }, 35)
  })

  test('link prop works with no service prop', () => {
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        link
      }
    })
    // check if the link was successfully created
    expect(wrapper.attributes().href).toBe(link)
    expect(wrapper.vm.socialLink).toBe('')
  })

  test('sharing works: facebook', () => {
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        action: 'share',
        service: 'facebook',
        url: 'http://example.com'
      }
    })
    global.open = jest.fn()
    setTimeout(() => {

      wrapper.findComponent(FacebookIcon).trigger('click')
      expect(global.open).toBeCalledWith('https://www.facebook.com/sharer.php?u=http%3A%2F%2Fexample.com', windowName, windowString)
    }, 35)
  })

  test('sharing works: twitter', () => {
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        action: 'share',
        service: 'twitter',
        url: 'http://example.com',
        'share-parameters': { text: 'Title', via: 'NYPR' }
      }
    })
    global.open = jest.fn()
    setTimeout(() => {

      wrapper.findComponent(TwitterIcon).trigger('click')
      expect(global.open).toBeCalledWith('https://twitter.com/intent/tweet?url=http%3A%2F%2Fexample.com&text=Title&via=NYPR', windowName, windowString)
    }, 35)
  })

  test('sharing works: reddit', () => {
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        action: 'share',
        service: 'reddit',
        url: 'http://example.com',
        'share-parameters': { title: 'Title' }
      }
    })
    global.open = jest.fn()
    setTimeout(() => {

      wrapper.findComponent(RedditIcon).trigger('click')
      expect(global.open).toBeCalledWith('https://www.reddit.com/submit?url=http%3A%2F%2Fexample.com&title=Title', windowName, windowString)
    }, 35)
  })

  test('sharing works: email', () => {
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        action: 'share',
        service: 'email',
        url: 'http://example.com',
        'share-parameters': { body: 'Title - %URL%' }
      }
    })
    global.open = jest.fn()
    setTimeout(() => {

      wrapper.findComponent(EmailIcon).trigger('click')
      expect(global.open).toBeCalledWith('mailto:?body=Title%20-%20http%3A%2F%2Fexample.com', windowName, windowString)
    }, 35)
  })

  test('utm params works', () => {
    const wrapper = shallowMount(VShareToolsItem, {
      propsData: {
        action: 'share',
        service: 'facebook',
        url: 'http://example.com',
        'utm-parameters': { medium: 'social', source: 'facebook', campaign: 'shared_facebook' }
      }
    })
    global.open = jest.fn()
    setTimeout(() => {

      wrapper.findComponent(FacebookIcon).trigger('click')
      expect(global.open).toBeCalledWith('https://www.facebook.com/sharer.php?u=http%3A%2F%2Fexample.com%3Futm_medium%3Dsocial%26utm_source%3Dfacebook%26utm_campaign%3Dshared_facebook', windowName, windowString)
    }, 35)
  })

  test('it passes basic accessibility tests', () => {
    const service = 'facebook'
    const wrapper = mount(VShareToolsItem, {
      propsData: {
        username,
        service,
        label
      }
    })
    setTimeout(() => {

      const results = axe(wrapper.element)
      expect(results).toHaveNoViolations()
    }, 35)
  })
})
