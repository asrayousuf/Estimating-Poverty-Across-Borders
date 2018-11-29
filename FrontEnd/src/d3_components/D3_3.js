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
var countries_idx = [ "","brazil","colombia","costarica","pakistan","mexico","poland","nigeria"];

class D3_3 extends Component {
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
   	}

    state = {
      selectedOption: null,
      dummySelectedOption: [],
    }

    handleChange = (selectedOption) => {
      data_1= [];
      for (var key in selectedOption){
        data_1.push(selectedOption[key]['value'])
      };
      this.setState({ selectedOption });
      return ;
    }

    handleDummyChange = (dummySelectedOption) =>{
        this.setState({dummySelectedOption});
    }

    componentDidMount() {
        var svg = d3.select("#svg3");
        chartG = svg.append('g')
                        .attr('transform', 'translate('+[padding.l, padding.t]+')');
        this.createBarChart()
    }
    componentDidUpdate() {
      this.createBarChart()
    }

    updateData(){
        const idx = (countries_idx.indexOf(this.props.selectedCountry));
        var cities= [];

        for (var key in this.props.citiesJson[idx]){
          cities.push({
            "city": this.props.citiesJson[idx][key]['city_name'],
            "government": this.props.citiesJson[idx][key]['government'],
            "pharmacy": this.props.citiesJson[idx][key]['pharmacy'],
            "bank": this.props.citiesJson[idx][key]['bank'],
            "secondary": this.props.citiesJson[idx][key]['secondary']
          });
        };
        options = [];
        for (var i in cities){
          options.push({
            'value': cities[i],
            'label': cities[i]['city']
          })
        };

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

        
        var svg = d3.select("#svg3");
        svg.selectAll(".bar").remove();
        svg.selectAll(".domain").remove();

        var svgWidth = +svg.attr('width');
        var svgHeight = +svg.attr('height');


        // Compute chart dimensions
        var chartWidth = svgWidth - padding.l - padding.r;
        var chartHeight = svgHeight - padding.t - padding.b-30;

        // Compute the spacing for bar bands based on all 26 letters
        var barBand = chartHeight / 26;
        var barHeight = barBand * 0.7;
        
        

        var y = d3.scaleLinear()
            .rangeRound([0, chartHeight])
            .domain([0, 300]);

        var ax_y = d3.scaleLinear()
            .rangeRound([0, chartHeight])
            .domain([300, 0]);

        var z = d3.scaleOrdinal()
                .range(["#98abc5","#ff8c00", "#9999ff", "#FFC0CB"]);

        var keys= ["Bank", "Schools", "Pharmacy", "Government"]

        var yAxis = d3.axisLeft(ax_y);
        // Make the y axis......
        chartG.append("g")
            .attr("class", "axis")
            //.attr("y", 10)
            .attr("transform", "translate(40,0)")
            .call(yAxis)
            //.call(d3.axisLeft(y).ticks(8))
          
        chartG.append("text")
            .attr("x", 2)
            .attr("y", 10)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .attr("transform", "rotate(90) translate(100, -7)")
            .text("Count");

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
            .attr("x", chartWidth - 40)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", chartWidth - 45)
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
                var temp = [d.government, d.pharmacy, d.secondary, d.bank]
                console.log(temp);
                return 'translate('+[(i*6 * barBand + 40), (chartHeight- y(Math.max(...temp)))] + ')';
            });

        barsEnter.append('rect')
                .transition(t)
                .attr('x', barHeight+16)
                .attr('y', function(d) {
                   var temp = [d.government, d.pharmacy, d.secondary, d.bank]
                   return (y(Math.max(...temp)) - y(d.government));  
                })
                .attr('width', barHeight+10)
                .attr('height', function(d){
                    return y(d.government)
                })
                .style("fill", z );

        barsEnter.append('rect')
                .transition(t)                
                .attr('x', barHeight+32)
                .attr('y', function(d){
                    var temp = [d.government, d.pharmacy, d.secondary, d.bank]
                    return (y(Math.max(...temp)) - y(d.pharmacy));
                })
                .attr('width', barHeight+10)
                .attr('height', function(d){
                    return y(d.pharmacy)
                })
                .style("fill", z(1) );

        barsEnter.append('rect')
                .transition(t)                
                .attr('x', barHeight+48)
                .attr('y', function(d){
                    var temp = [d.government, d.pharmacy, d.secondary, d.bank]
                    return (y(Math.max(...temp)) - y(d.secondary));
                })
                .attr('width', barHeight+10)
                .attr('height', function(d){
                    return y(d.secondary)
                })
                .style("fill", z(2) );

        barsEnter.append('rect')
                .transition(t)                
                .attr('x', barHeight+64)
                .attr('y', function(d){
                    var temp = [d.government, d.pharmacy, d.secondary, d.bank]
                    return (y(Math.max(...temp)) - y(d.bank));
                })
                .attr('width', barHeight+10)
                .attr('height', function(d){
                    return y(d.bank)
                })
                .style("fill", z(3) );

        barsEnter.append('text')
            .attr('x', barHeight + 20)
            .attr('y', function(d){
                var temp = [d.government, d.pharmacy, d.secondary, d.bank]
                return 20;
            })
            .attr("transform", "rotate(-45)")
            .attr('font-size', '9')
            .text(function(d){
                return d.city;
            });

        bars.exit().remove();   
       };
     };

    render() {
      const { selectedOption, dummySelectedOption } = this.state;
      const dummyOptions = ['Infrastructure', 'Migration', 'Popularity', 'Activity'];
      const dummyOption = dummyOptions.map((op)=>{
          return {value: op, label: op};
      });
      this.updateData();
      return( 
            <Wrapper 
                title={this.props.title}
                hCenter={this.props.hCenter}
                ctAllIcons={this.props.ctAllIcons}
                ctTableFullWidth={this.props.ctTableFullWidth}
                ctTableUpgrade={this.props.ctTableUpgrade}
                size={this.props.size} >
            <Select
                placeholder={"Select Development Index"}
                value={dummySelectedOption}
                isMulti
                onChange={this.handleDummyChange}
                options={dummyOption} />

            <svg id="svg3" height="300" width="700" ref={node => this.node = node} />
            <Select
                placeholder={"Select City"}
                value={selectedOption}
                isMulti
                onChange={this.handleChange}
                options={options} />
            </Wrapper>
            
            
        );
    }
}
export default D3_3;