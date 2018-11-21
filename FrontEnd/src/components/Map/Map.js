import React, { Component } from "react";

import {
    Map,
    TileLayer,
  } from 'react-leaflet';
import Leaflet  from 'leaflet'
import {Button,ButtonToolbar,ProgressBar} from 'react-bootstrap';

const leafMapCss = "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css";

const icon = new Leaflet.Icon({
    iconUrl: require('./marker-icon-2x.png'),
    iconSize:     [20, 30], // size of the icon
    shadowSize:   [10, 10], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// point from which the popup should open relative to the iconAnchor
})

let mapRef = null;

// button tool bars
const buttonToolBarStyle = { maxWidth: 400, margin: '0 auto 10px' };

let circleLayerGroup = null;

class LeafMap extends Component {
    countries = [];
    countriesJson = null;
    citiesJson = null;
    constructor(props){
        super(props);
        // Props contains 
        // - countries,
        // - countriesJson,
        // - citiesJson,
        // - targetCountries
        // You can take it out by using this.props.XXXX
    }

    componentDidMount(){
        mapRef = this.refs.map.leafletElement.setZoom(2);
        mapRef.doubleClickZoom.disable();
        mapRef.scrollWheelZoom.disable();
        mapRef.dragging.disable();

        // Create the needed circles    

        const circles = this.props.countries.map((country) => {
            const latlng = [];
            latlng.push(this.props.countriesJson[country]['latitude']);
            latlng.push(this.props.countriesJson[country]['longitude']);
            const hdi = Number(this.props.countriesJson[country]['hdi'])*15;
            const text = "Name: " + country + "<br>" + "HDI: " + hdi; 
            
            const circle = Leaflet.circleMarker(latlng,{radius:hdi}).bindPopup(text);
            circle.on('mouseover', function (e) {
                this.openPopup();
            });
            circle.on('mouseout', function (e) {
                this.closePopup();
            });
            
            return circle;
        });

        circleLayerGroup = Leaflet.layerGroup(circles);
        mapRef.addLayer(circleLayerGroup);


    }

    // Click on the button, the map will fly to a place
    // latlng needs to be [lat,lng]

    clickFly(country, latlng, zoom){
        mapRef.flyTo(latlng,zoom);
        mapRef.removeLayer(circleLayerGroup);

        this.props.handleButtonClick(country);

    } 

    render() {
        if(!this.state.isLoaded){
            <ProgressBar now={100}/>;
        }

        // Map basic parameters
        const originPosition = [51.505, -0.09];
        const originZoom = 2;

        // Fly-to button
        const targetCountries = this.props.targetCountries;
        const buttons = targetCountries.map((country) =>{
            if(country == "Fly Back"){
                return  <Button key = { country} onClick={() => this.clickFly(country,originPosition,originZoom)}>{country}</Button>
            }
            const latlng = [this.props.countriesJson[country]['latitude'], this.props.countriesJson[country]['longitude']];
            const zoom = 5;
            return <Button key = { country} onClick={() => this.clickFly(country,latlng,zoom)}>{country}</Button>
        })
        
        const leftmap = (
            <div>
                <link rel="stylesheet" type="text/css" href={leafMapCss} />
                <Map ref="map" center={originPosition} zoom={originZoom} animate={true}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                    </TileLayer>
                </Map>
            </div>);

        return (
            <div>
                <div style={buttonToolBarStyle}>
                <ButtonToolbar>
                   {buttons} 
                </ButtonToolbar>
                </div>
                 {leftmap} 
            </div>);
      }
    }
export default LeafMap;
