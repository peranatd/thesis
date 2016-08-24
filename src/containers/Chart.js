import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { msEmotionReset }  from '../actions/action_msEmotion';
import rd3 from 'react-d3';

let LineChart = rd3.LineChart;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatData(props) {
    if (props.emotion.length) {
      const categories = ['anger','contempt','disgust','fear','happiness','neutral','sadness','surprise'];

      const result = categories.map(name => {return {name: name, values: []};});

      result.forEach(cat => {
        this.props.emotion.forEach((result, i) => {
          cat.values.push({x: i, y:+result.scores[cat.name]});
        });
      });
      this.setState({
        emotion: result
      });
    }
  }

  componentWillMount(){
    this.formatData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.formatData(newProps);
  }

  render() {
    let lineChart;
    if (this.state.emotion) {
      lineChart = <LineChart legend={true} width={600} height={300} data={this.state.emotion}/>;
    }
    return (
      <div>
        {lineChart}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    msEmotion: state.msEmotion
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    msEmotionReset: msEmotionReset
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
