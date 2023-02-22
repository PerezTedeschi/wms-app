import { Box, Container } from "@mui/system";
import { coordinates, getCoordinates } from "../../utils/geocoding";

import AddressForm from "./AddressForm";
import MapView from "./MapView";
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { warehouseModel } from "../../models/warehouse.models";
import { warehouseUrl } from "../../endpoints";

export default function MapContainer() {
  const [showMap, setShowMap] = useState(false);
  const [addressCoordinates, setAddressCoordinates] =
    useState<coordinates | null>(null);
  const [warehouses, setWarehouses] = useState<warehouseModel[]>([]);

  const handleAddressSubmit = async (address: string) => {
    setShowMap(false);
    const origenCoordinates = await getCoordinates(address);
    const response = await axios.get(`${warehouseUrl}/find-closest/${origenCoordinates?.latitude}/${origenCoordinates?.longitude}`);
    
    setAddressCoordinates(origenCoordinates);
    setWarehouses(response.data);

    setShowMap(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Enter an address
      </Typography>
      <AddressForm onSubmit={handleAddressSubmit} />
      <Box m={3}/>
      {showMap && (
        <MapView coordinates={addressCoordinates!} warehouses={warehouses} />
      )}
    </Container>
  );
}
