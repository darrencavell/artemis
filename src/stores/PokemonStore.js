import axios from 'axios'
import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'
import {
  FETCH_POKEMON,
  FETCH_POKEMON_DETAIL
} from '../constants'

class PokemonStore extends EventEmitter {
  constructor() {
    super()
    this.data = {
      loaded: 0,
      limit: 10,
      pokemon: [],
      detail: {}
    }
  }
  fetchPokemon(query = `?limit=${this.data.limit}`) {
    axios.get(`https://pokeapi.co/api/v2/pokemon${query}`)
      .then(response => {
        const { status, data } = response
        if(status !== 200) {
          console.error(`Looks like there is a problem. Status: ${status}`)
        }

        const { results } = data
        axios.all(results.map(pokemon => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)))
          .then(response => {
            this.data.loaded += this.data.limit
            this.data.pokemon = response.map(r => r.data)
            this.emit('change')
          })
      })
  }
  getPokemon() {
    return this.data.pokemon
  }
  fetchPokemonDetail(searchedPokemon) {
    console.log(searchedPokemon)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`)
      .then(response => {
        const { status, data } = response
        if(status !== 200) {
          console.error(`Looks like there is a problem. Status: ${status}`)
        }

        this.data.detail = data
        this.emit('change')
      })
  }
  getPokemonDetail() {
    return this.data.detail
  }
  handleActions(action) {
    console.log(action)
    switch(action.type) {
      case FETCH_POKEMON:
        this.fetchPokemon(action.query)
        break
      case FETCH_POKEMON_DETAIL:
        this.fetchPokemonDetail(action.searchedPokemon)
        break
    }
  }
}
const PokemonStoreWrapper = new PokemonStore()
dispatcher.register(PokemonStoreWrapper.handleActions.bind(PokemonStoreWrapper))
export default PokemonStoreWrapper