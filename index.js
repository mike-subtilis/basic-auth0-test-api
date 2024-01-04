const express = require('express');
const https = require("https");
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

const server = https.createServer(app);

if (process.env.API_PORT) {
    server.listen(process.env.API_PORT, () => {
        console.log(`server is running on port ${process.env.API_PORT}...`);
    });
} else {
    server.listen(() => {
        console.log(`server is running on default port which may be ${server.address().port}...`);
    });
}

