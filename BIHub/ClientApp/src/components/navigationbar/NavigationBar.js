import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './NavigationBar.css';
import $ from 'jquery';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { ReportSearch, MyProfile, SettingPage, SideBar, Reports } from '../../components';
import axios from 'axios';
import {logPageView} from "../../applicationInsights"

export class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: true,
            showMyProfile: false,
            isOpenProfilePanel: false,
            imageURL: ""
        };
        this.toggleProfileState = this.toggleProfileState.bind(this);
    }
    componentDidMount() {
        $('#nav-dropdown1').removeClass('dropdown-toggle');
        $('#nav-dropdown2').removeClass('dropdown-toggle nav-link');
        $('#nav-dropdown3').removeClass('dropdown-toggle nav-link');
        $('#nav-dropdown1').append("<i class='material-icons'>more_horiz</i>");
        var $window = $(window);
        var windowWidth = $window.width();
        if (windowWidth > 900) {
            $('.profile-view').show();
            $('.conmode').hide();
            $('.expmode').show();
        }
        else {
            $('.profile-view').hide();
            $('.conmode').show();
            $('.expmode').hide();
        }
        $(window).resize(function () {
            if ($window.width() > 900) {
                $('.profile-view').show();
                $('.conmode').hide();
                $('.expmode').show();
            }
            else {
                $('.profile-view').hide();
                $('.conmode').show();
                $('.expmode').hide();
            }
        });
        $('.dropdown-toggle nav-link').click(function () {
            $(this).toggleClass('d-none');
        })
    }
    static propTypes = {
        Reports: PropTypes.any,
        pageName: PropTypes.string
      };
    componentWillMount() {
        var that = this;
        window.authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
            var settings = {
                "url": "https://graph.microsoft.com/beta/me/photo/$value",
                "method": "GET",
                "timeout": 0,
                responseType: 'arraybuffer',
                "headers": {
                    "Authorization": "Bearer " + token
                },
            };
            axios(settings).then((response) => {
                var arrayBufferView = new Uint8Array(response.data);
                var blob = new Blob([arrayBufferView], {
                    type: "image/jpeg"
                });
                var urlCreator = window.URL || window.webkitURL;
                var imageURL = urlCreator.createObjectURL(blob);
                that.setState({ imageURL: imageURL });
            });
            // Handle ADAL Error
            if (error || !token) {
                return;
            }
        });
    }

    toggleProfileState() {
        this.setState(prevState => ({
            isOpenProfilePanel: !prevState.isOpenProfilePanel
        }))
    }
    render() {

        const handleSelect = eventkey => {
            //   alert(`selected ${eventkey}`)
            switch (eventkey) {
                case 'My Profile':
                    //        this.setState(prevState => ({
                    //     isOpenProfilePanel: !prevState.isOpenProfilePanel
                    //   }))
                    //    ReactDOM.render(<MyProfile isOpenProfilePanel={this.state.isOpenProfilePanel} />, document.getElementById('container'));
                    break;
                case '4.3':
                    logPageView({
                        component: "My Profile",
                        loadedView: this.props.pageName === "UserPage" ? "Admin" : "User"
                      }, "Switch User Profile");                      
                    ReactDOM.render(<NavigationBar pageName={this.props.pageName === "UserPage" ? "AdminPage" : "UserPage"} Reports={this.props.Reports} title="Reports" />, document.getElementById('top-navbar'));
                    ReactDOM.render(<SideBar pageName={this.props.pageName === "UserPage" ? "AdminPage" : "UserPage"} Reports={this.props.Reports} />, document.getElementById('sidebar-navigation-pane'));
                    ReactDOM.render(<Reports pageName={this.props.pageName === "UserPage" ? "AdminPage" : "UserPage"} Reports={this.props.Reports} />, document.getElementById('container'));
                    //ReactDOM.render(<Reports Reports={this.props.Reports} pageName={this.props.pageName === "UserPage" ? "AdminPage" : "UserPage"}/>, document.getElementById('container'));
                    //ReactDOM.render(<LandingPage Reports={this.props.Reports} pageName={this.props.pageName==="UserPage" ? "AdminPage" : "UserPage"} /> , document.getElementById('root'))
                    break;
                case '4.4':
                    ReactDOM.render(<SettingPage />, document.getElementById('root'))
                    break;
                case 'Report':
                default: ReactDOM.render(null, document.getElementById('container'));
            }
        };
        return (
            <div className="Nav">
                <Navbar id="navbar" onSelect={handleSelect}
                //            onKeyPress={event => {alert("pp")}}
                >
                    <Navbar.Brand >{this.props.title}</Navbar.Brand>

                    <Nav className="mr-auto" >
                    </Nav>
                    <Nav.Item><ReportSearch Reports={this.props.Reports} /></Nav.Item>
                    <div className="expmode">

                        {/* <Nav.Item><NotificationPanel /></Nav.Item> */}
                        <Nav.Item><button eventkey="3" className='btn-icon' onClick={() => { window.location.href = "mailto:sales@maqsoftware.com?subject=Support Request: BI Hub&body="; logPageView({ component: "Get Support", view: this.props.pageName === "UserPage" ? "User" : "Admin" }, "Click on Get Support"); }}><img className="icon-right" src={require("../../images/navigationbarImages/support.png")} alt="##" />

                        </button>
                        </Nav.Item>
                    </div>
                    <div className="conmode">
                        {/* <NavDropdown title="" id="nav-dropdown1">
                    <NavDropdown.Item eventkey="4.1"><div style={{display:'inline-flex'}}><NotificationPanel/>Notifications</div></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventkey="4.2" onClick={()=>{window.location.href = "mailto:sales@maqsoftware.com?subject=Support Request: BI Hub&body="}}><img className="icon-right" style={{height: '25px',width:'25px', marginRight:'5px'}} src={require("./images/support.png")} alt="##"/>Support</NavDropdown.Item>
                </NavDropdown> */}
                    </div>
                    {/* <UserProfileDropdown /> */}

                    <NavDropdown bsStyle="pills" title={<div className='temp' onSelect={this.handleSelect}>
                        <img class="userProfile" src={this.state.imageURL} alt="##" /></div>
                    } id="nav-dropdown2" >
                        <NavDropdown.Item eventkey="4.1" disabled>{`${window.UserName}`}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* <NavDropdown.Item eventkey="My Profile"><button eventkey="2" className='btn-icon'><MyProfile isOpenProfilePanel={this.toggleState} /></button></NavDropdown.Item> */}
                        {/* <NavDropdown.Item eventkey="My Profile"  ><MyProfile /></NavDropdown.Item> */}
                        {/* <NavDropdown.Item eventkey="My Profile" onClick={()=>{alert("sssss")}}>My Profile</NavDropdown.Item> */}
                        {/*<NavDropdown.Item eventkey="My Profile" onClick={this.toggleProfileState}>{this.state.isOpenProfilePanel ? <MyProfile collapseMethod={this.toggleProfileState} /> : null}My Profile</NavDropdown.Item>*/}
                        <NavDropdown.Item eventKey="4.3" >{this.props.pageName === "UserPage" ? "Admin" : "User"}</NavDropdown.Item>
                        {/* <NavDropdown.Item eventKey="4.4" >Settings</NavDropdown.Item> */}

                        <NavDropdown.Divider />
                        <NavDropdown.Item eventkey="4.5" onClick={() => {  logPageView({ component: "Sign Out", view: this.props.pageName === "UserPage" ? "User" : "Admin" }, "Click on Sign Out"); window.authContext.logOut(); }}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;