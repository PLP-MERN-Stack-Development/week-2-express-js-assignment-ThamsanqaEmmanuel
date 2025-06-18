// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


//constraints
const mongodbUri = 'mongodb://localhost:27017/ProductsDB';
const PORT = 3000; 

// Middleware setup
app.use(bodyParser.json());
app.use(logger);
app.use(auth);
app.use(errorHandler);

//Hello World Route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Product Management API');
});

// Routes
app.use('/', productRoutes);


// Connect to MongoDB
mongoose.connect(mongodbUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
 }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
