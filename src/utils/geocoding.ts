import axios from "axios";

export async function getCoordinates(address: string): Promise<coordinates | null> {
  const apiToken = process.env.REACT_APP_MAPBOX_API_TOKEN!;
  var response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiToken}&autocomplete=true&limit=1`
  );

  if (response!.data!.features.length > 0){
    const latitude = response.data.features[0]!.center[1];
    const longitude = response.data.features[0]!.center[0];
  
    return { latitude, longitude };
  }
  
  return null
}

export async function getDirections(p1: coordinates, p2: coordinates): Promise<GeoJSON.Position[][]> {
  const apiToken = process.env.REACT_APP_MAPBOX_API_TOKEN!;
  const result: GeoJSON.Position[][] = [];  
  const response = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${p1.longitude},${p1.latitude};${p2.longitude},${p2.latitude}?alternatives=false&continue_straight=false&geometries=geojson&overview=simplified&steps=false&access_token=${apiToken}`
  );

  let origen: GeoJSON.Position = [Number(p1.longitude), Number(p1.latitude)];
  response!.data!.routes[0].geometry.coordinates.forEach((x: any[]) => {
    const destination: GeoJSON.Position = [Number(x[0]), Number(x[1])];
    const coordinates: GeoJSON.Position [] = [origen, destination];
    result.push(coordinates);
    origen = destination;
  })

  return result;
}

export interface coordinates {
  latitude: string;
  longitude: string;
}
