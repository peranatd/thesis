// https://github.com/cezary/react-webcam
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SentimentResponse } from '../actions/action_sentiments';
import { ToneResponse } from '../actions/action_tone';
import { SpeechToTextResponse } from '../actions/action_speechtotext';
import { findDOMNode } from 'react-dom';

import MediaStreamRecorder from 'msr';
import resampler from 'audio-resampler';
import toWav from 'audiobuffer-to-wav';


function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

class Webcam extends Component {
  static defaultProps = {
    audio: true,
    height: 480,
    width: 640,
    screenshotFormat: 'image/jpeg',
    onUserMedia: () => {}
  };

  static propTypes = {
    audio: PropTypes.bool,
    muted: PropTypes.bool,
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    screenshotFormat: PropTypes.oneOf([
      'image/webp',
      'image/png',
      'image/jpeg'
    ]),
    className: PropTypes.string
  };

  static mountedInstances = [];

  static userMediaRequested = false;

  constructor(props) {
    super(props);
    this.state = {
      hasUserMedia: false,
      recording: false,
      recordedBlobs: [],
      id: undefined,
      recorder: undefined
    };

    this.props.socket.on('emotion', (response) => {
      let data = JSON.parse(response.response);
      if (data.length) {
        this.props.SentimentResponse(data, this.props.sentiment);
      }
    });

    this.props.socket.on('bv', (response) => {
      this.props.ToneResponse(response, this.props.tone);
    });

    this.props.socket.on('stt', (response) => {
      let data = JSON.parse(response).results;
      this.props.SpeechToTextResponse(data, this.props.speechToText);
    });
  }

  componentDidMount() {
    if (!hasGetUserMedia()) return;

    Webcam.mountedInstances.push(this);

    if (!this.state.hasUserMedia && !Webcam.userMediaRequested) {
      this.requestUserMedia();
    }

  }

  requestUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    let sourceSelected = (audioSource, videoSource) => {
      let constraints = {
        video: {
          optional: [{sourceId: videoSource}]
        },
        audio: {
          optional: [{sourceId: audioSource}]
        }
      };

      navigator.getUserMedia(constraints, (stream) => {
        Webcam.mountedInstances.forEach((instance) => instance.handleUserMedia(null, stream));
      }, (e) => {
        Webcam.mountedInstances.forEach((instance) => instance.handleUserMedia(e));
      });

    };

    if (this.props.audioSource && this.props.videoSource) {
      sourceSelected(this.props.audioSource, this.props.videoSource);
    } else {
      if ('mediaDevices' in navigator) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          let audioSource = null;
          let videoSource = null;

          devices.forEach((device) => {
            if (device.kind === 'audio') {
              audioSource = device.id;
            } else if (device.kind === 'video') {
              videoSource = device.id;
            }
          });

          sourceSelected(audioSource, videoSource);
        })
        .catch((error) => {
          console.log(`${error.name}: ${error.message}`); // eslint-disable-line no-console
        });
      } else {
        MediaStreamTrack.getSources((sources) => {
          let audioSource = null;
          let videoSource = null;

          sources.forEach((source) => {
            if (source.kind === 'audio') {
              audioSource = source.id;
            } else if (source.kind === 'video') {
              videoSource = source.id;
            }
          });

          sourceSelected(audioSource, videoSource);
        });
      }
    }

    Webcam.userMediaRequested = true;
  }

  handleUserMedia(error, stream) {
    if (error) {
      this.setState({
        hasUserMedia: false
      });

      return;
    }

    navigator.getUserMedia({audio: true}, (audioStream) => {
      this.audioStream = audioStream;
    }, (e) => {});

    let src = window.URL.createObjectURL(stream);
    this.stream = stream;
    this.setState({
      hasUserMedia: true,
      src
    });

    this.props.onUserMedia();
  }

  componentWillUnmount() {
    let index = Webcam.mountedInstances.indexOf(this);
    Webcam.mountedInstances.splice(index, 1);
    console.log("Webcam.mountedInstances is ", Webcam.mountedInstances);

    if (Webcam.mountedInstances.length === 0 && this.state.hasUserMedia) {
      if (this.stream.stop) {
        this.stream.stop();
      } else {
        if (this.stream.getVideoTracks) {
          for (let track of this.stream.getVideoTracks()) {
            track.stop();
          }
        }
        if (this.stream.getAudioTracks) {
          for (let track of this.stream.getAudioTracks()) {
            track.stop();
          }
        }
      }
      Webcam.userMediaRequested = false;
      window.URL.revokeObjectURL(this.state.src);
    }
  }

  // method that handle recording when user click the start button
  handleRecording() {
    if (!this.state.recording) {
      let mediaRecorder = new MediaStreamRecorder(this.audioStream);
      this.setState({
        id: Date.now(),
        recorder: mediaRecorder
      }, () => {
        mediaRecorder.mimeType = 'audio/wav';
        mediaRecorder.audioChannels = 1;
        mediaRecorder.ondataavailable = (e) => {
          // resample to 8kHz before sending to server
          let u = URL.createObjectURL(e);
          resampler(u, 8000, (event) => {
            let wav = toWav(event.getAudioBuffer());
            let wavFile = new Blob([wav]);
            this.props.socket.emit('audio', {id:this.state.id, data: wavFile, isFinal: false});
            URL.revokeObjectURL(u);
          });
        };
        mediaRecorder.start(3000);
        this.setState({recording:!this.state.recording}, () => {
          this.callScreenshot(mediaRecorder);
        });
      });
    } else {
      this.setState({recording:!this.state.recording}, () => {
        this.state.recorder.stop();
        this.props.socket.emit('audio', {id:this.state.id, data: '', isFinal: true});
      });
    }
  }

  callScreenshot(mediaRecorder) {
    if (this.state.recording) {
      // console.log('callScreenshot true');
      let a = this.getScreenshot();
      this.props.socket.emit('file', {name: Date.now(), data: a});

      setTimeout(() => {
        this.callScreenshot(mediaRecorder);
      }, 3000);
    }
  }

  getScreenshot() {
    if (!this.state.hasUserMedia) return null;

    let canvas = this.getCanvas();
    return canvas.toDataURL(this.props.screenshotFormat);
  }

  getCanvas() {
    if (!this.state.hasUserMedia) return null;

    const video = findDOMNode(this);
    const actualVideo = video.getElementsByTagName('video')[0];
    if (!this.ctx) {
      let canvas = document.createElement('canvas');
      const aspectRatio = actualVideo.videoWidth / actualVideo.videoHeight;
      console.log(actualVideo);
      canvas.width = actualVideo.clientWidth;
      canvas.height = actualVideo.clientWidth / aspectRatio;

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }
    const {ctx, canvas} = this;
    ctx.drawImage(actualVideo, 0, 0, canvas.width, canvas.height);

    console.log(canvas);
    return canvas;
  }

  render() {
    const text = this.state.recording ? 'In progress' : 'Start';
    return (
      <div>
        <h3>video</h3>
        <video
          autoPlay
          width={this.props.width}
          height={this.props.height}
          src={this.state.src}
          muted={this.props.muted}
          className={this.props.className}
        />
        <button onClick={this.handleRecording.bind(this)}>{text}</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sentiment: state.sentiments,
    tone: state.tone,
    speechToText: state.speechToText,
    socket: state.socket
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    SentimentResponse: SentimentResponse,
    ToneResponse: ToneResponse,
    SpeechToTextResponse: SpeechToTextResponse
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Webcam);
