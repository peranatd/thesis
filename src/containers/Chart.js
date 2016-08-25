import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { msEmotionReset }  from '../actions/action_msEmotion';
import { legendColor } from 'd3-svg-legend'
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeLineChart(data) {
    let margin = {top: 20, right: 50, bottom: 100, left: 50};
    let width = 800 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    d3.select('.lineChart').remove();
    d3.select('.tooltip').remove();
    d3.select('.label').remove();

    let svg = d3.select('#lineChart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'lineChart')
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(data[0].values, function(d) { return d.x; }));

    let y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1]);

    let xAxis = d3.axisBottom(x);

    let yAxis = d3.axisLeft(y);

    let line = d3.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })
        .curve(d3.curveMonotoneX);

    let div = d3.select('#lineChart').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    let ordinal = d3.scaleOrdinal()
      .domain(['happiness', 'contempt', 'surprise', 'neutral', 'sadness', 'fear', 'disgust','anger'])
      .range(['#388DC5', '#76B7DB', '#A8D0E5', '#CDE0F1', '#FDD6AC', '#FDB776', '#FD9844', '#E9600A']);

    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", `translate(${50},${height + 50})`);

    let legendOrdinal = legendColor()
      .orient('horizontal')
      .shape('circle')
      .shapePadding(70)
      .scale(ordinal);

    svg.select(".legendOrdinal")
      .call(legendOrdinal);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    function mouseOver() {
      let context = this;
      let position = d3.mouse(document.getElementsByTagName('body')[0]);
      d3.select(context)
        .transition()
        .duration(200)
        .style('stroke-width', '6px');

      div.transition()
        .duration(200)
        .style('opacity', 0.9)
        .style('position', 'absolute');
      div.html(context.getAttribute('value'))
        .style('font-family', 'Lato')
        .style('font-size', '15px')
        .style('left', position[0] + 10 + 'px')
        .style('top', position[1] - 25 + 'px');
    }

    function mouseOut() {
      d3.select(this)
        .transition()
        .duration(500)
        .style('stroke-width', '2px');

      div.transition()
        .duration(500)
        .style("opacity", 0);
    }

    let color = ['#388DC5', '#76B7DB', '#A8D0E5', '#CDE0F1', '#FDD6AC', '#FDB776', '#FD9844', '#E9600A'];
    for (let i = 0; i < data.length; i++) {
      svg.append('path')
          .datum(data[i].values)
          .attr('class', 'line')
          .attr('value', data[i].name)
          .attr('d', line)
          .style('fill', 'none')
          .style('stroke', color[i])
          .style('stroke-width', '2px')
          .on('mouseover', mouseOver)
          .on('mouseout', mouseOut);
    }
  }


  formatData(props) {
    if (props.emotion.length) {
      const categories = ['happiness', 'contempt', 'surprise', 'neutral', 'sadness', 'fear', 'disgust','anger'];

      const result = categories.map(name => {return {name: name, values: []};});

      result.forEach(cat => {
        this.props.emotion.forEach((result, i) => {
          cat.values.push({x: i * 3, y:+result.scores[cat.name]});
        });
      });
      this.setState({
        emotion: result
      }, () => {
        console.log(this.state.emotion);
        this.makeLineChart(this.state.emotion);
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
    return (
      <div id="lineChart">
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
