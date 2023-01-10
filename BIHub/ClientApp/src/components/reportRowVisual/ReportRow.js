import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import "react-table/react-table.css";
import './ReportRow.css'
import $ from 'jquery';
import PropTypes from "prop-types";
import AccessibleReactTable from 'accessible-react-table';
import { SearchBox, PowerbiEmbed } from '..';
import axios from 'axios';
import { SideBar, NavigationBar, Reports } from '..';
import { AdminEditPage } from '../adminCreatePage/AdminEditPage';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { logPageView } from "../../applicationInsights"
import appsettings from "./../../appsettings.json"
//const AccessibleReactTable = accessibility(ReactTable);
export class ReportsRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            searchReport: '',
            hideDialog: true,
            currentrow: ''
        }
        this._showDialog = this._showDialog.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onReportRender = this.onReportRender.bind(this);
    }
    static propTypes = {
        report: PropTypes.any
      };
    componentDidMount() {
        this.setState({
            reports: this.props.Reports
        });
        $('#report-page-table .rt-resizable-header-content').append("<img class='sort-asc' id='test' src='' alt ='sort-icon'width=20  height=20></img>");
        $('.sort-asc').attr("src",require("../../images/reportsImages/sort_asc.png"));
        var i=0;
        $(() => {
            $('#report-page-table .rt-resizable-header-content').click(function () {
                if($(this).children().attr("src").length==1470)
                {
                    $(this).children().attr("src", require("../../images/reportsImages/sort_des.png")); 
                }
                else
                {
                    $(this).children().attr("src",require("../../images/reportsImages/sort_asc.png"))
                }
            });
        });


    }
    deleteDialog = () => {
        this.handleDelete(this.state.currentrow);
        this.setState({ hideDialog: true });
    };
    _showDialog = (cr) => {
        logPageView({
            component: "Delete Report",
            reportID: cr,
            view: this.props.pageName !== "UserPage" ? "Admin" : "User"
        }, "Click on Delete report");
        this.setState({ hideDialog: false });
        this.setState({ currentrow: cr })
    };

    cancelDialog = () => {
        logPageView({
            component: "Delete Report",
            view: this.props.pageName !== "UserPage" ? "Admin" : "User"
        }, "Click on Cancel Delete option");
        this.setState({ hideDialog: true });
    };

    handleInput = (e) => {
        this.setState({ searchReport: e.target.value })
    }

    getTrProps = (state, rowInfo, instance) => {
        return {};
    }
    handleEdit(row) {        
        logPageView({
            component: "Report Catalog",
            view: this.props.pageName !== "UserPage" ? "Admin" : "User" 
          }, "Click on Edit report");
        ReactDOM.render(<NavigationBar pageName="AdminPage" Reports={this.props.Reports} title="Report Configuration" />, document.getElementById('top-navbar'));
        ReactDOM.render(<AdminEditPage Reports={this.props.Reports} row={row} />, document.getElementById('container'));
    }
    onReportRender(rowInfo) {
        ReactDOM.render(<NavigationBar pageName={this.props.pageName} Reports={this.props.Reports} title={rowInfo.original.name} />, document.getElementById('top-navbar'));
        ReactDOM.render(<PowerbiEmbed ReportID={rowInfo.original.reportID} EmbedURL={rowInfo.original.embedURL} Settings={rowInfo.original.settings} />, document.getElementById('container'))

    }
    handleDelete(e) {
        var settings = {
            "url": appsettings.Config.ServiceURL + "item/delete",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + window.idToken
            },
            params: {
                id: e
            }
        };

        axios(settings).then(function (response) {
            logPageView({
                component: "Delete Report",
                reportID: response.config.params.id,
                view: this.props.pageName !== "UserPage" ? "Admin" : "User" 
              }, "Delete report");
            ReactDOM.render(<NavigationBar pageName="AdminPage" Reports={response.data} title="Reports" />, document.getElementById('top-navbar'));
            ReactDOM.render(<SideBar pageName="AdminPage" Reports={response.data} />, document.getElementById('sidebar-navigation-pane'));
            ReactDOM.render(<Reports pageName="AdminPage" Reports={response.data} />, document.getElementById('container'));
        });
    }
    render() {
        let filteredReports = this.props.Reports;
        if (this.state.searchReport !== "") {
            //filter data on basis of Name and description
            filteredReports = this.props.Reports.filter((report) => {
                return report.name.toLowerCase().includes(this.state.searchReport.toLowerCase()) || report.description.toLowerCase().includes(this.state.searchReport.toLowerCase());
            });
        }
        //const onRowClick = (state, rowInfo, column, instance) => {
        //    //if ($(event.target).children()[0].lastChild.id! == handleDelete) {
        //        return {

        //            onClick: e => {

        //                ReactDOM.render(<PowerbiEmbed ReportID={rowInfo.row._original.reportID} EmbedURL={rowInfo.row._original.embedURL} Settings={rowInfo.row._original.settings} />, document.getElementById('container'))
        //            }
        //        }
        //    //}
        //}
        const columnsUser = [
            {
                Header: "Name",
                accessor: "name",
                Cell: row => (
                    <div>
                        <div id="nameColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.name}</div>
                    </div>
                ),
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: "Description",
                accessor: "description",
                Cell: row => (
                    <div>
                        <div id="descriptionColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.description}</div>
                    </div>
                ),
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: "Report Owner",
                accessor: "reportOwner",
                Cell: row => (
                    <div>
                        <div id="reportOwnerColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.reportOwner}</div>
                    </div>
                ),
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: "Created Date",
                accessor: "currentDate",
                className:"CreatedDate",
                Cell: row => (
                    <div>
                        <div id="CreatedDateColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.currentDate}</div>
                    </div>
                ), 
                style: {
                    cursor: "pointer",
                }
            }
        ]
        const columnsAdmin = [
            {
                Header: "Name",
                accessor: "name",
                Cell: row => (
                    <div>
                        <div id="nameColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.name}</div>
                    </div>
                ),
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: "Description",
                accessor: "description",
                Cell: row => (
                    <div>
                        <div id="descriptionColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.description}</div>
                    </div>
                ),
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: "Report Owner",
                accessor: "reportOwner",
                Cell: row => (
                    <div>
                        <div id="reportOwnerColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.reportOwner}</div>
                    </div>
                ),
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: "Created Date",
                accessor: "currentDate",
                className:"CreatedDate",
                Cell: row => (
                    <div>
                        <div id="CreatedDateColReport" tabIndex='0' onClick={() => this.onReportRender(row)}>{row.original.currentDate}</div>
                    </div>
                ), 
                style: {
                    cursor: "pointer",
                }
            },
            {
                Header: '',
                accessor: "edit/delete",
                sortable: false,
                filterable: false,
                className:"EditDelete",
                style: {
                    cursor: "pointer"
                },
                Cell: row => (
                    <div>
                        <div id="editReport" tabIndex="0" className='fa fa-edit' onClick={() => this.handleEdit(row)}></div>
                        <div id="deleteReport" tabIndex="0" className='fa fa-trash' onClick={() => this._showDialog(row.original.id)} ></div>
                    </div>
                )
            }
        ]
        const { hideDialog } = this.state;
        return (
            <Fragment>
                <SearchBox handleInput={this.handleInput} />
                <div id="report-page-table">
                    <div id="reportPageContainer"></div>
                    <AccessibleReactTable
                        getTheadThProps={(state, rowInfo, column) => {
                            return {tabIndex:'0'}
                          }}

                        className="-striped -highlight"
                        columns={this.props.pageName !== "UserPage" ? columnsAdmin : columnsUser}
                        data={filteredReports}
                        defaultPageSize={10}
                        noDataText={"No Data"}
                        showPagination={true}
                        minRows={1}
                    />
                </div>
                <div id="deletepopup">
                    <Dialog
                        hidden={hideDialog}
                        onDismiss={this.cancelDialog}
                        dialogContentProps={{
                            type: DialogType.normal,
                            title: 'Are you sure you want to delete?',
                            closeButtonAriaLabel: 'Close',
                            subText: '',
                        }}
                        modalProps={{
                            titleAriaId: this._labelId,
                            subtitleAriaId: this._subTextId,
                            isBlocking: false,
                            styles: { main: { maxWidth: 450 } },
                        }}
                    >
                        <DialogFooter>
                            <PrimaryButton onClick={this.deleteDialog} text="Delete" />
                            <DefaultButton onClick={this.cancelDialog} text="Cancel" />
                        </DialogFooter>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

export default ReportsRow;

