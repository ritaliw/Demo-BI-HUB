import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Router, Route, browserHistory } from 'react-router'
import axios from 'axios';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import { GFP, Reports, LandingPage } from './components'
import appsettings from "./appsettings.json"
//Routing
// eslint-disable-next-line

ReactDOM.render(<LoadingSpinner />, document.getElementById('root'))
var settings = {
    "url": appsettings.Config.ServiceURL,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "Bearer " + window.idToken,

    },
};

axios(settings).then(function (response) {
    ReactDOM.render(<LandingPage pageName="UserPage" Reports={response.data} />, document.getElementById('root'));
});

// const routing = (

//     <Router history={browserHistory} >
//         <div>
//             <Route exact path="/" component={landingPage} />
//             <Route path="/GFP" component={gfp} />
//             <Route path="/Reports" component={reports} />
//             {/* <Route path="/LandingPage" component={LandingPage} />  */}

//         </div>
//     </Router>

// )
//<LandingPage />



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


