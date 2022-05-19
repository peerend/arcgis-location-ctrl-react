import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapControl from "./GoogleMapControl";
import {MY_KEY} from "../GoogleApiKey"

const GoogleMapRenderer = (props) => {
  //will need to use these in the app once we're storing zoom and center
  const [zoom, setZoom] = useState(12); // initial zoom
  const [center, setCenter] = useState({
    lat: 45.5,
    lng: -122.5,
  });
	//https://developers.google.com/maps/documentation/javascript/react-map
  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        // return <Spinner />;
        return <div>Loading</div>
      case Status.FAILURE:
        // return <ErrorComponent />;
        return <div>Failure</div>
      default:
        return (<GoogleMapControl 
          mapDiv={props.mapDiv}
          center={center}
          zoom={zoom}>
        </GoogleMapControl>
        );
    }
  }
  return (
    <Wrapper 
      apiKey={MY_KEY}
      render={render}>
    </Wrapper>
  )
}
GoogleMapRenderer.propTypes = {
	mapDiv: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
	])
}

export default GoogleMapRenderer;