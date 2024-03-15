import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { signUp } from "../Utils/axios";
import { toastSuccess, toastWarn } from "../Utils/toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const userValidation = yup.object().shape({
    name: yup
      .string()
      .min(4, "Enter a valid Name")
      .required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must have at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password is required"),
  });

  const { values, handleChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userValidation,
      onSubmit: (values) => {
        signUp(values)
          .then((res) => {
            console.log(res);
            if (res.data.success === true) {
              toastSuccess(res.data.message);
              navigate("/");
            }
          })
          .catch((res) => {
            console.log(res);
            if (res.response.data.success === false) {
              toastWarn(res.response.data.message);
            }
          });
      },
    });

  return (
    <Container>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
        <h3>Signup</h3>
        <hr/>
          <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group className="mb-4">
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

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              className="mb-3"
              type="checkbox"
              label="Show Password"
              onChange={() => setShowPassword(!showPassword)}
            />
            <div className="form-check d-flex justify-content-center mb-5">
              <label className="form-check-label" htmlFor="login">
                Already have an Account? <Link to="/">Login</Link>
              </label>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <Button type="submit" variant="primary" size="lg">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
