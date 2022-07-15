require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => {
    res.send('Server up & running ✅');
  })



app.listen(PORT, () => console.log(`Listening on port:${PORT}`))