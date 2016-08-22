import React,{ Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import Chart from './Chart';
import Cloud from './Cloud';
import Tone_Cloud from './Tone_Cloud';
import Radar from './Radar';
import ToneSummary from './ToneSummary';
import AttitudeResult from './AttitudeResult';

class ProfilePage extends Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      sessions:['2016-07-09','2016-08-22'],
      currentSession:{}
    }
  }

  componentWillMount() {
    //getSessions();
  }

  getSessions() {

  }

  handleChange() {
    this.setState({
      currentSession: event.target.value
    },() => console.log('what is this target value of current session', this.state.currentSession));
  }

  render() {
    return (
      <DocumentTitle title={`My Profile`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>My Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <p>Please select sessions</p>
            </div>
            <div className="col-xs-6">
              <select className="form-control" onChange={this.handleChange.bind(this)}>
                {this.state.sessions.map((session) => (
                  <option value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
          { Object.keys(this.state.currentSession).length ? (
          <div>
            <div className="row">
              <h3>Sentiment Result</h3>
              {
                this.state.currentSession.msEmotion.length ?
                <Chart emotion={this.state.currentSession.msEmotion}/> :
                <p>{"Sorry you don't have any sentiment result yet. Please go to practice page practicing first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Word Cloud</h3>
              {
                this.state.currentSession.length ?
                <Cloud trans={this.state.currentSession.transcription}/> :
                <p>{"Sorry you don't have any word cloud yet. Please go to practice page adding text in the textbox first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Content Sentiment Result</h3>
              {
                Object.keys(this.state.currentSession.watsonSentiment).length ?
                <Radar watson={this.state.currentSession.watsonSentiment}/> :
                <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Tone Sentiment Result</h3>
              {
                this.state.currentSession.tone.length ? (
                <div>
                  <Tone_Cloud tone={this.state.currentSession.tone}/>
                  <AttitudeResult tone={this.state.currentSession.tone}/>
                  <ToneSummary tone={this.state.currentSession.tone}/>
                </div>
                ): <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
              }
            </div>
          </div>) :
          <div className="row">
            <p><span className="glyphicon glyphicon-warning-sign"></span>You have no history</p>
          </div>
          }
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket
  };
}

export default connect(mapStateToProps)(ProfilePage);
