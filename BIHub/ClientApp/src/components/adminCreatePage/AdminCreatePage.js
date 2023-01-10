import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ReportForm } from './ReportForm';
import PropTypes from "prop-types";
import {logPageView} from "../../applicationInsights"
export class AdminCreatePage extends Component {
    static propTypes = {
        Reports:PropTypes.any
      };
    render() {
        logPageView({
            component: "Create Page",
            view: "Admin"
        }, "Click on Create Report Page");
        return (
            <ReportForm pageName="AdminPage" Reports={this.props.Reports} action="Create" />
        );
    }
}
export default AdminCreatePage;
