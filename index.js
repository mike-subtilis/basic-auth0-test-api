const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();
const port = process.env.PORT || 3001;

app.get('/hello', (req, res) => {
    res.send('Hello World!')
});
  
app.get('/bye', (req, res) => {
    res.send('Goodbye Cruel World!')
});

app.get('/', (req, res) => {
    res.send('Blank page')
});
  
const envAuthConfig = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  audience: process.env.AUTH0_AUDIENCE,
  appOrigin: process.env.APP_ORIGIN || `http://localhost:3000`,
};

if (!envAuthConfig.domain || !envAuthConfig.audience) {
  console.log(
    "Please make sure that AUTH0_DOMAIN AND AUTH0_AUDIENCE are set with valid domain and audience values"
  );
} else {
    app.use(morgan("dev"));
    app.use(helmet());
    if (envAuthConfig.appOrigin) {
        app.use(cors({ origin: envAuthConfig.appOrigin }));
    }

    const checkJwt = auth({
        audience: envAuthConfig.audience,
        issuerBaseURL: `https://${envAuthConfig.domain}/`,
        algorithms: ["RS256"],
    });

    app.get("/api/external", checkJwt, (req, res) => {
        res.send({
            msg: "Your access token was successfully validated!",
        });
    });
}

app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
});
