import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

class Map extends Component {
  render() {
    const { lat, lng } = this.props;
    const DoctorMap = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat: lat, lng: lng }} defaultZoom={14}>
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    ));
    return (
      <div>
        <DoctorMap
          containerElement={<div style={{ height: `240px`, width: "240px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Map;
