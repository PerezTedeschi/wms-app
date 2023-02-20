import { Button } from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { warehouseUrl } from "../endpoints";
import { warehouseCreateModel } from "../models/warehouse.models";
import TextField from "./TextField";

export default function CreateWarehouse() {
    const initialValues: warehouseCreateModel =
    {
        code: '',
        name: '',
        address: '',
        state: '',
        country: '',
        zip: ''        
    }

    async function createWarehouse(warehouse: warehouseCreateModel) {
        try {
            const formData = new FormData();
            if (warehouse.file)
                formData.append('file', warehouse.file);
            formData.append('code', warehouse.code);
            formData.append('name', warehouse.name);
            formData.append('address', warehouse.address);
            formData.append('state', warehouse.state);
            formData.append('country', warehouse.country);
            formData.append('zip', warehouse.zip);
            await axios({
                method: "post",
                url: warehouseUrl,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => { await createWarehouse(values) }}
                validationSchema={Yup.object({
                    code: Yup.string().required("This file is required"),
                    name: Yup.string().required("This file is required"),
                    address: Yup.string().required("This file is required"),
                    state: Yup.string().required("This file is required"),
                    country: Yup.string().required("This file is required"),
                    zip: Yup.string().required("This file is required"),
                    file: Yup.mixed().required('File is required')
                })}
            >
                {(formikProps) => (
                    <Form>
                        <TextField field="code" displayName="Code" />
                        <TextField field="name" displayName="Name" />
                        <TextField field="address" displayName="Address" />
                        <TextField field="state" displayName="State" />
                        <TextField field="country" displayName="Country" />
                        <TextField field="zip" displayName="Zip" />

                        <Field type="file" value={undefined} onChange={(event: any) => {
                            if (event.currentTarget.files[0])
                                formikProps.setFieldValue("file", event.currentTarget.files[0]);
                        }} />

                        <Button disabled={formikProps.isSubmitting} type="submit">Save</Button>
                        <Button component={Link} to="/" color="inherit">Cancel</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}