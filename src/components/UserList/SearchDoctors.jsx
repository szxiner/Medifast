import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Search } from "antd";
import { themeColor } from "../../theme/colors";
import { Input, Icon, Divider, Row } from "antd";
import axios from "axios";
import PatientModal from "./PatientModal";
import UserList from "./UserList";
import button from "./button.css";
import UserView from "./UserView";
import UserCardDoc from "./UserCardDoc";
import searchbar from "./searchbar.css";

import {
  FormGroup,
  FormControl,
  DropdownButton,
  MenuItem,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import SearchDocModal from "./SearchDocModal";
//import Button from "../../common/Button";
const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "5%",
    width: "80%",
    // height: "100%",
    padding: 30,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  boxnew: {
    margin: "auto",
    marginTop: "0%",
    width: "100%",
    height: "150%",
    //padding: 30,
    backgroundColor: "#F0F0F0",
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    //paddingLeft: "35%",
    //paddingRight: "25%",
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },

  innerComponent: {
    borderRadius: 5,
    margin: 24,
    padding: 24,
    background: themeColor.white
  },
  userList: {
    background: "#E3F2FD",
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0
  },
  table: {
    width: "100%",
    color: themeColor.dark1
  },
  box2: {
    margin: "auto",
    marginTop: "3%",
    width: "100%",
    // height: "100%",
    //padding: 10,
    backgroundColor: "transparent",
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 5,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  tr: {
    fontWeight: "normal",
    padding: 4,
    borderBottom: "1px solid",
    borderColor: themeColor.grey0
  },
  th: {
    padding: 4,
    fontWeight: "600",
    color: "#1A237E    "
  },
  more: {
    textAlign: "center",
    fontWeight: "bold",
    color: themeColor.dark1
  },
  p: {
    font: "Cagliostro",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FF0000"
  },
  icon: {
    size: 100
  },
  FormGroup: {
    width: " 100%"
  },
  showIcon: {
    size: 300
  },
  noIcon: {
    height: 0,
    overflow: "hidden"
  }
});

export default class SearchDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      modal: false,
      show: false,
      viewType: "",
      activeProfile: null,
      activeInfo: [],
      value: "",
      search: [],
      searchList: [],
      search: "",
      search_lower: "",
      userList_lower: "",
      new_list: "",
      searchbar: true,
      noresults: false,
      isshowall: true,
      showIcon: true
    };
    this.showall = null;
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.onChange = this.onChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.search, "onchange");
  };

  onSubmit = e => {
    e.preventDefault();
    //console.log(search);
    console.log(this.state.search, "onsubmit");
    console.log("here");
    this.setState({ viewType: "Doctor" });
    //this.state.search = this.state.search.toLowerCase();
    this.state.search_lower = this.state.search.toLowerCase();
    console.log(this.state.search_lower, "lowercase");
    this.setState({ showIcon: false });
    axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
      if (res.status === 200) {
        console.log(res.data);
        this.setState({ userList: res.data });
        this.setState({ isshowall: false });
      }
      this.state.userList_lower = JSON.stringify(
        this.state.userList
      ).toLowerCase();
      console.log(this.state.userList_lower, "str");
      const filteredList = this.state.userList.filter(s => {
        const arr = _.map(Object.values(s), function(o) {
          if (typeof o === "string") {
            return o.toLowerCase();
          } else {
            return o;
          }
        });
        // if (arr.includes("/this.state.search.toLowerCase()*/")) {
        // if (_.includes(this.state.search.toLowerCase())) {
        if (arr.includes(this.state.search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });

      console.log(filteredList, "this is filtered list");

      this.setState({ searchList: filteredList });

      if (this.state.searchList.length > 0) {
        this.setState({
          show: true,
          noresults: false

          //activeProfile: user.search
        });
      } else if (this.state.searchList.length === 0) {
        this.setState({
          noresults: true,
          show: false
          //activeProfile: user.search
        });
      }
      console.log(this.state.userList);
      console.log(this.state.searchList, "bindu");
    });
  };

  onSubmit2 = e => {
    e.preventDefault();

    // this.showall = <UserList userType={"Patient"} />;
    this.setState({ isshowall: true });
    this.setState({ show: false });
    this.setState({ noresults: false });
    // this.setState({ searchbar: false });
  };

  handleOpenModal(user) {
    const { userType } = this.props;
    this.state.viewType = "Doctor";
    this.state.showModal = true;
    this.setState({ searchbar: false });

    const docInfo = _.filter(this.state.userList, {
      search: user.search
    });
    this.setState({ activeInfo: docInfo });
  }

  handleCloseModal() {
    this.setState({ showModal: false, activeInfo: [], searchbar: true });
  }

  render() {
    const { type, currentUser } = this.props;
    const Search = Input.Search;

    return (
      <div className={css(styles.boxnew)}>
        {this.state.searchbar ? (
          <div
            style={{
              //textAlign: "center",
              paddingTop: "2%",

              height: "100%",
              //justifyContent: "center",
              display: "flex"
            }}
          >
            <h3
              style={{
                fontSize: 28,
                fontFamily: "Crimson Text, serif",
                fontWeight: 600,
                marginTop: 8,
                justifyContent: "center"
              }}
            >
              Find doctors by name, specialty or zip code.{" "}
            </h3>
            &nbsp; &nbsp;
            <form onSubmit={this.onSubmit}>
              <FormGroup className={css(styles.FormGroup)}>
                {/* <h2
                  style={{
                    fontSize: 40,
                    textAlign: "center",
                    fontFamily: "Acme, sans-serif"
                  }}
                >
                  Find a Doctor
                </h2>
                <br />
                <h3
                  style={{
                    textAlign: "center",
                    Color: themeColor.grey1,
                    fontSize: 22
                  }}
                >
                  Our find a doctor tool assists you in choosing from our
                  diverse pool of health specialists. Discover better health &
                  wellness by using our doctor ratings & reviews to make your
                  choice.
                </h3>
                <br /> */}

                <InputGroup>
                  <FormControl
                    type="text"
                    name="search"
                    label="search"
                    placeholder="Search"
                    value={this.state.search}
                    onChange={this.onChange}
                    bsSize="large"
                  />
                  <InputGroup.Button bsSize="large">
                    <Button
                      bsStyle="primary"
                      type={this.onSubmit}
                      bsSize="large"
                    >
                      <Icon type="search" theme="outlined" />
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
            <br />
            {/* <h3
                style={{
                  display: "inline-block",
                  fontSize: 18
                }}
              >
                Not sure which doctor you are looking for?
              </h3>
              &nbsp; &nbsp; */}
            <div
              style={{
                //alignItems: "center",
                textAlign: "center"
              }}
            >
              <Divider type="vertical">OR</Divider>
              &nbsp;&nbsp;
              <div>
                <form
                  onSubmit={this.onSubmit2}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    bsStyle="primary"
                    type="submit"
                    onSubmit={this.onSubmit2}
                    style={{ fontSize: "30", display: "inline-block" }}
                  >
                    Show All Doctors{" "}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            //paddingTop: "5%",
            paddingLeft: "10%",
            paddingRight: "5%",
            paddingBottom: "2%"
          }}
        >
          {this.state.show ? (
            <div>
              {_.map(this.state.searchList, user => {
                return (
                  <UserCardDoc
                    type={"Doctor"}
                    currentUser={user}
                    activeInfo={user}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            //paddingTop: "5%",
            paddingLeft: "10%",
            paddingRight: "5%",
            paddingBottom: "2%"
          }}
        >
          {this.state.noresults ? (
            <div align="center">
              <p className={css(styles.p)}>
                <br />
                <br />{" "}
                <Icon
                  className={css(styles.icon)}
                  type="exclamation-circle"
                  theme="filled"
                />{" "}
                Oops! No Results!
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        {this.state.isshowall ? (
          <div className={css(styles.box2)}>
            {" "}
            <UserList userType={"Patient"} />;
          </div>
        ) : (
          ""
        )}

        <SearchDocModal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          activeProfile={this.state.activeProfile}
          activeInfo={this.state.activeInfo}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
