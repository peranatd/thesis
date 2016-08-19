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

  componentWillReceiveProps (newProps) {
    // console.log('COMPONENTWILLRECEIVEPROPS', newProps);
    if (newProps.transcription.length) {
      const options = {
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false
      };
      let max = 0;
      let wordList = keyword.extract(newProps.transcription[0], options).reduce((memo, item)=>{
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

      // console.log('INSIDE COMPONENTWILLRECEIVEPROPS', wordArray);
      let fill = scaleOrdinal(schemeCategory20);

      let layout = cloud()
          .size([500, 500])
          .words(wordArray)
          // .padding(3)
          // .rotate(function() { return Math.random() < 0.5 ? 90 : 0; })
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
          .append('g')
            .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
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
  }


  render () {
    return (
      <div>
        <svg id="cloud"></svg>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transcription: state.transcription
  };
}

export default connect(mapStateToProps)(Cloud);
