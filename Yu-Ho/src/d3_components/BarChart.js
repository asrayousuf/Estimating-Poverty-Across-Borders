import React, { Component } from 'react'
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
                  <div className={"card" + (this.props.plain ? " card-plain" : "")}>
                        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
                              <h4 className="title">{this.props.title}</h4>
                              <p className="category">{this.props.category}</p>
                        </div>
                        <div
                        className={
                        "content" +
                        (this.props.ctAllIcons ? " all-icons" : "") +
                        (this.props.ctTableFullWidth ? " table-full-width" : "") +
                        (this.props.ctTableResponsive ? " table-responsive" : "") +
                        (this.props.ctTableUpgrade ? " table-upgrade" : "")
                        }
                        >
                              <svg ref={node => this.node = node}
                              width={this.props.size[0]} height={this.props.size[1]}>
                              </svg>

                              <div className="footer">
                                    {this.props.legend}
                                    {this.props.stats != null ? <hr /> : ""}
                                          <div className="stats">
                                          <i className={this.props.statsIcon} /> {this.props.stats}
                                          </div>
                              </div>
                        </div>
                  </div>

            );
      }
}
export default BarChart;