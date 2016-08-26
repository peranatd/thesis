import React from 'react';
import github from '../logos/github.svg';
import linkedin from '../logos/linkedin.svg';

const Team = () => (
  <div className="container">
    <h1>Team Little Big Planet</h1>
    <div className="row main">
      <div className="col-sm-3">
        <img className="img-circle" src="https://s3.postimg.org/4b5s5i21v/10687021_1513080458908601_2030217230142341681_n.jpg" alt="Felipe Matsumoto" />
        <h4>Felipe Matsumoto</h4>
        <h5>CFO</h5>
        <a href="https://github.com/ftmatsumoto"><img className="github" src={github} /></a>
        <a href="https://br.linkedin.com/in/felipematsumoto"><img className="linkedin" src={linkedin} /></a>
      </div>

      <div className="col-sm-3">
        <img className="img-circle" src="https://s4.postimg.org/ouzufy87h/48467461251_25de3636c979d7bdcaa1_512.jpg" alt="Peranat Dayananda" />
        <h4>Peranat Dayananda</h4>
        <h5>Product Owner</h5>
        <a href="https://github.com/peranatd"><img className="github" src={github} /></a>
        <a href="https://www.linkedin.com/in/peranatdayananda"><img className="linkedin" src={linkedin} /></a>
      </div>

      <div className="col-sm-3">
        <img className="img-circle" src="https://s3.postimg.org/59w0ymt4z/image.jpg" alt="Sujin Lee" />
        <h4>Sujin Lee</h4>
        <h5>Scrum Master</h5>
        <a href="https://github.com/pasdesujin"><img className="github" src={github} /></a>
        <a href="https://www.linkedin.com/in/pasdesujin"><img className="linkedin" src={linkedin} /></a>
      </div>

      <div className="col-sm-3">
        <img className="img-circle" src="https://s4.postimg.org/md6bk5jgd/2201231.jpg" alt="Yuan Liu" />
        <h4>Yuan Liu</h4>
        <h5>CEO</h5>
        <a href="https://github.com/liuyuanneu"><img className="github" src={github} /></a>
        <a href="https://www.linkedin.com/in/liuyuanneu"><img className="linkedin" src={linkedin} /></a>
      </div>
    </div>
    <hr className="featurette-divider" />
    <div className="row">
      <h4>Do you want to see our team repository?</h4>
      <a href="https://github.com/hrr17-littlebigplanet/thesis"><span className="glyphicon glyphicon-globe"> </span></a>
    </div>
  </div>
);

export default Team;
