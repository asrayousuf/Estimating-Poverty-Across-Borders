import React, { Component } from "react";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";
import Tabss from "components/Tabss/Tabss";
import LeafMap from "components/Map/Map";

import D3_1 from '../../d3_components/D3_1';
import D3_2 from '../../d3_components/D3_2';
import D3_3 from '../../d3_components/D3_3';

const targetCountries = ["World", "Brazil", "Colombia", "Costa Rica", "Pakistan", "Mexico", "Poland", "Nigeria"];
const countryMapper = {
  "Brazil": "brazil",
  "Colombia": "colombia",
  "Costa Rica": "costarica",
  "Pakistan": "pakistan",
  "Mexico": "mexico",
  "Poland": "poland",
  "Nigeria": "nigeria"
};


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      countriesJson: {},
      citiesJson: {},
      countries: [],
      selectedCountry: "World",
      first: true,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidMount() {
    // Fetech the countries data
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://shrouded-lake-82256.herokuapp.com/get_data/';
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(
        (result) => {
          const countries = [];
          for (var country in result) {
            countries.push(country);
          }
          const countriesJson = result;
          const citiesJson = targetCountries.map((target) => {
            if (target === "World")
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


  handleButtonClick(country) {
    this.setState({ selectedCountry: country, first: false });

  }

  render() {
    if (!this.state.isLoaded) {
      return <ProgressBar now={100} />;
    }
    let d3_1 = <D3_1
      title="Human Development Index"
      countriesJson={this.state.countriesJson}
      citiesJson={this.state.citiesJson}
      countries={this.state.countries}
      targetCountries={targetCountries}
      selectedCountry={this.state.selectedCountry}
    />;
    let d3_2 = <D3_2
      title="Migration Inflow/Outflow"
      countriesJson={this.state.countriesJson}
      citiesJson={this.state.citiesJson}
      countries={this.state.countries}
      targetCountries={targetCountries}
      selectedCountry={this.state.selectedCountry}

    />;
    let d3_3 = <D3_3
      title="Infrastructure"
      countriesJson={this.state.countriesJson}
      citiesJson={this.state.citiesJson}
      countries={this.state.countries} 
      targetCountries ={targetCountries}
      selectedCountry={this.state.selectedCountry}
    /> ;

    var displayCountry = "";
    for(var country in countryMapper){
      if(this.state.selectedCountry.toUpperCase() == country.replace(/\s/g, '').toUpperCase()){
        displayCountry = country;
        break;
      }
    }
    return (
      <div>
        <div className="content">
          <Tabss tabs={[2016,2017]} />
          <h1 className="text-center">{displayCountry}</h1>
          <Grid fluid>
            <Row>
              <Col md={6}>
                {this.state.first ? <div>
                 
                  <p className="text-center lead">
Nearly half of the world's population — more than <span className="text-danger"> 3 billion </span>people — live on less than <span className="text-danger">$2.50 </span> a day.<br />
                    <br />
                     According to UNICEF, <span className="text-danger"> 22,000 children </span> die each day due to poverty. 
                    <br /><br />
<span className="text-danger">805 million </span> people worldwide do not have enough food to eat.<br />
<br />
                    Accurate data can help us to alleviate poverty! <br />
                    <br />
                    Accurate and timely estimates of population demographics are vital in order to understand social and economics inequalities. Such data shape decisions about which policies are implemented as well as where governments and humanitarian organizations choose to allocate scarce resources.<br />
                    <br />
                    Research by UNICEF indicates that anonymized and aggregated social media data from Twitter can be used to predict the Human Development Index (HDI). Ultimately, this can help us achieve the goal of bridging the gap between years where sub-national surveys are unavailable. <br />
                    <br />

                    This opportunity could allow us to look at the temporal evolution of socio-economic estimates, and to operationalize such models, enabling policy-makers and humanitarian organizations to base their decisions on up-to-date data. 
                    <br /><br />

                   Let's have a look at how it can be done!<br />
                    <br />
                    Please select the country you wish to explore .....
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
                  targetCountries={targetCountries}
                  handleButtonClick={this.handleButtonClick} 
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
