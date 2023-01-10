import React, { Component } from 'react';
import ReportList from './ReportList';
import { SearchBox } from '..';
export class ReportsCard extends Component {
    state = {
        reports: [],
        searchReport: '',
        filteredReports: ''
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.setState({
            reports: this.props.reportData
        })
    }
    handleInput = (e) => {
        this.setState({ searchReport: e.target.value });
        this.setState({
            filteredReports: this.state.reports.filter((report) => {
                return report.Name.toLowerCase().includes(this.state.searchReport.toLowerCase())
            })
        })
    }
    render() {
        return (
            <div>
                <SearchBox handleInput={this.handleInput} />
                <div className="Reports">
                    <ReportList filteredReports={filteredReports} />
                </div>
            </div>
        );
    }
}

export default ReportsCard;

