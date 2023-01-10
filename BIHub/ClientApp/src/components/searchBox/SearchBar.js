import React, { Component } from 'react';
import $ from 'jquery';
import './SearchBar.css';
import 'jquery-ui-dist/jquery-ui.js';
var oReportsRawData;
export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: true,
            oData: reportData
        };
        // this.openSearchBox = this.openSearchBox.bind(this);
        // this.closeSearchBox = this.closeSearchBox.bind(this);
        this.GetReportsSuccess = this.GetReportsSuccess.bind(this);
        if (this.state.getData) {
            this.GetReportsSuccess(this.state.oData);
        }
        // RequestHandler.sendRequest("Report/GetHubReports", "", this.GetReportsSuccess, RequestHandler.failureCallback, "POST", "wcb hub reports");
    }
    componentDidMount() {
        var arr = [];
        reportData.map((reportDetail, index) => {
            arr.push(reportDetail.Name);
        });
        $("#autocomplete").autocomplete(
            {

            }
        )
        $(".input").hide();
        $(".searchbtn").click(function () {
            $(this).toggleClass("bg-green");
            $(".fas").toggleClass("color-white");
            $(".input").focus().toggleClass("active-width").val('');
            $(".input").toggle();
        });
    }
    GetReportsSuccess(oData) {
        oReportsRawData = oData;
        var searchArr = [];
        oReportsRawData.forEach(function (result) {
            if (result['Name'] !== "") {
                searchArr.push({
                    value: result['Name'],
                    data: result,
                    metadata: "Name"
                });
            }
            if (result['CollectionName'] !== "") {
                searchArr.push({
                    value: result['CollectionName'],
                    data: result,
                    metadata: "CollectionName"
                });
            }
            if (result['Description'] !== "") {
                searchArr.push({
                    value: result['Description'],
                    data: result,
                    metadata: "Description"
                });
            }
        });
        //Common.oReportsGlobalSearchData = searchArr;
    }
    render() {
        return (
            // <div className="wrapper">
            //           <div className="searchbox">
            /* <input  id="search-input" type="text" className="input" placeholder="Search reports by name" /> */

            //       <div className="searchbtn">
            //         <img className=" fas icon-right" src={require("../images/search.png")} alt="##"/>
            //       </div>
            //   </div>
            // </div>
            <div> <input type="text" name="products" placeholder="Search products" class="product-search" id="autocomplete" autocomplete="off" /></div>
        )
    }
}
export default SearchBar;




