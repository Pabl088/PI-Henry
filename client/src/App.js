import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/Home.jsx';
import CardDetail from './Components/CardDetail/CardDetail.jsx';
import Form from './Components/Form/Form.jsx';
import About from './Components/About/About.jsx';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/pokemons/:id" component={CardDetail} />
        <Route exact path="/create" component={Form} />
        <Route exact path="/about" component={About} />
        <Route exact path="/:rutaerronea" component={Home} />
      </Switch>
    </>
  );
};

export default App;
