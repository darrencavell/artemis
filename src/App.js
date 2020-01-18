import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './views/Home'
import Detail from './views/Detail'
import Pokedex from './views/Pokedex'
import NotFound from './views/NotFound'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pokedex" component={Pokedex} />
        <Route path="/not-found" component={NotFound} />
        <Route path={`/:searchedPokemon`} component={Detail} />
      </Switch>
    </Router>
  )
}

export default App
