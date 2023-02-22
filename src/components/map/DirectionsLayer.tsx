import { Layer, Source } from "react-map-gl";

export default function DirectionsLayer(props: directionLayerProps) {
  if (props.directions == null) return <></>;

  return (
    <Source id="polylineLayer" type="geojson" data={props.directions}>
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
  );
}

interface directionLayerProps {
  directions?: GeoJSON.Feature<GeoJSON.Geometry>;
}
