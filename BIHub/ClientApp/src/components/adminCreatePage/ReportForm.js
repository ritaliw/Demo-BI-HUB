import React, { Component } from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import parse from 'html-react-parser';
import './ReportForm.css';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from "prop-types";
import { SideBar, NavigationBar, Reports, LoadingSpinner } from '..';
import TagsInput from './TagsInput';
import {logPageView} from "../../applicationInsights"
import appsettings from "./../../appsettings.json"

initializeIcons()
export class ReportForm extends Component {
    state = { showing: false };
    state = { showingFilters: false };
    constructor(props) {
        super(props);
        this.submitButton = this.submitButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.reportData = this.reportData.bind(this);
        this.pageReviewView = this.pageReviewView.bind(this);
        this.state = {
            workspaceOptions: "",
            submit: -1,
            tags: []
        };

    }
    componentDidMount() {
        var input1 = document.getElementById("EnablePowerBIFilters");
        input1.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("EnablePowerBIFilters").click();
            }
        });
        var input2 = document.getElementById("EnablePowerBITabs");
        input2.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("EnablePowerBITabs").click();
            }
        });
    }
    static propTypes = {
        row:PropTypes.any,
        action:PropTypes.any,
        Reports:PropTypes.any
      };
    componentWillMount() {
        if (this.props.action === "Edit") {
            this.setState({ tags: this.props.row.original.reportTags });
        }
        var settings = {

            "url": "https://api.powerbi.com/v1.0/myorg/" + "groups",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + window.PowerBIAccessToken
            },
        };

        axios(settings).then((response) => {

            var Totallength = JSON.stringify(response.data.value.length);
            var str = "";
            if (this.props.action === "Create") {
                str = "<option hidden disabled selected value> -- Select Workspace -- </option>";
            }
            const sorted = response.data.value.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            for (var i = 0; i < Totallength; i++) {
                if (this.props.action === "Edit" && sorted[i].name === this.props.row.original.workspace) {
                    str += "<option id =" + sorted[i].id + " selected value>" + sorted[i].name + "</option>"
                }
                else {
                    str += "<option id =" + sorted[i].id + " >" + sorted[i].name + "</option>"
                }
            }
            this.setState({ workspaceOptions: str });
            if (this.props.action === "Edit") {
                this.reportData();
            }

        }).catch(() => {
            var str = "<option hidden disabled selected value> -- Select Workspace -- </option>";
            str += "<option>No Workspace available</option>";
            this.setState({ workspaceOptions: str });
        });
    }

    reportData() {
        this.setState({ submit: -1 });
        $("#next-btn-pageInfo").css("background-color", "#91d3eb");
        document.getElementById("workspaceName").innerHTML = $("#workspaceDropDown").children("option:selected").html();
        var settings = {
            "url": "https://api.powerbi.com/v1.0/myorg/groups/" + $("#workspaceDropDown option:selected").attr("id") + "/reports",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + window.PowerBIAccessToken
            },
        };


        axios(settings).then((response) => {

            var Totallength = JSON.stringify(response.data.value.length);
            var str = "";
            const sorted = response.data.value.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            if (this.props.action === "Create") {
                str = "<option hidden disabled selected value> -- Select Report -- </option>";
            }
            if (Totallength > 0) {
                this.setState({ submit: 0 });
            }
            else if (Totallength == 0) {
                str += <option>No report available</option>
            }
            for (var i = 0; i < Totallength; i++) {
                if (this.props.action === "Edit" && sorted[i].id === this.props.row.original.reportID) {
                    str += "<option value=" + sorted[i].embedUrl + " id='" + sorted[i].id + "' selected value>" + sorted[i].name + "</option>";
                }
                else {
                    str += "<option value=" + sorted[i].embedUrl + " id='" + sorted[i].id + "'>" + sorted[i].name + "</option>";
                }
            }
            document.getElementById("reportDropDown").innerHTML = str;
            if (this.props.action === "Edit") {
                this.submitButton();
            }

        }).catch(() => {
            this.setState({ submit: -1 });
            var str = "<option hidden disabled selected value> -- Select Report -- </option>";
            str += "<option>No Report available</option>";
            document.getElementById("reportDropDown").innerHTML = str;
        });
    }
    validateEmail(inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        else {
            $("#reportOwnerName").focus();
            return false;
        }
    }

    submitButton() {
        if ($("#pageName").val() !== '' && $("#reportOwnerName").val() !== '' && $("#pageDescription").val() !== '' && $("#workspaceDropDown").children("option:selected").html() !== '' && $("#reportDropDown").children("option:selected").html() !== 'No report available' && this.state.submit !== -1) {
            $("#next-btn-pageInfo").css("background-color", "#0078d4");
            this.setState({ submit: 1 });
        }
        else {
            $("#next-btn-pageInfo").css("background-color", "#91d3eb");
        }

        var str = this.nameValue.value;
        var str2 = this.descriptionValue.value;
        //var str3 = this.tagsValue.value;
        var strOwner = this.reportOwnerValue.value;
        var str4 = $("#workspaceDropDown").children("option:selected").html();
        var str5 = $("#reportDropDown").children("option:selected").html();

        document.getElementById("displayName").innerHTML = str;
        document.getElementById("descriptionName").innerHTML = str2;
        //document.getElementById("tagsNameDisplay").innerHTML = str3;
        document.getElementById("reportOwnerDisplay").innerHTML = strOwner;
        //document.getElementById("tagsName").innerHTML = str3;
        document.getElementById("workspaceName").innerHTML = str4;
        document.getElementById("reportDataName").innerHTML = str5;
        document.getElementById("powerBIFilters").innerHTML = $("#EnablePowerBIFilters").is(":checked") === true ? "Yes" : "No";
        document.getElementById("powerBITabs").innerHTML = $("#EnablePowerBITabs").is(":checked") === true ? "Yes" : "No";
    }
    pageInfo() {
        $("#pageInfDiv").hide();
        $("#filterPageDiv").show();
        $("#filters-nav").addClass('createPageActiveStep');
    }
    pageInfoBack() {
        $("#pageInfDiv").show();
        $("#pageReview").hide();
        $('.createPageSteps > li').removeClass('createPageActiveStep');
        $("#pageinfo-nav").addClass('createPageActiveStep');
    }
    pageReviewView() {
        if ($("#pageName").val() !== '' && this.validateEmail($("#reportOwnerName").val()) && $("#reportOwnerName").val() !== '' && $("#pageDescription").val() !== '' && $("#pageTagsName").val() !== '' && $("#workspaceDropDown").children("option:selected").html() !== '' && $("#reportDropDown").children("option:selected").html() !== 'No report available' && $("#reportDropDown").children("option:selected").html() !== '' && this.state.submit === 1) {
            $("#pageInfDiv").hide();
            $("#pageReview").show();
            $('.createPageSteps > li').removeClass('createPageActiveStep');
            $("#review-nav").addClass('createPageActiveStep');
        }
    }

    pageReviewBack() {
        $("#filterPageDiv").show();
        $("#pageReview").hide();
        $("#review-nav").removeClass('createPageActiveStep');
    }

    handleCancel(event) {
        logPageView({
            component: "Report Page Cancel",
            view: "Admin"
          }, "Click on Cancel"); 
        ReactDOM.render(<NavigationBar pageName="AdminPage" Reports={this.props.Reports} title="Reports" />, document.getElementById('top-navbar'));
        ReactDOM.render(<Reports pageName="AdminPage" Reports={this.props.Reports} />, document.getElementById('container'));
        event.preventDefault();
    }

    handleEdit(event) {

        ReactDOM.render(<LoadingSpinner />, document.getElementById('container'));

        axios({
            method: 'POST',
            url: appsettings.Config.ServiceURL + 'item/edit',
            headers: {
                "Authorization": "Bearer " + window.idToken,
            },
            params: {
                id: this.props.row.original.id,
                ReportType: "Report",
                Name: $("#pageName").val(),
                Description: $("#pageDescription").val(),
                ReportTags: this.state.tags !== null ? this.state.tags.toString() : null,
                ReportOwner: $("#reportOwnerName").val(),
                CurrentDate: this.props.row.original.currentDate,
                Workspace: $("#workspaceDropDown").children("option:selected").html(),
                ReportName: $("#reportDropDown").children("option:selected").html(),
                Settings: JSON.stringify({ "filterPaneEnabled": $("#EnablePowerBIFilters").is(":checked"), "navContentPaneEnabled": $("#EnablePowerBITabs").is(":checked"), "IsGlobalFiltersEnabled": false }),
                ReportID: $("#reportDropDown").children("option:selected").attr('id'),
                EmbedURL: $("#reportDropDown").children("option:selected").val()
            }
        }).then(function (response) {
            logPageView({
                component: "Report Page Edit",
                view: "Admin",
                reportID: response.config.params.id,
                name: response.config.params.Name,
                reportType: response.config.params.ReportType,
                powerbiWorkspace: response.config.params.Workspace,
                powerbiReportName: response.config.params.ReportName,
                embedUrl: response.config.params.EmbedURL
              }, "Report Page Edit Success");

            ReactDOM.render(<NavigationBar pageName="AdminPage" Reports={response.data} title="Reports" />, document.getElementById('top-navbar'));
            ReactDOM.render(<SideBar pageName="AdminPage" Reports={response.data} />, document.getElementById('sidebar-navigation-pane'));
            ReactDOM.render(<Reports pageName="AdminPage" Reports={response.data} />, document.getElementById('container'));
        });

        event.preventDefault();
    }

    handleSubmit(event) {

        ReactDOM.render(<LoadingSpinner />, document.getElementById('container'));

        axios({
            method: 'POST',
            url: appsettings.Config.ServiceURL + 'Item/create',
            headers: {
                "Authorization": "Bearer " + window.idToken,
            },
            params: {
                ReportType: "Report",
                Name: $("#pageName").val(),
                Description: $("#pageDescription").val(),
                ReportTags: this.state.tags !== null ? this.state.tags.toString() : null,
                ReportOwner: $("#reportOwnerName").val(),
                CurrentDate: new Date().toLocaleDateString("en-US") + " " + new Date().toLocaleTimeString(),
                Workspace: $("#workspaceDropDown").children("option:selected").html(),
                ReportName: $("#reportDropDown").children("option:selected").html(),
                Settings: JSON.stringify({ "filterPaneEnabled": $("#EnablePowerBIFilters").is(":checked"), "navContentPaneEnabled": $("#EnablePowerBITabs").is(":checked"), "IsGlobalFiltersEnabled": false }),
                //IsPowerBiFilter: $("#EnablePowerBIFilters").is(":checked"),
                //IsPowerBiTabs: $("#EnablePowerBITabs").is(":checked"),
                //Tags: this.state.tags,
                ReportID: $("#reportDropDown").children("option:selected").attr('id'),
                EmbedURL: $("#reportDropDown").children("option:selected").val()
            }
        }).then(function (response) {
            
            logPageView({
                component: "Report Page Create",
                view: "Admin",
                reportID: response.data.reportID,
                name: response.data.name,
                reportType: response.data.reportType,
                powerbiWorkspace: response.data.workspace,
                powerbiReportName: response.data.reportName,
                embedUrl: response.data.embedURL
              }, "Report Page Create Success");
            var settings = {
                "url": appsettings.Config.ServiceURL,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + window.idToken,

                },
            };
            axios(settings).then(function (response) {
                //debugger;
                //ReactDOM.render(<LandingPage pageName="AdminPage" Reports={response.data} />, document.getElementById('root'));
                ReactDOM.render(<NavigationBar pageName="AdminPage" Reports={response.data} title="Reports" />, document.getElementById('top-navbar'));
                ReactDOM.render(<SideBar pageName="AdminPage" Reports={response.data} />, document.getElementById('sidebar-navigation-pane'));
                ReactDOM.render(<Reports pageName="AdminPage" Reports={response.data} />, document.getElementById('container'));
            });
        });

        event.preventDefault();
    }

    render() {
        const { showing } = this.state;
        const { showingFilters } = this.state;
        const selectedTags = (tags) => {
            this.setState({ tags: tags });
        }
        return (
            <section id="sectionStyle">
                <nav id="navStyle">
                    <ul id="navStyleUl" className='createPageSteps'>
                        <li className='createPageActiveStep' id="pageinfo-nav">Page Information</li>
                        <li id="review-nav">Review</li>
                    </ul>
                </nav>
                <article id="articleStyle">
                    <form id="checkForm">
                        <div id="pageInfDiv" style={{ display: (showingFilters ? 'none' : 'block') }}>
                            <div className="row" >
                                <div className="col-25">
                                    <label>Name</label>
                                    <span className="requiredMarker">*</span>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-75">
                                    <input defaultValue={this.props.action === "Edit" ? this.props.row.original.name : ""} disabled={this.props.action === "Edit" ? true : false} className="pageInfInputs" id="pageName" type="text" autofocus="autofocus" placeholder="Please Type Page Name" ref={el => this.nameValue = el} onChange={this.submitButton}></input>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-25">
                                    <label>Description</label>
                                    <span className="requiredMarker">*</span>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-75">
                                    <textarea defaultValue={this.props.action === "Edit" ? this.props.row.original.description : ""} className="pageInfInputs" id="pageDescription" maxLength = {500} placeholder="Please Type Page Description (500 characters)" ref={el => this.descriptionValue = el} onChange={this.submitButton}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Add Tags</label>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-75">
                                    <TagsInput selectedTags={selectedTags} tags={this.props.action === "Edit" && this.props.row.original.reportTags !== null ? this.props.row.original.reportTags.split(',') : []} />
                                    {/*<input defaultValue={this.props.action === "Edit" ? this.props.row.original.reportTags : ""} className="pageInfInputs" id="pageTagsName" type="text" placeholder="Please Add tags" ref={el => this.tagsValue = el} onChange={this.submitButton}></input>*/}
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-25">
                                    <label>Report Owner</label>
                                    <span className="requiredMarker">*</span>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-75">
                                    <input defaultValue={this.props.action === "Edit" ? this.props.row.original.reportOwner : ""} className="pageInfInputs" id="reportOwnerName" type="text" placeholder="Please Type Report Owner's Alias" ref={el => this.reportOwnerValue = el} onChange={this.submitButton}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Power BI Workspace</label>
                                    <span className="requiredMarker">*</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-75">
                                    <select className="pageInfInputs" id="workspaceDropDown" ref={el => this.workspaceValue = el} onChange={this.reportData}>
                                        {parse(this.state.workspaceOptions)}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Power BI Report</label>
                                    <span className="requiredMarker">*</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-75">
                                    <select className="pageInfInputs" id="reportDropDown" ref={el => this.reportdataValue = el} onChange={this.submitButton}>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-25" id="col-slider">

                                    <label id="switch">
                                        <input type="checkbox" id="EnablePowerBIFilters" onChange={this.submitButton} defaultChecked={this.props.action === "Edit" && this.props.row.original.settings !== undefined ? JSON.parse(this.props.row.original.settings).filterPaneEnabled : false} />
                                        <span className="slider round"></span>
                                    </label>

                                </div>
                                <div className="col-55" id="col-slider-label">
                                    <label>Enable Power BI Filters</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25" id="col-slider">

                                    <label id="switch">
                                        <input type="checkbox" id="EnablePowerBITabs" onChange={this.submitButton} defaultChecked={this.props.action === "Edit" && this.props.row.original.settings !== undefined ? JSON.parse(this.props.row.original.settings).navContentPaneEnabled : false} />
                                        <span className="slider round"></span>
                                    </label>

                                </div>
                                <div className="col-55" id="col-slider-label">
                                    <label>Enable Power BI Tabs</label>
                                </div>
                            </div>

                            <br /><br />
                            <div className="row">
                                <div className="col-25">
                                    {/*<input type="button" id="back-btn-pageInfo" value= "< Back"></input>*/}
                                </div>
                                <div className="col-50">
                                    <input type="button" id="next-btn-pageInfo" onClick={this.pageReviewView} value="Next >"></input>
                                    <input type="button" id="cancel-btn-1" onClick={this.handleCancel} value="Cancel"></input>
                                </div>
                            </div>
                        </div>
                        <div id="pageReview" style={{ display: (showing ? 'block' : 'none') }}>
                            <div className="row" >
                                <div className="col-25">
                                    <label>Review<hr className="horizLine"/></label>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-25">
                                    <label>Name</label>
                                </div>
                                <div className="col-75">
                                    <div id="displayName"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Description</label>
                                </div>
                                <div className="col-75">
                                    <div id="descriptionName"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Tags</label>
                                </div>
                                <div className="col-75">
                                    <div id="tagsNameDisplay">{this.state.tags !== null ? this.state.tags.toString() : ""}</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-25">
                                    <label>Report Owner</label>
                                </div>
                                <div className="col-75">
                                    <div id="reportOwnerDisplay"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Power BI Workspace</label>
                                </div>
                                <div className="col-75">
                                    <div id="workspaceName"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Power BI Report</label>
                                </div>
                                <div className="col-75">
                                    <div id="reportDataName"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Enable Power BI Filters</label>
                                </div>
                                <div className="col-75">
                                    <div id="powerBIFilters"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Enable Power BI Tabs</label>
                                </div>
                                <div className="col-75">
                                    <div id="powerBITabs"></div>
                                </div>
                            </div>
                            <br /><br />
                            <div className="row">
                                <div className="col-25">
                                    <input type="button" id="back-btn-review" onClick={this.pageInfoBack} value="< Back"></input>
                                </div>
                                <div className="col-50">
                                    <input type="button" id="submit-btn-review" value="Submit" onClick={this.props.action === "Create" ? this.handleSubmit : this.handleEdit}></input>
                                    <input type="button" id="cancel-btn-2" onClick={this.handleCancel} value="Cancel"></input>
                                </div>
                            </div>
                        </div>
                    </form>
                </article>
            </section>
        );
    }
}
export default ReportForm;
