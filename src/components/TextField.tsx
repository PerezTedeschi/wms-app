import { Box, TextField as MuiTextFild } from "@mui/material";

import { Field } from "formik";

export default function TextField(props: textFieldProps) {
  return (
    <div>
      <Field
        type={props.type}
        name={props.field}
        id={props.field}
        as={MuiTextFild}
        variant="outlined"
        color="primary"
        label={props.displayName}
        fullWidth
        error={props.error}
        helperText={props.helperText}
      />
      <Box m={0.5} />
    </div>
  );
}

interface textFieldProps {
  field: string;
  displayName: string;
  error: boolean;
  helperText: boolean | string | undefined;
  type: "text" | "password";
}

TextField.defaultProps = {
  type: "text",
};
