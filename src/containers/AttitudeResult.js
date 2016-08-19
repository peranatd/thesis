import React from 'react';
import Loader from "react-loader";
import { connect } from 'react-redux';
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
    this.setState({attitude:Object.assign(this.state[attitude],{displayInfo:!this.state[attitude].displayInfo})});
  }

  componentWillReceiveProps(newProps){
    let result = JSON.parse(newProps.tone)[0].result.analysisSummary.AnalysisResult;

    if(result.Temper.Mode === 'low'){
      this.setState({
        temper: {
          src:attitudeData.temper.low.src,
          info:attitudeData.temper.low.info
        },
        loaded:true
      });
    }
    if(result.Temper.Mode === 'medium'){
      this.setState({
        temper: {
          src:attitudeData.temper.medium.src,
          info:attitudeData.temper.medium.info
        },
        loaded:true
      });
    }
    if(result.Temper.Mode === 'high'){
      this.setState({
        temper: {
          src:attitudeData.temper.high.src,
          info:attitudeData.temper.high.info
        },
        loaded:true
      });
    }
    if(result.Valence.Mode === 'negative'){
      this.setState({
        valence: {
          src:attitudeData.valence.negative.src,
          info:attitudeData.valence.negative.info
        },
        loaded:true
      });
    }
    if(result.Valence.Mode === 'neutral'){
      this.setState({
        valence:{
          src:attitudeData.valence.neutral.src,
          info:attitudeData.valence.neutral.info
        },
        loaded:true
      });
    }
    if(result.Valence.Mode === 'positive'){
      this.setState({
        valence:{
          src:attitudeData.valence.positive.src,
          info:attitudeData.valence.positive.info
        },
        loaded:true
      });
    }
    if(result.Arousal.Mode === 'high'){
      this.setState({
        arousal:{
          src:attitudeData.arousal.high.src,
          info:attitudeData.arousal.high.info
        },
        loaded:true
      });
    }
    if(result.Arousal.Mode === 'neutral'){
      this.setState({
        arousal:{
          src:attitudeData.arousal.neutral.src,
          info:attitudeData.arousal.neutral.info
        },
        loaded:true
      });
    }
    if(result.Arousal.Mode === 'low'){
      this.setState({
        arousal:{
          src:attitudeData.arousal.low.src,
          info:attitudeData.arousal.low.info
        },
        loaded:true
      });
    }
  }

  render() {
    return (
      <div>
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


function mapStateToProps(state) {
  return {
    tone: state.tone
  };
}

export default connect(mapStateToProps)(AttitudeResult);
