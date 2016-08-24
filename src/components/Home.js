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
          <p className="lead">
            We use Microsoft API for facial expression analysis, Watson API for speech to text functionality and verbal contents analysis, and BeyondVerbal API for voice tone.
          </p>
        </div>
        <div className="col-md-5">
          <img src="https://s9.postimg.org/dfqn18cen/speak_main1.png" className="img-responsive" />
        </div>
      </div>
      <hr className="featurette-divider" />
      <div className="row">
        <div className="col-md-5">
          <img src="https://s4.postimg.org/tu03mkdot/Screen_Shot_2016_08_23_at_2_05_49_PM.png" className="img-responsive" />
        </div>
        <div className="col-md-7">
          <h2 className="featurette-heading"><span className="glyphicon glyphicon-stats"></span>Informative Insights</h2>
          <p className="lead">
            You will enjoy our honest feedback on how others perceive the way you speak with various charts.
          </p>
        </div>
      </div>
    </div>
  </div>
  );

export default Home;
