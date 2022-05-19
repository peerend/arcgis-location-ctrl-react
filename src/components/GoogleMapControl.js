import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const GoogleMapControl = (props) => {
	//https://developers.google.com/maps/documentation/javascript/reference/map
	useEffect(() => {
    const map = new window.google.maps.Map(props.mapDiv?.current, {
      center: props.center,
      zoom: props.zoom,
			marker: props.marker,
    });
		const marker = new window.google.maps.Marker({
			position: props.center,
			map: map,
			draggable: true,
		});
		
		marker.addListener("dragend", () => {
			console.log(`longitude: ${marker.getPosition().lng()}`);
			console.log(`latitude: ${marker.getPosition().lat()}`);
		});
  });
}

GoogleMapControl.propTypes = {
	mapDiv: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
	]),
	center: PropTypes.object,
	zoom: PropTypes.number,
	onClick: PropTypes.func,
}

export default GoogleMapControl;