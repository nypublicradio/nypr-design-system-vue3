import VImageCaption from '../components/VImageCaption.vue'
import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'

expect.extend(toHaveNoViolations)

describe('VImageCaption', () => {
    let wrapper = {}
    const text = 'this is sample caption text.'


    const createComponent = ({ props = {}, slots = {} } = {}) => {

        wrapper = mount(VImageCaption, {
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


    test('text renders', async () => {
        createComponent({
            props: {
                text
            }
        })
        const captionButton = wrapper.find('.caption-button')
        await captionButton.trigger('click')
        await wrapper.vm.$nextTick()
        const content = wrapper.find('.content')
        expect(content.text()).toBe(text)
    })

    test('caption toggle emits', async () => {
        createComponent({
            props: {
                text
            }
        })
        const captionButton = wrapper.find('.caption-button')
        await captionButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()['toggle-caption-expanded']).toBeTruthy()
        await captionButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()['toggle-caption-collapsed']).toBeTruthy()
    })


    test('it passes basic accessibility tests', async () => {

        createComponent({
            props: {
                text
            }
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
}) 
