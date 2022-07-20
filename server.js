require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 2000;

//Require Routes
const categoryRoutes = require('./server/routes/categoryRoutes');
const departmentRoutes = require('./server/routes/departmentRoutes');
const productRoutes = require('./server/routes/productRoutes');
const purchaseRoutes = require('./server/routes/purchaseRoutes');
const reviewRoutes = require('./server/routes/reviewRoutes');
const reviewStoreRoutes = require('./server/routes/reviewStoreRoutes');
const storeRoutes = require('./server/routes/storeRoutes');
const subcategoryRoutes = require('./server/routes/subcategoryRoutes');
const userRoutes = require('./server/routes/userRoutes');
const loginGithubRoutes = require('./server/routes/loginGithubRoutes');
const authenticationGithubRoutes = require('./server/routes/authenticationGithubRoutes');

//Middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(
  cookieSession({
    secret: process.env.GITHUB_COOKIE_SECRET
  })
);

//Routes
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', departmentRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', purchaseRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', reviewStoreRoutes);
app.use('/api/v1', storeRoutes);
app.use('/api/v1', subcategoryRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', loginGithubRoutes);
app.use('/api/v1', authenticationGithubRoutes);

app.get('/', (req, res) => {
    res.send('Server up & running ✅');
  })

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))