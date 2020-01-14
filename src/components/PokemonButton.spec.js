import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PokemonButton from './PokemonButton'

Enzyme.configure({ adapter: new Adapter() })

describe('PokemonButton component', () => {
  it('should render perfectly', () => {
    const wrapper = shallow(<PokemonButton />)
    expect(wrapper.exists()).toBe(true)
  })
  it('should render with .pokemon__button class', () => {
    const wrapper = shallow(<PokemonButton />)
    expect(wrapper.hasClass('pokemon__button')).toEqual(true)
  })
  it('should render button with custom color #22242f', () => {
    const wrapper = shallow(<PokemonButton color="#22242f" />)
    expect(wrapper.get(0).props.style).toHaveProperty('backgroundColor', '#22242f')
  })
  it('should render callback function', () => {
    const mockCallback = jest.fn()

    const wrapper = shallow(<PokemonButton callback={mockCallback} />)
    wrapper.find('button').simulate('click')
    expect(mockCallback.mock.calls.length).toEqual(1)
  })
  it('should render with text', () => {
    const wrapper = shallow(<PokemonButton>Call Me</PokemonButton>)
    expect(wrapper.text()).toEqual('Call Me')
  })
})

