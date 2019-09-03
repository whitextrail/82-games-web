const Auth0 = require('auth0-js');
const axios = require('axios');

const auth0Domain = process.env.AUTH0_DOMAIN || '82-games-dev.auth0.com';
const auth0ClientId = process.env.AUTH0_CLIENT_ID || '7gK88Bdn1eJb43UtM2DHRgfoXXMooAwk';
const auth0Audience = process.env.AUTH0_AUDIENCE || 'https://82-games-dev-auth-api';
const auth0RedirectUrl = process.env.AUTH0_LOGIN_REDIRECT_URL || 'http://localhost:8000';

const auth0 = new Auth0.WebAuth({
  domain: auth0Domain,
  clientID: auth0ClientId,
  audience: auth0Audience,
  redirectUri: auth0RedirectUrl,
  responseType: 'token id_token',
  scope: 'openid profile email',
});

const checkSessionAsync = () => new Promise((resolve, reject) => {
  auth0.checkSession({}, (err, result) => {
    if (err) {
      return reject(err);
    }

    const { accessToken } = result;

    // Save for future usages
    localStorage.setItem('accessToken', accessToken);

    // Update the authorization token on all request headers
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // console.log(result.accessToken);
    return resolve(result);
  });
});

const logout = () => (
  auth0.logout({
    returnTo: auth0RedirectUrl,
    clientID: auth0ClientId,
  }, () => {
    // Delete from both localStorage and request headers
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  })
);

const authorize = () => auth0.authorize({});

// Return cached token if possible, otherwise, get from checkSessionAsync
const getToken = () => {
  const token = localStorage.getItem('accessToken');

  return token || checkSessionAsync().then(result => result.accessToken);
};

module.exports = {
  auth0,
  checkSessionAsync,
  logout,
  getToken,
  authorize,
};
