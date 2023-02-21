import { Alert, Stack } from "@mui/material";

export default function DisplayErrors(props: displayErrorsProps) {
  return (
    <Stack spacing={3} direction="column" mt={3} mb={3}>
      {props.errors ? props.errors.map((error, index) => (<Alert severity="error" key={index}>{error}</Alert>)) : null}
    </Stack>
  );
}

interface displayErrorsProps {
  errors?: string[];
}
