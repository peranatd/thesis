import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <h1> Home </h1>
    <blockquote>
    <h3>Speak Mirror</h3>
    <p>Our app will give you honest feedback on how others perceive the way you speak, as you are speaking. We utilise powerful APIs to bring you the most cutting-edge automated analysis of the most important traits of a great communicator
    </p>
    </blockquote>
    <button><Link to="/practice">Start Now</Link></button>
  </div>
  )

export default Home;