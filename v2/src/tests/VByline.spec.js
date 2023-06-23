import VByline from '../components/VByline.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VByline', () => {

  let wrapper = {}

  const authors = [
    {
      biography: "Jaclyn writes data-driven health and science stories for WNYC/Gothamist. She also runs Gothamist's COVID data dashboards. She is an alumna of the Newmark Graduate School of Journalism. Her work has appeared in NBC News, Spectrum, the Daily Beast, and other outlets.",
      email: "",
      firstName: "Jaclyn",
      id: 121,
      jobTitle: "Data Reporter",
      lastName: "Jeffrey-Wilensky",
      name: "Jaclyn Jeffrey-Wilensky",
      organization: 'Gothamist',
      organizationUrl: 'http://www.gothamist.com',
      photoID: 327474,
      slug: "jaclyn-jeffrey-wilensky",
      socialMediaProfile: [],
      url: 'http://www.google.com',
      website: ""
    },
    {
      biography: "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
      email: "",
      firstName: "Nsikan",
      id: 146821,
      jobTitle: "Editor, Health & Science",
      lastName: "Akpan",
      name: "Nsikan Akpan",
      organization: 'Gothamist',
      organizationUrl: 'http://www.gothamist.com',
      photoID: 327577,
      slug: "nsikan-akpan",
      socialMediaProfile: [
        {
          profileUrl: "https://twitter.com/MoNscience",
          service: "twitter"
        }
      ],
      url: 'http://www.google.com',
      website: ""
    },
    {
      biography: "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
      email: "",
      firstName: "Peter",
      id: 146861,
      jobTitle: "Front End Developer",
      lastName: "Gibbons",
      name: "Peter Gibbons",
      organization: null,
      organizationUrl: null,
      photoID: 327577,
      slug: "thomas-bono",
      socialMediaProfile: [
        {
          profileUrl: "https://twitter.com/bonomite",
          service: "twitter"
        }
      ],
      url: 'http://www.google.com',
      website: ""
    }
  ]
  const authorsNoID = [
    {
      biography: "Jaclyn writes data-driven health and science stories for WNYC/Gothamist. She also runs Gothamist's COVID data dashboards. She is an alumna of the Newmark Graduate School of Journalism. Her work has appeared in NBC News, Spectrum, the Daily Beast, and other outlets.",
      email: "",
      firstName: "Jaclyn",
      id: null,
      jobTitle: "Data Reporter",
      lastName: "Jeffrey-Wilensky",
      name: "Jaclyn Jeffrey-Wilensky",
      organization: 'Gothamist',
      organizationUrl: 'http://www.gothamist.com',
      photoID: 327474,
      slug: "jaclyn-jeffrey-wilensky",
      socialMediaProfile: [],
      url: 'http://www.google.com',
      website: ""
    }
  ]
  const prefix = 'By'

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VByline, {
      global: {
        plugins: [PrimeVue],
        stubs: {

        }
      },
      props,
      slots: { afterNames: '<div class="after-names-content">afterNames SLOT Mock</div>', belowNames: '<div class="below-names-content">belowNames SLOT Mock</div>', images: '<div class="img">Image SLOT Mock</div>' }
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
        concat: ": ",
        concatLast: " or ",
        prefix,
      }
    })
    expect(wrapper.text()).toContain(`:`)
    expect(wrapper.text()).toContain(`or Peter Gibbons`)
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

  test('name click fires emit', () => {
    createComponent({
      props: {
        authors,
        prefix
      }

    })
    const name = wrapper.findAll('.v-byline-unit .v-byline-author-name')
    name[0].trigger('click')

    expect(wrapper.emitted()['name-click']).toBeTruthy()
    expect(wrapper.emitted()['name-click']).toEqual([[{ text: `${authors[0].firstName} ${authors[0].lastName}`, url: authors[0].url }]])
  })

  test('org click fires emit', () => {
    createComponent({
      props: {
        authors,
        prefix
      }

    })
    const org = wrapper.findAll('.v-byline-unit .v-byline-contributing-org')
    org[0].trigger('click')

    expect(wrapper.emitted()['organization-click']).toBeTruthy()
    expect(wrapper.emitted()['organization-click']).toEqual([[{ text: `${authors[0].organization}`, url: authors[0].organizationUrl }]])
  })

})
