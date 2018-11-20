import React, { Component } from 'react'
import Wrapper from 'd3_components/Wrapper';
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import * as d3 from "d3";

const data = {
    "Afghanistan": {
      "hdi": "0.498", 
      "latitude": "33.93911", 
      "longitude": "67.709953"
    }, 
    "Albania": {
      "hdi": "0.785", 
      "latitude": "41.153332", 
      "longitude": "20.168331"
    }, 
    "Algeria": {
      "hdi": "0.754", 
      "latitude": "28.033886", 
      "longitude": "1.659626"
    }, 
    "American Samoa": {
      "hdi": "0", 
      "latitude": "-14.270972", 
      "longitude": "-170.132217"
    }, 
};

var arr= [];
for (var key in data){
	arr.push({
		"country": key,
		"hdi": data[key]["hdi"],
		"latitude": data[key]["latitude"],
		"longitude": data[key]["longitude"]
	})
};

class BarChart extends Component {
	constructor(props){
    	super(props)
        this.createBarChart = this.createBarChart.bind(this)
   	}
   	componentDidMount() {
      	this.createBarChart()
   	}
   	componentDidUpdate() {
    	this.createBarChart()
   	}
   	createBarChart() {
        // const node = this.node 

        var margin = {top: 80, right: 180, bottom: 80, left: 180},
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var svg = d3.select("svg");

        var x = d3.scaleOrdinal()
		.domain(arr.map(function(d) { return d.country; }))
        .range([0, width]);
        
        var y= d3.scaleLinear()
			.domain([0, d3.max(arr, function(d) { return d.hdi; })])
			.range([height, 0]);
        
            var xAxis = d3.axisTop(x)
        
        var yAxis = d3.axisLeft(y)
        
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
  
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");        

        svg.selectAll("bar")
      .data(arr)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width","20")
      .style("fill","red")
      .attr("y", function(d) { 
      	return y(d.hdi); })
      .attr("height", function(d, i) { 
      	return height - y(d.hdi); });
    }
    render() {
        return( 
            <Wrapper 
                title={this.props.title}
                category={this.props.category}
                hCenter={this.props.hCenter}
                ctAllIcons={this.props.ctAllIcons}
                ctTableFullWidth={this.props.ctTableFullWidth}
                ctTableUpgrade={this.props.ctTableUpgrade}
                stats={this.props.stats}
                statsIcon={this.props.stats.statsIcon}
                size={this.props.size} >
                        
				<svg ref={node => this.node = node}
                        width={this.props.size[0]} height={this.props.size[1]}>
                </svg>      
            </Wrapper>
        );
    }
}
export default BarChart;