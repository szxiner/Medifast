import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const GoogleLoginButton = props => {

    //CReate callback url that points to a component that will handle the access token

    console.log("props",props)
    const responseGoogle = (response) => {

        axios.post("http://127.0.0.1:8000/users-api/social/google-oauth2/", response).then(res => {
            if (res.status === 200) {
                props.history.push("/2fa");
            } else if (res.status === 201) {
                //props
                return true;
            } else {
                //Return error message on login
                this.setState({ errorMsg: "Username and password does not match" });
            }
        });
        //Based on response, we either push to /2fa or complete registration
        console.log(response);
        
    }

    return (
        <GoogleLogin
            clientId="1091955405168-v4i4qp61j8h6vv60cf6t8ivpa9vdt8tr.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            //responseType='code'
            //uxMode='redirect'
            className="loginBtn loginBtn--google"
            prompt="select_account"
            redirectUri="http://localhost:3000/callback/"
        />

    );
};
export default GoogleLoginButton;