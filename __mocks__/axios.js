import PokemonStore from '../src/stores/PokemonStore'
module.exports = {
  get: jest.fn(url => {
    if (url === `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${PokemonStore.data.loaded}`) {
      return Promise.resolve({
        status: 200,
        data: {
          results: [
            {
              url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
              name: "bulbasaur"
            },
            {
              url: "https://pokeapi.co/api/v2/pokemon/ivysaur/",
              name: "ivysaur"
            }
          ]
        }
      })
    }
    else if (url === 'https://pokeapi.co/api/v2/pokemon/bulbasaur') {
      return Promise.resolve({
        status: 200,
        data: {
          name: 'bulbasaur',
          types: [
            {slot: 1, type: {name: "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
            {slot: 2, type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}}
          ],
        }
      })
    }
    else if (url === 'https://pokeapi.co/api/v2/pokemon/ivysaur') {
      return Promise.resolve({
        status: 200,
        data: {
          name: 'ivysaur',
          types: [
            {slot: 1, type: {name: "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
            {slot: 2, type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}}
          ],
        }
      })
    }
  }),
  all: jest.fn(async arr => {
    return Promise.all([...arr])
      .then(r => r)
  })
}