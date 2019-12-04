import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pokemon from './Pokemons/views/Pokemon';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/pokemon/:nameOrId" component={Pokemon} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
