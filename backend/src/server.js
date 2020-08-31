require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./routes');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen('3333', console.log('Server started http://localhost:3333'));