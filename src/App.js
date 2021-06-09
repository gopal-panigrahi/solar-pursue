import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ImageProcessing from './pages/ImageProcessing.jsx'
import Home from './pages/Home.jsx';
import StatisticalReport from './pages/StatisticalReport.jsx';

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
      {/* <HashRouter>
        <Header />
        <Switch className="m-0 p-0">
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/processImage" component={ImageProcessing} />
        </Switch>
      </HashRouter> */}
      <StatisticalReport />
      {/* <ImageProcessing /> */}
    </>
  );
}

export default App;
