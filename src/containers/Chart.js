import React, { Component } from 'react';
import { connect } from 'react-redux';
import rd3 from 'react-d3';

let LineChart = rd3.LineChart;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    if(this.props.emotion.length){
      let categories = ['anger','contempt','disgust','fear','happiness','neutral','sadness','surprise'];

      let result = categories.map(name => {return {name: name, values: []};});

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
  componentWillReceiveProps(newProps) {
    let categories = ['anger','contempt','disgust','fear','happiness','neutral','sadness','surprise'];

    let result = categories.map(name => {return {name: name, values: []};});

    result.forEach(cat => {
      newProps.msEmotion.forEach((result, i) => {
        cat.values.push({x: i, y:+result.scores[cat.name]});
      });
    });
    this.setState({
      emotion: result
    });
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

export default connect(mapStateToProps)(Chart);
