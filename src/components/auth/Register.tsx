import { Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  authenticationResponseModel,
  userCredentialsModel,
} from "../../models/auth.models";
import { getClaims, saveToken } from "../../utils/handleJwt";
import { useContext, useState } from "react";

import AuthForm from "./AuthForm";
import AuthentitcationContext from "../../contexts/AuthenticationContext";
import { Box } from "@mui/system";
import DisplayErrors from "../DisplayErrors";
import { accountUrl } from "../../endpoints";
import axios from "axios";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthentitcationContext);
  const navigate = useNavigate();

  async function register(credentials: userCredentialsModel) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponseModel>(
        `${accountUrl}/create`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
      navigate("/");
    } catch (error: any) {
      setErrors([error.response.data]);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box m={3}>
        <Typography variant="h3">Register</Typography>
        <DisplayErrors errors={errors} />
        <AuthForm
          model={{ email: "", password: "" }}
          onSubmit={async (values) => await register(values)}
        />
      </Box>
      <Box m={3}>        
        <Button fullWidth component={Link} variant="contained" to="/" color="error">
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
