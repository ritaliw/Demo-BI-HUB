import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import appsettings from "./appsettings.json";
let appInsights;

try {
  appInsights = new ApplicationInsights({
    config: {
          instrumentationKey: appsettings.Config.InstrumentationKey
    }
  });
  appInsights && appInsights.loadAppInsights();

} catch (ex) {
  appInsights=false;
  console.log("application insights failed");
  console.dir(ex.message);
}

export const logCustomEvent = (customProperties, eventName) => {
  let event = {
    name: `${eventName}`,
    properties: {
      ...customProperties
    }
  }
  appInsights && appInsights.trackEvent(event);
  console.log("logEvent", event)
};

export const logPageView = (customProperties, eventName) => {
    let event = {
      name: `${eventName}`,
      properties: {
        ...customProperties
      }
    }
    appInsights && appInsights.trackPageView(event);
  };
  

export const logException = (ex, customProperties) => {
  let event = {
    exception: ex,
    properties: {
      ...customProperties
    }
  };
  appInsights && appInsights.trackException(event);
  console.log("logException", event);
};

// const getBasicLog = () => {
//   let value = {};
//   value["sessionId"] = appCookies?.sessionid || "no session";
//   value["datetime"] = new Date();
//   return value;

// }

