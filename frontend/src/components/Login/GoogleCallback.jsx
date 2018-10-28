import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../../common/Button";
import { FormGroup, FormControl } from "react-bootstrap";

export class GoogleCallback extends React.Component {

    constructor() {
        super();
    }
    /*
    onSubmit = e => {
        e.preventDefault();

        const access_token = this.props.match.params.accessToken;

        axios.post("http://127.0.0.1:8000/users-api/social/google-oauth2/", access_token).then(res => {
            if (res.status === 200) {
                this.props.history.push("/2fa");
            } else {
                //push("/login")
                //this.setState({ errorMsg: "Username and password does not match" });
            }http://eeee1a31.ngrok.io/users-api/social/google-oauth2/
        });
    };
    */
    
    render() {

        const access_token = this.props.match.params.accessToken;
        /*
        axios.post("http://127.0.0.1:8000/users-api/social/google-oauth2/", access_token).then(res => {
            if (res.status === 200) {
                this.props.history.push("/2fa");
            } else {
                //push("/login")
                //this.setState({ errorMsg: "Username and password does not match" });
            }
        });
        */

        return (<h1>Hello</h1>);
    }
    
}
export default connect(null) (GoogleCallback);