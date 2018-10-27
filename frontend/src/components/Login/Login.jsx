import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";
import Button from "../../common/Button";
import { FormGroup, FormControl } from "react-bootstrap";
import GoogleLoginButton from "./GoogleLoginButton";

/*
'use strict';

const createApplication = require('./');
const simpleOauthModule = require('./../');
*/

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo: {
    textAlign: "center"
  },
  clickMe: {
    textAlign: "center"
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  box1: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: SecondaryThemeColor.white,
    color: SecondaryThemeColor.aegean2,
    borderColor: SecondaryThemeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo1: {
    textAlign: "center"
  },
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: SecondaryThemeColor.red1
  }
});

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      primaryColor: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
      };

    /*
    createApplication(({ app, callbackUrl }) => {
        const oauth2 = simpleOauthModule.create({
            client: {
                id: '1091955405168-v4i4qp61j8h6vv60cf6t8ivpa9vdt8tr.apps.googleusercontent.com',
                secret: 'B-gBwosDSJ3H_njhH4IfWX_g',
            },
            auth: {
                tokenHost: 'https://google.com',
                tokenPath: '/login/oauth/access_token',
                authorizePath: '/login/oauth/authorize',
            },
        });

        // Authorization uri definition
        const authorizationUri = oauth2.authorizationCode.authorizeURL({
            redirect_uri: 'http://localhost:3000/callback',
            scope: ['email', 'profile'],
            state: '3(#0/!~',
        }); 

        // Initial page redirecting to Github
        app.get('/auth', (req, res) => {
            console.log(authorizationUri);
            res.redirect(authorizationUri);
        });

        // Callback service parsing the authorization token and asking for the access token
        app.get('/callback', async (req, res) => {
            const code = req.query.code;
            const options = {
                code,
            };

            try {
                const result = await oauth2.authorizationCode.getToken(options);

                console.log('The resulting token: ', result);

                const token = oauth2.accessToken.create(result);

                return res.status(200).json(token)
            } catch (error) {
                console.error('Access Token Error', error.message);
                return res.status(500).json('Authentication failed');
            }
        });

        app.get('/', (req, res) => {
            res.send('Hello<br><a href="/auth">Log in with Github</a>');
        });
    });
    */

    // this.props.authenticateUser(user);
    axios.post("http://127.0.0.1:8000/users-api/auth", user).then(res => {
      if (res.status === 200) {
        this.props.history.push("/2fa");
      } else {
        this.setState({ errorMsg: "Username and password does not match" });
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({ primaryColor: !this.state.primaryColor });
  };

  render() {
    const { primaryColor } = this.state;
    return (
      <div className={css(primaryColor ? styles.box : styles.box1)}>
        <h1 className={css(primaryColor ? styles.logo : styles.logo1)}>
          Medifast
        </h1>
        <br />
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <label>Username:</label>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <br />
            <label>Password:</label>
            <FormControl
              className={css(styles.inputBox)}
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <br />
            <Button
              name="Log in"
              type="submit"
              color={primaryColor ? "primary" : "secondary"}
            />               
          </FormGroup>
            </form>
            <GoogleLoginButton/>
        <div className={css(primaryColor ? styles.error : styles.error1)}>
          {this.state.errorMsg}
        </div>
        <div align="center">
          <button onClick={this.onClick} className={css(styles.clickMe)}>
            Change Theme!!
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  storeUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { storeUser }
)(Login);
