import React, { Component } from 'react';
import '../../App.css';
import "./GFP.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import gfpData from '../../data/gfpData.json'
import PropTypes from "prop-types";
var level, levelArray = [], levelIdArray = [], currentLevelElement;
//var filterValues = [], filterLevelDataValues = [];

export class GFPFilterGroupData extends Component {
    gfpData = gfpData;

    constructor(props) {
        super(props);
        this.state = {
            filterGroupValues: {},
            isChecked: {},
            showComponent: false,
            selectedLevel: "",
            filterValues: []
        }
        this.populateFilterLevels = this.populateFilterLevels.bind(this);
        this.renderFilterLevels = this.renderFilterLevels.bind(this);
        this.selectFilterTab = this.selectFilterTab.bind(this);
        this.gfpFilterApply = this.gfpFilterApply.bind(this);
        this.gfpFilterClear = this.gfpFilterClear.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.appendChildFilterValues = this.appendChildFilterValues.bind(this);
    }
    static propTypes = {
        tabName:PropTypes.string
      };
    componentDidMount() {
        var filterValues = [], filterId = [];

        // Code for default filter selection - start
        for (var key in this.gfpData) {
            var filterDetails = this.gfpData[key],
                filterList;
            for (var filter in filterDetails) {
                filterList = filterDetails[filter].values;
                filterValues.push(filterList);
                for (var i in filterList) {
                    filterId.push(filterDetails[filter].id + "_" + filterList[i]);
                }
            }
        }

        const ofilterID = filterId;
        if (localStorage.oAppliedFilterValues !== undefined) {
            var localFilterData = JSON.parse(localStorage.oAppliedFilterValues);
            var temp = Object.assign({}, localFilterData);
            var ogfpData = ofilterID;
            Object.keys(this.gfpData).forEach(function (filterGroupName, filterGroupId) {
                // if (Object.keys(localFilterData).includes(filterGroupName)) {
                Object.values(ogfpData).forEach(function (filterName, filterId) {
                    if (localFilterData[filterName]) {
                        temp[filterName] = true;
                    }
                })
                // }
            });

            this.setState({
                isChecked: temp
            });
        }
        // Code for default filter selection - end
    }

    gfpFilterApply(event) {
        var filtervaluelist = Object.values(this.state.filterGroupValues),
            values = [],
            filterType = 1,
            operator = "In",
            $schema = "http://powerbi.com/product/schema#basic",
            aPowerBIFilters = [],
            column = "Area",
            table = "DimSellerTPID",
            target = Object.assign({}, { column, table });

        for (let filter of filtervaluelist) {
            values['values'] = filter;
        }
        values = values['values'];
        var oAppliedFilterValues = Object.assign({}, { values, filterType, operator, $schema, target });
        const filterDetails = Object.assign({}, this.state.isChecked);
        aPowerBIFilters.push(oAppliedFilterValues);
        localStorage.setItem('oAppliedFilterData', JSON.stringify(aPowerBIFilters));
        localStorage.setItem('oAppliedFilterValues', JSON.stringify(filterDetails));
    }

    gfpFilterClear(event) {
        this.setState({
            isChecked: {},
            filterGroupValues: []
        });
        localStorage.clear();
    }

    appendChildFilterValues(filter, selecteFilterLevelId) {
        if (filter.childrenFilters) {
            for (let filterChild of filter.childrenFilters) {
                if (filterChild.levelNumber !== selecteFilterLevelId) {
                    this.appendChildFilterValues(filterChild, selecteFilterLevelId);
                } else {
                    let currentFilterName = filterChild.value;
                    // filterValues.push(currentFilterName);
                    this.setState(prevState => {
                        const filterValues = prevState.filterValues;

                        filterValues.push(currentFilterName)


                        return {
                            filterValues
                        }
                    });

                }
            }
        }
    }

    selectFilterTab(data, elementId, selecteFilterLevelId) {
        this.setState({ filterValues: [] });
        for (let filter of data) {
            if (selecteFilterLevelId > 0) {
                for (let filterChild of filter.childrenFilters) {
                    if (filterChild.levelNumber !== selecteFilterLevelId) {
                        this.appendChildFilterValues(filterChild, selecteFilterLevelId);
                    } else {
                        let currentFilterName = filterChild.value;
                        // filterValues.push(currentFilterName);
                        this.setState(prevState => {
                            const filterValues = prevState.filterValues;

                            filterValues.push(currentFilterName)


                            return {
                                filterValues
                            }
                        });

                    }
                }
            } else {
                let currentFilterName = filter.value;
                this.setState(prevState => {
                    const filterValues = prevState.filterValues;
                    filterValues.push(currentFilterName)
                    return {
                        filterValues
                    }
                });

                // filterValues =  Object.assign({}, this.state.filterValues).slice();
                //  filterValues.push(currentFilterName);
            }
        }

        this.setState({
            showComponent: true,
            selectedLevel: elementId
        });

        //   var inputType = this.gfpData[this.props.tabName].inputType;
        // filterLevelDataValues = filterValues.map((filter, i) =>
        //       <div  className="filterLevelValue" >
        //           <input id={"filterLevelValueTab_" + filter} type={inputType} name="filterGroupTab" value={filter}  onChange={this.toggleChange} checked={this.state.isChecked["filterLevelValueTab_" + filter] !== undefined ? this.state.isChecked["filterLevelValueTab_" + filter] : false}/>
        //           <label htmlFor={"filterLevelValueTab_" + filter} id = "filterLevelLabel">{filter}</label>
        //       </div>
        // );

        return;
    }

    renderFilterLevels(data) {
        this.populateFilterLevels(data);
        var inputType = this.gfpData[this.props.tabName].inputType;
        const filterData = levelArray.map((filter, i) =>
            <div id={"filterLevelTab_" + filter} className="filterLevel" onClick={() => this.selectFilterTab(this.gfpData[this.props.tabName].filters.childrenFilters, "filterLevelTab_" + filter, levelIdArray[i])} >
                <input id={"filterLevelTab_" + filter} type="radio" name="filterGroupTab" value={filter} />
                <label htmlFor={"filterLevelTab_" + filter} >{filter}</label>
                {this.state.showComponent && this.state.selectedLevel === "filterLevelTab_" + filter ? <div className="filterLevelValues">
                    {
                        this.state.filterValues.map((filter, i) =>
                            <div className="filterLevelValue" >
                                <input id={"filterLevelValueTab_" + filter} type={inputType} name="filterGroupTab" value={filter} onChange={this.toggleChange} checked={this.state.isChecked["filterLevelValueTab_" + filter] !== undefined ? this.state.isChecked["filterLevelValueTab_" + filter] : false} />
                                <label htmlFor={"filterLevelValueTab_" + filter} id="filterLevelLabel">{filter}</label>
                            </div>)}
                </div> : null}
            </div>
        );

        return (
            <div className="filterValues">{filterData}

                <div className="GFPBtn">
                    <input type="button" tabIndex="0" id="applyView" className="filterApplyBtn" onClick={this.gfpFilterApply} value="Apply" />
                    <input type="button" tabIndex="0" id="clearView" className="filterClearBtn" onClick={this.gfpFilterClear} value="Clear" />
                </div>

            </div>

        )
    }
    toggleChange(event) {
        var temp = Object.assign({}, this.state.isChecked);

        temp[event.target.id] = event.target.checked;

        this.setState({
            isChecked: temp
        });

        var elementValue = event.target;
        this.setState((state, props) => {

            const filterGroupValues = Object.assign({}, state.filterGroupValues)
                , currentTabFilterValues = filterGroupValues[props.tabName] || [];

            if (elementValue.checked) {
                if (!currentTabFilterValues.includes(elementValue.value)) {
                    currentTabFilterValues.push(elementValue.value);
                }

            } else {
                const indexValue = + currentTabFilterValues.indexOf(elementValue.value);
                if (currentTabFilterValues.includes(elementValue.value)) {
                    currentTabFilterValues.splice(indexValue, 1);
                    localStorage.removeItem(elementValue.value);
                }
            }
            filterGroupValues[props.tabName] = currentTabFilterValues;
            //state.filterGroupValues = filterGroupValues;
            return { filterGroupValues };
        });
    }
    populateFilterLevels(data) {
        var filterValues, filterID = [], inputType, filtersData;

        if (!data) {

            filtersData = this.gfpData;
        }
        else {
            filtersData = data;
        }

        for (let filter of filtersData) {
            let currentLevelName = filter.levelName;
            if (!levelArray.includes(currentLevelName)) {
                levelArray.push(currentLevelName);
                levelIdArray.push(filter.levelNumber);
            }
            if (filter.childrenFilters) {
                this.populateFilterLevels(filter.childrenFilters);
            }
        }
    }

    render() {
        levelArray = [];
        levelIdArray = [];
        return (
            <div>
                {this.renderFilterLevels(this.gfpData[this.props.tabName].filters.childrenFilters)}
            </div>
        )
    }
}

export default GFPFilterGroupData