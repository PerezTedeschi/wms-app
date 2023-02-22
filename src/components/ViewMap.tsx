import "mapbox-gl/dist/mapbox-gl.css";

import { Looks3, LooksOne, LooksTwo } from "@mui/icons-material";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import { coordinates, getDirections } from "../utils/geocoding";
import { useEffect, useState } from "react";

import { Alert } from "@mui/material";
import Home from "@mui/icons-material/Home";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { warehouseModel } from "../models/warehouse.models";

export default function ViewMap(props: viewMapProps) {
  const apiToken = process.env.REACT_APP_MAPBOX_API_TOKEN;
  const [directions, setDirections] =
    useState<GeoJSON.Feature<GeoJSON.Geometry>>();
  useEffect(() => {
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
            {index == 0 && <LooksOne />}
            {index == 1 && <LooksTwo />}
            {index == 2 && <Looks3 />}
          </Marker>
        ))}        
        <Source id="polylineLayer" type="geojson" data={directions}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5,
            }}
          />
        </Source>
      </Map>
    </div>
  );
}

interface viewMapProps {
  coordinates: coordinates;
  warehouses: warehouseModel[];
}
