import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const GoogleLoginButton = props => {

    //CReate callback url that points to a component that will handle the access token

    const responseGoogle = (response) => {
        axios.post("http://127.0.0.1:8000/users-api/social/google-oauth2/", response)
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

/*
    // OAuth Stuff 
    // Set the configuration settings
    const credentials = {
        client: {
            id: '1091955405168-v4i4qp61j8h6vv60cf6t8ivpa9vdt8tr.apps.googleusercontent.com',
            secret: 'B-gBwosDSJ3H_njhH4IfWX_g'
        },
        auth: {
            tokenHost: 'https://google.com'
        }
    };

    // Initialize the OAuth2 Library
    const oauth2 = require('simple-oauth2').create(credentials);

    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: 'http://localhost:3000',
        scope: ['email', 'profile'], // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
        state: '3(#0/!~'
    });

    const tokenConfig = {
        code: authorizationUri,
        redirect_uri: 'http://localhost:3000',
        scope: ['email', 'profile'], // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
    };

    // Save the access token
    try {
        const result = await oauth2.authorizationCode.getToken(tokenConfig);
        const accessToken = oauth2.accessToken.create(result);
        //TODO : Send accesstoken to backend
        console.log('Access Token', accessToken);

    } catch (error) {
        console.log('Access Token Error', error.message);
    }*/