import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cryptos from './components/Cryptos'
import WatchList from './components/WatchList';
import Login from './components/Login';
import Register from './components/Register';
import Stocks from './components/Stocks';
import Modal from "./components/Modal"
import axios from "axios"
import React, { Component } from "react";
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import StockChart from './components/StockChart';


function App() {



  return (
    <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
  <a className="navbar-brand" href="/">Time Is Money</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse me-auto" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" href="/">Stock Tracker <span class="sr-only"></span></a>
      <a className="nav-item nav-link" href="/cryptos">Crypto Tracker</a>
      <a className="nav-item nav-link" href="/watchlist">Watchlist</a>
    </div>
  </div>
</nav>
      <Route exact path="/" component={Stocks} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/watchlist" component={WatchList} />
      <Route exact path="/cryptos" component={Cryptos} />
      <Route exact path="/modal" component={Modal} />
      <Route exact path="/form" component={CreateForm} />
      <Route exact path="/chart" component={StockChart} />
      <Route 
      exact
      path="/watchlist/:id"
      render={(routerProps) => (
        <EditForm match={routerProps.match} data={EditForm} />
      )}
      />
    </div>
  );
}

export default App;
