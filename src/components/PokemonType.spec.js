import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PokemonType from './PokemonType'

import { colorByPokemonType } from '../utils'

Enzyme.configure({ adapter: new Adapter() })

const types = [
  { type: { name: 'water' } }
]

describe('PokemonType component', () => {
  it('should render perfectly', () => {
    const wrapper = shallow(<PokemonType types={types} />)
    expect(wrapper.exists()).toBe(true)
  })
  it('should render with color blue #5481e2', () => {
    const wrapper = shallow(<PokemonType types={types} />)
    expect(wrapper.get(0).props.style).toHaveProperty('background', colorByPokemonType(types[0].type.name))
  })
  it('should render with .pokemon__type class', () => {
    const wrapper = shallow(<PokemonType types={types} />)
    expect(wrapper.hasClass('pokemon__type')).toBe(true)
  })
})