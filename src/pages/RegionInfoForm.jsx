import { Field, Formik, ErrorMessage, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, Form as RForm } from 'react-bootstrap';

const schema = yup.object().shape({
    state: yup.string().required('Required'),
    district: yup.string().required('Required'),
    village: yup.string().required('Required'),
    pincode: yup.string().test('len', 'Must be exactly 6 characters', val => val.length === 6)
});

function RegionInfoForm() {
    const history = useHistory();
    const [uploading, setUploading] = useState(false)

    async function handleUploadZip(event) {
        event.preventDefault();
        setUploading(true);
        const response = await window.api.uploadZipFile();
        if (!response.status) {
            alert("Uploading Files Cancelled");
        }
    }

    async function handleUploadFolder(event) {
        event.preventDefault();
        setUploading(true);
        window.api.uploadFolder((status) => {
            if (!status) {
                alert("Uploading Folder Cancelled");
            } else {
                setUploading(false);
            }
        });

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
                    <div className="text-danger"><ErrorMessage name="state" /></div>
                </RForm.Group>
                <RForm.Group controlId="validationFormik02">
                    <RForm.Label>District</RForm.Label>
                    <Field as={RForm.Control} type="text" name="district" />
                    <div className="text-danger"><ErrorMessage name="district" /></div>
                </RForm.Group>
                <RForm.Group controlId="validationFormik03">
                    <RForm.Label>Village</RForm.Label>
                    <Field as={RForm.Control} type="text" name="village" />
                    <div className="text-danger"><ErrorMessage name="village" /></div>
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
                    <Button className="mx-auto" type="submit" disabled={uploading}>
                        {uploading ?
                            "...Uploading"
                            :
                            "Submit"
                        }
                    </Button>
                </RForm.Row>
            </Form>
        </Formik>
    );
}

export default RegionInfoForm