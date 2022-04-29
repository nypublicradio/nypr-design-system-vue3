import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import Hello from '../../components/Hello.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

test('mount component', async () => {
  expect(Hello).toBeTruthy()

  const wrapper = mount(Hello, {
    props: {
      count: 4,
    },
  })

  expect(wrapper.text()).toContain('4 x 2 = 8')
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.get('button').trigger('click')

  expect(wrapper.text()).toContain('4 x 3 = 12')

  await wrapper.get('button').trigger('click')

  expect(wrapper.text()).toContain('4 x 4 = 16')

  const results = await axe(wrapper.element)
  expect(results).toHaveNoViolations()
})
