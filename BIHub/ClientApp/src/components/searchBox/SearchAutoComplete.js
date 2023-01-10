import React, { Fragment } from 'react';
import $ from 'jquery';
import './SearchAutoComplete.css';
import 'jquery-ui-dist/jquery-ui.js';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import { PowerbiEmbed, NavigationBar } from '..';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {logPageView} from "../../applicationInsights"
export class ReportSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            searchReport: ''
        }
    }
    static propTypes = {
        Reports: PropTypes.any,
        pageName: PropTypes.string
      };
    componentDidMount() {
        $('#search-btn-autocomplete').on('keypress', function (e) {
            if (e.which === 13) {
                $('.globalSearchBox').show();
                $('#globalSearchIconOuter').hide();
            }
        });

        $("#globalSearch").blur(function () {
            $('.globalSearchBox').hide();
            $('#globalSearchIconOuter').show();
            $(this).val('');
        });

        $('.globalSearchBox').hide();
        $('#globalSearchIconOuter').click(function () {
            logPageView({
                component: "Global Search",
                view: "User/ Admin"
              }, "Click on Search");
            $('.globalSearchBox').show();
            $('#globalSearch').focus();
            $('#globalSearchIconOuter').hide();
        });
        $('.search-icon-access').click(function () {
            $('.globalSearchBox').hide();
            $('#globalSearchIconOuter').show();
        });
    }
    render() {
        $(() => {
            var variable = this.props.Reports;
            $('#globalSearch').autocomplete({
                minLength: 1,
                source: function (request, response) {
                    // variable=this.state.reports
                    response($.map(variable, function (obj, key) {
                       
                        var name = obj.name.toUpperCase();
                        var desc = obj.description.toUpperCase();
                        //var collection = obj.collectionName.toUpperCase();
                        if (name.indexOf(request.term.toUpperCase()) !== -1) {
                            return {
                                label: obj.name,  /*" (" + obj.Description + ")", // Label for Display */
                                // value: obj.Name, // Value
                                Name: obj.name,
                                Description: obj.description,
                                //CollectionName: obj.CollectionName,
                                ReportID: obj.reportID,
                                EmbedURL: obj.embedURL,
                                Settings: obj.settings
                            }
                        } else if (desc.indexOf(request.term.toUpperCase()) !== -1) {
                            //return null;
                            return {
                                label: obj.description,  /*" (" + obj.Description + ")", // Label for Display */
                                // value: obj.Name, // Value
                                Name: obj.name,
                                Description: obj.description,
                                //CollectionName: obj.CollectionName,
                                ReportID: obj.reportID,
                                EmbedURL: obj.embedURL,
                                Settings: obj.settings
                            }
                        }// else if (collection.indexOf(request.term.toUpperCase()) !== -1) {
                        //    //return null;
                        //    return {
                        //        label: obj.CollectionName,  /*" (" + obj.Description + ")", // Label for Display */
                        //        // value: obj.Name, // Value
                        //        Name: obj.Name,
                        //        Description: obj.Description,
                        //        CollectionName: obj.CollectionName,
                        //        ReportID: obj.ReportID,
                        //        EmbedURL: obj.EmbedURL
                        //    }
                        //}
                    }));
                },
                focus: function (event, ui) {
                    event.preventDefault();
                },
                // Once a value in the drop down list is selected, do the following:
                select: (event, ui) => {
                    event.preventDefault();
                    var searchString = window.$("#globalSearch").val();
                    logPageView({
                        component: "Global Search",
                        reportID: ui.item.ReportID,
                        reportName: ui.item.Name,
                        embedURL: ui.item.EmbedURL,
                        searchedKeyword: searchString,
                        view: "User/ Admin"
                      }, "Select report from Global Search options");
                    
                    ReactDOM.render(<NavigationBar pageName={this.props.pageName} Reports={this.props.Reports} title={ui.item.Name} />, document.getElementById('top-navbar'));
                    ReactDOM.render(<PowerbiEmbed ReportID={ui.item.ReportID} EmbedURL={ui.item.EmbedURL} Settings={ui.item.Settings} />, document.getElementById('container'))
                    // place the person.given_name value into the textfield called 'select_origin'...
                    // $('#myautocomplete').val(ui.item.label);
                    // ... any other tasks (like setting Hidden Fields) go here...
                }
            });
        });

        return (
            <Fragment>
                <button id='search-btn-autocomplete'>
                    <div className="reportsGlobalSearch">
                        <img id="globalSearchIconOuter" src={require("../../images/navigationbarImages/search.png")} alt="##" ></img>
                        <div className="globalSearchBox" id="globalSearchBox">
                            <input id="globalSearch" type="text" placeholder="Search reports by name" title="Search reports by name" />
                            <a className='search-icon-access' href='/#'>
                                <img id="globalSearchIconInner" src={require("../../images/navigationbarImages/search.png")} alt='search-icon' /></a>
                        </div>
                    </div>
                </button>
            </Fragment>
        )
    }
}

export default ReportSearch;