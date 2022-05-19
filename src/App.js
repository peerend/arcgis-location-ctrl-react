import React, { useRef, useEffect, Fragment } from "react";
import "./App.css";
import EsriMapControl from './components/EsriMapControl';
import GoogleMapControl from "./components/GoogleMapControl";
import GoogleMapRenderer from "./components/GoogleMapRenderer";

export default function App() {

  const [loading, setLoading] = React.useState(true);

  const mapDiv = useRef(null);
  let isEsri = false;
  useEffect(() => { 
    if (mapDiv.current) {
      setLoading(false);
    }
  },[mapDiv]);

  return  (
    <Fragment>
      <div className="mapDiv" ref={mapDiv}></div>
      {isEsri &&
      <EsriMapControl
        mapDiv={mapDiv}>
      </EsriMapControl> 
      }
      {!isEsri && 
      <GoogleMapRenderer
        mapDiv={mapDiv}>
      </GoogleMapRenderer>
      }
    </Fragment>
  );
}