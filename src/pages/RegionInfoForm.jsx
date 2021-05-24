import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

const schema = yup.object().shape({
    state: yup.string().required("Required!"),
    district: yup.string().required(),
    village: yup.string().required(),
    pincode: yup.string().required().test('len', 'Must be exactly 5 characters', val => val.length === 5)
});

function RegionInfoForm() {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                state: '',
                district: '',
                village: '',
                pincode: '000000',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="validationFormik01">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            isValid={touched.state && !errors.state}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormik01">
                        <Form.Label>District</Form.Label>
                        <Form.Control
                            type="text"
                            name="district"
                            value={values.district}
                            onChange={handleChange}
                            isValid={touched.district && !errors.district}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormik01">
                        <Form.Label>Village</Form.Label>
                        <Form.Control
                            type="text"
                            name="village"
                            value={values.village}
                            onChange={handleChange}
                            isValid={touched.village && !errors.village}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormik01">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            name="pincode"
                            value={values.pincode}
                            onChange={handleChange}
                            isValid={touched.pincode && !errors.pincode}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Row className="my-4">
                        <Button className="mx-auto">Upload Zip</Button>
                        <p>OR</p>
                        <Button className="mx-auto">Upload Folder</Button>
                    </Form.Row>
                    <Form.Row>
                        <Button className="mx-auto" type="submit">Submit</Button>
                    </Form.Row>
                </Form>
            )
            }
        </Formik >
    );
}

export default RegionInfoForm