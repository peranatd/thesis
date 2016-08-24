import React from 'react';
import Loader from "react-loader";
import attitudeData from '../attitudeData';

class AttitudeResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temper: {src:'', info: '', displayInfo:false},
      valence: {src:'', info: '', displayInfo:false},
      arousal: {src:'', info: '', displayInfo:false},
      loaded: false
    };
  }

  showinfo(attitude){
    this.setState({
      attitude: Object.assign(this.state[attitude],
        { displayInfo: !this.state[attitude].displayInfo }
      )
    });
  }

  componentDidMount(){
    if(this.props.tone[0]){
      const result = this.props.tone[0].result.analysisSummary.AnalysisResult;
      const temperMode = result.Temper.Mode;
      const valenceMode = result.Valence.Mode;
      const arousalMode = result.Arousal.Mode;
      this.setState({
        temper: {
          src: attitudeData.temper[temperMode].src,
          info: attitudeData.temper[temperMode].info
        },
        valence: {
          src: attitudeData.valence[valenceMode].src,
          info: attitudeData.valence[valenceMode].info
        },
        arousal: {
          src: attitudeData.arousal[arousalMode].src,
          info: attitudeData.arousal[arousalMode].info
        },
        loaded: true
      });
    }
  }

  render() {
    return (
      <div className="col-md-6 attitude">
        <div>
          <span>Temper:</span>
          <Loader loaded={this.state.loaded}>
            <img className="icon" src={this.state.temper.src} onClick={this.showinfo.bind(this,'temper')}/>
          </Loader>
        </div>
        {this.state.temper.displayInfo ? <div>{this.state.temper.info}</div> : null}
        <div>
          <span>Valence:</span>
          <Loader loaded={this.state.loaded}>
            <img className="icon" src={this.state.valence.src} onClick={this.showinfo.bind(this,'valence')} />
          </Loader>
        </div>
        {this.state.valence.displayInfo ? <div>{this.state.valence.info}</div> : null}
        <div>
          <span>Arousal:</span>
          <Loader loaded={this.state.loaded}>
            <img className="icon" src={this.state.arousal.src} onClick={this.showinfo.bind(this,'arousal')} />
          </Loader>
        </div>
        {this.state.arousal.displayInfo ? <div>{this.state.arousal.info}</div> : null}
      </div>
    );
  }
}

export default AttitudeResult;
