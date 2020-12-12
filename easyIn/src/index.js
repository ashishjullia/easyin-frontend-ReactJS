import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom'
import signup from './signup';
import signin from './signin';
import dashboard from './dashboard';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/signup" component={signup} />
      <Route path="/signin" component={signin} />
      <Route path="/dashboard" component={dashboard} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
