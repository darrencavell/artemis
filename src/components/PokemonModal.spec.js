import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PokemonModal from './PokemonModal'

Enzyme.configure({ adapter: new Adapter() })

const Child = () => <div>Pokemon Modal Testing</div>

describe('PokemonModal component', () => {
  let wrapper
  afterEach(() => {
    wrapper.unmount()
  })

  const anotherEl = global.document.createElement('div')
  const bodyEl = global.document.querySelector('body')
  bodyEl.appendChild(anotherEl)

  it('should render perfectly', () => {
    wrapper = shallow(<PokemonModal id="modal-test"></PokemonModal>)
    expect(wrapper.exists()).toBe(true)
  })
  it('should render with Child component', () => {
    const wrapper = mount(
      <PokemonModal id="modal-test">
        <Child />
      </PokemonModal>
    )
    expect(wrapper.find(Child).exists()).toBe(true)
  })
  it('should render with empty div portal', () => {
    expect(wrapper.children().exists()).toBeFalsy()
  })
})