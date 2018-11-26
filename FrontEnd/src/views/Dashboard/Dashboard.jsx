import React, { Component } from "react";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import LeafMap from "components/Map/Map";

import D3_1 from '../../d3_components/D3_1';
import D3_2 from '../../d3_components/D3_2';
import D3_3 from '../../d3_components/D3_3';

const targetCountries = ["Fly Back", "Brazil","Colombia", "Costa Rica", "Pakistan", "Mexico", "Poland", "Nigeria"];
const countryMapper = {"Brazil" : "brazil",
                       "Colombia" : "colombia",
                       "Costa Rica" : "costarica",
                       "Pakistan" : "pakistan",
                       "Mexico" : "mexico",
                       "Poland" : "poland",
                       "Nigeria" : "nigeria"};


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      countriesJson: {},
      citiesJson: {},
      countries: [],
      selectedCountry: "Fly Back",
      first:true,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this)
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
                    if(target === "Fly Back")
                        return;
                    return countriesJson[countryMapper[target]]['cities']
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
    this.setState({selectedCountry:country, first:false});
    
  }

  render() {
    if(!this.state.isLoaded){
        return <ProgressBar now={100}/>;
    }
    let d3_1 = <D3_1
      title="HDI"
      countriesJson={this.state.countriesJson}
      citiesJson={this.state.citiesJson}
      countries={this.state.countries} 
      targetCountries ={targetCountries}
      selectedCountry={this.state.selectedCountry}
      /> ;
    let d3_2 = <D3_2
      title="Migration Inflow/Outflow"
      countriesJson={this.state.countriesJson}
      citiesJson={this.state.citiesJson}
      countries={this.state.countries} 
      targetCountries ={targetCountries}
      selectedCountry={this.state.selectedCountry}
    /> ;
    let d3_3 = <D3_3
      title="Infrastructure"
      countriesJson={this.state.countriesJson}
      citiesJson={this.state.citiesJson}
      countries={this.state.countries} 
      targetCountries ={targetCountries}
      selectedCountry={this.state.selectedCountry}
    /> ;

    return (
      <div>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={6}>
              {this.state.first ? <div>
                  <h1>Migration and HDI</h1>
                  <p> At the end of 2016, the total number of refugees and asylum seekers in the world hit 25.9 million people.<br />
                  There are more than 244 million international migrants, globally. <br/> 
                  Migration depends on a lot of factors, from war and poverty to educational attainment. <br/>
                  Now we've told the story, so let's look at the numbers. <br/> 
                  </p>
                </div> :
                <div>
                  {d3_1}
                  {d3_2}
                  {d3_3}
                </div>
                }
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
