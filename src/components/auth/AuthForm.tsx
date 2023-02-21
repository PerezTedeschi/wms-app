import * as Yup from "yup";

import { Button, Stack } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import TextField from "../TextField";
import { userCredentialsModel } from "../../models/auth.models";

export default function AuthForm(props: authFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("This field is required.")
          .email("You have to insert a valid email."),
        password: Yup.string().required("This field is required."),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField
            displayName="Email"
            field="email"
            error={
              Boolean(formikProps.errors.email) &&
              Boolean(formikProps.touched.email)
            }
            helperText={
              Boolean(formikProps.touched.email) && formikProps.errors.email
            }
          />
          <TextField
            displayName="Password"
            field="password"
            type="password"
            error={
              Boolean(formikProps.errors.password) &&
              Boolean(formikProps.touched.password)
            }
            helperText={
              Boolean(formikProps.touched.password) &&
              formikProps.errors.password
            }
          />

          <Stack spacing={3} direction="row" justifyContent="flex-end" mt={3}>
            <Button
              color="primary"
              variant="contained"
              disabled={formikProps.isSubmitting}
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

interface authFormProps {
  model: userCredentialsModel;
  onSubmit(
    values: userCredentialsModel,
    actions: FormikHelpers<userCredentialsModel>
  ): void;
}
