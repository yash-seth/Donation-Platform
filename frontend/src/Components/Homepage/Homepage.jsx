import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import childrenPlaying from "../../Assets/children_playing.jpg"
import "./Homepage.css"

function Homepage() {
  return (
    <div className="homepage">
      <div style={{ display: "block", width: "60vw", padding: 30 }}>
        <h4>React-Bootstrap Carousel Component</h4>
        <Carousel>
          <Carousel.Item interval={1500}>
            <img className="d-block w-100" src={childrenPlaying} alt="One" />
            <Carousel.Caption>
              <h3>Label for first slide</h3>
              <p>Sample Text for Image One</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img className="d-block w-100" src={childrenPlaying} alt="Two" />
            <Carousel.Caption>
              <h3>Label for second slide</h3>
              <p>Sample Text for Image Two</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Homepage;
