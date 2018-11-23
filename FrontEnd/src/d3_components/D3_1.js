import React, { Component } from 'react'
import Wrapper from 'd3_components/Wrapper';
import * as d3 from "d3";
import Select from 'react-select';

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

const options = [
  { value: 'Country', label: 'Country' },
  { value: 'Mun', label: 'Mun' },
  { value: 'City', label: 'City' }
];

var arr= [];
for (var key in data){
  arr.push({
    "country": key,
    "hdi": data[key]["hdi"],
    "latitude": data[key]["latitude"],
    "longitude": data[key]["longitude"]
  })
};

class D3_1 extends Component {
  constructor(props){
      super(props)
        this.createBarChart = this.createBarChart.bind(this)
        // You can access the data through 
        // this.props.XXXX 
        // includes
        // - countriesJson
        // - citiesJson
        // - countries
        // - targetCountries
        // - selectedCountry (this country selected by button)
   
    }

    state = {
        selectedOption: null,
      }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption['value']);
      var data_t= this.props.countriesJson;
      console.log(data_t);
      return 
        // console.log(this.data_t);
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
      this.createBarChart()
    }
    createBarChart() {
        console.log(this.data_t);
        var margin = {top: 80, right: 180, bottom: 80, left: 180},
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        // This may have problem
        // Because if you create 2 svgs, using d3.select("svg")
        // D3 may only select 1
        // I have no time to figure it out
        // The key word may be 
        // Reference/ D3/ ID/ React/ D3.select
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
      const { selectedOption } = this.state;
        return( 
            <Wrapper 
                title={this.props.title}
                hCenter={this.props.hCenter}
                ctAllIcons={this.props.ctAllIcons}
                ctTableFullWidth={this.props.ctTableFullWidth}
                ctTableUpgrade={this.props.ctTableUpgrade}
                size={this.props.size} >
        <svg ref={node => this.node = node} />
        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        />
        
            </Wrapper>
        );
    }
}
export default D3_1;