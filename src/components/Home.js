import React from 'react';
import { Link } from 'react-router';
import Slide from './Slide';

const Home = () => (
  <div className="wrapper">
    <Slide />
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <h2 className="featurette-heading"><span className="glyphicon glyphicon-cloud-download"></span>Powerful APIs</h2>
          <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
          </p>
        </div>
        <div className="col-md-5">
          <img src="https://placekitten.com/500/300" className="img-responsive" />
        </div>
      </div>
      <hr className="featurette-divider" />
      <div className="row">
        <div className="col-md-5">
          <img src="https://placekitten.com/500/300" className="img-responsive" />
        </div>
        <div className="col-md-7">
          <h2 className="featurette-heading"><span className="glyphicon glyphicon-stats"></span>Live D3 Charts</h2>
          <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
          </p>
        </div>
      </div>
    </div>
  </div>
  );

export default Home;
