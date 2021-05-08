import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import Result from './components/Result.jsx';

function App() {
  useEffect(() => {
    if (!window.api.checkBasePath()) {
      window.api.setBasePath();
    } else {
      console.log(window.api.getBasePath())
    }
  }, [])
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/homepage" component={Homepage} />
          <Route path="/result" component={Result} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
