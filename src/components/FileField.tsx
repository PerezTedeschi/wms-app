import { Box, Button, FormHelperText } from "@mui/material";

import { ChangeEventHandler } from "react";

export default function FileField(props: fileFieldProps) {
  return (
    <div>
      <input
        name={props.field}
        id={props.field}
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor={props.field}>
        <Button variant="contained" component="span">
            {props.displayName}
        </Button>
      </label>
      <FormHelperText
        error= {props.error}
        style={{ margin: "3px 14px 0" }}
      >
        {props.helperText}
      </FormHelperText>
      <Box m={0.5} />
    </div>
  );
}

interface fileFieldProps {  
  field: string;
  displayName: string;
  error: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  helperText: boolean | string | undefined;
}
