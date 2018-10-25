import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Search } from "antd";
import { themeColor } from "../../theme/colors";
import { Input, Icon } from "antd";
import axios from "axios";
import PatientModal from "./PatientModal";

import {
  FormGroup,
  FormControl,
  InputGroup,
  DropdownButton,
  MenuItem,
  Form
} from "react-bootstrap";
import SearchDocModal from "./SearchDocModal";
import UserList from "./UserList";
import Button from "../../common/Button";

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
  innerComponent: {
    borderRadius: 5,
    margin: 24,
    padding: 24,
    background: themeColor.white
  },
  userList: {
    background: themeColor.snow0,
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0
  },
  table: {
    width: "100%",
    color: themeColor.dark1
  },
  tr: {
    fontWeight: "normal",
    padding: 4,
    borderBottom: "1px solid",
    borderColor: themeColor.grey0
  },
  th: {
    padding: 4,
    fontWeight: "normal"
  },
  more: {
    textAlign: "center",
    fontWeight: "bold",
    color: themeColor.dark1
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
      searchList: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.username, "onchange");
    this.setState({ show: true });
  };

  onSubmit = e => {
    e.preventDefault();
    //console.log(username);
    console.log(this.state.username, "onsubmit");
    console.log("here");
    this.setState({ show: true });
    this.setState({ viewType: "Doctor" });
    const username = this.setState.username;
    axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
      if (res.status === 200) {
        console.log(res.data);
        this.setState({ userList: res.data });
      }
      // this.state.searchList = _.filter(
      //   this.state.userList,

      //   {
      //     First_name: this.state.username,
      //     Last_Name: this.state.username
      //   }

      // function(result, search) {
      //   if (
      //     (userList, First_Name == search || userList, Last_Name == search)
      //   ) {
      //     (result[(userList, Last_Name)] = []).push(userList);
      //   }
      //   return result;
      // },
      // {}
      //);
      this.state.searchList = this.state.userList.filter(s =>
        Object.values(s).includes(this.state.username)
      );
      // const search = this.state.username;

      // this.state.searchList = this.state.userList.filter(function(search) {
      //   for (var i = 0; i < 3; i++) {
      //     if (userList[i].First_name == search) return userList[i];
      //     else if (userList[i].Last_Name == search) return userList[i];
      //     else if (
      //       userList[i].First_name == search ||
      //       userList[i].Last_Name == search
      //     )
      //       return userList[i];
      //   }
      // });

      //   if (
      //     search.First_name === search ||
      //     search.Last_Name === search ||
      //     search.specialization === search
      //   ) {
      //     return search;
      //   }
      // });

      // const search = this.state.username;
      // const searchList = this.state.userList.filter(function(search) {
      // for(var i=0;i<3;i++){
      //   if(userList[i]=== this.state.search)

      // }

      //}
      //   return this.state.userList[(0, 3)];
      //)};
      console.log(this.state.userList);
      console.log(this.state.searchList, "bindu");
    });
  };

  handleOpenModal(user) {
    const { userType } = this.props;
    this.state.viewType = "Doctor";

    this.setState({
      showModal: true,
      activeProfile: user.username
    });
    if (this.state.viewType === "Patient") {
      axios.get("http://127.0.0.1:8000/patient/history").then(res => {
        if (res.status === 200) {
          const mediHis = _.filter(res.data, {
            username: this.state.activeProfile
          });
          this.setState({ activeInfo: mediHis });
        }
      });
    } else {
      const docInfo = _.filter(this.state.userList, {
        username: user.username
      });
      this.setState({ activeInfo: docInfo });
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false, activeInfo: [] });
  }

  render() {
    const Search = Input.Search;
    const viewType = "Doctor";
    const searchval = "";
    const value = "";

    return (
      <div className={css(styles.box)}>
        {/* <Input.Search
          placeholder="input search text"
          onSearch={this.onSubmit}
          ref={this.saveInput}
          onClick={ref => console.log(ref)}
          onChange={this.onChange}
          enterButton
        
        /> */}
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="username"
              label="username"
              placeholder="Search"
              value={this.state.username}
              onChange={this.onChange}
            />
            <Button name="search" type="submit" />
          </FormGroup>
        </form>
        <br />
        {this.state.show ? (
          <div className={css(styles.innerComponent)}>
            <div className={css(styles.userList)}>
              <table className={css(styles.table)}>
                <tr className={css(styles.tr)}>
                  <th className={css(styles.th)}>ID</th>
                  <th className={css(styles.th)}>Name </th>
                  <th className={css(styles.th)}>Specialization</th>
                  <th className={css(styles.th)}>Hospital</th>
                  <th className={css(styles.th)}>More</th>
                </tr>
                {_.map(this.state.searchList, (user, key) => {
                  return (
                    <tr className={css(styles.tr)}>
                      <th className={css(styles.th)}>{key + 1}</th>
                      <th className={css(styles.th)}>{user.Last_Name}</th>
                      <th className={css(styles.th)}>
                        {viewType === "Patient"
                          ? user.gender
                          : user.specialization}
                      </th>
                      <th className={css(styles.th)}>
                        {viewType === "Patient" ? user.DOB : user.Hospital}
                      </th>
                      <th className={css(styles.more)}>
                        <a onClick={() => this.handleOpenModal(user)}>
                          <Icon type="down" theme="outlined" />
                        </a>
                      </th>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        ) : (
          ""
        )}{" "}
        {viewType === "Patient" ? (
          <PatientModal
            showModal={this.state.showModal}
            handleCloseModal={this.handleCloseModal}
            activeProfile={this.state.activeProfile}
            activeInfo={this.state.activeInfo}
          />
        ) : (
          <SearchDocModal
            showModal={this.state.showModal}
            handleCloseModal={this.handleCloseModal}
            activeProfile={this.state.activeProfile}
            activeInfo={this.state.activeInfo}
          />
        )}
      </div>
    );
  }
}
