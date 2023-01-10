import React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import PropTypes from "prop-types";
import './MyProfile.css';

export class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }
    static propTypes = {
        collapseMethod:PropTypes.func
      };
    render() {
        return (
            <div>
                <Panel
                    isLightDismiss
                    headerText="My Profile"
                    debugger
                    isOpen={this.state.isOpen}
                    onDismiss={this.props.collapseMethod}
                    closeButtonAriaLabel="Close"
                >
                    <div id="myProfileHelpText">Set your area grouping, area, role category, and role to view reports relevant to you.</div>
                    <div>
                        <div className="form-group">
                            <label id="areagroupingLabel" className="profileLabel">Area Grouping <span className="requiredMarker">*</span></label>
                            <select className="form-control" id="profileAreaGrouping" >
                                <option disabled selected hidden>Select an Area Grouping</option>
                                <option value="16"> Corp</option>
                                <option value="1"> MSA</option>
                                <option value="2"> SSA</option>
                                <option value="3"> US</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label id="areaLabel" className="profileLabel">Area <span className="requiredMarker">*</span></label>
                            <select className="form-control" id="profileArea">
                                <option disabled selected hidden>Select an Area</option>
                                <option value="20"> Corp HQ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label id="profileRoleCategoryLabel" className="profileLabel">Role Category <span className="requiredMarker">*</span></label>
                            <select className="form-control" id="profileRoleCategory" >
                                <option disabled selected hidden >Select a Role Category</option>
                                <option value="19"> Beta</option>
                                <option value="5"> Customer Success</option>
                                <option value="26"> Demo</option>
                                <option value="12"> Finance</option>
                                <option value="1"> Leader</option>
                                <option value="2"> Manager</option>
                                <option value="20"> Marketing</option>
                                <option value="24"> Sales BI</option>
                                <option value="3"> Seller</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label id="profileRoleLabel" className="profileLabel">Role <span className="requiredMarker">*</span></label>
                            <select className="form-control" id="profileRole" >
                                <option disabled selected hidden>Select a Role</option>
                                <option value="62"> Beta</option>
                            </select>
                        </div>
                        <div className="submit-action" >
                            <span id="confirmUserprofile"><PrimaryButton text="Save" onClick={this.props.collapseMethod} /></span>
                            <span id="savedUserprofile"> <DefaultButton text="Cancel" onClick={this.props.collapseMethod} /></span>
                        </div>
                    </div>
                    <div className="form-group has-error">
                        <span id="MyViewValidationBlock" className="help-block hidden">** Previously used metadata was disabled or deleted, please &nbsp;&nbsp;&nbsp;&nbsp;select some other metadata and save.</span>
                    </div>
                </Panel>
            </div>
        );
    }

}
export default MyProfile;