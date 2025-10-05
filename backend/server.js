
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// load environment variables from backend/.env
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// configure CORS to allow requests from the frontend URL when provided
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/safetysnap';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const imagesRouter = require('./routes/images');
const labelsRouter = require('./routes/labels');


app.use('/api/images', imagesRouter);
app.use('/api/labels', labelsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
