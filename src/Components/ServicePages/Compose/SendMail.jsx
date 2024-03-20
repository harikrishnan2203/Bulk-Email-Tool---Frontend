import React, { useContext, useState } from "react";
import { Container, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./SendMail.css";
import Context from "../../../Context/Context";
import RecipientsModel from "../../Models/RecipientsModel";
import { ToastError, toastSuccess } from "../../Utils/toastify";
import { useNavigate } from "react-router-dom";
import { SendEmail } from "../../Utils/axios";
import { Bars } from "react-loader-spinner";
import NavBar from "../../Navbar/NavBar.jsx";

const modules = {
  toolbar: [
    // Adding more header options
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    
    // Inline styles
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    
    // List, direction, and indent
    [{ 'list': 'ordered'}, { 'list': 'bullet'}, { 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],                         // text direction

    // Adding 'align' options
    [{ 'align': [] }],

    // Adding more media and format options
    ['link', 'image', 'video'],

    // History
    ['undo', 'redo'],

    // ['clean']                            
  ]
};



const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'direction',
  'blockquote',
  'code-block'
];

const init = {
  recipients: "",
  subject: "",
  body: "",
};

const SendMail = () => {
  const contextData = useContext(Context);
  const [btnCtrl, setBtnCtrl] = useState(true);
  // const navigate = useNavigate()

  // function buttonControl (){
  //   setBtnCtrl(false)
  // }

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
          // console.log(arr);
        }
      }

      SendEmail({ ...values, recipients: arr })
        .then((res) => {
          // console.log(res);
          if (res.data.success === true) {
            setBtnCtrl(true);
            toastSuccess(res.data.message);
            resetForm();
          }
        })
        .catch((err) => {
          // console.log(err);
          ToastError(err.message);
          setBtnCtrl(true);
        });
    },
    validate: (values) => {
      let { recipients, subject, body } = values;
      let errors = {};
      if (!recipients) {
        errors.recipients = "Emails is Required Select File!";
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

  function dataModal(val) {
    // Remove spaces from the input string
    let cleanedData = val.replace(/ /g, "");
    // Split the string into an array of email addresses using comma as separator
    let dataArray = cleanedData.split(",");
    let uniqueEmails = [];
    let duplicates = 0;

    // Loop through the array of email addresses
    for (let i = 0; i < dataArray.length; i++) {
      // Check if the email address is valid and not already in the uniqueEmails array
      if (
        dataArray[i].match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ) &&
        uniqueEmails.indexOf(dataArray[i]) === -1
      ) {
        // If valid and unique, add it to the uniqueEmails array
        uniqueEmails.push(dataArray[i]);
      } else {
        // If the email address is a duplicate or invalid, increment the duplicates count
        duplicates++;
      }
    }

    let result = {
      duplicates: duplicates,
      withoutDuplicates: uniqueEmails.length,
      total: dataArray.length,
      data: uniqueEmails,
    };
    // console.log(result)

    return result;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <h3>Send mail</h3>
          <Col xs={8}>
            <RecipientsModel recepaintInfo={dataModal(values.recipients)} />
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="recipients" className="mb-3">
                <Form.Label className="text-start w-100">
                  Enter Email
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={values.recipients}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="recipients"
                    isInvalid={touched.recipients && !!errors.recipients}
                    placeholder="Enter recipient email"
                  />
                  {values.recipients.length >= 5 && (
                    <Button
                      variant="outline-secondary"
                      id="mailHelpBlock"
                      onClick={() => contextData.setPreviewModal(true)}
                    >
                      view Emails
                    </Button>
                  )}
                </InputGroup>
                {errors.recipients && touched.recipients ? (
                  <Form.Text
                    id="recipients"
                    className="text-start d-flex text-danger"
                    aria-describedby="recipients"
                  >
                    {errors.recipients}
                  </Form.Text>
                ) : (
                  <Form.Text
                    id="recipients"
                    muted
                    className="text-start d-flex"
                  >
                    Enter email address above separated by comma &emsp;{" "}
                    <b> Eg: </b>
                    &nbsp; yyyyy@gmail.com , xxxxxx@gmail.com
                  </Form.Text>
                )}
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

export default SendMail;
