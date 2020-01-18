import React from 'react'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter, Route } from 'react-router-dom'
import { FETCH_POKEMON_DETAIL, FETCH_POKEMON } from './constants'
import PokemonStore from './stores/PokemonStore'

import axios from 'axios'
jest.mock('axios')

import App from './App'
import Home from './views/Home'
import Detail from './views/Detail'

Enzyme.configure({ adapter: new Adapter() })

describe('Integration testing', () => {
  const fetchPokemon = { 
    type: FETCH_POKEMON,
    query: `?limit=10&offset=${PokemonStore.data.loaded}`
  }
  const fetchPokemonDetail = {
    type: FETCH_POKEMON_DETAIL,
    searchedPokemon: 'bulbasaur'
  }

  let wrapper
  const baseUrl = 'http://localhost'
  
  // it('lands on homepage', () => {
  //   wrapper = mount(
  //     <MemoryRouter initialEntries={["/"]} initialIndex={0}>
  //       <Route path="/" component={Home} />
  //     </MemoryRouter>
  //   )
  //   const location = window.location.href
  //   expect(location.replace(baseUrl, '')).toBe('/')
  // })
  it('handles actions on dispatching fetchPokemon', () => {
    const mock = jest.fn(PokemonStore.handleActions(fetchPokemon))
    mock()
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it('handles actions on dispatch fetchPokemonDetail', async function() {
    const mock = jest.fn(PokemonStore.handleActions(fetchPokemonDetail))
    mock()
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it('receives fetchPokemon as action dispatched', () => {
    expect(PokemonStore.getPokemon().length).toEqual(2)
    expect(PokemonStore.getPokemon()[0].name).toEqual('bulbasaur')
    expect(PokemonStore.getPokemon()[1].name).toEqual('ivysaur')
  })
  it('receives fetchPokemonDetail as action dispatches', () => {
    expect(PokemonStore.getPokemonDetail().name).toEqual('bulbasaur')
    expect(PokemonStore.getPokemonDetail().types[0].type.name).toEqual('grass')
    expect(PokemonStore.getPokemonDetail().types[1].type.name).toEqual('poison')
  })
  // it('lands on detail', () => {
  //   wrapper = mount(
  //     <MemoryRouter initialEntries={["/bulbasaur"]}>
  //       <App />
  //     </MemoryRouter>
  //   )
  //   const location = window.location.href
  //   expect(location.replace(baseUrl, '')).toBe('/bulbasaur')
  // })
})