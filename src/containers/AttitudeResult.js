import React from 'react';
import { connect } from 'react-redux';
import { TagCloud } from "react-tagcloud";

// const description = {
//   temper: {
//     low: {
//       src: "https://s26.postimg.org/umuufj815/temper_low.png",
//       info: "Low temper occur when the speaker experiences and expresses depressive emotions in an inhibited fashion, such as sadness, pain, suffering, insult, inferiority, self-blame, self-criticism, regret, fear, anxiety and concern (can also be interpreted as fatigued). It is as though the speaker is waning, growing smaller or pulling back."
//     },
//     medium: {
//       src: "https://s26.postimg.org/uo4s8y9ux/temper_med.png",
//       info: ""
//     }
//   }
// }
class AttitudeResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temper: '',
      valence: '',
      arousal: ''
    };
  }
  showinfo(){
    console.log('apple')
  }
  componentWillReceiveProps(newProps){
    let result = JSON.parse(newProps.tone)[0].result.analysisSummary.AnalysisResult;
    let self = this;
    if(result.Temper.Mode === 'low'){
      this.setState({temper:'https://s26.postimg.org/umuufj815/temper_low.png'})
    }
    if(result.Temper.Mode === 'medium'){
      this.setState({temper:'https://s26.postimg.org/uo4s8y9ux/temper_med.png'})
    }
    if(result.Temper.Mode === 'high'){
      this.setState({temper:'https://s26.postimg.org/52sk93mnd/temper_high.png'})
    }
    if(result.Valence.Mode === 'negative'){
      this.setState({valence:'https://s26.postimg.org/5w561pso9/valence_negative.png'})
    }
    if(result.Valence.Mode === 'neutral'){
      this.setState({valence:'https://s26.postimg.org/ktdn2q5wp/valence_neutral.png'})
    }
    if(result.Valence.Mode === 'positive'){
      this.setState({valence:'https://s26.postimg.org/ybkjf0i21/valence_positive.png'})
    }
    if(result.Arousal.Mode === 'high'){
      this.setState({arousal:'https://s26.postimg.org/ifvpbprhl/arousal_high.png'})
    }
    if(result.Arousal.Mode === 'neutral'){
      this.setState({arousal:'https://s26.postimg.org/lciqbzxbd/arousal_mid.png'})
    }
    if(result.Arousal.Mode === 'low'){
      this.setState({arousal:'https://s26.postimg.org/j6ofhhtux/arousal_low.png'})
    }
  }

  render() {
    return (
      <div>
        <div><span>Temper:</span><img className="icon" src={this.state.temper} onClick={this.showinfo.bind(this)}/></div>
        <div><span>Valence:</span><img className="icon" src={this.state.valence} onClick={this.showinfo.bind(this)} /></div>
        <div><span>Arousal:</span><img className="icon" src={this.state.arousal} onClick={this.showinfo.bind(this)} /></div>
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
