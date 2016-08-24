import React,{ Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import Chart from './Chart';
import Cloud from './Cloud';
import Tone_Cloud from './Tone_Cloud';
import Radar from './Radar';
import ToneSummary from './ToneSummary';
import AttitudeResult from './AttitudeResult';

const initialResult = {
  msEmotion: undefined,
  transcript: undefined,
  bv: undefined,
  watson: undefined
};

class ProfilePage extends Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      currentSession: undefined,
      result: initialResult,
      sessionId: {}
    };

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
      this.setState({
        result: initialResult
      }, () => this.setState({
        result: Object.assign({}, initialResult, data)
      }));
    });
  }

  componentWillMount() {
    this.props.socket.emit('getSession', this.context.user.username);
  }

  handleChange() {
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
                  return <option value={session}>{time.toLocaleString()}</option>;
                })}
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
                this.state.result.watson ?
                <Cloud trans={[this.state.result.watson.transcript]}/> :
                <p>{"Sorry you don't have any word cloud yet. Please go to practice page adding text in the textbox first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Content Sentiment Result</h3>
              {
                this.state.result.watson ?
                <Radar watson={this.state.result.watson}/> :
                <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
              }
            </div>
            <div className="row">
              <h3>Speech Tone Sentiment Result</h3>
              {
                this.state.result.bv ? (
                <div>
                  <Tone_Cloud tone={[this.state.result.bv]}/>
                  <AttitudeResult tone={[this.state.result.bv]}/>
                  <ToneSummary tone={[this.state.result.bv]}/>
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
