const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

const port = process.env.API_PORT || 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
});

