import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker }  from 'react-leaflet';
import Leaflet from 'leaflet'
import {Button,ButtonToolbar} from 'react-bootstrap';

const leafMapCss = "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css";
const minCss ="//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css";

const icon = new Leaflet.Icon({
    iconUrl: require('./marker-icon-2x.png'),
    iconSize:     [30, 50], // size of the icon
    shadowSize:   [10, 10], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// point from which the popup should open relative to the iconAnchor
})

let mapRef = null;
let data = null;
class LeafMap extends Component {
    constructor(props){
    	super(props)
        data = props.data;
    }

    componentDidMount(){
        mapRef = this.refs.map.leafletElement.setZoom(13);
    }

    clickFlyTo(){
        const flyDes = [52,-0,1];
        mapRef.flyTo(flyDes,12);
    } 

    render() {
        const position = [data.lat, data.lng];
        const position2 = [data.lat + 0.001, data.lng + 0.01];
        const buttonToolBarStyle = { maxWidth: 400, margin: '0 auto 10px' };
        const leftmap = (
            <div>
                <link rel="stylesheet" type="text/css" href={leafMapCss} />
                <link rel="stylesheet" type="text/css" href={minCss} />
                <Map ref="map" center={position} zoom={data.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker  position={position} icon={icon}>
                        <Popup>
                            <p>Hello</p>
                        </Popup>
                    </Marker>
                    <CircleMarker
                    ref={circle => { this.circle = circle; }}
                    center={position2}
                    radius={30}
                        onMouseOver={() => {
                            this.circle.leafletElement.bindPopup('foo').openPopup();
                        }}
                        onMouseOut={() => {
                            this.circle.leafletElement.closePopup();
                        }}/>
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
