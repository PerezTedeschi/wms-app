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

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthentitcationContext);
  const navigate = useNavigate();

  async function login(credentials: userCredentialsModel) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponseModel>(
        `${accountUrl}/login`,
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
        <Typography variant="h3">Login</Typography>
        <DisplayErrors errors={errors} />
        <AuthForm
          model={{ email: "", password: "" }}
          onSubmit={async (values) => await login(values)}
        />
      </Box>
      <Box m={3}>        
        <Button fullWidth component={Link} variant="contained" to="/register" color="secondary">
          Register
        </Button>
      </Box>
    </Container>
  );
}
