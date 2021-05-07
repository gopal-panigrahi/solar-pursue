import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {
  return (
    <>
      <Header />
      <Homepage />
      {/* <Footer /> */}
    </>
  );
}

export default App;
