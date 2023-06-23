import { mount } from '@vue/test-utils'
import VPersistentPlayer from '../components/VPersistentPlayer.vue'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'
import { mockBrowserWidth } from './helperFuncs.js'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VPersistentPlayer', () => {
  let originalWidth = 1366
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
  const canExpand = true
  const canExpandWithSwipe = true
  const canUnexpandWithSwipe = true
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

  test('show download button', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, showDownload
      }
    })
    const _downloadButton = wrapper.find('.player-download-icon')
    expect(_downloadButton.exists()).toBe(true)
  })

  test('show hideSkipMobile and download elements on mobile', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, showDownload, hideSkipMobile: false, hideDownloadMobile: false
      }
    })
    const _back15 = wrapper.find('.player-back-15-icon')
    const _ahead15 = wrapper.find('.player-ahead-15-icon')
    const _downloadButton = wrapper.find('.player-download-icon')
    expect(_downloadButton.classes()).not.toContain('hideOnMobile')
    expect(_ahead15.classes()).not.toContain('hideOnMobile')
    expect(_back15.classes()).not.toContain('hideOnMobile')
  })


  test('title & image & descriptionLink has a link', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, titleLink, descriptionLink
      }
    })
    const titleElm = wrapper.find('.track-info-title a')
    const imageLinkElm = wrapper.find('.track-info-image .track-info-image-link')
    const descriptionLinkElm = wrapper.find('.track-info-description .track-info-description-link')
    expect(titleElm.attributes('href')).toMatch(titleLink)
    expect(imageLinkElm.attributes('href')).toMatch(titleLink)
    expect(descriptionLinkElm.attributes('href')).toMatch(descriptionLink)
  })

  test('show loading indicator', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, isLoading
      }
    })
    const spinner = wrapper.find('.the-play-button .pi-spinner')
    expect(spinner.exists()).toBe(true)
  })

  test('show skip ahead and skip back buttons', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, showSkip
      }
    })
    const back = wrapper.find('.player-back-15-icon')
    const ahead = wrapper.find('.player-ahead-15-icon')
    expect(back.exists()).toBe(true)
    expect(ahead.exists()).toBe(true)
  })

  test('is in live stream mode', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, livestream
      }
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

  test('show minimize/un-minimize buttons & click them', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, canMinimize
      }
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

  test('hide minimize button', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, canMinimize: false
      }
    })
    const minimizeBtn = wrapper.find('.minimize-btn')
    const maximizeBtn = wrapper.find('.maximize-btn')
    expect(minimizeBtn.exists()).toBe(false)
    expect(maximizeBtn.exists()).toBe(false)
  })
  test('show expand/un-expand buttons & click them', async () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, canExpand
      }
    })
    const expandBtn = wrapper.find('.expand-btn')
    expect(expandBtn.exists()).toBe(true)

    expandBtn.trigger('click')
    await expect(wrapper.vm.isExpanded).toBe(true)
    const unExpandBtn = wrapper.find('.unexpand-btn')
    //expect(unExpandBtn.exists()).toBe(true)

    unExpandBtn.trigger('click')
    expect(wrapper.vm.isExpanded).toBe(false)
  })

  test('is muted & mute clicked', () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, file, isMuted
      }
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
    createComponent({
      props: {
        title, station, titleLink, image, description, file, autoPlay
      }
    })
    expect(wrapper.vm.playing).toBe(true)
  })

  test('emits', async () => {
    createComponent({
      props: {
        title, station, titleLink, image, description, descriptionLink, file, showDownload, canMinimize, canExpand, canExpandWithSwipe, canUnexpandWithSwipe
      }

    })
    const playBtn = wrapper.find('.play-button')
    const volumeBtn = wrapper.find('.volume-control-icon')
    const volumeSliderBtn = wrapper.find('.volume-control .p-slider-handle')
    const aheadBtn = wrapper.find('.player-controls .player-ahead-15-icon')
    const backBtn = wrapper.find('.player-controls .player-back-15-icon')
    const downloadBtn = wrapper.find('.player-controls .download-icon')
    const imageBtn = wrapper.find('.track-info-image-link')
    const descriptionBtn = wrapper.find('.track-info-description-link')
    const titleBtn = wrapper.find('.track-info-title-link')
    const minimizeBtn = wrapper.find('.minimize-btn')
    const expandBtn = wrapper.find('.expand-btn')

    await playBtn.trigger('click')
    expect(wrapper.emitted()['toggle-play']).toBeTruthy()

    // force currentFile var to be set so the volume button becomes enabled
    await wrapper.setProps({ currentFile: file })
    await wrapper.setProps({ currentSeconds: 10 })
    await wrapper.setProps({ livestream: false })

    await volumeBtn.trigger('click')
    expect(wrapper.emitted()['volume-toggle-mute']).toBeTruthy()

    await volumeSliderBtn.trigger('click')
    expect(wrapper.emitted()['volume-change']).toBeTruthy()

    await aheadBtn.trigger('click')
    expect(wrapper.emitted()['ahead-15']).toBeTruthy()
    await backBtn.trigger('click')
    expect(wrapper.emitted()['back-15']).toBeTruthy()

    downloadBtn.trigger('click')
    expect(wrapper.emitted()['download']).toBeTruthy()

    await imageBtn.trigger('click')
    expect(wrapper.emitted()['image-click']).toBeTruthy()

    await imageBtn.trigger('click')
    expect(wrapper.emitted()['image-click']).toBeTruthy()

    await descriptionBtn.trigger('click')
    expect(wrapper.emitted()['description-click']).toBeTruthy()

    await titleBtn.trigger('click')
    expect(wrapper.emitted()['title-click']).toBeTruthy()

    await minimizeBtn.trigger('click')
    expect(wrapper.emitted()['is-minimized']).toBeTruthy()

    await expandBtn.trigger('click')
    expect(wrapper.emitted()['is-expanded']).toBeTruthy()

    // TODO: not sure how to test swipe actions
    // await wrapper.trigger("mousedown")
    // await wrapper.trigger("mousemove", { clientY: 200 })
    // expect(wrapper.emitted()['swipe-up']).toBeTruthy()

    // await wrapper.trigger("mousedown")
    // await wrapper.trigger("mousemove", { clientY: -200 })
    // expect(wrapper.emitted()['swipe-down']).toBeTruthy()

    // TODO: having trouble with the progress slider tests
    // const timelineSliderBtn = wrapper.find('.track-info .progress-control .p-slider-handle')
    // await timelineSliderBtn.trigger("click")
    // await timelineSliderBtn.trigger("mousedown")
    // await timelineSliderBtn.trigger("mousemove", { clientX: 5 })
    // expect(wrapper.emitted()['scrub-timeline-change']).toBeTruthy()
    // await timelineSliderBtn.trigger("mouseup")
    // expect(wrapper.emitted()['scrub-timeline-end']).toBeTruthy()
    // expect(wrapper.emitted()['timeline-click']).toBeTruthy()

    // TODO: not sure how to mock the audio element to test the following emits
    // load-error, sounds-ended, sound-loaded, sound-looping



  })


})
