# Artemis Pokedex

A pokemon pokedex app that supports service worker, with unit testing and integration testing.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ab6d0487-6273-483b-b07a-45edc80649b1/deploy-status)](https://app.netlify.com/sites/artemis-pokedex/deploys)

## Features
- works offline with service worker
- using indexedDB
- webpack configuration
- unit and integration testing
- infinite scrolling
- flux state management
- ~~used to be working on lazy load intersection observer (omitted)~~

## Installation

> Using yarn: `$ yarn`

> Using npm: `$ npm install`

## Tests

> Using yarn: `$ yarn test:watch`

> Using npm: `$ npm run test:watch`

## Extras

Page consists of:
- Home `/`
- Detail `/${searchedPokemon}`
- Pokedex `/pokedex`
- Not Found `/not-found`

Deployed Site: https://artemis-pokedex.netlify.com

Github: https://github.com/darrencavell/artemis