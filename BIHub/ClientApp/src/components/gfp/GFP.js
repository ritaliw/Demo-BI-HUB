import React, { Component } from 'react';
import '../../App.css';
import "./GFP.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import GFPFilterGroup from "./GFPFilterGroup";

//Create Global Filters panel structure
const gfpPanelDetails = {
  panelTitle: "Global Filters"
}

export class GFP extends Component {
  render() {
    return (
      <div className="App">
        <div className="gfpPanel">
          <div className="filterWrapper">
            <div className="panelTitle">{gfpPanelDetails.panelTitle}</div>
            <GFPFilterGroup />  {/*call component to populate filter group values */}
          </div>
        </div>
      </div>
    );
  }
}

export default GFP;
