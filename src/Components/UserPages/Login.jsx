import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Utils/axios";
import { toastSuccess, toastWarn } from "../Utils/toastify";
import { useFormik } from "formik";
import loginAnimation from "../Home/Assets/Login1.json";
import './Login.css'
import Context from "../../Context/Context";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  // console.log(showPassword)
  const userValidation = yup.object().shape({
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Pasword must have atleast 6 characters")
      .required("Password is required"),
  });

  const { values, handleChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userValidation,
      onSubmit: (values) => {
        login(values)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              if (res.data.success === false) {
                toastWarn(res.data.message);
              } else {
                localStorage.setItem("Auth-Token", res.data.token);
                localStorage.setItem("user", res.data._id);
                toastSuccess(res.data.message);
                navigate("/home");
              }
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.success === false) {
              toastWarn(err.response.data.message);
            }
          });
      },
    });

  return (
    <Container>
      <Row  className="centered justify-content-around">
        <Col md={4}>
          <h3>Bulk Mail App</h3>
          <Lottie animationData={loginAnimation} />
        </Col>
        <Col md={4}>
          <h3>Login</h3>
          <hr />
          <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
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

            <Form.Group className="mb-0">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Link to={"/forgot-password"}>Forgot Password</Link>
            </div>
            <Form.Check
              className="mb-3 mt-3"
              type="checkbox"
              label="Show Password"
              onChange={() => setShowPassword(!showPassword)}
            />
            <div className="form-check d-flex justify-content-center mb-4">
              <label className="form-check-label" htmlFor="login">
                Don't have an account? <Link to="/signup">Signup</Link>
              </label>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <Button type="submit" variant="primary" size="lg">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
