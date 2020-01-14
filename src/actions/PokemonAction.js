import dispatcher from '../dispatcher'
import {
  FETCH_POKEMON,
  FETCH_POKEMON_DETAIL,
  TAME_POKEMON,
  UNTAME_POKEMON
} from '../constants'

export function tamePokemon(payload) {
  dispatcher.dispatch({
    type: TAME_POKEMON,
    ...payload
  })
}

export function untamePokemon(payload) {
  dispatcher.dispatch({
    type: UNTAME_POKEMON,
    ...payload
  })
}

export function fetchPokemon(payload) {
  dispatcher.dispatch({
    type: FETCH_POKEMON,
    ...payload
  })
}

export function fetchPokemonDetail(payload) {
  dispatcher.dispatch({
    type: FETCH_POKEMON_DETAIL,
    ...payload
  })
}
