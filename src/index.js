import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './views/Home'
import Detail from './views/Detail'
import Pokedex from './views/Pokedex'

import './index.css'

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
  })
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pokedex" component={Pokedex} />
        <Route path={`/:searchedPokemon`} component={Detail} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))