import * as Yup from "yup";

import { Form, Formik } from "formik";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import DisplayErrors from "../shared/DisplayErrors";
import FileField from "../shared/FileField";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "../shared/TextField";
import axios from "axios";
import { getCoordinates } from "../../utils/geocoding";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { warehouseCreateModel } from "../../models/warehouse.models";
import { warehouseUrl } from "../../endpoints";

// @ts-ignore
import { NotificationManager } from "react-notifications";

const initialValues: warehouseCreateModel = {
  code: "",
  name: "",
  address: "",
  state: "",
  country: "",
  zip: "",
};

export default function CreateWarehouse() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function createWarehouse(warehouse: warehouseCreateModel) {
    const coordinates = await getCoordinates(warehouse.address);
    if (coordinates != null) {
      const formData = new FormData();
      if (warehouse.file) formData.append("file", warehouse.file);
      formData.append("code", warehouse.code);
      formData.append("name", warehouse.name);
      formData.append("address", warehouse.address);
      formData.append("state", warehouse.state);
      formData.append("country", warehouse.country);
      formData.append("zip", warehouse.zip);
      formData.append("longitude", coordinates.longitude);
      formData.append("latitude", coordinates.latitude);
      try {
        await axios({
          method: "post",
          url: warehouseUrl,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/");
        NotificationManager.success("Warehouse was successfully created.");
      } catch (error: any) {
        if (error.response.data) setErrors(error.response.data);
      }
    } else {
      setErrors(["The address you entered is not valid."]);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box m={3}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await createWarehouse(values);
          }}
          validationSchema={Yup.object({
            code: Yup.string().required("This field is required"),
            name: Yup.string().required("This field is required"),
            address: Yup.string().required("This field is required"),
            state: Yup.string().required("This field is required"),
            country: Yup.string().notRequired(),
            zip: Yup.string().notRequired(),
            file: Yup.mixed().required("A list is required"),
          })}
        >
          {(formikProps) => (
            <Form>
              <TextField
                field="code"
                displayName="Code"
                error={
                  Boolean(formikProps.errors.code) &&
                  Boolean(formikProps.touched.code)
                }
                helperText={
                  Boolean(formikProps.touched.code) && formikProps.errors.code
                }
              />
              <TextField
                field="name"
                displayName="Name"
                error={
                  Boolean(formikProps.errors.name) &&
                  Boolean(formikProps.touched.name)
                }
                helperText={
                  Boolean(formikProps.touched.name) && formikProps.errors.name
                }
              />
              <TextField
                field="address"
                displayName="Address"
                error={
                  Boolean(formikProps.errors.address) &&
                  Boolean(formikProps.touched.address)
                }
                helperText={
                  Boolean(formikProps.touched.address) &&
                  formikProps.errors.address
                }
              />
              <TextField
                field="state"
                displayName="State"
                error={
                  Boolean(formikProps.errors.state) &&
                  Boolean(formikProps.touched.state)
                }
                helperText={
                  Boolean(formikProps.touched.state) && formikProps.errors.state
                }
              />
              <TextField
                field="country"
                displayName="Country"
                error={
                  Boolean(formikProps.errors.country) &&
                  Boolean(formikProps.touched.country)
                }
                helperText={
                  Boolean(formikProps.touched.country) &&
                  formikProps.errors.country
                }
              />
              <TextField
                field="zip"
                displayName="Zip"
                error={
                  Boolean(formikProps.errors.zip) &&
                  Boolean(formikProps.touched.zip)
                }
                helperText={
                  Boolean(formikProps.touched.zip) && formikProps.errors.zip
                }
              />
              <FileField
                field="file"
                displayName="Select a List"
                onChange={(event: any) => {
                  formikProps.setFieldTouched("file", true);
                  if (event.currentTarget.files[0])
                    formikProps.setFieldValue(
                      "file",
                      event.currentTarget.files[0]
                    );
                }}
                error={
                  Boolean(formikProps.errors.file) &&
                  (Boolean(formikProps.touched.file) ||
                    Boolean(formikProps.submitCount > 0))
                }
                helperText={
                  (Boolean(formikProps.touched.file) ||
                    Boolean(formikProps.submitCount > 0)) &&
                  formikProps.errors.file
                }
              />

              <DisplayErrors errors={errors} />

              <Stack
                spacing={3}
                direction="row"
                justifyContent="flex-end"
                mt={3}
              >
                <Button
                  color="primary"
                  variant="contained"
                  disabled={formikProps.isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  disabled={formikProps.isSubmitting}
                  component={Link}
                  to="/"
                >
                  Cancel
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
