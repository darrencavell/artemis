import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import imageGray from '../images/gray.jpeg'

import PokemonImage from './PokemonImage'

Enzyme.configure({ adapter: new Adapter() })

describe('PokemonImage component', () => {
  it('should render perfectly', () => {
    const wrapper = shallow(<PokemonImage src={imageGray} />)
    expect(wrapper.exists()).toBe(true)
  })
  it('should show src image', () => {
    const wrapper = shallow(<PokemonImage src={imageGray} />)
    expect(wrapper.children().first().get(0).props.src).toEqual(imageGray)
  })
  it('should render image with .pokemon__image class', () => {
    const wrapper = shallow(<PokemonImage src={imageGray} />)
    expect(wrapper.hasClass('pokemon__image')).toEqual(true)
  })
})