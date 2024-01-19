const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const peopleApiFactory = require('./people-api');

module.exports.create = (authenticationConfig, repo) => {
  const router = express.Router();

  if (authenticationConfig.auth0.domain && authenticationConfig.auth0.audience) {
    const checkJwt = auth({
      audience: authenticationConfig.auth0.audience,
      issuerBaseURL: `https://${authenticationConfig.auth0.domain}/`,
      algorithms: ['RS256'],
    });
    router.use(checkJwt);

    router.get('/external', checkJwt, (req, res) => {
      res.send({
        msg: 'Your access token was successfully validated!',
      });
    });
  } else {
    console.log('Please make sure that AUTH0_DOMAIN AND AUTH0_AUDIENCE are set with valid domain and audience values. Running in non-authenticated mode...');
  }

  router.use('/people', peopleApiFactory.create(repo));

  return router;
};
