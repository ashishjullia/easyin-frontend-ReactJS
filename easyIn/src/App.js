import logo from './Logo.png';
import './App.css';

import { Redirect } from 'react-router-dom';

import React from 'react';
import axios from "axios";

import signup from './signup';
import Signin from './signin';

import dashboard from './dashboard';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        signup: false
      }
      this.state = {
        Signin: false
      }
      this.state = {
          redirect: false
      }
      this.signUpClicked = this.signUpClicked.bind(this);
      this.SignInClicked = this.SignInClicked.bind(this);
  }

    checkForSession() {
        axios.defaults.withCredentials = true
        axios.get('http://oneeasyin.com:8080/users/sessioncheck')
            .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        this.setState({ redirect:true });
                    }
                }
            )
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.checkForSession();
    }

    signUpClicked() {
      this.setState({ signup: true })
  }

  SignInClicked() {
    this.setState({ Signin: true })
  }

  render() {
      if (this.state.redirect) {
          return <Redirect to='/dashboard'/>
      }
      if (this.state.signup) {
          return <Redirect to='/signup'/>
      }
      if (this.state.Signin) {
          return <Redirect to='./signin'/>
      }
      return (
          <div className="App">
            <div id="heading">
            <h1>Easy In</h1>
            <h3>Your One Key</h3>
            </div>
              <img src={logo} alt="Logo" class="image"/>
              <br/><br/>
            <input type="button" className="inner" defaultValue="Sign Up" onClick={this.signUpClicked}></input>
            <span>&nbsp;</span>
            <input type="button" className="inner" defaultValue="Sign In" onClick={this.SignInClicked}></input>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <footer>&copy; oneeasyin 2020</footer>
          </div>
        );
  }
}

export default App;