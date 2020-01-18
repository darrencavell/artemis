import React from 'react'
import {
  MemoryRouter
} from 'react-router-dom'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PokemonMenu from './PokemonMenu'

Enzyme.configure({ adapter: new Adapter() })

describe('PokemonMenu component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/', '/pokedex']}>
      <PokemonMenu />
    </MemoryRouter>
  )
  it('should render perfectly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should show class show', () => {
    wrapper.find('div.pokemon__circle.main-circle').at(0).simulate('click')
    expect(wrapper.find('a.pokemon__circle.first-circle').hasClass('show')).toBe(true)
    expect(wrapper.find('a.pokemon__circle.second-circle').hasClass('show')).toBe(true)
  })
  it('should register / route', () => {
    expect(wrapper.find('a.pokemon__circle.first-circle').props().href).toBe('/')
  })
  it('should register /pokedex route', () => {
    expect(wrapper.find('a.pokemon__circle.second-circle').props().href).toBe('/pokedex')
  })
})