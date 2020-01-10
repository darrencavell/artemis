import axios from 'axios'
import { EventEmitter } from 'events'
import { openDB } from 'idb'

import dispatcher from '../dispatcher'
import {
  UNTAME_POKEMON,
  TAME_POKEMON,
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
      detail: {},
      tamedPokemon: []
    }
    this.indexedDB = {
      version: 1,
      idb: undefined
    }
  }
  async getIdb() {
    if (this.indexedDB.idb) {
      return this.indexedDB.idb
    }
    this.indexedDB.idb = await openDB('artemis', this.indexedDB.version, {
      upgrade(db) {
        db.createObjectStore('artemis', {
          keyPath: ['id', 'name']
        })
      }
    })
    return this.indexedDB.idb
  }
  async tamePokemon(detail, nickname, catch_date) {
    this.indexedDB.idb = await this.getIdb()
    const existingDetail = await this.indexedDB.idb.get('artemis', [detail.id, detail.name])
    if (existingDetail == undefined) {
      const newDetail = Object.assign({}, detail)
      newDetail['owned'] = [{ nickname, catch_date }]
      this.indexedDB.idb.put('artemis', newDetail)
      return
    }
    const newDetail = Object.assign({}, existingDetail)
    newDetail['owned'].push({ nickname, catch_date })
    this.indexedDB.idb.put('artemis', newDetail)
  }
  async getTamePokemonFromIdbAsync() {
    this.indexedDB.idb = await this.getIdb()
    console.log(this.indexedDB.idb)
    this.data.tamedPokemon = await this.indexedDB.idb.getAll('artemis')
    this.emit('change')
  }
  getTamePokemon() {
    return this.data.tamedPokemon
  }
  async untamePokemon(id, name) {
    this.indexedDB.idb = await this.getIdb()
    const existingDetail = await this.indexedDB.idb.get('artemis', [id, name])

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
    switch(action.type) {
      case TAME_POKEMON:
        this.tamePokemon(action.detail, action.nickname, action.catch_date)
        break
      case UNTAME_POKEMON:
        this.untamePokemon(action.id, action.name)
        break
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