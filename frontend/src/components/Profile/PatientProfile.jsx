import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { List } from "react-content-loader";
import { Upload, message, Avatar, Button, Alert } from "antd";
import { StyleSheet, css } from "aphrodite";
import AppointmentCard from "../Appointment/AppointmentCard";

import { FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  patientInfo: {
    padding: 12,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: "3em",
    marginBottom: "3%"
  },
  appt: {
    marginTop: "3%",
    paddingLeft: 24,
    fontSize: 20,
    fontWeight: "bold"
  },
  healthy: {
    fontSize: 16,
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "10%"
  },
  appointment: {
    height: "92%",
    width: "96%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 28
  },
  profile: {
    height: "96%",
    width: "96%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#ffffff"
  },
  billing: {
    height: "92%",
    width: "96%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 28
  },
  flexRow: {
    flexDirection: "row",
    display: "flex"
  },
  flexColumn: {
    flexDirection: "column",
    display: "flex"
  },
  flexBody: {
    display: "flex"
  },
  header: {
    textAlign: "center",
    position: "relative",
    height: 200,
    backgroundImage: "linear-gradient(#82ccdd, #4a69bd)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    borderBottomLeftRadius: "70% 20%",
    borderBottomRightRadius: "70% 20%"
  },
  profileInfo: {
    marginTop: "25%",
    padding: 24,
    fontSize: 20,
    lineHeight: "3vw",
    textAlign: "center"
  },
  modal: {
    backgroundColor: themeColor.white,
    position: "relative",
    border: "1px solid",
    borderRadius: 3,
    //borderColor: themeColor.grey0,
    padding: 40,
    marginTop: "10%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "10%",
    width: "auto",
    height: "auto"
  },
  small_modal: {
    backgroundColor: themeColor.white,
    position: "relative",
    borderRadius: 3,
    //borderColor: themeColor.grey0,
    padding: 10,
    marginTop: "10%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "10%",
    width: "auto",
    height: "auto"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: "3em",
    marginBottom: "3%"
  },
  expanded: {
    height: "auto"
  },
  unexpanded: {
    height: 0,
    overflow: "hidden"
  },
  alert: {
    fontSize: "30"
  }
});

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

class PatientProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextAppointment: undefined,
      loading: true,
      imageUrl: undefined,
      open: false,
      securityAns: "",
      securityAns2: "",
      securityQ: "",
      securityQ2: "",
      username: "",
      pwd: false,
      pwd_changed: false,
      set_ques: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({ pwd_changed: false });
  };

  handleClickOpen1 = () => {
    this.setState({ pwd: true });
    this.setState({ set_ques: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ pwd: false });
  };

  handleChange = info => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl
        })
      );
    }
  };

  componentDidMount = () => {
    const { auth } = this.props;
    const { username } = auth.user;
    axios.get("http://localhost:8000/doctor/bookings").then(res => {
      const list = _.filter(res.data, { patientusername: username });
      if (list.length !== 0) {
        const sort = _.sortBy(list, o => {
          return new moment(o.bdate);
        });
        this.setState({
          nextAppointment: sort[0],
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { auth } = this.props;
    this.state.username = auth.user.username;
    console.log(this.state.user, "user");
    console.log(this.state.username, "username");

    this.setState({ password: this.state.password });
    if (
      this.state.securityQ === "Select Security Question 1" ||
      this.state.securityQ2 === "Select Security Question 2"
    ) {
      this.setState({
        errorMsg_onSubmit1: "Please Select Security Question"
      });
    } else {
      if (this.state.securityAns === "" || this.state.Ans2 === "") {
        this.setState({ errorMsg_onSubmit2: "Please enter answers." });
      } else {
        const user = {
          username: this.state.username,
          securityQ: this.state.securityQ,
          securityAns: this.state.securityAns,
          securityQ2: this.state.securityQ2,
          securityAns2: this.state.securityAns2
        };
        axios
          .post(`http://127.0.0.1:8000/users-api/${this.state.username}/`, {
            securityQ: this.state.securityQ,
            securityQ2: this.state.securityQ2,
            securityAns: this.state.securityAns,
            securityAns2: this.state.securityAns2
          })
          .then(res => {
            console.log(res.status);
            console.log(this.state.password);
            console.log(res.data.securityQ);
            if (res.status === 200) {
              console.log("success");
              this.setState({ show: false });
              this.setState({ showmsg: true });
              this.setState({ set_ques: true });
            } else {
              this.setState({
                errorMsg: "Error"
              });
            }
          });
      }
    }
  };

  onSubmit_pwd = e => {
    e.preventDefault();
    const { auth } = this.props;
    this.state.username = auth.user.username;
    console.log(this.state.user, "user");
    console.log(this.state.username, "username");
    console.log(this.state.user, "this is user");
    console.log(this.state.username, "this is username");

    this.setState({ password: this.state.password });
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({
        errorMsg_onSubmit3: "Please complete all the fields."
      });
    } else {
      if (this.state.password != this.state.confirmPassword) {
        this.setState({ errorMsg_onSubmit4: "Passwords do not match" });
      } else {
        axios
          .post(`http://127.0.0.1:8000/users-api/${this.state.username}/`, {
            password: this.state.password
          })
          .then(res => {
            console.log(res.status);
            console.log(this.state.password);
            console.log(res.data.securityQ);
            if (res.status === 200) {
              console.log("success");
              this.setState({ show: false });
              this.setState({ showmsg: true });
              this.setState({ pwd_changed: true });
            } else {
              this.setState({
                errorMsg: "Error"
              });
            }
          });
      }
    }
  };

  render() {
    const { user } = this.props;
    const { loading, imageUrl } = this.state;
    return (
      <div className={css(styles.flexBody)}>
        <div className={css(styles.flexColumn)}>
          <div style={{ flex: "1 1 360px", width: "520px" }}>
            <div className={css(styles.appointment)}>
              <span style={{ fontWeight: "bold" }}>Upcoming Appointments:</span>
              <hr />
              {loading ? (
                <List />
              ) : (
                <div>
                  {!!this.state.nextAppointment ? (
                    <div>
                      <AppointmentCard
                        size="small"
                        appointment={this.state.nextAppointment}
                      />
                    </div>
                  ) : (
                    <div className={css(styles.healthy)}>
                      <br />
                      <span style={{ fontSize: 36 }}>👏</span>
                      <br />
                      <br />- No appointment found. Stay healthy! -
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: "1 1 360px", width: "520px" }}>
            <div className={css(styles.billing)}>
              <span style={{ fontWeight: "bold" }}>Billing:</span>
            </div>
          </div>
        </div>
        <div className={css(styles.flexRow)}>
          <div style={{ flex: "1 1 360px", width: "520px" }}>
            <div className={css(styles.profile)}>
              <div className={css(styles.header)}>
                <div
                  style={{
                    paddingTop: "12%",
                    paddingBottom: "8%",
                    color: "#ffffff",
                    fontSize: 28,
                    fontWeight: "bold"
                  }}
                >
                  My Profile
                </div>
                {!!imageUrl ? (
                  <Avatar src={imageUrl} size={128} />
                ) : (
                  <Avatar size={128} icon="user" />
                )}
                <br />
                <br />
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  <Button>Change Avatar</Button>
                </Upload>
              </div>
              <div className={css(styles.profileInfo)}>
                <span style={{ fontWeight: "bold" }}>Name: </span>
                {user.First_name} {user.Last_Name}
                <br />
                <span style={{ fontWeight: "bold" }}>Current Plan: </span>
                Medicare Standard
                <br />
                <br />
                <br />
                <Button
                  type="primary"
                  onClick={this.handleClickOpen}
                  style={{
                    width: "80%",
                    height: 36,
                    borderRadius: 20,
                    borderColor: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "#1e3799"
                  }}
                >
                  Update Security Question
                </Button>
                <Modal show={this.state.open} onHide={this.handleClose}>
                  <div
                    className={
                      !this.state.set_ques
                        ? css(styles.expanded)
                        : css(styles.unexpanded)
                    }
                  >
                    <div className={css(styles.modal)}>
                      <form onSubmit={this.onSubmit}>
                        <div align="center" className={css(styles.heading)}>
                          <ControlLabel>Security Question</ControlLabel>
                        </div>
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          onChange={this.onChange}
                          name="securityQ"
                        >
                          <option>Select Securtiy Question 1</option>
                          <option value="What's the name of your first teacher?">
                            What's the name of your first teacher?
                          </option>
                          <option value="What is your dream job?">
                            What is your dream job?
                          </option>
                          <option value="What is your favourite color?">
                            What is your favourite color?
                          </option>
                        </FormControl>
                        <br />
                        <FormControl
                          className={css(styles.inputBox)}
                          type="text"
                          name="securityAns"
                          label="Security Answer"
                          placeholder="Enter your answer here."
                          value={this.state.securityAns}
                          onChange={this.onChange}
                        />
                        <br />
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          onChange={this.onChange}
                          name="securityQ2"
                        >
                          <option>Select Securtiy Question 2</option>
                          <option value="What's the name of your first school?">
                            What's the name of your first school?
                          </option>
                          <option value="What's the name of your first pet?">
                            What's the name of your first pet?
                          </option>
                          <option value="What is your favourite food?">
                            What is your favourite food?
                          </option>
                        </FormControl>
                        <br />
                        <FormControl
                          className={css(styles.inputBox)}
                          type="text"
                          name="securityAns2"
                          label="Security Answer"
                          placeholder="Enter your answer here."
                          value={this.state.securityAns2}
                          onChange={this.onChange}
                        />
                        <div align="center" flex-direction="row">
                          <Button
                            type="primary"
                            style={{
                              width: "80%",
                              marginTop: 24,
                              height: 36,
                              borderRadius: 20,
                              borderColor: "#fff",
                              fontWeight: "bold",
                              backgroundColor: "#1e3799"
                            }}
                            onChange={this.onChange}
                            onClick={this.onSubmit}
                          >
                            Save
                          </Button>
                          <Button
                            type="primary"
                            style={{
                              width: "80%",
                              marginTop: 24,
                              height: 36,
                              borderRadius: 20,
                              borderColor: "#fff",
                              fontWeight: "bold",
                              backgroundColor: "#4a69bd"
                            }}
                            onChange={this.onChange}
                            onClick={this.handleClose}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={css(styles.small_modal)}>
                    <div
                      className={
                        this.state.set_ques
                          ? css(styles.expanded)
                          : css(styles.unexpanded)
                      }
                    >
                      <Alert
                        message="Updated Security Questions."
                        description="You can reset your forgotten password using these security questions. "
                        type="success"
                        showIcon
                        fontSize="30"
                      />
                    </div>
                  </div>
                </Modal>
                <br />
                <Button
                  type="primary"
                  onClick={this.handleClickOpen1}
                  style={{
                    width: "80%",
                    marginTop: 24,
                    height: 36,
                    borderRadius: 20,
                    borderColor: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "#4a69bd"
                  }}
                >
                  Change Password
                </Button>
                <Modal show={this.state.pwd} onHide={this.handleClose}>
                  <div
                    className={
                      !this.state.pwd_changed
                        ? css(styles.expanded)
                        : css(styles.unexpanded)
                    }
                  >
                    <div className={css(styles.modal)}>
                      <form onSubmit={this.onSubmit}>
                        <div align="center" className={css(styles.heading)}>
                          <ControlLabel>Update Password</ControlLabel>
                        </div>
                        <FormGroup>
                          <ControlLabel>Enter New Password:</ControlLabel>
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
                          <ControlLabel>Confirm Password:</ControlLabel>
                          <FormControl
                            className={css(styles.inputBox)}
                            type="password"
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                        <div align="center">
                          <Button
                            type="primary"
                            style={{
                              width: "80%",
                              marginTop: 24,
                              height: 36,
                              borderRadius: 20,
                              borderColor: "#fff",
                              fontWeight: "bold",
                              backgroundColor: "#1e3799"
                            }}
                            onChange={this.onChange}
                            onClick={this.onSubmit_pwd}
                          >
                            Save
                          </Button>
                          <Button
                            type="primary"
                            style={{
                              width: "80%",
                              marginTop: 24,
                              height: 36,
                              borderRadius: 20,
                              borderColor: "#fff",
                              fontWeight: "bold",
                              backgroundColor: "#4a69bd"
                            }}
                            onChange={this.onChange}
                            onClick={this.handleClose}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={css(styles.small_modal)}>
                    <div
                      className={
                        this.state.pwd_changed
                          ? css(styles.expanded)
                          : css(styles.unexpanded)
                      }
                    >
                      <Alert
                        message="Password updated successfully!"
                        description="Please use new password from next login"
                        type="success"
                        showIcon
                        fontSize="30"
                      />
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PatientProfile);

/* <Grid style={{ width: "100%" }}>
<Row>
  <Col xs={12} md={8}>
    <h1>Welcome Back {user.First_name}</h1>
    <br />
    <div className={css(styles.patientInfo)}>
      <div>
        Name: {user.First_name} {user.Last_Name}
      </div>
      <div>Date of Birth: {user.DOB}</div>
    </div>
  </Col>
  <Col xs={6} md={4}>
    <img src={medical} width="80%" />
  </Col>
</Row>
<Row>
  {loading ? (
    <List />
  ) : (
    <div>
      {!!this.state.nextAppointment ? (
        <div>
          <hr />
          <div className={css(styles.appt)}>
            Your Upcoming Appointment:
          </div>
          <AppointmentCard appointment={this.state.nextAppointment} />
        </div>
      ) : (
        <div className={css(styles.healthy)}>
          - No appointment found. Stay healthy! -
        </div>
      )}
    </div>
  )}
</Row>
</Grid> */
