import { Button, Grid } from "@mui/material";

import { Link } from "react-router-dom";
import MapContainer from "../components/MapContainer";
import WarehouseGrid from "../components/WarehouseGrid";

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
      <Grid item xs={12}>
        <MapContainer />
      </Grid>
    </Grid>
  );
}
