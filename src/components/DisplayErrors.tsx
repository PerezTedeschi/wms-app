import { FormHelperText, Stack } from "@mui/material";

export default function DisplayErrors(props: displayErrorsProps) {
  return (
    <Stack spacing={3} direction="column">
      {props.errors ? props.errors.map((error, index) => (<FormHelperText error key={index}>{error}</FormHelperText>)) : null}
    </Stack>
  );
}

interface displayErrorsProps {
  errors?: string[];
}
