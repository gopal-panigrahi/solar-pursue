import React from 'react';
import './App.css';
import ImageProcessing from './pages/ImageProcessing.jsx'
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import { HashRouter, Route } from 'react-router-dom'
import Switch from 'react-bootstrap/esm/Switch';
function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Switch className="m-0 p-0">
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/uploadPage" component={ImageProcessing} />
          {/* <Route path="/result" component={Result} /> */}
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;