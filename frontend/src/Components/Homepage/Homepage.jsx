import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import childrenPlaying from "../../Assets/children_playing.jpg"
import "./Homepage.css"

function Homepage() {
  return (
    <div className="homepage">
      <div className="carousel">
        {/* <h4>React-Bootstrap Carousel Component</h4> */}
        <Carousel>
          <Carousel.Item interval={1500}>
            <img className="d-block w-100" src={childrenPlaying} alt="One" />
            <Carousel.Caption>
              <h3>Football Players</h3>
              <p>Bhandup, Mumbai</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img className="d-block w-100" src={childrenPlaying} alt="Two" />
            <Carousel.Caption>
              <h3>In rain (in pic)</h3>
              <p>Two mulund warriors players</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Homepage;
