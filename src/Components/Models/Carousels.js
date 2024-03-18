import React from 'react';
import { Carousel } from 'react-bootstrap';
import Page1 from './Images/Page1.png'
import Page2 from './Images/Page2.png'
import Page3 from './Images/Page3.png'
import Page4 from './Images/Page4.png'
import Page5 from './Images/Page5.png'
import Page6 from './Images/Page6.png'
import Page7 from './Images/Page7.png'
import './Carousel.css'

const UserGuideCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page3}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page4}
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page5}
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page6}
          alt="Sixth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Page7}
          alt="Seventh slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default UserGuideCarousel;
