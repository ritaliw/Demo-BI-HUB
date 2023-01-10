import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import data from '../appsettings.json';

export const adalConfig = {
    tenant: data.Config.TenantId,
    clientId: data.Config.ClientId,
  endpoints: {
      api: data.Config.ClientId,
  },
  cacheLocation: 'sessionStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
window.authContext = authContext;

 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);