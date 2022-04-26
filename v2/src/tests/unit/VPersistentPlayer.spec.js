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
  const autoPlay = true
  const showDownload = true
  const isLoading = true
  const livestream = true
  const shouldShowCta = true
  const hideDownloadMobile = true
  const showSkip = true
  const hideSkipMobile = true
  const loop = true
  const isMuted = true
  const canMinimize = true

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

  test('title & image has a link', () => {
    const wrapper = mount(VPersistentPlayer, {
      propsData: { title, station, image, description, file, titleLink }
    })
    const titleElm = wrapper.find('.track-info-title a')
    const imageLinkElm = wrapper.find('.image-with-caption-image .image-with-caption-image-link')
    expect(titleElm.attributes('href')).toMatch(titleLink)
    expect(imageLinkElm.attributes('href')).toMatch(titleLink)
  })


})
