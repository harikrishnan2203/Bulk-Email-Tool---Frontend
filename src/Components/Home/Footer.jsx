import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container style={{marginTop:"48px"}}>
      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        {/* <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </section> */}

        <section>
          <Container className="text-center text-md-start mt-5">
            <Row className="mt-3" style={{alignItems: "flex-start", paddingTop:"24px"}}>
              <Col md={3} lg={4} xl={4} mx="auto" mb={4}>
                <h6 className="text-uppercase fw-bold mb-4">
                  <FontAwesomeIcon icon={faMailBulk} className="me-3" />
                  Bulk Email Tool
                </h6>
                <p>
                  Our Bulk Email Tool simplifies the process of managing and
                  sending mass emails to your contacts. With powerful features
                  you can easily create and track your email. Stay connected
                  with your audience and grow your business with our efficient
                  email marketing solution.
                </p>
              </Col>
              <Col md={2} lg={2} xl={2} mx="auto" mb={4}>
                <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                <p>
                  <Link to={'/send-mail'} className="text-reset">
                    Send Mail
                  </Link>
                </p>
                <p>
                  <Link to={'/send-bulk-mail'} className="text-reset">
                    Send Bulk Mail
                  </Link>
                </p>
              </Col>
              <Col md={3} lg={2} xl={2} mx="auto" mb={4}>
                <h6 className="text-uppercase fw-bold mb-4">Try For Free</h6>
                <p>
                  <Link to={"/"} className="text-reset">
                    Home
                  </Link>
                </p>
                <p>
                  <Link to={'/chart'} className="text-reset">
                    Chart
                  </Link>
                </p>
                <p>
                  <Link to={'/senr-items'} className="text-reset">
                    Sent Logs
                  </Link>
                </p>
                <p>
                  <Link to={'/settings'} className="text-reset">
                    Settings
                  </Link>
                </p>
              </Col>
              <Col md={4} lg={3} xl={3} mx="auto" mb={4}>
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <FontAwesomeIcon icon={faHome} className="me-3" /> New York,
                  NY 10012, US
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" />{" "}
                  info@example.com
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="me-3" /> + 01 234
                  567 88
                </p>
                <p>
                  <FontAwesomeIcon icon={faPrint} className="me-3" /> + 01 234
                  567 89
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Links */}
        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:-
          <Link className="text-reset fw-bold" to={'/'}>
            Bulk Email Tool
          </Link>
        </div>
        {/* Copyright */}
      </footer>
    </Container>
  );
};

export default Footer;
