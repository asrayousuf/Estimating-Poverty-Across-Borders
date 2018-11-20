import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import Tabss from "components/Tabss/Tabss";
import LeafMap from "components/Map/Map";

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

// Info of different years
const years = ["2016", "2017"];

/*
 * Info of different countries
 */ 

const worldStats = {
  "population": "7.7B",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};
const brazilStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};

const colombiaStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};

const mexicoStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};
const nepalStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};
const pakistanStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};
const polandStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};
const nigeriaStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};
const costaricaStats = {
  "population": "100M",
  "revenue": "0.5M/ppl",
  "twitters": "1M/ppl",
};


// Stats Card Object
const statsCardPopulation = {
  "name": "Population",
  "value": "10M",
  "icon": "pe-7s-id text-warning",
  "statsIcon": "fa fa-refresh",
  "statsText": "3 minutes ago",
};

const statsCardRevenue = {
  "name": "Revenue",
  "value": "10M",
  "icon": "pe-7s-cash text-success",
  "statsIcon": "fa fa-refresh",
  "statsText": "3 minutes ago",
};

const statsCardHappiness = {
  "name": "Happiness",
  "value": "5",
  "icon": "pe-7s-smile text-danger",
  "statsIcon": "fa fa-refresh",
  "statsText": "3 minutes ago",
};

const statsCardTwitters = {
  "name": "Twitters",
  "value": "100M",
  "icon": "fa fa-twitter text-info",
  "statsIcon": "fa fa-refresh",
  "statsText": "3 minutes ago",
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
    this.state = { 
      selectedCountry: "US",
      statsCardObjs: statsCardObjs,
    };
  }

  handleSelect(country) {
    this.setState({ selectedCountry: country });
  }

  handleButtonClick(country){
    statsCardPopulation.name = country;
    statsCardPopulation.value = 
    console.log(country);    
  }

  render() {
    const statsCards = statsCardObjs.map((obj) => {
      return (
        <Col key={obj.name} lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className={obj.icon} />}
            statsText={obj.name}
            statsValue={obj.value}
            statsIcon={<i className={obj.statsIcon} />}
            statsIconText={obj.statsText}
          />
        </Col>);
    });

    const mapData = {        
      lat: 51.505,
      lng: -0.09,
      zoom: 2,
    };


    return (
      <div>
        <Tabss handleSelect={this.handleSelect.bind(this)} tabs={years} />
        {/* <h2 className="blockquote text-center"> {this.state.selectedCountry} </h2> */}
        <div className="content">
          <Grid fluid>
            <Row>
              {statsCards}
            </Row>

            <Row>
              <Col md={16}>
                <div>
                    <LeafMap data={mapData} handleButtonClick={this.handleButtonClick}/>
                </div>
                  <BarChart
                    title="BarChart"
                    category="Map"
                    stats="Last Update: time"
                    statsIcon="fa fa-clock-o"
                    data={[5, 10, 1, 3]}
                    size={[200, 300]}
                  />
              </Col> 
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Dashboard;
