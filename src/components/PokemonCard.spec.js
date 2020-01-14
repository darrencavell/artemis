import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PokemonCard from './PokemonCard'

Enzyme.configure({ adapter: new Adapter() })

const pokemonDetail = {
  sprites: {
    front_default: ''
  },
  types: [],
  name: 'Bulbasaur'
}

describe('PokemonCard component', () => {
  it('should render perfectly', () => {
    const wrapper = shallow(<PokemonCard pokemon={pokemonDetail} />)
    expect(wrapper.exists()).toBe(true)
  })
  it('should render with .pokemon__card class', () => {
    const wrapper = shallow(<PokemonCard pokemon={pokemonDetail} />)
    expect(wrapper.find('.pokemon__card').length).toEqual(1)
  })
  it('should render card with custom color #de8f56', () => {
    const wrapper = shallow(<PokemonCard pokemon={pokemonDetail} color="#de8f56" />)
    expect(wrapper.get(0).props.style).toHaveProperty('background', '#de8f56')
  })
  it('should render callback function', () => {
    const mockCallback = jest.fn()

    const wrapper = shallow(<PokemonCard pokemon={pokemonDetail} callback={mockCallback} />)
    wrapper.children().first().simulate('click')
    expect(mockCallback.mock.calls.length).toEqual(1)
  })
  it('should render with pokemon name text', () => {
    const wrapper = shallow(<PokemonCard pokemon={pokemonDetail} />)
    expect(wrapper.find('.pokemon__name').text()).toEqual('Bulbasaur')
  })
})