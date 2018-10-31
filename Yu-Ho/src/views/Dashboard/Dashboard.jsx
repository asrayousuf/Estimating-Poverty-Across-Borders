import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  // legendPie,
  // dataSales,
  // optionsSales,
  // responsiveSales,
  // legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  // legendBar
} from "variables/Variables.jsx";

import BarChart from '../../d3_components/BarChart';

// Info of different countries
const countries = ["US","Canada"];

const usStats = {
  "name" : "US",
  "population": "100M", 
  "revenue" : "0.5M/ppl",
  "twitters": "1M/ppl",
};

const canadaStats = {
  "name" : "Cananda",
  "population": "100M", 
  "revenue" : "0.5M/ppl",
  "twitters": "1M/ppl",
};

// Stats Card Object
const statsCardPopulation = {
  "name" : "Population",  
  "value" : "10M",
  "icon" : "pe-7s-id text-warning",
  "statsIcon" : "fa fa-refresh",
  "statsText" : "3 minutes ago",
};

const statsCardRevenue = {
  "name" : "Revenue",  
  "value" : "10M",
  "icon" : "pe-7s-cash text-success",
  "statsIcon" : "fa fa-refresh",
  "statsText" : "3 minutes ago",
};

const statsCardHappiness = {
  "name" : "Happiness",
  "value" : "5",
  "icon" : "pe-7s-smile text-danger", 
  "statsIcon" : "fa fa-refresh",
  "statsText" : "3 minutes ago",
};

const statsCardTwitters = {
  "name" : "Twitters",
  "value" : "100M",
  "icon" : "fa fa-twitter text-info",
  "statsIcon" : "fa fa-refresh",
  "statsText" : "3 minutes ago",
};

const statsCardObjs = [
  statsCardPopulation,
  statsCardRevenue,
  statsCardHappiness,
  statsCardTwitters,
];

class Dashboard extends Component {
    
  constructor(props) {
    super(props);
    this.state = {country: countries[0]};
  }
    

  render() {
    const statsCards = statsCardObjs.map((obj)=>{
      return (
      <Col key={obj.name} lg={3} sm={6}>
        <StatsCard
                bigIcon={<i className= {obj.icon} />}
                statsText= {obj.name}
                statsValue= {obj.value}
                statsIcon={<i className={obj.statsIcon} />}
                statsIconText= {obj.statsText}
              />
      </Col>);
    });

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {statsCards}
          </Row>

          <Row>
            <Col md={8}>
              <div>
                <BarChart 
                  title="BarChart"
                  category="Map"
                  stats="Last Update: time"
                  statsIcon="fa fa-clock-o"
                  data={[5,10,1,3]} 
                  size={[200,300]} 
                  />
              </div>
              {/* <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              /> */}
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Last Update: time"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
