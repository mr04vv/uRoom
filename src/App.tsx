/* eslint-disable no-undef */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Host from './Host'
import Guest from './Guest'
import Top from './Top'


class App extends Component {

  constructor(props: any) {
    super(props)
    this.state = {
      peerId: null
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Top}/>
          <Route path={"/host/:hostId"} component={Host}/>
          <Route path={"/guest/:guestId"} component={Guest}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
