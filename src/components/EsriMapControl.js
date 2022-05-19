import React, { useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import BaseMap from "@arcgis/core/Basemap"
import TileLayer from "@arcgis/core/layers/TileLayer"
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import PropTypes from 'prop-types';

const EsriMapControl = (props) => {
	useEffect(() => {
		if (props.mapDiv?.current) {
			/**
			 * Initialize application
			 */
			//we'll need a lat, lon, and can edit (attributes???)
			//need a map center point
			//need to validate that the point is inside the state, throw an error if outside the state
			//default point to the state capital
			//3 data points produced, mapAaddress, locationText, latLon
			let canEdit = false;
			let myLat = 45.59005930608889;
			let myLon = -122.55657463861;
			
			//create a database override config
			let akBaseMap = new BaseMap({
				baseLayers: [
					new TileLayer({
						url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",
						title: "AK Base Layer"
					})
				]
			});

			const myMap = new Map({
				basemap: akBaseMap
			});

			const view = new MapView({
				container: props.mapDiv.current,
				map: myMap,
				center: [myLon, myLat],
				zoom: 10,
			});

			let attributes = {
				name: "attribute name",
				description: "this is where Tom Lives"
			}

			//https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/graphics/
			const simpleMarkerSymbol = {
				type: "simple-marker",
				color: [100, 80, 20],
				outline: {
					color: [255, 255, 255],
					width: 1
				}
			};

			const point = {
				type: "point",
				longitude: myLon,
				latitude: myLat
			};

			const pointGraphic = new Graphic({
				geometry: point,
				symbol: simpleMarkerSymbol,
				attributes: attributes,
				popupTemplate: {
					title: attributes.name,
					content: attributes.description
				}
			});

			const graphicsLayer = new GraphicsLayer();
			graphicsLayer.add(pointGraphic);

			//https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
			const sketchViewModel = new SketchViewModel({
				view: view,
				layer: graphicsLayer,
				updateOnGraphicClick: canEdit
			});

			// Listen to SketchViewModel's update event to show relevant data in a chart
			// as the graphics are being moved
			function onMove(event) {
				if (event.state === "complete" && !event.aborted) {
					//update the points after complete
					console.log(`longitude: ${event.graphics[0]?.geometry?.longitude}`);
					console.log(`latitude: ${event.graphics[0]?.geometry?.latitude}`);
				}
			}
			sketchViewModel.on("update", onMove);
			myMap.add(graphicsLayer);
		}
	}, [props.mapDiv]);

	return <div></div>
}

EsriMapControl.propTypes = {
	mapDiv: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
	])
}

export default EsriMapControl;