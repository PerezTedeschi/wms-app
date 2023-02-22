import { Button, Grid } from "@mui/material";

import Authorized from "../components/auth/Authorized";
import { Link } from "react-router-dom";
import MapContainer from "../components/map/MapContainer";
import WarehouseGrid from "../components/warehouse/WarehouseGrid";

export default function HomePage() {
  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <WarehouseGrid></WarehouseGrid>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to="/create" variant="contained">
          Create
        </Button>
      </Grid>
      <Authorized
        authorized={
          <Grid item xs={12}>
            <MapContainer />
          </Grid>
        }
        notAuthorized={<></>}
        role="manager"
      ></Authorized>
    </Grid>
  );
}
