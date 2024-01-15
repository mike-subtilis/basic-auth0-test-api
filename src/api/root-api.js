const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const peopleApiFactory = require('./people-api.js');

module.exports.create = (authenticationConfig, repo) => {
    if (!config.authentication.auth0.domain || !config.authentication.auth0.audience) {
        console.log(
          'Please make sure that AUTH0_DOMAIN AND AUTH0_AUDIENCE are set with valid domain and audience values'
        );
        exit();
    }

    const checkJwt = auth({
        audience: authenticationConfig.auth0.audience,
        issuerBaseURL: `https://${authenticationConfig.auth0.domain}/`,
        algorithms: ['RS256'],
    });

    const router = express.Router();
    router.use(checkJwt);

    router.get('/external', checkJwt, (req, res) => {
        res.send({
            msg: 'Your access token was successfully validated!',
        });
    });

    router.use('/people', peopleApiFactory.create(repo));

    return router;
};
