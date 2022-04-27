import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect, jest } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VPersistentPlayer from '../../components/VPersistentPlayer'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

// need to mock the IntersectionObserver I am using for detecting when entering the viewport
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('VPersistentPlayer', () => {
  // all props once
  const title = 'The Takeaway'
  const station = 'WNYC 93.9 FM'
  const titleLink = 'http://www.google.com'
  const image = 'https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/'
  const description = 'This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.'
  const descriptionLink = 'http://www.google.com'
  const file = 'https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3'
  const showDownload = true
  const isLoading = true
  const showSkip = true
  const livestream = true
  const canMinimize = true
  const isMuted = true
  const autoPlay = true
  const loop = true
  const hideSkipMobile = false
  const hideDownloadMobile = false

  test('it renders base props', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file }
    })
    const imageElm = wrapper.find('.simple-responsive-image-holder .image')
    const titleElm = wrapper.find('.track-info-title')
    const descriptionElm = wrapper.find('.track-info-description')

    expect(imageElm.attributes('src')).toBe('https://cms.prod.nypr.digital/images/329534/fill-84x84|format-jpeg|jpegquality-80/')
    expect(titleElm.text()).toMatch(title)
    expect(descriptionElm.text()).toContain(description)
  })

  test('title & image & descriptionLink has a link', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, titleLink, descriptionLink }
    })
    const titleElm = wrapper.find('.track-info-title a')
    const imageLinkElm = wrapper.find('.image-with-caption-image .image-with-caption-image-link')
    const descriptionLinkElm = wrapper.find('.track-info-description .track-info-description-link')
    expect(titleElm.attributes('href')).toMatch(titleLink)
    expect(imageLinkElm.attributes('href')).toMatch(titleLink)
    expect(descriptionLinkElm.attributes('href')).toMatch(descriptionLink)
  })

  test('show download button', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, showDownload }
    })
    const downloadBtn = wrapper.find('.player-download-icon')
    expect(downloadBtn.exists()).toBe(true)
  })

  test('show loading indicator', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, isLoading }
    })
    const spinner = wrapper.find('.the-play-button .pi-spinner')
    expect(spinner.exists()).toBe(true)
  })

  test('show skip ahead and skip back buttons', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, showSkip }
    })
    const back = wrapper.find('.player-back-15-icon')
    const ahead = wrapper.find('.player-ahead-15-icon')
    expect(back.exists()).toBe(true)
    expect(ahead.exists()).toBe(true)
  })

  test('is in live stream mode', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, livestream }
    })
    const back = wrapper.find('.player-back-15-icon')
    const ahead = wrapper.find('.player-ahead-15-icon')
    const volume = wrapper.find('.volume-control')
    const play = wrapper.find('.the-play-button')
    const downloadBtn = wrapper.find('.player-download-icon')
    expect(back.exists()).toBe(false)
    expect(ahead.exists()).toBe(false)
    expect(downloadBtn.exists()).toBe(false)
    expect(volume.exists()).toBe(true)
    expect(play.exists()).toBe(true)
  })

  test('show minimize button', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, canMinimize }
    })
    const minimizeBtn = wrapper.find('.minimize-btn')
    expect(minimizeBtn.exists()).toBe(true)
  })

  test('is muted', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, isMuted }
    })
    const slider = wrapper.find('.volume-control .p-slider')
    const icon = wrapper.find('.volume-control .volume-control-icon .pi')
    expect(slider.exists()).toBe(false)
    expect(icon.attributes().class).toContain('pi-volume-off')
  })

  test('will auto play on load', async () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, autoPlay }
    })
    expect(wrapper.vm.playing).toBe(true)
  })

  test('show/hide skip buttons on mobile', async () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, hideSkipMobile }
    })

    const back = wrapper.find('.player-back-15-icon')
    const ahead = wrapper.find('.player-ahead-15-icon')

    expect(back.attributes().class).not.toContain('hidden md:flex')
    expect(ahead.attributes().class).not.toContain('hidden md:flex')

    await wrapper.setProps({ hideSkipMobile: true })
    expect(back.attributes().class).toContain('hidden md:flex')
    expect(ahead.attributes().class).toContain('hidden md:flex')
  })

  test('show/hide download button on mobile', async () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, showDownload, hideDownloadMobile }
    })

    const downloadBtn = wrapper.find('.player-download-icon')

    expect(downloadBtn.attributes().class).not.toContain('hidden md:flex')

    await wrapper.setProps({ hideDownloadMobile: true })
    expect(downloadBtn.attributes().class).toContain('hidden md:flex')
  })

})
