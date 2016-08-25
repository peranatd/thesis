import React from 'react';
import { Link } from 'react-router';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const Footer = () => {
  const shareUrl = 'https://speakmirror.us-west-2.elasticbeanstalk.com/';
  const title ='SpeakMirror';
  return (
  <footer className="footer">
    <div className="container">
      <ul className="list-unstyled list-inline">
        <li className="footerLink"><Link to="/">Home</Link></li>
        <li className="footerLink"><Link to="/team">OurTeam</Link></li>
        <li>
          <FacebookShareButton url={shareUrl} title={title} >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </li>
        <li>
          <GooglePlusShareButton url={shareUrl} >
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </li>
        <li>
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </li>
      </ul>
    </div>
  </footer>
  )};

export default Footer;
