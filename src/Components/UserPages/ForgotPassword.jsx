import React from 'react';
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { resetPassword } from '../Utils/axios';
import { ToastError, toastSuccess, toastWarn } from '../Utils/toastify';
import * as yup from "yup";
import { useFormik } from 'formik';
import Lottie from 'lottie-react';
import loginAnimation from "../Home/Assets/Login1.json";
import { Link } from 'react-router-dom';

const initialValues = {
  email: "",
  password: ""
}

function ForgotPassword() {
  const userValidation = yup.object().shape({
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is required")
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched} = 
  useFormik({
    initialValues:initialValues, 
    validationSchema:userValidation,
    onSubmit: (values) => {
      resetPassword(values)
        .then((res) => {
          console.log(res)
          
          if ( res.data.mail.code === "EAUTH") {
            console.log("object not found");
            ToastError("Error Reseting Password");
          }
          else if ( res.data.mail.code === "ESOCKET") {
            console.log("object not found");
            ToastError("Error Reseting Password");
          }
          else if (res.status === 200) {
            toastSuccess(res.data.message);
            }
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.success === false) {
            toastWarn(err.response.data.message)
          }
        })
    }
  })
  return (
    <Container>
      <Row>
        <Col md={4}>
          <h3>Bulk Mail App</h3>
          <Lottie animationData={loginAnimation}/>
        </Col>
        <Col md={4}>
        <h3>Forgot Password</h3>
        <hr/>
          <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-0">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end"><Link to={'/'}>Back</Link></div>

            <div className="d-flex justify-content-center mx-4 mt-4 mb-3 mb-lg-4">
              <Button type="submit" variant="primary" size="lg">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;