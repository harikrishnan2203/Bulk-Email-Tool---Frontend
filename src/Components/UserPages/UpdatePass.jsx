import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { changePassword } from "../Utils/axios";
import { ToastError, toastSuccess } from "../Utils/toastify";
import Lottie from "lottie-react";
import UpdateAnimation from './Animation/UpdateAnimation.json'
import { Bars } from "react-loader-spinner";

const initialValues = {
  password: "",
  confirmPassword: "",
};

function UpdatePassword() {

  const { string } = useParams()
  console.log(string)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [btnCtrl, setBtnCtrl] = useState(true);

  const userValidation = yup.object().shape({
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
        setBtnCtrl(false)
        changePassword(values, string)
          .then((res) => {
            console.log(res);
            setBtnCtrl(true)
            if (res.data.success === true) {
              toastSuccess(res.data.message);
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.success === false) {
              ToastError(err.response.data.message);
            }
          });
      },
    });

  return (
    <Container>
      <Row className='justify-content-around'>
        <Col md={6}>
          <Lottie animationData={UpdateAnimation} />
        </Col>
        <Col md={4}>
        <h3>Update Password</h3>
        <hr/>
          <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
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

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <Button type="submit" variant="primary" size="lg">
              {btnCtrl ? (
                    "Update"
                  ) : (
                    <div className="d-flex flex-row align-items-center">
                      <Bars
                        height="20"
                        width="40"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                      <span></span>
                    </div>
                  )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdatePassword;
