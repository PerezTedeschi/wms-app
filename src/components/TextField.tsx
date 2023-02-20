import { Field } from "formik";
import { Box, TextField as MuiTextFild } from "@mui/material"

export default function TextField(props: textFieldProps) {
    return (
        <div>
            <Field
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
    )
}

interface textFieldProps {
    field: string;
    displayName: string;
    error: boolean;
    helperText: boolean | string | undefined;
}
