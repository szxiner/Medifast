import React, { Component } from "react";
import { FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { Icon } from "antd";
import { Clickable, StopPropagation } from "react-clickable";

const google = window.google;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      mylat: null,
      mylng: null,
      addressFinished: false,
      directions: undefined
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    const { count } = this.props;
  };

  onSubmit = e => {
    e.preventDefault();

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const locationString =
          results[0].geometry.location.lat().toString() +
          ", " +
          results[0].geometry.location.lng().toString();
        console.log(locationString);
        this.setState(
          {
            mylat: results[0].geometry.location.lat(),
            mylng: results[0].geometry.location.lng()
          },
          () => {
            const { lat, lng } = this.props;
            const { mylat, mylng } = this.state;
            const DirectionsService = new google.maps.DirectionsService();
            DirectionsService.route(
              {
                origin: new google.maps.LatLng(mylat, mylng),
                destination: new google.maps.LatLng(lat, lng),
                travelMode: google.maps.TravelMode.DRIVING
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  this.setState({
                    directions: result
                  });
                } else {
                  console.error(`error fetching directions ${result}`);
                }
              }
            );
            this.setState({
              addressFinished: true
            });
          }
        );
      }
    });
  };

  render() {
    const { lat, lng, w } = this.props;
    const { addressFinished } = this.state;
    const DoctorMap = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat: lat, lng: lng }} defaultZoom={14}>
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    ));
    const DoctorMapWithDirection = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat: lat, lng: lng }} defaultZoom={14}>
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));
    var link = "https:maps.google.com/?q=" + lat + "," + lng;
    return (
      <div>
        <a href={link} target="_blank">
          <Clickable>
            <DoctorMap
              containerElement={
                <div
                  style={{ height: `${w || 130}px`, width: `${w || 130}px` }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Clickable>
        </a>
      </div>
    );
  }
}
