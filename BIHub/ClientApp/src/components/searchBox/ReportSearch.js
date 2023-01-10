import React, { Fragment } from 'react';
import $ from 'jquery';
import './ReportSearch.css';
import 'jquery-ui-dist/jquery-ui.js';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

export class ReportSearch extends React.Component {
    constructor(props) {
        super(props);
        this.openSearchBox = this.openSearchBox.bind(this);
        this.closeSearchBox = this.closeSearchBox.bind(this);
    }
    openSearchBox() {
        if (!$("#searchBoxSection").hasClass("hidden")) {
            $(".globalSearchBox").removeClass("hidden");
            $("#searchBoxSection").addClass("hidden");
        }
    }

    closeSearchBox() {
        if (!$(".globalSearchBox").hasClass("hidden")) {
            $(".globalSearchBox").addClass("hidden");
            $("#searchBoxSection").removeClass("hidden");
        }
    }
    render() {
        return (<Fragment>
            <button>
                <div className="reportsGlobalSearch">
                    <a id="searchBoxSection" >
                        <div className="searchIconImage searchBoxIcon navbarInfoIcon"></div>
                        <img id="globalSearchIcon" src={require("../../images/navigationbarImages/search.png")} ></img>
                    </a>
                    <div className="globalSearchBox">
                        <div className="input-group-addon" id="globalSearchBox">
                            <input id="globalSearch" type="text" placeholder="Search reports by name" title="Search reports by name" />
                            <img id="globalSearchIcon1" src={require("../../images/navigationbarImages/search.png")}  ></img>
                        </div>
                    </div>
                </div>
            </button>
        </Fragment>
        )
    }

}

export default ReportSearch;