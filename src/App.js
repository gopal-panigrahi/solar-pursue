import React from 'react';
import './App.css';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';
import { HashRouter, Route } from 'react-router-dom'
import Switch from 'react-bootstrap/esm/Switch';
function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/uploadPage" component={UploadPage} />
          <Route path="/result" component={Result} />
        </Switch>
        {/* <Home /> */}
      </HashRouter>
    </>
  );
}

export default App;
