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
      sessions: [],
      currentSession: undefined,
      result: {
        msEmotion: undefined,
        transcription: undefined,
        tone: undefined,
        watsonSentiment: undefined
      },
      sessionId: {}
    }

    this.props.socket.on('allSessions', (data) => {
      this.setState({
        sessions: data.map(session => session.session_timestamp),
        sessionId: data.reduce((memo, item) => {
          memo[item.session_timestamp] = item.id;
          return memo;
        }, {})
      });
    });

    this.props.socket.on('allResults', (data) => {
      console.log(JSON.stringify(data, null, 3));
    });
  }

  componentWillMount() {
    this.props.socket.emit('getSession', this.context.user.username);
  }

  handleChange() {
    // console.log(event.target.value);
    if (event.target.value !== 'null') {
      this.setState({
        currentSession: event.target.value
      }, () => {
        this.props.socket.emit('getResults', this.state.sessionId[this.state.currentSession]);
      });
    }
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
                <option value='null'>Please select sessions</option>
                {this.state.sessions.map((session) => {
                  let time = new Date(session);
                    return <option value={session}>{time.toLocaleString()}</option>
                  }
                )}
              </select>
            </div>
          </div>
          { this.state.currentSession ? (
          <div>
            <div className="row">
              <h3>Sentiment Result</h3>
              {
                this.state.result.msEmotion ?
                <Chart emotion={this.state.result.msEmotion}/> :
                <p>{"Sorry you don't have any sentiment result yet. Please go to practice page practicing first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Word Cloud</h3>
              {
                this.state.result.transcription ?
                <Cloud trans={this.state.result.transcription}/> :
                <p>{"Sorry you don't have any word cloud yet. Please go to practice page adding text in the textbox first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Content Sentiment Result</h3>
              {
                this.state.result.watsonSentiment ?
                <Radar watson={this.state.result.watsonSentiment}/> :
                <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Tone Sentiment Result</h3>
              {
                this.state.result.tone ? (
                <div>
                  <Tone_Cloud tone={this.state.result.tone}/>
                  <AttitudeResult tone={this.state.result.tone}/>
                  <ToneSummary tone={this.state.result.tone}/>
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
