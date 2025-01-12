import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import childrenPlaying from "../../Assets/children_playing.jpg";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <div className="carousel-container">
        <div className="carousel">
          <Carousel>
            <Carousel.Item interval={3000}>
              <img className="d-block w-100" src={childrenPlaying} alt="One" width={"auto"} height={"100%"}/>
              <Carousel.Caption>
                <h3 id="photo-header">Football Players</h3>
                <p id="photo-caption">Foundation Club</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img className="d-block w-100" src={childrenPlaying} alt="Two" width={"auto"} height={"100%"}/>
              <Carousel.Caption>
                <h3 id="photo-header">Football</h3>
                <p id="photo-caption">Children supported by the foundation</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
