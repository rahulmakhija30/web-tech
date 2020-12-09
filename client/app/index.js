import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import NewComponent from './components/FrontPage/finalfrontpg';

import HelloWorld from './components/HelloWorld/HelloWorld';
import Patient from './components/Patient/Patient';



import VizGraphs from './components/Chart/viz';





render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={NewComponent}/>
        <Route exact path="/login" component={Home}/>
  {/*<Route exact path="/doctorspg" component={VizGraphs}/>*/}
        <Route exact path="/frontpg" component={NewComponent}/>
        <Route  exact path="/doctorspg" render={(props) => <VizGraphs type={1}  {...props} />} />
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
