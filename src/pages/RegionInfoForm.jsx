import { Field, Formik, ErrorMessage, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import React from 'react';
import * as yup from 'yup';
import { Button, Form as RForm } from 'react-bootstrap';

const schema = yup.object().shape({
    state: yup.string(),
    district: yup.string(),
    village: yup.string(),
    pincode: yup.string().test('len', 'Must be exactly 5 characters', val => val.length === 6)
});

function RegionInfoForm() {
    const history = useHistory();
    async function handleUploadZip(event) {
        event.preventDefault();
        const response = await window.api.uploadZipFile();
        if (!response.status) {
            alert("Uploading Files Cancelled");
        }
    }

    async function handleUploadFolder(event) {
        event.preventDefault();
        const response = await window.api.uploadFolder();
        if (!response.status) {
            alert("Uploading Folder Cancelled");
        }

    }

    function handleSubmit(values) {
        window.api.setRegionInfo(values);
        history.push("/processImage");
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                state: '',
                district: '',
                village: '',
                pincode: '000000',
            }}
        >
            <Form>
                <RForm.Group controlId="validationFormik01">
                    <RForm.Label>State</RForm.Label>
                    <Field as={RForm.Control} type="text" name="state" />
                    <ErrorMessage name="state" />
                </RForm.Group>
                <RForm.Group controlId="validationFormik02">
                    <RForm.Label>District</RForm.Label>
                    <Field as={RForm.Control} type="text" name="district" />
                    <ErrorMessage name="district" />
                </RForm.Group>
                <RForm.Group controlId="validationFormik03">
                    <RForm.Label>Village</RForm.Label>
                    <Field as={RForm.Control} type="text" name="village" />
                    <ErrorMessage name="village" />
                </RForm.Group>
                <RForm.Group controlId="validationFormik04">
                    <RForm.Label>Pincode</RForm.Label>
                    <Field as={RForm.Control} type="text" name="pincode" />
                    <ErrorMessage name="pincode" />
                </RForm.Group>
                <RForm.Row className="my-4">
                    <Button className="mx-auto" onClick={handleUploadZip}>Upload Zip</Button>
                    <span>OR</span>
                    <Button className="mx-auto" onClick={handleUploadFolder}>Upload Folder</Button>
                </RForm.Row>
                <RForm.Row>
                    <Button className="mx-auto" type="submit">Submit</Button>
                </RForm.Row>
            </Form>
        </Formik>
    );
}

export default RegionInfoForm