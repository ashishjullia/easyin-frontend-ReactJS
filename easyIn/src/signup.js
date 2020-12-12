import React from 'react';
import axios from "axios";
import './App.css';

export default class signup extends React.Component {
    // Inheriting and creating states
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            message: ''
        }
        this.handleEventSubmitClicked = this.handleEventSubmitClicked.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleFirstName() {
        this.setState({ firstname: document.getElementById("firstName").value });
    }

    handleLastName() {
        this.setState({ lastname: document.getElementById("lastName").value });
    }

    handleEmail() {
        this.setState({ email: document.getElementById("email").value });
    }

    handlePassword() {
        this.setState({ password: document.getElementById("password").value });
    }

    // SignUp submit request handler
    handleEventSubmitClicked() {
        const response = axios.post('http://oneeasyin.com:8080/users/signup', this.state).then((res) => {
            this.setState({ message: res.data.message });
        }
        ).catch((error) => {
            console.log(error)
        });
    }


    render() {
        return (
            <div className="App">
                <h1>Sign Up Form</h1>
                <div id="signUpStart">
                <label>First Name:</label><input id="firstName" class="textfield" type="text" defaultValue="" name="firstName" onInput={this.handleFirstName}></input>
                <br></br><br></br>
                <label>Last Name:</label><input id="lastName" class="textfield" type="text" defaultValue="" onInput={this.handleLastName}></input>
                <br></br><br></br>
                <label>Email:</label><input id="email" class="textfield" type="text" defaultValue="" name="email" onInput={this.handleEmail}></input>
                <br></br><br></br>
                <label>Password:</label><input id="password" class="textfield" type="password" defaultValue="" name="password" onInput={this.handlePassword}></input>
                <br></br><br></br>
                <input id="submit" className="inner" type="button" value="Submit" onClick={this.handleEventSubmitClicked}></input>
                <div>
                    <h6>{this.state.message}</h6>
                </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <footer>&copy; oneeasyin 2020</footer>
            </div>

        );
    }
}
