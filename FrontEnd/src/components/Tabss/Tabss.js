import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

class Tabss extends Component {
    render(){
        const tabs = this.props.tabs.map((tab) => {
            return <Tab key={tab} eventKey={tab} title={tab}></Tab>
        });
        return (<Navbar fluid>
            <Navbar.Header>
                <Tabs 
                    onSelect={this.props.handleSelect}
                    id="uncontrolled-tab-example">
                    {tabs}
                </Tabs>
            </Navbar.Header>
        </Navbar>);
    }
}
export default Tabss;
