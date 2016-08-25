import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cloud from 'd3-cloud';
import { scaleOrdinal, schemeCategory20 } from 'd3-scale';
import keyword from 'keyword-extractor';

class Cloud extends Component {
  constructor(props){
    super(props);
  }

  formatData(props) {
    const options = {
      language:"english",
      remove_digits: true,
      return_changed_case:true,
      remove_duplicates: false
    };
    let max = 1;
    let wordList = keyword.extract(props.trans[0], options).reduce((memo, item)=>{
      item = item.toLowerCase();
      if (item in memo) {
        memo[item] += 1;
        if (memo[item] > max) { max = memo[item]; }
      } else {
        memo[item] = 1;
      }
      return memo;
    },{});

    let wordArray = Object.keys(wordList).map((word)=>{
      return {text: word, size: wordList[word]};
    });

    let fill = scaleOrdinal(schemeCategory20);

    let layout = cloud()
        .size([950, 450])
        .words(wordArray)
        .spiral('archimedean')
        .font('Impact')
        .fontSize(function(d) { return 10 + 60*Math.pow(d.size/max, 1); })
        .on('end', draw);

    layout.start();

    function draw (words) {
      d3.select('.wordCloud').remove();

      d3.select('#cloud')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .attr('viewBox','0 0 950 450')
          .attr('preserveAspectRatio','xMidYMid meet')
        .append('g')
          .attr('transform', 'translate(' + 400 + ',' + layout.size()[1] / 2 + ')')
          .attr('class', 'wordCloud')
        .selectAll('text')
          .data(words)
        .enter().append('text')
          .style('font-size', function(d) { return d.size + 'px'; })
          .style('font-family', 'Impact')
          .style('fill', function(d, i) { return fill(i); })
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
          })
          .text(function(d) { return d.text; });
    }
  }

  componentDidMount(){
    if(this.props.trans.length){
      this.formatData(this.props);
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.trans.length) {
      this.formatData(newProps);
    }
  }


  render () {
    return (
      <div>
        <svg id="cloud"></svg>
      </div>
    );
  }
}

export default Cloud;
