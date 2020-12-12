import React from 'react';
import axios from "axios";
import './App.css';
import {Route, Link, BrowserRouter as Router, Redirect} from 'react-router-dom';
import QRCode from "qrcode.react";

export default class dashboard extends React.Component {
    // Inheriting and creating states
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            status: "",
            logout: false }

        this.state = { redirect: false }

        this.state = { qrData: "" }

        this.state = { qrPresentOrNot: false }
        this.state = { qrFingerprintResponse: "" }

        this.state = { fingerprintRemovedOrNot: false }
        this.state = { fingerprintRemovedOrNotResponse: "" }

        this.dashboardHome = this.dashboardHome.bind(this);
        this.handleEventSubmitLogOutClicked = this.handleEventSubmitLogOutClicked.bind(this);
        this.handleEventSubmitGenerateFingerPrintClicked = this.handleEventSubmitGenerateFingerPrintClicked.bind(this);
        this.handleEventSubmitRemoveExistingFingerprintClicked = this.handleEventSubmitRemoveExistingFingerprintClicked.bind(this);
    }

    // Function to check the session status from API, ensures whether a user is logged in or not
    checkForSession() {
        axios.defaults.withCredentials = true
        axios.get('http://oneeasyin.com:8080/users/sessioncheck')
            .then((res) => {
                    console.log("check-session-exists", res.data.status);
                    if (res.data.status) {
                        this.setState({ redirect: true });
                        console.log("checksession", this.state.redirect);
                    }
                }
            )
            .catch((error) => {
                console.log(error)
            });
    }

    // Access the dashboard based on the current logged in user
    dashboardHome() {
        axios.defaults.withCredentials = true
        axios.post('http://oneeasyin.com:8080/dashboard')
            .then((res) => {
                this.setState({ message: res.data.message });
                console.log(res.data.status);
        }
        ).catch((error) => {
            console.log(error)
        });
    }

    // Logout request handler
    handleEventSubmitLogOutClicked() {
        axios.defaults.withCredentials = true
        axios.post('http://oneeasyin.com:8080/users/logout')
            .then((res) => {
                console.log("message", res.data.message);
                console.log("session", this.state.redirect);
                    window.location.reload();
        }
        ).catch((error) => {
            console.log(error)
        });
    }

    // Fingerprint request handler
    handleEventSubmitGenerateFingerPrintClicked() {
        axios.defaults.withCredentials = true
        axios.post('http://oneeasyin.com:8080/dashboard/addfingerprint')
            .then((res) => {
                    if (res.data.status) {
                        this.setState({
                            qrPresentOrNot: true,
                            qrData: res.data.email,
                            qrFingerprintResponse: res.data.message
                        });
                    } else {
                        console.log("fingerprint", res.data.message);
                        this.setState({ qrFingerprintResponse: res.data.message });
                    }
                }
            ).catch((error) => {
            console.log(error)
        });}

    // Remove Fingerprint request handler
    handleEventSubmitRemoveExistingFingerprintClicked() {
        axios.defaults.withCredentials = true
        axios.post('http://oneeasyin.com:8080/dashboard/removefingerprint')
            .then((res) => {
                    // console.log("removed",res.data);
                    if (res.data.status) {
                        this.setState({
                            fingerprintRemovedOrNot: true,
                            fingerprintRemovedOrNotResponse: res.data.message });
                        window.location.reload();
                    } else {
                        this.setState({
                        fingerprintRemovedOrNot: false,
                        fingerprintRemovedOrNotResponse: res.data.message });
                        // window.location.reload();
                    }
                console.log(res.data);
                console.log(this.state.fingerprintRemovedOrNotResponse);
                console.log(this.state.fingerprintRemovedOrNot);
                }
            ).catch((error) => {
            console.log(error)
        });
    }

    // Mount these or execute these each time page render/refresh
    componentDidMount()
    {
        this.dashboardHome();
        this.checkForSession();
    }

    render() {
        return (
            <div className="App">
                {this.state.redirect ? <h1>{ this.state.message }</h1>: <h1>{ this.state.message }</h1> }
                <br/>
                {this.state.redirect ? <input id="submitGenerateFingerprint" className="inner" type="button" value="Generate/Add Fingerprint" onClick={this.handleEventSubmitGenerateFingerPrintClicked}/>: null}
                <br/>
                {this.state.redirect ? <h1>QR Code</h1>: null}
                <br/>
                    {this.state.qrPresentOrNot ? <QRCode value={ this.state.qrData }  />: <h1>{ this.state.qrFingerprintResponse }</h1>}
                <br/>
                {this.state.redirect ? <input id="submitRemoveExistingFingerprint" className="inner" type="button" value="Remove/Delete Existing Fingerprint" onClick={this.handleEventSubmitRemoveExistingFingerprintClicked}/>: null}
                <br/>
                {this.state.fingerprintRemovedOrNot ? <h1>{ this.state.fingerprintRemovedOrNotResponse }</h1>: <h1>{ this.state.fingerprintRemovedOrNotResponse }</h1> }
                {this.state.redirect ? <input id="submitLogout" className="inner" type="button" value="Logout" onClick={this.handleEventSubmitLogOutClicked}/>: null}
                <footer>&copy; oneeasyin 2020</footer>
            </div>
        );
    }
}