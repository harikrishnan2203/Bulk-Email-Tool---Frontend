import React, { useContext, useState } from "react";
import { Container, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./SendMail.css";
import Context from "../../../Context/Context";
import RecipientsModel from "../../Models/RecipientsModel";
import { ExcelRenderer } from "react-excel-renderer";
import { SendEmail } from "../../Utils/axios";
import { ToastError, toastSuccess } from "../../Utils/toastify";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import NavBar from '../../Navbar/NavBar.jsx'


const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

const init = {
  recipients: "",
  subject: "",
  body: "",
};

const SendBulkMail = () => {
  const [btnCtrl, setBtnCtrl] = useState(true);
  // const contextData = useContext(Context);
  // const navigate = useNavigate()
  // const [visibleResList, setVisibleResList] = useContext(false)
  // console.log(user)

  const {
    values,
    handleChange,
    setFieldTouched,
    errors,
    setFieldValue,
    handleBlur,
    touched,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: init,
    onSubmit: (values) => {
      // console.log(values);
      setBtnCtrl(false);
      const { recipients } = values;
      // console.log(recipients)
      let splitedData = recipients.split(",").map((e) => e.replace(/ /g, ""));
      let arr = [];
      for (let i = 0; i < splitedData.length; i++) {
        if (
          arr.indexOf(splitedData[i]) === -1 &&
          splitedData[i].match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        ) {
          arr.push(splitedData[i]);
          console.log(arr);
        }
      }

      SendEmail({ ...values, recipients: arr })
        .then((res) => {
          // console.log(res)
          if (res.data.success === true) {
            toastSuccess(res.data.message);
            setBtnCtrl(true);
            resetForm();
          }
        })
        .catch((err) => {
          // console.log(err)
        });
    },
    validate: (values) => {
      let { recipients, subject, body } = values;
      let errors = {};
      if (!recipients) {
        errors.recipients = "Emails are Required, Please Select a File!";
      } else if (recipients.length < 5) {
        errors.recipients = "Enter valid email";
      }
      if (!subject) {
        errors.subject = "Subject is Required!";
      } else if (subject.length < 3) {
        errors.subject = "Subject must have atleast 3 characters.";
      }
      if (!body) {
        errors.body = "Content is Required!";
      }
      return errors;
    },
  });

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile);
    if (!selectedFile) {
      setFieldValue("recipients", "");
      // setVisibleResList(false)
    } else if (selectedFile) {
      // setVisibleResList(true)
      if (
        selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        errors.recipients = "Format not support";
      }
      if (
        selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        ExcelRenderer(selectedFile, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let emails = res.rows
              .map((row) => row[0])
              .filter((email) =>
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                  email
                )
              );
            setFieldValue("recipients", emails.join(","));
            // console.log(emails);
          }
        });
      } else {
        // errorToast("Please select only Excel file types");
      }
    } else {
      console.log("Select a file");
    }
  };

  function dataModal(val) {
    // console.log(val)
    const cleanedEmails = val
      .split(",")
      .map((email) => email.trim())
      .filter((email, index, self) => {
        return (
          email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          ) && self.indexOf(email) === index
        );
      });

    const duplicates = val.length - cleanedEmails.length;

    return {
      duplicates: duplicates,
      withoutDuplicates: cleanedEmails.length,
      total: val.length,
      data: cleanedEmails,
    };
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col xs={8}>
            <h3>Send Bulk mail</h3>
            <RecipientsModel recepaintInfo={dataModal(values.recipients)} />
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="recipients" className="mb-3">
                <Form.Label className="text-start w-100">
                  Enter Email
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="file"
                    style={{ width: "100%" }}
                    // value={values.recipients}
                    onChange={handleFile}
                    onBlur={handleBlur}
                    name="recipients"
                    isInvalid={touched.recipients && !!errors.recipients}
                    placeholder="Enter recipient email"
                    aria-describedby="email-error"
                  />
                  {touched.recipients && errors.recipients ? (
                    <Form.Text
                      className="text-danger d-flex text-start"
                      id="recipients"
                      aria-describedby="email-error"
                    >
                      {errors.recipients}
                    </Form.Text>
                  ) : (
                    <div className="d-flex flex-column">
                      <Form.Text
                        muted
                        className="d-flex text-start"
                        id="recipients"
                        aria-describedby="email-error"
                      >
                        Upload a CSV or xlsx file of emails. which contain only
                        email's in fist column one by one
                      </Form.Text>
                      {values.recipients && values.recipients.length > 0 && (
                        <>
                          <h5>Recipient List:</h5>
                          <ol>
                            {dataModal(values.recipients).data.map(
                              (email, index) => (
                                <li key={index}>
                                  <Form.Text
                                    className="d-flex text-start"
                                    aria-describedby="email-error"
                                  >
                                    {email}
                                  </Form.Text>
                                </li>
                              )
                            )}
                          </ol>
                        </>
                      )}
                    </div>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="subject">
                <Form.Label>Subject:</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.subject && !!errors.subject}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group controlId="body">
                <Form.Label>Body:</Form.Label>
                <ReactQuill
                  theme="snow"
                  placeholder="Compose email body"
                  name="body"
                  className={`${
                    errors.body && touched.body ? "border border-danger" : ""
                  }`}
                  value={values.body}
                  onChange={(e) => {
                    if (e === "<p><br></p>") {
                      setFieldValue("body", "");
                    } else {
                      setFieldValue("body", e);
                    }
                  }}
                  onBlur={(a, b, c) => setFieldTouched("body", true)}
                  modules={modules}
                  formats={formats}
                />
                {touched.body && errors.body && (
                  <Form.Text
                    className="text-start d-flex text-danger"
                    aria-describedby="body"
                  >
                    {errors.body}
                  </Form.Text>
                )}
              </Form.Group>
              <div className="jc-btn">
                <Button variant="primary" type="submit">
                  {btnCtrl ? (
                    "send"
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
                      <span>Sending...</span>
                    </div>
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SendBulkMail;
