import React, { Component } from 'react';
import { ReportsRow, ReportCardVisual } from '../../components';
import './Report.css';
import PropTypes from "prop-types";
import $ from 'jquery';
import appsettings from "./../../appsettings.json"
export class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Reports: [],
            isToggleOn: true
        };
    }
    static propTypes = {
        report: PropTypes.any,
        pageName:PropTypes.string
      };
    //componentDidMount() {
    //    var settings = {
    //        "url": appsettings.Config.ServiceURL,
    //        "method": "GET",
    //        "timeout": 0,
    //        "headers": {
    //            "Authorization": "Bearer " + window.idToken,

    //        },
    //    };



    //    $.ajax(settings).done( (response) =>{
    //        //debugger;
    //        window.Reports = response;
    //    });
    //}

    render() {
        return (
            <div id="report-catalog">

                {/*Toggle view */}
                {/* <div className="toggle-view">
          <h6 style={{display:'inline-block',marginRight:'10px',fontWeight:'inherit'}}>Change View</h6>
          <img  style={{width: 35, height: 35,border:2,marginRight:2 ,cursor: "pointer"}} src={require("./grid_view.png")} alt='search-icon' onClick={()=>{
            this.setState(prevState => ({
              isToggleOn: true
            }))}} />
          <img  style={{width: 35, height: 35,marginRight:'18px' ,cursor: "pointer"}} src={require("./card_view.png")} alt='search-icon'
          //  onClick={()=>{
          //   this.setState(prevState => ({
          //     isToggleOn: false
          //   }))}}
            />
        </div> */}
                <ReportsRow Reports={this.props.Reports} pageName={this.props.pageName} />
            </div>
        );
    }
}

export default Reports;