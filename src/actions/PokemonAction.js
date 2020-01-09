import dispatcher from '../dispatcher'
import {
  FETCH_POKEMON,
  FETCH_POKEMON_DETAIL
} from '../constants'

export function fetchPokemon(payload) {
  dispatcher.dispatch({
    type: FETCH_POKEMON,
    ...payload
  })
}

export function fetchPokemonDetail(payload) {
  console.log(payload)
  dispatcher.dispatch({
    type: FETCH_POKEMON_DETAIL,
    ...payload
  })
}