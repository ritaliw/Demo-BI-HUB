import React from 'react';
import ReactDOM from 'react-dom';
import { runWithAdal } from 'react-adal';
import { authContext } from './config/adalConfig';
import appsettings from "./appsettings.json"

const DO_NOT_LOGIN = false;
document.title = appsettings.Config.Title;
runWithAdal(authContext, () => {
    window.UserName = window.authContext._user.profile.name.split('|')[0];
    window.idToken = sessionStorage["adal.idtoken"];
    authContext.acquireToken("https://analysis.windows.net/powerbi/api", function (error, token) {
        window.PowerBIAccessToken = token;
        // Handle ADAL Error
        if (error || !token) {
            return;
        }
    });
    // eslint-disable-next-line
    require('./indexAuth.js');

}, DO_NOT_LOGIN);