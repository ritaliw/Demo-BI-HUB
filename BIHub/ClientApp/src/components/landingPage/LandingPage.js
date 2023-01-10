import React, { Component } from 'react';
import './LandingPage.css';
import $ from 'jquery';
import PropTypes from "prop-types";
import { NavigationBar, SideBar, Reports } from '..'

export class LandingPage extends Component {
    state = { showing: false };
    static propTypes = {
        Reports: PropTypes.any,
        pageName: PropTypes.string
      };
    render() {
        return (
            <div id="root-content" >
                <div id="sidebar-navigation-pane" className="sidebar sidebar-expanded"><SideBar pageName={this.props.pageName} Reports={this.props.Reports} /></div>
                <div id="main-container">
                    <div id="top-navbar">
                        <NavigationBar pageName={this.props.pageName} Reports={this.props.Reports} title="Reports" />
                    </div>
                    <div id="context-container">
                        <div id="container"><Reports Reports={this.props.Reports} pageName={this.props.pageName} /></div><div id="panel"></div></div>
                </div>
            </div>

        );
    }
}
export default LandingPage;