import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";

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

import D3_1 from '../../d3_components/D3_1';
import D3_2 from '../../d3_components/D3_2';


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

const targetCountries = ["Fly Back", "brazil","colombia", "costarica"];

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      countriesJson: {},
      citiesJson: {},
      countries: [],
      statsCardObjs: statsCardObjs,
    };
  }

  componentDidMount(){
    // Fetech the countries data
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://shrouded-lake-82256.herokuapp.com/get_data/';
    fetch(proxyUrl + targetUrl)
        .then(res => res.json())
        .then(
            (result) => {
                const countries = [];
                for(var country in result){
                    countries.push(country);
                }
                //console.log(result);
                const countriesJson = result;
                const citiesJson = targetCountries.map((target)=>{
                    if(target == "Fly Back")
                        return;
                    return countriesJson[target]['cities']
                });
        
                this.setState({
                    isLoaded: true,
                    countries,
                    countriesJson,
                    citiesJson,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
}


  handleButtonClick(country){
    statsCardPopulation.name = country;
    statsCardPopulation.value = null;
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

    if(!this.state.isLoaded){
        return <ProgressBar now={100}/>;
    }

    return (
      <div>
        <div className="content">
          <Grid fluid>
            <Row>
              {statsCards}
            </Row>
            <Row>
              <Col md={6}>
                  <D3_1
                    title="D3_1"
                    data={[5, 10, 1, 3]}
                    countriesJson={this.state.countriesJson}
                    citiesJson={this.state.citiesJson}
                    countries={this.state.countries} 
                    targetCountries ={targetCountries}
                  />
                  <D3_2
                    title="D3_2"
                    data={[5, 10, 1, 3]}
                    countriesJson={this.state.countriesJson}
                    citiesJson={this.state.citiesJson}
                    countries={this.state.countries} 
                    targetCountries ={targetCountries}
                    />
              </Col> 
              <Col md={6}>
                <LeafMap 
                    countriesJson={this.state.countriesJson}
                    citiesJson={this.state.citiesJson}
                    countries={this.state.countries} 
                    targetCountries ={targetCountries}
                    handleButtonClick={this.handleButtonClick}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Dashboard;
