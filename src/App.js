import React, { useEffect } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import ImageProcessing from './pages/ImageProcessing.jsx'
import Home from './pages/Home.jsx';
import Imageupload from './pages/Imageupload.js';

function App() {
  useEffect(() => {
    if (!window.api.checkBasePath()) {
      window.api.setBasePath();
    } else {
      console.log(window.api.getBasePath())
    }
  }, []);

  return (
    <>
      <div className='cover-body'>
        <Header />
        <HashRouter>
          <Switch className="m-0 p-0">
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/processImage" component={ImageProcessing} />
            <Route path="/singleImage" component={Imageupload} />
          </Switch>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
