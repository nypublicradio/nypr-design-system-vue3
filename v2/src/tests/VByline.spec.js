import { mount } from '@vue/test-utils'
import VByline from '../components/VByline.vue'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VByline', () => {

  let wrapper = {}

  const authors = [
    {
      id: 121,
      firstName: "Jaclyn",
      lastName: "Jeffrey-Wilensky",
      name: "Jaclyn Jeffrey-Wilensky",
      photoID: 327474,
      jobTitle: "Data Reporter",
      biography: "Jaclyn writes data-driven health and science stories for WNYC/Gothamist. She also runs Gothamist's COVID data dashboards. She is an alumna of the Newmark Graduate School of Journalism. Her work has appeared in NBC News, Spectrum, the Daily Beast, and other outlets.",
      website: "",
      email: "",
      slug: "jaclyn-jeffrey-wilensky",
      url: 'http://www.google.com',
      organization: 'Gothamist',
      organizationUrl: 'http://www.gothamist.com',
      socialMediaProfile: []
    },
    {
      id: 146821,
      firstName: "Nsikan",
      lastName: "Akpan",
      name: "Nsikan Akpan",
      photoID: 327577,
      jobTitle: "Editor, Health & Science",
      biography: "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
      website: "",
      email: "",
      slug: "nsikan-akpan",
      url: 'http://www.google.com',
      organization: 'Gothamist',
      organizationUrl: 'http://www.gothamist.com',
      socialMediaProfile: [
        {
          service: "twitter",
          profileUrl: "https://twitter.com/MoNscience"
        }
      ]
    },
    {
      id: 146861,
      firstName: "Thomas",
      lastName: "Bono",
      name: "Thomas Bono",
      photoID: 327577,
      jobTitle: "Front End Developer",
      biography: "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
      website: "",
      email: "",
      slug: "thomas-bono",
      url: 'http://www.google.com',
      organization: null,
      organizationUrl: null,
      socialMediaProfile: [
        {
          service: "twitter",
          profileUrl: "https://twitter.com/bonomite"
        }
      ]
    }
  ]
  const prefix = 'By'

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VByline, {
      props,
      global: {
        stubs: {
          'nuxt-link': true,
          'nuxt-img': true
        }
      },
      slots: { images: '<div class="img">Image SLOT Mock</div>', belowNames: '<div class="below-names-content">belowNames SLOT Mock</div>', afterNames: '<div class="after-names-content">afterNames SLOT Mock</div>' }
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
  })

  test('authors default prop works', () => {
    createComponent({
      props: {
        authors,
        prefix
      }
    })
    expect(wrapper.text()).toContain(prefix)
    expect(wrapper.text()).toContain(authors[0].lastName)
    expect(wrapper.text()).toContain(authors[0].firstName)
    expect(wrapper.text()).toContain(authors[0].organization)
    const div = wrapper.findAll('.flexible-link')
    expect(div[0].attributes().to).toBe(authors[0].url)
    expect(div[1].attributes().to).toBe(authors[0].organizationUrl)
  })

  test('custom concat', () => {
    createComponent({
      props: {
        authors,
        prefix,
        concat: ": ",
        concatLast: " or ",
      }
    })
    expect(wrapper.text()).toContain(`:`)
    expect(wrapper.text()).toContain(`or Thomas Bono`)
  })

  test('Image Slot', () => {
    createComponent({
      props: {
        authors,
        prefix,
        showImage: true
      }

    })
    const img = wrapper.find('.img')
    const imageHolder = wrapper.find('.images-holder')
    expect(imageHolder.exists()).toBe(true)
    expect(img.exists()).toBe(true)
  })

  test('belowNames Slot', () => {
    createComponent({
      props: {
        authors,
        prefix
      }

    })
    const belowNamesContent = wrapper.find('.below-names-content')
    expect(belowNamesContent.exists()).toBe(true)
  })

  test('afterNames Slot', () => {
    createComponent({
      props: {
        authors,
        prefix
      }

    })
    const afterNamesContent = wrapper.find('.after-names-content')
    expect(afterNamesContent.exists()).toBe(true)
  })

  test('it passes basic accessibility tests', async () => {
    const axeWrapper = mount(VByline)
    const results = await axe(axeWrapper.element)
    expect(results).toHaveNoViolations()
  })
})
