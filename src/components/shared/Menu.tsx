import AppBar from "@mui/material/AppBar";
import AuthentitcationContext from "../../contexts/AuthenticationContext";
import Authorized from "../auth/Authorized";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { deleteToken } from "../../utils/handleJwt";
import { useContext } from "react";

export default function Menu() {
  const { update, claims } = useContext(AuthentitcationContext);

  function getUserEmail(): string {
    if (claims.length === 0) return "";

    return claims!.filter((x) => x.name === "email")[0]!.value;
  }

  return (
    <Authorized
      authorized={
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                component={Link}
                to="/"
              >
                <Home />
              </IconButton>
              <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Hello, {getUserEmail()}
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => {
                    deleteToken();
                    update([]);
                  }}
                >
                  Logout
                </Button>
              </>
            </Toolbar>
          </AppBar>
        </Box>
      }
      notAuthorized={<></>}
    />
  );
}
