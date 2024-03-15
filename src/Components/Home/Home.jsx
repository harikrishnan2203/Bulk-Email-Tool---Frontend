import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Home.css";
import Accordion from "./FAQ";
import cardData from "./cardData.json";
import step1 from "./Assets/step1.svg";
import step2 from "./Assets/step2.svg";
import step3 from "./Assets/step3.svg";
// import HomeImage from "./Assets/sample.jpg";
import Footer  from "./Footer";
import animationData from './Animation - 1709731031340.json'
import Lottie from "lottie-react";

  function Home() {
    return (
      <Container className="home-features">
        <Container className="sec-1">
          <Row className="row">
            <Col className="col col-sm-12 col-md-10 col-xs-12 col-lg-6 col-xl-5 order-2 order-lg-1">
              <h1>Bulk Email Tool</h1>
              <p>
                The "Bulk Email Tool" is a powerful platform designed to
                streamline your email communication efforts. With its
                user-friendly interface and robust features, you can easily manage
                and send bulk emails to your subscribers or clients
              </p>
            </Col>
            <Col className="col col-sm-12 col-md-10 col-xs-12 col-lg-6 col-xl-5 order-1 order-lg-2">
              <Lottie animationData={animationData} />
              {/* <Image src={HomeImage} fluid /> */}
            </Col>
          </Row>
        </Container>
        <Container className="inner-content">
          <div className="page-parts-label">{`{ 02. WHAT YOU NEED TO KNOW }`}</div>
          <h2 className="page-parts-title">How does it work?</h2>
          <Row className="cards">
            {cardData.map((card, index) => (
              <Col key={index}>
                <Card className="feature-card">
                  <Card.Img
                    loading="lazy"
                    height="160"
                    width="208"
                    src={
                      card.imageUrl === "./Assets/step1.svg"
                        ? step1
                        : card.imageUrl === "./Assets/step2.svg"
                        ? step2
                        : step3
                    }
                    title={card.cardTitle}
                    alt={card.cardTitle}
                    className="card-cover"
                  />
                  <Card.Body>
                    <Card.Title>{card.cardTitle}</Card.Title>
                    <Card.Text>{card.cardText}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Accordion />
        <br/>
        <Footer/>
      </Container>
    );
  }

  export default Home;
