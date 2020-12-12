import React from 'react';
import axios from "axios";
import {Route, Link, BrowserRouter as Router, Redirect} from 'react-router-dom';
import './App.css';
export default class signin extends React.Component {
    // Inheriting and creating states
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            token: '',
            pwdLessMsg: ''
        }

        this.state = { redirect: false }
       
        this.state = { loading : false }

        this.state = { fingerprintStateChangedOrNot: false }
        this.state = { fingerprintStateChangedOrNotResponse: "" }

        this.handleEventSubmitPasswordClicked = this.handleEventSubmitPasswordClicked.bind(this);
        this.handleEventSubmitPasswordLessClicked = this.handleEventSubmitPasswordLessClicked.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleEmail() {
        this.setState({ email: document.getElementById("email").value });
    }

    handlePassword() {
        this.setState({ password: document.getElementById("password").value });
    }

    // Function to check the session status from API, ensures whether a user is logged in or not
    checkForSession() {
        axios.defaults.withCredentials = true
        axios.get('http://oneeasyin.com:8080/users/sessioncheck')
            .then((res) => {
                    console.log("check-session-function", res.data);
                    if (res.data.status) {
                        this.setState({ redirect:true });
                    }
                }
            )
            .catch((error) => {
                console.log(error)
            });
    }

    // Mount these or execute these each time page render/refresh
    componentDidMount() {
        this.checkForSession();
    }

    // Password request handler
    handleEventSubmitPasswordClicked() {
        axios.defaults.withCredentials = true
        axios.post('http://oneeasyin.com:8080/users/login', {
            email:this.state.email,
            password:this.state.password})
            .then((res) => {
             // console.log(res);
             if (res.data.status || res.data.status ===  false) {
                 this.setState({ redirect: true });
                 console.log("message", res.data.message);
                 console.log("session", this.state.redirect);
             }
             else {
                console.log(res.data.message);
                 this.setState({ message: res.data.message});
                }
            }
        )
        .catch((error) => {
            console.log(error)
        });
    }

    // Password Less request handler
    handleEventSubmitPasswordLessClicked = () =>{
        this.setState({loading : true});
        // API call here
        axios.defaults.withCredentials = true
        axios.post('http://oneeasyin.com:8080/users/login/passwordless', {email:this.state.email}).then((res) => {
            if (res.data.status || res.data.status === false) {
                this.setState({ redirect: true });
                this.setState({ fingerprintStateChangedOrNot: true,
                fingerprintStateChangedOrNotResponse: res.data.message });
            }
            else {
                this.setState({
                    fingerprintStateChangedOrNotResponse: res.data.message });
                }
            }
            )
            .catch((error) => {
                console.log(error)
            });
        setTimeout(()=>{
            this.setState({loading : false});
        }, 10000)
    }

    render() {
        const {loading} = this.state;

        if (this.state.redirect) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <div className="App">
                <h1>Login to EasyIn</h1>
                <div id="signInStart">
                <label>Email:</label><input id="email" class="textfield" type="text" defaultValue="" name="email" onInput={this.handleEmail}></input>
                <br></br><br></br>
                <label>Password:</label><input id="password" class="textfield" type="password" defaultValue="" name="password" onInput={this.handlePassword}></input>
                <br></br><br></br>
                <div id="container">
                    <input id="submitPassword" className="inner" type="button" value="Login with Password" onClick={this.handleEventSubmitPasswordClicked}></input>
                    <button className="inner" value="Log In with Fingerprint" onClick={this.handleEventSubmitPasswordLessClicked} disabled={loading}>
                { loading && <i className="App"></i>}
                { loading && <span>Waiting for the fingerprint</span>}
                { !loading && <span>Login with Biometric Input</span>}
                </button>
                </div>
                <h1>{this.state.message}</h1>
                </div>
                <footer>&copy; oneeasyin 2020</footer>
            </div>
        );
    }
}