import React, { Component } from "react";

import {
    Map,
    TileLayer,
  } from 'react-leaflet';
import Leaflet  from 'leaflet'
import {Button,ButtonToolbar} from 'react-bootstrap';

const leafMapCss = "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css";

/*
const icon = new Leaflet.Icon({
    iconUrl: require('./marker-icon-2x.png'),
    iconSize:     [20, 30], // size of the icon
    shadowSize:   [10, 10], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// point from which the popup should open relative to the iconAnchor
})
*/

let mapRef = null;

// button tool bars
const buttonToolBarStyle = { maxWidth: 400, margin: '0 auto 10px' };

let circleLayerGroup = null;

const countryMapper = {"Brazil" : "brazil",
                       "Colombia" : "colombia",
                       "Costa Rica" : "costarica",
                       "Pakistan" : "pakistan",
                       "Mexico" : "mexico",
                       "Poland" : "poland",
                       "Nigeria" : "nigeria"};

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
            var mappedCountry = countryMapper[country];

            if(mappedCountry == null) {
                mappedCountry = country;
            } 
            latlng.push(this.props.countriesJson[mappedCountry]['latitude']);
            latlng.push(this.props.countriesJson[mappedCountry]['longitude']);
            const hdi = Number(this.props.countriesJson[mappedCountry]['hdi']);
            const text = "Name: " + country + "<br>" + "HDI: " + hdi; 
            var color = "";
            var opacity = 1;
            if(hdi >= 0.75) {
                color = "#99FF00";
            } else if(hdi > 0.5) {
                color = "#FFFF00";
            } else if(hdi == 0) {
                color = "#000000"
                opacity = 0;
            } else {
                color = "#F00";
            }
            const circle = Leaflet.circleMarker(latlng,{radius:hdi*6, color: color, opacity : opacity}).bindPopup(text);
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

    makeCircles(country, getCities) {
        if(getCities) {
            var cities = this.props.countriesJson[country]['cities'];
            var circles = [];
            var keys = Object.keys(cities);
            for(var i = 0; i < keys.length; i++) {
                var key = keys[i];
                const latlng = [];
                latlng.push(cities[key]['latitude']);
                latlng.push(cities[key]['longitude']);
                const hdi = Number(cities[key]['real_hdi'])
                const text = "Name: " + cities[key]["city_name"] + "<br>" + "HDI: " + hdi; 
                var color = "";
                var opacity = 1;
                if(hdi >= 0.75) {
                    color = "#99FF00";
                } else if(hdi > 0.5) {
                    color = "#FFFF00";
                } else if(hdi === 0) {
                    color = "#000000"
                    opacity = 0;
                } else {
                    color = "#F00";
                }
                const circle = Leaflet.circleMarker(latlng,{radius:5, color: color, opacity: opacity}).bindPopup(text);
                circle.on('mouseover', function (e) {
                    this.openPopup();
                });
                circle.on('mouseout', function (e) {
                    this.closePopup();
                });
                
                circles.push(circle);
            } 
            // console.log("CIRCLES");
            // console.log(circles)
            return circles;                             

        } else {
            const circles = this.props.countries.map((country) => {
                const latlng = [];
                latlng.push(this.props.countriesJson[country]['latitude']);
                latlng.push(this.props.countriesJson[country]['longitude']);
                const hdi = Number(this.props.countriesJson[country]['hdi']);
                const text = "Name: " + country + "<br>" + "HDI: " + hdi; 
                var color = "";
                if(hdi >= 0.75) {
                    color = "#99FF00";
                } else if(hdi > 0.5) {
                    color = "#FFFF00";
                } else if(hdi === 0) {
                    color = "#000000"
                } else {
                    color = "#F00";
                }
                const circle = Leaflet.circleMarker(latlng,{radius:hdi*15, color: color}).bindPopup(text);
                circle.on('mouseover', function (e) {
                    this.openPopup();
                });
                circle.on('mouseout', function (e) {
                    this.closePopup();
                });
                
                return circle;
            });
            return circles;
        }
    }
    // Click on the button, the map will fly to a place
    // latlng needs to be [lat,lng]

    clickFly(country, latlng, zoom){
        var countryZoomer = {"Fly Back" : 2, "costarica" : 8, "brazil" : 5,
        "nigeria" : 6, "poland" : 6, "pakistan" : 5, "mexico" : 5, "colombia" : 6};
        zoom = countryZoomer[country];
        if(zoom === null) {
            zoom = 5;
        }

        mapRef.removeLayer(circleLayerGroup);
        mapRef.flyTo(latlng,zoom);
        
        //Create Circles on City Data
        var circles;
        if(country === "Fly Back") {
            circles = this.makeCircles(country, false);
        } else {
            circles = this.makeCircles(country, true);
        }

        this.props.handleButtonClick(country);
        circleLayerGroup = Leaflet.layerGroup(circles);
        setTimeout(function() { mapRef.addLayer(circleLayerGroup)}, 3000);
        //console.log(this.props.citiesJson);
        
    }

    render() {

        // Map basic parameters
        const originPosition = [51.505, -0.09];
        const originZoom = 2;

        // Fly-to button
        const targetCountries = this.props.targetCountries;
        const buttons = targetCountries.map((country) =>{

            if(country === "Fly Back"){
                return  <Button key = { country} onClick={() => this.clickFly(country,originPosition,originZoom)}>{country}</Button>
            }
            var country_key = countryMapper[country];
            const latlng = [this.props.countriesJson[country_key]['latitude'], this.props.countriesJson[country_key]['longitude']];
            const zoom = 5;
            return <Button key = { country_key} onClick={() => this.clickFly(country_key,latlng,zoom)}>{country}</Button>
        })
        
        const leftmap = (
            <div>
                <link rel="stylesheet" type="text/css" href={leafMapCss} />
                <Map ref="map" center={originPosition} zoom={originZoom} animate={true}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png">
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
