import React, { Component } from 'react'
import Wrapper from 'd3_components/Wrapper';
import * as d3 from "d3";
import Select from 'react-select';

var data = {};
var data_1= [];
var final_data= [];
// - targetCountries
var options = [];

var arr= [];
for (var key in data){
  arr.push({
    "country": key,
    "hdi": data[key]["hdi"],
    "latitude": data[key]["latitude"],
    "longitude": data[key]["longitude"]
  })
};

var chartG = null;
var padding = {t: 10, r: 10, b: 10, l: 10};
var arr= [];

class D3_2 extends Component {
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
        var cities= [];
        for (var key in this.props.citiesJson[3]){
          cities.push({
            "city": this.props.citiesJson[3][key]['city_name'],
            "average_inflow_2016": this.props.citiesJson[3][key]['average_inflow_2016'],
            "average_inflow_2017": this.props.citiesJson[3][key]['average_inflow_2017'],
            "average_outflow_2016": this.props.citiesJson[3][key]['average_outflow_2016'],
            "average_outflow_2017": this.props.citiesJson[3][key]['average_outflow_2017']
          });
        };
        // console.log(cities);
        for (var i in cities){
          options.push({
            'value': cities[i],
            'label': cities[i]['city']
          })
        };
   	}

    state = {
      selectedOption: null,
    }

    handleChange = (selectedOption) => {
      data_1= [];
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
      for (var key in selectedOption){
        data_1.push(selectedOption[key]['value'])
      };
      return 
      }

    componentDidMount() {
        var svg = d3.select("#svg2");
        chartG = svg.append('g')
                        .attr('transform', 'translate('+[padding.l, padding.t]+')');
        this.createBarChart()
    }
    componentDidUpdate() {
      this.createBarChart()
    }

        // This may have problem
        // Because if you create 2 svgs, using d3.select("svg")
        // D3 may only select 1
        // I have no time to figure it out
        // The key word may be 
        // Reference/ D3/ ID/ React/ D3.select


    createBarChart() {        

        var t = d3.transition()
                    .duration(750);

        
        var svg = d3.select("#svg2");
        
        var svgWidth = +svg.attr('width');
        var svgHeight = +svg.attr('height');


        // Compute chart dimensions
        var chartWidth = svgWidth - padding.l - padding.r;
        var chartHeight = svgHeight - padding.t - padding.b-30;

        // Compute the spacing for bar bands based on all 26 letters
        var barBand = chartHeight / 26;
        var barHeight = barBand * 0.7;
        
        

        var y = d3.scaleLinear()
            .rangeRound([chartHeight, 0])
            .domain([0,1]);

        var z = d3.scaleOrdinal()
                .range(["#98abc5","#ff8c00"]);

        var keys= ["average_outflow_2017", "average_outflow_2016",
         "average_inflow_2017", "average_inflow_2016"]

        // Make the y axis......
        chartG.append("g")
            .attr("class", "axis")
            .attr("y", 10)
            .call(d3.axisLeft(y).ticks(8))
          
          chartG.append("text")
            .attr("x", 2)
            .attr("y", 10)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start");

        // Makes the legends......
        var legend = chartG.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", chartWidth - 110)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", chartWidth - 115)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        updateChart(data_1);


        function updateChart(data_1){

        var bars= chartG.selectAll('.bar')
                       .data(data_1, function(d){
                        return d.city;
                    });
              
        // bars.attr("class", "exit")
        //       .transition(t)
        //       .attr("y", 60)
        //       .style("fill-opacity", 1e-6)

        // bars.attr("class", "update")
        //       .attr("y", 0)
        //       .style("fill-opacity", 1)
        //     .transition(t)
        //       .attr("x", function(d, i) { return i * 32; });
        
        var barsEnter= bars.enter()
                           .append('g')
                           .attr('class', 'bar');

        bars.merge(barsEnter)
            .attr('transform', function(d,i){
                return 'translate('+[(i*6 * barBand + 20), (chartHeight- y(d.real_hdi))]+')';
            });

        barsEnter.append('rect')
            .transition(t)
            
            .attr('y', function(d){
                chartHeight - y(d.real_hdi)
            })
            .attr('width', barHeight+30)
            .attr('height', function(d){
                return y(d.real_hdi)
            })
            .style("fill", z )
            ;

        barsEnter.append('text')
            .attr('x', 0)
            .attr('y', -10)
            .text(function(d){
                return d.city;
            });

        bars.exit().remove();   
       };
     };

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
        <svg id="svg2" height="300" width="700" ref={node => this.node = node} />
        

            <Select
        value={selectedOption}
        isMulti
        onChange={this.handleChange}
        options={options} />
            </Wrapper>
            
            
        );
    }
}
export default D3_2;