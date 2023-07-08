import VBylineUnit from '../components/VBylineUnit.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VBylineUnit', () => {

  let wrapper = {}

  const authorOrg =
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
  }

  const authorNoOrgLink =
  {
    biography: "Nsikan runs the health and science desk at WNYC/Gothamist. Nsikan was previously at National Geographic where he worked as a science editor, overseeing its COVID-19 coverage in addition to other topics in science, health and technology. Before National Geographic, he worked for more than four years at PBS NewsHour, where he co-created an award-winning video series named ScienceScope. \r\n\r\nHe shared a 2020 Emmy for the PBS NewsHour series “Stopping a Killer Pandemic” and in 2019 received a George Foster Peabody Award for the PBS NewsHour series “The Plastic Problem.” Nsikan has also worked for NPR, Science News Magazine, Science Magazine, KUSP Central Coast Public Radio, the Santa Cruz Sentinel and as a writer at the Center for Infection and Immunity at Columbia University. He holds a doctorate in pathobiology from Columbia University and is an alum of the science communication program at the University of California, Santa Cruz.",
    email: "",
    firstName: "Nsikan",
    id: 146821,
    jobTitle: "Editor, Health & Science",
    lastName: "Akpan",
    name: "Nsikan Akpan",
    organization: 'Gothamist',
    organizationUrl: null,
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
  }


  const authorNoOrg =
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


  const prefix = 'By'

  const createComponent = ({ props = {}, slots = {} } = {}) => {
    wrapper = mount(VBylineUnit, {
      global: {
        plugins: [PrimeVue],
        stubs: {
        }
      },
      props,
      slots
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
  })

  test('Shows org', () => {
    createComponent({
      props: {
        author: authorOrg
      }
    })
    const link = wrapper.find('.flexible-link')
    const orgContent = wrapper.find('.v-byline-contributing-org')
    expect(link.text()).toContain(authorOrg.lastName)
    expect(link.text()).toContain(authorOrg.firstName)
    expect(orgContent.text()).toContain(authorOrg.organization)
    expect(orgContent.exists()).toBe(true)
  })

  test('does not show org', () => {
    createComponent({
      props: {
        author: authorNoOrg
      }
    })
    const link = wrapper.find('.flexible-link')
    const orgContent = wrapper.find('.v-byline-contributing-org')
    expect(link.text()).toContain(authorNoOrg.lastName)
    expect(link.text()).toContain(authorNoOrg.firstName)
    expect(orgContent.exists()).toBe(false)
  })

  test('does not render org as a link', () => {
    createComponent({
      props: {
        author: authorNoOrgLink
      }
    })
    const orgLink = wrapper.find('.v-byline-contributing-org')
    expect(orgLink.exists()).toBe(true)
    expect(orgLink.classes()).toContain('null')
  })
})
