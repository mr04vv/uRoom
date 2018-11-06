/* eslint-disable no-undef */
import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Host from './Host'
import Guest from './Guest'
import Top from './Top'


class App extends Component {

  constructor() {
    super()
    this.state = {
      peerId: null
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Top}/>
          <Route exact path={"/host/:hostId"} component={Host}/>
          <Route exact path={"/guest/:guestId"} component={Guest}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
