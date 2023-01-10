import React, { Component } from 'react';
import './SettingPage.css';
import $ from 'jquery';
import { SideBar, NavigationBar } from '..';
import appsettings from "./../../appsettings.json"

export class SettingPage extends Component {
  componentDidMount() {
    $.ajax({
      method: 'get',
        url: appsettings.Config.ServiceURL
    }).done((res) => {
      window.reportData = res[0].reports;
    })
  }

  render() {
    return (
      <div id="root-content" >
        <div id="sidebar-navigation-pane" className="sidebar sidebar-expanded"><SideBar pageName="SettingPage" /></div>
        <div id="main-container">
          <div id="top-navbar">
            <navigationbar pageName="SettingPage" />
          </div>
          <div id="context-container">
            <div id="container">Setting page loaded</div><div id="panel"></div></div>
        </div>
      </div>
    );
  }
}
export default SettingPage;