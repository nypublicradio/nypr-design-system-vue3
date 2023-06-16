import { mount } from '@vue/test-utils'
import VPersistentPlayer from '../components/VPersistentPlayer.vue'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'
import { mockBrowserWidth } from './helperFuncs.js'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VPersistentPlayer', () => {
  let wrapper = {}
  // all props once
  const title = 'The Takeaway'
  const station = 'WNYC 93.9 FM'
  const titleLink = 'http://www.google.com'
  const image = '329534'
  const description = 'This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.'
  const descriptionLink = 'http://www.google.com'
  const file = 'https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3'
  const showDownload = true
  const isLoading = true
  const showSkip = true
  const livestream = true
  const canMinimize = true
  const canExpand = false
  const canExpandWithSwipe = false
  const canUnexpandWithSwipe = false
  const isMuted = true
  const autoPlay = true
  const loop = true
  const hideSkipMobile = false
  const hideDownloadMobile = true

  const createComponent = ({ props = {}, slots = {} } = {}) => {
    wrapper = mount(VPersistentPlayer, {
      props,
      global: {
        plugins: [PrimeVue],
        stubs: {
          'nuxt-link': true,
        }
      },
      slots
    })
  }
  let originalWidth
  beforeEach(() => {
    originalWidth = window.innerWidth
  })
  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
    mockBrowserWidth(originalWidth)
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  test('it renders default props with image', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file
      }
    })

    const _image = wrapper.find('.v-image .image')
    const _title = wrapper.find('.track-info-title')
    const _description = wrapper.find('.track-info-description')

    expect(_image.attributes('src')).toBe('329534')
    expect(_title.text()).toMatch(title)
    expect(_description.text()).toContain(description)
  })

  // test('hide .hideOnMobile elements on mobile', () => {
  //   mockBrowserWidth(375)
  //   createComponent({
  //     props: {
  //       title, station, titleLink, image, description, file
  //     }
  //   })
  //   const hideOnMobile = wrapper.find('.hideOnMobile')
  //   expect(hideOnMobile.exists()).toBe(false)
  // })

  test('show download on mobile', () => {
    mockBrowserWidth(375)
    createComponent({
      props: {
        title, station, titleLink, image, description, file, showDownload, hideDownloadMobile: false
      }
    })

    const downloadBtn = wrapper.find('.player-download-icon')
    expect(downloadBtn.exists()).toBe(true)
  })

  /* test('title & image & descriptionLink has a link', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, titleLink, descriptionLink }
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
      props: { title, station, image, description, file, showDownload }
    })
    const downloadBtn = wrapper.find('.player-download-icon')
    expect(downloadBtn.exists()).toBe(true)
  })
 
  test('show loading indicator', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, isLoading }
    })
    const spinner = wrapper.find('.the-play-button .pi-spinner')
    expect(spinner.exists()).toBe(true)
  })
 
  test('show skip ahead and skip back buttons', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, showSkip }
    })
    const back = wrapper.find('.player-back-15-icon')
    const ahead = wrapper.find('.player-ahead-15-icon')
    expect(back.exists()).toBe(true)
    expect(ahead.exists()).toBe(true)
  })
 
  test('is in live stream mode', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, livestream }
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
 
  test('show minimize/maximize buttons & click them', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, canMinimize }
    })
    const minimizeBtn = wrapper.find('.minimize-btn')
    const maximizeBtn = wrapper.find('.maximize-btn')
    expect(minimizeBtn.exists()).toBe(true)
    expect(maximizeBtn.exists()).toBe(true)
 
    minimizeBtn.trigger('click')
    expect(wrapper.vm.isMinimized).toBe(true)
 
    maximizeBtn.trigger('click')
    expect(wrapper.vm.isMinimized).toBe(false)
 
  })
 
  test('hide minimize/maximize buttons', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, canMinimize: false }
    })
    const minimizeBtn = wrapper.find('.minimize-btn')
    const maximizeBtn = wrapper.find('.maximize-btn')
    expect(minimizeBtn.exists()).toBe(false)
    expect(maximizeBtn.exists()).toBe(false)
  })
 
  test('is muted & mute clicked', () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, isMuted }
    })
    const slider = wrapper.find('.volume-control .p-slider')
    const btn = wrapper.find('.volume-control .volume-control-icon')
    const icon = wrapper.find('.volume-control .volume-control-icon .pi')
    expect(slider.exists()).toBe(false)
    expect(icon.attributes().class).toContain('pi-volume-off')
 
    btn.trigger('click')
    expect(wrapper.vm.muted).toBe(true)
  })
 
  test('will auto play on load', async () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, autoPlay }
    })
    expect(wrapper.vm.playing).toBe(true)
  })
 
  test('show/hide skip buttons on mobile', async () => {
    const wrapper = mount(VPersistentPlayer, {
      props: { title, station, image, description, file, hideSkipMobile }
    })
 
    const back = wrapper.find('.player-back-15-icon')
    const ahead = wrapper.find('.player-ahead-15-icon')
 
    expect(back.attributes().class).not.toContain('hidden md:flex')
    expect(ahead.attributes().class).not.toContain('hidden md:flex')
 
    await wrapper.setProps({ hideSkipMobile: true })
    expect(back.attributes().class).toContain('hidden md:flex')
    expect(ahead.attributes().class).toContain('hidden md:flex')
  })
*/


})
