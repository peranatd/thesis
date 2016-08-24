import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { msEmotionReset }  from '../actions/action_msEmotion';
import TextBox from '../components/TextBox';
import Webcam from './Webcam';
import Chart from './Chart';
import Cloud from './Cloud';

class Practice extends Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionTimestamp: Date.now()
    };
  }

  componentWillMount() {
    this.props.msEmotionReset(null, this.props.msEmotion);
    this.props.socket.emit('sessionStart', {
      sessionTimestamp: this.state.sessionTimestamp,
      username: this.context.user.username
    });
  }

  handleTextChange (event) {
    event.target.value;
  }

  render () {
    return (
    <div className="container">
      <h1> Practice </h1>
      <div className="row">
        <Webcam
          sessionTimestamp={this.state.sessionTimestamp}
          user={this.context.user}
        />
        <TextBox
          sessionTimestamp={this.state.sessionTimestamp}
          user={this.context.user}
        />
      </div>
      <div className="row">
        <Chart emotion={this.props.msEmotion}/>
      </div>
      <div className="row">
        <Cloud trans={this.props.transcription}/>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    msEmotion: state.msEmotion,
    transcription: state.transcription
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    msEmotionReset: msEmotionReset
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
