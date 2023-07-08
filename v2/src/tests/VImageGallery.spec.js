import VImageGallery from '../components/VImageGallery.vue'
import axe from './axe-helper'
import { mockBrowserWidth } from './helperFuncs.js'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VImageGallery', () => {
    let wrapper = {}
    const count = '9'
    const label = 'View All'
    const galleryLink = 'photos/gallery'

    const createComponent = ({ props = {}, slots = {} } = {}) => {

        wrapper = mount(VImageGallery, {
            global: {
                plugins: [PrimeVue],
                stubs: {

                },
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

    test('props render', () => {
        createComponent({
            props: {
                count,
                galleryLink,
                label
            }
        })
        const link = wrapper.find('.flexible-link')
        const button = wrapper.find('.gallery-button')
        expect(button.text()).toBe(`${label}${count}`)

    })

    test('gallery-click fires emit', async () => {
        createComponent({
            props: {
                count,
                galleryLink,
                label
            }
        })
        const link = wrapper.find('.flexible-link')
        await link.trigger('click')
        expect(wrapper.emitted()['gallery-click']).toBeTruthy()
        expect(wrapper.emitted()['gallery-click']).toEqual([[galleryLink]])
    })

    test('it passes basic accessibility tests', async () => {
        createComponent({
            props: {
                count,
                galleryLink,
                label
            }
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
}) 
