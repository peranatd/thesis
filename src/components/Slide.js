import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router';

const Slide = () => (
  <Carousel className="carousel">
    <Carousel.Item>
      <img className="carouselImg" alt="main" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxxFoV6wXlBdKRq016G1Z9NcFrw7aA7x2cd4KPGvK3PUh70X4"/>
      <Carousel.Caption>
        <h2>Speak Mirror</h2>
        <p>Our app will give you honest feedback on how others perceive the way you speak, as you are speaking. We utilise powerful APIs to bring you the most cutting-edge automated analysis of the most important traits of a great communicator</p>
        <Link to="/practice" className="btn btn-lg btn-primary" role="button">Start Now</Link>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="carouselImg" alt="900x500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxxFoV6wXlBdKRq016G1Z9NcFrw7aA7x2cd4KPGvK3PUh70X4"/>
      <Carousel.Caption>
        <h2>Tech Stacks</h2>
          <img className="techlogos" alt="node" src="https://s4.postimg.org/9g8sbwkul/node_logo.png" />
          <img className="techlogos" alt="express" src="https://s3.postimg.org/gz48fmlkj/expressjs_logo.png" />
          <img className="techlogos" alt="react" src="https://s4.postimg.org/697apdxhp/react_logo.png" />
          <img className="techlogos" alt="redux" src="https://s3.postimg.org/8koyzzx3n/redux_logo.png" />
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="carouselImg" alt="900x500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxxFoV6wXlBdKRq016G1Z9NcFrw7aA7x2cd4KPGvK3PUh70X4"/>
      <Carousel.Caption className="builders">
        <h2>Little Big Planet</h2>
         <div className="row">
          <div className="col-md-3">
            <img className="img-circle" src="https://s3.postimg.org/4b5s5i21v/10687021_1513080458908601_2030217230142341681_n.jpg" alt="Felipe Matsumoto" />
            <p>Felipe Matsumoto</p>
          </div>
          <div className="col-md-3">
            <img className="img-circle" src="https://s4.postimg.org/ouzufy87h/48467461251_25de3636c979d7bdcaa1_512.jpg" alt="Peranat Dayananda" />
            <p>Peranat Dayananda</p>
          </div>
          <div className="col-md-3">
            <img className="img-circle" src="https://s3.postimg.org/59w0ymt4z/image.jpg" alt="Sujin Lee" />
            <p>Sujin Lee</p>
          </div>
          <div className="col-md-3">
            <img className="img-circle" src="https://s4.postimg.org/md6bk5jgd/2201231.jpg" alt="Yuan Liu" />
            <p>Yuan Liu</p>
          </div>
        </div>
        <Link to="/team" className="btn btn-lg btn-primary" role="button">About Our Team</Link>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Slide;