import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Result from './components/Result';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/homepage" component={Homepage} />
          <Route path="/result" component={Result} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
