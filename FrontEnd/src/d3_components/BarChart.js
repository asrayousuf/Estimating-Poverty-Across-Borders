import React, { Component } from 'react'
import Wrapper from 'd3_components/Wrapper';
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
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
		const node = this.node 
		const dataMax = max(this.props.data)
		const yScale = scaleLinear()
			.domain([0, dataMax])
			.range([0, this.props.size[1]])
		select(node)
			.selectAll('rect')
			.data(this.props.data)
            .enter()
            .append('rect')
      
      	select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()
      
      	select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d,i) => i * 25)
            .attr('y', d => this.props.size[1] - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25)
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