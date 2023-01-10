import React, { Component } from 'react';
import '../../App.css';
import "./GFP.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import GFPFilterGroupData from './GFPFilterGroupData'

var currentElement;

export class GFPFilterGroup extends Component {
    constructor(props) {
        super(props);
        this.selectFilterTab = this.selectFilterTab.bind(this);
        this.myRef = React.createRef();
        this.myRef = [];
        this.state = {
            tabValue: "Geography", //set default value of GFP
            data: []
        }
    }

    selectFilterTab(event) {
        currentElement = event.target.innerText;
        this.setState({ tabValue: currentElement });  //update the state of element
    }

    render() {
        return (
            <div>
                <div className="filterDataWrapper">
                    <div>
                        <div className="filterGrouppHeaderClass" title="Filter Groups:">Filter Groups:</div>
                        <div className="filterGroupList">
                            <input id="filterGroupTab_100" type="radio" name="filterGroupTab" value="Geography" defaultChecked={true} />
                            <label htmlFor="filterGroupTab_100" ref={(input) => { this.myRef[0] = input }} onClick={this.selectFilterTab}>Geography</label>
                            <input id="filterGroupTab_300" type="radio" name="filterGroupTab" value="Segment" />
                            <label htmlFor="filterGroupTab_300" ref={(input) => { this.myRef[0] = input }} onClick={this.selectFilterTab}>Segment</label>
                        </div>
                    </div>
                </div>
                <GFPFilterGroupData tabName={this.state.tabValue} />
            </div>
        )
    }
}

export default GFPFilterGroup;
