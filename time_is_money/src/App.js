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
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/watchlist" component={WatchList} />
      <Route exact path="/cryptos" component={Cryptos} />
      <Route exact path="/stocks" component={Stocks} />
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
