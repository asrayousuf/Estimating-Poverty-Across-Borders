import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup }  from 'react-leaflet';
import Leaflet from 'leaflet'

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

class LeafMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

      render() {
        const position = [this.state.lat, this.state.lng];
        const position2 = [this.state.lat + 0.001, this.state.lng + 0.01];
        const leftmap = (
            <div>
            <link rel="stylesheet" type="text/css" href={leafMapCss} />
            <link rel="stylesheet" type="text/css" href={minCss} />
            <Map center={position} zoom={this.state.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker  position={position} icon={icon}>
                    <Popup>
                        <p>Hello</p>
                    </Popup>
                </Marker>
                <Marker  position={position2} icon={icon}>
                    <Popup>
                        <p>Hello2</p>
                    </Popup>
                </Marker>
            </Map>
            </div>);
        return <div>
                    {leftmap}
                </div>;
      }
    }
export default LeafMap;
