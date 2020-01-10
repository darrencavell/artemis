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
  /**
   * `Singleton Alike`
   * - removing the need to use openDB function all the time,
   *   when needed to use IndexedDB
   * - return the existing IndexedDB if exists
   * @link https://github.com/jakearchibald/idb
   */
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
  /**
   * `Tame Pokemon`
   * - basically just a bunch of crud operations,
   *   before taming the pokemon, we kindly check the IndexedDB
   * - afterwards, if it returns undefined, we create
   *   an array and put the object there
   * - if it was not undefined, we push the object immediatelly
   * @param {Object} detail 
   * @param {String} nickname 
   * @param {UNIX Timestamp} catch_date 
   */
  async tamePokemon(detail, nickname, catch_date) {
    this.indexedDB.idb = await this.getIdb()
    const existingDetail = await this.indexedDB.idb.get('artemis', [detail.id, detail.name])
    const newDetail = Object.assign({}, detail)
    existingDetail == undefined
      ? newDetail['owned'] = [{ nickname, catch_date }]
      : newDetail['owned'].push({ nickname, catch_date })
    this.indexedDB.idb.put('artemis', newDetail)
  }
  /**
   * `Untame Pokemon`
   * - most likely the same with tame pokemon,
   *   but here, we don't delete the object immediately
   * - we filter it, to map through the owned object,
   *   if the nickname exists, we filter it
   * - if there is 0 elements left, we delete the oject
   *   from IndexedDB
   * @param {Integer} id 
   * @param {String} name 
   * @param {String} nickname 
   */
  async untamePokemon(id, name, nickname) {
    this.indexedDB.idb = await this.getIdb()
    const existingDetail = await this.indexedDB.idb.get('artemis', [id, name])
    if (existingDetail !== undefined) {
      const newDetail = Object.assign({}, existingDetail)
      newDetail['owned'] = newDetail['owned'].filter(f => f.nickname !== nickname)
      newDetail['owned'].length === 0
        ? await this.indexedDB.idb.delete('artemis', [id, name])
        : await this.indexedDB.idb.put('artemis', newDetail)
      this.emit('delete')
    }
  }
  async getTamePokemonFromIdbAsync() {
    this.indexedDB.idb = await this.getIdb()
    this.data.tamedPokemon = await this.indexedDB.idb.getAll('artemis')
    this.emit('change')
  }
  getTamePokemon() {
    return this.data.tamedPokemon
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
        this.untamePokemon(action.id, action.name, action.nickname)
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