import React from "react";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuth) {
  //     <Redirect to="/dashboard" />;
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      <Redirect to="/dashboard" />;
    }
  }
  render() {
    return <div>Hello Dashboard</div>;
  }
}
