import React from 'react';
import { Link } from 'react-router';
import Slide from './Slide';
import chart from '../logos/chart.png';

const Home = () => (
  <div className="wrapper">
    <Slide />
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <h2 className="featurette-heading"><span className="glyphicon glyphicon-cloud-download"></span> Powerful APIs</h2>
          <p className="lead">
            We use a powerful combination of state-of-the-art emotion recognition APIs to enable an accurate analysis of your communication skills in your browser.
          </p>
        </div>
        <div className="col-md-5">
          <img src="https://s9.postimg.org/dfqn18cen/speak_main1.png" className="img-responsive" />
        </div>
      </div>
      <hr className="featurette-divider" />
      <div className="row">
        <div className="col-md-5">
          <img src={chart} className="img-responsive front-chart" />
        </div>
        <div className="col-md-7">
          <h2 className="featurette-heading"><span className="glyphicon glyphicon-stats"></span> Informative Insights</h2>
          <p className="lead">
            We provide actionable and honest feedback, compiled and presented in an intuitive collection of interactive charts.
          </p>
        </div>
      </div>
    </div>
  </div>
  );

export default Home;
