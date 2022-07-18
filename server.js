require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 2000;

//Middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server up & running ✅');
  })

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))