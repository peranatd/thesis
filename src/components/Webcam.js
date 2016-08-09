// https://github.com/cezary/react-webcam
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import io from 'socket.io-client';
const socket = io();

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

export default class Webcam extends Component {
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

  constructor() {
    super();
    this.state = {
      hasUserMedia: false,
      recording: false,
      recordedBlobs: [],
      response: []
    };

    socket.on('emotion', (response) => {
      this.setState({response: this.state.response.concat([response.response])});
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
        }
      };

      if (this.props.audio) {
        constraints.audio = {
          optional: [{sourceId: audioSource}]
        };
      }

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
    let recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9'};

    let mediaRecorder = new window.MediaRecorder(this.stream, {mimeType: 'video/webm;codecs=vp9'});
    console.log('Created MediaRecorder', mediaRecorder, 'with options', {mimeType: 'video/webm;codecs=vp9'});

    // start recording
    mediaRecorder.start();
    console.log(this.state.recording);
    this.setState({recording:!this.state.recording}, () => {
      console.log(this.state.recording);
      this.callScreenshot(mediaRecorder);
    });

  }

  callScreenshot(mediaRecorder) {
    if (this.state.recording) {
      console.log('callScreenshot true');
      let a = this.getScreenshot();
      socket.emit('file', {name: Date.now(), data: a});

      setTimeout(() => {
        this.callScreenshot();
      }, 3000);
    } else {
      console.log('callScreenshot false');
      mediaRecorder.stop();
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
        <div>{this.state.response}</div>
      </div>
    );
  }
}