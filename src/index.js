const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config.js');
const repoFactory = require('./database/repository.js');
const apiFactory = require('./api/root-api.js');

const port = process.env.PORT || 3001;

const repo = repoFactory.create(config.database);

const app = express();
app.use(morgan('dev'));
app.use(helmet());
if (config.authentication.appOrigin) {
    app.use(cors({ origin: config.authentication.appOrigin }));
}

app.use('/api', apiFactory.create(config.authentication, repo));

app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
});
