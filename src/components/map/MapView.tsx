import "mapbox-gl/dist/mapbox-gl.css";

import { Looks3, LooksOne, LooksTwo } from "@mui/icons-material";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { coordinates, getDirections } from "../../utils/geocoding";
import { useEffect, useState } from "react";

import DirectionsLayer from "./DirectionsLayer";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { warehouseModel } from "../../models/warehouse.models";

import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function MapView(props: viewMapProps) {
  const apiToken = process.env.REACT_APP_MAPBOX_API_TOKEN;
  const [directions, setDirections] =
    useState<GeoJSON.Feature<GeoJSON.Geometry>>();
  useEffect(() => {
    if (props.warehouses.length > 0) {
      const { latitude, longitude } = props.warehouses[0];
      const closestLocation: coordinates = { latitude, longitude };

      getDirections(props.coordinates, closestLocation).then((response) => {
        const GeoJSONdata: GeoJSON.Feature<GeoJSON.Geometry> = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "MultiLineString",
            coordinates: response,
          },
        };
        setDirections(GeoJSONdata);
      });
    }
  }, [setDirections, props.coordinates, props.warehouses]);

  return (
    <div>
      <Map
        initialViewState={{
          longitude: Number(props.coordinates.longitude),
          latitude: Number(props.coordinates.latitude),
          zoom: 15,
        }}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={apiToken}
      >
        <NavigationControl />
        <Marker
          longitude={Number(props.coordinates.longitude)}
          latitude={Number(props.coordinates.latitude)}
          anchor="bottom"
        >
          <PinDropIcon sx={{ color: "red" }} />
        </Marker>
        {props.warehouses.map((warehouse, index) => (
          <Marker
            key={warehouse.id}
            longitude={Number(warehouse.longitude)}
            latitude={Number(warehouse.latitude)}
            anchor="bottom"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {index === 0 && <LooksOne />}
              {index === 1 && <LooksTwo />}
              {index === 2 && <Looks3 />}
              <span>{warehouse.code}</span>
            </div>
          </Marker>
        ))}
        <DirectionsLayer directions={directions} />
      </Map>
    </div>
  );
}

interface viewMapProps {
  coordinates: coordinates;
  warehouses: warehouseModel[];
}
