import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker }  from 'react-leaflet';
import Leaflet from 'leaflet'
import {Button,ButtonToolbar} from 'react-bootstrap';

const leafMapCss = "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css";
// const minCss ="//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css";

const icon = new Leaflet.Icon({
    iconUrl: require('./marker-icon-2x.png'),
    iconSize:     [20, 30], // size of the icon
    shadowSize:   [10, 10], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// point from which the popup should open relative to the iconAnchor
})

let mapRef = null;
let data = null;

// button tool bars
const buttonToolBarStyle = { maxWidth: 400, margin: '0 auto 10px' };

class LeafMap extends Component {
    constructor(props){
    	super(props)
        data = props.data;
        this.state = {
            error: null,
            isLoaded: false,
            countries: [],
            countriesJson: {},
        };
    }


    componentDidMount(){

        // Fetech the countries data
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'http://rosygupta.pythonanywhere.com';
        fetch(proxyUrl + targetUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    const countries = [];
                    for(var country in result){
                        countries.push(country);
                    }
                    this.setState({
                        isLoaded: true,
                        countries,
                        countriesJson: result,
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

    componentDidUpdate(){
        // Create map reference element
        if(this.state.isLoaded){
            // mapRef = this.refs.map.leafletElement.setZoom(1);
            mapRef = this.refs.map.leafletElement.setZoom(2);
        }
    }

    // Click on the button, the map will fly to a place
    clickFlyTo(){
        const flyDes = [52,-0,1];
        mapRef.flyTo(flyDes,12);
    } 

    render() {
        if(!this.state.isLoaded){
            return <div>Loading</div>;
        }

        const countries = this.state.countries;
        const countriesJson = this.state.countriesJson;
        const circles = countries.map((country,idx) => {
            const latlng = [];
            latlng.push(countriesJson[country]['latitude']);
            latlng.push(countriesJson[country]['longitude']);
            const hdi = Number(countriesJson[country]['hdi']);
            const text = "Name: " + country + "<br>" + "HDI: " + hdi; 
            return (<CircleMarker
                key = {country}
                ref={'circle'+idx}
                center={latlng}
                radius={(hdi+0.01)*15}
                onMouseOver={() => {
                    this.refs['circle'+idx].leafletElement.bindPopup(text).openPopup();
                }}
                onMouseOut={() => {
                    this.refs['circle'+idx].leafletElement.closePopup();
                }}/>);
        });


        const position = [data.lat, data.lng];
        const position2 = [data.lat + 0.001, data.lng + 0.01];
        
        const leftmap = (
            <div>
                <link rel="stylesheet" type="text/css" href={leafMapCss} />
                {/* <link rel="stylesheet" type="text/css" href={minCss} /> */}
                <Map ref="map" center={position} zoom={data.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {/* <Marker position={position} icon={icon}>
                        <Popup><p>Hi</p></Popup>
                    </Marker> */}
                    {circles}
                </Map>
            </div>);

        return (
            <div>
                <div style={buttonToolBarStyle}>
                <ButtonToolbar>
                  <Button onClick={this.clickFlyTo}>Default</Button>
                </ButtonToolbar>
                </div>
                 {leftmap} 
            </div>);
      }
    }
export default LeafMap;
