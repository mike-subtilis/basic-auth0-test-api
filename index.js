const express = require('express');
const app = express();
  
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

app.get('/', (req, res) => {
    res.send('Blank page')
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
});

