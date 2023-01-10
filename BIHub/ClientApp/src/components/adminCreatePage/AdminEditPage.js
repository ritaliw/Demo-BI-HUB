import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ReportForm } from './ReportForm';
import PropTypes from "prop-types";
import {logPageView} from "../../applicationInsights"
export class AdminEditPage extends Component {
    static propTypes = {
        row:PropTypes.any,
        Reports:PropTypes.any
      };
    render() {
        logPageView({
            component: "Edit Page",
            view: "Admin"
        }, "Click on Edit Report Page");
        return (
            <ReportForm pageName="AdminPage" row={this.props.row} Reports={this.props.Reports} action="Edit" />
        );
    }
}
export default AdminEditPage;