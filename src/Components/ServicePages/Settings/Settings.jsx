import { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import UserGuide from "../../Models/UserGuideModel";
import { CreateCred, DeleteCred, GetCred } from "../../Utils/axios";
import { ToastError, toastSuccess, toastWarn } from "../../Utils/toastify";
import NavBar from "../../Navbar/NavBar";


const SettingsPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [type, setType] = useState("password");
  const [loadButton, setLoadButton] = useState(true);
  const [flag1, setFlag1] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [credExist, setCredExist] = useState(true);

  // console.log(data)
  const handleSave = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    CreateCred(data)
      .then((res) => {
        console.log(res);
        if (res.data.message === "Credential Created") {
          setLoadButton(true);
          setFlag1(true);
          toastSuccess(res.data.message);
        } else if (res.data.updateUser.modifiedCount === 0) {
          setLoadButton(true);
          toastWarn("Change something before Update");
        } else if (res.data.updateUser.modifiedCount === 1) {
          setLoadButton(true);
          toastSuccess(res.data.message);
        }
      })
      .catch((err) => {
        setLoadButton(true);
        console.log(err);
      });
  };

  useEffect(() => {
    if (credExist) {
      setCredExist(false);
      GetCred()
        .then((res) => {
          // console.log(res)
          setData({
            email: res.data.userCred.email,
            password: res.data.userCred.password,
          });
          setFlag1(true);
          setLoadButton(true);
        })
        .catch((err) => {
          // console.log(err)
          if (err.code === "ERR_BAD_REQUEST") {
            // ToastError(err.response.data.message || err.message)
          }
        });
    }
  }, [credExist]);

  const delCredentials = () => {
    DeleteCred()
      .then((res) => {
        console.log(res);
        if (res.data.success === false) {
          toastSuccess(res.data.message);
        } else {
          toastSuccess("Credentials Removed Successfully");
          setData({ email: "", password: "" });
          setFlag1(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center flex-wrap">
          <Col md={8}>
            <h3
              className="text-start "
              style={{
                fontFamily: "revert-layer",
                color: "#329199",
                fontWeight: 600,
              }}
            >
              Email Settings
            </h3>
            <hr />
            <p className="text-start">
              Configure the email credentials from which you want to send
              emails.
            </p>
            <br />
            <div className="formStyle">
              <Form className="text-start" onSubmit={handleSave}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    min={6}
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    name="email"
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter your valid email address above.
                  </Form.Text>
                </Form.Group>
                <br />
                <Form.Group controlId="inputPassword5">
                  <Form.Label>App Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={type}
                      value={data.password}
                      placeholder="Enter your app password"
                      name="password"
                      onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                      }
                      aria-describedby="passwordHelpBlock"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        setType(type === "password" ? "text" : "password")
                      }
                    >
                      {type === "password" ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </Button>
                  </InputGroup>
                  <Form.Text id="passwordHelpBlock" className="text-muted">
                    Generate the app password from{" "}
                    <a
                      href="https://myaccount.google.com/"
                      rel="noreferrer"
                      title="If you have a Google account, click here to generate a password in Google."
                      target="_blank"
                    >
                      https://myaccount.google.com
                    </a>{" "}
                    if your email is Gmail and also complete{" "}
                    <b>2-Step verification</b>. If you are using another email
                    address, do this on your email provider's website.
                  </Form.Text>
                </Form.Group>
                <br />
                <div className="d-flex">
                  <Button type="submit" style={{ width: "100px" }}>
                    {loadButton ? (!flag1 ? "Save" : "Update") : "Loading..."}
                  </Button>

                  {loadButton && flag1 && (
                    <>
                      <Button
                        type="button"
                        className="m-auto d-inline-block rounded-circle"
                        onClick={delCredentials}
                      >
                        <MdDeleteOutline />
                      </Button>
                    </>
                  )}
                  <Button
                    type="button"
                    className={!flag1 ? "ms-auto" : ""}
                    onClick={() => setModalShow(true)}
                  >
                    Tutorial
                  </Button>
                  <UserGuide
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
                <br />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingsPage;
