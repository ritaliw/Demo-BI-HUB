import React, { Component } from 'react'
import PowerbiEmbedded from 'powerbi-report-component'
import '../../index'
import './PowerbiEmbed.css';
import { GFP } from "..";
import {logPageView} from "../../applicationInsights"

export class PowerbiEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadGFP: false
    };
    this.callGFP = this.callGFP.bind(this);
  }

  callGFP() {
    this.setState(prevState => ({
      loadGFP: !prevState.loadGFP
    }));
  }

  render() {
    logPageView({
      component: "Power BI Report Embedding",
      embedURL: this.props.EmbedURL,
      reportID: this.props.ReportID,
      view: "User/ Admin"
    }, "Power BI report embed");
    const isGFPExpanded = this.state.loadGFP,
      extraSettings = {
        filterPaneEnabled: this.props.Settings !== undefined ? JSON.parse(this.props.Settings).filterPaneEnabled : false, //true
        navContentPaneEnabled: this.props.Settings !== undefined ? JSON.parse(this.props.Settings).navContentPaneEnabled : false, //true
      };

    return (
      <div className="reportPageDiv">
        <div className="powerBISection" style={{ width: isGFPExpanded ? '66%' : '100%' }}>
          <PowerbiEmbedded
            embedType="report"
            tokenType="embed"
            accessToken={`${window.PowerBIAccessToken}`}
            embedUrl={`${this.props.EmbedURL}`}
            embedId={this.props.ReportID}
            reportMode="view" // open report in a particular mode "view" or "edit".                   
            extraSettings={extraSettings}
            permissions="All" // View
          />
        </div>

        {/* {this.props.Settings.IsGlobalFiltersEnabled === true ? <input type="button" tabIndex = "0" id="filterPanelOpen" className="filterPanelBtn" value="Filters" onClick={this.callGFP} /> : null } */}

        {/* {this.state.loadGFP === true ? <GFP /> : null } */}

      </div>
    )
  }
}

export default PowerbiEmbed