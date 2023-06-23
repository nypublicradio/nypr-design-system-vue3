import { mount } from '@vue/test-utils'
import VImageCaption from '../components/VImageCaption.vue'
import { toHaveNoViolations } from 'jest-axe'
import PrimeVue from 'primevue/config'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('VImageCaption', () => {
    let wrapper = {}
    const text = 'this is sample caption text.'


    const createComponent = ({ props = {}, slots = {} } = {}) => {

        wrapper = mount(VImageCaption, {
            props,
            global: {
                stubs: {
                },
                plugins: [PrimeVue],
            },
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
