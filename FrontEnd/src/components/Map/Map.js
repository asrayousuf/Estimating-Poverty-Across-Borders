import React, { Component } from "react";

import {
    Circle,
    CircleMarker,
    FeatureGroup,
    LayerGroup,
    LayersControl,
    Map,
    Marker,
    Popup,
    Rectangle,
    TileLayer,
  } from 'react-leaflet';
import Leaflet  from 'leaflet'
import {Button,ButtonToolbar} from 'react-bootstrap';

const { BaseLayer, Overlay } = LayersControl
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
    constructor(props){
    	super(props)
        this.state = {
            checked: false,
            error: null,
            isLoaded: false,
            countries: [],
            countriesJson: {},
            targetCountries: ["Fly Back", "Brazil","Colombia"],
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
        if(!this.state.isLoaded){
            return;
        }
        // Create map reference element
        mapRef = this.refs.map.leafletElement.setZoom(2);
        mapRef.doubleClickZoom.disable();
        mapRef.scrollWheelZoom.disable();
        mapRef.dragging.disable();

        // Create the needed circles    
        const countries = this.state.countries;
        const countriesJson = this.state.countriesJson;

        const circles = countries.map((country) => {
            const latlng = [];
            latlng.push(countriesJson[country]['latitude']);
            latlng.push(countriesJson[country]['longitude']);
            const hdi = Number(countriesJson[country]['hdi'])*15;
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
            return <div>Loading</div>;
        }

        // Map basic parameters
        const data = this.props.data;
        const originPosition = [data.lat, data.lng];
        const originZoom = data.zoom;

        // All the circles
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
                radius={(hdi)*15}
                onMouseOver={() => {
                    this.refs['circle'+idx].leafletElement.bindPopup(text).openPopup();
                }}
                onMouseOut={() => {
                    this.refs['circle'+idx].leafletElement.closePopup();
                }}/>);
        });

        // Fly-to button
        const targetCountries = this.state.targetCountries;
        const buttons = targetCountries.map((country) =>{
            if(country == "Fly Back"){
                return  <Button key = { country} onClick={() => this.clickFly(country,originPosition,originZoom)}>{country}</Button>
            }
            const latlng = [countriesJson[country]['latitude'], countriesJson[country]['longitude']];
            const zoom = 5;
            return <Button key = { country} onClick={() => this.clickFly(country,latlng,zoom)}>{country}</Button>
        })


        const center = [51.505, -0.09]        
        
        const leftmap = (
            <div>
                <link rel="stylesheet" type="text/css" href={leafMapCss} />
                <Map ref="map" center={originPosition} zoom={originZoom} animate={true}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                    </TileLayer>
                    {/* <Overlay checked={false}>
                        <Circle center={center} fillColor="blue" radius={200} />
                        <Circle
                            center={center}
                            fillColor="red"
                            radius={100}
                            stroke={false}
                        /> 
                    </Overlay> */}
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
