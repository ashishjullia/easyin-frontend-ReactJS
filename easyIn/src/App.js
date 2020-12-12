import logo from './Logo.png';
import './App.css';
import { Redirect } from 'react-router-dom';
import React from 'react';
import axios from "axios";
class App extends React.Component {
  // Inheriting and creating states
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

  // Function to check the session status from API, ensures whether a user is logged in or not
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

  // Call to the session check function
  componentDidMount() {
      this.checkForSession();
  }

  // Update the "signup" state
  signUpClicked() {
    this.setState({ signup: true })
  }

  // Update the "signin" state
  SignInClicked() {
    this.setState({ Signin: true })
  }

  render() {
    // Redirect to dashboard page
    if (this.state.redirect) {
        return <Redirect to='/dashboard'/>
    }
    // Redirect to signup page
    if (this.state.signup) {
        return <Redirect to='/signup'/>
    }
    // Redirect to sigin page
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

// Exporting the app
export default App;