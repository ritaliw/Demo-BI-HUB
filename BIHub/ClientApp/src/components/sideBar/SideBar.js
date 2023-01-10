import React, { Fragment } from 'react';
import { Nav, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import './SideBar.css';
import $ from 'jquery';
import PropTypes from "prop-types";
import '../navigationbar/NavigationBar.css';
import ReactDOM from 'react-dom';
import { NavigationBar } from '..'
import appsettings from "./../../appsettings.json"

import { AdminCreatePage, SettingPage, LandingPage, Reports, PowerbiEmbed } from '../../components';

function _onRenderGroupHeader(group: INavLinkGroup): JSX.Element {
    return <h3>{group.name}</h3>;
}
function SidebarCollapse() {
    $('.sidebar').toggleClass('sidebar-expanded sidebar-collapsed');
    $('.title-text').toggleClass('show-text hide-text');
    $('#title-icon').toggleClass('expandedmode collapsedmode');
}
initializeIcons()
export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: this.props.Reports,
            isExpanded: true,
            adminTitle: 'Reports',
            userTitle: 'Reports'
        };
        this._onLinkClick = this._onLinkClick.bind(this);
    }
    static propTypes = {
        Reports: PropTypes.any,
        pageName: PropTypes.string
      };
    handleSetting() {
        alert("Entered Settings");
        ReactDOM.render(<SettingPage />, document.getElementById('root'))
    }
    _onLinkClick(_event, item) {
        if (!item || !item.name) {
            return false;
        }
        $(".ms-Button").blur();
        ReactDOM.render(<NavigationBar pageName={this.props.pageName} Reports={this.props.Reports} title={item.title} />, document.getElementById('top-navbar'));
        switch (item.key) {
            case 'key2': SidebarCollapse();
                this.setState(prevState => ({
                    ...prevState,
                    isExpanded: !prevState.isExpanded,
                }));
                if($("#ico").hasClass("icoLeft")){
                    $("#ico").removeClass("icoLeft");
                    $("#ico").addClass("icoRight");
                }
                break;
            case 'Report': ReactDOM.render(<Reports Reports={this.props.Reports} pageName={this.props.pageName} />, document.getElementById('container'));
                if($("#ico").hasClass("icoRight")){
                    $("#ico").removeClass("icoRight");
                    $("#ico").addClass("icoLeft");
                }
                if ($("#ico").hasClass("fa-angle-down")) {
                    $("#ico").removeClass("fa-angle-down");
                    $("#ico").addClass("fa-angle-up");
                }
                else {
                    $("#ico").removeClass("fa-angle-up");
                    $("#ico").addClass("fa-angle-down");

                }
                if (this.state.adminTitle !== 'Reports')
                    this.setState({ adminTitle: 'Reports' });
                break;
            case 'key1': ReactDOM.render(<reports />, document.getElementById('container'));
                this.setState({ adminTitle: 'Reports' });
                break;
            case 'CreatePage': this.setState({ adminTitle: 'CreatePage' });
                ReactDOM.render(<NavigationBar pageName={this.props.pageName} Reports={this.props.Reports} title="Report Configuration" />, document.getElementById('top-navbar'));
                ReactDOM.render(<AdminCreatePage Reports={this.props.Reports} />, document.getElementById('container'));
                break;
            default: ReactDOM.render(null, document.getElementById('container'));
                    if($("#ico").hasClass("icoLeft")){
                        $("#ico").removeClass("icoLeft");
                        $("#ico").addClass("icoRight");
                    }
        }
    }

    componentDidMount() {
        $(".ms-Nav").prepend($("<div class='title'><img id='title-icon' class='expandedmode'><h4 class='title-text show-text'>" + appsettings.Config.Title + "</h4></div>"));
        $('#title-icon').attr("src",require("../../images/sideBarImages/logo.png"));
        $('.title').click(() => {
            //ReactDOM.render(null, document.getElementById('container'));
            ReactDOM.render(<NavigationBar pageName="UserPage" Reports={this.props.Reports} title="Reports" />, document.getElementById('top-navbar'));
            ReactDOM.render(<SideBar pageName="UserPage" Reports={this.props.Reports} />, document.getElementById('sidebar-navigation-pane'));
            ReactDOM.render(<Reports pageName="UserPage" Reports={this.props.Reports} />, document.getElementById('container'));
        });

        // $('.ms-Nav-chevron').click(function () {
        //     $(this).css('background-color', '#F3F2F0');

        // });
        // Have to modify
        $(".menu-collapsed1").append("<i id='ico' class='fa fa-angle-down icoRight'></i>");
        $('.ms-Nav-chevronButton').hide();

        // $(".iconName").focus(function () {
        //     $(".ms-Nav-chevronButton").css("border", "none");
        // });

        if (this.props.pageName === "AdminPage") {
            $('#ico').hide();
        }
        if (this.props.pageName === "UserPage") {
            $('#ico').show();
        }
    }
    render() {
        if (this.props.pageName === "AdminPage") {
            $('#ico').hide();
        }
        if (this.props.pageName === "UserPage") {
            $('#ico').show();
        }
        return (
            <Fragment >
                <Nav className="" id="sidebar" styles={{
                    root: {
                        color: "#333333",
                        backgroundColor: "#F3F2F0",
                        fontSize: "55px",
                        marginTop: 0,
                        position: "fixed",
                        height: "100%"
                    },
                    navItem: {
                        selectors: {
                            color: "black",
                            '& .ms-Icon': {
                                marginLeft: "10%"
                            }
                        }
                    }
                }}
                    onRenderGroupHeader={_onRenderGroupHeader}
                    onLinkClick={this._onLinkClick}
                    ariaLabel="Nav example with custom group headers"
                    groups={[
                        {
                            links: [
                                { name: <div className="iconName menu-collapsed">Navigation</div>, icon: 'GlobalNavButton', key: 'key2', target: '_blank', title: this.props.pageName === "AdminPage" ? this.state.adminTitle : this.state.userTitle },
                                // this.props.pageName === "SettingPage" ? {name:<div eventKey="4.3" onClick={this.handleSetting}>Setting</div>} : {},

                                // {name: <div className="iconName menu-collapsed">HOME</div>, icon: 'HomeSolid',key:'key1', target: '_blank',title:'Home'},
                                //{ name: <div className="iconName menu-collapsed">FAVOURITES</div>,icon: 'FavoriteStarFill', key: 'key3', target: '_blank',title:'Favourites'},

                                this.props.pageName === "UserPage" || this.props.pageName === "AdminPage" && this.props.pageName !== "SettingPage" ?
                                    {
                                        name: <div className="iconName menu-collapsed1">Reports</div>,
                                        icon: 'ReportDocument',
                                        key: 'Report',
                                        title: 'Reports',
                                        expandAriaLabel: 'Expand Extended components section',
                                        collapseAriaLabel: 'Collapse Extended components section',

                                        links: this.state.isExpanded && this.props.pageName === "UserPage" ?
                                            this.props.Reports.map((report, key) => {
                                                return (
                                                    {
                                                        icon: 'ReportDocument',
                                                        key: report.name,
                                                        name: report.name,
                                                        onClick: (item: IContextualMenuItem, ev: React.MouseEvent): void => {
                                                            $(".ms-Button").blur();
                                                            ReactDOM.render(<NavigationBar pageName={this.props.pageName} Reports={this.props.Reports} title={report.name} />, document.getElementById('top-navbar'));
                                                            ReactDOM.render(<PowerbiEmbed ReportID={report.reportID} EmbedURL={report.embedURL} Settings={report.settings} />, document.getElementById('container'))
                                                        }
                                                    }
                                                );
                                            })
                                            : []
                                    } : {},

                                this.props.pageName === "AdminPage" ? { name: <div className="iconName menu-collapsed">Create Page</div>, icon: 'PageAdd', key: 'CreatePage', target: '_blank', title: 'Create Page' } : {},
                            ]
                        }
                    ]}
                />
            </Fragment>
        );
    }
}

export default SideBar;