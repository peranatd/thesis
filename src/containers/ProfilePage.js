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
    this.loadOnce = this.initialLoad();
  }

  componentWillMount() {
    this.props.socket.emit('getSession', this.context.user.username);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      result: initialResult
    }, () => this.setState({
      result: Object.assign({}, initialResult, newProps.result.result),
      sessions: newProps.sessions,
      sessionId: newProps.sessionId,
    }, this.loadOnce));
  }

  initialLoad() {
    let alreadyCalled = false;
    return () => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.handleChange();
      }
    };
  }

  handleChange() {
    if (document.getElementById('sessionSelect').value !== '') {
      this.setState({
        currentSession: document.getElementById('sessionSelect').value
      }, this.getResults);
    }
  }

  getResults() {
    this.props.socket.emit('getResults', this.state.sessionId[this.state.currentSession]);
  }

  render() {
    return (
      <DocumentTitle title={`My Profile`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>My Profile</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label className="selecting">Please select sessions</label>
            </div>
            <div className="col-md-8">
              <select
                className="form-control"
                onChange={this.handleChange.bind(this)}
                id="sessionSelect">
                {this.state.sessions.map((session) => {
                  let time = new Date(session);
                  return <option value={session}>{time.toLocaleString()}</option>;
                })}
              </select>
            </div>
          </div>

          { this.state.currentSession ? (
          <div>
            <div className="Result">
              <h3 className="resultSection">Sentiment Result</h3>
              <div className="row">
                <div>
                  {
                    this.state.result.msEmotion ?
                    <Chart emotion={this.state.result.msEmotion}/> :
                    <p>{"Sorry you don't have any sentiment result yet. Please go to practice page practicing first. Thank you!"}</p>
                  }
                </div>
              </div>
            </div>
            <hr className="featurette-divider"/>
            <div className="Result">
              <h3 className="resultSection">Speech Word Cloud</h3>
              <div className="row">
                <div >
                  {
                    this.state.result.watson ?
                    <Cloud trans={[this.state.result.watson.transcript]}/> :
                    <p>{"Sorry you don't have any word cloud yet. Please go to practice page adding text in the textbox first. Thank you!"}</p>
                  }
                </div>
                <div >
                  {
                    this.state.result.watson ?
                    <p>{"The clouds give greater prominence to words that appear more frequently in the source text"}</p> :
                    null
                  }
                </div>
              </div>
            </div>
            <hr className="featurette-divider"/>
            <div className="Result">
              <h3 className="resultSection">Speech Content Sentiment Result</h3>
                {
                  this.state.result.watson ?
                  <Radar watson={this.state.result.watson}/> :
                  <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
                }
            </div>
            <hr className="featurette-divider"/>
            <div className="Result">
              <h3 className="resultSection">Speech Tone Sentiment Result</h3>
              <div className="row">
                {
                  this.state.result.bv ? (
                  <div>
                    <div className="col-md-3">
                      <h4 className="toneTitle">Tone Cloud</h4>
                      <Tone_Cloud tone={[this.state.result.bv]}/>
                    </div>
                    <div className="col-md-6">
                      <h4 className="toneTitle">Attitude Result</h4>
                      <AttitudeResult tone={[this.state.result.bv]}/>
                    </div>
                    <div className="col-md-3">
                      <h4 className="toneTitle">Tone Summary</h4>
                      <ToneSummary tone={[this.state.result.bv]}/>
                    </div>
                  </div>
                  ) : <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
                }
              </div>
            </div>
          </div>) :
          <div className="row Result">
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
    socket: state.socket,
    sessions: state.allSessions.sessions,
    result: state.allResults,
    sessionId: state.allSessions.sessionId
  };
}

export default connect(mapStateToProps)(ProfilePage);
